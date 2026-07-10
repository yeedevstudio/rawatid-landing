// Client-side auth/session helpers with automatic access-token refresh.
// Usage: import { authFetch } from "@/common/utils/auth";
//        const res = await authFetch("/api/bmi/history?period=all");

const TOKEN_KEY = "token";
const REFRESH_KEY = "refreshToken";
const USER_KEY = "user";

export const getToken = () =>
  typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;

export const getRefreshToken = () =>
  typeof window !== "undefined" ? localStorage.getItem(REFRESH_KEY) : null;

export const getUser = () => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

// Persist the pieces returned by /auth/login (or /auth/refresh-token).
export const setSession = ({ token, refreshToken, user } = {}) => {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem(TOKEN_KEY, token);
  if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken);
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearSession = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
};

// Dedupe concurrent refreshes: many in-flight requests hitting 401 at once
// should trigger a single refresh call and all await the same result.
let refreshPromise = null;

export const refreshAccessToken = () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return Promise.resolve(null);

  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const res = await fetch("/api/auth/refresh-token", {
          method: "POST",
          cache: "no-store",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });
        const data = await res.json().catch(() => ({}));
        const newToken = data?.token ?? data?.accessToken ?? data?.data?.token;
        if (!res.ok || !newToken) return null;

        localStorage.setItem(TOKEN_KEY, newToken);
        const newRefresh = data?.refreshToken ?? data?.data?.refreshToken;
        if (newRefresh) localStorage.setItem(REFRESH_KEY, newRefresh);
        return newToken;
      } catch {
        return null;
      } finally {
        refreshPromise = null;
      }
    })();
  }
  return refreshPromise;
};

// fetch wrapper that attaches the Bearer token and, on a 401, transparently
// refreshes the access token once and retries the original request.
// Returns the final Response. If refresh fails, the 401 response is returned
// so callers can redirect to /signin.
export const authFetch = async (url, options = {}) => {
  const doFetch = (token) =>
    fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

  let res = await doFetch(getToken());
  if (res.status !== 401) return res;

  const newToken = await refreshAccessToken();
  if (!newToken) return res; // refresh failed → let caller handle the 401
  return doFetch(newToken);
};
