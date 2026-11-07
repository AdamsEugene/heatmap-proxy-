import type { IconType } from "react-icons";
import { TbLayoutGrid, TbServer, TbWorld } from "react-icons/tb";

import { TablerIcon } from "@/lib/tabler-icon";

import type { NavIconKey } from "./site";

const icons: Record<NavIconKey, IconType> = {
  world: TbWorld,
  spa: TbLayoutGrid,
  server: TbServer,
};

export function navIcon(key: NavIconKey, className = "bp-navicon size-[18px]") {
  return <TablerIcon aria-hidden className={className} icon={icons[key]} />;
}
