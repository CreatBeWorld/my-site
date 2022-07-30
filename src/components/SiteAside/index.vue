<template>
  <div class="site-aside-container">
    <template v-if="remoteData">
      <Avatar :url="remoteData.avatar" />
      <h1 class="title">{{ remoteData.siteTitle }}</h1>
    </template>
    <Menu />
    <Contact />
    <div class="record-no" v-if="remoteData">{{ remoteData.icp }}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Avatar from "@/components/Avatar";
import Contact from "./Contact";
import Menu from "./Menu";
export default {
  name: "SiteAside",
  components: {
    Avatar,
    Contact,
    Menu,
  },
  computed: mapState("setting", ["remoteData"]),
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.site-aside-container {
  width: 100%;
  height: 100%;
  padding: 20px 0;
  background-color: @dark;
  overflow: hidden auto;
  .title {
    font-size: 1.2em;
    color: #fff;
    text-align: center;
    margin: 10px 0;
  }
  .record-no {
    text-align: center;
    color: @gray;
    font-size: 12px;
  }
}
.contact-container {
  margin: 30px auto;
}
.avatar-container {
  margin: 0 auto;
}
</style>
