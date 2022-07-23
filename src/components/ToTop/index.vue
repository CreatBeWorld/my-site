<template>
  <div class="to-top-container" v-show="isShow" @click="handleClick">Top</div>
</template>

<script>
export default {
  name: "ToTop",
  data() {
    return {
      isShow: false,
    };
  },
  created() {
    this.$eventBus.$on("mainScroll", this.handleScroll);
  },
  beforeDestroy() {
    this.$eventBus.$off("mainScroll", this.handleScroll);
  },
  methods: {
    handleScroll(dom) {
      if (!dom) {
        //如果dom元素不存在，则回到顶部元素不显示
        this.isShow = false;
        return;
      }
      this.isShow = dom.scrollTop >= 500;
    },
    handleClick() {
      this.$eventBus.$emit("scrollTop",0);
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.to-top-container {
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  background-color: @primary;
  color: #fff;
  border-radius: 50%;
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 99;
}
</style>
