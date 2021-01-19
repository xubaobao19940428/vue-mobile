<!--  -->
<template>
  <div class="live_store">
    <div
      class="live_store_top"
      :style="{ background: 'url(' + liveImg + ')' }"
    ></div>
    <div class="live_store_user">
      <img v-bind:src="headImg" alt="" />
      <p class="shop_name">{{ shopName }}</p>
      <p class="shop_desc">{{ shopDesc }}</p>
    </div>
    <div class="live_store_detail">
      <van-tabs type="card" @click="liveAction">
        <van-tab title="店铺精选">
          <div class="live_store_product">
            <div
              class="live_product_list"
              v-for="(item, index) in productList"
              :key="index"
            >
              <div class="product_img">
                <img v-bind:src="item.goods_thumb" alt="" />
              </div>
              <div class="live_product_price">
                <div>
                  <p>{{ item.goods_name }}</p>
                  <p style="font-size: 14px; font-weight: 500; color: #edb465">
                    {{ item.shop_price
                    }}<span
                      style="
                        font-size: 12px;
                        color: #666666;
                        display: inline-block;
                        margin-left: 5px;
                        text-decoration: line-through;
                      "
                      >{{ item.market_price }}</span
                    >
                  </p>
                  <p style="font-size: 12px; color: #666666">
                    销量<span style="display: inline-block; margin-left: 5px">{{
                      item.ghost_count
                    }}</span>
                  </p>
                </div>
                <div class="action_start">
                  <a
                    href="javascript:void(0)"
                    @click="storeDetail(item)"
                    class="btn-default"
                    >立即抢购</a
                  >
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="主播动态">
          <div class="cateall">
            <div
              class="cate_item"
              v-for="(item, index) in cateList"
              :key="index"
              @click="toroom(item.id)"
            >
              <div style="width: 100%">
                <div class="cate_item_top">
                  <div class="cate_item_top_left" v-if="item.is_stopped == 0">
                    <img src="../../assets/image/live-icon.png" />
                    <span>{{
                      item.is_stopped == 1
                        ? '回放'
                        : item.start_time == 0
                        ? '直播中'
                        : '预告'
                    }}</span>
                  </div>
                  <div class="cate_item_top_left2" v-if="item.is_stopped == 1">
                    <img src="../../assets/image/video-icon.png" />
                    <span>{{
                      item.is_stopped == 1
                        ? '回放'
                        : item.start_time == 0
                        ? '直播中'
                        : '预告'
                    }}</span>
                  </div>
                  <div class="cate_item_top_right">
                    <span
                      >{{
                        item.memberNum / 10000 >= 1
                          ? (item.memberNum / 10000).toFixed(1) + '万+'
                          : item.memberNum
                      }}观看</span
                    >
                  </div>
                </div>
                <img class="cate_item_cover" v-bind:src="item.cover" />
                <div class="cate_item-bottom">
                  <div class="cate_item-bottom_title">{{ item.title }}</div>
                  <div class="cate_item-bottom_content">
                    <div class="content_left">
                      <img
                        class="cate_item_touxiang"
                        v-bind:src="item.userPortrait"
                      />
                      <div class="username">{{ item.userName }}</div>
                    </div>
                    <div class="content_right">
                      <img
                        class="aixin"
                        src="../../assets/image/praise-icon.png"
                      />
                      <span class="praise">{{
                        item.praise / 10000 >= 1
                          ? (item.praise / 10000).toFixed(1) + '万+'
                          : item.praise
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="kongbaitianchong"></div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant';
import { getStoreProduct, getStoreAction, getServeTime } from '@/api/index';
export default {
  name: 'liveStore',
  data() {
    return {
      shopId: '',
      liveImg: '',
      shopName: '',
      headImg: require('@/assets/image/default-ubo-icon.png'),
      shopDesc: '',
      cateList: [],
      time: '',
      productList: [],
    };
  },

  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },

  computed: {},

  mounted() {
    this.shopId = this.$route.query.shop_id;
    this.getStoreProductInfo()
    // this.getServeTimeDetail();
  },

  methods: {
    // getServeTimeDetail() {
    //   getServeTime().then((res) => {
    //     if (res.status == 'success') {
    //       this.time = res.data.time;
    //       this.getStoreProductInfo();
    //     }
    //   });
    // },
    getStoreProductInfo() {
      let params = {
        shop_id: this.shopId,
      };
      let _sign = this.$qs.stringify(this.sign(params, this.serveTime()));
      getStoreProduct(_sign).then((response) => {
        if (response.status == 'success') {
          (this.liveImg = response.data.shopInfo.shop_img),
            (this.shopName = response.data.shopInfo.shop_name);
          if (response.data.shopInfo.shop_headimg != '') {
            this.headImg = response.data.shopInfo.shop_headimg;
          }

          this.shopDesc = response.data.shopInfo.shop_desc;
          this.productList = response.data.goodsList;
        }

        console.log(response);
      });
    },
    liveAction(value) {
      if (value == 1) {
        let params = {
          owner_id: this.$route.query.user_id,
          lastId: 1,
        };
        let data = this.$qs.stringify(this.sign(params, this.serveTime()));
        getStoreAction(data).then((resultes) => {
          if (resultes.message == 'success') {
            this.cateList = resultes.data;
          }
        });
      }
    },
    //跳转到直播间
    toroom(roomid) {
      this.$router.push({
        path: '/live',
        query: {
          roomid: Number(roomid),
        },
      });
    },
    //立即抢购
    storeDetail(item) {
      this.$router.push({
        name: "goods",
        params: {
          id: item.goods_id,
          parent_id: localStorage.getItem("parent_id") || 0,
        },
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.live_store {
  height: 100%;
  width: 100%;
  .live_store_top {
    height: 15rem;
    background-size: '100%' !important;
    background-position: center !important;
  }
  .live_store_user {
    height: 4rem;
    background: #fff;
    position: relative;
    padding: 0 2rem;
    img {
      width: 6rem;
      height: 6rem;
      position: absolute;
      top: -2rem;
      border-radius: 4px;
    }
    p {
      margin-left: 7rem;
    }
    .shop_name {
      font-size: 1.4rem;
      font-weight: 700;
    }
    .shop_desc {
      font-size: 1.2rem;
      color: #666666;
    }
  }
  .live_store_detail {
    margin-top: 1rem;
    height: auto;
    background: #fff;
  }
  /deep/ .van-tabs__nav--card {
    margin: 0;
    border-top: 0;
    border-left: 0;
    border-bottom: 0;
    border-right: 0;
    height: 100%;
    padding: 1rem;
  }
  /deep/ .van-tab {
    line-height: 3rem;
    color: #666;
    &:first-child {
      border-right: 1px solid #cccccc;
    }
    // border-right:1px solid #cccccc;
  }
  /deep/ .van-tabs__wrap {
    border-bottom: 1px solid #cccccc;
    height: 5rem;
  }
  /deep/ .van-tab--active {
    background-color: white;
    color: #edb465;
  }
  /deep/ .van-tab--active span:after {
    height: 0px;
  }
  .van-tabs--card {
    padding-top: 50px;
  }
  .live_store_product {
    padding: 1rem;
    .live_product_list {
      padding: 1rem 0;
      border-bottom: 1px solid #cccccc;
      .product_img {
        margin: 0 auto;
        display: flex;
        justify-content: center;
        img {
          height: 10rem;
          width: 10rem;
        }
      }
      .live_product_price {
        display: flex;
        justify-content: space-between;
        .action_start {
          display: flex;
          flex-direction: column-reverse;
        }
      }
      .btn-default {
        display: inline-block;
        width: 10rem;
        height: 2rem;
        border: 1px solid #edb465;
        background: #ffffff;
        line-height: 2rem;
        border-radius: 1rem;
        color: #edb465;
        text-align: center;
      }
    }
  }
}
</style>