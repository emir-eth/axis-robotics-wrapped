"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import type { AxisWrappedData } from "@/lib/types";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { clamp } from "@/lib/utils";
import { SceneLabel, SceneShell } from "../SceneShell";

interface VerifiedSceneProps {
  data: AxisWrappedData;
}

export function VerifiedScene({ data }: VerifiedSceneProps) {
  const reduced = useReducedMotion();
  const progress = clamp(data.verified / 100, 0, 1);
  const radius = 92;
  const circumference = 2 * Math.PI * radius;
  const ticks = 60;

  return (
    <SceneShell eyebrow="03 · Integrity">
      <div className="relative flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72">
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 220 220">
          {/* Outer technical tick ring */}
          {Array.from({ length: ticks }).map((_, i) => {
            const angle = (i / ticks) * Math.PI * 2;
            const major = i % 5 === 0;
            const inner = major ? 102 : 105;
            const outer = 108;
            const x1 = 110 + Math.cos(angle) * inner;
            const y1 = 110 + Math.sin(angle) * inner;
            const x2 = 110 + Math.cos(angle) * outer;
            const y2 = 110 + Math.sin(angle) * outer;
            return (
              <motion.line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(243,246,243,0.18)"
                strokeWidth={major ? 1.2 : 0.6}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reduced ? 0 : i * 0.008, duration: 0.25 }}
              />
            );
          })}

          <circle
            cx="110"
            cy="110"
            r={radius}
            fill="none"
            stroke="rgba(243,246,243,0.08)"
            strokeWidth="1.25"
          />

          <motion.circle
            cx="110"
            cy="110"
            r={radius}
            fill="none"
            stroke="rgba(92,255,154,0.9)"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference * (1 - progress) }}
            transition={{
              duration: reduced ? 0.01 : 2,
              ease: EASE_OUT_EXPO,
            }}
            style={{
              filter: "drop-shadow(0 0 10px rgba(92,255,154,0.35))",
            }}
          />

          {/* Inner dashed track */}
          <circle
            cx="110"
            cy="110"
            r="72"
            fill="none"
            stroke="rgba(92,255,154,0.12)"
            strokeWidth="0.8"
            strokeDasharray="2 6"
          />
        </svg>

        <div className="relative text-center">
          <AnimatedNumber
            value={data.verified}
            decimals={1}
            suffix="%"
            duration={2}
            className="stat-display block text-[clamp(3.2rem,12vw,4.8rem)] text-axis-fg"
          />
        </div>
      </div>

      <SceneLabel>Verified</SceneLabel>
    </SceneShell>
  );
}
