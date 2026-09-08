import { describe, expect, it } from 'vitest';
import { processContributions } from '../src/data/processor.js';
import { statisticsSvg } from '../src/svg/generator.js';
import { getTheme } from '../src/themes/index.js';

describe('SVG generation', () => {
  it('produces valid SVG markup for empty and populated statistics', () => {
    const svg = statisticsSvg(
      'test-user',
      {
        totalContributions: 0,
        yearContributions: 0,
        monthContributions: 0,
        current: 0,
        longest: 0,
        repositories: 0,
        stars: 0,
        issues: 0,
        pullRequests: 0,
        commits: 0,
        topLanguages: [],
        activeRepositories: [],
      },
      getTheme('najmi-dark'),
    );
    expect(svg.startsWith('<svg ')).toBe(true);
    expect(svg).toContain('test-user');
  });

  it('handles an empty contribution list', () => expect(processContributions([]).flat).toEqual([]));
});
