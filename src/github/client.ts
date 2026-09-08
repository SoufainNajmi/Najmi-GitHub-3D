import type { GraphQLResponse, ViewerQueryData } from './types.js';

export class GitHubApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = 'GitHubApiError';
  }
}

export class GitHubClient {
  constructor(
    private readonly token: string,
    private readonly endpoint = 'https://api.github.com/graphql',
    private readonly fetcher: typeof fetch = fetch,
  ) {
    if (!token) throw new GitHubApiError('GITHUB_TOKEN is required');
  }

  async query(variables: { login: string; from: string; to: string }): Promise<ViewerQueryData> {
    const response = await this.fetcher(this.endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'najmi-github-3d',
      },
      body: JSON.stringify({ query: (await import('./queries.js')).PROFILE_QUERY, variables }),
    });
    const payload = (await response.json()) as GraphQLResponse<ViewerQueryData>;
    if (!response.ok)
      throw new GitHubApiError(`GitHub API request failed (${response.status})`, response.status);
    if (payload.errors?.length)
      throw new GitHubApiError(payload.errors.map((error) => error.message).join('; '));
    if (!payload.data) throw new GitHubApiError('GitHub API returned an empty response');
    return payload.data;
  }
}
