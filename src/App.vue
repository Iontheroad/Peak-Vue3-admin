<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import en from "element-plus/es/locale/lang/en";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { computed } from "vue";
import { useGlobalStore } from "@/store";
import { getLanguage } from "@/utils";
const globalStore = useGlobalStore();

// element language
const locale = computed(() => {
  if (globalStore.language == "zh") return zhCn;
  else if (globalStore.language == "en") return en;
  else return getLanguage() == "zh" ? zhCn : en;
});
</script>

<template>
  <el-config-provider :locale="locale" :size="globalStore.elementSize">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped></style>
