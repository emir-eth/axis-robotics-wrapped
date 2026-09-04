export interface AxisWrappedData {
  username: string;
  trajectories: number;
  verified: number;
  averageScore: number;
  points: number;
  /** Explicit unlocked badge ids — order-independent */
  unlockedBadgeIds: number[];
  badgesTotal: number;
}

/** Fixed badge total on Axis Hub — not user-editable. */
export const BADGES_TOTAL = 14;

export type WrappedPhase = "preloader" | "intro" | "input" | "story";

export type StorySceneId =
  | "journey"
  | "trajectories"
  | "verified"
  | "averageScore"
  | "badges"
  | "points"
  | "summary";

export interface StoryScene {
  id: StorySceneId;
  label: string;
}

export const STORY_SCENES: StoryScene[] = [
  { id: "journey", label: "Journey" },
  { id: "trajectories", label: "Trajectories" },
  { id: "verified", label: "Verified" },
  { id: "averageScore", label: "Avg Score" },
  { id: "badges", label: "Badges" },
  { id: "points", label: "Points" },
  { id: "summary", label: "Summary" },
];

export type WrappedFormValues = {
  username: string;
  trajectories: string;
  verified: string;
  averageScore: string;
  points: string;
  unlockedBadgeIds: number[];
};

export type WrappedFormErrors = Partial<
  Record<Exclude<keyof WrappedFormValues, "unlockedBadgeIds"> | "badges", string>
>;
