# Tooliv UI 테마 시스템

Tooliv UI 라이브러리의 테마 시스템은 라이트 모드와 다크 모드를 지원하며, CSS 변수를 통해 일관된 디자인 토큰을 제공합니다.

## 🎨 브랜드 컬러

```typescript
import { brandColors } from "@tooliv/ui";

// 기본 브랜드 컬러
console.log(brandColors.primary); // '#FF9E89'
console.log(brandColors.secondary); // '#FF7585'
console.log(brandColors.third); // '#FFD089'
```

## 🌓 테마 모드

### 기본 사용법

```tsx
import { ThemeProvider, useTheme } from "@tooliv/ui";

function App() {
  return (
    <ThemeProvider defaultMode="light">
      <YourApp />
    </ThemeProvider>
  );
}

function YourComponent() {
  const { theme, mode, toggleTheme, setTheme } = useTheme();

  return (
    <div>
      <p>현재 테마: {mode}</p>
      <button onClick={toggleTheme}>테마 토글</button>
      <button onClick={() => setTheme("dark")}>다크 모드</button>
      <button onClick={() => setTheme("light")}>라이트 모드</button>
    </div>
  );
}
```

### 테마 토글 버튼

```tsx
import { ThemeToggle } from "@tooliv/ui";

function Header() {
  return (
    <header>
      <h1>My App</h1>
      <ThemeToggle showLabel size="lg" />
    </header>
  );
}
```

## 🎯 테마 훅

### useTheme

전체 테마 객체와 테마 관련 함수들을 제공합니다.

```tsx
const { theme, mode, toggleTheme, setTheme } = useTheme();
```

### useThemeMode

현재 테마 모드만 필요할 때 사용합니다.

```tsx
const mode = useThemeMode(); // 'light' | 'dark'
```

### useThemeColors

테마 색상만 필요할 때 사용합니다.

```tsx
const colors = useThemeColors();
console.log(colors.background.primary);
console.log(colors.text.primary);
```

## 🎨 CSS 변수

테마 시스템은 CSS 변수를 통해 모든 디자인 토큰을 제공합니다:

```css
/* 색상 */
--tooliv-primary: #ff9e89;
--tooliv-background-primary: #ffffff;
--tooliv-text-primary: #1a1a1a;

/* 간격 */
--tooliv-spacing-sm: 0.5rem;
--tooliv-spacing-md: 1rem;

/* 테두리 반경 */
--tooliv-radius-md: 0.375rem;

/* 그림자 */
--tooliv-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

/* 폰트 */
--tooliv-font-size-base: 1rem;
--tooliv-font-weight-medium: 500;
```

## 🔧 테마 유틸리티

### CSS 변수 적용

```tsx
import { applyThemeToCSS } from "@tooliv/ui";

// 테마를 CSS 변수로 적용
applyThemeToCSS(theme);
```

### 시스템 테마 감지

```tsx
import { getSystemTheme } from "@tooliv/ui";

const systemTheme = getSystemTheme(); // 'light' | 'dark'
```

### 색상 유틸리티

```tsx
import {
  getColorBrightness,
  isColorDark,
  getColorContrast,
  isAccessibleContrast,
} from "@tooliv/ui";

const brightness = getColorBrightness("#FF9E89");
const isDark = isColorDark("#FF9E89");
const contrast = getColorContrast("#FFFFFF", "#000000");
const isAccessible = isAccessibleContrast("#FFFFFF", "#000000");
```

## 📱 반응형 테마

테마 시스템은 사용자의 시스템 설정을 자동으로 감지합니다:

- **시스템 테마 감지**: `prefers-color-scheme` 미디어 쿼리 지원
- **자동 전환**: 시스템 테마 변경 시 자동으로 테마 업데이트
- **로컬 저장**: 사용자가 선택한 테마를 로컬 스토리지에 저장

## 🎭 커스텀 테마

기존 테마를 확장하여 커스텀 테마를 만들 수 있습니다:

```tsx
import { lightTheme, Theme } from "@tooliv/ui";

const customTheme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: "#FF6B6B", // 커스텀 primary 색상
  },
};
```

## 🧪 테스트

테마 시스템을 테스트할 때는 `ThemeProvider`로 컴포넌트를 감싸야 합니다:

```tsx
import { render } from "@testing-library/react";
import { ThemeProvider } from "@tooliv/ui";

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider defaultMode="light">{component}</ThemeProvider>);
};
```

## 📚 예시

전체 예시는 `examples/` 폴더를 참조하세요.
