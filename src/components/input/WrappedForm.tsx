"use client";

import { motion } from "framer-motion";
import type { WrappedFormErrors, WrappedFormValues } from "@/lib/types";
import { BADGES_TOTAL } from "@/lib/types";
import { cn } from "@/lib/utils";
import { GlowButton } from "@/components/ui/GlowButton";

interface FieldConfig {
  key: keyof WrappedFormValues;
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
  {
    key: "badgesUnlocked",
    label: "Badges unlocked",
    placeholder: "4",
    inputMode: "numeric",
    mono: true,
  },
];

interface WrappedFormProps {
  values: WrappedFormValues;
  errors: WrappedFormErrors;
  onChange: (key: keyof WrappedFormValues, value: string) => void;
  onSubmit: () => void;
}

export function WrappedForm({
  values,
  errors,
  onChange,
  onSubmit,
}: WrappedFormProps) {
  return (
    <motion.form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="relative w-full"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative overflow-hidden rounded-sm border border-axis-line-strong bg-axis-elevated/75 p-4 backdrop-blur-[2px] sm:p-5">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-axis-accent/55 to-transparent"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-axis-fg/15"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-axis-accent/25"
        />

        <div className="mb-3.5">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-axis-accent/80">
            Profile stats
          </p>
          <p className="mt-0.5 text-xs text-white sm:text-sm">
            Enter exactly what you see on Axis Hub.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {FIELDS.map((field, index) => {
            const isUsername = field.key === "username";
            return (
              <label
                key={field.key}
                className={cn("group block", isUsername && "sm:col-span-2")}
              >
                <span className="mb-1 flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white">
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
                    onChange={(event) => onChange(field.key, event.target.value)}
                    placeholder={field.placeholder}
                    inputMode={field.inputMode}
                    autoComplete="off"
                    spellCheck={false}
                    className={cn(
                      "w-full rounded-sm border bg-black/35 px-3 py-2.5 text-sm text-axis-fg outline-none transition-[border-color,box-shadow] placeholder:text-axis-dim focus:border-axis-accent/45 focus:shadow-[0_0_0_1px_rgba(92,255,154,0.12)]",
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

          <div className="block">
            <span className="mb-1 flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white">
                Badges total
              </span>
            </span>
            <div
              aria-readonly="true"
              className="w-full cursor-default rounded-sm border border-axis-line-strong bg-black/20 px-3 py-2.5 font-mono text-sm tabular-nums text-axis-fg/70 select-none"
            >
              {BADGES_TOTAL}
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <GlowButton type="submit" fullWidth>
            Generate my Wrapped
          </GlowButton>
          <p className="text-center font-mono text-[10px] leading-relaxed tracking-[0.06em] text-white/75 sm:text-[11px]">
            Use the statistics shown on your Axis Hub profile.
          </p>
        </div>
      </div>
    </motion.form>
  );
}
