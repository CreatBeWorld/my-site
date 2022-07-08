<template>
  <div id="app">
    <Avatar url="http://mdrs.yuanjin.tech/img/20201031141350.jpg" />
    <Icon type="arrowDown" />
    <Pager
      :total="total"
      :current="current"
      @pageChange="handlePageChange($event)"
    />
  </div>
</template>

<script>
import Avatar from "./components/Avatar";
import Icon from "./components/Icon";
import Pager from "./components/Pager";
export default {
  name: "App",
  components: {
    Avatar,
    Icon,
    Pager,
  },
  data() {
    return {
      total: 301,
      current: 1,
    };
  },
  methods: {
    handlePageChange(newPage) {
      this.current = newPage;
      console.log("加载当前页数据");
    },
  },
};
</script>

<style lang="less" scoped></style>
