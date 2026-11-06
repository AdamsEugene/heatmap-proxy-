"use client";

import NextLink from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { Logo } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";

type Props = {
  children: React.ReactNode;
};

export function PortalFrame({ children }: Props) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-background md:flex-row">
      <aside className="border-b border-border bg-card md:w-[240px] md:flex-shrink-0 md:border-b-0 md:border-r md:border-border">
        <div className="flex h-14 items-center justify-between gap-3 px-4 md:h-auto md:flex-col md:items-stretch md:gap-6 md:px-3 md:py-5">
          <NextLink
            className="flex items-center gap-2.5 rounded-surface px-2 py-1.5 text-foreground transition-colors hover:bg-canvas"
            href="/"
          >
            <Logo className="flex-shrink-0 text-primary" size={32} />
            <span className="text-base font-semibold tracking-tight">
              {siteConfig.name}
            </span>
          </NextLink>
          <div className="md:hidden">
            <ThemeSwitch />
          </div>
        </div>
        <nav
          aria-label="Workspace"
          className="flex gap-1 overflow-x-auto px-2 pb-3 scrollbar-none md:flex-col md:px-2 md:pb-6"
        >
          {siteConfig.navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <NextLink
                key={item.href}
                className={clsx(
                  "min-w-[7.5rem] rounded-surface px-3 py-2.5 text-sm font-medium transition-colors md:min-w-0",
                  active
                    ? "bg-accent-tint text-primary"
                    : "text-muted-foreground hover:bg-canvas hover:text-foreground",
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            );
          })}
        </nav>
        <div className="hidden border-t border-border px-3 py-4 md:block">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-muted-foreground">Appearance</span>
            <ThemeSwitch />
          </div>
        </div>
      </aside>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto [scrollbar-gutter:stable]">
          <div className="mx-auto w-full max-w-portal px-4 py-6 pb-12 sm:px-6 md:pl-5 md:pr-4 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
