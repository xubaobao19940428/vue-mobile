<!--  -->
<template>
  <div class="edit_address">
    <van-form @submit="onSubmit" label-width="80px">
      <van-field
        v-model="user.consignee"
        label="收货人"
        placeholder="请填写收货人姓名"
        :required="true"
        clearable
        :rules="[{ required: true, message: '请填写收货人' }]"
      >
        <!-- <span slot="label">收货人<span style="color:red">*</span></span> -->
      </van-field>
      <van-field
        v-model="user.email"
        type="email"
        label="收货人邮箱"
        placeholder="请填写收货人邮箱"
        :required="true"
        clearable
        :rules="[{ validatorEmail, message: '请输入收货人邮箱' }]"
      >
        <!-- <span slot="label">收货人邮箱<span style="color:red">*</span></span> -->
      </van-field>
      <van-field
        class="address_detail"
        v-model="user.address"
        type="address"
        label="详细地址"
        placeholder="请填写详细地址"
        clearable
        :rules="[{ required: true, message: '请输入详细地址' }]"
      >
        <span slot="label" class="detail_address">详细地址</span>
      </van-field>
      <van-field
        v-model="user.zipcode"
        type="text"
        label="邮编"
        placeholder="邮编"
        :required="true"
        clearable
        :rules="[{ required: true, message: '请输写邮编' }]"
      >
      </van-field>
      <van-field
        v-model="user.mobile"
        type="text"
        label="手机号码"
        placeholder="请输入联系人手机号"
        :required="true"
        clearable
        :rules="[{ required: true, message: '请输入联系人手机号' }]"
      >
      </van-field>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { Form } from "vant";
var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
export default {
  data() {
    return {
      user: {
        consignee: "",
        email: "",
        address: "",
        zipcode: "",
        mobile:''
      },
    };
  },

  components: {
    [Form.name]: Form,
  },

  computed: {},

  mounted() {},

  methods: {
    validatorEmail(val) {
      return reg.test(val);
    },
    onSubmit(val) {
      console.log(val);
    },
  },
};
</script>
<style lang='scss' scoped>
.edit_address {
  .address_detail {
    display: grid;
    .detail_address {
      &::before {
        position: absolute;
        left: 8px;
        color: #ee0a24;
        font-size: 14px;
        content: "*";
      }
    }
  }
}
</style>