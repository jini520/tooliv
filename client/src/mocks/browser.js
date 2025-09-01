import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// MSW Worker 설정
export const worker = setupWorker(...handlers);

// 개발 환경에서만 MSW 활성화
export const startMocking = async () => {
  // 이중 체크: 개발 환경인지 확인
  if (!import.meta.env.DEV) {
    console.log("🟢 프로덕션 환경: MSW가 비활성화되었습니다.");
    return;
  }

  // MSW가 이미 시작되었는지 확인
  if (worker.listenerCount && worker.listenerCount("request") > 0) {
    console.log("🟡 MSW가 이미 실행 중입니다.");
    return;
  }

  try {
    await worker.start({
      onUnhandledRequest: "bypass", // 처리되지 않은 요청은 실제 네트워크로 전달
      serviceWorker: {
        url: "/mockServiceWorker.js",
      },
      // 개발 환경에서만 활성화
      mode: "development",
    });
    console.log("🔴 MSW Mocking Server가 시작되었습니다.");
    console.log("📍 개발 환경에서만 동작합니다.");
  } catch (error) {
    console.error("MSW 시작 실패:", error);
  }
};

// MSW 중지
export const stopMocking = async () => {
  // 개발 환경에서만 중지 가능
  if (!import.meta.env.DEV) {
    console.log("🟢 프로덕션 환경: MSW 중지가 불가능합니다.");
    return;
  }

  try {
    await worker.stop();
    console.log("🟢 MSW Mocking Server가 중지되었습니다.");
  } catch (error) {
    console.error("MSW 중지 실패:", error);
  }
};
