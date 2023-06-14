<template>
  <div id="three-box">
    <div class="three-box-body"></div>
    <div class="plantoperate">
      <div class="fangda" @click="amplify">
        <el-icon><ZoomIn /></el-icon>
      </div>
      <div class="fuwei" @click="reset">
        <el-icon><Aim /></el-icon>
      </div>
      <div class="suoxiao" @click="reduce">
        <el-icon><ZoomOut /></el-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="Three3D">
import { ZoomIn, Aim, ZoomOut } from "@element-plus/icons-vue";
import * as THREE from "three";

// import Stats from "three/addons/libs/stats.module.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { FBXLoader } from "three/addons/loaders/FBXLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment";
import { onMounted } from "vue";

let camera: any, scene: any, renderer: any, stats: any, controls: any;
onMounted(() => {
  init();
  loadModel();
  animate();
});

let initData = {
  showLoading: true,
  number: 90, //  模型的期望大小
  model: null as any, // 模型
  size: 0 as number,
};

let container: HTMLDivElement; // 容器
/**
 * 初始化
 */
function init() {
  container = document.getElementsByClassName(
    "three-box-body"
  )[0] as HTMLDivElement;

  // 1.创建场景
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x22ff00, 0.1, 1000); //雾化场景
  // scene.background = new THREE.Color(0xf65144);

  // 2.创建透视摄像机
  camera = new THREE.PerspectiveCamera(
    90, // 摄像机视锥体垂直视野角度
    container.clientWidth / container.clientHeight, // 相机视锥体水平方向和竖直方向长度比，一般设置为Canvas画布宽高比width / height
    // 近端渲染距离和远端距离：这两个是设置相机可以看到的场景内容的范围，只有离相机的距离大于near值，小于far值，且在相机的可视角度之内，才能被相机投影到。
    0.1, // 近截面（near）
    1000 // 远截面（far）
  );
  camera.position.set(0, -100, 20);
  // camera.position.set(0, -10, 5);
  camera.up.set(0, 1, 0); // 默认y轴朝上
  // camera.position.set(0, 100, 20); // 相机位置
  // camera.up.set(0, 0, 1); // z轴朝上
  // camera.lookAt(0, 0, 0); // 相机观察目标位置

  // 3.创建Three.JS渲染器
  renderer = new THREE.WebGLRenderer({
    antialias: true, // 抗锯齿
    logarithmicDepthBuffer: true,
  }); //alpha:true
  renderer.setSize(container.clientWidth, container.clientHeight); // 设置渲染器大小
  renderer.setPixelRatio(window.devicePixelRatio); // 设置设备像素比。通常用于HiDPI设备防止模糊输出canvas。
  renderer.outputEncoding = THREE.sRGBEncoding; // 将纹理和颜色编码为sRGB的方法
  renderer.setClearColor(0xdadcde, 0); // 设置背景颜色，
  container.appendChild(renderer.domElement); // 把渲染器添加到页面

  // AxesHelper：辅助观察的坐标系
  // 坐标轴颜色红R、绿G、蓝B分别对应坐标系的x、y、z轴，对于three.js的3D坐标系默认y轴朝上。
  const axesHelper = new THREE.AxesHelper(150);
  scene.add(axesHelper);

  // 4.创建控制器对象 设置鼠标操作（控制器）
  // OrbitControls本质上就是改变相机的参数，比如相机的位置属性，改变相机位置也可以改变相机拍照场景中模型的角度，实现模型的360度旋转预览效果，改变透视投影相机距离模型的距离，就可以改变相机能看到的视野范围。
  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0); // 调整模型在网格上的位置
  controls.enablePan = false; // 是否开启右键拖拽
  controls.enableDamping = true; // 默认为false ，设置为true则启用阻尼(惯性)
  controls.enableZoom = true; // 是否启用缩放

  // 创建网格对象
  const mesh = new THREE.Mesh();

  // 预过滤的Mipmapped辐射环境贴图
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  //给场景添加环境光效果
  scene.environment = pmremGenerator.fromScene(
    new RoomEnvironment()
    // 0.01 // 去掉光环境值
  ).texture;

  // 添加平行光 // 通过添加平行光，可以让场景中的物体产生阴影，增强场景的真实感和细节。
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2); // 设置平行光的颜色为白色（0xffffff），亮度为0.2。
  directionalLight.position.set(0, 0, 100); // 设置平行光的位置为(0,0,100)，表示平行光从场景的正上方照射下来。
  directionalLight.castShadow = true; // 将平行光设置为可以投射阴影。
  directionalLight.target = mesh; // 将平行光的目标设置为mesh，表示平行光照射的目标为mesh对象。
  scene.add(directionalLight); // 将平行光添加到场景中。

  // 设置点光源(就像灯泡)
  const light = new THREE.PointLight(0xffffff, 0.3);
  light.position.set(100, 200, -300); // 设置光源位置
  scene.add(light);

  // 设置半球光
  var hemiLight = new THREE.HemisphereLight(0xffffff, 0x080820, 0.2);
  hemiLight.position.set(20, -10, -10); //
  scene.add(hemiLight);

  // 设置环境光 (没有特定方向，只是整体改变场景的光照明暗。)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 设置颜色
  scene.add(ambientLight);

  //模型页面响应式
  window.addEventListener("resize", onWindowResize);
}

/**
 * 监听窗口
 */
function onWindowResize() {
  let width = container.clientWidth;
  let height = container.clientHeight;
  camera.aspect = width / height; // 更新相机的宽高比，因为窗口大小改变后，渲染尺寸和相机的宽高比也会改变
  camera.updateProjectionMatrix(); // 更新相机的投影矩阵，以确保场景在不同的窗口尺寸下都能正确呈现。
  renderer.setSize(width, height); // 更新渲染器的大小，以确保场景能够完整地显示在网页中。
}

//执行动画
function animate() {
  requestAnimationFrame(animate); // 告诉浏览器下一帧需要执行的函数是animate()，从而实现动画循环。
  // mesh.rotation.y += 0.01; //沿Y轴旋转
  controls.update(); // 更新控制器的状态，以响应用户的交互操作。
  renderer.render(scene, camera); // 执行渲染操作，将场景中的物体渲染到屏幕上。
}

/**
 * 创建模型加载器
 */
function loadModel() {
  //创建模型加载器
  const loader = new FBXLoader();
  loader.load(
    "http://119.91.22.164:8085/Model/GuanMu/BiLiShiDuJuan/BiLiShiDuJuan.fbx",
    function (model: any) {
      // console.log(model);
      initData.model = model;

      // //动态设置模型大小
      const box = new THREE.Box3().setFromObject(model); // 计算模型的包围盒
      const center = box.getCenter(new THREE.Vector3()); // 获取包围盒中心点
      model.position.sub(center); // 将模型居中到原点

      const size = box.getSize(new THREE.Vector3()); // 获取包围盒尺寸
      // //  计算最大值
      const maxSize = Math.max(size.x, size.y, size.z);
      initData.size = maxSize; // 存储最大值

      /* 
      缩放模型：通过调用model.scale.set()方法，将模型对象缩放到指定大小。其中，initData.number表示模型的期望大小（即在初始化数据对象中存储的大小），maxSize表示模型在三个坐标轴上的最大值。
      */
      model.scale.set(
        initData.number / maxSize,
        initData.number / maxSize,
        initData.number / maxSize
      ); // 缩放模型至目标大小

      /*
      设置材质：通过调用model.traverse()方法，遍历模型对象的所有子对象，并对其中类型为Mesh的对象进行材质设置。其中，child.isMesh表示该子对象是否是Mesh类型的对象，如果是，则将其材质的两面都渲染（child.material.side = THREE.DoubleSide），并设置alpha测试的阈值（child.material.alphaTest = 0.1）。 */
      model.traverse(function (child: any) {
        if (child.isMesh) {
          //不让模型材料丢失
          child.material.side = THREE.DoubleSide;
          //模型贴图边缘透明
          child.material.alphaTest = 0.1;
        }
      });

      // 设置编码：通过调用model.encoding = THREE.sRGBEncoding属性，设置模型对象的编码方式为sRGB编码，以便在渲染时正确显示颜色。
      model.encoding = THREE.sRGBEncoding;

      // 设置模型旋转中心位置
      // 用于修改一个模型对象的中心点位置。其中，x、y、z表示新的中心点位置，obj表示要修改的模型对象。
      function changePivot(
        x: number,
        y: number,
        z: number,
        obj: THREE.Object3D<THREE.Event>
      ) {
        // 创建包装器对象：通过创建一个新的Object3D对象（wrapper），并设置其位置为新的中心点位置（wrapper.position.set(x, y, z)）。
        let wrapper = new THREE.Object3D();
        wrapper.position.set(x, y, z);
        // 添加模型对象：通过调用wrapper.add(obj)方法，将要修改的模型对象添加到包装器对象中。
        wrapper.add(obj);
        // 修改模型位置：通过调用obj.position.set(-x, -y, -z)方法，将模型对象的位置向量减去新的中心点位置向量，从而将模型对象移动到新的中心点位置。
        obj.position.set(-x, -y, -z);
        return wrapper;
      }
      changePivot(0, 0, 32, model);

      // 兼容个别模型的中心点
      if (
        Number(size.z.toFixed(2)) > 1.1 &&
        Number(size.z.toFixed(2)) < 1.3 &&
        Number(size.z.toFixed(3)) != 1.115 &&
        Number(size.z.toFixed(2)) != 1.21
      ) {
        changePivot(0, 0, size.z * 3, model);
      }
      // if (size.z.toFixed(3) == 1.115) {
      //   changePivot(0, 0, 35, model);
      // }
      scene.add(model);
    },
    //加载过程回调函数-可以获得加载进度
    function (e) {
      if ((e.loaded / e.total) * 100 == 100) {
        setTimeout(() => {
          initData.showLoading = false;
        }, 3000);
      }
      console.log("加载完成的百分比" + (e.loaded / e.total) * 100 + "%", e);
    },
    function (e) {
      console.error(e);
    }
  );
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
  controls.reset();
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
#three-box {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  // height: 100%;
  padding: 50px;
  background-color: rgb(232, 236, 236);
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
      display: flex;
      justify-content: center;
      align-items: center;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(5, 5, 5, 0.2);
      text-align: center;
      line-height: 48px;
      color: #fff;
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
