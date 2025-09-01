import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  define: {
    // MSW 활성화 플래그 (개발 환경에서만)
    __MSW_ENABLED__: JSON.stringify(true),
  },
});
