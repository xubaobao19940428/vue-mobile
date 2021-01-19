import Vue from 'vue'
// 下拉刷新更多
Vue.directive('scroll-load-more', {
    bind(el, binding) {
        const SELECTWRAP_DOM = el.querySelector(
          ".product_list"
        )
        SELECTWRAP_DOM.addEventListener("scroll", function () {
          const condition =
            this.scrollHeight - this.scrollTop <= this.clientHeight;
          if (condition) {
            binding.value();
          }
        });
      }
  });