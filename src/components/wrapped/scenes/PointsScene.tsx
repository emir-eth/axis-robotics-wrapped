"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import type { AxisWrappedData } from "@/lib/types";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { SceneLabel, SceneShell } from "../SceneShell";

interface PointsSceneProps {
  data: AxisWrappedData;
}

export function PointsScene({ data }: PointsSceneProps) {
  const reduced = useReducedMotion();
  const isZero = data.points === 0;

  return (
    <SceneShell eyebrow="06 · Balance">
      <div className="relative flex min-h-[220px] items-center justify-center">
        {/* Technical brackets frame — keeps zero from feeling empty */}
        <motion.div
          aria-hidden
          className="absolute h-44 w-44 sm:h-56 sm:w-56"
          initial={reduced ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        >
          <span className="absolute left-0 top-0 h-8 w-8 border-l border-t border-axis-fg/20" />
          <span className="absolute right-0 top-0 h-8 w-8 border-r border-t border-axis-fg/20" />
          <span className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-axis-fg/20" />
          <span className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-axis-accent/35" />
          <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-axis-accent/40" />
          <span className="absolute bottom-0 left-1/2 h-3 w-px -translate-x-1/2 bg-axis-fg/20" />
        </motion.div>

        <span
          aria-hidden
          className="absolute h-36 w-36 rounded-full bg-axis-accent/[0.05] blur-3xl"
        />

        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.8, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          className="relative z-10"
        >
          <AnimatedNumber
            value={data.points}
            duration={1.6}
            className="stat-display block text-[clamp(5rem,22vw,9rem)] text-axis-fg"
          />
        </motion.div>
      </div>

      <SceneLabel>Points</SceneLabel>

      <motion.p
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="mt-5 max-w-xs font-mono text-[10px] uppercase tracking-[0.22em] text-axis-dim"
      >
        {isZero ? "Current balance on profile" : "Accumulated contributions"}
      </motion.p>
    </SceneShell>
  );
}
