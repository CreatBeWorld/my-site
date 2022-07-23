<template>
  <div class="blog-comment-container">
    <MessageArea
      :title="'评论列表'"
      :subTitle="remoteData.total + ''"
      :list="remoteData.rows"
      @submit="handleSubmit"
    />
    <div class="loading-more" v-loading="isLoading"></div>
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import { getComments, commitComment } from "@/api/blog";
import fetchData from "@/mixin/fetchData";
export default {
  name: "BlogComment",
  mixins: [fetchData({ total: 0, rows: [] })],
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  created() {
    this.$eventBus.$on("mainScroll", this.handleScroll);
  },
  destroyed() {
    //取消mainScroll事件监听
    this.$eventBus.$off("mainScroll", this.handleScroll);
  },
  methods: {
    async fetchData() {
      return await getComments(this.$route.params.id, this.page, this.limit);
    },
    async handleSubmit(formData, callback) {
      const res = await commitComment({
        blogId: this.$route.params.id,
        ...formData,
      });
      this.remoteData.rows.unshift(res);
      this.remoteData.total++;
      callback("评论提交成功");
    },
    //滚动条触底加载更多数据
    async fetchMore() {
      if (this.isLoading) {
        //防止频繁加载更多数据
        return;
      }
      if (this.remoteData.rows.length >= this.remoteData.total) {
        return;
      }
      this.isLoading = true;
      this.page++;
      const res = await this.fetchData();
      this.remoteData.rows.push(...res.rows);
      this.isLoading = false;
    },
    handleScroll(dom) {
      if (!dom) {
        return;
      }
      const range = 100;
      const h = Math.abs(dom.clientHeight + dom.scrollTop - dom.scrollHeight);
      if (h <= range) {
        //滚动条触底判断
        this.fetchMore();
      }
    },
  },
};
</script>

<style scoped lang="less">
.loading-more {
  position: relative;
}
</style>
