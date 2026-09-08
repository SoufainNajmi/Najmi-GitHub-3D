import { describe, expect, it, vi } from 'vitest';
import { GitHubApiError, GitHubClient } from '../src/github/client.js';

describe('GitHub client', () => {
  it('sends an authenticated GraphQL request', async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response(JSON.stringify({ data: { user: null } }), { status: 200 }));
    await new GitHubClient('secret', 'https://example.test/graphql', fetcher).query({
      login: 'user',
      from: 'a',
      to: 'b',
    });
    expect(fetcher).toHaveBeenCalledWith(
      'https://example.test/graphql',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ Authorization: 'Bearer secret' }),
      }),
    );
  });

  it('reports GraphQL errors', async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValue(
        new Response(JSON.stringify({ errors: [{ message: 'invalid token' }] }), { status: 200 }),
      );
    await expect(
      new GitHubClient('secret', 'https://example.test/graphql', fetcher).query({
        login: 'user',
        from: 'a',
        to: 'b',
      }),
    ).rejects.toBeInstanceOf(GitHubApiError);
  });
});
