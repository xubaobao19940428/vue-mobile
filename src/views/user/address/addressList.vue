<!--  -->
<template>
  <div class="user_address">
    <van-radio-group v-model="isChecked" @change="defaultChecked">
      <div
        class="user_ad_detail"
        v-for="(item, index) in addressList"
        :key="index"
      >
        <div class="detail_header">
          <div class="header_top">
            <span>{{ item.name }}</span>
            <span>{{ item.mobile }}</span>
          </div>
          <div class="detail_content">
            <span>{{ item.province_name }}</span>
            <span>{{ item.city_name }}</span>
            <span>{{ item.district_name }}</span>
            <span>{{ item.address }}</span>
          </div>
        </div>
        <div class="detail_bottom">
          <van-radio
            :name="item.id"
            checked-color="#ee0a24"
            @click="setDefault(item)"
            >默认地址</van-radio
          >
          <div class="address_edit">
            <a href="javascript:void(0);" class="edit_address">
              <i class="iconfont iconbianji1"></i>
              <span>编辑</span></a
            >
            <a href="javascript:void(0);">
              <i class="iconfont icondel"></i>
              <span>删除</span>
            </a>
          </div>
        </div>
        
      </div>
    </van-radio-group>
    <div class="bottom-button">
            <van-button type="danger" class="button" style="width: 100%"
        >新增收货人信息</van-button
      >
        </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { RadioGroup, Radio,Button,  Toast} from "vant";
import { address,addressDefault} from "@/api/user";
export default {
  data() {
    return {
      addressList: [],
      isDefault: false,
    };
  },

  components: {
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Button.name]:Button
  },

  computed: {
    isChecked: {
      get() {
        return this.$store.state.user.isAddressChecked;
      },
      set(val) {

      },
    },
  },

  mounted() {
    this.getAddress();
  },

  methods: {
    getAddress() {
      address().then((response) => {
        if (response.status == "success") {
          response.data.map((item) => {
            if (item.is_checked == 1) {
              this.$store.dispatch("setDefaultAddress", item.id);
            }
          });
          this.addressList = response.data;
        }
      });
    },
    setDefault(item) {
        let params = new FormData()
        params.append('address_id',item.id)
        addressDefault(params).then(resultes=>{
            if(resultes.status=='success'){
                Toast.success('默认地址设置成功');
                this.$store.dispatch("setDefaultAddress", item.id);
            }
        })
    },
    defaultChecked() {
      //   setTimeout(()=>{
      //       this.isDefault = true
      //   },2000)
    },
  },
};
</script>
<style lang='scss' scoped>
.user_address {
  height: 100%;
  width: 100%;
  .user_ad_detail {
    width: 100%;
    background: #fff url(../../../assets/img/flow_check_03.png) bottom left
      repeat-x;
    background-size: 80px auto;
    .detail_header {
      width: 100%;
      border-bottom: 1px solid #ddd;
      padding: 11px;
      box-sizing: border-box;
      .header_top {
        height: 20px;
        display: flex;
        line-height: 20px;
        justify-content: space-between;
      }
      .detail_content {
        margin-top: 10px;
        font-size: 14px;
        span {
          margin-right: 5px;
        }
      }
    }
    .detail_bottom {
      height: 50px;
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      align-items: center;
      padding: 11px;
      box-sizing: border-box;
      .address_edit {
        a{
          color: #323232;
          i{
                vertical-align: text-bottom;
                margin-right:3px;
            }
        }
        .edit_address{
            margin-right:10px;
            
        }
      }
    }
    /deep/ .van-radio__label {
      font-size: 13px;
    }
  }
    .bottom-button{
        width:100%;
        position: fixed;
        bottom: 0;
    }
}
</style>