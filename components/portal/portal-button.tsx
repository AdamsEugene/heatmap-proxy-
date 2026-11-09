"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

import { PortalRevealIcon, type PortalRevealIconName } from "@/components/portal/portal-reveal-icon";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "tertiary";

const variants: Record<Variant, string> = {
  primary:
    "border-primary text-primary-foreground shadow-control bg-[linear-gradient(180deg,color-mix(in_srgb,var(--primary)_90%,white),color-mix(in_srgb,var(--primary)_90%,black))] hover:bg-[linear-gradient(180deg,var(--primary),color-mix(in_srgb,var(--primary)_82%,black))] active:translate-y-[0.5px] active:shadow-[0_1px_2px_rgba(10,13,18,0.12)] active:bg-[linear-gradient(180deg,color-mix(in_srgb,var(--primary)_84%,black),color-mix(in_srgb,var(--primary)_72%,black))]",
  secondary:
    "text-[var(--ctl-ink)] border-[var(--ctl-line)] shadow-[0_1px_2px_rgba(10,13,18,0.05)] bg-[linear-gradient(180deg,var(--ctl-face),var(--ctl-face-2))] hover:border-[var(--ctl-line-hover)] hover:bg-[linear-gradient(180deg,var(--ctl-face),var(--ctl-face-hover))] active:translate-y-[0.5px] active:bg-[linear-gradient(180deg,var(--ctl-face-2),var(--ctl-face-press))]",
  tertiary:
    "text-[var(--ctl-ink-quiet)] border-[var(--ctl-outline)] hover:border-[var(--ctl-outline-hover)] hover:bg-[var(--ctl-wash)] active:translate-y-[0.5px] active:bg-[var(--ctl-wash-strong)]",
};

function iconSide(variant: Variant): "leading" | "trailing" {
  return variant === "primary" ? "trailing" : "leading";
}

type Size = "default" | "sm";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  revealIcon?: PortalRevealIconName;
  children: ReactNode;
};

export function PortalButton({
  variant = "primary",
  size = "default",
  revealIcon,
  className,
  children,
  type = "button",
  ...props
}: Props) {
  const side = iconSide(variant);

  const slot = revealIcon ? (
    <span
      className={cn(
        "bp-reveal-slot",
        side === "leading" ? "bp-reveal-slot--lead" : "bp-reveal-slot--trail",
      )}
    >
      <PortalRevealIcon name={revealIcon} />
    </span>
  ) : null;

  return (
    <button
      className={cn(
        "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-[var(--ctl-radius)] border border-transparent font-medium leading-none transition-all outline-none select-none",
        size === "sm"
          ? "h-[var(--ctl-h-sm)] px-3 text-sm"
          : "h-[var(--ctl-h)] px-4 text-base",
        "focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--primary)_32%,transparent)]",
        "disabled:pointer-events-none disabled:opacity-45",
        revealIcon && "gap-0",
        variants[variant],
        className,
      )}
      data-variant={variant}
      type={type}
      {...props}
    >
      {side === "leading" && slot}
      {children}
      {side === "trailing" && slot}
    </button>
  );
}
