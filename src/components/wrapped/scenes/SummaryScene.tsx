"use client";

import { toPng } from "html-to-image";
import { motion, useReducedMotion } from "framer-motion";
import { useId, useRef, useState } from "react";
import { ShareCard } from "@/components/share/ShareCard";
import { GlowButton } from "@/components/ui/GlowButton";
import type { AxisWrappedData } from "@/lib/types";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { formatDecimal, formatInteger } from "@/lib/utils";

interface SummarySceneProps {
  data: AxisWrappedData;
  onRestart: () => void;
}

export function SummaryScene({ data, onRestart }: SummarySceneProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const reduced = useReducedMotion();
  const uid = useId();

  const rows = [
    { label: "Trajectories", value: formatInteger(data.trajectories) },
    { label: "Verified", value: `${formatDecimal(data.verified)}%` },
    { label: "Avg Score", value: formatDecimal(data.averageScore) },
    {
      label: "Badges",
      value: `${data.badgesUnlocked} / ${data.badgesTotal}`,
    },
    { label: "Points", value: formatInteger(data.points) },
  ];

  async function handleDownload() {
    if (!cardRef.current || downloading) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        width: 1200,
        height: 675,
        style: {
          transform: "none",
          transformOrigin: "top left",
        },
      });

      const link = document.createElement("a");
      link.download = `axis-wrapped-${data.username}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to export share card", error);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="relative flex h-full w-full flex-col">
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-5 py-4 sm:px-8">
        <motion.div
          initial={
            reduced
              ? false
              : { opacity: 0, y: 28, scale: 0.97, filter: "blur(8px)" }
          }
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
          className="relative w-full max-w-md overflow-hidden rounded-sm border border-axis-line-strong bg-axis-elevated/85 p-6 shadow-[0_0_80px_rgba(92,255,154,0.05)] sm:p-8"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-axis-accent/60 to-transparent"
          />

          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 400 560"
            fill="none"
          >
            <defs>
              <linearGradient id={`${uid}-s`} x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(92,255,154,0)" />
                <stop offset="50%" stopColor="rgba(92,255,154,0.35)" />
                <stop offset="100%" stopColor="rgba(92,255,154,0)" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 24 480 C 90 340, 150 500, 230 320 S 330 180, 390 120"
              stroke={`url(#${uid}-s)`}
              strokeWidth="1.25"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: reduced ? 0.01 : 1.8,
                ease: EASE_OUT_EXPO,
              }}
            />
            <motion.circle
              cx="230"
              cy="320"
              r="2.5"
              fill="rgba(92,255,154,0.8)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            />
          </svg>

          <div className="relative z-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.36em] text-axis-accent/80">
                  My Axis Wrapped
                </p>
                <h2 className="mt-3 text-[clamp(1.9rem,6vw,2.5rem)] font-semibold tracking-[-0.045em] text-axis-fg">
                  {data.username}
                </h2>
              </div>
              <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-axis-dim">
                Physical AI
              </span>
            </div>

            <div className="mt-8 space-y-0 border-t border-axis-line">
              {rows.map((row, index) => (
                <motion.div
                  key={row.label}
                  initial={reduced ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.25 + index * 0.07,
                    duration: 0.45,
                    ease: EASE_OUT_EXPO,
                  }}
                  className="flex items-end justify-between border-b border-axis-line py-3.5"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-axis-muted">
                    {row.label}
                  </span>
                  <span className="font-mono text-xl tabular-nums tracking-[-0.04em] text-axis-fg">
                    {row.value}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <GlowButton
                onClick={handleDownload}
                disabled={downloading}
                fullWidth
              >
                {downloading ? "Preparing card…" : "Download share card"}
              </GlowButton>
              <GlowButton variant="ghost" onClick={onRestart} fullWidth>
                Start again
              </GlowButton>
            </div>
          </div>
        </motion.div>

        <div
          aria-hidden
          className="pointer-events-none fixed top-0 left-[-10000px] opacity-0"
        >
          <ShareCard ref={cardRef} data={data} />
        </div>
      </div>
    </div>
  );
}
