<template>
  <div
    class="home-container"
    ref="container"
    @wheel="handleWheel"
    v-loading="isLoading"
  >
    <ul
      v-if="remoteData.length > 0"
      class="carousel-container"
      :style="{ marginTop }"
      @transitionend="handleTransitionEnd"
    >
      <li v-for="item in remoteData" :key="item.id">
        <CarouselItem :carousel="item" />
      </li>
    </ul>
    <div class="icon icon-up" v-show="index > 0" @click="switchTo(index - 1)">
      <Icon type="arrowUp" />
    </div>
    <div
      class="icon icon-down"
      v-show="index < remoteData.length - 1"
      @click="switchTo(index + 1)"
    >
      <Icon type="arrowDown" />
    </div>
    <ul class="indicator-container">
      <li
        @click="switchTo(i)"
        v-for="(item, i) in remoteData"
        :key="item.id"
        :class="{ active: i === index }"
      ></li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CarouselItem from "./CarouselItem";
import Icon from "@/components/Icon";
export default {
  name: "Home",
  components: {
    CarouselItem,
    Icon,
  },
  data() {
    return {
      index: 0, //当前显示的图片的索引
      containerHeight: 0, //.home-container的高度
      switching: false, //是否正在切换,
    };
  },
  created() {
    this.$store.dispatch("banner/getBanner");
  },
  computed: {
    marginTop() {
      return -this.index * this.containerHeight + "px";
    },
    ...mapState("banner", ["isLoading", "remoteData"]),
  },
  mounted() {
    this.containerHeight = this.$refs.container.clientHeight;
    window.addEventListener("resize", this.handleResize);
  },
  methods: {
    switchTo(i) {
      this.index = i;
    },
    //处理鼠标滚轮
    handleWheel(e) {
      if (this.switching) {
        return; //正在切换则返回
      }
      if (e.deltaY >= 5 && this.index < this.remoteData.length - 1) {
        this.switching = true;
        this.switchTo(this.index + 1);
      } else if (e.deltaY <= -5 && this.index > 0) {
        this.switching = true;
        this.switchTo(this.index - 1);
      }
    },
    //ul过渡效果结束处理函数
    handleTransitionEnd() {
      this.switching = false;
    },
    //处理窗口尺寸变化
    handleResize() {
      this.containerHeight = this.$refs.container.clientHeight;
    },
  },
  //组件销毁时，移除窗口的resize事件的处理函数
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/mixins.less";
@import "~@/styles/var.less";
.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  // overflow: hidden;
  //解决外边距塌陷(父元素的外边距为0，子元素外边距为负数，则最后父元素的外边距取两者外边距之和（外边距一正（0也看做一正）一负）)
  overflow: hidden;
  .carousel-container {
    transition: 0.5s;
    height: 100%;
    li {
      height: 100%;
    }
  }
  .icon {
    .self-center();
    color: @gray;
    font-size: 20px;
    transform: translateX(-50%);
    @iconGap: 25px;
    transition: 0.5s;
    cursor: pointer;
    &.icon-up {
      top: @iconGap;
      animation: jump-up 2s infinite;
    }
    &.icon-down {
      top: auto;
      bottom: @iconGap;
      animation: jump-down 2s infinite;
    }
    @jumpHeight: 5px;
    @keyframes jump-up {
      0% {
        transform: translateX(-50%) translateY(-@jumpHeight);
      }
      50% {
        transform: translateX(-50%) translateY(@jumpHeight);
      }
      100% {
        transform: translateX(-50%) translateY(-@jumpHeight);
      }
    }
    @keyframes jump-down {
      0% {
        transform: translateX(-50%) translateY(@jumpHeight);
      }
      50% {
        transform: translateX(-50%) translateY(-@jumpHeight);
      }
      100% {
        transform: translateX(-50%) translateY(@jumpHeight);
      }
    }
  }
  .indicator-container {
    .self-center();
    left: auto;
    right: 15px;
    transform: translateY(-50%);
    li {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: @dark;
      border: 1px solid #fff;
      margin-bottom: 7px;
      cursor: pointer;
      &.active {
        background-color: @gray;
      }
    }
  }
}
</style>
