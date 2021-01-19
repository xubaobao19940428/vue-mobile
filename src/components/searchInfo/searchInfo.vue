<!--  -->
<template>
  <div class="searchInfo">
    <div class="go_back">
        <i class="iconfont iconfanhui"></i>
    </div>
    <div class="search_search">
        <van-search v-model="value" placeholder="请输入搜索关键词" :show-action="isSearch" action-text="搜索" @focus="isSearch=true"/>
    </div>
  </div>
</template>

<script>
import { Search } from 'vant';
export default {
  name:'searchInfo',
  data () {
    return {
        value:'',
        isSearch:false
    };
  },

  components: {
      [Search.name]:Search
  },

  computed: {},

  mounted(){},

  methods: {}
}

</script>
<style lang='scss' scoped>
.searchInfo{
    height:47px;
    position: fixed;
    top:0;
    width:100%;
    padding:8px;
    background:#ffffff;
    box-sizing: border-box;
    border-bottom:1px solid #dddddd;
    display:flex;
    .go_back{
        width:10%;
        height:100%;
        line-height: 31px;
    }
    .search_search{
        flex-grow:1;
        padding: 0 20px 0 0;
        .van-search{
            height: 100%;
            .van-search__content{
                background-color:#fff;
                border: 1px solid #dddddd;
                border-radius: 10px;
            }
        }
    }

}
</style>