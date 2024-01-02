<template>
  <el-drawer v-model="drawerVisible" append-to-body title="布局设置" size="300px">
    <!-- 全局主题 -->
    <el-divider class="divider" content-position="center">
      <el-icon><ColdDrink /></el-icon>
      全局主题
    </el-divider>
    <div class="theme-item">
      <span>主题颜色</span>
      <el-color-picker
        v-model="themeConfig.primary"
        :predefine="colorList"
        @change="changePrimary"
      />
    </div>
    <div class="theme-item">
      <span>暗黑模式</span>
      <SwitchDark />
    </div>
    <br />

    <!-- 界面设置 -->
    <el-divider class="divider" content-position="center">
      <el-icon><Setting /></el-icon>
      界面设置
    </el-divider>
    <div class="theme-item">
      <span>显示Logo</span>
      <el-switch v-model="themeConfig.isShowLogo" />
    </div>
    <div class="theme-item">
      <span>固定Header</span>
      <el-switch v-model="themeConfig.isFixedHeader" />
    </div>
    <div class="theme-item">
      <span>
        <el-tooltip effect="dark" content="移动端下不显示面包屑" placement="right">
          面包屑
        </el-tooltip>
      </span>
      <el-switch v-model="themeConfig.isShowBreadcrumb" />
    </div>
    <div class="theme-item">
      <span>面包屑图标</span>
      <el-switch v-model="themeConfig.isShowBreadcrumbIcon" />
    </div>
    <div class="theme-item">
      <span>标签栏</span>
      <el-switch v-model="themeConfig.isShowTabsView" />
    </div>
    <div class="theme-item">
      <span>标签栏图标</span>
      <el-switch v-model="themeConfig.isShowTabsIcon" />
    </div>
    <div class="theme-item">
      <span>页脚</span>
      <el-switch v-model="themeConfig.isShowFooter" />
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ColdDrink, Setting } from "@element-plus/icons-vue";
import { ref, computed } from "vue";
import { useTheme } from "@/hooks/useTheme";
import { useGlobalStore } from "@/store/index";
import { DEFAULT_PRIMARY } from "@/config/config";
import SwitchDark from "@/components/SwitchDark/index.vue";
import mittBus from "@/utils/mittBus";

const { initTheme, changePrimary } = useTheme();
initTheme(); // 初始化默认主题色主题

// 预定义主题颜色
const colorList = [
  DEFAULT_PRIMARY,
  "#27ae60",
  "#409EFF",
  "#ffc400",
  "#DAA96E",
  "#0C819F",
  "#ff5c93",
  "#e74c3c",
  "#fd726d",
  "#9b59b6"
];

const globalStore = useGlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);

// 打开主题设置
const drawerVisible = ref(false);

// 监听订阅点击 顶部栏主题设置
mittBus.on("openThemeDrawer", () => (drawerVisible.value = true));
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
