<template>
  <div class="collapse-icon" @click="toggleClick">
    <!-- 展开收起的按钮图标 -->

    <svg
      t="1702631984210"
      :class="{ 'is-active': isCollapseMenu }"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2548"
      width="200"
      height="200"
    >
      <path
        d="M192.037 287.953h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32zM832.161 479.169H438.553c-17.673 0-32 14.327-32 32s14.327 32 32 32h393.608c17.673 0 32-14.327 32-32s-14.327-32-32-32zM832.161 735.802H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32zM319.028 351.594l-160 160 160 160z"
        p-id="2549"
      ></path>
    </svg>
  </div>
</template>

<script lang="ts" setup name="Hamburger">
import { useAppStore } from "@/store/modules/app";
import { computed } from "vue";

const appStore = useAppStore();
const isCollapseMenu = computed(() => appStore.isCollapseMenu); // 菜单栏状态

// 点击触发
function toggleClick() {
  appStore.toggleSidebar(!isCollapseMenu.value);
}
</script>

<style scoped lang="scss">
.collapse-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: background 0.3s; // 动画
  -webkit-tap-highlight-color: transparent;
  &:hover {
    background: rgb(0 0 0 / 2.5%);
  }
  .icon {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    fill: var(--el-header-text-color);
    &.is-active {
      transform: rotate(180deg);
    }
  }
}
</style>
