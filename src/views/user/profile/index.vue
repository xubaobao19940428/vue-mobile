<!--  -->
<template>
  <div class="user_profile">
    <div class="user_header">
      <div class="header_img">
        <img v-bind:src="user.avatar" alt="" />
        <van-uploader :after-read="afterRead('avatar')" accept="image/jpg, image/jpeg, image/png, image/gif" class="user-img-box"/>
      </div>
      <div class="profile-index-top">
        <h3 v-if="user.name != ''">{{ user.name }}</h3>
        <h3 v-else>{{ user.username }}</h3>
        <p><span class="user_name">用户名</span>{{ user.username }}</p>
      </div>
      <div class="user-bg-box-1">
        <img src="../../../assets/img/user-1.png" class="img" />
      </div>
      <div class="user-bg2-box-1">
        <img src="../../../assets/img/user-2.png" class="img" />
      </div>
    </div>
    <van-cell-group>
      <van-cell title="昵称" :value="user.nickname" is-link  @click="profileUpdate('nickname')"/>
      <van-cell title="性别" value="内容" is-link @click="profileUpdate('sex')"/>
      <van-cell title="出生日期" :value="user.birthday" is-link @click="profileUpdate('birthday')"/>
      <van-cell title="收货地址"  is-link @click="userAddress"/>
    </van-cell-group>
    <div class="box"></div>
    <van-cell-group>
      <van-cell title="实名认证" is-link />
      <van-cell title="账户安全" is-link />
    </van-cell-group>
    <div class="box"></div>
    <van-cell-group>
      <van-cell title="送货条款" is-link />
      <van-cell title="入住商家的合约条款" is-link />
      <van-cell title="退款规则" is-link />
      <van-cell title="运费规则" is-link />
      <van-cell title="关于我们" is-link />
      <van-cell title="用户协议" is-link />
      <van-cell title="隐私保护" is-link />
      <van-cell title="下载链接" is-link />
    </van-cell-group>
    <div class="box"></div>
    <van-cell-group>
      <van-cell title="使用帮助" is-link />
    </van-cell-group>
    <div class="box"></div>
    <div class="login_out">
      <van-button type="danger" class="button" style="width: 100%" @click="loginOut"
        >退出</van-button
      >
    </div>
    <!--统一的弹出层-->
    <profile-popup :show="profileShow" :type="profileType"></profile-popup>
  </div>
</template>

<script>
import { Cell, CellGroup,Uploader} from "vant";
import { getProfile,uploadPic} from "@/api/user";
import profilePopup from '../components/profilePopup'
export default {
  data() {
    return {
      user: {
        avatar: "",
        nickname: "",
        sex: 0,
        birthday: "",
        name:'',
        username:'',
      },
       profileShow:false,
       profileType:'nickname'
    };
  },

  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Uploader.name]:Uploader,
    profilePopup
  },

  computed: {},

  mounted() {
    this.getProfileDetail();
  },

  methods: {
    //弹出层统一处理不要写多个，浪费
    profileUpdate(type){
      this.profileType = type
      this.profileShow = true
    },
    getProfileDetail() {
      getProfile().then((resultes) => {
        if (resultes.status == "success") {
          console.log(resultes);
          this.user.avatar = resultes.data.avatar;
          this.user.nickname = resultes.data.nickname;
          this.user.birthday = resultes.data.birthday;
          this.user.name = resultes.data.name;
          this.user.username = resultes.data.username;
        }
      });
    },
    afterRead(type){
        return file=>{
          let params = new FormData()
          params.append('file[content]',file.content)
          params.append('type',type)
          uploadPic(params).then(resultes=>{
            if(resultes.status=='success'){
              this.user.avatar = resultes.data[0]
            }
          })
        }
    },
    userAddress(){
      this.$router.push({
        path:'/user/address',
        query:{
          type:'web'
        }
      })
    },
    //退出登录
    loginOut(){
      sessionStorage.removeItem('token')
      this.$store.dispatch('setToken','')
      this.$router.push({
        path:'/login'
      })
    }
  },
};
</script>
<style lang='scss' scoped>
.user_profile {
  height: auto;
  width: 100%;
  .user_header {
    height: 70px;
    width: 100%;
    padding: 13px 15px;
    box-sizing: border-box;
    position: relative;
    display: flex;

    .header_img {
      width: 45px;
      height: 45px;
      -webkit-box-sizing: content-box;
      box-sizing: content-box;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 1px solid #dddddd;
      }
    }
    .user-bg-box-1 {
      width: 38px;
      position: absolute;
      top: 10px;
      right: 0;
      img {
        width: 100%;
      }
    }
    .user-bg2-box-1 {
      width: 38px;
      position: absolute;
      left: 10px;
      bottom: 0;
      img {
        width: 100%;
      }
    }
    .profile-index-top{
        margin-left:20px;
        padding-top:10px;
        box-sizing: border-box;
        font-size:12px;
        color:#777777;
        .user_name{
            margin-right:5px;
        }
    }
  }
  .box {
    height: 10px;
    width: 100%;
    background-color: #f4f4f4;
  }
  /deep/ .van-hairline--top-bottom::after {
    border: none;
  }
  /deep/ .van-cell::after {
    border: none;
  }
  /deep/ .van-cell {
    margin-top: 5px;
  }
  .login_out {
    height: 48px;
    padding: 10px;
    /deep/ .van-button--danger {
      //   background-color: none;
      font-size: 20px;
      //   color:#ee0a24;
    }
  }
  /deep/ .van-uploader__upload{
      width:47px;
      height:47px;
      top:-45px;
      opacity: 0;
  }
}
</style>