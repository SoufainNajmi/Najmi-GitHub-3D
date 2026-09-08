import { describe, expect, it } from 'vitest';
import { calculateStreaks } from '../src/statistics/streak.js';

describe('streak calculation', () => {
  it('calculates current and longest streaks', () => {
    const days = ['2026-01-01', '2026-01-02', '2026-01-03', '2026-01-04'].map((date, index) => ({
      date,
      contributionCount: index === 2 ? 0 : 1,
      contributionLevel: 'ONE',
    }));
    expect(calculateStreaks(days, new Date('2026-01-04T12:00:00Z'))).toEqual({
      current: 1,
      longest: 2,
    });
  });

  it('returns zero for an empty calendar', () =>
    expect(calculateStreaks([], new Date('2026-01-04T12:00:00Z'))).toEqual({
      current: 0,
      longest: 0,
    }));
});
