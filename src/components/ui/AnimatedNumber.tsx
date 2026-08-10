"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  formatter?: (value: number) => string;
}

export function AnimatedNumber({
  value,
  duration = 1.7,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  formatter,
}: AnimatedNumberProps) {
  const reduced = useReducedMotion();
  const motionValue = useMotionValue(reduced ? value : 0);
  const display = useTransform(motionValue, (latest) => {
    if (formatter) return formatter(latest);
    const fixed = latest.toFixed(decimals);
    return `${prefix}${Number(fixed).toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`;
  });

  useEffect(() => {
    if (reduced) {
      motionValue.set(value);
      return;
    }
    const controls = animate(motionValue, value, {
      duration,
      ease: EASE_OUT_EXPO,
    });
    return controls.stop;
  }, [motionValue, value, duration, reduced]);

  return (
    <motion.span className={cn("tabular-nums", className)}>{display}</motion.span>
  );
}
