<template>
  <div class="dashboard">
    <div class="search_room">
      <van-search
        v-model="searchValue"
        placeholder="请输入搜索关键词"
        @focus="searchRoom"
      />
    </div>
    <van-skeleton title :row="3" :loading="loading">
      <div class="dashboard_banner">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="dashboard_content">
        <van-tabs
          v-model="active"
          title-active-color="#ee0a24"
          @click="tabClick"
        >
          <van-tab
            v-for="(item, index) in tabsList"
            :title="item.cate_name"
            :key="index"
          >
          </van-tab>
        </van-tabs>
      </div>
      <!--视频列表-->
      <div class="live_lists">
        <div
          class="live_list_child"
          v-for="(item, index) in liveLists"
          :key="index"
          @click="liveDetailRoom(item)"
        >
          <div style="width: 100%">
            <div class="live_top">
              <div class="is_back">
                <div
                  :class="[
                    item.is_stopped == 0
                      ? 'back_top_left_live'
                      : 'back_top_left',
                  ]"
                >
                  <img v-bind:src="item.is_stopped == 0 ? notImgUrl : imgurl" />
                  <span class="font_span">{{
                    item.is_stopped == 1
                      ? "回放"
                      : item.start_time == 0
                      ? "直播中"
                      : "预告"
                  }}</span>
                </div>
                <div class="back_top_right">
                  <span class="font_span"
                    >{{
                      item.memberNum / 10000 >= 1
                        ? (item.memberNum / 10000).toFixed(1) + "万+"
                        : item.memberNum
                    }}观看</span
                  >
                </div>
              </div>
            </div>
            <img v-bind:src="item.cover" alt="" class="live_cover_img" />
            <div class="live_list_bottom">
              <div class="live_list_title">{{ item.title }}</div>
              <div class="live_name_img">
                <div class="live_img_flex">
                  <img v-bind:src="item.userPortrait" alt="" />
                  <div class="username">{{ item.userName }}</div>
                </div>
                <div class="live_active_num">
                  <img class="aixin" src="../../assets/image/praise-icon.png" />
                  <span class="praise">{{
                    item.praise / 10000 >= 1
                      ? (item.praise / 10000).toFixed(1) + "万+"
                      : item.praise
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-skeleton>
  </div>
</template>

<script>
import {
  Skeleton,
  Swipe,
  SwipeItem,
  Tab,
  Tabs,
  Toast,
  Loading,
  Search,
} from "vant";
import { getTabsList, tabsListDetail } from "@/api/live/livelist";
export default {
  name: "dashboard",
  props: {
    msg: String,
  },
  components: {
    [Skeleton.name]: Skeleton,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Loading.name]: Loading,
    [Search.name]: Search,
  },
  data() {
    return {
      loading: true,
      listLoading: false,
      imgurl: require("../../assets/image/video-icon.png"),
      notImgUrl: require("../../assets/image/live-icon.png"),
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg",
      ],
      tabsList: [],
      active: 1,
      liveLists: [],
      lastId: 0,
      searchValue: "",
    };
  },
  mounted() {
    console.log(process.env.VUE_APP_BASE_API);
    this.loading = false;
    this.getTabsLists();
    this.tabClick(1);
    window.addEventListener("scroll", this.showfixed);
  },
  methods: {
    //头部固定
    showfixed() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 200) {
        // 当页面滚动到高度300px处，动态绑定class 来设置头部固定定位
        if (document.getElementsByClassName("van-tabs")[0]) {
          document
            .getElementsByClassName("van-tabs")[0]
            .setAttribute("class", "van-tabs van-tabs--line topfixed");
        }
      } else {
        if (document.getElementsByClassName("van-tabs")[0]) {
          document
            .getElementsByClassName("van-tabs")[0]
            .setAttribute("class", "van-tabs van-tabs--line");
        }
      }
    },
    getTabsLists() {
      this.listLoading = true;
      getTabsList()
        .then((resultes) => {
          if (resultes.message == "success") {
            this.tabsList = resultes.data;
          } else {
            Toast(resultes.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //tabs切换
    tabClick(index) {
      var params = {
        category_id: this.tabsList[index] ? this.tabsList[index].id : 1,
        lastid: this.lastId,
      };
      let data = this.$qs.stringify(this.sign(params, this.serveTime()));
      this.liveLists = [];
      tabsListDetail(data).then((resultes) => {
        if (resultes.message == "success") {
          this.liveLists = resultes.data;
          this.listLoading = false;
          this.lastId = resultes.data[resultes.data.length - 1].id || 0;
        }
      });
    },
    //点击跳进直播见
    liveDetailRoom(item) {
      console.log(item);
      this.$router.push({
        path: "/live",
        query: {
          roomId: item.id,
        },
      });
    },
    //搜索live_room
    searchRoom() {
      this.$router.push({
        path: "/searchRoom",
        query: {
          type: "searchRoom",
        },
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.dashboard {
  height: 100%;
  width: 100%;
  background-color: #f4f4f4;
  padding-top: 44px;
  .search_room {
    position: fixed;
    height: 44px;
    top: 0;
    width: 100%;
    background-color: #f4f4f4;
    z-index: 999;
  }
  .dashboard_banner {
    width: 100%;
    height: 150px;
    background-color: #dddddd;
    .van-swipe {
      width: 100%;
      height: 100%;
      /deep/ img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .live_lists {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    background-color: #f4f4f4;
    .live_list_child {
      width: 50%;
      height: 210px;
      margin: 5px 0;
      color: #fff;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      position: relative;
      // background-color: red;
      .live_top {
        width: 100%;
        .is_back {
          width: 126px;
          height: 19.6px;
          position: absolute;
          margin-left: 5%;
          display: flex;
          font-size: 12px;
          .back_top_left {
            width: 50%;
            height: 100%;
            background-color: blue;
            border-radius: 10px 0 0 10px;
            img {
              height: 16px;
              width: 16px;
            }
          }
          .back_top_left_live {
            width: 50%;
            height: 100%;
            background-color: red;
            border-radius: 10px 0 0 10px;
            img {
              height: 16px;
              width: 16px;
            }
          }
          .back_top_right {
            width: 50%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.3);
            border-radius: 0 10px 10px 0;
          }
          .font_span {
            vertical-align: middle;
            line-height: 19.6px;
          }
        }
      }
      .live_cover_img {
        width: 90%;
        height: 100%;
        border-radius: 10px;
        margin-left: 5%;
      }
    }
    .live_list_bottom {
      position: absolute;
      width: 140px;
      height: 49px;
      bottom: 0;
      left: 5%;
      padding: 1px 6px;
      font-size: 12px;
      .live_list_title {
        text-align: left;
      }
      .live_name_img {
        display: flex;
        justify-content: space-between;
        .live_img_flex {
          line-height: 21px;
          margin-top: 10px;
          display: flex;
          width: 84px;
          .username {
            width: 53px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          img {
            width: 21px;
            height: 21px;
            border-radius: 50%;
            vertical-align: middle;
          }
        }
        .live_active_num {
          line-height: 40px;
          img {
            height: 12px;
            width: 12px;
          }
        }
      }
    }
  }
  .topfixed {
    position: fixed;
    z-index: 99;
    top: 44px;
    left: 0;
    right: 0;
    background-color: #fff;
  }
}
</style>
