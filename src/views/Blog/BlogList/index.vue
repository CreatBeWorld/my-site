<template>
  <div class="blog-list-container" v-loading="isLoading" ref="container">
    <ul class="blogs">
      <li v-for="item in remoteData.rows" :key="item.id">
        <div class="img-area" v-if="item.thumb">
          <RouterLink
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <img v-lazy="item.thumb" :alt="item.title" :title="item.title" />
          </RouterLink>
        </div>
        <div class="main">
          <RouterLink
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <h2 class="title">{{ item.title }}</h2>
          </RouterLink>
          <div class="desc-first">
            <span>日期：{{ formatDate(item.createDate) }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论: {{ item.commentNumber }}</span>
            <RouterLink
              :to="{
                name: 'CategoryBlog',
                params: {
                  categoryId: item.category.id,
                },
              }"
            >
              {{ item.category.name }}
            </RouterLink>
          </div>
          <p class="desc-last">{{ item.description }}</p>
        </div>
      </li>
    </ul>
    <Pager
      v-if="remoteData.total"
      :total="remoteData.total"
      :current="routeInfo.page"
      :limit="routeInfo.limit"
      :visibleNumber="10"
      @pageChange="handlePageChange"
    />
  </div>
</template>

<script>
import fetchData from "@/mixin/fetchData";
import { getBlogs } from "@/api/blog.js";
import { formatDate } from "@/utils"; //注意导入的函数或变量不能直接在template中调用
import Pager from "@/components/Pager";
import mainScroll from "@/mixin/mainScroll";
export default {
  name: "BlogList",
  mixins: [fetchData({}), mainScroll("container")],
  components: {
    Pager,
  },
  computed: {
    //路由数据
    routeInfo() {
      return {
        page: +this.$route.query.page || 1,
        limit: +this.$route.query.limit || 10,
        categoryId: +this.$route.params.categoryId || -1,
      };
    },
  },
  methods: {
    async fetchData() {
      return await getBlogs(this.routeInfo);
    },
    formatDate,
    //页面改变，路由跳转
    handlePageChange(newPage) {
      const query = {
        page: newPage,
        limit: this.routeInfo.limit,
      };
      if (this.routeInfo.categoryId === -1) {
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        this.$router.push({
          name: "CategoryBlog",
          query,
          params: {
            categoryId: this.routeInfo.categoryId,
          },
        });
      }
    },
  },
  watch: {
    //路由信息改变时，重新请求数据
    async $route() {
      this.isLoading = true;
      this.$refs.container.scrollTop = 0;
      this.remoteData = await this.fetchData();
      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.blog-list-container {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 20px 10px 30px 50px;
  scroll-behavior: smooth;
  position: relative;
  .blogs {
    li {
      padding: 10px 10px 10px 0;
      border-bottom: 1px solid @lightWords;
      display: flex;
      .img-area {
        flex: 0 0 auto;
        margin-right: 10px;
        a {
          display: block;
          img {
            display: block;
            max-width: 200px;
            object-fit: cover;
            border-radius: 5px;
          }
        }
      }
      .main {
        flex: 1 1 auto;
        .title {
          margin-bottom: 5px;
        }
        a {
          display: block;
          &:hover {
            color: @words;
          }
        }
        .desc-first {
          color: @lightWords;
          font-size: 12px;
          margin-bottom: 15px;
          span {
            margin-right: 2em;
          }
          a {
            color: @lightWords;
            display: inline;
            &:hover {
              color: @primary;
            }
          }
        }
        .desc-last {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
