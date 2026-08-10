"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";

/** Cinematic technical field behind the landing hero — trajectories, coords, arm-like arcs. */
export function HeroTechnicalField() {
  const reduced = useReducedMotion();
  const uid = useId();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Origin / coordinate tick frame */}
      <div className="absolute left-[8%] top-[14%] hidden h-[42%] w-[34%] sm:block">
        <div className="absolute left-0 top-0 h-8 w-px bg-axis-fg/20" />
        <div className="absolute left-0 top-0 h-px w-8 bg-axis-fg/20" />
        <div className="absolute bottom-0 left-0 h-8 w-px bg-axis-fg/15" />
        <div className="absolute bottom-0 left-0 h-px w-8 bg-axis-fg/15" />
        <div className="absolute right-0 top-0 h-8 w-px bg-axis-fg/15" />
        <div className="absolute right-0 top-0 h-px w-8 bg-axis-fg/15" />
      </div>

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`${uid}-arm`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(92,255,154,0)" />
            <stop offset="40%" stopColor="rgba(92,255,154,0.5)" />
            <stop offset="100%" stopColor="rgba(92,255,154,0)" />
          </linearGradient>
        </defs>

        {/* Robotic arm-inspired articulated path */}
        <motion.path
          d="M 180 620 L 320 480 L 460 520 L 610 340"
          stroke={`url(#${uid}-arm)`}
          strokeWidth="1.25"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.85 }}
          transition={{ duration: reduced ? 0.01 : 2.2, ease: [0.16, 1, 0.3, 1] }}
        />
        {[
          [180, 620],
          [320, 480],
          [460, 520],
          [610, 340],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={i === 3 ? 3.5 : 2.2}
            fill={i === 3 ? "rgba(92,255,154,0.8)" : "rgba(244,247,244,0.35)"}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: reduced ? 0 : 0.55 + i * 0.18, duration: 0.4 }}
          />
        ))}

        {/* Trajectory ribbon */}
        <motion.path
          d="M 700 680 C 820 560, 880 620, 980 480 S 1120 320, 1180 260"
          stroke="rgba(244,247,244,0.14)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduced ? 0.01 : 2.6, delay: 0.3 }}
        />

        {/* Sweeping simulation arc */}
        <motion.path
          d="M 240 180 A 220 220 0 0 1 680 200"
          stroke="rgba(92,255,154,0.12)"
          strokeWidth="0.8"
          strokeDasharray="4 10"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: reduced ? 0.01 : 2.4, delay: 0.5 }}
        />

        {/* End-effector ghost path */}
        {!reduced && (
          <circle r="2.5" fill="rgba(92,255,154,0.7)">
            <animateMotion
              dur="9s"
              repeatCount="indefinite"
              path="M 700 680 C 820 560, 880 620, 980 480 S 1120 320, 1180 260"
            />
          </circle>
        )}
      </svg>

      {/* Soft title glow plane */}
      <div
        className="absolute left-1/2 top-[18%] h-[36vmin] w-[70vmin] -translate-x-1/2 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(ellipse, rgba(92,255,154,0.07) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
