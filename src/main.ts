import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import pinia from "@/store";
import i18n from "@/languages/index"; // 国际化
import "dayjs/locale/zh-cn"; // 日期国际化

/* element */
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";

// scss
import "@/styles/index.scss";
// font css
import "@/assets/fonts/font.scss";

//svg icons
import "virtual:svg-icons-register"; // 引入注册脚本
import SvgIcon from "@/components/SvgIcon/index.vue";

const app = createApp(App);

app.component("SvgIcon", SvgIcon);

app.use(router).use(i18n).use(pinia).mount("#app");
