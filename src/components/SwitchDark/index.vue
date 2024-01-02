<template>
  <el-switch
    v-model="globalStore.themeConfig.isDark"
    inline-prompt
    :active-icon="Sunny"
    :inactive-icon="Moon"
    @change="switchDark"
  />
</template>

<script setup lang="ts">
// import { useDark, useToggle } from "@vueuse/core";
import { Sunny, Moon } from "@element-plus/icons-vue";
import { useTheme } from "@/hooks/useTheme";
import { useGlobalStore } from "@/store";
const globalStore = useGlobalStore();
const { switchDark } = useTheme();
</script>
