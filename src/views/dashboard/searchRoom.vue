<!--  -->
<template>
  <div class="search_room">
    <div class="search">
      <div class="back">
        <i class="iconfont iconfanhui"></i>
      </div>
      <van-search
        v-model="searchValue"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @focus="focusSearch"
        clearable
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </div>
    <div class="search_history" v-if="historyList.length > 0 && !isSearch">
      <div class="history_top">
        <span>最近搜索</span>
        <span><i class="iconfont icondel"></i></span>
      </div>
      <div class="search_h_content">
        <van-tag
          type="primary"
          v-for="(item, index) in historyList"
          :key="index"
          style="margin: 10px"
          @click="search(item)"
          >{{ item }}</van-tag
        >
      </div>
    </div>
    <!--没有内容时显示--->
    <div v-if="isSearch && searchList.length == 0">
      <notContent />
    </div>
    <!---->
    <div class="live_lists" v-if="searchList.length > 0 && isSearch">
      <div
        class="live_list_child"
        v-for="(item, index) in searchList"
        :key="index"
        @click="liveDetailRoom(item)"
      >
        <div style="width: 100%">
          <div class="live_top">
            <div class="is_back">
              <div
                :class="[
                  item.is_stopped == 0 ? 'back_top_left_live' : 'back_top_left',
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
    <descLoading :dscLoading="dscLoading" />
  </div>
</template>

<script>
import { searchRoomLive, searchRoom} from "@/api/live/livelist";
import { Search, Tag,Toast} from "vant";
import notContent from "@/components/notContent";
import descLoading from "@/components/descLoading";
export default {
  data() {
    return {
      searchValue: "",
      historyList: [],
      hotList: [],
      searchList: [],
      isSearch: false,
      imgurl: require("../../assets/image/video-icon.png"),
      notImgUrl: require("../../assets/image/live-icon.png"),
      dscLoading: false,
    };
  },

  components: {
    [Search.name]: Search,
    [Tag.name]: Tag,
    notContent,
    descLoading,
  },

  computed: {},

  mounted() {
    this.getSearchRoomLive();
  },

  methods: {
    getSearchRoomLive() {
      searchRoomLive()
        .then((resultes) => {
          if (resultes.message == "success") {
            this.historyList = resultes.data.history_keywords;
            this.hotList = resultes.data.hot_keywords;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onSearch() {
        if(this.searchValue==''){
            Toast('请填写搜索内容')
            return false
        }
      this.dscLoading = true;
      let data = {
        keyword: this.searchValue,
      };

      let params = this.$qs.stringify(this.sign(data, this.serveTime()));
      searchRoom(params)
        .then((resultes) => {
          if (resultes.message == "success") {
            if (resultes.data) {
              this.isSearch = true;
              this.searchList = resultes.data;
            }
          }
          this.dscLoading = false;
        })
        .catch((error) => {
          this.dscLoading = false;
        });
    },
    search(item) {
      this.searchValue = item;
      this.onSearch();
    },
    liveDetailRoom(item) {
      console.log(item);
      this.$router.push({
        path: "/live",
        query: {
          roomId: item.id,
        },
      });
    },
    focusSearch() {
      this.searchList = [];
      this.isSearch = false;
      this.getSearchRoomLive();
    },
  },
};
</script>
<style lang='scss' scoped>
.search_room {
  width: 100%;
  height: auto;
  .search {
    display: flex;
    background: #ffffff;
    height: 44px;
    border-bottom: 1px solid #dddddd;
    .back {
      width: 40px;
      background: #ffffff;
      line-height: 44px;
      text-align: center;
      i {
        font-size: 20px;
        font-weight: 900;
      }
    }
    .van-search {
      flex: 1;
    }
  }
  .search_history {
    margin-top: 20px;
    padding: 0 10px;
    .history_top {
      font-size: 16px;
      display: flex;
      justify-content: space-between;
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
}
</style>