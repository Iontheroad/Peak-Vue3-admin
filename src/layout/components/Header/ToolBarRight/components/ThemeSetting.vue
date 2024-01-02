<template>
  <div class="theme-setting">
    <SvgIcon class="icon" icon-name="header-theme" @click="openDrawer" />
  </div>
</template>

<script setup lang="ts" name="ThemeSetting">
import SvgIcon from "@/components/SvgIcon/index.vue";
import mittBus from "@/utils/mittBus";
const openDrawer = () => {
  mittBus.emit("openThemeDrawer");
};
</script>
<style scoped lang="scss">
.theme-setting {
  // margin-right: 20px;
  .icon {
    font-size: 36px;
    cursor: pointer;
    outline: none;
  }
}
</style>
