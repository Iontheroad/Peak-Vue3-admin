<template>
  <template v-for="subItem in menuList" :key="subItem?.path">
    <el-sub-menu v-if="subItem.children?.length" :index="subItem.path">
      <!-- 根菜单信息 -->
      <template #title>
        <el-icon v-if="subItem?.meta?.icon">
          <SvgIcon :icon-name="subItem?.meta?.icon as string" />
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
import { toRefs } from "vue";
// 组件

const router = useRouter();
const props = defineProps<{
  menuList: Menu.MenuOptions[];
}>();

const { menuList } = toRefs(props);

const handleClickMenu = (item: Menu.MenuOptions) => {
  if (item?.meta?.isLink) return window.open(item?.meta?.isLink.toString(), "_blank");
  router.push(item.path);
};
</script>
<style lang="scss" scoped></style>
