import { describe, expect, it } from 'vitest';
import { contributionLevel, processContributions } from '../src/data/processor.js';

describe('contribution processor', () => {
  it('maps counts into five relative levels', () => {
    expect([0, 1, 2, 3, 4].map((level) => contributionLevel(level * 25, 100))).toEqual([
      0, 1, 2, 3, 4,
    ]);
    expect(contributionLevel(100, 100)).toBe(4);
    expect(contributionLevel(0, 0)).toBe(0);
  });

  it('preserves calendar order and week positions', () => {
    const matrix = processContributions([
      { date: '2026-01-01', contributionCount: 2, contributionLevel: 'TWO' },
      { date: '2026-01-02', contributionCount: 0, contributionLevel: 'NONE' },
    ]);
    expect(matrix.flat).toHaveLength(2);
    expect(matrix.weeks[0]?.[0]?.day).toBe(4);
  });
});
