"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import type { AxisWrappedData } from "@/lib/types";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { clamp } from "@/lib/utils";
import { SceneLabel, SceneShell } from "../SceneShell";

interface AverageScoreSceneProps {
  data: AxisWrappedData;
}

export function AverageScoreScene({ data }: AverageScoreSceneProps) {
  const reduced = useReducedMotion();
  const progress = clamp(data.averageScore / 100, 0, 1);
  const ticks = 64;
  const needleAngle = -90 + progress * 360;

  return (
    <SceneShell eyebrow="04 · Quality">
      <div className="relative flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 260 260">
          <circle
            cx="130"
            cy="130"
            r="118"
            fill="none"
            stroke="rgba(243,246,243,0.05)"
            strokeWidth="1"
          />
          <circle
            cx="130"
            cy="130"
            r="86"
            fill="none"
            stroke="rgba(243,246,243,0.05)"
            strokeWidth="1"
            strokeDasharray="1 7"
          />

          {Array.from({ length: ticks }).map((_, index) => {
            const t = index / ticks;
            const angle = t * Math.PI * 2 - Math.PI / 2;
            const active = t <= progress;
            const inner = active ? 98 : 104;
            const outer = active ? 116 : 110;
            const x1 = 130 + Math.cos(angle) * inner;
            const y1 = 130 + Math.sin(angle) * inner;
            const x2 = 130 + Math.cos(angle) * outer;
            const y2 = 130 + Math.sin(angle) * outer;

            return (
              <motion.line
                key={index}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={
                  active ? "rgba(92,255,154,0.92)" : "rgba(243,246,243,0.12)"
                }
                strokeWidth={active ? 1.7 : 1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: reduced ? 0 : 0.15 + index * 0.01,
                  duration: 0.25,
                }}
              />
            );
          })}

          {/* Needle */}
          <motion.g
            initial={{ rotate: -90 }}
            animate={{ rotate: needleAngle }}
            transition={{
              duration: reduced ? 0.01 : 1.9,
              ease: EASE_OUT_EXPO,
            }}
            style={{ transformOrigin: "130px 130px" }}
          >
            <line
              x1="130"
              y1="130"
              x2="130"
              y2="42"
              stroke="rgba(92,255,154,0.75)"
              strokeWidth="1.25"
            />
            <circle cx="130" cy="130" r="3.5" fill="rgba(92,255,154,0.9)" />
          </motion.g>
        </svg>

        <div className="relative text-center">
          <AnimatedNumber
            value={data.averageScore}
            decimals={1}
            duration={1.9}
            className="stat-display block text-[clamp(3rem,11vw,4.6rem)] text-axis-fg"
          />
        </div>
      </div>

      <SceneLabel>Average Score</SceneLabel>
    </SceneShell>
  );
}
