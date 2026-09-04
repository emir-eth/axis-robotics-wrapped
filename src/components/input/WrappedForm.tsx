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
  /** Full-width username vs compact stat cell */
  wide?: boolean;
}

const FIELDS: FieldConfig[] = [
  {
    key: "username",
    label: "Axis Robotics Username",
    placeholder: "emir_ethh",
    inputMode: "text",
    wide: true,
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
    label: "Avg score",
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-sm border border-axis-line-strong bg-axis-elevated/80 backdrop-blur-[2px]">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-8 top-0 z-10 h-px bg-gradient-to-r from-transparent via-axis-accent/55 to-transparent"
        />

        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-axis-line px-3 py-2 sm:px-4">
          <div className="min-w-0">
            <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-axis-accent/80 sm:text-[10px]">
              Profile stats
            </p>
            <p className="truncate text-[11px] text-white sm:text-xs">
              Enter Hub stats, then select unlocked badges.
            </p>
          </div>
          <p className="shrink-0 font-mono text-[11px] tabular-nums text-axis-accent sm:text-xs">
            {unlockedCount} / {BADGES_TOTAL}
          </p>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-3 py-2.5 sm:px-4 sm:py-3">
          <div className="grid shrink-0 grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5">
            {FIELDS.map((field) => (
              <label
                key={field.key}
                className={cn("group block", field.wide && "col-span-2 sm:col-span-4")}
              >
                <span className="mb-1 flex items-center justify-between gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white sm:text-[10px]">
                    {field.label}
                  </span>
                  {errors[field.key] && (
                    <span className="text-[9px] text-axis-danger">
                      {errors[field.key]}
                    </span>
                  )}
                </span>
                <div className="relative">
                  <input
                    value={values[field.key]}
                    onChange={(event) => onChange(field.key, event.target.value)}
                    placeholder={field.placeholder}
                    inputMode={field.inputMode}
                    autoComplete="off"
                    spellCheck={false}
                    className={cn(
                      "w-full rounded-sm border bg-black/35 px-2.5 py-2 text-sm text-axis-fg outline-none transition-[border-color,box-shadow] placeholder:text-axis-dim focus:border-axis-accent/45 focus:shadow-[0_0_0_1px_rgba(92,255,154,0.12)] sm:px-3 sm:py-2.5",
                      errors[field.key]
                        ? "border-axis-danger/50"
                        : "border-axis-line-strong",
                      field.mono && "font-mono tabular-nums",
                      field.suffix && "pr-7",
                    )}
                  />
                  {field.suffix && (
                    <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 font-mono text-xs text-axis-dim">
                      {field.suffix}
                    </span>
                  )}
                </div>
              </label>
            ))}
          </div>

          <div className="mt-2.5 flex min-h-0 flex-1 flex-col border-t border-axis-line pt-2.5 sm:mt-3 sm:pt-3">
            <div className="mb-1.5 flex shrink-0 items-center justify-between gap-2">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white sm:text-[10px]">
                Your badges
              </p>
              <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-white/50 sm:text-[9px]">
                Tap to select · hover for name
              </p>
            </div>
            {errors.badges && (
              <p className="mb-1 text-[9px] text-axis-danger">{errors.badges}</p>
            )}

            <div className="grid min-h-0 flex-1 grid-cols-7 grid-rows-2 gap-1.5 sm:gap-2">
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
                      "relative min-h-0 overflow-hidden rounded-sm border p-1 transition-[border-color,background-color,box-shadow] sm:p-1.5",
                      selected
                        ? "border-axis-accent/55 bg-axis-accent/[0.1] shadow-[0_0_12px_rgba(92,255,154,0.12)]"
                        : "border-axis-line-strong bg-black/30 hover:border-axis-fg/30",
                    )}
                  >
                    <img
                      src={getBadgeSrc(badge.file)}
                      alt=""
                      width={80}
                      height={80}
                      decoding="async"
                      draggable={false}
                      className={cn(
                        "h-full w-full object-contain select-none",
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
          </div>
        </div>

        <div className="shrink-0 border-t border-axis-line px-3 py-2 sm:px-4 sm:py-2.5">
          <GlowButton type="submit" fullWidth className="!py-2.5 text-sm">
            Generate my Wrapped
          </GlowButton>
        </div>
      </div>
    </motion.form>
  );
}
