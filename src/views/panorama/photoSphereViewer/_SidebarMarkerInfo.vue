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
    <button @click="clickConfigBtn" ref="myBtn">确定</button>
  </div>
</template>

<script lang="ts">
import { onMounted, onUpdated, ref, toRefs } from "vue";

export default {
  name: "SidebarMarkerInfo",
  props: {
    markerInfo: {
      type: Object,
      required: true,
    },
  },
  emits: ["update:markerInfo", "submitCallBack"],
  setup(props, context) {
    let { markerInfo } = toRefs(props);

    onMounted(() => {
      console.log("渲染内容");
    });
    // onUpdated(() => {
    //   console.log("更新");
    //   console.log(props, markerId);
    // });

    function clickConfigBtn() {
      console.log(markerInfo);

      context.emit("update:markerInfo", markerInfo.value);
      setTimeout(() => {
        console.log("侧边栏异步请求完成");
        context.emit("submitCallBack", "submit");
      }, 1500);
    }
    function clickCancelBtn() {
      console.log(markerInfo);
      context.emit("submitCallBack", "cancel");
    }
    return {
      clickConfigBtn,
      clickCancelBtn,
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  position: absolute;
  top: 0px;
  right: 0px;
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
