<template>
  <div class="panorama-box" style="color: red">
    <div id="viewer"></div>
    <ul class="nav">
      <li
        v-for="(item, index) in panoramaList"
        :key="index"
        :class="{ active: item.id == currentPanoramaId }"
        @click="clickTogglePanorama(item)"
      >
        {{ `全景图${index + 1}` }}
      </li>
    </ul>
    <SidebarMarkerInfo
      v-if="isShowSidebar"
      ref="sidebarMarkerInfoRef"
      v-model:markerInfo="markerInfo"
      @confirm-callback="confirmCallback"
    />
  </div>
</template>

<script setup lang="ts" name="Panorama">
import {
  // ClickData,
  Viewer,
  events
} from "@photo-sphere-viewer/core";
import "@photo-sphere-viewer/core/index.css";
import {
  // Marker,
  MarkerConfig,
  MarkersPlugin,
  events as MarkerEvents
} from "@photo-sphere-viewer/markers-plugin";
import "@photo-sphere-viewer/markers-plugin/index.css";
import { onMounted, ref } from "vue";

import SidebarMarkerInfo, { type MarkerInfo } from "./SidebarMarkerInfo.vue";
import { ElMessage } from "element-plus";
import img1 from "../images/10006.jpg";
import img2 from "../images/10008.jpg";
import img3 from "../images/10017.jpg";

type MyMarkerProps = {
  panoramaId: string | number;
  markerInfo?: MarkerInfo;
  // yaw: number;
};
// marker完成的参数
type MarkerProps = MarkerConfig & MyMarkerProps;

let viewer: Viewer;
let markersPlugin: MarkersPlugin;
// let sidebarMarkerInfoRef = ref();
let isShowSidebar = ref(false); // 控制侧边框显示隐藏
let panoramaList = [
  {
    id: 1,
    img: img1
  },
  {
    id: 2,
    img: img2
  },
  {
    id: 3,
    img: img3
  }
]; // 全景图
let currentPanoramaId = ref<string | number>(1); // 当前全景图的id

let markers: MarkerProps[] = [
  // {
  //   id: `mark:123456`, // 标记id
  //   anchor: "center center", // 标记相对点击位置
  //   html: `<img src="http://119.91.22.164:8085/images/11411538250643115avatar.jpg" />`, // 标记的内容
  //   yaw: 0.27335309121043694, // 经度
  //   pitch: 0.03017908389074716, // 纬度
  //   // tooltip: `我是提示信息`,
  //   tooltip: {
  //     content: `我是默认的标记`,
  //     position: "center top",
  //   },
  //   visible: true, // 标注初始显示与否
  //   panoramaId: 1, // 对应的全景图id
  //   markerInfo: {
  //     id: "mark:123456",
  //     title: "我是默认marker的标题",
  //     msg: "我是默认marker的信息",
  //     imgList: [
  //       {
  //         id: 1,
  //         url: "http://119.91.22.164:8085/images/11411538250643115avatar.jpg",
  //       },
  //     ],
  //   },
  //   // position: { textureX: 945, textureY: 445 },
  //   // size: { width: 32, height: 32 },
  //   // zoomLvl: 100,
  //   // content: document.getElementById("lorem-content").innerHTML,
  //   // content: `${sidebarMarkerInfoRef.value?.$el.outerHTML}`,
  // },
]; // 标记列表

onMounted(() => {
  // 先获取本地存储的marker信息
  getLocalStorageMarker(currentPanoramaId.value);

  // 初始化第一张全景图
  initViewer(panoramaList[0]);

  // viewer.once("ready", () => {
  //   markerArr.forEach((item: MarkerConfig) => {
  //     markersPlugin.handleAddMarker(item);
  //   });
  // });
});

/**
 * @description 点击切换全景图
 * @param panorama  全景图信息
 */
function clickTogglePanorama(panorama: { id: string | number; img: string }) {
  currentPanoramaId.value = panorama.id; // 记录当前的全景图id
  getLocalStorageMarker(currentPanoramaId.value);

  initViewer(panorama);
}

/**
 * @description 初始化 加载全景图
 * @param panoramaId 全景图的id
 */
function initViewer(panorama: { id: string | number; img: string }) {
  if (viewer) {
    try {
      viewer.destroy();
    } catch (e) {
      console.log(e);
      const viewer = document.querySelector("#viewer");
      viewer!.removeChild(viewer!.childNodes[0]);
    }
  }

  // 初始化
  viewer = new Viewer({
    container: document.querySelector("#viewer") as HTMLElement,
    panorama: panorama?.img, // 全景图地址
    // size: {
    //   width: 886,
    //   height: 554,
    // }, // 大小
    plugins: [
      [
        MarkersPlugin,
        {
          markers
        }
      ]
    ]
  });

  // 监听全景图加载完成
  viewer.addEventListener("ready", () => {
    console.log("全景图加载完成");
  });

  // 监听滑动
  viewer.addEventListener("position-updated", () => {
    console.log(`滑动`);
    isShowSidebar.value = false;
    prevMarkerId && markersPlugin.removeMarker(prevMarkerId); // 删除上一个点击的marker
    prevMarkerId = "";
  });

  // 获取标记实例
  markersPlugin = viewer.getPlugin(MarkersPlugin)!;

  /*  点击标注
      为选中标注事件绑定了一个回调函数。当用户点击选中一个标注时，该回调函数会被触发。
      */
  markersPlugin.addEventListener("select-marker", selectMarker);

  // 点击添加标注
  viewer.addEventListener("click", handleAddMarker);
}

/**
 * @description marker的鼠标事件 - 双击 | 右击 | 单击
 * @param event
 */
async function selectMarker(_event: MarkerEvents.SelectMarkerEvent) {
  const { marker } = _event;
  // console.log("select-marker e:", _event);
  let { doubleClick, rightClick } = _event;
  if (doubleClick) {
    console.log("双击删除");
    handleDeleteMarker(marker.id);
  } else if (rightClick) {
    console.log("右击");
  } else {
    console.log("单击");
    /* 这里的判断可根据业务场景自定义拦截 */
    // 每次单击marker时，上次添加marker未保存 且 点击的是其他marker
    if (prevMarkerId && prevMarkerId != marker.id) {
      // 在此处可以判断一下未保存的marker是否输入了内容，如果填写了内容就拦截不清除
      if (markerInfo.value.title !== "") {
        ElMessage.warning({
          message: "侧边栏填写的内容,还未点击保存"
        });

        return true;
      } else {
        // 侧边栏没有输入内容，就删除这个没有保存的marker
        markersPlugin.removeMarker(prevMarkerId);
        prevMarkerId = "";
      }
    } else if (prevMarkerId && prevMarkerId == marker.id) {
      // 该marker未保存且填写了内容就拦截
      if (markerInfo.value.title !== "") {
        return true;
      }
    }

    let config = marker.config as MarkerProps;
    // console.log(config.markerInfo!);

    recordMarker = { ...config }; // 记录点击的marker信息
    markerInfo.value = (config.markerInfo as MarkerInfo) || {}; // 填充侧边栏数据
    isShowSidebar.value = true; // 打开侧边框
  }
}

let prevMarkerId: string; // 记录上一个点击添加marker的id，用于判断是否保存（存在未保存，不存在保存）
let recordMarker: MarkerProps; // 记录添加和点击的marker信息(用于更新)
/**
 * @description 添加标记
 * @param _event
 */
function handleAddMarker(_event: events.ClickEvent) {
  console.log("添加标注", _event);
  const data = _event.data;
  let { rightclick } = data;
  if (rightclick) return; // 拦截右键(如有操作可自行添加逻辑)

  // 先判断上一个点击的marker的id是否存在，存在就删除
  if (prevMarkerId) {
    markersPlugin.removeMarker(prevMarkerId);
  }

  isShowSidebar.value = true; // 显示侧边信息栏

  let id = `${+new Date()}-${Math.random() * 10}`;
  prevMarkerId = id; // 记录每次点击添加marker的id,
  markerInfo.value = {
    title: "",
    msg: "",
    imgList: []
  };

  let option: MarkerProps = {
    id,
    panoramaId: currentPanoramaId.value, // 所属的全景图id
    tooltip: {
      content: `我是提示信息`,
      position: "center top"
    },
    visible: true, // 标注初始显示与否
    html: `<img src="http://119.91.22.164:8085/images/11411538250643115avatar.jpg" /> `,
    position: { yaw: data.yaw, pitch: data.pitch },
    anchor: "center center" // 标记相对点击位置
  };
  recordMarker = option;
  markersPlugin.addMarker(option);
}

/**
 * @description 删除marker
 * @param {number} markerId
 */
function handleDeleteMarker(markerId: string | number) {
  // 先判断上一个点击的marker的id是否存在，存在就删除
  prevMarkerId && markersPlugin.removeMarker(prevMarkerId);
  prevMarkerId = ""; // 删除记录的marker的id(防止下次添加时，该marker已经删除，避免不存在出异常)
  isShowSidebar.value = false; // 隐藏侧边信息栏
  removeLocalStorageMarker(markerId);
}

/**
 * @description 获取本地markers信息
 * @param panoramaId
 */
function getLocalStorageMarker(panoramaId: string | number) {
  let markerArr = JSON.parse(localStorage.getItem("markerArr") || "[]");

  markers = markerArr.filter((marker: MarkerProps) => {
    return marker.panoramaId == panoramaId;
  });
}

/**
 * @description 添加或修改本地marker信息
 * @param marker
 */
function setLocalStorageMarker(marker: MarkerProps) {
  let markerAll: MarkerProps[] =
    JSON.parse(localStorage.getItem("markerArr") || "[]") || [];
  let index = markerAll.findIndex((item): boolean => {
    return item.id == marker.id;
  });

  if (index != -1) {
    // 存在就更新
    markerAll.splice(index, 1, marker);
  } else {
    markerAll.push(marker);
  }
  localStorage.setItem("markerArr", JSON.stringify(markerAll));
}

/**
 * @description 删除本地marker信息
 * @param markerId
 */
function removeLocalStorageMarker(markerId: string | number) {
  let markerAll = JSON.parse(localStorage.getItem("markerArr") || "[]").filter(
    (marker: MarkerProps) => {
      return marker.id != markerId;
    }
  );
  localStorage.setItem("markerArr", JSON.stringify(markerAll));
}

// 传入表单的数据
let markerInfo = ref<MarkerInfo>({
  title: "",
  msg: "",
  imgList: []
});
/**
 * @description 标签侧边栏确定的回调
 * @param {"submit" | "cancel"} type - submit: 确定; cancel: 取消
 */
function confirmCallback(type: "submit" | "cancel") {
  if (type == "submit") {
    isShowSidebar.value = false;
    prevMarkerId = ""; // 保存就清除记录的点击marker的id

    console.log("确定的回调");
    const tooltip = recordMarker?.tooltip || {};
    let option = {
      ...recordMarker,
      tooltip: {
        ...tooltip,
        content: markerInfo.value.title
      },
      markerInfo: {
        title: markerInfo.value.title,
        msg: markerInfo.value.msg,
        imgList: markerInfo.value.imgList || []
      }
    } as MarkerProps;

    markersPlugin.updateMarker(option);
    setLocalStorageMarker(option);
  } else {
    isShowSidebar.value = false;

    // 取消添加就清除这个marker
    prevMarkerId && markersPlugin.removeMarker(prevMarkerId);
    prevMarkerId = ""; // 保存就清除记录的点击marker的id
  }
}
</script>

<style lang="scss" scoped>
.panorama-box {
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
  #viewer {
    margin: 0 auto;
    height: 100%;
    :deep(.psv-container) {
      // 原生的侧边栏
      .psv-panel {
        .psv-panel-content {
          position: relative;
          display: flex;
          .sidebar {
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 100%;
            background-color: skyblue;
          }
        }
      }
      .psv-marker {
        border: 1px solid white;
        padding: 10px;
        .remark {
          padding: 10px 15px;
          color: white;
        }
        img {
          width: 20px;
          height: 20px;
          margin: 0 auto;
          display: block;
        }
      }
      .psv-tooltip {
        .psv-tooltip-content {
          img {
            width: 100px;
            height: 100px;
            margin: 0 auto;
            display: block;
          }
        }
      }
    }
  }
  .nav {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: var(--el-color-info);
    text-align: center;
    li {
      display: inline-block;
      width: 80px;
      height: 100%;
      margin-right: 10px;
      background-color: var(--el-color-primary);
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
      &.active {
        background-color: var(--el-color-warning);
        color: white;
      }
      &:hover {
        background-color: var(--el-color-warning);
        color: white;
      }
    }
  }
}
</style>
