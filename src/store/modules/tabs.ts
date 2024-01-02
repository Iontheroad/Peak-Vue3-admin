/**
 * tabs
 * keepAlive 缓存路由
 */

import { defineStore } from "pinia";
import { PersistedStateOptions } from "pinia-plugin-persistedstate";
import router from "@/router";
import { nextTick } from "vue";

// tabsState 类型
export interface TabsState {
  tabsList: TabsItemType[];
  isReload: boolean;
  keepAliveList: string[];
}

export interface TabsItemType {
  icon: string;
  title: string;
  path: string;
  name: string;
  isAffix: boolean;
}

export const useTabsStore = defineStore("tabsStore", {
  state: (): TabsState => {
    return {
      tabsList: [],
      isReload: true,
      keepAliveList: [] // 缓存的路由
    };
  },

  actions: {
    /**
     * 新增 tabs
     * @param tabsItem
     */
    addTabs_actions(tabsItem: TabsItemType) {
      if (this.tabsList.every((item) => item.path != tabsItem.path)) {
        this.tabsList.push(tabsItem);
        this.addKeepAliveItem_actions(tabsItem.path);
      }
    },

    /**
     * 删除tab
     * @param routeName 路由别名
     * @param isCurrent 删除的是否是当前项
     */
    removeTabs_actions(routeName: string, isCurrent: boolean) {
      // 是否删除的当前页
      if (isCurrent) {
        this.tabsList.forEach((item, index) => {
          if (item.name != routeName) return;
          // 找到删除的那条路由信息
          // 拿到相邻的tab
          let nextTab = this.tabsList[index + 1] || this.tabsList[index - 1];
          // 跳转到相邻的tab
          nextTab && router.push({ name: nextTab.name });
        });
      }
      this.tabsList = this.tabsList.filter((item) => item.name != routeName);
      this.removeKeepAliveItem_actions(routeName);
    },

    /**
     * 删除其他所有tab，只剩下当前tab和固定的tab
     * @param routeName
     */
    closeMultipleTabs_actions(routeName?: string) {
      // 保留当前项 和 固定项
      let routeNameList: string[] = []; // 记录
      this.tabsList = this.tabsList.filter((item) => {
        if (item.name == routeName || item.isAffix) {
          routeNameList.push(item.name);
          return item;
        }
      });
      // 重置缓存 // INFO: 此处的重置保留了固定tab,您可以只留下当前tab
      this.resetKeepAliveList(routeNameList);
    },

    /**
     * 刷新当前页tab
     */
    refreshCurrentTab_actions(routeName: string) {
      this.isReload = false;
      this.removeKeepAliveItem_actions(routeName);
      setTimeout(() => {
        nextTick(() => {
          this.isReload = true;
          this.addKeepAliveItem_actions(routeName);
        });
      }, 0);
    },

    /**
     * 新增缓存路由
     * @param itemName
     */
    addKeepAliveItem_actions(itemName: string) {
      // 不存在就添加
      !this.keepAliveList.includes(itemName) && this.keepAliveList.push(itemName);
    },

    /**
     * 删除指定缓存路由
     * @param itemName 路由名称
     */
    removeKeepAliveItem_actions(itemName: string) {
      this.keepAliveList = this.keepAliveList.filter((item) => item != itemName);
    },

    /**
     * 重置缓存路由数据
     * @param keepAliveList
     */
    resetKeepAliveList(keepAliveList: string[] = []) {
      this.keepAliveList = keepAliveList;
    }
  },

  getters: {},

  persist: {
    enabled: true,
    strategies: [
      {
        key: "tabsStore",
        storage: localStorage,
        paths: []
      }
    ]
  } as PersistedStateOptions
});
