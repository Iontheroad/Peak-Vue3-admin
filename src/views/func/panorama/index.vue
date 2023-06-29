<template>
  <div class="panorama-box" style="color: red">
    <div id="viewer" ref="viewer"></div>
    <ul class="nav">
      <li
        v-for="(item, index) in panoramaArr"
        :key="index"
        @click="setViewer(item.img)"
      >
        {{ `全景图${index + 1}` }}
      </li>
    </ul>
    <SidebarMarkerInfo
      v-if="isShowSidebar"
      ref="sidebarMarkerInfoRef"
      v-model:markerInfo="markerInfo"
      @submitCallBack="submitCallBack"
    />
  </div>
</template>

<script lang="ts">
import { ClickData, Viewer } from "photo-sphere-viewer";
import "photo-sphere-viewer/dist/photo-sphere-viewer.css";
import { Ref, nextTick, onMounted, reactive, ref } from "vue";

import {
  Marker,
  MarkerProperties,
  MarkersPlugin,
  SelectMarkerData,
} from "photo-sphere-viewer/dist/plugins/markers";
import "photo-sphere-viewer/dist/plugins/markers.css";
import SidebarMarkerInfo from "./SidebarMarkerInfo.vue";

// 自定义的marker携带的侧边框数据类型
type MarkerInfo = {
  id?: string;
  title?: string;
  msg?: string;
  imgList?: {
    id: number | string;
    url: string;
  }[];
};
// marker完成的参数
type MarkerProps = MarkerProperties & { markerInfo?: MarkerInfo };

export default {
  name: "Panorama",
  components: {
    SidebarMarkerInfo,
  },
  setup(_props) {
    let viewer: Viewer;
    let markersPlugin: MarkersPlugin;
    let sidebarMarkerInfoRef = ref();
    let isShowSidebar = ref(false); // 控制侧边框显示隐藏
    let panoramaArr = [
      {
        img: "http://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ebbea0343bf44d2aabab3dc58aa4c3a~tplv-k3u1fbpfcp-watermark.awebp",
      },
      {
        img: "http://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6df92ba39aa94aec889582df60d3d0d0~tplv-k3u1fbpfcp-watermark.awebp",
      },
      {
        img: "http://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/40135df7df034eb5a76daa76f26fe046~tplv-k3u1fbpfcp-watermark.awebp",
      },
    ]; // 全景图

    const markers: MarkerProps[] = reactive([
      {
        id: `mark:123456`,

        position: { textureX: 945, textureY: 445 },
        size: { width: 32, height: 32 },
        zoomLvl: 100,
        // content: document.getElementById("lorem-content").innerHTML,
        // content: `${sidebarMarkerInfoRef.value?.$el.outerHTML}`,
        // tooltip: `我是提示信息`,
        tooltip: {
          content: `我是默认的标记`,
          position: "center top",
        },
        visible: true, // 标注初始显示与否
        html: `<img src="http://119.91.22.164:8085/images/11411538250643115avatar.jpg" />
            `,
        longitude: 0.27335309121043694, // 经度
        latitude: 0.03017908389074716, // 纬度
        anchor: "center center", // 标记相对点击位置
        markerInfo: {
          id: "mark:123456",
          title: "我是默认marker的标题",
          msg: "我是默认marker的信息",
          imgList: [
            {
              id: 1,
              url: "http://119.91.22.164:8085/images/11411538250643115avatar.jpg",
            },
          ],
        },
      },
    ]);

    onMounted(() => {
      setViewer(panoramaArr[0].img);
      // const markerArr = JSON.parse(localStorage.getItem("markerArr") || "[]");
      // viewer.once("ready", () => {
      //   markerArr.forEach((item: MarkerProperties) => {
      //     markersPlugin.addMarker(item);
      //   });
      // });
    });

    /**
     * 初始化
     * @param panorama 全景图地址
     */
    function setViewer(panorama: string) {
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
        panorama, // 全景图地址
        // size: {
        //   width: 886,
        //   height: 554,
        // }, // 大小
        plugins: [
          [
            MarkersPlugin,
            {
              markers: markers,
            },
          ],
        ],
      });

      // 监听全景图加载完成
      viewer.once("ready", () => {
        console.log("全景图加载完成");
      });

      viewer.on("position-updated", () => {
        console.log(`滑动`);
        isShowSidebar.value = false;
        prevMarkerId && markersPlugin.removeMarker(prevMarkerId);
        prevMarkerId = "";
      });

      // 获取标记实例
      markersPlugin = viewer.getPlugin(MarkersPlugin)!;

      /*  点击标注
      为选中标注事件绑定了一个回调函数。当用户点击选中一个标注时，该回调函数会被触发。
      */
      markersPlugin.on("select-marker", selectMarker);

      // 点击添加标注
      viewer.on("click", addMarker);
    }

    /**
     * 点击marker的事件
     * @param event
     * @param marker 点击的marker的信息
     * @param selectMarkerEvent 选择标记事件的数据
     */
    async function selectMarker(
      event: uevent.Event,
      marker: Marker,
      selectMarkerEvent: SelectMarkerData
    ) {
      // console.log("select-marker e:", event);
      console.log("marker:", marker);
      // console.log("selectMarkerEvent:", selectMarkerEvent);
      let { dblclick, rightclick } = selectMarkerEvent;
      if (dblclick) {
        console.log("双击删除");
        markersPlugin.removeMarker(marker.id);
        prevMarkerId = ""; // 删除记录的marker的id(防止下次添加时，该marker已经删除，避免不存在出异常)
        isShowSidebar.value = false; // 关闭侧边信息栏
      } else if (rightclick) {
        console.log("右击");
      } else {
        console.log("单击");
        /* // 每次单击marker时，判断上次添加marker是否保存,如果没有保存则拦截
        // if (prevMarkerId) {
        //   // markersPlugin.removeMarker(prevMarkerId);
        //   // prevMarkerId = "";
        //   return;
        // } */

        let config = marker.config as MarkerProps;
        console.log(config.markerInfo!);

        markerInfo.value = (config.markerInfo as MarkerInfo) || {};
        // 打开侧边框
        isShowSidebar.value = true;
      }

      // 更新标记
    }

    let prevMarkerId: string; // 记录上一个点击添加marker的id，用于判断是否保存（存在未保存，不存在保存）
    let markerOption = {};
    /**
     * 添加标记
     * @param _event
     * @param data 点击的信息
     */
    function addMarker(_event: uevent.Event, data: ClickData) {
      console.log("添加标注", event, data);
      let { rightclick } = data;
      if (rightclick) return; // 是否是右键触发

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
        imgList: [],
      };

      let option: MarkerProps = {
        id,
        // tooltip: `我是提示信息`,
        tooltip: {
          content: `我是提示信息`,
          position: "center top",
          // trigger: "click",
          // className: "custom-tooltip",
        },
        visible: true, // 标注初始显示与否
        html: `
              <img src="http://119.91.22.164:8085/images/11411538250643115avatar.jpg" />
              `,
        longitude: data.longitude, // 经度
        latitude: data.latitude, // 纬度
        anchor: "center center", // 标记相对点击位置
      };
      markerOption = option;
      markersPlugin.addMarker(option);
    }

    function removeMarker() {
      // 先判断上一个点击的marker的id是否存在，存在就删除
      if (prevMarkerId) {
        markersPlugin.removeMarker(prevMarkerId);
      }

      isShowSidebar.value = true; // 显示侧边信息栏
    }

    // 传入表单的数据
    let markerInfo = ref<MarkerInfo>({
      title: "",
      msg: "",
      imgList: [],
    });
    /**
     * 模拟接口
     */
    function reqGetDate() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            title: "我是标记的标题",
            msg: "这是我的标记信息",
            imgList: [
              {
                id: 1,
                url: "http://119.91.22.164:8085/images/11411538250643115avatar.jpg",
              },
            ],
          });
        }, 1000);
      });
    }

    /**
     * 标签侧边栏确定的回调
     */
    function submitCallBack(type: "submit" | "cancel") {
      if (type == "submit") {
        isShowSidebar.value = false;
        prevMarkerId = ""; // 保存就清除记录的点击marker的id
        console.log(markerInfo.value, "输入的内容");

        console.log("确定的回调");
        markersPlugin.updateMarker({
          ...markerOption,
          markerInfo: {
            title: markerInfo.value.title,
            msg: markerInfo.value.msg,
            imgList: markerInfo.value.imgList || [],
          },
        } as MarkerProps);
      } else {
        isShowSidebar.value = false;

        // 取消添加就清除这个marker
        prevMarkerId && markersPlugin.removeMarker(prevMarkerId);
        prevMarkerId = ""; // 保存就清除记录的点击marker的id
      }
    }

    return {
      panoramaArr,
      sidebarMarkerInfoRef,
      isShowSidebar,
      markerInfo,
      setViewer,
      submitCallBack,
    };
  },
};
</script>

<style lang="scss" scoped>
.panorama-box {
  position: relative;
  flex: 1;
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
            top: 0px;
            left: 0px;
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
    left: 0px;
    bottom: 0px;
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
      &:last-child {
        margin-right: 0px;
      }
      &:hover {
        background-color: var(--el-color-warning);
        color: white;
      }
    }
  }
}
</style>
