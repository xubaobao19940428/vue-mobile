<!--  -->
<template>
  <div>
    <van-popup v-model="show" :close-on-click-overlay="false" :overlay="false">
      <img
        src="https://img.ubo.vip/mp/modal-bg.png"
        alt=""
        style="
          height: 100%;
          width: 100%;
          left: 0;
          position: absolute;
          top: 0;
          border-radius: 1rem;
        "
      />
      <div class="live_popup">
        <div class="img_title">
          <img v-bind:src="imgSrc" alt="" />
        </div>
        <div class="live_username">
          <span>{{ username }}</span>
        </div>
        <div class="live_fans">
          <span class="live_active">关注 {{ followCount }}</span>
          <span>粉丝 {{ fansCount }}</span>
        </div>
        <div class="is_follow">
           <!-- <a
            href="javascript:void(0)"
            class="btn-default-message"
            @click="followUserMessage"
            >私信</a
          > -->
          <a
            href="javascript:void(0)"
            class="btn-default-follow"
            @click="followUser"
            v-if="!isFollow"
            >关注</a
          >
        </div>
        <div class="go_store">
          <a href="javascript:void(0)" @click="storeDetail">进店逛逛 ></a>
        </div>
      </div>
      <div class="close_popup">
        <van-icon name="close" style="font-size: 20px" @click="closePopup" />
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Popup } from 'vant';
import { Icon } from 'vant';
export default {
  name: 'liveDetail',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    imgSrc: {
      type: String,
      default: '',
    },
    username: {
      type: String,
      default: '',
    },
    fansCount: {
      type: Number,
      default: 0,
    },
    followCount: {
      type: Number,
      default: 0,
    },
    isFollow: {
      type: Boolean,
      default: false,
    },
    userId:{
      type:String,
      default:''
    }
  },
  data() {
    return {};
  },

  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon,
  },

  computed: {},

  mounted() {},

  methods: {
    closePopup() {
      this.$emit('on-close-pupop');
    },
    storeDetail() {
      this.$emit('store-detail');
    },
    followUser() {
      this.$parent.follow();
    },
    followUserMessage(){
      this.$router.push({
       path: '/message',
        query: {
          userId: this.userId,
          nickName: this.username,
          avatar:this.imgSrc
        },
      })
    }
  },
};
</script>
<style lang='scss' scoped>
/deep/ .van-popup {
  border-radius: 10px;
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
  // background-image: url('https://img.ubo.vip/mp/modal-bg.png');
  .close_popup {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
.live_popup {
  height: 180px;
  width: 180px;
  position: relative;
  .img_title {
    display: flex;
    justify-content: center;
    img {
      width: 50px;
      height: 50px;
      margin: 0.2px 0;
      border-radius: 16.8px;
      box-shadow: 2px 2px 3px 2px #f4f4f4;
    }
  }
  .live_username {
    font-size: 16px;
    font-weight: 900;
    margin-top: 10px;
  }
  .live_fans {
    display: flex;
    font-size: 12px;
    justify-content: center;
    margin-top: 10px;
    .live_active {
      display: inline-block;
      margin-right: 10px;
    }
  }
  .is_follow {
    margin-top: 10px;
    height: 20px;
    display: flex;
    justify-content: space-evenly;
    .btn-default-follow {
      display: inline-block;
      width: 50px;
      height: 20px;
      background: #222222;
      line-height: 20px;
      border-radius: 10px;
      color: #edb465;
      font-size:12px;
    }
    .btn-default-message{
      display: inline-block;
      width: 50px;
      height: 20px;
      background: #fff;
      line-height: 20px;
      border-radius: 10px;
      border:1px solid #ccc;
      color: #edb465;
      font-size:12px;
    }
  }
  .go_store {
    margin-top: 10px;
    font-size:12px;
    a {
      color: #edb465;
    }
  }
}
</style>