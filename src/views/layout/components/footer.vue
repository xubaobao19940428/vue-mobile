
<template>
  <div class="footer">
      <div class="footer_btn">
          <ul>
              <li v-for="(item,index) in list" :key="index" @click="checkUrl(item,index)" :class="{active:index==activeIndex}">
                <span><i class="iconfont" :class="[index==activeIndex?item.selected:item.unSelect]"></i></span>
                <p class="select_icon">{{item.desc}}</p>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: "footerBottom",
  props:{
    activeIndex:{
      type:Number,
      default:0,
    }
  },
  data() {
    return {
        list:[{
                url:"/",
                unSelect:'iconhomepage',
                selected:'iconhome',
                desc:this.$t('lang.tabName.youbo')
            },{
                url:"/home",
                unSelect:'iconshouye',
                selected:'iconhome1',
                desc:this.$t('lang.tabName.dashboard')
            },
            // {
            //     url:"/catelog",
            //     unSelect:'iconicon04',
            //     selected:'iconicon04',
            //     desc:this.$t('lang.tabName.category')
            // },
            // {
            //     url:"search",
            //     unSelect:'iconsousuo',
            //     selected:'iconsousuo',
            //     desc:this.$t('lang.tabName.search')
            // },
            {
                url:"cart",
                unSelect:'iconicon-',
                selected:'iconai66',
                desc:this.$t('lang.tabName.carts')
            },{
                url:"/user",
                unSelect:'iconwode',
                selected:'iconwodedangxuan',
                desc:this.$t('lang.tabName.self')
            }]
    };
  },

  components: {},

  computed: {},

  mounted(){
    this.list.map((item,index)=>{
      if(item.url==this.$route.path){
        // this.activeIndex = index
        this.$emit('resetIndex',index)
      }
    })
  },

  methods: {
    checkUrl(item,index){
      // this.activeIndex = index
      this.$emit('resetIndex',index)
      this.$router.push({
        path:item.url
      })
    },
    login(item){
      // this.$router.push({
      //   path:'/login'
      // })
    }
  },
};
</script>
<style lang="scss" scoped>
.footer {
  height: 55px;
  width: 100%;
  // background: red;
  position: fixed;
  bottom:0;
  left:0;
  right:0;
  margin: 0 auto;
  background-color:#fff;
  border-top:1px solid #cccccc;
  .footer_btn{
      height:100%;
      ul{
          display:flex;
          justify-content: space-between;
          height:100%;
          li{
              padding:4px 0;
              // background:blue;
              height:100%;
              box-sizing: border-box;
              width:50px;
              .select_icon{
                font-size:12px;
                display: block;
                margin-top:5px;
                text-align:center;
              }
              span{
                i{
                  display: block;
                  margin: 0 auto;
                  font-size:27px;
                  width: 27px;
                  height: 27px;
                }
              }
          }
          .active{
            color:#ff495e;
          }
      }
  }
}
</style>