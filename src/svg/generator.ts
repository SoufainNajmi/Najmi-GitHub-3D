import fs from 'node:fs/promises';
import path from 'node:path';
import type { ProfileStatistics } from '../statistics/contributions.js';
import type { ContributionMatrix } from '../data/types.js';
import type { Theme } from '../themes/index.js';
import { sceneSvg } from '../visualization/scene.js';

export async function writeProfileAssets(
  directory: string,
  username: string,
  matrix: ContributionMatrix,
  stats: ProfileStatistics,
  themes: Theme[],
  perspective = true,
): Promise<string[]> {
  await fs.mkdir(directory, { recursive: true });
  const files: string[] = [];
  for (const theme of themes) {
    const filename = `profile-3d-${theme.name.toLowerCase().replaceAll(' ', '-')}.svg`;
    await fs.writeFile(
      path.join(directory, filename),
      sceneSvg(matrix, theme, username, perspective),
      'utf8',
    );
    files.push(filename);
  }
  const statsSvg = statisticsSvg(username, stats, themes[0]!);
  await fs.writeFile(path.join(directory, 'profile-stats.svg'), statsSvg, 'utf8');
  files.push('profile-stats.svg');
  return files;
}

export function statisticsSvg(username: string, stats: ProfileStatistics, theme: Theme): string {
  const lines = [
    `${username} · Najmi GitHub 3D`,
    `Contributions: ${stats.totalContributions}`,
    `Current streak: ${stats.current} days`,
    `Longest streak: ${stats.longest} days`,
    `Repositories: ${stats.repositories}`,
    `Stars: ${stats.stars} · Issues: ${stats.issues} · PRs: ${stats.pullRequests}`,
    `Commits: ${stats.commits}`,
  ];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="520" height="${lines.length * 26 + 30}" viewBox="0 0 520 ${lines.length * 26 + 30}" role="img" aria-label="GitHub statistics"><rect width="100%" height="100%" rx="18" fill="${theme.background}"/><g fill="${theme.textColor}" font-family="system-ui,sans-serif" font-size="15">${lines.map((line, index) => `<text x="24" y="${34 + index * 26}">${line.replace(/[<>&]/g, (character) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[character] ?? character)}</text>`).join('')}</g></svg>`;
}
