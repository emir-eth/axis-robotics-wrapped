"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId, useMemo } from "react";
import { cn } from "@/lib/utils";

interface AmbientBackgroundProps {
  intensity?: "subtle" | "story";
  className?: string;
}

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: ((i * 37) % 100) + (i % 3) * 2,
  y: ((i * 53) % 100) + (i % 5),
  size: 1 + (i % 3) * 0.4,
  delay: (i % 7) * 0.45,
  duration: 10 + (i % 5) * 2.2,
}));

export function AmbientBackground({
  intensity = "subtle",
  className,
}: AmbientBackgroundProps) {
  const reduced = useReducedMotion();
  const uid = useId();
  const story = intensity === "story";

  const paths = useMemo(
    () => [
      "M -60 220 C 160 40, 360 340, 620 160 S 980 280, 1320 90",
      "M -40 480 C 200 320, 440 620, 740 400 S 1080 520, 1380 300",
      "M 80 640 C 300 520, 520 700, 760 540 S 1100 420, 1400 500",
    ],
    [],
  );

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="absolute inset-0 bg-axis-bg" />

      {/* Fine simulation grid */}
      <motion.div
        className={cn(
          "axis-grid absolute inset-[-80px]",
          story && !reduced && "axis-grid-animated",
        )}
        initial={false}
        animate={{ opacity: story ? 0.55 : 0.4 }}
        transition={{ duration: 1.2 }}
      />

      {/* Secondary fine grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(92,255,154,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(92,255,154,0.04) 1px, transparent 1px)",
          backgroundSize: "160px 160px",
        }}
      />

      {/* Coordinate crosshair */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute left-1/2 top-0 h-full w-px bg-axis-fg" />
        <div className="absolute left-0 top-[42%] h-px w-full bg-axis-fg" />
      </div>

      {/* Moving coordinate lines */}
      {!reduced && (
        <>
          <motion.div
            className="absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-axis-accent/25 to-transparent"
            animate={{ top: ["12%", "78%", "12%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-axis-fg/15 to-transparent"
            animate={{ left: ["8%", "88%", "8%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          />
        </>
      )}

      <div className="axis-noise absolute inset-0" />
      <div className="axis-vignette absolute inset-0" />
      {story && !reduced && <div className="axis-scan absolute inset-0" />}

      {/* Soft focal glow */}
      <motion.div
        className="absolute left-1/2 top-[20%] h-[48vmin] w-[48vmin] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(92,255,154,0.08) 0%, transparent 68%)",
        }}
        animate={
          reduced
            ? { opacity: 0.6 }
            : { scale: [1, 1.06, 1], opacity: [0.45, 0.75, 0.45] }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Trajectory traces */}
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`${uid}-trail`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(92,255,154,0)" />
            <stop offset="45%" stopColor="rgba(92,255,154,0.45)" />
            <stop offset="100%" stopColor="rgba(92,255,154,0)" />
          </linearGradient>
        </defs>
        {paths.map((d, index) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke={
              index === 0
                ? `url(#${uid}-trail)`
                : "rgba(244,247,244,0.12)"
            }
            strokeWidth={index === 0 ? 1.15 : 0.7}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: story ? 0.9 : 0.55 }}
            transition={{
              duration: reduced ? 0.01 : 2.6 + index * 0.35,
              delay: reduced ? 0 : 0.15 * index,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}
      </svg>

      {/* Tiny particles */}
      {!reduced &&
        PARTICLES.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-axis-accent"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: 0.2,
            }}
            animate={{
              y: [0, -18, 0],
              opacity: [0.08, 0.35, 0.08],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
    </div>
  );
}
