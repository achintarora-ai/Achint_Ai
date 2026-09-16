/** Base path for GitHub Pages project sites (empty in local / Vercel). */
export const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ?? process.env.GITHUB_PAGES_BASE_PATH ?? "";

/** Prefix a root-relative public asset or route path with the deployment base path. */
export function publicPath(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (!basePath) return path;
  if (path === basePath || path.startsWith(`${basePath}/`)) return path;
  return `${basePath}${path}`;
}

/** Static mirrors call the deployed server; Vercel and local use same-origin APIs. */
export function apiPath(path: string): string {
  const origin = process.env.NEXT_PUBLIC_API_ORIGIN;
  return origin ? `${origin.replace(/\/$/, "")}${path}` : publicPath(path);
}

/** Absolute URL for metadata, JSON-LD, and health checks. */
export function absoluteUrl(path: string): string {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://achintarora-ai.github.io/Achint_Ai";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl.replace(/\/$/, "")}${publicPath(normalized)}`;
}
