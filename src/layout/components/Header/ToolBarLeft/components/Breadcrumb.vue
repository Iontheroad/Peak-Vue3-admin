<template>
  <el-breadcrumb class="breadcrumb">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
        <div
          :class="{ 'last-item': index === breadcrumbList.length - 1 }"
          @click="clickBreadcrumb(item, index)"
        >
          <SvgIcon
            v-show="themeConfig.isShowBreadcrumbIcon"
            :icon-name="item.meta.icon"
          />
          {{ item.meta.title }}
        </div>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts" name="Breadcrumb">
import { useRoute, useRouter, type RouteLocationMatched } from "vue-router";
import { computed } from "vue";

import { useGlobalStore } from "@/store";

const route = useRoute();
const router = useRouter();
const globalStore = useGlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);

const breadcrumbList = computed(() => {
  const breadCrumbs = route.matched.filter(
    (item) => item?.meta?.title && !item?.meta?.isBreadcrumbHidden
  );
  if (breadCrumbs[0]?.path !== "/home/index") {
    breadCrumbs.unshift({
      path: "/home/index",
      meta: {
        title: "首页",
        icon: "menu-home"
      }
    } as any);
  }
  return breadCrumbs;
});

const clickBreadcrumb = (item: RouteLocationMatched, index: number) => {
  if (index !== breadcrumbList.value.length - 1) router.push(item.path);
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 8px;
  .el-breadcrumb__item {
    div {
      display: flex;
      align-items: center;
      cursor: pointer;
      height: 25px;
      font-size: 14px;
      font-weight: 700;
      color: var(--el-header-text-color);
      &:hover {
        color: var(--el-color-primary);
      }
      &.last-item,
      &.last-item:hover {
        color: var(--el-header-text-color-regular);
        cursor: text;
      }
      .svg-icon {
        margin-right: 2px;
      }
    }
  }
}
</style>
