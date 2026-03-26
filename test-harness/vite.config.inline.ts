import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// Builds the editor as a single self-contained HTML file with all JS/CSS inlined
export default defineConfig({
  root: "editor",
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: "../dist-inline",
    emptyOutDir: true,
  },
});
