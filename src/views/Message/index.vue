<template>
  <div class="message-container" ref="container">
    <MessageArea
      title="留言板"
      :subTitle="`(${remoteData.total})`"
      :list="remoteData.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import * as messageApi from "@/api/message";
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixin/fetchData";
import mainScroll from "@/mixin/mainScroll";
export default {
  name: "Message",
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("container")],
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
    this.$eventBus.$on("mainScroll", this.judgeScroll);
  },
  destroyed() {
    this.$eventBus.$off("mainScroll", this.judgeScroll);
  },
  methods: {
    async fetchData() {
      return await messageApi.getMessage(this.page, this.limit);
    },
    async handleSubmit(formData, callback) {
      const res = await messageApi.commitMessage(formData);
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
    judgeScroll(dom) {
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
.message-container {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scroll-behavior: smooth;
  .message-area-container {
    width: 60%;
    margin: 0 auto;
  }
}
</style>
