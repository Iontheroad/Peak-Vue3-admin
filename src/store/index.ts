/**
 * 数据仓库
 */

/**
 * 状态仓库
 */

import { createPinia, defineStore } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import type { PersistedStateOptions } from "pinia-plugin-persistedstate";
import { getLanguage } from "@/utils";
import { useUserStore } from "./modules/user";
import { DEFAULT_PRIMARY } from "@/config/config";

interface GlobalType {
  elementSize: "default" | "large" | "small";
  language: string;
  themeConfig: ThemeConfigProps;
}
interface ThemeConfigProps {
  layout: "vertical" | "classic" | "transverse" | "columns";
  isShowLogo: boolean;
  isFixedHeader: boolean;
  isShowBreadcrumb: boolean;
  isShowBreadcrumbIcon: boolean;
  isShowTabsView: boolean;
  isShowTabsIcon: boolean;
  isShowFooter: boolean;
  primary: string;
  isDark: boolean;
}

// 全局状态
const useGlobalStore = defineStore("globalStore", {
  state: (): GlobalType => ({
    elementSize: "default",
    language: getLanguage(), // 获取语言
    /* 主体配置 */
    themeConfig: {
      // 布局切换 ==>  纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns
      layout: "vertical",
      isShowLogo: true, // 是否显示Logo
      isFixedHeader: true, // 是否固定表头
      isShowBreadcrumb: true, // 面包屑导航
      isShowBreadcrumbIcon: true, // 面包屑导航图标
      isShowTabsView: true, // 是否显示标签视图
      isShowTabsIcon: true, // 是否显示标签icon
      isShowFooter: true, // 是否显示页脚
      primary: DEFAULT_PRIMARY, // 默认 primary 主题颜色
      isDark: false // 暗黑模式
    }
  }),

  actions: {
    /**
     * 修改语言
     * @param language
     */
    changeLanguage(language: string) {
      this.language = language;
    },

    /**
     * 设置主题
     * @param themeConfig
     */
    setThemeConfig(themeConfig: ThemeConfigProps) {
      this.themeConfig = themeConfig;
    }
  },

  persist: {
    enabled: true, // 开启数据存储
    strategies: [
      {
        key: "globalStore",
        storage: localStorage,
        paths: []
      }
    ]
  } as PersistedStateOptions
});

const pinia = createPinia();
// 数据持久化
pinia.use(piniaPluginPersistedstate);
export { useGlobalStore, useUserStore };
export default pinia;
