<template>
  <div class="tabs-box">
    <el-tabs
      :model-value="tabsActive"
      type="card"
      @tab-click="tabClick"
      @tab-remove="tabRemove"
    >
      <el-tab-pane
        v-for="item in tabsList"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable="!item.isAffix"
      >
        <template #label>
          <el-icon v-show="item.icon && themeConfig.isShowTabsIcon">
            <SvgIcon :icon-name="item.icon" />
          </el-icon>
          {{ item.title }}
        </template>
      </el-tab-pane>
    </el-tabs>
    <MoreButton />
  </div>
</template>

<script setup lang="ts" name="Tabs">
import MoreButton from "./MoreButton.vue";

import { computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useTabsStore, TabsItemType } from "@/store/modules/tabs.ts";
import { usePermissionStore } from "@/store/modules/permission";
import { useGlobalStore } from "@/store";

const route = useRoute();
const router = useRouter();
const globalStore = useGlobalStore();
const permissionStore = usePermissionStore();
const tabsStore = useTabsStore();

const themeConfig = computed(() => globalStore.themeConfig);
const tabsList = computed(() => tabsStore.tabsList);
const tabsActive = computed((): string => route.name as string); // 记录当前点击的

watch(
  () => route.fullPath,
  () => {
    if (route.meta.isFull || route.meta.isLink || route.meta.isHidden) return;
    let tabsItem: TabsItemType = {
      icon: route.meta.icon as string,
      title: route.meta.title as string,
      path: route.fullPath,
      name: route.name as string,
      isAffix: route?.meta?.isAffix as boolean
    };
    tabsStore.addTabs_actions(tabsItem);
  },
  {
    immediate: true
  }
);

onMounted(() => {
  initTabs();
});

/**
 * 初始化,先遍历出需要固定tab
 */
const initTabs = () => {
  permissionStore.flatMenubarList_getters.forEach((item) => {
    if (item.meta?.isAffix && !item.meta?.isHidden && !item.meta?.isFull) {
      let tabsItem = {
        icon: item.meta.icon,
        title: item.meta.title,
        path: item.path,
        name: item.name,
        isAffix: item.meta.isAffix
      };
      tabsStore.addTabs_actions(tabsItem);
    }
  });
};

/**
 * 点击跳转
 */
const tabClick = (item: any) => {
  if (item.props.name == route.name) return;
  router.push({ name: item.props.name });
};

/**
 * 点击删除
 * @param -暂时用路由别名
 */
const tabRemove = (routeName: any) => {
  let name = tabsStore.tabsList.find((item) => item.name == routeName);
  name && tabsStore.removeTabs_actions(routeName, routeName == route.name);
};
</script>

<style scoped lang="scss">
.tabs-box {
  position: relative;
  width: 100%;
  :deep(.el-tabs) {
    .el-tabs__header {
      box-sizing: border-box;
      height: 40px;
      margin: 0;
      .el-tabs__nav-wrap {
        position: absolute;
        width: calc(100% - 120px);
        padding: 0 20px;
        .el-tabs__nav-prev,
        .el-tabs__nav-next {
          &:hover {
            color: var(--el-color-primary);
          }
        }
        .el-tabs__nav {
          border: none;
          .el-tabs__item {
            color: #bcb6b6;
            border: none;
            &.is-active {
              color: var(--el-color-primary);
              border-bottom: 2px solid var(--el-color-primary);
            }
          }
        }
      }
    }
  }
  .el-dropdown {
    position: absolute;
    top: 8px;
    right: 13px;
  }
}
</style>
