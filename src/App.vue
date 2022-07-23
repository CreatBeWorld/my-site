<template>
  <div id="app">
    <Layout>
      <template #left>
        <div class="aside">
          <SiteAside />
        </div>
      </template>
      <template #default>
        <RouterView />
      </template>
    </Layout>
    <ToTop/>
  </div>
</template>

<script>
import Layout from "./components/Layout";
import SiteAside from "./components/SiteAside";
import ToTop from "./components/ToTop";
export default {
  name: "App",
  components: {
    Layout,
    SiteAside,
    ToTop
  },
};
</script>

<style lang="less" scoped>
@import "./styles/mixins.less";
#app {
  .self-fill(fixed);
  .aside {
    width: 250px;
    height: 100%;
  }
}
</style>
