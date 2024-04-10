<template>
  <template v-for="subItem in menuList" :key="subItem?.path">
    <el-sub-menu v-if="subItem.children?.length" :index="subItem.path">
      <!-- 根菜单信息 -->
      <template #title>
        <el-icon v-if="subItem?.meta?.icon">
          <SvgIcon :icon-name="subItem?.meta?.icon" />
        </el-icon>
        <span v-if="subItem?.meta?.title">
          {{ subItem.meta.title }}
        </span>
      </template>
      <SubMenu :menu-list="subItem?.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="subItem?.path" @click="handleClickMenu(subItem)">
      <el-icon v-if="subItem?.meta?.icon">
        <SvgIcon :icon-name="subItem.meta.icon" />
      </el-icon>
      <template #title>
        <span>
          {{ subItem?.meta?.title }}
        </span>
      </template>
    </el-menu-item>
  </template>
</template>
<script setup lang="ts" name="SubMenu">
import { useRouter } from "vue-router";

defineProps<{
  menuList: Menu.MenuOptions[];
}>();

const router = useRouter();
const handleClickMenu = (item: Menu.MenuOptions) => {
  if (item?.meta?.isLink) return window.open(item?.meta?.isLink.toString(), "_blank");
  router.push(item.path);
};
</script>
<style lang="scss" scoped>
.el-sub-menu {
  .el-sub-menu__title:hover {
    color: var(--el-menu-hover-text-color);
    background-color: transparent;
  }
  &.is-active > .el-sub-menu__title {
    color: var(--el-menu-active-color);
  }
}
.el-menu-item {
  &:hover {
    color: var(--el-menu-hover-text-color);
  }
  &.is-active {
    color: var(--el-menu-active-color);
    background-color: var(--el-menu-active-bg-color);
    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 4px;
      content: "";
      background-color: var(--el-color-primary);
    }
  }
}
</style>
