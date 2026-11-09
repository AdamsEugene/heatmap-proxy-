"use client";

import type { ComponentProps, Key, ReactNode } from "react";
import { TbArrowsSort } from "react-icons/tb";

import { TablerIcon } from "@/lib/tabler-icon";
import { cn } from "@/lib/cn";

export type SortDir = "asc" | "desc";
export type SortState = { key: string; dir: SortDir };

export type DataColumn<R> = {
  key: string;
  header: ReactNode;
  cell: (row: R, index: number) => ReactNode;
  align?: "left" | "center" | "right";
  numeric?: boolean;
  width?: number | string;
  sortable?: boolean;
  sticky?: boolean;
};

const SIZES = {
  md: {
    head: "h-11 px-3 text-xs",
    cell: "h-11 px-3 text-base",
    chip: "h-7 gap-1 px-2.5 text-xs",
    glyph: 14,
  },
  sm: {
    head: "h-9 px-2.5 text-[11px]",
    cell: "h-9 px-2.5 text-sm",
    chip: "h-[26px] gap-1 px-2 text-[11px]",
    glyph: 13,
  },
} as const;

const ALIGN = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end",
} as const;

function HeadChip({
  active,
  dir,
  size,
  children,
}: {
  active: boolean;
  dir?: SortDir;
  size: keyof typeof SIZES;
  children: ReactNode;
}) {
  const s = SIZES[size];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg border font-semibold whitespace-nowrap transition-colors",
        s.chip,
        active
          ? "border-[color-mix(in_srgb,var(--primary)_30%,transparent)] bg-accent-tint text-foreground"
          : "border-border bg-transparent text-muted-foreground group-hover/th:border-border-strong group-hover/th:text-foreground",
      )}
    >
      {children}
      <TablerIcon
        aria-hidden
        className={cn(
          "shrink-0 transition-transform",
          active ? "text-primary" : "text-icon",
          active && dir === "desc" && "-scale-y-100",
        )}
        icon={TbArrowsSort}
        style={{ width: s.glyph, height: s.glyph }}
      />
    </span>
  );
}

export function DataTable<R>({
  columns,
  rows,
  size = "md",
  zebra = false,
  sort,
  onSortChange,
  rowKey,
  rowProps,
  empty,
  className,
}: {
  columns: DataColumn<R>[];
  rows: R[];
  size?: keyof typeof SIZES;
  zebra?: boolean;
  sort?: SortState;
  onSortChange?: (next: SortState) => void;
  rowKey: (row: R, index: number) => Key;
  rowProps?: (row: R, index: number) => ComponentProps<"tr">;
  empty?: ReactNode;
  className?: string;
}) {
  const s = SIZES[size];

  const click = (c: DataColumn<R>) => {
    if (!c.sortable || !onSortChange) return;

    onSortChange(
      sort?.key === c.key
        ? { key: c.key, dir: sort.dir === "asc" ? "desc" : "asc" }
        : { key: c.key, dir: "desc" },
    );
  };

  return (
    <div
      className={cn("min-w-0 overflow-x-auto", className)}
      data-slot="data-table"
    >
      <table
        className={cn(
          "w-full border-collapse text-left",
          columns.some((c) => c.width) && "table-fixed",
        )}
      >
        <thead>
          <tr className="border-b border-border">
            {columns.map((c) => (
              <th
                key={c.key}
                scope="col"
                aria-sort={
                  sort?.key === c.key
                    ? sort.dir === "asc"
                      ? "ascending"
                      : "descending"
                    : undefined
                }
                className={cn(
                  "group/th whitespace-nowrap bg-surface font-semibold text-muted-foreground",
                  s.head,
                  ALIGN[c.align ?? (c.numeric ? "center" : "left")].split(
                    " ",
                  )[0],
                  c.sticky &&
                    "sticky left-0 z-[2] shadow-[1px_0_0_var(--border)]",
                  c.sortable && onSortChange && "cursor-pointer select-none",
                )}
                style={c.width ? { width: c.width } : undefined}
                onClick={() => click(c)}
              >
                {c.sortable && onSortChange ? (
                  <span
                    className={cn(
                      "flex items-center",
                      ALIGN[c.align ?? (c.numeric ? "center" : "left")].split(
                        " ",
                      )[1],
                    )}
                  >
                    <HeadChip
                      active={sort?.key === c.key}
                      dir={sort?.dir}
                      size={size}
                    >
                      {c.header}
                    </HeadChip>
                  </span>
                ) : (
                  c.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && empty ? (
            <tr>
              <td
                className={cn("text-center text-muted-foreground", s.cell)}
                colSpan={columns.length}
              >
                {empty}
              </td>
            </tr>
          ) : null}
          {rows.map((row, i) => {
            const extra = rowProps?.(row, i);

            return (
              <tr
                {...extra}
                key={rowKey(row, i)}
                className={cn(
                  "border-b border-border transition-colors last:border-0",
                  zebra && i % 2 === 1 && "bg-canvas",
                  extra?.className,
                )}
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={cn(
                      "align-middle text-foreground",
                      s.cell,
                      ALIGN[c.align ?? (c.numeric ? "center" : "left")].split(
                        " ",
                      )[0],
                      c.numeric && "tabular-nums",
                      c.sticky &&
                        "sticky left-0 z-[1] shadow-[1px_0_0_var(--border)]",
                      c.sticky &&
                        (zebra && i % 2 === 1 ? "bg-canvas" : "bg-surface"),
                    )}
                  >
                    {c.cell(row, i)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function sortRows<R>(
  rows: R[],
  sort: SortState | undefined,
  value: (row: R, key: string) => number | string,
) {
  if (!sort) return rows;

  const dir = sort.dir === "asc" ? 1 : -1;

  return [...rows].sort((a, b) => {
    const x = value(a, sort.key);
    const y = value(b, sort.key);

    if (typeof x === "number" && typeof y === "number") {
      return (x - y) * dir;
    }

    return String(x).localeCompare(String(y)) * dir;
  });
}
