<template>
  <!--自定义 url图标 -->
  <div
    v-if="is_Url_or_svg"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
  />
  <svg v-else aria-hidden="true" :class="className">
    <use :xlink:href="symbolId" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts" name="SvgIcon">
import { computed } from "vue";
import { isExternal } from "@/utils/validate.ts";
export interface SvgProps {
  prefix?: string;
  iconName: string;
  color?: string;
  className?: string;
}
const props = withDefaults(defineProps<SvgProps>(), {
  prefix: "icon",
  color: "",
  className: ""
});

// 拼接class类样式
const className = computed(() => {
  // console.log(this.className);
  if (props.className) {
    return "svg-icon " + props.className;
  } else {
    return "svg-icon";
  }
});

// 判断图标类型
const is_Url_or_svg = computed(() => isExternal(props.iconName));

// url图标
const styleExternalIcon = computed(() => {
  return {
    mask: `url(${props.iconName}) no-repeat 50% 50%`,
    "-webkit-mask": `url(${props.iconName}) no-repeat 50% 50%`
  };
});

// 拼接完整 svg图标
const symbolId = computed(() => `#${props.prefix}-${props.iconName}`);
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;

  /* vertical-align: -0.6em; */
  overflow: hidden;
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
