import { BADGES_TOTAL } from "./types";

export interface AxisBadge {
  id: number;
  name: string;
  /** Filename inside /public/badges */
  file: string;
}

/** Display order: badge-1 → badge-14 */
export const AXIS_BADGES: AxisBadge[] = [
  { id: 1, name: "Hello, World", file: "Hello, World badge-1.png" },
  { id: 2, name: "Nailed It", file: "Nailed It badge-2.png" },
  { id: 3, name: "Jack of All Trades", file: "Jack of All Trades badge-3.png" },
  { id: 4, name: "Speedrun", file: "Speedrun badge-4.png" },
  { id: 5, name: "Creature of Habit", file: "Creature of Habit badge-5.png" },
  { id: 6, name: "I know a guy", file: "I know a guy badge-6.png" },
  { id: 7, name: "Headhunter", file: "Headhunter badge-7.png" },
  { id: 8, name: "Social king", file: "Social king badge-8.png" },
  { id: 9, name: "Signal Boost", file: "Signal Boost badge-9.png" },
  { id: 10, name: "Built Different", file: "Built Different badge-10.png" },
  { id: 11, name: "Flawless", file: "Flawless badge-11.png" },
  { id: 12, name: "Seen It All", file: "Seen It All badge-12.png" },
  { id: 13, name: "No Days Off", file: "No Days Off badge-13.png" },
  {
    id: 14,
    name: "Blink and You'll Miss It",
    file: "Blink and You'll Miss It badge-14.png",
  },
];

export function getBadgeSrc(file: string): string {
  return `/badges/${encodeURIComponent(file)}`;
}

export function getAllBadges(): AxisBadge[] {
  return AXIS_BADGES.slice(0, BADGES_TOTAL);
}

export function isBadgeUnlocked(
  unlockedBadgeIds: number[],
  badgeId: number,
): boolean {
  return unlockedBadgeIds.includes(badgeId);
}
