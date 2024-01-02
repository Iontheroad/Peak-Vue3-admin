<template>
  <div class="logo-box" :class="{ collapse: collapse }">
    <!-- 动画 -->
    <transition name="sidebarLogoFade">
      <!-- 收起 -->
      <router-link class="to" to="/">
        <img v-if="logo" :src="logo" class="to-logo" />
        <h1 v-if="!collapse" class="to-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script setup lang="ts" name="Logo">
import { ref, toRefs } from "vue";
const props = defineProps<{
  collapse: boolean;
}>();
let { collapse } = toRefs(props);

let title = ref("Peak Vue3 Admin");
const logo = ref<string>(new URL(`@/assets/peak_logo.png`, import.meta.url).href);
</script>

<style lang="scss" scoped>
.logo-box {
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: var(--el-aside-logo-bg-color);
  text-align: center;

  /* 只需给刚进入和离开之后添加动画即可 */
  .sidebarLogoFade-enter-active {
    transition: opacity 1.5s;
  }
  .sidebarLogoFade-enter,
  .sidebarLogoFade-leave-to {
    opacity: 0;
  }

  /* Logo容器 */
  .to {
    .to-logo {
      width: 25px;
      height: 25px;
      vertical-align: middle;
      margin-right: 12px;
    }
    .to-title {
      display: inline-block;
      margin: 0;
      color: var(--el-aside-logo-text-color);
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, "Helvetica Neue", Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  // 收起时不显示title
  &.collapse {
    .to-logo {
      //  收起时 取消logo右边距
      margin-right: 0;
    }
  }
}
</style>
