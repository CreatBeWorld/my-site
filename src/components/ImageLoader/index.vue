<template>
  <div class="image-loader-container">
    <img :src="placeholder"
         alt=""
         v-if="show"
         class="placeholder" />
    <!-- 设置为opacity<1的元素且不是定位元素为什么会压住设置为定位且没有设置z-indx值的元素?设置为opacity<1的元素和设置为定位的元素具有相同的层级 -->
    <img :src="src"
         alt=""
         @load="handleImgLoad"
         :style="{ transition: `${duration}ms `, opacity: originOpacity }" />
  </div>
</template>

<script>
export default {
  name: "ImageLoader",
  data() {
    return {
      show: true, //控制占位图片是否显示
      originLoaded: false, //原图是否加载
    };
  },
  computed: {
    originOpacity() {
      return this.originLoaded ? 1 : 0;
    },
  },
  props: {
    src: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  methods: {
    handleImgLoad() {
      this.originLoaded = true;
      setTimeout(() => {
        //用箭头函数，不然this指向出问题
        this.show = false;
        this.$emit("load");
      }, this.duration);
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/mixins.less";
.image-loader-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  img {
    .self-fill();
    object-fit: cover;
    &.placeholder {
      filter: blur(20px);
    }
  }
}
</style>
