<!--  -->
<template>
  <div class="profile_popup">
      <van-popup v-model="show" position="right" :style="{width:'100%',height:'100%',padding:'10px','boxSizing':'border-box'}">
          <div class="nickname" v-if="type=='nickname'">
              <van-field v-model="nickname" label="昵称" placeholder="请输入昵称" style="border-bottom:1px solid #ccc"/>
          </div>
          <div class="user_sex" v-if="type=='sex'">
              <ul>
                  <li v-for="(item,index) in sexList" :key="index" @click="selectSex(index)">
                      <img :src="activeIndex===index?item.select:item.unSelect" alt="">
                      <i class="iconfont iconduihao" style="color:red;" v-if="activeIndex===index"></i>
                      <span>{{item.name}}</span>
                  </li>
              </ul>
          </div>
          <div class="user_birthday" v-if="type=='birthday'">
              <label for="">出生日期</label>
              <input type="date" placeholder="请选择出生日期" v-model="birthday" >
          </div>
          <!---统一的button-->
          <van-button type="danger" style="width: 100%;margin-top:10px;" @click="updateProfile">确定</van-button>
      </van-popup>
  </div>
</template>

<script>
import { Popup,Field,Button} from 'vant';
export default {
    name:'profilePopup',
    props:{
        show:{
            type:Boolean,
            default:false
        },
        type:{
            type:String,
            default:'nickname'
        }
    },
  data () {
    return {
        nickname:'',
        sexList:[
            {
                name:'男',
                unSelect:require('../../../assets/image/un_select_boy.png'),
                select:require('../../../assets/image/boy.png')
            },
            {
                name:'女',
                unSelect:require('../../../assets/image/un_select_girl.png'),
                select:require('../../../assets/image/girl.png')
            }
        ],
        activeIndex:0,
        birthday:''
    };
  },

  components: {
      [Popup.name]:Popup,
      [Field.name]:Field,
      [Button.name]:Button
  },

  computed: {},

  mounted(){},

  methods: {
      updateProfile(){

      },
      selectSex(index){
          this.activeIndex = index
      }
  }
}

</script>
<style lang='scss' scoped>
.profile_popup{
    width:100%;
    height:100%;
    .user_sex{
        width:100%;
        height:100px;
        ul{
            height:100%;
            width:100%;
            display: flex;
            justify-content: space-around;
            li{
                position: relative;
                display: flex;
                flex-direction: column;
                text-align: center;
                color:#ccc;
                img{
                    width:80px;
                    height:80px;
                }
                i{
                    position: absolute;
                    bottom:20px;
                    right:10px;
                }
            }
        }
    }
    .user_birthday{
        border-bottom:1px solid #ccc;
        display: flex;
        height:30px;
        label{
            display: inline-block;
            width:100px;
            line-height:30px
        }
        input{
            flex:1;
            line-height:30px
        }
    }
}
</style>