<template>
  <div class="ectouch-notcont">
    <div class="img">
      <img class="img" src="../assets/img/no_content.png" />
    </div>
    <template v-if="isSpan">
      <span class="cont">当前搜索没有数据...</span>
    </template>
    <template v-else>
      <slot name="spanCon"></slot>
    </template>
  </div>
</template>

<script>
export default {
  name: "noContent",
  props: {
    isSpan: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
  .ectouch-notcont{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .cont{
        font-size: 14px;
        color:#666666;
        margin-top:20px;
    }
  }
</style>