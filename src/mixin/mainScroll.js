/**
 *对主区域滚动条滚动事件的注册、移除以及处理 
 *对主区域滚动条滚动至定指定高度的注册以及处理
 */
export default function (refString) {
  return {
    mounted() {
      this.$refs[refString].addEventListener("scroll", this.handleScroll);
      this.$eventBus.$on("scrollTop", this.handleScrollTop);
    },
    //注意destroyed钩子函数中无法拿到this.$refs.container (undefind)
    beforeDestroy() {
      this.$refs[refString].removeEventListener("scroll", this.handleScroll);
      this.$eventBus.$off("scrollTop", this.handleScrollTop);
      //组件销毁前通知所有注册了mainScroll事件的组件进行相应的处理
      this.$eventBus.$emit("mainScroll")
    },
    methods: {
      handleScroll() {
        //触发mainScroll事件
        this.$eventBus.$emit("mainScroll", this.$refs[refString]);
      },
      //滚动条滚动至指定的位置
      handleScrollTop(height) {
        this.$refs[refString].scrollTop = height;
      },
    }

  }

}