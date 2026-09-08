import type { RepositorySummary } from '../github/types.js';

export function mostActiveRepositories(
  repositories: RepositorySummary[],
  limit = 5,
): RepositorySummary[] {
  return [...repositories]
    .sort((a, b) => b.commits - a.commits || b.stargazerCount - a.stargazerCount)
    .slice(0, limit);
}
