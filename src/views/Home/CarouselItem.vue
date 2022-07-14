<template>
  <div
    class="carousel-item-container"
    ref="container"
    @mousemove="handleMousemove"
    @mouseleave="setMouseCenter"
  >
    <div class="carousel-img" ref="imgContainer" :style="position">
      <ImageLoader
        :src="carousel.bigImg"
        :placeholder="carousel.midImg"
        @load="showWords"
      />
    </div>
    <div class="title" ref="title">{{ carousel.title }}</div>
    <div class="desc" ref="desc">{{ carousel.description }}</div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
  name: "CarouselItem",
  data() {
    return {
      titleWidth: 0,
      descWidth: 0,
      containerSize: null, //外层容器的尺寸
      imgContainerSize: null, //图片容器的尺寸
      mouseX: 0, //鼠标距离容器左侧的水平距离
      mouseY: 0, //鼠标距离容器上侧的垂直距离
    };
  },
  components: {
    ImageLoader,
  },
  props: ["carousel"],
  mounted() {
    //获取标题和描述的宽度
    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.desc.clientWidth;
    //计算容器的尺寸
    this.setSize();
    //设置初始时，mouseX,mouseY在容器中间
    this.setMouseCenter();
    //窗口尺寸改变时，重新计算容器的尺寸
    window.addEventListener("resize", this.setSize);
  },
  destroyed() {
    window.removeEventListener("resize", this.setSize);
  },
  computed: {
    //获取imgContainer的向左移动和向上移动的距离
    position() {
      if (!this.containerSize || !this.imgContainerSize) {
        return;
      }
      const x =
        (-this.mouseX *
          (this.imgContainerSize.width - this.containerSize.width)) /
        this.containerSize.width;
      const y =
        (-this.mouseY *
          (this.imgContainerSize.height - this.containerSize.height)) /
        this.containerSize.height;
      return {
        transform: `translate(${x}px,${y}px)`,
      };
    },
    mouseCenterPosition() {
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2,
      };
    },
  },
  methods: {
    //控制标题和描述文字的显示
    showWords() {
      this.$refs.title.style.opacity = "1";
      this.$refs.title.style.width = "0px";
      this.$refs.title.clientWidth;
      this.$refs.title.style.width = this.titleWidth + "px";
      this.$refs.title.style.transition = "1.5s";
      this.$refs.desc.style.opacity = "1";
      this.$refs.desc.style.width = "0px";
      this.$refs.desc.clientWidth;
      this.$refs.desc.style.width = this.descWidth + "px";
      this.$refs.desc.style.transition = "2s 1.5s";
    },
    //计算容器的尺寸
    setSize() {
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight,
      };
      this.imgContainerSize = {
        width: this.$refs.imgContainer.clientWidth,
        height: this.$refs.imgContainer.clientHeight,
      };
    },
    //处理鼠标在carousel-item-container上移动
    handleMousemove(e) {
      const left = this.$refs.container.getBoundingClientRect().left;
      const top = this.$refs.container.getBoundingClientRect().top;
      this.mouseX = e.clientX - left;
      this.mouseY = e.clientY - top;
    },
    //设置imgContainer和container中心重合
    setMouseCenter() {
      this.mouseX = this.mouseCenterPosition.x;
      this.mouseY = this.mouseCenterPosition.y;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.carousel-item-container {
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;
  overflow: hidden;
  .carousel-img {
    width: 110%;
    height: 110%;
    transition: 0.4s;
  }
  .title,
  .desc {
    white-space: nowrap;
    overflow: hidden;
    position: absolute;
    left: 30px;
    letter-spacing: 3px;
    // 文字描边，当图片的背景颜色比较浅时，防止文字看不清
    text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
      0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
    opacity: 0;
  }
  .title {
    font-size: 24px;
    top: calc(50% - 30px);
  }
  .desc {
    color: lighten(@gray, 10%);
    top: calc(50% + 20px);
  }
}
</style>
