import { http, HttpResponse } from "msw";

// 사용자 관련 API
export const userHandlers = [
  // 사용자 정보 조회
  http.get("/api/users/me", () => {
    return HttpResponse.json({
      id: 1,
      username: "jini520",
      email: "jini520@example.com",
      name: "진이",
      avatar: "https://via.placeholder.com/150",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    });
  }),

  // 사용자 정보 수정
  http.put("/api/users/me", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      id: 1,
      ...body,
      updatedAt: new Date().toISOString(),
    });
  }),

  // 사용자 프로필 이미지 업로드
  http.post("/api/users/me/avatar", () => {
    return HttpResponse.json({
      success: true,
      avatarUrl: "https://via.placeholder.com/150",
      message: "프로필 이미지가 업로드되었습니다.",
    });
  }),
];

// 게시물 관련 API
export const postHandlers = [
  // 게시물 목록 조회
  http.get("/api/posts", ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    const posts = Array.from({ length: limit }, (_, index) => ({
      id: (page - 1) * limit + index + 1,
      title: `게시물 제목 ${(page - 1) * limit + index + 1}`,
      content: `이것은 게시물 ${(page - 1) * limit + index + 1}의 내용입니다.`,
      author: {
        id: 1,
        username: "jini520",
        name: "진이",
      },
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 50),
      createdAt: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      updatedAt: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
    }));

    return HttpResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total: 100,
        totalPages: Math.ceil(100 / limit),
      },
    });
  }),

  // 게시물 상세 조회
  http.get("/api/posts/:id", ({ params }) => {
    const { id } = params;

    return HttpResponse.json({
      id: parseInt(id),
      title: `게시물 제목 ${id}`,
      content: `이것은 게시물 ${id}의 상세 내용입니다. 이 게시물은 사용자들이 읽고 이해할 수 있는 유용한 정보를 담고 있습니다.`,
      author: {
        id: 1,
        username: "jini520",
        name: "진이",
        avatar: "https://via.placeholder.com/150",
      },
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 50),
      tags: ["개발", "프로그래밍", "React"],
      createdAt: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      updatedAt: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
    });
  }),

  // 게시물 생성
  http.post("/api/posts", async ({ request }) => {
    const body = await request.json();

    return HttpResponse.json(
      {
        id: Math.floor(Math.random() * 10000),
        ...body,
        author: {
          id: 1,
          username: "jini520",
          name: "진이",
        },
        likes: 0,
        comments: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      { status: 201 }
    );
  }),

  // 게시물 수정
  http.put("/api/posts/:id", async ({ params, request }) => {
    const { id } = params;
    const body = await request.json();

    return HttpResponse.json({
      id: parseInt(id),
      ...body,
      updatedAt: new Date().toISOString(),
    });
  }),

  // 게시물 삭제
  http.delete("/api/posts/:id", () => {
    return HttpResponse.json({
      success: true,
      message: "게시물이 삭제되었습니다.",
    });
  }),
];

// 댓글 관련 API
export const commentHandlers = [
  // 댓글 목록 조회
  http.get("/api/posts/:postId/comments", ({ params, request }) => {
    const { postId } = params;
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    const comments = Array.from({ length: limit }, (_, index) => ({
      id: (page - 1) * limit + index + 1,
      content: `댓글 내용 ${(page - 1) * limit + index + 1}`,
      author: {
        id: Math.floor(Math.random() * 5) + 1,
        username: `user${Math.floor(Math.random() * 5) + 1}`,
        name: `사용자${Math.floor(Math.random() * 5) + 1}`,
      },
      postId: parseInt(postId),
      likes: Math.floor(Math.random() * 20),
      createdAt: new Date(
        Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
      ).toISOString(),
    }));

    return HttpResponse.json({
      comments,
      pagination: {
        page,
        limit,
        total: 50,
        totalPages: Math.ceil(50 / limit),
      },
    });
  }),

  // 댓글 생성
  http.post("/api/posts/:postId/comments", async ({ params, request }) => {
    const { postId } = params;
    const body = await request.json();

    return HttpResponse.json(
      {
        id: Math.floor(Math.random() * 10000),
        content: body.content,
        author: {
          id: 1,
          username: "jini520",
          name: "진이",
        },
        postId: parseInt(postId),
        likes: 0,
        createdAt: new Date().toISOString(),
      },
      { status: 201 }
    );
  }),
];

// 인증 관련 API
export const authHandlers = [
  // 로그인
  http.post("/api/auth/login", async ({ request }) => {
    const body = await request.json();

    if (body.email === "test@example.com" && body.password === "password") {
      return HttpResponse.json({
        success: true,
        token: "mock-jwt-token-" + Date.now(),
        user: {
          id: 1,
          username: "jini520",
          email: "test@example.com",
          name: "진이",
        },
      });
    } else {
      return HttpResponse.json(
        {
          success: false,
          message: "이메일 또는 비밀번호가 올바르지 않습니다.",
        },
        { status: 401 }
      );
    }
  }),

  // 회원가입
  http.post("/api/auth/register", async ({ request }) => {
    const body = await request.json();

    return HttpResponse.json(
      {
        success: true,
        message: "회원가입이 완료되었습니다.",
        user: {
          id: Math.floor(Math.random() * 10000),
          username: body.username,
          email: body.email,
          name: body.name,
        },
      },
      { status: 201 }
    );
  }),

  // 로그아웃
  http.post("/api/auth/logout", () => {
    return HttpResponse.json({
      success: true,
      message: "로그아웃되었습니다.",
    });
  }),

  // 토큰 갱신
  http.post("/api/auth/refresh", () => {
    return HttpResponse.json({
      success: true,
      token: "mock-jwt-token-refreshed-" + Date.now(),
    });
  }),
];

// 파일 업로드 관련 API
export const uploadHandlers = [
  // 파일 업로드
  http.post("/api/upload", async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get("file");

    if (file) {
      return HttpResponse.json({
        success: true,
        fileUrl: "https://via.placeholder.com/300x200",
        fileName: file.name,
        fileSize: file.size,
        message: "파일이 업로드되었습니다.",
      });
    } else {
      return HttpResponse.json(
        {
          success: false,
          message: "파일이 선택되지 않았습니다.",
        },
        { status: 400 }
      );
    }
  }),
];

// 모든 핸들러를 하나의 배열로 결합
export const handlers = [
  ...userHandlers,
  ...postHandlers,
  ...commentHandlers,
  ...authHandlers,
  ...uploadHandlers,
];
