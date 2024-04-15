<template>
  <div class="three-box">
    <div class="three-box-body"></div>
    <div class="plantoperate">
      <div class="fangda" @click="amplify">
        <i class="iconfont icon-fangda"></i>
      </div>
      <div class="fuwei" @click="reset">
        <i class="iconfont icon-fuwei"></i>
      </div>
      <div class="suoxiao" @click="reduce">
        <i class="iconfont icon-suoxiao"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="Three3D">
import * as THREE from "three";

// import Stats from "three/addons/libs/stats.module.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";
// import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
// import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment";
import { onMounted } from "vue";

let camera: any, scene: any, renderer: any, stats: any;
onMounted(() => {
  init();
  animate();
});

let initData = {
  showLoading: true,
  timer: null,
  number: 90,
  model: null as any,
  size: 0 as number,
  controls: null as any //控制器对像
};
// let showLoading = true;
// let timer = null,
//   number = 90,
//   model = null,
//   size = null,
//   controls = null; //控制器对像

function init() {
  const container = document.getElementsByClassName("three-box-body")[0]!;

  // 1、创建场景
  scene = new THREE.Scene();

  // 2、创建相机（透视投影相机）
  camera = new THREE.PerspectiveCamera(
    45, // 表示摄像机能看到的视野。推荐默认值50
    container.clientWidth / container.clientHeight, // 长宽比
    // 近端渲染距离和远端距离：这两个是设置相机可以看到的场景内容的范围，只有离相机的距离大于near值，小于far值，且在相机的可视角度之内，才能被相机投影到。
    1, // 近端渲染距离
    1000 // 远端渲染距离
  );

  // 2.1 设置相机位置
  // camera.position.x = 20;
  // camera.position.y = -30;
  // camera.position.z = 20;
  // 2.1 设置相机位置简写方式：
  // camera.position.set(20, -30, 20);
  camera.position.set(-20, 0, 60);
  //相机以哪个方向为上方（默认y轴为上方）
  camera.up.x = 0;
  camera.up.y = 1;
  camera.up.z = 0; // 左右为X轴，右为正；前后为Y轴，前为正；上下为Z轴，上为正。
  // 相机看向哪个坐标
  //相机默认是由正z轴看像-z轴（相机镜头对着-z轴方向拍），就是我们由屏幕外向屏幕内看一样。
  camera.lookAt(scene.position);

  // 创建Three.JS渲染器
  renderer = new THREE.WebGLRenderer();
  // 设置设备像素比。通常用于HiDPI设备防止模糊输出canvas。
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.outputEncoding = THREE.sRGBEncoding; //将纹理和颜色编码为sRGB的方法
  // 设置渲染器的大小（长宽）（设置渲染器为全屏）
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0xdadcde, 0); //设置背景颜色，
  // 将渲染结果展示到页面上
  container.appendChild(renderer.domElement);

  //创建网格对象
  const mesh = new THREE.Mesh();
  //预过滤的Mipmapped辐射环境贴图
  const pmremGenerator = new THREE.PMREMGenerator(renderer);

  //创建控制器对象
  const controls = new OrbitControls(camera, renderer.domElement);
  // controls = controls;
  controls.target.set(0, 12, 0);
  controls.enablePan = false; //禁止右键拖拽
  controls.enableDamping = true; //默认为false ，设置为true则启用阻尼(惯性)
  controls.enableZoom = true; //启用/禁用缩放
  controls.update();

  // 平行光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
  directionalLight.position.set(0, 0, 100);
  directionalLight.castShadow = true;
  directionalLight.target = mesh;
  scene.add(directionalLight);

  //给场景添加环境光效果
  scene.environment = pmremGenerator.fromScene(
    new RoomEnvironment()
    // 0.01，去掉光环境值
  ).texture;

  // 设置点光源
  const light = new THREE.PointLight(0xffffff, 0.3);
  light.position.set(100, 200, -300); // 设置光源位置
  scene.add(light);

  //设置半球光
  const hemiLight = new THREE.HemisphereLight(
    0xffffff, // 天空颜色
    0x080820, //地面颜色
    0.2 // 光源的强度
  );
  hemiLight.position.set(20, -10, -10);
  scene.add(hemiLight);

  // 设置环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 设置颜色
  scene.add(ambientLight);

  //创建模型加载器
  const loader = new FBXLoader();
  loader.load(
    "http://119.91.22.164:8085/Model/GuanMu/BiLiShiDuJuan/BiLiShiDuJuan.fbx",
    function (model: any) {
      // console.log(model);
      initData.model = model;

      //动态设置模型大小
      const box = new THREE.Box3().setFromObject(model); // 计算模型的包围盒
      const center = box.getCenter(new THREE.Vector3()); // 获取包围盒中心点
      const size = box.getSize(new THREE.Vector3()); // 获取包围盒尺寸
      console.log(size.x, size.y, size.z, size.z.toFixed(2));
      // 计算缩放比例，保证模型大小相同
      const maxSize = Math.max(size.x, size.y, size.z);
      initData.size = maxSize;
      // 重新设置模型的位置和大小
      model.position.sub(center); // 将模型居中到原点
      model.scale.set(
        initData.number / maxSize,
        initData.number / maxSize,
        initData.number / maxSize
      ); // 缩放模型至目标大小
      // 遍历模型
      model.traverse(function (child: any) {
        if (child.isMesh) {
          //不让模型材料丢失
          child.material.side = THREE.DoubleSide;
          //模型贴图边缘透明
          child.material.alphaTest = 0.1;
        }
      });

      model.encoding = THREE.sRGBEncoding;
      // 设置模型旋转中心位置
      function changePivot(
        x: number,
        y: number,
        z: number,
        obj: THREE.Object3D<THREE.Event>
      ) {
        let wrapper = new THREE.Object3D();
        wrapper.position.set(x, y, z);
        wrapper.add(obj);
        obj.position.set(-x, -y, -z);
        return wrapper;
      }
      changePivot(0, 0, 32, model);
      if (
        Number(size.z.toFixed(2)) > 1.1 &&
        Number(size.z.toFixed(2)) < 1.3 &&
        Number(size.z.toFixed(3)) != 1.115 &&
        Number(size.z.toFixed(2)) != 1.21
      ) {
        changePivot(0, 0, size.z * 3, model);
      }
      // if (size.z.toFixed(3)==1.115) {
      //   changePivot(0,0,35,model)
      // }
      scene.add(model);
      animate();
      scene.add(model);
    },
    //加载过程回调函数-可以获得加载进度
    function (e) {
      if ((e.loaded / e.total) * 100 == 100) {
        setTimeout(() => {
          initData.showLoading = false;
        }, 3000);
      }
      console.log("加载完成的百分比" + (e.loaded / e.total) * 100 + "%");
    },
    function (e) {
      console.error(e);
    }
  );

  // stats
  stats = new Stats();
  container.appendChild(stats.dom);

  window.addEventListener("resize", onWindowResize);
}

//模型页面响应式
function onWindowResize() {
  // camera.aspect = window.innerWidth / window.innerHeight;
  // camera.updateProjectionMatrix();

  // renderer.setSize(window.innerWidth, window.innerHeight);

  let width = window.innerWidth - 540;
  let height = window.innerHeight - 64;
  if (window.innerWidth <= 1680) {
    width = window.innerWidth - 450;
    height = window.innerHeight - 53;
  }
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

//执行动画
function animate() {
  requestAnimationFrame(animate);
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  stats.update();
  // requestAnimationFrame(animate);
  // mesh.rotation.y += 0.01; //沿Y轴旋转
  // initData.controls.update(); //更新控制器
  // renderer.render(scene, camera); //重新渲染
}

// 放大
function amplify() {
  initData.number += 5;
  initData.model.scale.set(
    initData.number / initData.size,
    initData.number / initData.size,
    initData.number / initData.size
  );
}
// 复位
function reset() {
  initData.number = 90;
  initData.model.scale.set(
    initData.number / initData.size,
    initData.number / initData.size,
    initData.number / initData.size
  );
  initData.controls.reset();
}
// 缩小
function reduce() {
  if (initData.number > 10) initData.number -= 5;
  initData.model.scale.set(
    initData.number / initData.size,
    initData.number / initData.size,
    initData.number / initData.size
  );
}
</script>

<style lang="scss" scoped>
.three-box {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  // height: 100%;
  padding: 50px;
  background-color: rgb(232 236 236);
  .three-box-body {
    flex: 1;

    // height: 100%;
  }
  .plantoperate {
    position: absolute;
    top: 85%;
    left: 50%;
    display: flex;
    transform: translateX(-50%);
    div {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgb(255 255 255 / 20%);
      text-align: center;
      line-height: 48px;
      color: #ffffff;
      i {
        font-size: 20px;
      }
    }
    div + div {
      margin-left: 40px;
    }
  }
}
</style>
