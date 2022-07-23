<template>
  <Layout>
    <div class="main-container" v-loading="isLoading" ref="container">
      <MainContent :blog="remoteData" v-if="remoteData" />
      <BlogComment v-if="!isLoading" />
    </div>
    <template #right>
      <div class="right-container" v-loading="isLoading">
        <BlogTOC :toc="remoteData.toc" v-if="remoteData" />
      </div>
    </template>
  </Layout>
</template>

<script>
import fetchData from "@/mixin/fetchData";
import { getSingleBlog } from "@/api/blog.js";
import Layout from "@/components/Layout";
import MainContent from "./MainContent";
import BlogTOC from "./BlogTOC";
import BlogComment from "./BlogComment";
import mainScroll from "@/mixin/mainScroll";
export default {
  name: "BlogDetail",
  mixins: [fetchData(null),mainScroll("container")],
  components: {
    Layout,
    MainContent,
    BlogTOC,
    BlogComment,
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  updated() {
    //当页面刷新时，重新滚动到location.hash所指定的位置
    const hash = location.hash;
    if (hash) {
      location.hash = "";
      setTimeout(() => {
        location.hash = hash;
      }, 50);
    }
  },
  methods: {
    async fetchData() {
      return await getSingleBlog(this.id);
    },
  },
};
</script>

<style scoped lang="less">
.main-container {
  position: relative;
  overflow-y: scroll;
  padding: 20px;
  height: 100%;
  scroll-behavior: smooth;
}
.right-container {
  width: 300px;
  height: 100%;
  overflow-y: auto;
  position: relative;
}
</style>
