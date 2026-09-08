import { describe, expect, it } from 'vitest';
import { calculateStatistics } from '../src/statistics/contributions.js';

describe('profile statistics', () => {
  it('calculates totals, month values and repository ranking', () => {
    const data = {
      username: 'user',
      contributions: [
        { date: '2026-09-01', contributionCount: 4, contributionLevel: 'FOUR' },
        { date: '2026-09-02', contributionCount: 2, contributionLevel: 'TWO' },
        { date: '2025-01-01', contributionCount: 5, contributionLevel: 'FOUR' },
      ],
      repositories: [
        {
          name: 'quiet',
          nameWithOwner: 'user/quiet',
          url: 'https://github.com/user/quiet',
          stargazerCount: 2,
          issues: 1,
          pullRequests: 3,
          commits: 4,
          pushedAt: null,
          primaryLanguage: 'TypeScript',
        },
        {
          name: 'active',
          nameWithOwner: 'user/active',
          url: 'https://github.com/user/active',
          stargazerCount: 8,
          issues: 2,
          pullRequests: 1,
          commits: 20,
          pushedAt: null,
          primaryLanguage: 'TypeScript',
        },
      ],
      languages: [{ name: 'TypeScript', bytes: 100, percentage: 100 }],
      totalCommits: 24,
      totalIssues: 3,
      totalPullRequests: 4,
      totalStars: 10,
      fetchedAt: '2026-09-03T00:00:00.000Z',
    };
    const stats = calculateStatistics(data, new Date('2026-09-02T12:00:00Z'));
    expect(stats.totalContributions).toBe(11);
    expect(stats.yearContributions).toBe(6);
    expect(stats.monthContributions).toBe(6);
    expect(stats.activeRepositories[0]?.name).toBe('active');
  });
});
