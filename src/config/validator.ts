export interface NajmiConfig {
  github: { username: string };
  theme: { name: string };
  visualization: { perspective: boolean; animation: boolean };
  statistics: { enabled: boolean };
  output: { directory: string };
}

const themeNames = new Set([
  'najmi-dark',
  'najmi-neon',
  'najmi-developer',
  'najmi-ai',
  'najmi-morocco',
]);

export function validateConfig(config: NajmiConfig): NajmiConfig {
  const errors: string[] = [];
  if (!config.github.username || !/^[a-z\d](?:[a-z\d-]{0,37})$/i.test(config.github.username)) {
    errors.push('github.username must be a valid GitHub username');
  }
  if (!themeNames.has(config.theme.name))
    errors.push(`theme.name must be one of: ${[...themeNames].join(', ')}`);
  if (!config.output.directory.trim()) errors.push('output.directory cannot be empty');
  if (errors.length) throw new Error(`Invalid configuration:\n- ${errors.join('\n- ')}`);
  return config;
}
