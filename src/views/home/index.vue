<template>
  <div class="home">首页</div>
</template>

<script lang="ts" setup>
defineOptions({
  name: "Home"
});
</script>

<style lang="scss" scoped>
.home {
  .article-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    background-color: #ffffff;
    margin-top: 10px;
    row-gap: 20px;
    padding: 20px;
  }
}
</style>
