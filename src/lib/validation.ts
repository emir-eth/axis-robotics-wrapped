import type {
  AxisWrappedData,
  WrappedFormErrors,
  WrappedFormValues,
} from "./types";
import { BADGES_TOTAL } from "./types";
import { getAllBadges } from "./badges";

function parseRequiredNumber(
  raw: string,
  label: string,
  options?: { min?: number; max?: number; integer?: boolean },
): { value?: number; error?: string } {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { error: `${label} is required` };
  }

  const value = Number(trimmed);
  if (!Number.isFinite(value)) {
    return { error: `${label} must be a number` };
  }

  if (options?.integer && !Number.isInteger(value)) {
    return { error: `${label} must be a whole number` };
  }

  if (options?.min !== undefined && value < options.min) {
    return { error: `${label} must be at least ${options.min}` };
  }

  if (options?.max !== undefined && value > options.max) {
    return { error: `${label} must be at most ${options.max}` };
  }

  return { value };
}

export function validateWrappedForm(
  values: WrappedFormValues,
): { data?: AxisWrappedData; errors: WrappedFormErrors } {
  const errors: WrappedFormErrors = {};
  const validIds = new Set(getAllBadges().map((badge) => badge.id));

  const username = values.username.trim().replace(/^@/, "");
  if (!username) {
    errors.username = "Username is required";
  } else if (username.length > 32) {
    errors.username = "Username is too long";
  }

  const trajectories = parseRequiredNumber(values.trajectories, "Trajectories", {
    min: 0,
    integer: true,
  });
  if (trajectories.error) errors.trajectories = trajectories.error;

  const verified = parseRequiredNumber(values.verified, "Verified percentage", {
    min: 0,
    max: 100,
  });
  if (verified.error) errors.verified = verified.error;

  const averageScore = parseRequiredNumber(values.averageScore, "Average score", {
    min: 0,
  });
  if (averageScore.error) errors.averageScore = averageScore.error;

  const points = parseRequiredNumber(values.points, "Points", {
    min: 0,
    integer: true,
  });
  if (points.error) errors.points = points.error;

  const unlockedBadgeIds = [
    ...new Set(
      values.unlockedBadgeIds.filter(
        (id) => Number.isInteger(id) && validIds.has(id),
      ),
    ),
  ].sort((a, b) => a - b);

  if (unlockedBadgeIds.length > BADGES_TOTAL) {
    errors.badges = `Select at most ${BADGES_TOTAL} badges`;
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return {
    errors,
    data: {
      username,
      trajectories: trajectories.value!,
      verified: verified.value!,
      averageScore: averageScore.value!,
      points: points.value!,
      unlockedBadgeIds,
      badgesTotal: BADGES_TOTAL,
    },
  };
}
