/**
 * 公共工具
 */
import { localStorage } from "@/utils/localStorage";

/**
 * @description 获取本地缓存语言 or 浏览器语言
 * @returns { "zh"|"en" }
 */
export function getLanguage(): "zh" | "en" {
  // 获取本地缓存的语言
  let language = localStorage.get("globalStore")?.language;
  if (language) return language;

  // 浏览器使用语言
  let browserLang = navigator?.language;

  language = browserLang.toLowerCase();
  if (["zh", "zh-cn", "cn"].includes(language)) return "zh";
  else if (["en"].includes(language)) return "en";

  return "zh";
}
