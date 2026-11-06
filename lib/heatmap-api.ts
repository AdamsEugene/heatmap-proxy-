/**
 * Base URL for the Heatmap manageorigin endpoint (path only, no query string).
 * Server and client: set NEXT_PUBLIC_BASE_URL and/or BASE_URL in .env
 */
export function getManageOriginBase(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_BASE_URL?.trim() ||
    process.env.BASE_URL?.trim() ||
    "";

  if (fromEnv) {
    try {
      const u = new URL(fromEnv);

      return u.toString().replace(/\/$/, "");
    } catch {
      // fall through to default
    }
  }

  return "https://stage9.heatmapcore.com/backend/settings/manageorigin";
}

export function manageOriginUrl(params: {
  url: string;
  type: string;
  request: string;
}): string {
  const base = getManageOriginBase();
  const u = new URL(base.startsWith("http") ? base : `https://${base}`);

  u.searchParams.set("url", params.url);
  u.searchParams.set("type", params.type);
  u.searchParams.set("request", params.request);

  return u.toString();
}
