import fs from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';
import { validateConfig, type NajmiConfig } from './validator.js';

export const defaultConfig: NajmiConfig = {
  github: { username: '' },
  theme: { name: 'najmi-dark' },
  visualization: { perspective: true, animation: false },
  statistics: { enabled: true },
  output: { directory: './output' },
};

export async function loadConfig(
  filePath = 'najmi.config.yml',
  overrides: Partial<Pick<NajmiConfig, 'github' | 'theme' | 'output'>> = {},
): Promise<NajmiConfig> {
  try {
    const content = await fs.readFile(path.resolve(filePath), 'utf8');
    const parsed = yaml.load(content);
    return validateConfig(mergeConfig(mergeConfig(defaultConfig, parsed), overrides));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return validateConfig(mergeConfig(defaultConfig, overrides));
    }
    throw new Error(`Unable to load configuration: ${(error as Error).message}`);
  }
}

function mergeConfig(base: NajmiConfig, value: unknown): NajmiConfig {
  if (!value || typeof value !== 'object') return base;
  const input = value as Record<string, unknown>;
  return {
    github: { ...base.github, ...(input.github as object | undefined) },
    theme: { ...base.theme, ...(input.theme as object | undefined) },
    visualization: { ...base.visualization, ...(input.visualization as object | undefined) },
    statistics: { ...base.statistics, ...(input.statistics as object | undefined) },
    output: { ...base.output, ...(input.output as object | undefined) },
  };
}
