"use client";

import type { ButtonHTMLAttributes, ReactElement } from "react";
import { cloneElement } from "react";

import { cn } from "@/lib/cn";

type Motion = "rotate" | "arrow-left" | "arrow-right";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  motion?: Motion;
  children: ReactElement<{ className?: string }>;
};

export function PortalIconButton({
  label,
  motion = "rotate",
  className,
  children,
  type = "button",
  ...props
}: Props) {
  const icon = cloneElement(children, {
    className: cn("bp-icon-btn__ic", children.props.className),
  });

  return (
    <button
      aria-label={label}
      className={cn(
        "bp-icon-btn inline-grid size-8 shrink-0 cursor-pointer place-items-center rounded-lg border border-transparent text-[var(--ctl-icon)] outline-none transition-colors",
        "[corner-shape:superellipse(1.5)]",
        "hover:border-[color-mix(in_oklab,var(--foreground)_12%,transparent)]",
        "active:border-[color-mix(in_oklab,var(--foreground)_18%,transparent)] active:bg-[color-mix(in_oklab,var(--foreground)_8%,transparent)]",
        "focus-visible:shadow-[0_0_0_3px_var(--accent-tint)]",
        "disabled:pointer-events-none disabled:opacity-45",
        className,
      )}
      data-motion={motion}
      data-slot="icon-button"
      title={label}
      type={type}
      {...props}
    >
      {icon}
    </button>
  );
}
