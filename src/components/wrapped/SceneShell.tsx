"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SceneShellProps {
  children: ReactNode;
  className?: string;
  eyebrow?: string;
}

export function SceneShell({ children, className, eyebrow }: SceneShellProps) {
  const reduced = useReducedMotion();

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center px-6 text-center",
        className,
      )}
    >
      {eyebrow && (
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 8, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.32em" }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          className="mb-6 font-mono text-xs uppercase text-white/80 sm:text-[13px]"
        >
          {eyebrow}
        </motion.p>
      )}
      {children}
    </div>
  );
}

export function SceneLabel({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <motion.p
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.55, ease: EASE_OUT_EXPO }}
      className="micro-label mt-5"
    >
      {children}
    </motion.p>
  );
}

export function SceneTitle({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <motion.h2
      initial={reduced ? false : { opacity: 0, y: 24, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
      className="text-[clamp(2rem,7vw,3.6rem)] font-semibold tracking-[-0.045em] text-axis-fg"
    >
      {children}
    </motion.h2>
  );
}
