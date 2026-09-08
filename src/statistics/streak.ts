import type { ContributionDay } from '../github/types.js';

export interface StreakStats {
  current: number;
  longest: number;
}

export function calculateStreaks(days: ContributionDay[], today = new Date()): StreakStats {
  const activeDates = new Set(
    days.filter((day) => day.contributionCount > 0).map((day) => day.date),
  );
  let longest = 0;
  let run = 0;
  for (const day of [...days].sort((a, b) => a.date.localeCompare(b.date))) {
    if (day.contributionCount > 0) {
      run += 1;
      longest = Math.max(longest, run);
    } else run = 0;
  }
  let current = 0;
  const cursor = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()),
  );
  while (activeDates.has(cursor.toISOString().slice(0, 10))) {
    current += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return { current, longest };
}
