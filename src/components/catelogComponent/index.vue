<!--  -->
<template>
  <div class="catelog_components">
    <ul>
      <li
        v-for="(item, index) in list"
        :key="index"
        :class="[activeIndex == index ? 'active' : '']"
        @click="catelogDetail(item, index)"
      >
        <p>{{ item.cat_name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "catelogComponent",
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
    activeIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    catelogDetail(item, index) {
      let params = {
        cat_id: item.cat_id,
        index: index,
      };
      this.$emit("set-cate-index", params);
    },
  },
};
</script>
<style lang='scss' scoped>
.catelog_components {
  width: 100%;
  height: 100%;
  text-align: center;
  ul {
    li {
      width: 100%;
      height: 38px;
      overflow: hidden;
      word-break: break-all;
      line-height: 38px;
      font-size: 13px;
      p {
        height: 20px;
        line-height: 20px;
        color: #999;
      }
      &.active {
        p {
          border-left: 2px solid #f23030;
          color: #f23030;
        }
      }
    }
  }
}
</style>