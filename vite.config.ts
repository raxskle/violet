import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr"; // 用于将svg转换为ReactComponent引入
import { ViteAliases } from "vite-aliases";

export default defineConfig({
  plugins: [react(), svgr(), ViteAliases()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/scss/main.scss";',
        javascriptEnabled: true,
      },
    },
  },
});
