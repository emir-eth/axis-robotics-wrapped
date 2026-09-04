"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  getAllBadges,
  getBadgeSrc,
  isBadgeUnlocked,
} from "@/lib/badges";
import type { AxisWrappedData } from "@/lib/types";
import { EASE_OUT_EXPO, springSoft } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SceneLabel, SceneShell } from "../SceneShell";

interface BadgesSceneProps {
  data: AxisWrappedData;
}

export function BadgesScene({ data }: BadgesSceneProps) {
  const reduced = useReducedMotion();
  const badges = getAllBadges();
  const unlockedCount = data.unlockedBadgeIds.length;

  return (
    <SceneShell eyebrow="05 · Unlock">
      <motion.p
        initial={reduced ? false : { opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
        className="stat-display font-mono text-[clamp(2.8rem,12vw,5rem)] text-axis-fg"
      >
        {unlockedCount}
        <span className="text-axis-dim"> / {data.badgesTotal}</span>
      </motion.p>

      <SceneLabel>Badges Unlocked</SceneLabel>

      <div className="mt-5 grid w-full max-w-4xl grid-cols-4 gap-2.5 sm:mt-6 sm:grid-cols-7 sm:gap-3">
        {badges.map((badge, index) => {
          const unlocked = isBadgeUnlocked(data.unlockedBadgeIds, badge.id);

          return (
            <motion.div
              key={badge.id}
              initial={
                reduced
                  ? false
                  : { opacity: 0, y: 18, scale: 0.88 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={
                reduced
                  ? { duration: 0.01 }
                  : {
                      ...springSoft,
                      delay: 0.2 + index * 0.04,
                    }
              }
              className="relative"
              title={unlocked ? badge.name : `${badge.name} — locked`}
            >
              <div
                className={cn(
                  "relative aspect-square overflow-hidden rounded-sm border p-0 transition-[border-color,box-shadow,background-color]",
                  unlocked
                    ? "border-axis-accent/45 bg-axis-accent/[0.07] shadow-[0_0_22px_rgba(92,255,154,0.12)]"
                    : "border-axis-line-strong/70 bg-black/30",
                )}
              >
                {unlocked && (
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-2 top-0 z-10 h-px bg-gradient-to-r from-transparent via-axis-accent/70 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 + index * 0.04 }}
                  />
                )}

                <img
                  src={getBadgeSrc(badge.file)}
                  alt={badge.name}
                  width={320}
                  height={320}
                  decoding="async"
                  draggable={false}
                  className={cn(
                    "h-full w-full scale-[1.18] object-contain select-none",
                    unlocked
                      ? "opacity-100"
                      : "opacity-[0.28] grayscale brightness-75 contrast-90",
                  )}
                />

                {!unlocked && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-axis-bg/25"
                  />
                )}
              </div>

              <p
                className={cn(
                  "mt-1.5 line-clamp-2 text-center font-mono text-[8px] uppercase leading-snug tracking-[0.08em] sm:text-[9px]",
                  unlocked ? "text-white" : "text-axis-dim/70",
                )}
              >
                {badge.name}
              </p>
            </motion.div>
          );
        })}
      </div>
    </SceneShell>
  );
}
