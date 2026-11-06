"use server";

import type { GET_PROXY_TYPE } from "@/types/proxy";

import { manageOriginUrl } from "@/lib/heatmap-api";
import { PROXY_RESPONSE } from "@/types";

async function fetchManageOriginJson<T>(
  params: { url: string; type: string; request: string },
  options?: RequestInit,
): Promise<T | null> {
  const href = manageOriginUrl(params);
  const res = await fetch(href, {
    next: { tags: ["home", "proxy"] },
    cache: "no-store",
    ...options,
  });

  if (!res.ok) {
    if (process.env.NODE_ENV === "development") {
      process.stderr.write(
        `[heatmap-proxy] manageorigin request failed: ${res.status} ${href}\n`,
      );
    }

    return null;
  }

  return (await res.json()) as T;
}

type GET_PROXY = {
  type: GET_PROXY_TYPE;
};

export async function getAllProxyList(params: GET_PROXY) {
  const { type } = params;
  const res = await fetchManageOriginJson<PROXY_RESPONSE>({
    url: "other",
    type,
    request: "list",
  });

  if (!res || res.result === "error") return false;

  return res.data ?? false;
}

type ADD_PROXY = {
  type: GET_PROXY_TYPE;
  proxy: string;
};

export async function addProxy(params: ADD_PROXY) {
  const { type, proxy } = params;

  const requestOptions = {
    method: "POST",
    redirect: "follow",
  };

  const res = await fetch(
    manageOriginUrl({ url: proxy, type, request: "add" }),
    requestOptions as RequestInit,
  );

  return (res as any).data;
}
// Example list URL: ?url=other&type=spa&request=list
export const removeProxy = async (params: ADD_PROXY) => {
  const { type, proxy } = params;

  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    manageOriginUrl({ url: proxy, type, request: "remove" }),
    requestOptions as RequestInit,
  );

  if (response.ok) {
    return proxy;
  }

  return false;
};
