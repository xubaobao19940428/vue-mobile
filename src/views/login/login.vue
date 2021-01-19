
<template>
  <div class="login">
    <van-form>
      <div class="login_title">
        <span>手机号登录</span>
      </div>
      <van-field v-model="phoneNumber" placeholder="手机号" />
      <van-field v-model="phoneCode" type="text" placeholder="验证码" />
      <div style="margin: 16px">
        <van-button round block type="info" @click="onSubmit">
          登 录
        </van-button>
      </div>
    </van-form>
    <div class="share_sheet">
      <van-share-sheet
        v-model="showShare"
        title="立即分享给好友"
        :options="options"
      />
    </div>
  </div>
</template>

<script>
// import { Button, Field, Form } from "vant";
import { login } from "@/api/login";
export default {
  data() {
    return {
      phoneNumber: "",
      phoneCode: "",
      showShare: false,
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
        ],
      ],
    };
  },

  computed: {},

  mounted() {},

  methods: {
    onSubmit() {
      var params = {
        client: 1001,
        code: this.phoneCode,
        mobile: this.phoneNumber,
        parent_id: localStorage.getItem("parent_id") || 0,
        phone_code: "+60",
      };
      login(params).then((resultes) => {
        if (resultes.status == "success") {
          this.$store.commit("SET_USER_INFO", {
            username: resultes.data.username, //用户名称
            nickname: resultes.data.nickname, //用户昵称
            avatar: resultes.data.avatar, //用户头像
            user_id: resultes.data.user_id, //用户Id
            identity: resultes.data.identity, //用户的身份信息
            user_rank: resultes.data.user_rank, //用户的银行信息
          });
          //token和userInfo分开处理
          this.$store.dispatch("setToken", resultes.data.token);
          this.$router.push({
            path: "/",
          });
          sessionStorage.setItem('token',resultes.data.token)
        }
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.login {
  // background-image: url("../../assets/login_banner.jpg");
  // background-repeat: no-repeat;
  // background-size: cover;
  width: 100%;
  height: 100%;
  display: flex;
  // justify-content: center;
  // align-items: center;
  .van-form {
    width: 60%;
    padding: 20px;
    .van-cell,
    .login_title {
      // background: rgba(255, 255, 255, 0.5);
    }
    .login_title {
      padding: 20px 0;
    }
    div:not(van-cell) {
      // text-align: center;
    }
  }
}
</style>