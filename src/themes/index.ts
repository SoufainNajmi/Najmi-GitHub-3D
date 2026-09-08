export interface Theme {
  name: string;
  background: string;
  colors: [string, string, string, string, string];
  gridColor: string;
  textColor: string;
  accent: string;
}

export const themes: Record<string, Theme> = {
  'najmi-dark': {
    name: 'Najmi Dark',
    background: '#0d1117',
    colors: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    gridColor: '#30363d',
    textColor: '#f0f6fc',
    accent: '#58a6ff',
  },
  'najmi-neon': {
    name: 'Najmi Neon',
    background: '#090014',
    colors: ['#1b102b', '#4c1d95', '#7c3aed', '#db2777', '#22d3ee'],
    gridColor: '#4c1d95',
    textColor: '#f5f3ff',
    accent: '#22d3ee',
  },
  'najmi-developer': {
    name: 'Najmi Developer',
    background: '#111827',
    colors: ['#1f2937', '#164e63', '#0e7490', '#0891b2', '#67e8f9'],
    gridColor: '#374151',
    textColor: '#f9fafb',
    accent: '#67e8f9',
  },
  'najmi-ai': {
    name: 'Najmi AI',
    background: '#071a1a',
    colors: ['#102a2a', '#115e59', '#0f766e', '#14b8a6', '#5eead4'],
    gridColor: '#134e4a',
    textColor: '#ecfeff',
    accent: '#5eead4',
  },
  'najmi-morocco': {
    name: 'Najmi Morocco',
    background: '#240b0b',
    colors: ['#401313', '#7f1d1d', '#b91c1c', '#dc2626', '#facc15'],
    gridColor: '#7f1d1d',
    textColor: '#fff7ed',
    accent: '#facc15',
  },
};

export function getTheme(name: string): Theme {
  const theme = themes[name];
  if (!theme) throw new Error(`Unknown theme: ${name}`);
  return theme;
}
