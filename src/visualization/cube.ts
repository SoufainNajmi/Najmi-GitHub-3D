import type { Theme } from '../themes/index.js';

export function cubeSvg(
  x: number,
  y: number,
  size: number,
  height: number,
  color: string,
  theme: Theme,
): string {
  const depth = size * 0.32;
  const top = `${x},${y - height} ${x + size},${y - height - depth} ${x + size + depth},${y - height} ${x + depth},${y}`;
  const left = `${x},${y - height} ${x + depth},${y} ${x + depth},${y + size} ${x},${y + size - height}`;
  const right = `${x + depth},${y} ${x + size + depth},${y - depth} ${x + size + depth},${y + size - depth} ${x + depth},${y + size}`;
  return `<g data-level="${color}"><polygon points="${top}" fill="${color}" stroke="${theme.gridColor}"/><polygon points="${left}" fill="${color}" opacity=".78" stroke="${theme.gridColor}"/><polygon points="${right}" fill="${color}" opacity=".58" stroke="${theme.gridColor}"/></g>`;
}
