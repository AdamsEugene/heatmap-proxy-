import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/cn";

type Tone = "success" | "warning" | "info" | "destructive";

type Props = ComponentProps<"span"> & {
  tone?: Tone;
  dot?: boolean;
  size?: "sm" | "md";
  children: ReactNode;
};

export function StatusBadge({
  className,
  tone = "success",
  dot = true,
  size = "md",
  children,
  ...props
}: Props) {
  const token = tone === "destructive" ? "destructive" : tone;
  const sm = size === "sm";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-semibold leading-none",
        sm
          ? "h-[18px] gap-1 px-1.5 text-[11px] leading-[18px]"
          : "h-[22px] gap-1.5 px-2 text-xs leading-[22px]",
        className,
      )}
      data-size={size}
      data-slot="status-badge"
      style={{
        background: `var(--${token}-tint)`,
        borderColor: `color-mix(in srgb, var(--${token}) 40%, #fff)`,
        color: `color-mix(in srgb, var(--${token}) 72%, #000)`,
      }}
      {...props}
    >
      {dot ? (
        <span
          className={cn(
            "shrink-0 rounded-full",
            sm ? "size-1" : "size-1.5",
          )}
          style={{ background: `var(--${token})` }}
        />
      ) : null}
      {children}
    </span>
  );
}
