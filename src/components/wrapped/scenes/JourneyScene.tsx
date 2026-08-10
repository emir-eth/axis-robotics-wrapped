"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { AxisWrappedData } from "@/lib/types";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { SceneShell, SceneTitle } from "../SceneShell";

interface JourneySceneProps {
  data: AxisWrappedData;
}

export function JourneyScene({ data }: JourneySceneProps) {
  const reduced = useReducedMotion();

  return (
    <SceneShell eyebrow="01 · Origin">
      <SceneTitle>YOUR AXIS ROBOTICS JOURNEY</SceneTitle>

      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.94, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.75, ease: EASE_OUT_EXPO }}
        className="relative mt-12"
      >
        <span
          aria-hidden
          className="absolute -inset-x-16 -inset-y-8 rounded-full bg-axis-accent/[0.06] blur-3xl"
        />

        <div className="relative">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white">
            Contributor
          </p>
          <p
            className="mt-3 text-[clamp(2.4rem,10vw,4.2rem)] font-semibold tracking-[-0.05em] text-axis-accent"
            style={{ textShadow: "0 0 48px rgba(92,255,154,0.2)" }}
          >
            {data.username}
          </p>
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        className="mt-14 flex items-center gap-3"
        initial={reduced ? false : { opacity: 0, scaleX: 0.6 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.55, duration: 0.7 }}
      >
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-axis-accent/50" />
        <span className="h-1.5 w-1.5 rotate-45 border border-axis-accent/60" />
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-axis-accent/50" />
      </motion.div>
    </SceneShell>
  );
}
