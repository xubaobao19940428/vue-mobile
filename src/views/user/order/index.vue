<!--  -->
<template>
  <div class="user_order">
    <div v-show="isLoad" v-scroll-load-more="loadingMore">
      <div class="user_order_header">
        <ul>
          <li :class="[active == 0 ? 'active' : '']" @click="clickActive(0)">
            {{ "全部订单(" + all + ")" }}
          </li>
          <li :class="[active == 1 ? 'active' : '']" @click="clickActive(1)">
            {{ "待付款(" + nopay + ")" }}
          </li>
          <li :class="[active == 2 ? 'active' : '']" @click="clickActive(2)">
            {{ "待收货(" + nogoods + ")" }}
          </li>
          <li :class="[active == 3 ? 'active' : '']" @click="clickActive(3)">
            {{ "已完成(" + isfinished + ")" }}
          </li>
          <li :class="[active == 4 ? 'active' : '']" @click="clickActive(4)">
            {{ "回收站(" + isdelete + ")" }}
          </li>
        </ul>
      </div>
      <div class="product_list">
        <div class="user_order_detail">
          <div
            v-for="(item, index) in orderLists"
            :key="index"
            class="order_detail"
          >{{index}}</div>
        </div>
      </div>
    </div>
    <!-- <notContent v-else></notContent> -->
    <!--loading-->
    <descLoading :dscLoading="!isLoad"> </descLoading>
  </div>
</template>

<script>
import { Tab, Tabs, List } from "vant";
import { orderList } from "@/api/order";
// import notContent from "@/components/notContent";
import descLoading from "@/components/descLoading";
export default {
  data() {
    return {
      active: 0,
      all: 0,
      isdelete: 0,
      isfinished: 0,
      nogoods: 0,
      nopay: 0,
      page: 1,
      size: 10,
      type: "type",
      status: 0,
      isLoad: false,
      orderLists: [],
      userOrderDetail: null,
      isType: true,
    };
  },

  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    descLoading,
    // notContent
  },

  computed: {},
  mounted() {
    this.isLoad = false;
    this.getOrderList();
  },

  methods: {
    clickActive(index) {
      this.active = index;
      this.status = index;
      this.page = 0;
      this.orderLists = [];
      this.isType = true
      this.loadingMore()
    },
    loadingMore() {
      if (this.isType) {
        this.page++;
        this.getOrderList();
      }
    },
    //防抖动
    // debounce(fn, wait) {
    //   var timeout = null;
    //   return function () {
    //     if (timeout !== null) clearTimeout(timeout);
    //     timeout = setTimeout(fn, wait);
    //   };
    // },
    getOrderList() {
      let params = new FormData();
      params.append("page", this.page);
      params.append("size", this.size);
      params.append("status", this.active);
      params.append("type", this.type);
      orderList(params)
        .then((resultes) => {
          if (resultes.status == "success") {
            this.isLoad = true;
            this.all = resultes.data.count.all;
            this.isdelete = resultes.data.count.isdelete;
            this.isfinished = resultes.data.count.isfinished;
            this.nogoods = resultes.data.count.nogoods;
            this.nopay = resultes.data.count.nopay;
            this.orderLists = [...this.orderLists, ...resultes.data.list];
            if (resultes.data.list.length < this.page) {
              this.isType = false
            }
          }
        })
        .catch((error) => {});
    },
  },
};
</script>
<style lang='scss' scoped>
.user_order {
  height: 100%;
  width: 100%;
  .user_order_header {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-bottom: 1px solid #cccccc;
    width: auto;
    padding: 10px 0;
    height: 50px;
    line-height: 30px;
    box-sizing: border-box;
    overflow-x: scroll;
    overflow-y: hidden;
    ul {
      width: 480px;
      display: flex;
      li {
        height: 30px;
        width: 95px;
        text-align: center;
        border-right: 1px solid #ddd;
        font-size: 14px;
        &.active {
          color: #f92028;
        }
        &:last-child {
          border: 0;
        }
      }
    }
  }
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  .product_list {
    height: 500px;
    overflow-y: scroll;
    .order_detail {
      height: 280px;
      width: 100%;
      border-bottom: 1px solid #cccccc;
    }
  }
}
</style>