<!--  -->
<template>
  <div class="chart_detail">
    <div class="chart_advice">
      平台依法对直播内容进行24小时巡查，倡导绿色直播，维护网络文明健康。切勿与他人私下交易，非官方活动谨慎参与，避免上当受骗。
    </div>
    <div class="chart_message_list">
      <div class="chart_message" v-for="(item, index) in 8" :key="index">
        <span class="chart_username">nickssss</span>
        <span class="chart_msg">{{ item * 10000 }}</span>
      </div>
    </div>
    <div class="chart_message_bottom">
      <div class="goods_and_message">
        <div class="goods_room">
          <img
            class="goods_bag_img"
            src="../../../../assets/image/goods-bag.png"
          />
          <span class="goods_count">11</span>
          <span>宝贝库</span>
        </div>
        <div class="message_send">
          <van-field
            size="mini"
            v-model="sms"
            center
            clearable
            placeholder="请输入聊天内容"
          >
            <template #button>
              <van-button size="mini" type="primary">发送</van-button>
            </template>
          </van-field>
        </div>
      </div>
      <!--分享和点赞-->
      <div class="share_and_zan">
        <div class="share">
          <p><i class="iconfont iconfenxiang1"></i></p>
          <span> 分享 </span>
        </div>
        <div class="zan">
          <p><i class="iconfont iconxin1" @click="addZan"></i></p>
          <span> 点赞 </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Field, Button } from "vant";
export default {
  name: "Chart",
  data() {
    return {
      sms: "",
      count: 0,
      timerSecond: 0,
      oldCount: 0,
      parCount: 0,
    };
  },

  components: {
    [Field.name]: Field,
    [Button.name]: Button,
  },
  watch: {
    count: {
      handler(newVal, oldVal) {
        if (this.oldCount === 1 || newVal == 0) {
          return false;
        } else {
          this.oldCount = 1;
          var _that = this;
          let timer = setInterval(() => {
            _that.setCount();
            clearInterval(timer);
          }, 2000);
        }
      },
      deep: true,
    },
  },

  computed: {},

  mounted() {},

  methods: {
    setCount() {
      setTimeout(() => {
        this.count = 0;
        this.oldCount = 0;
        this.parCount = 0;
      }, 300);
    },
    addZan() {
      this.count = this.count + 1;
      this.parCount = this.parCount + 1;
      if(this.parCount>=7){
          this.parCount = 7
      }else{
          this.parCount = this.parCount
      }
      this.$emit("zan-start", true);
    },
  },
};
</script>
<style lang='scss' scoped>
.chart_detail {
  width: 100%;
  position: absolute;
  bottom: 40px;
  height: 176px;
  // background-color:white;
  .chart_advice {
    padding: 1px 3px;
    background: rgba(69, 69, 69, 0.5);
    border-radius: 2px;
    max-width: 60%;
    margin-left: 8px;
    font-size: 12px;
    color: #fff;
    line-height: 15px;
  }
  .chart_message_list {
    padding: 0 3px;
    height: 60px;
    overflow: scroll;
    margin-left: 8px;
    &::-webkit-scrollbar {
      background-color: transparent;
      width: 0;
    }
    .chart_message {
      font-size: 12px;
      margin-top: 5px;
      .chart_username {
        color: #ffb5b5;
        margin-right: 20px;
      }
      .chart_msg {
        color: #fff;
      }
    }
  }
  .chart_message_bottom {
    height: 50px;
    width: 100%;
    // background:#fff;
    display: flex;
    padding: 1px 3px;
    box-sizing: border-box;
    justify-content: space-between;
    .goods_and_message {
      display: flex;
      width: 250px;
      .goods_room {
        display: flex;
        flex-direction: column;
        font-size: 12px;
        position: relative;
        width: 45px;
        color: #fff;
        img {
          width: 35px;
          height: 35px;
        }
        .goods_count {
          position: absolute;
          left: 12px;
          top: 15px;
          z-index: 100;
        }
      }
      .message_send {
        flex: 1;
        /deep/ .van-cell {
          background-color:transparent;
          /deep/ .van-field__control {
            border-bottom: 1px solid #fff;
            color: #fff;
          }
        }
      }
    }
    //分享和点赞
    .share_and_zan {
      height: 100%;
      flex: 1;
      padding-right: 20px;
      display: flex;
      justify-content: space-around;
      color: #fff;
      div:first-child {
        margin-right: 10px;
      }
      div {
        text-align: center;
        p {
          font-size: 25px;
        }
        span {
          font-size: 12px;
        }
      }
    }
  }
}
</style>