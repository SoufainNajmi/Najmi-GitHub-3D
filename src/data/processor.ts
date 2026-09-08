import type { ContributionDay } from '../github/types.js';
import type { ContributionLevel, ContributionMatrix, ProcessedContribution } from './types.js';

export function contributionLevel(count: number, maximum: number): ContributionLevel {
  if (count <= 0 || maximum <= 0) return 0;
  const ratio = count / maximum;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

export function processContributions(days: ContributionDay[]): ContributionMatrix {
  const maximum = Math.max(...days.map((day) => day.contributionCount), 0);
  const flat = days.map((day, index): ProcessedContribution => {
    const date = new Date(`${day.date}T00:00:00Z`);
    return {
      date: day.date,
      count: day.contributionCount,
      level: contributionLevel(day.contributionCount, maximum),
      week: Math.floor(index / 7),
      day: date.getUTCDay(),
    };
  });
  const weeks: ProcessedContribution[][] = [];
  for (const contribution of flat) (weeks[contribution.week] ??= []).push(contribution);
  return { weeks, flat };
}
