"use client";

import type { ComponentProps } from "react";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

import { PortalButton } from "@/components/portal/portal-button";
import { TablerIcon } from "@/lib/tabler-icon";
import { cn } from "@/lib/cn";

function windowOf(page: number, pages: number): (number | "gap")[] {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i);

  const out: (number | "gap")[] = [0];
  const from = Math.max(1, Math.min(page - 1, pages - 5));
  const to = Math.min(pages - 2, Math.max(page + 1, 4));

  if (from > 1) out.push("gap");

  for (let i = from; i <= to; i++) out.push(i);

  if (to < pages - 2) out.push("gap");

  out.push(pages - 1);

  return out;
}

export function TablePager({
  page,
  pages,
  onPageChange,
  className,
  ...props
}: Omit<ComponentProps<"nav">, "onChange"> & {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
}) {
  const at = Math.max(0, Math.min(page, pages - 1));

  if (pages <= 1) return null;

  return (
    <nav
      aria-label="Pages of the table"
      className={cn(
        "flex flex-wrap items-center justify-center gap-1 border-t border-border px-2 py-2",
        className,
      )}
      data-shape="sheets"
      data-slot="table-pager"
      {...props}
    >
      <PortalButton
        disabled={at === 0}
        size="sm"
        type="button"
        variant="tertiary"
        onClick={() => onPageChange(at - 1)}
      >
        <TablerIcon aria-hidden className="size-4" icon={TbChevronLeft} />
        Prev
      </PortalButton>
      {windowOf(at, pages).map((n, i) =>
        n === "gap" ? (
          <span
            key={`gap-${i}`}
            aria-hidden
            className="px-1 text-sm text-muted-foreground"
          >
            …
          </span>
        ) : (
          <PortalButton
            key={n}
            aria-current={n === at ? "page" : undefined}
            className="min-w-8 px-2 tabular-nums"
            size="sm"
            type="button"
            variant={n === at ? "secondary" : "tertiary"}
            onClick={() => onPageChange(n)}
          >
            {n + 1}
          </PortalButton>
        ),
      )}
      <PortalButton
        disabled={at >= pages - 1}
        size="sm"
        type="button"
        variant="tertiary"
        onClick={() => onPageChange(at + 1)}
      >
        Next
        <TablerIcon aria-hidden className="size-4" icon={TbChevronRight} />
      </PortalButton>
    </nav>
  );
}
