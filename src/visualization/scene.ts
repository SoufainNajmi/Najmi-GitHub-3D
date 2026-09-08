import type { ContributionMatrix } from '../data/types.js';
import type { Theme } from '../themes/index.js';
import { gridSvg } from './grid.js';

export function sceneSvg(
  matrix: ContributionMatrix,
  theme: Theme,
  username: string,
  perspective = true,
): string {
  const grid = gridSvg(matrix, theme, { perspective });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${grid.width} ${grid.height}" role="img" aria-label="3D GitHub contributions for ${escapeXml(username)}"><rect width="100%" height="100%" rx="18" fill="${theme.background}"/><text x="24" y="24" fill="${theme.textColor}" font-family="system-ui,sans-serif" font-size="13" font-weight="700">${escapeXml(username)} · ${escapeXml(theme.name)}</text>${grid.content}</svg>`;
}

function escapeXml(value: string): string {
  return value.replace(
    /[<>&'"]/g,
    (character) =>
      ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[character] ??
      character,
  );
}
