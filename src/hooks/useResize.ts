/**
 * 监听窗口
 */
import { ref, onMounted, onUnmounted, Ref } from "vue";

export const useResize = () => {
  onMounted(() => {
    window.addEventListener("resize", resize);
  });
  onUnmounted(() => {
    window.removeEventListener("resize", resize);
  });

  /**
   * 窗口宽度
   */
  let windowWidth = ref<number>(1200);
  /**
   * 菜单栏是否折叠
   *  默认不折叠
   */
  let isCollapse: Ref<boolean> = ref(false);

  function resize() {
    windowWidth.value = document.body.getBoundingClientRect().width;
    if (windowWidth.value >= 1200) isCollapse.value = false;
    else if (windowWidth.value > 992) isCollapse.value = true;
    else isCollapse.value = true; // 小窗下, 菜单栏默认折叠
  }
  resize(); // 先初始化
  return {
    windowWidth,
    isCollapse
  };
};
