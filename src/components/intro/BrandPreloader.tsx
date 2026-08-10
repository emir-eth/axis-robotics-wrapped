"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect } from "react";
import { AxisBrandMark } from "@/components/ui/AxisBrandMark";
import { EASE_OUT_EXPO } from "@/lib/motion";
import "./preloader.css";

interface BrandPreloaderProps {
  onComplete: () => void;
}

const PRELOADER_MS = 2500;
const REDUCED_MS = 120;

export function BrandPreloader({ onComplete }: BrandPreloaderProps) {
  const reduced = useReducedMotion();

  const finish = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const timer = window.setTimeout(
      finish,
      reduced ? REDUCED_MS : PRELOADER_MS,
    );
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
      aria-label="Skip preloader"
      onClick={finish}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          finish();
        }
      }}
      className="axis-preloader"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: reduced ? 1 : 1.02,
        filter: reduced ? "blur(0px)" : "blur(6px)",
      }}
      transition={{ duration: reduced ? 0.15 : 0.55, ease: EASE_OUT_EXPO }}
    >
      <div
        aria-hidden
        className="axis-grid pointer-events-none absolute inset-0 opacity-30"
      />
      <div aria-hidden className="axis-noise absolute inset-0" />
      <div aria-hidden className="axis-vignette absolute inset-0" />

      <motion.div
        className="relative z-10"
        initial={reduced ? false : { opacity: 0, y: 16, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: reduced ? 0.01 : 0.7, ease: EASE_OUT_EXPO }}
      >
        <AxisBrandMark size="preloader" />
      </motion.div>

      <motion.p
        className="axis-preloader__hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduced ? 0 : 1.2, duration: 0.4 }}
      >
        Tap to continue
      </motion.p>
    </motion.div>
  );
}
