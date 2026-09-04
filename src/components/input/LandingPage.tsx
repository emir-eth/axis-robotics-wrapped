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

      <header className="relative z-20 flex shrink-0 items-center justify-between gap-3 px-4 py-2.5 sm:px-8 sm:py-3">
        <AxisBrandMark size="header" />
        <OfficialLinksNav />
      </header>

      <div className="axis-scroll relative z-10 mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col px-4 pb-3 pt-1 sm:px-6 sm:pb-4 sm:pt-2">
        <motion.div
          className="mb-3 shrink-0 text-center sm:mb-4"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <motion.p
            variants={fadeUp}
            className="mb-2 font-mono text-[9px] uppercase tracking-[0.16em] text-axis-accent/80 sm:text-[10px]"
          >
            Built to visualize Axis Robotics community contributions
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="relative mx-auto inline-block"
          >
            <span className="sr-only">AXIS ROBOTICS WRAPPED</span>
            <span
              aria-hidden
              className="block text-[clamp(1.65rem,5.5vw,2.75rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-axis-fg"
            >
              <motion.span
                className="inline"
                initial={
                  reduced ? false : { opacity: 0, y: 16, filter: "blur(6px)" }
                }
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
              >
                AXIS ROBOTICS{" "}
              </motion.span>
              <motion.span
                className="inline text-axis-accent"
                style={{ textShadow: "0 0 48px rgba(92,255,154,0.18)" }}
                initial={
                  reduced ? false : { opacity: 0, y: 16, filter: "blur(6px)" }
                }
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.8,
                  delay: 0.08,
                  ease: EASE_OUT_EXPO,
                }}
              >
                WRAPPED
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-white sm:text-sm"
          >
            Turn your Axis Robotics journey into a shareable story.
          </motion.p>
        </motion.div>

        <div className="min-h-0 flex-1">
          <WrappedForm
            values={values}
            errors={errors}
            onChange={onChange}
            onToggleBadge={onToggleBadge}
            onSubmit={onSubmit}
          />
        </div>
      </div>

      <CreatorFooter className="shrink-0 py-2.5 sm:py-3" />
    </div>
  );
}
