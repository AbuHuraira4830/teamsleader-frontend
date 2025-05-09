import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createRequire } from "node:module"; // Import createRequire
const require = createRequire(import.meta.url); // Create a CommonJS-like require
import ckeditor5 from "@ckeditor/vite-plugin-ckeditor5";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    ckeditor5({
      theme: require.resolve("@ckeditor/ckeditor5-theme-lark"), // Use the created require
    }),
  ],
  optimizeDeps: {
    exclude: [
      "@ckeditor/ckeditor5-core",
      "@ckeditor/ckeditor5-editor-classic",
      "@ckeditor/ckeditor5-table",
      "@ckeditor/ckeditor5-basic-styles",
      "@ckeditor/ckeditor5-upload",
    ],
  },
  resolve: {
    alias: {
      "@ckeditor": resolve(__dirname, "node_modules/@ckeditor"),
    },
  },
});
