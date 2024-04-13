<template>
  <div class="sidebar">
    我是组件的内容啊
    <div>标题: <input v-model="markerInfo.title" type="text" /></div>
    <div>
      信息:
      <input v-model="markerInfo.msg" type="text" />
    </div>
    <div class="imgs">
      <img
        v-for="img in markerInfo?.imgList"
        :key="img.id"
        :src="img.url"
        alt=""
        srcset=""
      />
    </div>

    <button @click="clickCancelBtn" ref="myBtn">取消</button>
    <button @click="clickConfirmBtn" ref="myBtn">确定</button>
  </div>
</template>

<script setup lang="ts" name="SidebarMarkerInfo">
import { onMounted, toRefs } from "vue";
export interface MarkerInfo {
  title: string;
  msg: string;
  imgList: {
    id: string | number;
    url: string;
  }[];
}

const props = defineProps<{
  markerInfo: MarkerInfo;
}>();

const emits = defineEmits<{
  (e: "update:markerInfo", markerInfo: MarkerInfo): void;
  (e: "confirmCallback", type: "submit" | "cancel"): void;
}>();

let { markerInfo } = toRefs(props);

onMounted(() => {
  console.log("渲染内容");
});

/**
 * 点击确定
 */
function clickConfirmBtn() {
  emits("update:markerInfo", markerInfo.value);
  setTimeout(() => {
    console.log("侧边栏异步请求完成");
    emits("confirmCallback", "submit");
  }, 1500);
}

/**
 * 点击取消
 */
function clickCancelBtn() {
  // console.log(markerInfo);
  emits("confirmCallback", "cancel");
}
</script>

<style lang="scss" scoped>
.sidebar {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  width: 200px;
  height: calc(100% - 90px);
  background-color: skyblue;
  padding: 10px;
  color: red;
  .content {
    color: green;
  }
  .imgs {
    img {
      width: 50px;
    }
  }
}
</style>
