"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AxisBrandMark } from "@/components/ui/AxisBrandMark";
import { OfficialLinksNav } from "@/components/ui/OfficialLinksNav";
import { AmbientBackground } from "@/components/background/AmbientBackground";
import { HeroTechnicalField } from "@/components/background/HeroTechnicalField";
import { WrappedForm } from "@/components/input/WrappedForm";
import { CreatorFooter } from "@/components/ui/CreatorFooter";
import { EASE_OUT_EXPO, fadeUp, staggerContainer } from "@/lib/motion";
import type { WrappedFormErrors, WrappedFormValues } from "@/lib/types";

interface LandingPageProps {
  values: WrappedFormValues;
  errors: WrappedFormErrors;
  onChange: (key: keyof WrappedFormValues, value: string) => void;
  onSubmit: () => void;
}

export function LandingPage({
  values,
  errors,
  onChange,
  onSubmit,
}: LandingPageProps) {
  const reduced = useReducedMotion();

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden">
      <AmbientBackground intensity="subtle" />
      <HeroTechnicalField />

      <header className="relative z-20 flex shrink-0 items-center justify-between gap-3 px-4 py-3 sm:px-8 sm:py-4">
        <AxisBrandMark size="header" />
        <OfficialLinksNav />
      </header>

      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-xl flex-1 flex-col justify-start overflow-hidden px-4 pb-6 pt-2 sm:px-6 sm:pb-8 sm:pt-3">
        <motion.div
          className="mb-6 text-center sm:mb-7"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeUp}
            className="mb-5 flex items-center justify-center gap-2.5 sm:mb-6"
          >
            <span className="h-px w-6 bg-axis-accent/40 sm:w-8" />
            <p className="max-w-md text-center font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-axis-accent/80 sm:text-[11px] sm:tracking-[0.16em]">
              Built to visualize Axis Robotics community contributions
            </p>
            <span className="h-px w-6 bg-axis-accent/40 sm:w-8" />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="relative mx-auto inline-block"
          >
            <span className="sr-only">AXIS ROBOTICS WRAPPED</span>
            <span
              aria-hidden
              className="block text-[clamp(2rem,7.5vw,3.6rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-axis-fg"
            >
              <motion.span
                className="block"
                initial={
                  reduced ? false : { opacity: 0, y: 28, filter: "blur(8px)" }
                }
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.85, ease: EASE_OUT_EXPO }}
              >
                AXIS ROBOTICS
              </motion.span>
              <motion.span
                className="mt-1.5 block text-axis-accent"
                style={{
                  textShadow: "0 0 60px rgba(92,255,154,0.18)",
                }}
                initial={
                  reduced ? false : { opacity: 0, y: 32, filter: "blur(10px)" }
                }
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.9,
                  delay: 0.12,
                  ease: EASE_OUT_EXPO,
                }}
              >
                WRAPPED
              </motion.span>
            </span>

            <span
              aria-hidden
              className="pointer-events-none absolute -left-3 -top-2 h-4 w-4 border-l border-t border-axis-fg/25 sm:-left-5 sm:-top-3 sm:h-5 sm:w-5"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-2 -right-3 h-4 w-4 border-b border-r border-axis-accent/35 sm:-bottom-3 sm:-right-5 sm:h-5 sm:w-5"
            />
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white sm:mt-6 sm:text-base"
          >
            Turn your Axis Robotics journey into a shareable story.
          </motion.p>
        </motion.div>

        <WrappedForm
          values={values}
          errors={errors}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      </div>

      <CreatorFooter className="shrink-0 py-4 sm:py-5" />
    </div>
  );
}
