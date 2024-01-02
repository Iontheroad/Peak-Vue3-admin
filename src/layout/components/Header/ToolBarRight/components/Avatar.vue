<template>
  <el-dropdown class="user-container" trigger="click">
    <div class="user-info">
      <img :src="userInfo?.avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
      <span class="user-name">Peak<CaretBottom class="icon" /></span>
    </div>
    <template #dropdown>
      <!-- 点击下拉 -->
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <!-- 回首页 -->
        <router-link to="/">
          <el-dropdown-item>Home</el-dropdown-item>
        </router-link>
        <!-- GitHub -->
        <a target="_blank" href="https://github.com/Iontheroad/Peak-Vue3-Admin">
          <el-dropdown-item>Github</el-dropdown-item>
        </a>
        <!-- Gitee -->
        <a target="_blank" href="https://gitee.com/Iontheroad/peak-vue3-admin">
          <el-dropdown-item>Gitee</el-dropdown-item>
        </a>
        <!-- 退出登录 -->
        <el-dropdown-item divided @click.native="click_logout">
          <span style="display: block">Log Out</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts" name="Avatar">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { CaretBottom } from "@element-plus/icons-vue";

import { useUserStore } from "@/store/modules/user";
const userStore = useUserStore();
const router = useRouter();
const userInfo = computed(() => userStore.userInfo);
/**
 * 点击退出登录
 */
function click_logout() {
  ElMessageBox.confirm("确定注销并退出系统吗？", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      try {
        await userStore.logout_actions();
        ElMessage.success({
          showClose: true,
          message: "退出成功"
        });
        router.replace("/login");
      } catch (error) {
        ElMessage({
          showClose: true,
          message: "退出失败",
          type: "error"
        });
      }
    })
    .catch(() => {
      ElMessage.info({
        showClose: true,
        message: "取消退出"
      });
    });
}
</script>

<style scoped lang="scss">
.user-container {
  padding: 0 8px;

  // 头像
  .user-info {
    //  用户头像
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    // 用户名
    .user-name {
      display: inline-block;

      // width: fit-content;
      margin-left: 5px;
      font-size: 14px;
      .icon {
        width: 15px;
        height: 15px;
        font-size: 12px !important;
      }
    }
  }
}
</style>
