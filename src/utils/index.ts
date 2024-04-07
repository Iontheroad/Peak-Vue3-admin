/**
 * 公共工具
 */
import { localStorage } from "@/utils/localStorage";

/**
 * @description 获取浏览器默认语言
 * @returns { "zh-cn"|"en" }
 */
export function getLanguage(): string {
  // 获取本地缓存的语言
  let language = localStorage.get("globalStore")?.language;
  if (language) {
    return language;
  }
  // 浏览器使用语言
  language = navigator.language.toLowerCase();

  const locales = Object.keys(messages);
  // 查看语言包是否包含浏览器使用的语言,有就跟随浏览器的语言
  if (locales.includes(language)) {
    return language;
  }
  // 没有就默认中文
  return "zh";
}
