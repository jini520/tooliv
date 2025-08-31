# Storybook 설정

이 폴더는 Tooliv UI 라이브러리의 Storybook 설정을 포함합니다.

## 📁 파일 구조

- `main.ts` - Storybook 메인 설정 (스토리, 애드온, 빌드 설정)
- `preview.ts` - 스토리 프리뷰 설정 (글로벌 파라미터, 데코레이터)
- `README.md` - 이 파일

## 🚀 사용법

### 개발 서버 실행

```bash
pnpm storybook
```

### 빌드

```bash
pnpm build-storybook
```

## ⚙️ 설정 내용

### 애드온

- `@storybook/addon-essentials` - 핵심 기능
- `@storybook/addon-docs` - 문서화
- `@storybook/addon-interactions` - 상호작용 테스트
- `@storybook/addon-links` - 스토리 간 링크
- `@storybook/addon-themes` - 테마 전환
- `@storybook/addon-styling` - 스타일링 지원

### 테마 시스템

- 라이트/다크 모드 지원
- CSS 변수를 통한 테마 전환
- 시스템 테마 자동 감지
- **단일 소스**: `src/theme/colors.ts`에서 모든 색상 관리

### 반응형 디자인

- 모바일, 태블릿, 데스크톱 뷰포트 설정
- 다양한 배경색 옵션

### 스타일링

- **통합된 색상 시스템**: TypeScript와 CSS 변수 동기화
- 글로벌 CSS 스타일
- 테마별 색상 시스템

## 🎨 색상 시스템 통합

### 단일 소스 원칙

- 모든 색상은 `src/theme/colors.ts`에서 정의
- CSS 변수는 TypeScript 색상 값을 기반으로 자동 생성
- 중복 제거로 일관성 보장

### 사용법

```typescript
// TypeScript에서 색상 사용
import { lightColors, darkColors } from "@tooliv/ui/theme/colors";

// CSS 변수로 자동 변환
import { applyLightTheme, applyDarkTheme } from "@tooliv/ui/theme/utils";
```

## 🎨 커스터마이징

### 새로운 애드온 추가

`main.ts`의 `addons` 배열에 추가

### 테마 수정

`preview.ts`의 `decorators` 섹션에서 수정

### 글로벌 스타일 변경

`src/styles/base.css`에서 수정

### 색상 추가/수정

`src/theme/colors.ts`에서 수정하면 CSS 변수도 자동 업데이트
