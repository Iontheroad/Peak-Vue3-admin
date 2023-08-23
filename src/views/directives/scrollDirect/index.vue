<template>
  <div>
    <ul v-scroll="loadMoreData" class="container">
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
      <div class="loading-text">正在加载中...</div>
    </ul>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from "vue";

export default {
  setup() {
    let data = reactive({
      items: [] as { id: number; name: string }[], // 存储数据的数组
      page: 1, // 当前页码
    });

    onMounted(() => {
      loadMoreData(19);
    });

    /**
     * 异步调佣
     */
    function loadMoreData(count = 10) {
      // 模拟异步加载数据
      let time: any;
      time = setTimeout(() => {
        for (let i = 1; i <= count; i++) {
          let id = data?.items.at(-1)!?.id * 1 + 1 || 1;
          data.items.push({
            id,
            name: `Item ${id}`,
          });
        }
        clearTimeout(time);
      }, 3000);
    }
    return {
      loadMoreData,
      ...toRefs(data),
    };
  },
  directives: {
    observerScroll: {
      mounted(el, binding) {
        let lastEl = el.lastElementChild;
        // console.log(lastEl);
        el._observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                // console.log("进入");
                binding.value();
              }
            });
          },
          {
            root: el,
          }
        );
        el._observer.observe(lastEl);
      },
      beforeUnmount(el) {
        el._observer.disconnect();
      },
    },
  },
};
</script>
<style>
.container {
  width: 300px;
  height: 300px;
  margin: 0px auto;
  overflow: auto;
  background-color: skyblue;
  padding: 10px;
  border: 10px solid red;
}
.loading-text {
  text-align: center;
  padding: 10px;
  color: gray;
}
</style>
