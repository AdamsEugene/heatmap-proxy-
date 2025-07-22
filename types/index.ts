import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface PROXY_RESPONSE {
  result: "success" | "error";
  msg: string[];
  data?: string[];
}
