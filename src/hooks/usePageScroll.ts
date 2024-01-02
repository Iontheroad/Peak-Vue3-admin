/**
 * 页面滚动
 */
import { onMounted, onUnmounted, ref } from "vue";

export function usePageScroll() {
  let isPageScroll = ref(true); // 是否固定头部

  function handleScroll() {
    if (window.scrollY > 0) {
      isPageScroll.value = true;
    } else {
      isPageScroll.value = false;
    }
  }
  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  return {
    isPageScroll
  };
}
