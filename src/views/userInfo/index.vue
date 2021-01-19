<!--  -->
<template>
  <div class="user_info">
     <van-nav-bar
    :title="title"
    left-arrow
    @click-left="onClickLeft"
  />
  </div>
</template>

<script>
import { NavBar } from "vant";
export default {
  data () {
    return {
        title:''
    };
  },

  components: {
    [NavBar.name]: NavBar,
  },

  computed: {},

  mounted(){
      this.title = this.$route.meta.title
  },

  methods: {
      onClickLeft(){
          this.$router.go(-1)
      }
  }
}

</script>
<style lang='scss' scoped>
</style>