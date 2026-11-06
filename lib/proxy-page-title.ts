import type { GET_PROXY_TYPE } from "@/types/proxy";

/** Maps UI page titles to manageorigin `type` param. */
export function pageTitleToProxyType(pageTitle: string): GET_PROXY_TYPE {
  if (pageTitle === "SPAs") return "spa";
  if (pageTitle === "Proxy4") return "proxy4";
  if (pageTitle === "Proxy5") return "proxy5";
  if (pageTitle === "Proxy6") return "proxy6";

  return "website";
}
