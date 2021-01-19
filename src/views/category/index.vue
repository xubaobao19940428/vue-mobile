<!--  -->
<template>
  <div class="category">
    <div class="header_search">
      <van-search
        v-model="searchValue"
        placeholder=""
        shape="round"
        style="background: #fff"
        @focus="searchRoom"
      >
      </van-search>
    </div>
    <div class="category_list">
      <div class="category_type">
        <catelog-component
          :list="cateList"
          :activeIndex="categoryIndex"
          @set-cate-index="setCateIndex"
        ></catelog-component>
      </div>
      <div class="category_detail">
        <img
          src="https://img2.ubo.vip/images/original_img/202006/1591939987349896599.jpg?x-oss-process=image/resize,m_fill,w_640,h_640"
          alt=""
        />
        <ul>
          <li
            v-for="(item, index) in catelogChildren"
            :key="index"
            class="cate_children"
            @click="catProduct(item)"
          >
            -{{ item.cat_name }}-
          </li>
        </ul>
        <van-loading size="3rem" v-show="loading" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import catelogComponent from "@/components/catelogComponent";
import { catelogGet } from "@/api/category";
import { Loading, Search } from "vant";
export default {
  data() {
    return {
      catelogChildren: [],
      loading: true,
      searchValue:''
    };
  },

  components: {
    catelogComponent,
    [Loading.name]: Loading,
    [Search.name]: Search,
  },

  computed: {
    ...mapState({
      cateList: (state) => state.category.categoryList,
      categoryIndex: (state) => state.category.index,
      categoryId: (state) => state.category.cat_id,
    }),
  },

  mounted() {
    if (this.cateList.length == 0) {
      this.getCatelogList(1, "");
      this.getCatelogList(2, 3);
    } else {
      this.getCatelogList(2, this.categoryId);
    }
  },

  methods: {
    getCatelogList(type, id) {
      this.loading = true;
      let params = {
        id: id,
      };
      catelogGet(params).then((resultes) => {
        if (resultes.status == "success") {
          //左边大分类
          if (type == 1) {
            this.$store.dispatch("setCategoryList", resultes.data);
          } else {
            this.loading = false;
            this.catelogChildren = resultes.data;
          }
        }
      });
    },
    setCateIndex(data) {
      this.$store.commit("SET_CATEGORY", data);
      this.catelogChildren = [];
      this.getCatelogList(2, data.cat_id);
    },
    catProduct(item) {
      this.$router.push({
        name: "home",
        params: {
          id: 111,
          name: 222,
        },
      });
    },
    searchRoom(){

    }
  },
};
</script>
<style lang='scss' scoped>
.category {
  height: 100%;
  width: 100%;
  .header_search {
    height: 44px;
    background: #fff;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 99;
    border-bottom: 1px solid #ccc;
  }
  .category_list {
    padding: 54px 0 55px 0;
    display: flex;
    height: auto;
    box-sizing: border-box;
    .category_type {
      width: 100px;
      height: 100%;
      border-right: 1px solid #cccccc;
      position: fixed;
      left: 0;
    }
    .category_detail {
      flex-grow: 1;
      text-align: center;
      margin-left: 100px;
      img {
        width: 200px;
        height: 100px;
      }
      .cate_children {
        margin: 11px 0;
        position: relative;
        overflow: hidden;
        height: 25px;
        font-size: 13px;
      }
    }
  }
}
</style>