<!-- 视频播放页面 -->
<template>
  <div class="live_save">
    <canvas
      id="thumsCanvas"
      width="200"
      height="400"
      style="width: 100px; height: 200px"
    ></canvas>
    <div class="live_save_top">
      <div class="live_top_left">
        <i class="iconfont iconfanhui" @click="returnLiveList"></i>
        <img v-bind:src="liveRoomInfo.liveImgSrc" alt="" @click="userDetail" />
        <div class="live_status">
          <div class="live_username">{{ liveRoomInfo.userName }}</div>
          <div class="live_active">
            {{ liveRoomInfo.memberNum | filterNumber }}人观看 |
            {{ liveRoomInfo.position }}
          </div>
        </div>
        <div class="active_follow" v-show="!liveRoomInfo.isFollow">关注</div>
      </div>
      <div class="go_livelist">
        <div class="room_top">有播</div>
        <div class="room_bottom">ID:{{ roomId }}</div>
      </div>
    </div>
    <!--直播或者回放-->
    <div class="live" ref="changeclick">
      <div
        id="id_test_video"
        ref="idTestVideo"
        style="width: 100%; height: auto"
        v-show="liveStatus == 0"
      ></div>
      <div
        id="video-container"
        ref="videocontainer"
        style="width: 100%; height: auto"
        v-show="liveStatus == 1"
      ></div>
    </div>
    <Chart @zan-start="zanStart"></Chart>
    <live-detail
      :show="liveDetailShow"
      @on-close-pupop="closePupop"
      :imgSrc="imgSrc"
      :username="userLiveName"
      :fansCount="fansCount"
      :followCount="followCount"
      :isFollow="isFollow"
      :userId="userId"
      @store-detail="storeDetail"
    ></live-detail>
  </div>
</template>

<script>
import { GetRoomInfo, getLiveInfo } from "@/api/live/livelist";
import Chart from "./components/chart";
import liveDetail from "@/views/liveComponent/liveDetail";
import ThumbsUpAni from "@/common/js/canvas";
import TIM from "tim-js-sdk";
let thumbsUpAni;
export default {
  name: "liveRoom",
  data() {
    return {
      userId: "",
      isFollow: false,
      shopId: "",
      imgSrc: "",
      userLiveName: "",
      fansCount: 0,
      followCount: 0,
      liveDetailShow: false, //头像弹窗
      roomId: "",
      liveRoomInfo: {
        liveImgSrc: "",
        userName: "",
        memberNum: "",
        position: "",
        ownerId: "",
        isFollow: true,
      },
      liveStatus: 0, //回放或者是直播
      groupId: "", //群组
      isHasPlay: false,
      options: {
        videoFullscreen: "auto",
        fullscreen: true,
        fullscreenToggle: true,
        autoplay: true, //iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
        width: "100%", //视频的显示宽度，请尽量使用视频分辨率宽度
        height: "100%", //视频的显示高度，请尽量使用视频分辨率高度
        controls: true, //default 显示默认控件，none 不显示控件，system 移动端显示系统控件。
        x5_type: "h5",
        x5_orientation: 2,
        bigPlayButton: true,
        x5_fullscreen: true,
        wording: {
          2032: "请求视频失败，请检查网络",
          2048: "请求m3u8文件失败，可能是网络错误或者跨域问题",
        },
        listener: (msg) => {
          console.log(msg);
          if (msg.type == "loading") {
            this.isHasPlay = false;
          } else if (msg.type == "play" || msg.type == "error") {
            this.isHasPlay = true;
          }
        },
      },
    };
  },

  components: {
    Chart,
    liveDetail,
  },

  computed: {},

  mounted() {
    thumbsUpAni = new ThumbsUpAni();
    this.roomId = this.$route.query.roomId;
    this.getRoomLiveInfo(this.roomId);
  },

  methods: {
    returnLiveList() {
      this.$router.push({
        path: "/",
      });
    },
    zanStart() {
      thumbsUpAni.start();
    },
    //头像弹窗
    userDetail() {
      let data = {
        anchor_id: this.liveRoomInfo.ownerId,
      };
      let params = this.$qs.stringify(this.sign(data, this.serveTime()));
      getLiveInfo(params).then((response) => {
        if (response.message == "success") {
          this.userLiveName = response.data.nick_name;
          this.imgSrc = response.data.headimg;
          this.fansCount = response.data.fans_count;
          this.followCount = response.data.follow_count;
          this.isFollow = response.data.is_follow;
          this.shopId = response.data.shop_id;
          this.userId = response.data.user_id;
          this.liveDetailShow = true;
        } else {
          Toast(response.message);
        }
      });
    },
    closePupop() {
      this.liveDetailShow = false;
    },
    //进店逛逛
    storeDetail() {
      this.$router.push({
        path: "/liveStore",
        query: {
          shop_id: this.shopId,
          user_id: this.userId,
        },
      });
      this.liveDetailShow = false;
    },
    getRoomLiveInfo(id) {
      console.log("获取直播间房间数据");
      let params = {
        streamId: id,
      };
      let data = this.$qs.stringify(this.sign(params, this.serveTime()));

      GetRoomInfo(data).then((res) => {
        if (res.data) {
          this.liveRoomInfo.liveImgSrc = res.data.owner.headimg;
          this.liveRoomInfo.userName = res.data.owner.user_name;
          this.liveRoomInfo.memberNum = res.data.member_num;
          this.liveRoomInfo.position = res.data.position;
          this.liveRoomInfo.isFollow = res.data.is_follow;
          this.liveRoomInfo.ownerId = res.data.owner.owner_id;
          this.groupId = res.data.group_id;
          if (res.data.is_stopped == 1) {
            let flv;
            let m3u8_url = res.data.url;
            m3u8_url = m3u8_url.replace("http://", "https://");
            flv = res.data.url.replace("m3u8", "flv");
            this.options.flv = flv;
            this.options.m3u8 = m3u8_url;
            this.liveStatus = 0; //回放
          } else {
            this.liveStatus = 1; //直播
          }
          if (this.liveStatus == 1) {
            let src = res.data.url.replace("rtmp", "http");
            let m3u8 = `${src}.m3u8`;
            let flv = `${src}.flv`;
            this.options.m3u8 = m3u8;
            this.options.flv = flv;
          }
          this.logintohere();
          this.initListener();
        }
      });
    },
    // 初始化直播
    initVideo(ele) {
      //安卓和ios分开处理
      try {
        this.player = new TcPlayer(ele, this.options);
        this.loading = false;
        let _this = this;
        if (this.isiOS) {
          this.$nextTick(function () {
            let videoDom = document.querySelector("video");
            let video = _this.$refs.videoPlayer;
            if (
              typeof WeixinJSBridge == "object" &&
              typeof WeixinJSBridge.invoke == "function"
            ) {
              WeixinJSBridge.invoke("getNetworkType", {}, function (res) {
                //video.player.play();//这里使用的是基于video.js的vue-player插件
                videoDom.play();
              });
            } else {
              videoDom.play();
            }
          });
        } else if (this.isAndroid) {
          this.$nextTick(function () {
            setTimeout(() => {
              let videoDom = document.querySelector("video");
              videoDom.play();
            }, 1000);
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    //tim登录
    logintohere() {
      let user_id = localStorage.getItem("user_id");
      let user_sig = localStorage.getItem("user_sig");
      console.log(user_id, user_sig);
      if (user_id && user_sig) {
        this.tweblivelogin(user_id, user_sig);
      }
    },
    tweblivelogin(user_id, user_sig) {
      // 2. 调用 TIM SDK 登录接口
      return this.tweblive.login({
        userID: user_id,
        userSig: user_sig,
      });
    },
    // 初始化直播间
    initListener() {
      console.log("初始化直播间" + this.liveStatus);
      if (this.liveStatus == 0) {
        this.options.controls = "default";
        this.initVideo("id_test_video");
      } else if (this.liveStatus == 1) {
        const tweblive = new TWebLive({
          SDKAppID: 1400393716, //海外：1400394245 正式：1400102804 测试：1400393716
          domID: "video-container",
          ...this.options,
        });

        this.tweblive = tweblive;
        this.enterRoom();
        // SDK 进入 ready 状态时触发，接入侧监听此事件，然后可调用 SDK 发送消息等api，使用 SDK 的各项功能
        this.tweblive.on(TWebLive.EVENT.IM_READY, this.onIMReady);
        // 收到直播间其他人发的文本消息
        this.tweblive.on(
          TWebLive.EVENT.TEXT_MESSAGE_RECEIVED,
          this.onTextMessageReceived
        );
        // 收到直播间其他人发的送礼、点赞等自定义消息
        this.tweblive.on(
          TWebLive.EVENT.CUSTOM_MESSAGE_RECEIVED,
          this.onCustomMessageReceived
        );
        //收到其他人加入直播间的通知
        this.tweblive.on(
          TWebLive.EVENT.REMOTE_USER_JOIN,
          this.onRemoteUserJoin
        );
        this.loading = false;
        // 加入直播间，未登录时匿名加入直播间，只能收消息，不能发消息
        let _this = this;
        if (this.isiOS) {
          this.$nextTick(function () {
            let videoDom = document.querySelector("video");
            let video = _this.$refs.videoPlayer;
            if (
              typeof WeixinJSBridge == "object" &&
              typeof WeixinJSBridge.invoke == "function"
            ) {
              WeixinJSBridge.invoke("getNetworkType", {}, function (res) {
                //video.player.play();//这里使用的是基于video.js的vue-player插件
                videoDom.play();
              });
            } else {
              videoDom.play();
            }
          });
        } else if (this.isAndroid) {
          this.$nextTick(function () {
            setTimeout(() => {
              let videoDom = document.querySelector("video");
              videoDom.play();
            }, 1000);
          });
        }
      }
    },
    //关注主播
    followActive() {},
  },
};
</script>
<style lang='scss' scoped>
.live_save {
  height: 100%;
  width: 100%;
  background-color: #000;
  #thumsCanvas {
    position: absolute;
    right: 10px;
    bottom: 60px;
  }
  .live_save_top {
    height: 37px;
    width: 100%;
    display: flex;
    color: #ffffff;
    justify-content: space-between;
    padding: 0 5px;
    position: absolute;
    top: 10px;
    box-sizing: border-box;
    z-index: 100;
    //头部左边部分
    .live_top_left {
      display: flex;
      width: 250px;
      background: rgba(240, 240, 240, 0.3);
      border-radius: 20px;
      i {
        font-size: 20px;
        color: #fff;
        line-height: 37px;
      }
      img {
        display: inline-block;
        width: 33.6px;
        height: 33.6px;
        vertical-align: top;
        margin: 2px 0;
        border-radius: 16.8px;
        margin-left: 2px;
      }
      .live_status {
        width: 110px;

        .live_username {
          font-size: 12px;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .live_active {
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .active_follow {
      display: inline-block;
      height: 37px;
      width: 37px;
      background-color: rgb(233, 177, 98);
      font-size: 12px;
      // vertical-align: center;
      text-align: center;
      line-height: 37px;
      margin-left: 4px;
      border-radius: 50%;
    }
    //右边回到livelist页面
    .go_livelist {
      display: flex;
      font-size: 12px;
      width: 70px;
      background: rgba(0, 0, 0, 0.6);
      flex-direction: column;
      // background: red;
      border-radius: 7px 7px 0 0;
      text-align: center;
      .room_top {
        line-height: 20px;
        width: 100%;
        height: 20px;
        // background:blue;
        border-radius: 7px 7px 0 0;
      }
      .room_bottom {
        background-color: rgba(0, 0, 0, 0.3);
        flex: 1;
      }
    }
  }
  /deep/ .vcp-error-tips {
    font-size: 14px;
    top: 80%;
  }
  /deep/ .vcp-panel-bg {
    position: fixed;
    bottom: 0;
    background-color: transparent;
  }
  /deep/ .vcp-controls-panel {
    font-size: 10px;
  }
  /deep/ .vcp-controls-panel.hide {
    display: block !important;
  }
  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>