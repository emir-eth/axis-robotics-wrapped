"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import type { AxisWrappedData } from "@/lib/types";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { SceneLabel, SceneShell } from "../SceneShell";

interface TrajectoriesSceneProps {
  data: AxisWrappedData;
}

const PATHS = [
  "M 20 160 C 80 40, 140 220, 210 100 S 320 40, 380 120",
  "M 30 200 C 110 120, 160 260, 240 160 S 340 100, 390 180",
  "M 10 120 C 90 200, 150 60, 230 140 S 330 220, 400 90",
];

export function TrajectoriesScene({ data }: TrajectoriesSceneProps) {
  const reduced = useReducedMotion();
  const uid = useId();

  return (
    <SceneShell eyebrow="02 · Motion">
      <div className="relative flex min-h-[280px] w-full max-w-lg items-center justify-center">
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full opacity-80"
          viewBox="0 0 400 260"
          fill="none"
        >
          <defs>
            <linearGradient id={`${uid}-t`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(92,255,154,0)" />
              <stop offset="50%" stopColor="rgba(92,255,154,0.55)" />
              <stop offset="100%" stopColor="rgba(92,255,154,0)" />
            </linearGradient>
          </defs>

          {PATHS.map((d, index) => (
            <motion.path
              key={d}
              d={d}
              stroke={index === 0 ? `url(#${uid}-t)` : "rgba(243,246,243,0.14)"}
              strokeWidth={index === 0 ? 1.4 : 0.9}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: reduced ? 0.01 : 1.8 + index * 0.25,
                delay: reduced ? 0 : 0.1 * index,
                ease: EASE_OUT_EXPO,
              }}
            />
          ))}

          {!reduced && (
            <circle r="3" fill="rgba(92,255,154,0.85)">
              <animateMotion
                dur="5.5s"
                repeatCount="indefinite"
                path={PATHS[0]}
              />
            </circle>
          )}
        </svg>

        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="relative z-10"
        >
          <AnimatedNumber
            value={data.trajectories}
            duration={2.1}
            className="stat-display block text-[clamp(5rem,22vw,9.5rem)] text-axis-fg"
          />
        </motion.div>
      </div>

      <SceneLabel>Trajectories</SceneLabel>
    </SceneShell>
  );
}
