"use server";

import { PROXY_RESPONSE } from "@/types";

export async function apiGet<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(
    `https://stage1.heatmapcore.com/index.php?module=API&method=PaymentIntegration.manageOrigin&url${url}`,
    {
      next: { tags: ["home", "proxy"] },
      cache: "no-store",
      ...options,
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return data as T;
}

export async function apiPost<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(
    `https://stage1.heatmapcore.com/index.php?module=API&method=PaymentIntegration.manageOrigin&url${url}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      ...options,
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return data as T;
}

type GET_PROXY = {
  type: "spa" | "website";
};

export async function getAllProxyList(params: GET_PROXY) {
  const { type } = params;
  const appendedUrl = `=&type=${type}&request=list`;

  const res = await apiGet<PROXY_RESPONSE>(appendedUrl, { cache: "no-store" });
  if (res.result === "error") return false;
  return res;
}

type ADD_PROXY = {
  type: "spa" | "website";
  proxy: string;
};

export async function addProxy(params: ADD_PROXY) {
  const { type, proxy } = params;

  const requestOptions = {
    method: "POST",
    redirect: "follow",
  };

  const res = await fetch(
    `https://stage1.heatmapcore.com/index.php?module=API&method=PaymentIntegration.manageOrigin&url=${proxy}&type=${type}&request=add`,
    requestOptions as RequestInit
  );

  return res;
}

export const removeProxy = async (params: ADD_PROXY) => {
  const { type, proxy } = params;

  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `https://stage1.heatmapcore.com/index.php?module=API&method=PaymentIntegration.manageOrigin&url=${proxy}&type=${type}&request=remove`,
    requestOptions as RequestInit
  );

  console.log(response);

  if (response.ok) {
    return proxy;
  }

  return false;
};
