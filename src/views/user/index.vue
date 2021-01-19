<!--  -->
<template>
  <div class="user_self">
    <header class="user_header">
      <div class="header_img">
        <img v-bind:src="user.avatar" alt="" />
      </div>
      <div class="header_user">
        <div class="header_user_top">
          <span>{{ user.nickName }}</span>
          <span>
            <i class="iconfont iconshouye1"></i>
            <i class="iconfont iconbuoumaotubiao06" @click="goUserDetail"></i>
          </span>
        </div>
        <p class="user_rank">{{ user.userRank }}</p>
      </div>
    </header>
    <div class="self_money">
      <div class="slef_url">
        <van-cell
          title="我的钱包"
          is-link
          value="资金管理"
          @click="selfMoneyDetail"
        />
      </div>
      <div class="self_detail">
        <ul>
          <li>
            <span>{{ user.userMoney }}</span>
            <p>余额</p>
          </li>
          <li>
            <span>{{ user.tbNum }}</span>
            <p>我的YO币</p>
          </li>
          <li>
            <span>{{ user.payPoints }}</span>
            <p>积分</p>
          </li>
          <li>
            <span>{{ user.couponsNum }}</span>
            <p>优惠券</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="box"></div>
    <div class="self_money">
      <div class="slef_url">
        <van-cell title="我的订单" is-link value="全部订单" @click="allOrder" />
      </div>
      <div class="self_detail">
        <ul>
          <li>
            <span>
              <img src="../../assets/img/newuser/order_icon_1.png" alt="" />
            </span>
            <p>待付款</p>
            <div class="user_list_num" v-if="user.payCount > 0">
              {{ user.payCount - 99 > 0 ? "99+" : user.payCount }}
            </div>
          </li>
          <li>
            <span
              ><img src="../../assets/img/newuser/order_icon_3.png" alt=""
            /></span>
            <p>待收货</p>
            <div class="user_list_num" v-if="user.confirmedCount > 0">
              {{ user.confirmedCount - 99 > 0 ? "99+" : user.confirmedCount }}
            </div>
          </li>
          <li>
            <span
              ><img src="../../assets/img/newuser/order_icon_4.png" alt=""
            /></span>
            <p>待评价</p>
            <div class="user_list_num" v-if="user.notComment > 0">
              {{ user.notComment - 99 > 0 ? "99+" : user.notComment }}
            </div>
          </li>
          <li>
            <span
              ><img src="../../assets/img/newuser/order_icon_5.png" alt=""
            /></span>
            <p>退换货</p>
            <div class="user_list_num" v-if="user.returnCount > 0">
              {{ user.returnCount - 99 > 0 ? "99+" : user.returnCount }}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="box"></div>
    <!-- <div class="code" @click="updateCodeVal">
      <span class="code_children">
        {{ codeVal1 }}
      </span>
      <span class="code_children">
        {{ codeVal2 }}
      </span>
      <span class="code_children">
        {{ codeVal3 }}
      </span>
      <span class="code_children">
        {{ codeVal4 }}
      </span>
    </div> -->
  </div>
</template>

<script>
import { Cell, CellGroup } from "vant";
import { getProfile } from "@/api/user";
export default {
  data() {
    return {
      user: {
        payCount: 0,
        confirmedCount: 0,
        notComment: 0,
        returnCount: 0,
        avatar: "",
        userMoney: 0,
        userRank: 0,
        tbNum: 0,
        payPoints: 0,
        couponsNum: 0,
        nickName: "",
      },
      codeVal1: "1",
      codeVal2: "2",
      codeVal3: "3",
      codeVal4: "4",
    };
  },

  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },

  computed: {},

  mounted() {
    this.getProfileDetail();
    // this.updateCodeVal()
  },

  methods: {
    goUserDetail(){
      this.$router.push({
        path:'/user/profile'
      })
    },
    updateCodeVal() {
      this.codeVal1 = Math.floor(Math.random() * 10);
      this.codeVal2 = Math.floor(Math.random() * 10);
      this.codeVal3 = Math.floor(Math.random() * 10);
      this.codeVal4 = Math.floor(Math.random() * 10);
      let code = document.getElementsByClassName("code")[0];
      let codeChild = code.children;
      for (let i = 0; i < codeChild.length; i++) {
        codeChild[i].style.transform = `rotate(${Math.random() * 90}deg)`;
      }
      // code.style.backgroundColor = `linear-gradient(rgba(
      //   ${Math.random() * 255},${Math.random() * 255},${Math.random() * 255}) 0%, rgba(${
      //   Math.random() * 255
      // },${Math.random() * 255},${Math.random() * 255}) 25%, rgba(${
      //   Math.random() * 255
      // },${Math.random() * 255},${Math.random() * 255}) 50%, rgba(${
      //   Math.random() * 255
      // },${Math.random() * 255},${Math.random() * 255}) 75%, rgba(${
      //   Math.random() * 255
      // },${Math.random() * 255},${Math.random() * 255}) 100%)`;

     code.style.backgroundColor = `rgba(${Math.random() * 255},${
        Math.random() * 255
      },${Math.random() * 255})`;
    },
    selfMoneyDetail() {
      console.log(111);
    },
    allOrder() {
      console.log(2222);
    },
    getProfileDetail() {
      getProfile().then((resultes) => {
        if (resultes.status == "success") {
          console.log(resultes);
          this.user.userMoney = resultes.data.user_money;
          this.user.userRank = resultes.data.user_rank;
          this.user.confirmedCount = resultes.data.confirmed_count;
          this.user.payCount = resultes.data.pay_count;
          this.user.avatar = resultes.data.avatar;
          (this.user.payPoints = resultes.data.pay_points),
            (this.user.couponsNum = resultes.data.coupons_num);
          this.user.returnCount = resultes.data.return_count;
          this.user.notComment = resultes.data.not_comment;
          this.user.nickName = resultes.data.nickname;
        }
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.user_self {
  height: 100%;
  width: 100%;
  .user_header {
    width: 100%;
    height: 110px;
    background-image: url("../../assets/image/bg-2.jpg");
    background-repeat: no-repeat;
    background-size: 100%;
    padding: 17px;
    box-sizing: border-box;
    display: flex;
    .header_img {
      width: 70px;
      height: 70px;
      border: 2.5px solid rgba(255, 255, 255, 0.29);
      border-radius: 50%;
      -webkit-box-sizing: content-box;
      box-sizing: content-box;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .header_user {
      margin-left: 12px;
      flex: 1;
      padding-top: 12px;
      box-sizing: border-box;
      color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .header_user_top {
        display: flex;
        justify-content: space-between;
        i {
          font-size: 18px;
          &:first-child {
            margin-right: 10px;
          }
        }
      }
      .user_rank {
        padding: 0 12px;
        background: rgba(0, 0, 0, 0.1);
        font-size: 12px;
        display: inline-block;
        border-radius: 10px;
        line-height: 18px;
        margin-top: 8px;
        width: 20px;
        text-align: center;
      }
    }
  }
  .self_money {
    height: auto;
    width: 100%;
    .slef_url {
      border-bottom: 1px solid #dddddd;
      .van-cell__title {
        font-size: 15px;
        font-weight: 500;
        color: #000;
      }
      .van-cell__right-icon {
        position: relative;
        left: 10px;
      }
    }
    .self_detail {
      height: 50px;
      width: 100%;
      padding: 18px 0;
      ul {
        width: 100%;
        li {
          width: 25%;
          float: left;
          text-align: center;
          position: relative;
          p {
            font-size: 12px;
            color: #333;
            margin-top: 10px;
          }
          span {
            font-size: 18px;
            color: #ac8054;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: inline-block;
            img {
              width: 30px;
              height: 30px;
            }
          }
          .user_list_num {
            background: #f92028;
            border-radius: 9px;
            left: 50%;
            top: -5px;
            color: #fff;
            font-size: 10px;
            min-width: 15px;
            margin-left: 2px;
            height: 15px;
            line-height: 15px;
            position: absolute;
            padding: 0 2px;
          }
        }
      }
    }
  }
  .box {
    height: 15px;
    width: 100%;
    background-color: #f4f4f4;
  }
  @function makelongrightshadow($color) {
    $val: 0px 0px $color;
    @for $i from 1 through 10 {
      $color: fade-out(desaturate($color, 1%), 0.02);
      $val: #{$val}, #{$i}px #{$i}px #{$color};
    }
    @return $val;
  }
  // @function returnMathRando($number){
  //   $val: random()*$number;
  //   @return $val;
  // }
  .code {
    text-align: center;
    height: 50px;
    width: 100px;
    font-size: 20px;
    line-height: 50px;
    text-shadow: makelongrightshadow(hsla(14, 100%, 30%, 1));
    color: hsl(14, 100%, 50%);
    .code_children {
      display: inline-block;
      margin: 0 5px;
    }
  }
}
</style>