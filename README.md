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

## 개발 가이드

### 커밋 메시지 규칙

프로젝트의 커밋 메시지는 [커밋 규칙](COMMIT_CONVENTION.md)을 따릅니다.

### Pull Request

PR을 생성할 때는 자동으로 생성되는 [PR 템플릿](.github/pull_request_template.md)을 사용해주세요.

### 이슈 생성

- 🐛 **버그 리포트**: [버그 리포트 템플릿](.github/ISSUE_TEMPLATE/bug_report.md) 사용
- ✨ **기능 요청**: [기능 요청 템플릿](.github/ISSUE_TEMPLATE/feature_request.md) 사용

## 프로젝트 기여

1. 이슈를 생성하거나 기존 이슈를 확인
2. 새로운 브랜치 생성: `git checkout -b feature/기능명`
3. 코드 작성 및 테스트
4. 커밋 메시지 규칙에 따라 커밋
5. PR 생성 및 리뷰 요청
