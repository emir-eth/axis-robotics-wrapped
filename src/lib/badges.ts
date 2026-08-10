import { BADGES_TOTAL } from "./types";

export interface AxisBadge {
  id: number;
  name: string;
  /** Filename inside /public/badges */
  file: string;
}

/** Display order: badge-1 → badge-8 */
export const AXIS_BADGES: AxisBadge[] = [
  { id: 1, name: "Hello, World", file: "Hello, World badge-1.png" },
  { id: 2, name: "Nailed It", file: "Nailed It badge-2.png" },
  { id: 3, name: "Jack of All Trades", file: "Jack of All Trades badge-3.png" },
  { id: 4, name: "Speedrun", file: "Speedrun badge-4.png" },
  { id: 5, name: "Creature of Habit", file: "Creature of Habit badge-5.png" },
  { id: 6, name: "I know a guy", file: "I know a guy badge-6.png" },
  { id: 7, name: "Headhunter", file: "Headhunter badge-7.png" },
  { id: 8, name: "Social king", file: "Social king badge-8.png" },
];

export function getBadgeSrc(file: string): string {
  return `/badges/${encodeURIComponent(file)}`;
}

export function getOrderedBadges(total = BADGES_TOTAL): AxisBadge[] {
  return AXIS_BADGES.slice(0, total);
}
