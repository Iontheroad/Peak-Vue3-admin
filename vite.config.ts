import { defineConfig, ConfigEnv, UserConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
import AutoImport from "unplugin-auto-import/vite"; // 按需导入api
import Components from "unplugin-vue-components/vite"; // 按需导入组件
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"; // Element Plus的解析器
import { viteMockServe } from "vite-plugin-mock";
// 增加 vue文件 script name值
import vueSetupExtend from "vite-plugin-vue-setup-extend";
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  /**
   * @description 获取 .env 环境配置文件信息
   * @return {
   *  VITE_APP_TITLE: 'vue3-element-admin',
   *  VITE_APP_PORT: '3000',
   *  VITE_APP_BASE_API: '/dev-api'
   *  VITE_USER_NODE_ENV: 'development'|'production'
   * }
   */
  const env = loadEnv(mode, process.cwd());
  console.log(command, mode);

  return {
    // base: "./",
    base: env.VITE_USER_NODE_ENV == "production" ? "/peak-vue3-admin" : "/",
    resolve: {
      // 别名配置
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js", // 清除i18n控制栏警告
      },
    },
    /* 本地反向代理解决浏览器跨域限制*/
    server: {
      host: "0.0.0.0", // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
      // port: Number(env.VITE_APP_PORT), // 指定开发服务器端口。注意：如果端口已经被使用，Vite 会自动尝试下一个可用的端口，所以这可能不是开发服务器最终监听的实际端口。
      port: Number(env.VITE_APP_PORT),
      open: true, // 是否自动打开浏览器
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: "http://xxxxx", // 不使用mock的话 换成真正的代理接口 后端接口地址
          changeOrigin: true,
          rewrite: (path) => {
            // 重写请求路径
            return path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), "");
            // return path.replace(/^env.VITE_APP_BASE_API/, "");
          },
        },
      },
    },
    /**
     * // plugin 赋予了 webpack 各种灵活的功能，例如打包优化。目的在于解决 loader 无法实现的其他事。
     * // 扩展插件，在 Webpack 构建流程中的特定时机会广播出对应的事件，插件可以监听这些事件的发生，在特定时机做对应的事情。
     */
    plugins: [
      vue(),
      vueSetupExtend(),
      // 使用 svg 图标
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      }),
      // 按需自动导入api为Vite,
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      // 按需组件自动导入Vue。
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      viteMockServe({
        mockPath: "./src/mocks",
        // 设置是否启用本地开发环境的mock服务 如果是，则启用本地mock服务。
        localEnabled: command == "serve", // 设置是否启用本地模拟.ts文件，不要在生产环境中打开

        // 设置是否启用生产环境的mock服务 如果不是"serve"，则启用生产环境mock服务。
        prodEnabled: command !== "serve", // 控制mock打包到最终代码内

        // 在生成的代码中插入的代码片段。导入了一个名为setupProdMockServer的函数，并调用它来设置生产环境的mock服务。这样，在生产环境中也可以使用mock数据来模拟接口请求。
        injectCode: `
        import { setupProdMockServer } from './mocks/index';
        setupProdMockServer();
        `,
      }),
    ],
  };
});
