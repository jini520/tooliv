import { defineConfig } from "vite";
import { extname, relative, resolve } from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { fileURLToPath } from "node:url";
import { glob } from "glob";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      include: ["src"],
      exclude: [
        "src/**/*.stories.tsx",
        "src/**/*.test.tsx",
        "src/**/*.test.ts",
        "src/**/__tests__/**",
        "src/**/__mocks__/**",
        "src/**/stories/**",
      ],
    }),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
      input: Object.fromEntries(
        glob
          .sync("src/**/*.{ts,tsx}", {
            ignore: [
              "**/*.stories.tsx",
              "**/*.test.tsx",
              "**/*.test.ts",
              "**/__tests__/**",
              "**/__mocks__/**",
              "**/stories/**",
              "**/coverage/**",
              "**/node_modules/**",
            ],
          })
          .filter((file) => {
            // 필요한 파일들만 포함
            const includePatterns = [
              "src/index.ts",
              "src/components/**/*.tsx",
              "src/components/**/*.ts",
              "src/theme/**/*.tsx",
              "src/theme/**/*.ts",
              "src/styles/**/*.scss",
            ];

            return includePatterns.some((pattern) => {
              const regex = new RegExp(
                pattern.replace(/\*\*/g, ".*").replace(/\*/g, "[^/]*")
              );
              return regex.test(file);
            });
          })
          .map((file) => [
            relative("src", file.slice(0, file.length - extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),
      output: {
        assetFileNames: "assets/[name][extname]",
        chunkFileNames: "[name].js",
        entryFileNames: "[name].js",
      },
    },
  },
});
