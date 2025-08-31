import { Theme, ThemeMode } from './theme';
import { lightColors, darkColors } from './colors';

// CSS 변수로 테마 적용
export const applyThemeToCSS = (theme: Theme): void => {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  
  // 색상 변수 설정
  Object.entries(theme.colors).forEach(([category, colors]) => {
    if (typeof colors === 'object' && colors !== null) {
      Object.entries(colors as Record<string, string>).forEach(([name, value]) => {
        root.style.setProperty(`--tooliv-${category}-${name}`, value);
      });
    } else {
      root.style.setProperty(`--tooliv-${category}`, colors as string);
    }
  });

  // 간격 변수 설정
  Object.entries(theme.spacing).forEach(([name, value]) => {
    root.style.setProperty(`--tooliv-spacing-${name}`, value);
  });

  // 테두리 반경 변수 설정
  Object.entries(theme.borderRadius).forEach(([name, value]) => {
    root.style.setProperty(`--tooliv-radius-${name}`, value);
  });

  // 그림자 변수 설정
  Object.entries(theme.shadows).forEach(([name, value]) => {
    root.style.setProperty(`--tooliv-shadow-${name}`, value);
  });

  // 전환 변수 설정
  Object.entries(theme.transitions).forEach(([name, value]) => {
    root.style.setProperty(`--tooliv-transition-${name}`, value);
  });

  // z-index 변수 설정
  Object.entries(theme.zIndex).forEach(([name, value]) => {
    root.style.setProperty(`--tooliv-z-${name}`, value.toString());
  });

  // 폰트 패밀리 변수 설정
  root.style.setProperty('--tooliv-font-sans', theme.typography.fontFamily.sans);
  root.style.setProperty('--tooliv-font-mono', theme.typography.fontFamily.mono);

  // 폰트 크기 변수 설정
  Object.entries(theme.typography.fontSize).forEach(([name, value]) => {
    root.style.setProperty(`--tooliv-font-size-${name}`, value);
  });

  // 폰트 굵기 변수 설정
  Object.entries(theme.typography.fontWeight).forEach(([name, value]) => {
    root.style.setProperty(`--tooliv-font-weight-${name}`, value);
  });

  // 줄 높이 변수 설정
  Object.entries(theme.typography.lineHeight).forEach(([name, value]) => {
    root.style.setProperty(`--tooliv-line-height-${name}`, value);
  });
};

/**
 * 색상 객체를 CSS 변수로 변환
 */
export function generateCSSVariables(colors: typeof lightColors | typeof darkColors, prefix = 'tooliv'): Record<string, string> {
  const variables: Record<string, string> = {};
  
  // 브랜드 컬러
  variables[`--${prefix}-primary`] = colors.primary;
  variables[`--${prefix}-secondary`] = colors.secondary;
  variables[`--${prefix}-third`] = colors.third;
  
  // 배경색
  variables[`--${prefix}-background-primary`] = colors.background.primary;
  variables[`--${prefix}-background-secondary`] = colors.background.secondary;
  variables[`--${prefix}-background-tertiary`] = colors.background.tertiary;
  
  // 텍스트 색상
  variables[`--${prefix}-text-primary`] = colors.text.primary;
  variables[`--${prefix}-text-secondary`] = colors.text.secondary;
  variables[`--${prefix}-text-tertiary`] = colors.text.tertiary;
  variables[`--${prefix}-text-disabled`] = colors.text.disabled;
  variables[`--${prefix}-text-inverse`] = colors.text.inverse;
  
  // 테두리 색상
  variables[`--${prefix}-border-primary`] = colors.border.primary;
  variables[`--${prefix}-border-secondary`] = colors.border.secondary;
  variables[`--${prefix}-border-tertiary`] = colors.border.tertiary;
  variables[`--${prefix}-border-focus`] = colors.border.focus;
  
  // 상태 색상
  variables[`--${prefix}-status-success`] = colors.status.success;
  variables[`--${prefix}-status-warning`] = colors.status.warning;
  variables[`--${prefix}-status-error`] = colors.status.error;
  variables[`--${prefix}-status-info`] = colors.status.info;
  
  // 그림자 색상
  variables[`--${prefix}-shadow-light`] = colors.shadow.light;
  variables[`--${prefix}-shadow-medium`] = colors.shadow.medium;
  variables[`--${prefix}-shadow-heavy`] = colors.shadow.heavy;
  
  // 오버레이 색상
  variables[`--${prefix}-overlay-light`] = colors.overlay.light;
  variables[`--${prefix}-overlay-medium`] = colors.overlay.medium;
  variables[`--${prefix}-overlay-heavy`] = colors.overlay.heavy;
  
  return variables;
}

/**
 * CSS 변수를 DOM에 적용
 */
export function applyCSSVariables(colors: typeof lightColors | typeof darkColors, prefix = 'tooliv'): void {
  const variables = generateCSSVariables(colors, prefix);
  const root = document.documentElement;
  
  Object.entries(variables).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
}

/**
 * 라이트 테마 CSS 변수 적용
 */
export function applyLightTheme(): void {
  applyCSSVariables(lightColors);
}

/**
 * 다크 테마 CSS 변수 적용
 */
export function applyDarkTheme(): void {
  applyCSSVariables(darkColors);
}

// CSS 변수 제거
export const removeThemeFromCSS = (): void => {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);
  
  // 모든 CSS 변수 제거
  Array.from(computedStyle).forEach(property => {
    if (property.startsWith('--tooliv-')) {
      root.style.removeProperty(property);
    }
  });
};

// 테마 모드에 따른 CSS 클래스 적용
export const applyThemeClass = (mode: ThemeMode): void => {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(mode);
};

// 시스템 테마 감지
export const getSystemTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light';
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// 로컬 스토리지에서 테마 불러오기
export const getStoredTheme = (): ThemeMode | null => {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem('tooliv-theme');
  return stored === 'light' || stored === 'dark' ? stored : null;
};

// 로컬 스토리지에 테마 저장
export const storeTheme = (mode: ThemeMode): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('tooliv-theme', mode);
  }
};

// 테마 색상 가져오기 (CSS 변수에서)
export const getCSSVariable = (name: string): string => {
  if (typeof document === 'undefined') return '';
  
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--tooliv-${name}`)
    .trim();
};

// 색상 밝기 계산
export const getColorBrightness = (hex: string): number => {
  const color = hex.replace('#', '');
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  
  return (r * 299 + g * 587 + b * 114) / 1000;
};

// 색상이 어두운지 밝은지 판단
export const isColorDark = (hex: string): boolean => {
  return getColorBrightness(hex) < 128;
};

// 색상 대비 계산
export const getColorContrast = (color1: string, color2: string): number => {
  const brightness1 = getColorBrightness(color1);
  const brightness2 = getColorBrightness(color2);
  
  const lighter = Math.max(brightness1, brightness2);
  const darker = Math.min(brightness1, brightness2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

// 접근성을 위한 색상 대비 확인
export const isAccessibleContrast = (color1: string, color2: string): boolean => {
  const contrast = getColorContrast(color1, color2);
  return contrast >= 4.5; // WCAG AA 기준
};
