import type { Transition, Variants } from "framer-motion";

export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT_SOFT: [number, number, number, number] = [0.4, 0, 0.2, 1];

export const springSoft = {
  type: "spring" as const,
  stiffness: 120,
  damping: 22,
  mass: 0.9,
};

export const springSnappy = {
  type: "spring" as const,
  stiffness: 280,
  damping: 24,
};

export function sceneTransition(direction: number, reduced: boolean): Transition {
  if (reduced) {
    return { duration: 0.01 };
  }
  return {
    duration: 0.55,
    ease: EASE_OUT_EXPO,
  };
}

export function sceneVariants(direction: number, reduced: boolean): Variants {
  if (reduced) {
    return {
      enter: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" },
      center: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" },
      exit: { opacity: 0 },
    };
  }

  return {
    enter: {
      opacity: 0,
      x: direction > 0 ? 56 : -56,
      scale: 0.96,
      filter: "blur(8px)",
    },
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: {
      opacity: 0,
      x: direction > 0 ? -40 : 40,
      scale: 1.03,
      filter: "blur(6px)",
    },
  };
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};
