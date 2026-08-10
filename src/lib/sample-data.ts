import type { AxisWrappedData, WrappedFormValues } from "./types";
import { BADGES_TOTAL } from "./types";

export const SAMPLE_WRAPPED_DATA: AxisWrappedData = {
  username: "emir_ethh",
  trajectories: 140,
  verified: 98.6,
  averageScore: 50.9,
  points: 0,
  badgesUnlocked: 4,
  badgesTotal: BADGES_TOTAL,
};

export const SAMPLE_FORM_VALUES: WrappedFormValues = {
  username: SAMPLE_WRAPPED_DATA.username,
  trajectories: String(SAMPLE_WRAPPED_DATA.trajectories),
  verified: String(SAMPLE_WRAPPED_DATA.verified),
  averageScore: String(SAMPLE_WRAPPED_DATA.averageScore),
  points: String(SAMPLE_WRAPPED_DATA.points),
  badgesUnlocked: String(SAMPLE_WRAPPED_DATA.badgesUnlocked),
};

export const EMPTY_FORM_VALUES: WrappedFormValues = {
  username: "",
  trajectories: "",
  verified: "",
  averageScore: "",
  points: "",
  badgesUnlocked: "",
};
