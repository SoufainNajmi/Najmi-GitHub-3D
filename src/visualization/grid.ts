import type { ContributionMatrix } from '../data/types.js';
import type { Theme } from '../themes/index.js';
import { cubeSvg } from './cube.js';

export interface GridOptions {
  cellSize?: number;
  gap?: number;
  perspective?: boolean;
}

export function gridSvg(
  matrix: ContributionMatrix,
  theme: Theme,
  options: GridOptions = {},
): { content: string; width: number; height: number } {
  const cellSize = options.cellSize ?? 14;
  const gap = options.gap ?? 5;
  const step = cellSize + gap;
  const depthShift = options.perspective === false ? 0 : 3;
  const width = Math.max(matrix.weeks.length * step + 50, 260);
  const height = 7 * step + 115;
  const content = matrix.flat
    .map((item) => {
      const x = 24 + item.week * step;
      const y = 60 + item.day * step;
      const cubeHeight = item.level * 6;
      return cubeSvg(
        x + item.day * depthShift,
        y,
        cellSize,
        cubeHeight,
        theme.colors[item.level],
        theme,
      );
    })
    .join('');
  return { content, width, height };
}
