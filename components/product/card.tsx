import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-[var(--radius-card)] border border-border bg-canvas p-1 text-foreground",
        className,
      )}
      data-slot="card"
      {...props}
    />
  );
}

function CardSurface({
  className,
  padded = true,
  ...props
}: ComponentProps<"div"> & { padded?: boolean }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 overflow-hidden rounded-[var(--radius-surface)] border border-border bg-surface shadow-xs",
        padded && "p-6",
        className,
      )}
      data-slot="card-surface"
      {...props}
    />
  );
}

export { Card, CardSurface };
