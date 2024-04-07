/**
 * i18n配置
 */
import { getLanguage } from "@/utils";

import { createI18n } from "vue-i18n";

// 自定义本地语言
import enLocale from "./modules/en";
import zhCnLocale from "./modules/zh-cn";
const messages = {
  zh: {
    ...zhCnLocale
  },
  en: {
    ...enLocale
  }
};

const i18n = createI18n({
  allowComposition: true,
  legacy: false, // 如果要支持 compositionAPI，此项必须设置为 false
  locale: getLanguage(),
  // globalInjection: true, // 全局注册$t方法
  messages: messages
});

// /**
//  * @description 判断是否存在key的配置，并且翻译key对应的值
//  * $t 是 i18n 提供的根据 key 从语言包翻译对应的 value 方法
//  *    使用方式：<h3 class="title">{{ $t("login.title") }}</h3>
//  * i18n 工具类，主要使用 i18n 的 te (判断语言包是否存在key) 和 t (翻译) 两个方法
//  * @param title：翻译的key
//  * @returns
//  */
// export function getTranslateLanguage(title: string) {
//   // 判断是否存在国际化配置
//   const hasKey = i18n.global.te(title);
//   if (hasKey) {
//     const translatedTitle = i18n.global.t(title);
//     return translatedTitle;
//   }
//   // 如果没有原生返回
//   return title.split(".")[1];
// }

export default i18n;
