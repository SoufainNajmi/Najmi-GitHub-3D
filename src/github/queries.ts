export const PROFILE_QUERY = `
  query NajmiProfile($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      login
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount contributionLevel } }
        }
      }
      repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: PUSHED_AT, direction: DESC}) {
        totalCount
        nodes {
          name nameWithOwner url stargazerCount pushedAt primaryLanguage { name }
          issues(states: OPEN) { totalCount }
          pullRequests(states: OPEN) { totalCount }
          defaultBranchRef { target { ... on Commit { history { totalCount } } } }
          languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
            edges { size node { name } }
          }
        }
      }
    }
  }
`;
