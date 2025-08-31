// 기본 브랜드 컬러
export const brandColors = {
  primary: '#FF9E89',
  secondary: '#FF7585',
  third: '#FFD089',
} as const;

// 라이트 모드 색상
export const lightColors = {
  // 브랜드 컬러
  ...brandColors,
  
  // 배경색
  background: {
    primary: '#FFFFFF',
    secondary: '#F8F9FA',
    tertiary: '#F1F3F4',
  },
  
  // 텍스트 색상
  text: {
    primary: '#1A1A1A',
    secondary: '#4A4A4A',
    tertiary: '#6B7280',
    disabled: '#9CA3AF',
    inverse: '#FFFFFF',
  },
  
  // 테두리 색상
  border: {
    primary: '#E5E7EB',
    secondary: '#D1D5DB',
    tertiary: '#9CA3AF',
    focus: brandColors.primary,
  },
  
  // 상태 색상
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  
  // 그림자 색상
  shadow: {
    light: 'rgba(0, 0, 0, 0.05)',
    medium: 'rgba(0, 0, 0, 0.1)',
    heavy: 'rgba(0, 0, 0, 0.15)',
  },
  
  // 오버레이 색상
  overlay: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.3)',
    heavy: 'rgba(0, 0, 0, 0.6)',
  },
} as const;

// 다크 모드 색상
export const darkColors = {
  // 브랜드 컬러 (다크 모드에서는 더 밝고 선명하게)
  primary: '#FFB3A3', // 더 밝은 살구색
  secondary: '#FF8A9A', // 더 밝은 핑크색
  third: '#FFDDA3', // 더 밝은 노란색
  
  // 배경색
  background: {
    primary: '#0F0F0F',
    secondary: '#1A1A1A',
    tertiary: '#2A2A2A',
  },
  
  // 텍스트 색상
  text: {
    primary: '#FFFFFF',
    secondary: '#E5E7EB',
    tertiary: '#D1D5DB',
    disabled: '#6B7280',
    inverse: '#1A1A1A',
  },
  
  // 테두리 색상
  border: {
    primary: '#374151',
    secondary: '#4B5563',
    tertiary: '#6B7280',
    focus: '#FFB3A3', // 다크 모드 primary
  },
  
  // 상태 색상
  status: {
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    info: '#60A5FA',
  },
  
  // 그림자 색상
  shadow: {
    light: 'rgba(0, 0, 0, 0.3)',
    medium: 'rgba(0, 0, 0, 0.5)',
    heavy: 'rgba(0, 0, 0, 0.7)',
  },
  
  // 오버레이 색상
  overlay: {
    light: 'rgba(0, 0, 0, 0.4)',
    medium: 'rgba(0, 0, 0, 0.6)',
    heavy: 'rgba(0, 0, 0, 0.8)',
  },
} as const;

// 색상 타입 정의
export type BrandColors = typeof brandColors;
export type LightColors = typeof lightColors;
export type DarkColors = typeof darkColors;
export type ThemeColors = LightColors | DarkColors;
