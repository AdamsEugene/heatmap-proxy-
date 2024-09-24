"use server";

import { PROXY_RESPONSE } from "@/types";

export async function apiGet<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${process.env.BASE_URL}${url}`, {
    next: { tags: ["home", "proxy"] },
    ...options,
  });

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
  const res = await fetch(`${process.env.BASE_URL}${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return data as T;
}

type GET_PROXY = {
  type: "spa" | "origin";
};

export async function getAllProxyList(params: GET_PROXY) {
  const { type } = params;
  const appendedUrl = `=&type=${type}&request=list`;

  const res = await apiGet<PROXY_RESPONSE>(appendedUrl);

  return res;
}

type ADD_PROXY = {
  type: "spa" | "origin";
  proxy: string;
};

export async function addProxy(params: ADD_PROXY) {
  const { type, proxy } = params;
  const appendedUrl = `=${proxy}&type=${type}&action=add`;

  console.log(appendedUrl);

  const res = await apiPost<PROXY_RESPONSE>(appendedUrl);

  console.log(res);

  return res;
}
