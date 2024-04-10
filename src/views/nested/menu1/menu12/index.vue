<script setup lang="ts" name="Menu12">
import { useRouter } from "vue-router";
const route = useRouter();
</script>

<template>
  <el-alert :closable="false" title="菜单12" type="success">
    <router-view />
    <el-button type="primary" @click="route.push({ name: 'Menu122' })">
      detail
    </el-button>
  </el-alert>
</template>

<style scoped></style>
