import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";
import { useGlobalStore } from "@/store/index";
import { DEFAULT_PRIMARY } from "@/config/config";

import { getLightColor, getDarkColor } from "@/utils/theme/tool";
import { menuTheme } from "@/styles/theme/menu";
import { asideTheme } from "@/styles/theme/aside";
import { headerTheme } from "@/styles/theme/header";
/**
 * @description 切换主题
 * */
export const useTheme = () => {
  const globalStore = useGlobalStore();
  const { themeConfig } = storeToRefs(globalStore);

  // 切换暗黑模式 ==> 同时修改主题颜色、侧边栏、头部颜色
  const switchDark = () => {
    const html = document.documentElement as HTMLElement;
    if (themeConfig.value.isDark) html.setAttribute("class", "dark");
    else html.setAttribute("class", "");
    changePrimary(themeConfig.value.primary);
    setAsideTheme();
    setHeaderTheme();
  };

  // 修改主题颜色
  const changePrimary = (val: string | null): any => {
    if (!val) {
      val = DEFAULT_PRIMARY;
      ElMessage({
        type: "success",
        message: `主题颜色已重置为 ${DEFAULT_PRIMARY}`
      });
    }
    // 为了兼容暗黑模式下主题颜色也正常，以下方法计算主题颜色 由深到浅 的具体颜色
    document.documentElement.style.setProperty("--el-color-primary", val);
    document.documentElement.style.setProperty(
      "--el-color-primary-dark-2",
      themeConfig.value?.isDark
        ? `${getLightColor(val, 0.2)}`
        : `${getDarkColor(val, 0.3)}`
    );
    // 颜色加深或变浅
    for (let i = 1; i <= 9; i++) {
      document.documentElement.style.setProperty(
        `--el-color-primary-light-${i}`,
        themeConfig.value?.isDark
          ? `${getDarkColor(val, i / 10)}`
          : `${getLightColor(val, i / 10)}`
      );
    }
    globalStore.setThemeConfig({ ...themeConfig.value, primary: val });
  };

  // 设置菜单样式
  const setMenuTheme = () => {
    let type: "light" | "dark" = "light";
    if (themeConfig.value.isDark) type = "dark";
    const theme = menuTheme[type];
    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value);
    }
  };

  // 设置侧边栏样式
  const setAsideTheme = () => {
    let type: "light" | "dark" = "light";
    if (themeConfig.value.isDark) type = "dark";
    const theme = asideTheme[type];
    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value);
    }
    setMenuTheme();
  };

  // 设置头部样式
  const setHeaderTheme = () => {
    let type: "light" | "dark" = "light";
    if (themeConfig.value.isDark) type = "dark";
    const theme = headerTheme[type];
    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value);
    }
    setMenuTheme();
  };

  // 初始化 theme 配置
  const initTheme = () => {
    changePrimary(themeConfig.value.primary);
    switchDark();
  };

  return { switchDark, initTheme, changePrimary };
};
