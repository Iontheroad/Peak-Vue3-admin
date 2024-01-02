<template>
  <el-main class="main">
    <router-view name="default" v-slot="{ Component, route }">
      <keep-alive :include="keepAliveList">
        <component :is="Component" :key="route.path" v-if="isReload" />
      </keep-alive>
    </router-view>
  </el-main>
</template>

<script setup lang="ts">
defineOptions({
  name: "LayoutMain"
});
import { computed } from "vue";
import { useTabsStore } from "@/store/modules/tabs";
const tabsStore = useTabsStore();

// 刷新当前页
const isReload = computed(() => tabsStore.isReload);
const keepAliveList = computed(() => tabsStore.keepAliveList);
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  padding: 10px;

  // background-color: #eef0f3;

  background-color: var(--el-bg-color-page);

  // display: flex;
  // flex-direction: column;
  // width: 100%;
  // overflow: visible; // 默认滚动条在整个 .layout_main
}
</style>
