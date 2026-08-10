"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

export function GlowButton({
  className,
  variant = "primary",
  fullWidth,
  children,
  disabled,
  type = "button",
  onClick,
}: GlowButtonProps) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 20 });
  const springY = useSpring(y, { stiffness: 220, damping: 20 });

  function onMove(event: MouseEvent<HTMLButtonElement>) {
    if (disabled || reduced || variant !== "primary") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    x.set(offsetX * 0.08);
    y.set(offsetY * 0.12);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={disabled || reduced ? undefined : { scale: 1.018 }}
      whileTap={disabled || reduced ? undefined : { scale: 0.98 }}
      disabled={disabled}
      style={
        variant === "primary" && !reduced
          ? { x: springX, y: springY }
          : undefined
      }
      className={cn(
        "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-sm px-6 py-3.5 text-sm font-medium tracking-[0.16em] uppercase transition-[border-color,background-color,box-shadow,color] disabled:cursor-not-allowed disabled:opacity-50",
        fullWidth && "w-full",
        variant === "primary" &&
          "border border-axis-accent/45 bg-axis-accent/10 text-axis-accent shadow-[0_0_28px_rgba(92,255,154,0.1)] hover:bg-axis-accent/16 hover:shadow-[0_0_36px_rgba(92,255,154,0.2)]",
        variant === "ghost" &&
          "border border-axis-line-strong bg-transparent text-axis-fg/80 hover:border-axis-accent/30 hover:text-axis-fg",
        className,
      )}
    >
      {variant === "primary" && (
        <>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-axis-accent/80 to-transparent"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
            style={{
              background:
                "radial-gradient(120px 40px at 50% 0%, rgba(92,255,154,0.16), transparent 70%)",
            }}
          />
        </>
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
