import type { GitHubProfileData } from '../github/types.js';

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export interface ProcessedContribution {
  date: string;
  count: number;
  level: ContributionLevel;
  week: number;
  day: number;
}

export interface ContributionMatrix {
  weeks: ProcessedContribution[][];
  flat: ProcessedContribution[];
}

export type ProfileData = GitHubProfileData;
