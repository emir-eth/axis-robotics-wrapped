"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { AmbientBackground } from "@/components/background/AmbientBackground";
import { AxisBrandMark } from "@/components/ui/AxisBrandMark";
import { CreatorFooter } from "@/components/ui/CreatorFooter";
import { OfficialLinksNav } from "@/components/ui/OfficialLinksNav";
import { AverageScoreScene } from "@/components/wrapped/scenes/AverageScoreScene";
import { BadgesScene } from "@/components/wrapped/scenes/BadgesScene";
import { JourneyScene } from "@/components/wrapped/scenes/JourneyScene";
import { PointsScene } from "@/components/wrapped/scenes/PointsScene";
import { SummaryScene } from "@/components/wrapped/scenes/SummaryScene";
import { TrajectoriesScene } from "@/components/wrapped/scenes/TrajectoriesScene";
import { VerifiedScene } from "@/components/wrapped/scenes/VerifiedScene";
import { sceneTransition, sceneVariants } from "@/lib/motion";
import { STORY_SCENES, type AxisWrappedData } from "@/lib/types";
import { cn } from "@/lib/utils";

interface WrappedExperienceProps {
  data: AxisWrappedData;
  sceneIndex: number;
  onSceneChange: (index: number) => void;
  onRestart: () => void;
}

export function WrappedExperience({
  data,
  sceneIndex,
  onSceneChange,
  onRestart,
}: WrappedExperienceProps) {
  const reduced = useReducedMotion();
  const prevIndexRef = useRef(sceneIndex);
  const directionRef = useRef(1);

  const direction =
    sceneIndex === prevIndexRef.current
      ? directionRef.current
      : sceneIndex > prevIndexRef.current
        ? 1
        : -1;

  useEffect(() => {
    directionRef.current = direction;
    prevIndexRef.current = sceneIndex;
  }, [sceneIndex, direction]);
  const isSummary = STORY_SCENES[sceneIndex]?.id === "summary";
  const canGoPrev = sceneIndex > 0;
  const canGoNext = sceneIndex < STORY_SCENES.length - 1;

  const goNext = useCallback(() => {
    if (canGoNext) onSceneChange(sceneIndex + 1);
  }, [canGoNext, onSceneChange, sceneIndex]);

  const goPrev = useCallback(() => {
    if (canGoPrev) onSceneChange(sceneIndex - 1);
  }, [canGoPrev, onSceneChange, sceneIndex]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (
        event.key === "ArrowRight" ||
        event.key === " " ||
        event.key === "Enter"
      ) {
        event.preventDefault();
        goNext();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
      if (event.key === "Escape") {
        onRestart();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev, onRestart]);

  useEffect(() => {
    let startX = 0;
    let startY = 0;

    function onTouchStart(event: TouchEvent) {
      const touch = event.changedTouches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    }

    function onTouchEnd(event: TouchEvent) {
      const touch = event.changedTouches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
      if (dx < 0) goNext();
      else goPrev();
    }

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [goNext, goPrev]);

  const variants = sceneVariants(direction, !!reduced);
  const transition = sceneTransition(direction, !!reduced);

  return (
    <div className="relative h-dvh w-full overflow-hidden">
      <AmbientBackground intensity="story" />

      <div className="relative z-10 flex h-full flex-col">
        <header className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <AxisBrandMark size="header" onClick={onRestart} />
          <OfficialLinksNav />
        </header>

        <div className="relative mx-auto mb-1 flex w-full max-w-lg gap-1.5 px-5 sm:px-8">
          {STORY_SCENES.map((scene, index) => (
            <button
              key={scene.id}
              type="button"
              aria-label={`Go to ${scene.label}`}
              onClick={() => onSceneChange(index)}
              className="group relative h-[3px] flex-1 overflow-hidden rounded-full bg-axis-line-strong"
            >
              <motion.span
                className={cn(
                  "absolute inset-y-0 left-0 bg-axis-accent/85",
                  index < sceneIndex && "w-full",
                  index > sceneIndex && "w-0",
                )}
                initial={false}
                animate={
                  index === sceneIndex
                    ? { width: "100%" }
                    : index < sceneIndex
                      ? { width: "100%" }
                      : { width: "0%" }
                }
                transition={{
                  duration: reduced ? 0.01 : index === sceneIndex ? 0.5 : 0.25,
                }}
              />
            </button>
          ))}
        </div>

        <div className="mx-auto flex w-full max-w-lg flex-col items-center px-5 pt-4 sm:px-8 sm:pt-5">
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-white sm:text-[11px]">
            Tap / Space / arrows to navigate
          </p>
        </div>

        <main
          className={cn(
            "relative min-h-0 flex-1",
            !isSummary && "cursor-pointer",
          )}
          onClick={(event) => {
            if (isSummary || !canGoNext) return;
            const target = event.target as HTMLElement | null;
            if (
              target?.closest(
                "button, a, input, textarea, [role='button'], [data-no-advance]",
              )
            ) {
              return;
            }
            goNext();
          }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={STORY_SCENES[sceneIndex].id}
              className="absolute inset-0"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              {STORY_SCENES[sceneIndex].id === "journey" && (
                <JourneyScene data={data} />
              )}
              {STORY_SCENES[sceneIndex].id === "trajectories" && (
                <TrajectoriesScene data={data} />
              )}
              {STORY_SCENES[sceneIndex].id === "verified" && (
                <VerifiedScene data={data} />
              )}
              {STORY_SCENES[sceneIndex].id === "averageScore" && (
                <AverageScoreScene data={data} />
              )}
              {STORY_SCENES[sceneIndex].id === "badges" && (
                <BadgesScene data={data} />
              )}
              {STORY_SCENES[sceneIndex].id === "points" && (
                <PointsScene data={data} />
              )}
              {STORY_SCENES[sceneIndex].id === "summary" && (
                <SummaryScene data={data} onRestart={onRestart} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="flex flex-col gap-1 px-5 pb-4 pt-2 sm:px-8 sm:pb-5">
          {!isSummary ? (
            <div className="flex items-center justify-between gap-4">
              <motion.button
                type="button"
                onClick={goPrev}
                disabled={!canGoPrev}
                whileTap={reduced || !canGoPrev ? undefined : { scale: 0.96 }}
                className="font-mono text-[10px] uppercase tracking-[0.22em] text-axis-muted transition-colors hover:text-axis-fg disabled:opacity-30"
              >
                Prev
              </motion.button>

              <div className="flex items-center gap-4 sm:gap-6">
                <motion.button
                  type="button"
                  onClick={goNext}
                  whileHover={reduced ? undefined : { x: 2 }}
                  whileTap={reduced ? undefined : { scale: 0.96 }}
                  className="font-mono text-[10px] uppercase tracking-[0.22em] text-axis-accent transition-colors hover:text-axis-fg"
                >
                  Next →
                </motion.button>
                <button
                  type="button"
                  onClick={onRestart}
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:text-axis-accent"
                >
                  Exit
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={onRestart}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:text-axis-accent"
              >
                Exit
              </button>
            </div>
          )}
          <CreatorFooter className="py-2 sm:py-2.5" />
        </footer>
      </div>
    </div>
  );
}
