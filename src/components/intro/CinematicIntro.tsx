"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useId } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";

interface CinematicIntroProps {
  onComplete: () => void;
}

const INTRO_MS = 1800;
const REDUCED_MS = 120;

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const reduced = useReducedMotion();
  const uid = useId();

  const finish = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const timer = window.setTimeout(finish, reduced ? REDUCED_MS : INTRO_MS);
    return () => window.clearTimeout(timer);
  }, [finish, reduced]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        event.key === "Enter" ||
        event.key === " " ||
        event.key === "Escape"
      ) {
        event.preventDefault();
        finish();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [finish]);

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label="Skip intro"
      onClick={finish}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          finish();
        }
      }}
      className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-axis-bg"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: reduced ? 1 : 1.02,
        filter: reduced ? "blur(0px)" : "blur(8px)",
      }}
      transition={{ duration: reduced ? 0.15 : 0.55, ease: EASE_OUT_EXPO }}
    >
      <div
        aria-hidden
        className="axis-grid pointer-events-none absolute inset-0 opacity-40"
      />
      <div aria-hidden className="axis-noise absolute inset-0" />
      <div aria-hidden className="axis-vignette absolute inset-0" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
      >
        <div className="absolute left-1/2 top-0 h-full w-px bg-axis-fg" />
        <div className="absolute left-0 top-1/2 h-px w-full bg-axis-fg" />
      </div>

      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1200 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`${uid}-intro`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(92,255,154,0)" />
            <stop offset="40%" stopColor="rgba(92,255,154,0.55)" />
            <stop offset="100%" stopColor="rgba(92,255,154,0)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 80 520 C 280 280, 420 600, 640 360 S 920 220, 1120 300"
          stroke={`url(#${uid}-intro)`}
          strokeWidth="1.25"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: reduced ? 0.01 : 1.1,
            ease: EASE_OUT_EXPO,
          }}
        />
        <motion.circle
          cx="640"
          cy="360"
          r="2.5"
          fill="rgba(92,255,154,0.85)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: reduced ? 0 : 0.55,
            duration: reduced ? 0.01 : 0.35,
          }}
        />
      </svg>

      <div className="relative z-10 px-6 text-center">
        <motion.p
          className="mb-8 font-mono text-[10px] uppercase tracking-[0.42em] text-axis-accent/70"
          initial={{ opacity: 0, y: 8, letterSpacing: "0.55em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.42em" }}
          transition={{
            delay: reduced ? 0 : 0.35,
            duration: reduced ? 0.01 : 0.5,
            ease: EASE_OUT_EXPO,
          }}
        >
          Community Experience
        </motion.p>

        <h1 className="sr-only">AXIS ROBOTICS WRAPPED</h1>
        <div aria-hidden>
          <motion.p
            className="text-[clamp(2.2rem,9vw,4rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-axis-fg"
            initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: reduced ? 0 : 0.55,
              duration: reduced ? 0.01 : 0.65,
              ease: EASE_OUT_EXPO,
            }}
          >
            AXIS ROBOTICS
          </motion.p>
          <motion.p
            className="mt-2 text-[clamp(2.2rem,9vw,4rem)] font-semibold leading-[0.92] tracking-[0.18em] text-axis-accent sm:tracking-[0.24em]"
            style={{ textShadow: "0 0 48px rgba(92,255,154,0.16)" }}
            initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: reduced ? 0 : 0.72,
              duration: reduced ? 0.01 : 0.7,
              ease: EASE_OUT_EXPO,
            }}
          >
            WRAPPED
          </motion.p>
        </div>
      </div>

      <motion.p
        className="absolute bottom-8 font-mono text-[9px] uppercase tracking-[0.24em] text-axis-dim/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduced ? 0 : 1.1, duration: 0.4 }}
      >
        Tap to continue
      </motion.p>
    </motion.div>
  );
}
