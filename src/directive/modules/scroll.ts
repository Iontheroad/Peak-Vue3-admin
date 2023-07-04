
import type { DirectiveBinding } from "vue";

const scroll = {
  mounted(el: HTMLElement & { $destroy: () => void }, binding: DirectiveBinding) {

    const scrollListener = () => {
      let scrollTop = el.scrollTop
      let scrollHeight = el.scrollHeight;
      let clientHeight = el.clientHeight;
      // console.log(scrollTop, scrollHeight, clientHeight)

      // 容器的高度 如果大于等于  容器的实际高度减去被卷去的高度  就证明已经滚动到底部了
      if (clientHeight >= scrollHeight - scrollTop) {
        console.log('到底了');
        binding.value()

      }
    };

    el.addEventListener("scroll", scrollListener)

    el.$destroy = () => {
      el.removeEventListener("scroll", scrollListener)
    }
  },

  beforeUnmount(el: HTMLElement & { $destroy: any }) {
    el.$destroy()
  }
}

const scrollObserver = {
  mounted(el: HTMLElement & { _observer: IntersectionObserver }, binding: DirectiveBinding) {
    let lastEl = el.lastElementChild!;
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
  beforeUnmount(el: HTMLElement & { _observer: IntersectionObserver }) {
    el._observer.disconnect();
  },
}

export default scroll