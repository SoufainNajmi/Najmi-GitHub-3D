#!/usr/bin/env node
import process from 'node:process';
import { collectProfileData } from './data/collector.js';
import { processContributions } from './data/processor.js';
import { GitHubClient } from './github/client.js';
import { loadConfig } from './config/loader.js';
import { calculateStatistics } from './statistics/contributions.js';
import { getTheme } from './themes/index.js';
import { writeProfileAssets } from './svg/generator.js';

async function main(): Promise<void> {
  const [command = 'generate', ...args] = process.argv.slice(2);
  const requestedUsername =
    option(args, '--username') ?? process.env.GITHUB_USERNAME ?? process.env.INPUT_USERNAME;
  const theme = option(args, '--theme') ?? process.env.INPUT_THEME;
  const outputDirectory = process.env.INPUT_OUTPUT_DIRECTORY;
  const config = await loadConfig(
    args.includes('--config') ? args[args.indexOf('--config') + 1] : undefined,
    {
      github: requestedUsername ? { username: requestedUsername } : undefined,
      theme: theme ? { name: theme } : undefined,
      output: outputDirectory ? { directory: outputDirectory } : undefined,
    },
  );
  if (!config.github.username)
    throw new Error('Provide a username with --username or GITHUB_USERNAME');
  if (command === 'validate') {
    console.log(`Configuration valid for ${config.github.username}`);
    return;
  }
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN is required for GitHub API commands');
  const data = await collectProfileData(new GitHubClient(token), config.github.username);
  const stats = calculateStatistics(data);
  if (command === 'stats') {
    printStats(stats);
    return;
  }
  if (command !== 'generate') throw new Error(`Unknown command: ${command}`);
  const selectedTheme = getTheme(config.theme.name);
  const generated = await writeProfileAssets(
    config.output.directory,
    data.username,
    processContributions(data.contributions),
    stats,
    [selectedTheme],
    config.visualization.perspective,
  );
  console.log(`Generated ${generated.length} SVG assets in ${config.output.directory}`);
}

function option(args: string[], name: string): string | undefined {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}
function printStats(stats: ReturnType<typeof calculateStatistics>): void {
  console.log(
    JSON.stringify(
      {
        contributions: stats.totalContributions,
        currentStreak: stats.current,
        longestStreak: stats.longest,
        repositories: stats.repositories,
        stars: stats.stars,
        issues: stats.issues,
        pullRequests: stats.pullRequests,
        commits: stats.commits,
        topLanguages: stats.topLanguages,
      },
      null,
      2,
    ),
  );
}

main().catch((error: unknown) => {
  console.error(`Error: ${(error as Error).message}`);
  process.exitCode = 1;
});
