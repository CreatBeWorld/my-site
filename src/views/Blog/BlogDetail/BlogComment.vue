<template>
  <div class="blog-comment-container">
    <MessageArea
      :title="'评论列表'"
      :subTitle="`(${remoteData.total})`"
      :list="remoteData.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import { getComments, commitComment } from "@/api/blog";
export default {
  name: "BlogComment",
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
      remoteData:{
        total:0,
        rows:[]
      },
      isLoading: false
    };
  },
  created() {
    this.$eventBus.$on("mainScroll", this.handleScroll);
    this.fetchData();
  },
  destroyed() {
    //取消mainScroll事件监听
    this.$eventBus.$off("mainScroll", this.handleScroll);
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      const res =  await getComments(this.$route.params.id, this.page, this.limit);
      this.remoteData.total = res.total
      this.remoteData.rows = res.rows
      this.isLoading = false;
    },
    async handleSubmit(formData, callback) {
      const res = await commitComment({
        blogId: this.$route.params.id,
        ...formData,
      });
      if(res){
        this.remoteData.rows.unshift(res);
        this.remoteData.total++;
        callback("评论提交成功");
      }else{
        callback("操作过于频繁，请稍后再提交评论",'error');
      }
      
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
      let res = await getComments(this.$route.params.id, this.page, this.limit);
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

</style>
