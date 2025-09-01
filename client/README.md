# Tooliv Client

React 19와 Vite를 사용한 클라이언트 애플리케이션입니다.

## 🚀 시작하기

### 의존성 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

### 빌드

```bash
pnpm build
```

## 🔴 MSW Mocking Server

이 프로젝트는 [MSW(Mock Service Worker)](https://mswjs.io/)를 사용하여 API 모킹을 구현하고 있습니다.

**⚠️ 중요: MSW는 개발 환경에서만 동작합니다!**

- **개발 환경**: MSW가 자동으로 활성화되어 Mock API 제공
- **프로덕션 환경**: MSW가 완전히 비활성화되어 실제 API 호출

### MSW 설정

1. **핸들러 정의**: `src/mocks/handlers.js`에서 API 엔드포인트별 모킹 로직을 정의
2. **브라우저 설정**: `src/mocks/browser.js`에서 MSW Worker 설정
3. **초기화**: `main.jsx`에서 개발 환경에서만 MSW 활성화

### 사용 가능한 Mock API

#### 사용자 관련

- `GET /api/users/me` - 사용자 정보 조회
- `PUT /api/users/me` - 사용자 정보 수정
- `POST /api/users/me/avatar` - 프로필 이미지 업로드

#### 게시물 관련

- `GET /api/posts` - 게시물 목록 조회 (페이지네이션 지원)
- `GET /api/posts/:id` - 게시물 상세 조회
- `POST /api/posts` - 게시물 생성
- `PUT /api/posts/:id` - 게시물 수정
- `DELETE /api/posts/:id` - 게시물 삭제

#### 댓글 관련

- `GET /api/posts/:postId/comments` - 댓글 목록 조회
- `POST /api/posts/:postId/comments` - 댓글 생성

#### 인증 관련

- `POST /api/auth/login` - 로그인 (test@example.com / password)
- `POST /api/auth/register` - 회원가입
- `POST /api/auth/logout` - 로그아웃
- `POST /api/auth/refresh` - 토큰 갱신

#### 파일 업로드

- `POST /api/upload` - 파일 업로드

### MSW 명령어

```bash
# MSW Worker 파일 초기화
pnpm msw:init

# MSW Worker 파일 재생성
pnpm msw:generate
```

### MSW 동작 방식

1. **개발 환경에서만 활성화**: `import.meta.env.DEV`로 환경 확인
2. **이중 안전장치**: main.jsx와 browser.js에서 모두 환경 확인
3. **Service Worker 사용**: 브라우저의 Service Worker API를 활용
4. **네트워크 요청 가로채기**: 정의된 핸들러가 요청을 가로채고 모킹 응답 반환
5. **미처리 요청 처리**: `onUnhandledRequest: 'bypass'`로 실제 네트워크로 전달
6. **중복 실행 방지**: 이미 실행 중인 MSW 감지 및 방지

### Mock 데이터 특징

- **동적 데이터**: `Math.random()`을 사용하여 매번 다른 데이터 생성
- **현실적인 데이터**: 실제 API와 유사한 응답 구조
- **에러 처리**: 적절한 HTTP 상태 코드와 에러 메시지
- **페이지네이션**: 실제 API와 동일한 페이지네이션 구조

### 개발 팁

1. **콘솔 확인**: MSW 시작/중지 메시지를 콘솔에서 확인
2. **Network 탭**: 브라우저 개발자 도구에서 MSW 요청 확인
3. **핸들러 수정**: `handlers.js` 수정 후 페이지 새로고침
4. **실제 API 전환**: 프로덕션 환경에서는 MSW가 자동으로 비활성화

## 🎨 UI 컴포넌트

`@tooliv/ui` 라이브러리의 컴포넌트들을 사용합니다:

- `Button` - 버튼 컴포넌트
- `Input` - 입력 필드 컴포넌트
- `ThemeToggle` - 테마 토글 컴포넌트
- `Card` - 카드 컴포넌트

## 🌙 테마 시스템

다크모드와 라이트모드를 지원하는 테마 시스템이 구현되어 있습니다:

- `ThemeProvider`로 전체 앱에 테마 컨텍스트 제공
- `useTheme` 훅으로 현재 테마 상태와 변경 함수 사용
- `ThemeToggle` 컴포넌트로 테마 전환

## 📁 프로젝트 구조

```
client/
├── public/
│   └── mockServiceWorker.js    # MSW Worker 파일
├── src/
│   ├── mocks/
│   │   ├── handlers.js         # API 모킹 핸들러
│   │   └── browser.js          # MSW 브라우저 설정
│   ├── App.jsx                 # 메인 앱 컴포넌트
│   └── main.jsx                # 앱 진입점
├── package.json                 # 프로젝트 설정
└── vite.config.js              # Vite 설정
```

## 🔧 개발 환경

- **Node.js**: 18+
- **pnpm**: 8+
- **React**: 19.1.1
- **Vite**: 7.1.2
- **MSW**: 2.11.1
