/**
 * 页面的一些状态
 */

import { defineStore } from "pinia";
import { ref } from "vue";
import { useStorage } from "@vueuse/core";

// setup
export const useAppStore = defineStore("app", () => {
  // state
  let isCollapseMenu = ref(false); // 是否折叠
  const size = useStorage<string>("size", "default"); // 组件大小

  // actions
  /**
   * 菜单展开收起 切换
   */
  function toggleSidebar(isCollapse: boolean) {
    isCollapseMenu.value = isCollapse;
  }

  return {
    size,
    isCollapseMenu,
    toggleSidebar
  };
});
