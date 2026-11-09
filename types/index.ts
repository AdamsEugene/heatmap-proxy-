import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type { ManageOriginListResponse as PROXY_RESPONSE } from "@/lib/parse-manageorigin-list";
