import type { GitHubProfileData, LanguageStat, ViewerQueryData } from '../github/types.js';
import { GitHubClient } from '../github/client.js';

export async function collectProfileData(
  client: GitHubClient,
  username: string,
  now = new Date(),
): Promise<GitHubProfileData> {
  const to = now.toISOString();
  const from = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000).toISOString();
  const result = await client.query({ login: username, from, to });
  if (!result.user) throw new Error(`GitHub user not found: ${username}`);
  return normalizeProfile(result, username);
}

function normalizeProfile(result: ViewerQueryData, username: string): GitHubProfileData {
  const user = result.user;
  const contributions =
    user?.contributionsCollection.contributionCalendar.weeks.flatMap(
      (week) => week.contributionDays,
    ) ?? [];
  const repositories =
    user?.repositories.nodes.map((repository) => ({
      name: repository.name,
      nameWithOwner: repository.nameWithOwner,
      url: repository.url,
      stargazerCount: repository.stargazerCount,
      issues: repository.issues.totalCount,
      pullRequests: repository.pullRequests.totalCount,
      commits: repository.defaultBranchRef?.target.history.totalCount ?? 0,
      pushedAt: repository.pushedAt,
      primaryLanguage: repository.primaryLanguage?.name ?? null,
    })) ?? [];
  const languageBytes = new Map<string, number>();
  for (const repository of user?.repositories.nodes ?? []) {
    for (const edge of repository.languages.edges)
      languageBytes.set(edge.node.name, (languageBytes.get(edge.node.name) ?? 0) + edge.size);
  }
  const totalBytes = [...languageBytes.values()].reduce((sum, bytes) => sum + bytes, 0);
  const languages: LanguageStat[] = [...languageBytes.entries()]
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: totalBytes ? (bytes / totalBytes) * 100 : 0,
    }))
    .sort((a, b) => b.bytes - a.bytes);
  return {
    username,
    contributions,
    repositories,
    languages,
    totalCommits: repositories.reduce((sum, repository) => sum + repository.commits, 0),
    totalIssues: repositories.reduce((sum, repository) => sum + repository.issues, 0),
    totalPullRequests: repositories.reduce((sum, repository) => sum + repository.pullRequests, 0),
    totalStars: repositories.reduce((sum, repository) => sum + repository.stargazerCount, 0),
    fetchedAt: new Date().toISOString(),
  };
}
