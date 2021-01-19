<!--  -->
<template>
  <div class="layout">
    <!-- <header-title :title="headerTitleName"></header-title> -->
    <router-view></router-view>
    <footer-bottom :activeIndex="activeIndex" @resetIndex="resetIndex" ref="footer"></footer-bottom>
  </div>
</template>

<script>
import footerBottom from "./components/footer";
// import headerTitle from "./components/header";
export default {
  name: "layout",
  data() {
    return {
      headerTitleName: "",
      activeIndex:0
    };
  },

  components: {
    footerBottom,
  },

  computed: {
    
  },
  mounted() {
    this.headerTitleName = this.$route.meta.title
  },

  methods: {
    resetIndex(index){
      this.activeIndex = index
    }
  },
  updated(){
    this.$refs.footer.list.map((item,index)=>{
      if(this.$route.path==item.url){
        this.activeIndex = index
      }
    })
  }
};
</script>
<style lang='scss' scoped>
.layout {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>