"use client";

import { motion } from "framer-motion";
import { getAllBadges, getBadgeSrc, isBadgeUnlocked } from "@/lib/badges";
import type { WrappedFormErrors, WrappedFormValues } from "@/lib/types";
import { BADGES_TOTAL } from "@/lib/types";
import { cn } from "@/lib/utils";
import { GlowButton } from "@/components/ui/GlowButton";

interface FieldConfig {
  key: Exclude<keyof WrappedFormValues, "unlockedBadgeIds">;
  label: string;
  placeholder: string;
  inputMode?: "text" | "decimal" | "numeric";
  suffix?: string;
  mono?: boolean;
}

const FIELDS: FieldConfig[] = [
  {
    key: "username",
    label: "Axis Robotics Username",
    placeholder: "emir_ethh",
    inputMode: "text",
  },
  {
    key: "trajectories",
    label: "Trajectories",
    placeholder: "140",
    inputMode: "numeric",
    mono: true,
  },
  {
    key: "verified",
    label: "Verified %",
    placeholder: "98.6",
    inputMode: "decimal",
    suffix: "%",
    mono: true,
  },
  {
    key: "averageScore",
    label: "Average score",
    placeholder: "50.9",
    inputMode: "decimal",
    mono: true,
  },
  {
    key: "points",
    label: "Points",
    placeholder: "0",
    inputMode: "numeric",
    mono: true,
  },
];

interface WrappedFormProps {
  values: WrappedFormValues;
  errors: WrappedFormErrors;
  onChange: (
    key: Exclude<keyof WrappedFormValues, "unlockedBadgeIds">,
    value: string,
  ) => void;
  onToggleBadge: (badgeId: number) => void;
  onSubmit: () => void;
}

export function WrappedForm({
  values,
  errors,
  onChange,
  onToggleBadge,
  onSubmit,
}: WrappedFormProps) {
  const badges = getAllBadges();
  const unlockedCount = values.unlockedBadgeIds.length;

  return (
    <motion.form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="relative flex h-full min-h-0 w-full flex-col"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-sm border border-axis-line-strong bg-axis-elevated/80 backdrop-blur-[2px]">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-8 top-0 z-10 h-px bg-gradient-to-r from-transparent via-axis-accent/55 to-transparent"
        />

        <div className="flex shrink-0 items-end justify-between gap-3 border-b border-axis-line px-4 py-3 sm:px-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-axis-accent/80">
              Profile stats
            </p>
            <p className="mt-0.5 text-xs text-white">
              Enter Hub stats, then select your unlocked badges.
            </p>
          </div>
          <p className="shrink-0 font-mono text-[11px] tabular-nums text-axis-accent">
            {unlockedCount} / {BADGES_TOTAL}
          </p>
        </div>

        <div className="axis-scroll min-h-0 flex-1 overflow-y-auto px-4 py-3 sm:px-5 sm:py-4">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-6">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5">
              {FIELDS.map((field, index) => {
                const isUsername = field.key === "username";
                return (
                  <label
                    key={field.key}
                    className={cn("group block", isUsername && "sm:col-span-2")}
                  >
                    <span className="mb-1 flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white">
                        {field.label}
                      </span>
                      {errors[field.key] && (
                        <span className="text-[10px] text-axis-danger">
                          {errors[field.key]}
                        </span>
                      )}
                    </span>
                    <div className="relative">
                      <input
                        value={values[field.key]}
                        onChange={(event) =>
                          onChange(field.key, event.target.value)
                        }
                        placeholder={field.placeholder}
                        inputMode={field.inputMode}
                        autoComplete="off"
                        spellCheck={false}
                        className={cn(
                          "w-full rounded-sm border bg-black/35 px-3 py-2 text-sm text-axis-fg outline-none transition-[border-color,box-shadow] placeholder:text-axis-dim focus:border-axis-accent/45 focus:shadow-[0_0_0_1px_rgba(92,255,154,0.12)]",
                          errors[field.key]
                            ? "border-axis-danger/50"
                            : "border-axis-line-strong",
                          field.mono && "font-mono tabular-nums",
                          field.suffix && "pr-8",
                        )}
                        style={{ animationDelay: `${index * 40}ms` }}
                      />
                      {field.suffix && (
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-axis-dim">
                          {field.suffix}
                        </span>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white">
                  Your badges
                </p>
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/55">
                  Tap to select
                </p>
              </div>
              {errors.badges && (
                <p className="mb-2 text-[10px] text-axis-danger">
                  {errors.badges}
                </p>
              )}

              <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                {badges.map((badge) => {
                  const selected = isBadgeUnlocked(
                    values.unlockedBadgeIds,
                    badge.id,
                  );
                  return (
                    <button
                      key={badge.id}
                      type="button"
                      onClick={() => onToggleBadge(badge.id)}
                      aria-pressed={selected}
                      aria-label={badge.name}
                      title={badge.name}
                      className={cn(
                        "relative aspect-square overflow-hidden rounded-sm border p-1 transition-[border-color,background-color,box-shadow,transform] hover:scale-[1.03]",
                        selected
                          ? "border-axis-accent/55 bg-axis-accent/[0.1] shadow-[0_0_14px_rgba(92,255,154,0.14)]"
                          : "border-axis-line-strong bg-black/30 hover:border-axis-fg/30",
                      )}
                    >
                      <img
                        src={getBadgeSrc(badge.file)}
                        alt=""
                        width={64}
                        height={64}
                        decoding="async"
                        draggable={false}
                        className={cn(
                          "h-full w-full scale-[1.14] object-contain select-none",
                          selected
                            ? "opacity-100"
                            : "opacity-35 grayscale brightness-75",
                        )}
                      />
                      {selected && (
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-x-1 top-0 h-px bg-gradient-to-r from-transparent via-axis-accent/70 to-transparent"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-[10px] leading-relaxed text-white/55">
                Hover a badge to see its name. Select only the ones unlocked on
                your Hub.
              </p>
            </div>
          </div>
        </div>

        <div className="shrink-0 border-t border-axis-line px-4 py-3 sm:px-5">
          <GlowButton type="submit" fullWidth>
            Generate my Wrapped
          </GlowButton>
        </div>
      </div>
    </motion.form>
  );
}
