import { describe, expect, it } from 'vitest';
import { validateConfig } from '../src/config/validator.js';

describe('configuration validation', () => {
  it('accepts a valid configuration', () => {
    expect(() =>
      validateConfig({
        github: { username: 'SoufainNajmi' },
        theme: { name: 'najmi-dark' },
        visualization: { perspective: true, animation: false },
        statistics: { enabled: true },
        output: { directory: './output' },
      }),
    ).not.toThrow();
  });

  it('rejects invalid usernames and themes', () => {
    expect(() =>
      validateConfig({
        github: { username: 'bad user' },
        theme: { name: 'unknown' },
        visualization: { perspective: true, animation: false },
        statistics: { enabled: true },
        output: { directory: './output' },
      }),
    ).toThrow('Invalid configuration');
  });
});
