"use client";

import { useState } from "react";
import { TbChevronsLeft, TbChevronsRight, TbServer } from "react-icons/tb";

import { NavItem } from "@/components/portal/nav-item";
import { TablerIcon } from "@/lib/tabler-icon";
import { PortalIconButton } from "@/components/portal/portal-icon-button";
import { ThemeSwitch } from "@/components/theme-switch";
import { navIcon } from "@/config/nav-icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

const RAIL_W = 236;
const RAIL_COLLAPSED_W = 56;

type Props = {
  pathname: string;
};

export function ProxyPageNav({ pathname }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <nav
      aria-label="Proxy lists"
      className={cn(
        "flex h-full shrink-0 flex-col border-r border-border bg-transparent transition-[width] duration-300 [transition-timing-function:var(--ease-emphasized)]",
      )}
      data-collapsed={collapsed || undefined}
      data-slot="page-nav"
      style={{ width: collapsed ? RAIL_COLLAPSED_W : RAIL_W }}
    >
      <div
        className={cn(
          "flex h-[56px] shrink-0 items-center gap-2 border-b border-border",
          collapsed ? "justify-center px-2" : "pr-2 pl-4",
        )}
      >
        {!collapsed && (
          <>
            <TablerIcon
              aria-hidden
              className="size-5 shrink-0 text-[var(--ctl-icon)]"
              icon={TbServer}
            />
            <span className="min-w-0 flex-1 truncate text-base font-semibold leading-6 text-foreground">
              Proxy
            </span>
          </>
        )}
        <PortalIconButton
          className={cn(!collapsed && "ml-auto")}
          label={collapsed ? "Expand proxy navigation" : "Collapse proxy navigation"}
          motion={collapsed ? "arrow-right" : "arrow-left"}
          onClick={() => setCollapsed((c) => !c)}
        >
          {collapsed ? (
            <TablerIcon className="size-[18px]" icon={TbChevronsRight} />
          ) : (
            <TablerIcon className="size-[18px]" icon={TbChevronsLeft} />
          )}
        </PortalIconButton>
      </div>

      <div
        className={cn(
          "min-h-0 flex-1 overflow-y-auto",
          collapsed ? "p-2" : "p-3",
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-[var(--ws-row-gap)]",
            collapsed && "items-center",
          )}
        >
          {siteConfig.navItems.map((item) => (
            <NavItem
              key={item.href}
              collapsed={collapsed}
              current={pathname === item.href}
              href={item.href}
              icon={navIcon(item.icon)}
              title={item.label}
            >
              {item.label}
            </NavItem>
          ))}
        </div>
      </div>

      {!collapsed && (
        <div
          className="shrink-0 border-t border-border p-3"
          data-slot="page-nav-footer"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-0.5 text-center">
              <span className="text-sm text-muted-foreground">Need help?</span>
              <a
                className="text-sm font-medium text-primary hover:underline"
                href="mailto:support@heatmap.com"
              >
                support@heatmap.com
              </a>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-muted-foreground">Appearance</span>
              <ThemeSwitch />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
