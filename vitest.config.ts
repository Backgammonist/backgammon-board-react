// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    browser: {
      name: "chromium",
      enabled: true,
      provider: "playwright",
    },
  },
});
