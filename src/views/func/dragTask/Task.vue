<template>
  <draggable
    :list="list"
    :group="group"
    :itemKey="itemKey"
    animation="300"
    chosenClass="chosen"
    forceFallback="true"
    class="draggable-box"
    @change="changeMoved"
  >
    <!-- <transition-group >
  </transition-group> -->
    <template #item="{ element, index }">
      <div class="draggable-item">
        <slot :element="element" :$index="index">
          {{ element.name }} {{ element.id }}
        </slot>
      </div>
    </template>
  </draggable>
</template>

<!-- 属性
group	 :group= "name"，相同的组之间可以相互拖拽 或者 { name: "...", pull: [true, false, 'clone', array , function], put: [true, false, array , function] }
sort	:sort= "true",是否开启内部排序,如果设置为false,它所在组无法排序，在其他组可以拖动排序
delay	:delay= "0", 鼠标按下后多久可以拖拽
touchStartThreshold	鼠标移动多少px才能拖动元素
disabled	:disabled= "true",是否启用拖拽组件
animation	拖动时的动画效果，还是很酷的,数字类型。如设置animation=1000表示1秒过渡动画效果
handle	 :handle=".mover" 只有当鼠标移动到css为mover类的元素上才能拖动
filter	:filter=".unmover" 设置了unmover样式的元素不允许拖动
draggable	:draggable=".item" 那些元素是可以被拖动的
ghostClass	:ghostClass="ghostClass" 设置拖动元素的占位符类名,你的自定义样式可能需要加!important才能生效，并把forceFallback属性设置成true
chosenClass	:ghostClass="hostClass" 被选中目标的样式，你的自定义样式可能需要加!important才能生效，并把forceFallback属性设置成true
dragClass	:dragClass="dragClass"拖动元素的样式，你的自定义样式可能需要加!important才能生效，并把forceFallback属性设置成true
dataIdAttr	dataIdAttr: 'data-id'
forceFallback	默认false，忽略HTML5的拖拽行为，因为h5里有个属性也是可以拖动，你要自定义ghostClass chosenClass dragClass样式时，建议forceFallback设置为true
fallbackClass	默认false，克隆的DOM元素的类名
allbackOnBody	默认false，克隆的元素添加到文档的body中
fallbackTolerance	拖拽之前应该移动的px
scroll	默认true,有滚动区域是否允许拖拽
scrollFn	滚动回调函数
scrollSensitivity	距离滚动区域多远时，滚动滚动条
scrollSpeed	滚动速度
 -->
<script setup lang="ts" name="Task">
import { toRefs } from "vue";
import draggable from "vuedraggable/src/vuedraggable";

export interface Item {
  id: number | string;
  [key: string]: any;
}
export interface Props {
  list: Item[];
  group?: string;
  itemKey?: string;
}

const props = withDefaults(defineProps<Props>(), {
  group: "item",
  itemKey: "id",
});

let { list, group, itemKey } = toRefs(props);

/**
 * 移动
 */
interface Moved {
  element: Item;
  newIndex: number;
  oldIndex: number;
}
const changeMoved = (item: Moved) => {
  console.log(item);
};
</script>
<style lang="scss" scoped>
// 可上传区域
.draggable-box {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  padding: 5px 10px;
  height: auto;
  min-height: 240px;
  // min-height: 340px;
  border: 5px solid red;

  .draggable-item {
    box-sizing: border-box;
    cursor: pointer;
    width: 100%;
    height: 70px;
    margin: 5px 0;
    background-color: #fff;
    text-align: left;
    padding: 5px 10px;
    box-sizing: border-box;
    box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
  }
}
// 拖动的元素的样式
.chosen {
  box-sizing: border-box !important;
  border: 2px solid var(--el-color-primary) !important;
  //  background: var(--el-color-primary);
}
</style>
