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
  onChange: (
    key: Exclude<keyof WrappedFormValues, "unlockedBadgeIds">,
    value: string,
  ) => void;
  onToggleBadge: (badgeId: number) => void;
  onSubmit: () => void;
}

export function LandingPage({
  values,
  errors,
  onChange,
  onToggleBadge,
  onSubmit,
}: LandingPageProps) {
  const reduced = useReducedMotion();

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden">
      <AmbientBackground intensity="subtle" />
      <HeroTechnicalField />

      <header className="relative z-20 flex shrink-0 items-center justify-between gap-3 px-4 py-2 sm:px-8">
        <AxisBrandMark size="header" />
        <OfficialLinksNav />
      </header>

      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col overflow-hidden px-4 pb-1 pt-0.5 sm:px-6">
        <motion.div
          className="mb-2 shrink-0 text-center"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <motion.p
            variants={fadeUp}
            className="mb-1 hidden font-mono text-[9px] uppercase tracking-[0.14em] text-axis-accent/80 min-[900px]:block"
          >
            Built to visualize Axis Robotics community contributions
          </motion.p>

          <motion.h1 variants={fadeUp} className="relative mx-auto inline-block">
            <span className="sr-only">AXIS ROBOTICS WRAPPED</span>
            <span
              aria-hidden
              className="block text-[clamp(1.35rem,3.8vw,2.15rem)] font-semibold leading-none tracking-[-0.045em] text-axis-fg"
            >
              <motion.span
                className="inline"
                initial={
                  reduced ? false : { opacity: 0, y: 10, filter: "blur(4px)" }
                }
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
              >
                AXIS ROBOTICS{" "}
              </motion.span>
              <motion.span
                className="inline text-axis-accent"
                style={{ textShadow: "0 0 40px rgba(92,255,154,0.18)" }}
                initial={
                  reduced ? false : { opacity: 0, y: 10, filter: "blur(4px)" }
                }
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.7,
                  delay: 0.06,
                  ease: EASE_OUT_EXPO,
                }}
              >
                WRAPPED
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-1 max-w-lg text-[11px] leading-snug text-white sm:text-xs"
          >
            Turn your Axis Robotics journey into a shareable story.
          </motion.p>
        </motion.div>

        <div className="min-h-0 flex-1 overflow-hidden">
          <WrappedForm
            values={values}
            errors={errors}
            onChange={onChange}
            onToggleBadge={onToggleBadge}
            onSubmit={onSubmit}
          />
        </div>
      </div>

      <CreatorFooter className="shrink-0 py-1.5 sm:py-2" />
    </div>
  );
}
