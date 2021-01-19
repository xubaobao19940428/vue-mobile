<template>
  <div id="app">
    <!--不需要刷新页面用keep-alive-->
    <keep-alive>
      <router-view
        v-if="$route.meta.keepAlive"
        :include="include"
      ></router-view>
    </keep-alive>
    <router-view></router-view>
  </div>
</template>

<script>
import {getServerTime} from '@/api/login'
import {Person1} from './common/ts'

export default {
  name: 'App',
  data(){
    return {
      include:[]
    }
  },
  components: {
   
  },
  watch: {
    $route(to, from) {
      //如果 要 to(进入) 的页面是需要 keepAlive 缓存的，把 name push 进 include数组
      if (to.meta.keepAlive) {
        !this.include.includes(to.name) && this.include.push(to.name);
      }
      //如果 要 form(离开) 的页面是 keepAlive缓存的，
      //再根据 deepth 来判断是前进还是后退
      //如果是后退
      if (from.meta.keepAlive) {
        var index = this.include.indexOf(from.name);
        index !== -1 && this.include.splice(index, 1);
      }
    },
  },
  mounted(){
    this.getServerTimeDefault()
    this.msgBtn()
    this.$axios.post('http://localhost:8080/indexPage/detail',{id:0}).then(response=>{
      console.log(response)
    }).catch(error=>{
      console.log(error)
    })
    let newFunction = function (){
      this.sss=111
    }
    let hahaha = new newFunction

    console.log(hahaha)
  },
  methods:{
    getServerTimeDefault(){
      getServerTime().then((res) => {
        if (res.status == 'success') {
          localStorage.setItem('time',Math.floor(new Date().getTime()/1000)-res.data.time)
        }
      });
    },
     msgBtn() {
      Person1({name:'111',age:222})
    },
  }
}
</script>

<style>
#app {
  width:100vw;
  height:100vh;
}
</style>
