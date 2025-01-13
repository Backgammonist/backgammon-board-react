import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), dts({ include: ["src"] })],
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
