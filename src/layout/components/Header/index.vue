<template>
  <el-header class="header">
    <!-- 头部左侧工具栏 -->
    <ToolBarLeft />
    <!-- 右侧 -->
    <ToolBarRight />
  </el-header>
</template>

<script lang="ts" setup>
import ToolBarLeft from "@/layout/components/Header/ToolBarLeft/index.vue";
import ToolBarRight from "@/layout/components/Header/ToolBarRight/index.vue";
defineOptions({
  name: "LayoutHeader"
});
</script>

<style lang="scss" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--el-header-border-color);
  background-color: var(--el-header-bg-color);
}
</style>
