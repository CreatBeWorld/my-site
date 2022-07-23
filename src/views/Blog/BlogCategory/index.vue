<template>
  <div class="blog-category-container" v-loading="isLoading">
    <h2>文章分类</h2>
    <RightList :lists="lists" @select="handleSelect"/>
  </div>
</template>

<script>
import fetchData from "@/mixin/fetchData";
import RightList from "../RightList";
import { getBlogTypes } from "@/api/blog";
export default {
  name: "BlogCategory",
  mixins: [fetchData([])],
  components: {
    RightList,
  },
  computed: {
    categoryId() {
      return +this.$route.params.categoryId || -1;
    },
    limit(){
      return +this.$route.query.limit || 10;
    },
    lists() {
      const articleCount = this.remoteData.reduce(
        (a, b) => a + b.articleCount,
        0
      );
      const res = [
        { id: -1, name: "全部", articleCount, order: 0 },
        ...this.remoteData,
      ];
      return res.map((d) => ({
        ...d,
        aside: `${d.articleCount}篇`,
        isSelected: d.id === this.categoryId,
      }));
    },
  },
  methods: {
    async fetchData() {
      return await getBlogTypes();
    },
    handleSelect(item){
      const query = {
        page: 1,
        limit: this.limit,
      };
      if (item.id === -1) {
        this.$router.push({
          name: "Blog",
          query
        });
      } else {
        this.$router.push({
          name: "CategoryBlog",
          query,
          params: {
            categoryId: item.id,
          },
        });
      }
    }
  },
};
</script>

<style scoped lang="less">
.blog-category-container {
  width: 300px;
  height: 100%;
  overflow-y: auto;
  padding: 20px;
  position: relative;
  h2 {
    font-size: 1em;
    letter-spacing: 2px;
    margin-bottom: 20px;
  }
}
</style>
