export function startRouteLoading() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("route-loading-start"));
}

export function endRouteLoading() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("route-loading-end"));
}

