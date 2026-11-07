"use client";

import { useLayoutEffect, useRef } from "react";
import type { IconType } from "react-icons";
import { TbCheck, TbPlus, TbX } from "react-icons/tb";

import { TablerIcon } from "@/lib/tabler-icon";
import { cn } from "@/lib/cn";

export type PortalRevealIconName = "plus" | "check" | "x";

const GLYPHS: Record<PortalRevealIconName, IconType> = {
  plus: TbPlus,
  check: TbCheck,
  x: TbX,
};

type Props = {
  name: PortalRevealIconName;
  className?: string;
};

export function PortalRevealIcon({ name, className }: Props) {
  const hostRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    hostRef.current?.querySelectorAll("path").forEach((path) => {
      path.setAttribute("pathLength", "1");
    });
  }, [name]);

  return (
    <span
      ref={hostRef}
      className={cn(
        "bp-reveal-ico inline-grid size-[18px] place-items-center [&_svg]:size-full",
        className,
      )}
    >
      <TablerIcon aria-hidden icon={GLYPHS[name]} />
    </span>
  );
}
