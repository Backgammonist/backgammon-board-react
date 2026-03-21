import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), dts({ include: ["src"] })],
  test: {
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    setupFiles: ["./src/test/setup.ts"],
    passWithNoTests: true,
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      name: "BackgammonBoard",
      fileName: (format) => `index.${format === "es" ? "js" : "umd.cjs"}`,
    },
    // sourcemap: true,
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        banner: `'use client';`,
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
