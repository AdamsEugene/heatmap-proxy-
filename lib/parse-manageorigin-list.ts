/** Raw list response from Heatmap manageorigin (v2/v3 shapes). */
export type ManageOriginListResponse = {
  result?: "success" | "error";
  status?: "success" | "error";
  success?: boolean;
  data?: string | string[] | null;
  msg?: string[];
};

/** `false` = fetch/parse failure; `[]` = success with no origins. */
export function parseManageOriginList(
  res: ManageOriginListResponse | null,
): string[] | false {
  if (!res) {
    return false;
  }

  if (
    res.result === "error" ||
    res.status === "error" ||
    res.success === false
  ) {
    return false;
  }

  const ok =
    res.result === "success" ||
    res.status === "success" ||
    res.success === true;

  if (!ok) {
    return false;
  }

  const { data } = res;

  if (data == null || data === "") {
    return [];
  }

  if (Array.isArray(data)) {
    return data.filter((entry): entry is string => Boolean(entry?.trim?.()));
  }

  return false;
}
