<template>
  <img :src="loadingUrl" alt="" class="loading-container" />
</template>

<script>
import loadingUrl from "@/assets/loading.svg";
export default {
  name: "Loading",
  data() {
    return {
      //注意:js动态路径，打包后会原封不动的显示原路径，需要模块化的方式导入资源，并获取资源路径
      loadingUrl,
    };
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/mixins.less";
.loading-container {
  .self-center();
}
</style>
