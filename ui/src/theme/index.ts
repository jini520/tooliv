// ThemeProvider와 useTheme hook만 export
export { ThemeProvider, useTheme } from './ThemeContext';

// 테마 관련 유틸리티 함수들
export const applyThemeClass = (theme: 'light' | 'dark') => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }
};

export const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

export const getStoredTheme = (): 'light' | 'dark' | null => {
  if (typeof window !== 'undefined') {
    const theme = localStorage.getItem('tooliv-theme');
    return theme === 'light' || theme === 'dark' ? theme : null;
  }
  return null;
};

export const storeTheme = (theme: 'light' | 'dark') => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('tooliv-theme', theme);
  }
};
