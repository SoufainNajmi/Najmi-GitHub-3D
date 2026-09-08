export interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: string;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface RepositorySummary {
  name: string;
  nameWithOwner: string;
  url: string;
  stargazerCount: number;
  issues: number;
  pullRequests: number;
  commits: number;
  pushedAt: string | null;
  primaryLanguage: string | null;
}

export interface LanguageStat {
  name: string;
  bytes: number;
  percentage: number;
}

export interface GitHubProfileData {
  username: string;
  contributions: ContributionDay[];
  repositories: RepositorySummary[];
  languages: LanguageStat[];
  totalCommits: number;
  totalIssues: number;
  totalPullRequests: number;
  totalStars: number;
  fetchedAt: string;
}

export interface ViewerQueryData {
  user: {
    login: string;
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number;
        weeks: ContributionWeek[];
      };
    };
    repositories: {
      nodes: Array<{
        name: string;
        nameWithOwner: string;
        url: string;
        stargazerCount: number;
        issues: { totalCount: number };
        pullRequests: { totalCount: number };
        defaultBranchRef: { target: { history: { totalCount: number } } } | null;
        pushedAt: string | null;
        primaryLanguage: { name: string } | null;
        languages: { edges: Array<{ size: number; node: { name: string } }> };
      }>;
      totalCount: number;
    };
  } | null;
}
