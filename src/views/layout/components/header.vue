<!--  -->
<template>
  
</template>

<script>
import { NavBar } from "vant";

export default {
  name: "headerTitle",
  props:{
      title:{
          type:String,
          default:'首页'
      }
  },
  data() {
    return {
    };
  },

  components: {
    [NavBar.name]: NavBar,
  },

  computed: {},

  mounted() {},

  methods: {
    onClickLeft() {
      alert("返回");
    },
  },
};
</script>
<style lang='scss' scoped>
</style>