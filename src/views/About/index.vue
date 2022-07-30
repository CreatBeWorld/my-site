<template>
  <div class="about-container" v-loading="isLoading||!iframeLoaded">
    <!-- iframe用于在网页中嵌入另一个网页，默认有边框，行内块元素 -->
    <iframe :src="remoteData" v-if="remoteData" @load="iframeLoaded=true"></iframe>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "About",
  data(){
    return { 
      iframeLoaded:false
    }
  },
  created() {
    this.$store.dispatch("about/fetchAbout");
  },
  computed: mapState("about", ["isLoading", "remoteData"]),
};
</script>

<style scoped lang="less">
.about-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  iframe {
    width: 100%;
    height: 100%;
    display: block;
    border: none;
  }
}
</style>
