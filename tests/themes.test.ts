import { describe, expect, it } from 'vitest';
import { getTheme, themes } from '../src/themes/index.js';

describe('theme registry', () => {
  it('contains the five Najmi themes', () => expect(Object.keys(themes)).toHaveLength(5));
  it('rejects unknown names', () => expect(() => getTheme('missing')).toThrow('Unknown theme'));
});
