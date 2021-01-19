<!--  -->
<template>
  <div class="home_page" v-scroll-load-more="scrollEvent">
    <div class="product_list">
      <search-info></search-info>
      <div class="home_page_banner">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="home_page_today">
        <i class="iconfont">&#xe613;</i> {{$t('lang.homePage.todayChoose')}}
      </div>
      <div class="list_product">
        <div class="product" v-for="(item, index) in productList" :key="index" @click="goodsDetail(item)">
          <div class="product_img">
            <img v-bind:src="item.goods_thumb" alt="" />
          </div>
          <div class="product_detail">
            <div>
              <div class="product_title">{{ item.goods_name }}</div>
              <div class="product_buy">{{ item.ghost_count+$t('lang.homePage.peopleBought')}}</div>
            </div>
            <div>
              <div class="product_price">RM{{ item.shop_price }}</div>
              <div class="to_detail">{{$t('lang.homePage.sharePurchase')}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchInfo from "@/components/searchInfo/searchInfo";
import { Swipe, SwipeItem } from "vant";
import { categoryGoodsList } from "@/api/goods";
export default {
  name: "home",
  components: {
    searchInfo,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  data() {
    return {
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg",
      ],
      page: 1,
      productList: [],
    };
  },

  computed: {},

  mounted() {
    this.getProductList();
  },

  methods: {
    //滚动条触发事件
    getProductList() {
      let params = {
        cate_id: 0,
        page: this.page,
      };
      categoryGoodsList(params).then((resultes) => {
        if (resultes.status == "success") {
          this.productList = [...this.productList, ...resultes.data.product];
          console.log(this.productList);
        }
      });
    },
    scrollEvent() {
      this.page++;
      this.getProductList();
    },
    goodsDetail(item){
      this.$router.push({
        name:'goodsDetail',
        params:{
          id:item.id
        }
      })
    }
  },
};
</script>
<style lang='scss' scoped>
.home_page {
  height: 100%;
  width: 100%;
  background: #eee;
  .product_list {
    height: 800px;
    width: 100%;
    background: #ffffff;
    overflow: auto;
    .home_page_banner {
      height: 150px;
      width: 100%;
      margin-top: 47px;
      .van-swipe {
        width: 100%;
        height: 100%;
        /deep/ img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .home_page_today {
      width: 100%;
      background-color: #eee;
      height: 50px;
      font-size: 20px;
      padding: 0 10px;
      text-align: left;
      line-height: 50px;
      box-sizing: border-box;
      i {
        font-size: 20px;
      }
    }
  }
  .list_product {
    width: 100%;
    padding: 0 8px;
    box-sizing: border-box;
    height: auto;
    .product {
      width: 100%;
      //   background: #cccccc;
      //   border-bottom: 1px solid red;
      display: flex;
      align-items: flex-start;
      padding: 0 10px;
      margin-top: 15px;
      box-sizing: border-box;
      .product_img {
        img {
          width: 130px;
          height: 130px;
        }
      }
      .product_detail {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 12.5px;
        border-bottom: 1px solid #f1f1f1;
        padding-bottom: 10px;
        .product_title {
          font-size: 15px;
        color: #333333;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        line-height:20px;
        }
        .product_buy {
          background-color: #f4dec4;
          color: #b87800;
          width: fit-content;
          padding: 0 5px;
          margin-top: 5px;
          font-size: 12px;
        }
        .product_price {
          font-size: 20px;
          color: #b87800;
          margin-top: 15px;
        }
        .to_detail {
          color: #b87800;
          border: 1px solid #b87800;
          font-size: 13px;
          padding: 0 10px;
          height: 26px;
          border-radius: 3px;
          text-align: center;
          line-height: 26px;
        }
      }
    }
  }
}
</style>