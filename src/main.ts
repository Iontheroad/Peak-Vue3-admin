import { Directive, createApp } from "vue";
import App from "./App.vue";
import pinia from "@/store";
import i18n from "@/lang"; // 国际化
import "dayjs/locale/zh-cn"; // 日期国际化
import "./mocks/index.ts"; // 使用mock
import VueGridLayout from "vue-grid-layout"; // 拖拽组件
import directives from "./directive";
/* 路由 */
import router from "@/routers";
// import "@/routers/auth"; // 路由拦截认证

/* element */
import "element-plus/dist/index.css";
import "@/styles/index.scss";

//svg icons
import "virtual:svg-icons-register"; // 引入注册脚本

const app = createApp(App);

app.use(i18n);
app.use(directives);
app.use(pinia);
app.use(router);
app.use(VueGridLayout);
app.mount("#app");
