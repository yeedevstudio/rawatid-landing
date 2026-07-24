// Single source of truth for the Rawat.ID core API base URL.
// Override per-environment with CM_API_URL; defaults to production so no
// route can silently fall back to a dev server.
export const CM_API_BASE = process.env.CM_API_URL || "https://cm-api.rawat.id";
