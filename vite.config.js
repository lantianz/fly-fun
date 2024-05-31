// import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// element-plus 按需引入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames: "[ext]/[name]-[hash].[ext]",
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
  plugins: [
    vue(),
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      // 配置element-plus组件库的sass样式配色
      resolvers: [ElementPlusResolver({ importStyle: "sass" })],
    }),
  ],
  resolve: {
    alias: { "@": resolve("src") }
    // {"@": fileURLToPath(new URL("src", import.meta.url)),},
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入定制化样式文件进行样式覆盖
        additionalData: `
          @use "@/styles/element/index.scss" as *;
          @use "@/styles/var.scss" as *;
        `,
      },
    },
  },
  // 配置前端服务地址和端口
  server: {
    host: "0.0.0.0", //111.67.201.175
    port: 8882,
    // 是否开启 https
    https: false,
  },
  // 设置反向代理，跨域
  proxy: {
    '/api': {
      // 后台地址
      target: 'http://111.67.201.175:8082',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    },
  }
});
