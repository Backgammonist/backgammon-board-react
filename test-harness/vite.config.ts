import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: "/editor/index.html",
  },
  build: {
    rollupOptions: {
      input: {
        editor: resolve(__dirname, "editor/index.html"),
        tests: resolve(__dirname, "tests/index.html"),
      },
    },
  },
});
