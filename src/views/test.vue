<template>
  <div>
    {{test}}
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { Person1 } from '../common/ts'
export default Vue.extend({
  components: {
    // TableCom
  },
  data() {
    return {
      msg: "typescript",
    };
  },
  created() {
    console.log("created", this.msg);
  },
  mounted() {
    this.msgBtn('')
    console.log("mounted");
  },
  computed: {
    // test: {
    //   // 需要标注有 `this` 参与运算的返回值类型
    //   get(): string {
    //     return this.msg
    //   },
    //   set(val: string) {
    //     this.msg = val
    //   }
    // }
    test(): any {
      return this.msg;
    },
  },
  watch: {
    msg(val: any) {
      console.log("watch", val);
    },
  },
  methods: {
    msgBtn(ev: any) {
      Person1({name:'111',age:222})
    },
  },
});
</script>