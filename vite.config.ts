import { defineConfig, ConfigEnv, UserConfig, loadEnv } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);

  return {
    root,
    base: env.VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src")
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/var.scss";` // 在处理每个SCSS 文件时，都会在文件内容的最前面自动添加这一行代码，以导入 var.scss 文件
        }
      }
    },
    server: {
      host: "0.0.0.0",
      port: Number(env.VITE_PORT),
      open: env.VITE_OPEN === "true",
      // cors: true,
      proxy: {
        [env.VITE_API_URL]: {
          // target: "http://47.94.217.248:8889",
          target: "http://localhost:10003",
          changeOrigin: true
          // rewrite: (path: string): string => {
          //   // 重写请求路径
          //   return path.replace(new RegExp(`^${env.VITE_API_URL}`), "");
          //   // return path.replace(/^env.VITE_API_URL/, "");
          // }
        }
      }
    },
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]"
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  };
});
