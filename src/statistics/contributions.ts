import type { GitHubProfileData } from '../github/types.js';
import { calculateStreaks, type StreakStats } from './streak.js';

export interface ProfileStatistics extends StreakStats {
  totalContributions: number;
  yearContributions: number;
  monthContributions: number;
  repositories: number;
  stars: number;
  issues: number;
  pullRequests: number;
  commits: number;
  topLanguages: Array<{ name: string; percentage: number }>;
  activeRepositories: GitHubProfileData['repositories'];
}

export function calculateStatistics(data: GitHubProfileData, now = new Date()): ProfileStatistics {
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();
  const yearDays = data.contributions.filter(
    (day) => new Date(`${day.date}T00:00:00Z`).getUTCFullYear() === year,
  );
  const monthDays = yearDays.filter(
    (day) => new Date(`${day.date}T00:00:00Z`).getUTCMonth() === month,
  );
  return {
    totalContributions: data.contributions.reduce((sum, day) => sum + day.contributionCount, 0),
    yearContributions: yearDays.reduce((sum, day) => sum + day.contributionCount, 0),
    monthContributions: monthDays.reduce((sum, day) => sum + day.contributionCount, 0),
    ...calculateStreaks(data.contributions, now),
    repositories: data.repositories.length,
    stars: data.totalStars,
    issues: data.totalIssues,
    pullRequests: data.totalPullRequests,
    commits: data.totalCommits,
    topLanguages: data.languages.slice(0, 5).map(({ name, percentage }) => ({ name, percentage })),
    activeRepositories: [...data.repositories].sort((a, b) => b.commits - a.commits).slice(0, 5),
  };
}
