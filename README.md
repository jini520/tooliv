# Tooliv Monorepo

React 19와 Vite를 사용한 모노레포 프로젝트입니다.

## 프로젝트 구조

```
tooliv/
├── client/          # React 19 애플리케이션
├── ui/              # UI 컴포넌트 라이브러리
├── package.json     # 루트 패키지 설정
└── pnpm-workspace.yaml # pnpm 워크스페이스 설정
```

## 시작하기

### 의존성 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
# Client 개발 서버 실행
pnpm dev

# UI 라이브러리 빌드 (watch 모드)
pnpm --filter ui dev
```

### 빌드

```bash
# 전체 빌드
pnpm build

# UI 라이브러리만 빌드
pnpm build:ui
```

## 사용 가능한 스크립트

- `pnpm dev` - Client 개발 서버 실행
- `pnpm build` - Client 프로덕션 빌드
- `pnpm build:ui` - UI 라이브러리 빌드
- `pnpm clean` - 모든 빌드 파일 정리

## 기술 스택

- **Client**: React 19, Vite, TypeScript
- **UI Library**: React 19, Vite, TypeScript, vite-plugin-dts
- **Package Manager**: pnpm
- **Build Tool**: Vite
