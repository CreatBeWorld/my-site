<template>
  <div class="site-aside-container">
    <Avatar url="http://mdrs.yuanjin.tech/img/20201031141350.jpg" />
    <h1 class="title">xsj blog</h1>
    <Menu />
    <Contact />
    <div class="record-no">
        黑ICP备17001719号
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
import Contact from "./Contact";
import Menu from "./Menu";
export default {
  name: "SiteAside",
  components: {
    Avatar,
    Contact,
    Menu,
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.site-aside-container {
  height: 100%;
  padding: 20px 0;
  background-color: @dark;
  overflow: hidden auto;
  .title{
    font-size: 1.2em;
    color: #fff;
    text-align: center;
    margin: 10px 0;
  }
  .record-no{
    text-align: center;
    color: @gray;
    font-size: 12px;
  }
}
.contact-container {
  margin: 30px auto;
}
.avatar-container {
  margin:0 auto;
}
</style>
