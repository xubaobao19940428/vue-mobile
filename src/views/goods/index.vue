<!--  -->
<template>
  <div class="goods_detail">
    <header :class="{ 'header-nav-fixed': scrollState }">
      <van-nav-bar left-arrow>
        <div class="van-nav-bar__left">111</div>
        <div class="nav_title" slot="title">
          <ul>
            <li
              v-for="(item, index) in list"
              :key="index"
              :class="[activeIndex == index ? 'active' : '']"
              @click="headerNav(index)"
            >
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
        <div class="van-nav-bar__right" slot="right">
          <i class="iconfont">&#xe660;</i>
        </div>
      </van-nav-bar>
    </header>
    <div class="dashboard_banner">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="dashboard_banner">
      <div class="goods_content">111</div>
    </div>
    <div class="dashboard_banner">
      <div class="goods_content">222</div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button
        color="#be99ff"
        type="warning"
        text="加入购物车"
      />
      <van-goods-action-button color="#7232dd" type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
import { getGoodsDetail } from "@/api/goods";
import { NavBar, GoodsAction, GoodsActionIcon, GoodsActionButton } from "vant";
export default {
  name: "goodsDetail",
  data() {
    return {
      goodsId: "",
      list: ["商品", "详情", "评论"],
      activeIndex: 0,
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg",
      ],
      scrollState: false,
      goods_id: this.$route.params.id,
    };
  },

  components: {
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
  },

  computed: {},

  mounted() {
    this.goodsId = this.$route.params.id;
    this.$nextTick(() => {
      window.addEventListener("scroll", this.onScroll);
    });
    this.getGoods();
  },

  methods: {
    headerNav(index) {
      this.activeIndex = index;
      let dashboardBanner = document.getElementsByClassName("dashboard_banner");
      let total = dashboardBanner[index].offsetTop;
      console.log(total)
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // 平滑滚动，时长500ms，每10ms一跳，共50跳
      let step = total / 50;
      if (total > scrollTop) {
        smoothDown();
      } else {
        let newTotal = scrollTop - total;
        step = newTotal / 50;
        smoothUp();
      }
      function smoothDown() {
      if (scrollTop < total) {
        scrollTop += step;
        document.body.scrollTop = scrollTop;
        document.documentElement.scrollTop = scrollTop;
        setTimeout(smoothDown, 10);
      } else {
        document.body.scrollTop = total;
        document.documentElement.scrollTop = total;
      }
    }

    function smoothUp() {
      if (scrollTop > total) {
        scrollTop -= step;
        document.body.scrollTop = scrollTop;
        document.documentElement.scrollTop = scrollTop;
        setTimeout(smoothUp, 10);
      } else {
        document.body.scrollTop = total;
        document.documentElement.scrollTop = total;
      }
    }
    },
    
    onScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop >= 10) {
        this.scrollState = true;
      } else {
        this.scrollState = false;
      }
    },
    getGoods() {
      let data = {
        goods_id: this.goods_id,
        warehouse_id: 0,
        area_id: 0,
        is_delete: 0,
        is_on_sale: 1,
        is_alone_sale: 1,
        parent_id: sessionStorage.getItem("parentId") || 0,
      };
      let params = new FormData();
      params.append("goods_id", this.goods_id);
      params.append("warehouse_id", 0);
      params.append("area_id", 0);
      params.append("is_delete", 0);
      params.append("is_on_sale", 1);
      params.append("is_alone_sale", 1);
      params.append("parent_id", sessionStorage.getItem("parentId") || 0);
      // let params=this.$qs.stringify(data)
      // let params=this.$qs.stringify(this.sign(params,this.serveTime()))
      getGoodsDetail(params).then((resultes) => {
        if (resultes.status == "success") {
          console.log(resultes);
        }
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.goods_detail {
  height: auto;
  width: 100%;
  overflow: scroll;
  // overflow-y: scroll;
  header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 40px;
    z-index: 1;
    /deep/ .van-nav-bar {
      height: 40px;
      background: none;
      /deep/ .van-icon {
        color: #777;
      }
    }
    /deep/ .nav_title {
      height: 100%;
      opacity: 0;
      transition: all 0.5s ease-in;
      ul {
        width: 200px;
        display: flex;
        justify-content: space-around;
        height: 100%;
        li {
          font-size: 1.5px;
          color: #555;
          line-height: 40px;
          flex: 1;
        }
        .active {
          color: #f92028;
          position: relative;
          &::after {
            content: " ";
            position: absolute;
            width: 100%;
            border: 1px solid #f92028;
            bottom: 3px;
            left: 0;
          }
        }
      }
    }
  }
  .dashboard_banner {
    padding-top:40px;
    box-sizing: border-box;
    height: auto;
    width: 100%;
    .van-swipe {
      height: 300px;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .goods_content {
      height: 400px;
    }
  }
  .header-nav-fixed {
    /deep/ .nav_title {
      opacity: 1;
      transition: all 0.5s ease-in;
    }
    /deep/ .van-nav-bar {
      background: #fff;
    }
  }
}
</style>