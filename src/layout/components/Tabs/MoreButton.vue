<template>
  <el-dropdown trigger="click" :teleported="false">
    <el-button size="small" type="primary">
      <span>{{ "tabs.more" }}</span>
      <el-icon class="el-icon--right"><ArrowDown /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="refresh">
          <el-icon><Refresh /></el-icon>
          {{ "tabs.refresh" }}
        </el-dropdown-item>
        <el-dropdown-item @click="maximize" disabled>
          <el-icon><FullScreen /></el-icon>
          {{ "tabs.maximize" }}
        </el-dropdown-item>
        <el-dropdown-item divided @click="closeCurrentTab">
          <el-icon><Remove /></el-icon>
          {{ "tabs.closeCurrent" }}
        </el-dropdown-item>
        <el-dropdown-item @click="closeOtherTab">
          <el-icon><CircleClose /></el-icon>
          {{ "tabs.closeOther" }}
        </el-dropdown-item>
        <el-dropdown-item @click="closeAllTab">
          <el-icon><FolderDelete /></el-icon>
          {{ "tabs.closeAll" }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
// import { computed } from "vue";
import {
  ArrowDown,
  Refresh,
  FullScreen,
  Remove,
  CircleClose,
  FolderDelete
} from "@element-plus/icons-vue";
// import { useGlobalStore } from "@/store/index";
import { useTabsStore } from "@/store/modules/tabs";
// import { KeepAliveStore } from "@/stores/modules/keepAlive";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const tabsStore = useTabsStore();
// const globalStore = useGlobalStore();
// const keepAliveStore = KeepAliveStore();
// const themeConfig = computed(() => globalStore.themeConfig);

/**
 * 刷新当前页
 */
const refresh = () => {
  tabsStore.refreshCurrentTab_actions(route.name as string);
};

/**
 * 最大化当前页
 */
const maximize = () => {
  // globalStore.setThemeConfig({ ...themeConfig.value, maximize: true });
};

/**
 * 关闭当前页面
 */
const closeCurrentTab = () => {
  if (route.meta.isAffix) return;
  tabsStore.removeTabs_actions(route.name as string, true);
};

/**
 * 关闭其他页面
 */
const closeOtherTab = () => {
  tabsStore.closeMultipleTabs_actions(route.name as string);
};

/**
 * 关闭所有页面
 */
const closeAllTab = () => {
  tabsStore.closeMultipleTabs_actions();
  router.push("/");
};
</script>

<style scoped lang="scss">
// @import "../index.scss";
</style>
