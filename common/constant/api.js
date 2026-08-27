// Single source of truth for the Rawat.ID core API base URL.
// Override per-environment with CM_API_URL; defaults to production so no
// route can silently fall back to a dev server.
export const CM_API_BASE = process.env.CM_API_URL || "https://cm-api.rawat.id";

// TEMPORARY: /auth/forgot-password dan /auth/reset-password baru ada di server
// dev, belum ikut rilis produksi. Sengaja di-hardcode (bukan env) karena
// dipanggil langsung dari browser, jadi nilainya harus ikut ter-bundle.
// Ganti ke CM_API_BASE begitu kedua endpoint naik ke produksi.
export const CM_API_DEV_BASE = "http://dev.cm-api.rawat.id";
