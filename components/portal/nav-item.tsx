"use client";

import type { ReactNode } from "react";

import Link from "next/link";

import { cn } from "@/lib/cn";

type Props = {
  href: string;
  icon?: ReactNode;
  current?: boolean;
  collapsed?: boolean;
  title?: string;
  children: ReactNode;
  className?: string;
};

export function NavItem({
  href,
  icon,
  current,
  collapsed,
  title,
  children,
  className,
}: Props) {
  return (
    <Link
      className={cn(
        "group bp-navicon-host flex min-h-[var(--ctl-h)] items-center gap-2 rounded-[var(--ctl-radius)] text-left text-base font-medium text-foreground transition-[background,color] duration-[120ms] outline-none",
        collapsed
          ? "size-10 justify-center p-0"
          : "w-full max-md:min-w-[8.5rem] max-md:shrink-0 max-md:w-auto px-2.5 py-[7px]",
        "hover:bg-[var(--ctl-hover)]",
        "focus-visible:shadow-[0_0_0_3px_var(--accent-tint)]",
        "data-[current=true]:bg-[var(--ctl-selected)] data-[current=true]:font-semibold data-[current=true]:shadow-[inset_0_0_0_1px_var(--ctl-outline)]",
        className,
      )}
      data-current={current || undefined}
      data-slot="nav-item"
      href={href}
      title={collapsed ? title ?? (typeof children === "string" ? children : undefined) : undefined}
    >
      {icon ? (
        <span className="relative grid size-[18px] shrink-0 place-items-center text-[var(--ctl-icon)] transition-colors duration-[120ms] group-hover:text-[var(--ctl-icon-on)] group-data-[current=true]:text-[var(--ctl-icon-on)]">
          {icon}
        </span>
      ) : null}
      {!collapsed && (
        <span className="min-w-0 flex-1 truncate leading-5">{children}</span>
      )}
    </Link>
  );
}
