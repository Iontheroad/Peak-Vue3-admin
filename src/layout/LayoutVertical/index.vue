<template>
  <el-container class="layout-container">
    <!-- 移动端遮罩层 -->
    <MobileMask />
    <el-aside :class="[isCollapseMenu ? 'is-collapse' : 'is-expand']">
      <Logo v-if="themeConfig.isShowLogo" :collapse="isCollapseMenu" />
      <el-scrollbar>
        <!-- 响应式菜单 -->
        <el-menu
          :router="false"
          :default-active="activeMenu"
          :collapse="isCollapseMenu"
          :collapse-transition="false"
        >
          <SubMenu :menu-list="permissionStore.menubarList_getters" />
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container class="layout-body">
      <!-- 头部 -->
      <LayoutHeader />
      <LayoutTabs />
      <!-- 视图区域 -->
      <LayoutMain />
      <LayoutFooter v-if="themeConfig.isShowFooter" />
    </el-container>
  </el-container>
</template>

<script lang="ts" setup name="LayoutVertical">
import { computed, watch } from "vue";
import { useRoute } from "vue-router";

import LayoutHeader from "@/layout/components/Header/index.vue";
import LayoutTabs from "@/layout/components/Tabs/index.vue";
import LayoutMain from "@/layout/components/Main/index.vue";
import LayoutFooter from "@/layout/components/Footer/index.vue";
import MobileMask from "@/layout/components/MobileMask.vue";
import Logo from "@/layout/components/Menu/Logo.vue";
import SubMenu from "@/layout/components/Menu/SubMenu.vue";

import { useAppStore } from "@/store/modules/app";
import { usePermissionStore } from "@/store/modules/permission";
import { useGlobalStore } from "@/store/index";
import { useResize } from "@/hooks/useResize";
const route = useRoute();
const appStore = useAppStore();
const globalStore = useGlobalStore();
const permissionStore = usePermissionStore(); // 权限路由状态仓库

const isCollapseMenu = computed(() => appStore.isCollapseMenu); //是否折叠菜单

const themeConfig = computed(() => globalStore.themeConfig);

const { windowWidth, isCollapse } = useResize();
watch(windowWidth, () => appStore.toggleSidebar(isCollapse.value), { immediate: true });

const activeMenu = computed<string>(() => {
  const { meta, path } = route;
  if (meta?.activeMenu) return meta.activeMenu as string;
  return path;
});
</script>

<style lang="scss">
@import "./index.scss";
</style>
