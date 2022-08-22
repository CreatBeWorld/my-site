<template>
  <div class="main-content-container">
    <h1 class="title">{{ blog.title }}</h1>
    <div class="aside">
      <span>日期：{{ formatDate(blog.createDate) }}</span>
      <span>浏览：{{ blog.scanNumber }}</span>
      <a href="#data-form-container">评论：{{ blog.commentNumber }}</a>

     <RouterLink
        v-if="blog.category"
        :to="{ name: 'CategoryBlog', params: { categoryId: blog.category.id } }"
      >
        {{ blog.category.name }}
      </RouterLink>
      <span v-else>未分类</span>
    </div>
    <div class="markdown-body" v-html="blog.htmlContent"></div>
  </div>
</template>

<script>
import formatDate from "@/utils/formatDate";
import "highlight.js/styles/github.css";
import "@/styles/markdown.css";
export default {
  name: "MainContent",
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate,
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.aside {
  font-size: 12px;
  color: @lightWords;
  margin: 1.5em 0;
  span,
  a {
    margin-right: 1em;
  }
}
.markdown-body {
  margin-bottom: 20px;
}
</style>
