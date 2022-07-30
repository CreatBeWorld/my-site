<template>
  <ul class="project-container" v-loading="isLoading" ref="container">
    <li v-for="item in remoteData" :key="item.id">
      <a
        :href="item.url ? item.url : `javascript:alert('该项目仅能在内网访问')`"
        class="img-link"
        :target="item.url?'_blank':'_self'"
      >
        <img v-lazy="item.thumb" alt="" />
      </a>
      <div class="content">
        <a
          :href="
            item.url ? item.url : `javascript:alert('该项目仅能在内网访问')`
          "
          class="title-link"
          :target="item.url?'_blank':'_self'"
        >
          <h2>{{ item.name }}</h2>
        </a>
        <a :href="item.github" v-if="item.github" class="github-link">github</a>
        <p v-for="(desc, i) in item.description" :key="i" class="desc">
          {{ desc }}
        </p>
      </div>
    </li>
    <Empty v-if="remoteData.length===0&&!isLoading"/>
  </ul>
</template>

<script>
import { mapState } from "vuex";
import mainScroll from "@/mixin/mainScroll";
import Empty from "@/components/Empty"
export default {
  name: "project",
  mixins: [mainScroll("container")],
  components: {
    Empty
  },
  created() {
    this.$store.dispatch("project/fetchProject");
  },
  computed: mapState("project", ["isLoading", "remoteData"]),
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.project-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden auto;
  padding: 25px 20px;
  scroll-behavior: smooth;
  li {
    margin-bottom: 20px;
    display: flex;
    padding:10px;
    &:hover{
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
    }
    .img-link {
      margin-right: 15px;
      img {
        width: 150px;
        height: 120px;
        object-fit: cover;
      }
    }
    .content {
      flex: 1 1 auto;
      .title-link {
        display: block;
        h2 {
          margin-bottom: 10px;
        }
      }
      .github-link {
        color: @primary;
        font-size: 14px;
        margin-bottom: 10px;
        display: block;
      }
      .desc{
        margin-bottom: 10px;
      }
    }
  }
}
</style>
