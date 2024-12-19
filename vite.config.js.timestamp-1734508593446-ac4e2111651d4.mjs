// vite.config.js
import { defineConfig } from "file:///D:/HURAIRA/teamleaders-frontend-updated-backup/node_modules/vite/dist/node/index.js";
import react from "file:///D:/HURAIRA/teamleaders-frontend-updated-backup/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { createRequire } from "node:module";
import ckeditor5 from "file:///D:/HURAIRA/teamleaders-frontend-updated-backup/node_modules/@ckeditor/vite-plugin-ckeditor5/dist/index.mjs";
import { resolve } from "path";
import { visualizer } from "file:///D:/HURAIRA/teamleaders-frontend-updated-backup/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
var __vite_injected_original_dirname = "D:\\HURAIRA\\teamleaders-frontend-updated-backup";
var __vite_injected_original_import_meta_url = "file:///D:/HURAIRA/teamleaders-frontend-updated-backup/vite.config.js";
var require2 = createRequire(__vite_injected_original_import_meta_url);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      // Automatically open the report in your browser
      filename: "bundle-report.html"
      // Customize the file name (optional)
      // Other options as needed (see below)   
    }),
    ckeditor5({
      theme: require2.resolve("@ckeditor/ckeditor5-theme-lark")
      // Use the created require
    })
  ],
  optimizeDeps: {
    exclude: [
      "@ckeditor/ckeditor5-core",
      "@ckeditor/ckeditor5-editor-classic",
      "@ckeditor/ckeditor5-table",
      "@ckeditor/ckeditor5-basic-styles",
      "@ckeditor/ckeditor5-upload"
    ]
  },
  resolve: {
    alias: {
      "@ckeditor": resolve(__vite_injected_original_dirname, "node_modules/@ckeditor")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxIVVJBSVJBXFxcXHRlYW1sZWFkZXJzLWZyb250ZW5kLXVwZGF0ZWQtYmFja3VwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxIVVJBSVJBXFxcXHRlYW1sZWFkZXJzLWZyb250ZW5kLXVwZGF0ZWQtYmFja3VwXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9IVVJBSVJBL3RlYW1sZWFkZXJzLWZyb250ZW5kLXVwZGF0ZWQtYmFja3VwL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgeyBjcmVhdGVSZXF1aXJlIH0gZnJvbSBcIm5vZGU6bW9kdWxlXCI7IC8vIEltcG9ydCBjcmVhdGVSZXF1aXJlXHJcbmNvbnN0IHJlcXVpcmUgPSBjcmVhdGVSZXF1aXJlKGltcG9ydC5tZXRhLnVybCk7IC8vIENyZWF0ZSBhIENvbW1vbkpTLWxpa2UgcmVxdWlyZVxyXG5pbXBvcnQgY2tlZGl0b3I1IGZyb20gXCJAY2tlZGl0b3Ivdml0ZS1wbHVnaW4tY2tlZGl0b3I1XCI7XHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSBcInJvbGx1cC1wbHVnaW4tdmlzdWFsaXplclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCgpLFxyXG4gICAgdmlzdWFsaXplcih7XHJcbiAgICAgIG9wZW46IHRydWUsIC8vIEF1dG9tYXRpY2FsbHkgb3BlbiB0aGUgcmVwb3J0IGluIHlvdXIgYnJvd3NlclxyXG4gICAgICBmaWxlbmFtZTogXCJidW5kbGUtcmVwb3J0Lmh0bWxcIiwgLy8gQ3VzdG9taXplIHRoZSBmaWxlIG5hbWUgKG9wdGlvbmFsKVxyXG4gICAgICAvLyBPdGhlciBvcHRpb25zIGFzIG5lZWRlZCAoc2VlIGJlbG93KSAgIFxyXG4gICAgfSksXHJcblxyXG4gICAgY2tlZGl0b3I1KHtcclxuICAgICAgdGhlbWU6IHJlcXVpcmUucmVzb2x2ZShcIkBja2VkaXRvci9ja2VkaXRvcjUtdGhlbWUtbGFya1wiKSwgLy8gVXNlIHRoZSBjcmVhdGVkIHJlcXVpcmVcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICBleGNsdWRlOiBbXHJcbiAgICAgIFwiQGNrZWRpdG9yL2NrZWRpdG9yNS1jb3JlXCIsXHJcbiAgICAgIFwiQGNrZWRpdG9yL2NrZWRpdG9yNS1lZGl0b3ItY2xhc3NpY1wiLFxyXG4gICAgICBcIkBja2VkaXRvci9ja2VkaXRvcjUtdGFibGVcIixcclxuICAgICAgXCJAY2tlZGl0b3IvY2tlZGl0b3I1LWJhc2ljLXN0eWxlc1wiLFxyXG4gICAgICBcIkBja2VkaXRvci9ja2VkaXRvcjUtdXBsb2FkXCIsXHJcbiAgICBdLFxyXG4gIH0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgXCJAY2tlZGl0b3JcIjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwibm9kZV9tb2R1bGVzL0Bja2VkaXRvclwiKSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1UsU0FBUyxvQkFBb0I7QUFDL1YsT0FBTyxXQUFXO0FBQ2xCLFNBQVMscUJBQXFCO0FBRTlCLE9BQU8sZUFBZTtBQUN0QixTQUFTLGVBQWU7QUFDeEIsU0FBUyxrQkFBa0I7QUFOM0IsSUFBTSxtQ0FBbUM7QUFBZ0ssSUFBTSwyQ0FBMkM7QUFHMVAsSUFBTUEsV0FBVSxjQUFjLHdDQUFlO0FBSzdDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFdBQVc7QUFBQSxNQUNULE1BQU07QUFBQTtBQUFBLE1BQ04sVUFBVTtBQUFBO0FBQUE7QUFBQSxJQUVaLENBQUM7QUFBQSxJQUVELFVBQVU7QUFBQSxNQUNSLE9BQU9BLFNBQVEsUUFBUSxnQ0FBZ0M7QUFBQTtBQUFBLElBQ3pELENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTO0FBQUEsTUFDUDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsYUFBYSxRQUFRLGtDQUFXLHdCQUF3QjtBQUFBLElBQzFEO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInJlcXVpcmUiXQp9Cg==
