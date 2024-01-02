<template>
  <el-footer class="footer">
    <a href="https://github.com/Iontheroad" target="_blank">
      2023 © Peak Vue3 Admin Author: zhang Peak.
    </a>
  </el-footer>
</template>
<script lang="ts" setup>
defineOptions({
  name: "LayoutFooter"
});
</script>
<style scoped lang="scss">
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;

  // background: #ffffff;
  border-top: 1px solid #e4e7ed;
  a {
    font-size: 14px;
    color: #858585;
    text-decoration: none;
    letter-spacing: 0.5px;
  }
}
</style>
