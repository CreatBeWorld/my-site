<template>
  <div class="blog-toc-container">
    <h2 class="title">目录</h2>
    <RightList :lists="lists" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "../RightList";
import { debounce } from "@/utils";
export default {
  name: "BlogTOC",
  props: {
    toc: {
      type: Array,
    },
  },
  data() {
    return {
      activeAnchor: "",
    };
  },
  computed: {
    //路由信息
    routeInfo() {
      return {
        id: this.$route.params.id,
        hash: !this.$route.hash ? "" : this.$route.hash.substring(1),
      };
    },
    //RightList组件属性
    lists() {
      //注释部分的代码不行，修改this.toc数组里面的成员（没有报错，this.toc的每一个成员是一个对象，修改对象的属性不报错）
      //但是this.toc[i].children不是重新生成的，所以在RightList组件重新渲染时，不会使用修改之后的this.toc[i].children,而是使用之前的this.toc[i].children
      // const tocLists = [...this.toc];
      // const deepTransfer = (lists) => {
      //   lists.forEach((l) => {
      //     l.isSelected = l.anchor === this.activeAnchor;
      //     l.children && deepTransfer(l.children);
      //   });
      // };
      // deepTransfer(tocLists);
      // console.log(tocLists);
      // return tocLists;
      // //递归设置isSelected属性
      const deep = (lists = []) => {
        return lists.map((l) => ({
          ...l,
          isSelected: l.anchor === this.activeAnchor,
          children: deep(l.children),
        }));
      };
      return deep(this.toc);
    },
    //RightList中每个标题对应的dom元素所组成的数组
    doms() {
      const doms = [];
      const deepGetDom = (tocLists) => {
        tocLists.forEach((l) => {
          doms.push(document.getElementById(l.anchor));
          l.children && l.children.length > 0 && deepGetDom(l.children);
        });
      };
      deepGetDom(this.toc);
      return doms;
    },
  },
  components: {
    RightList,
  },
  created() {
    this.debounce = debounce(this.setSelect, 50);
    this.$eventBus.$on("mainScroll", this.debounce);
  },
  destroyed() {
    this.$eventBus.$off("mainScroll", this.debounce);
  },
  methods: {
    handleSelect(item) {
      location.hash = item.anchor;
    },
    setSelect(dom) {
      if (!dom) {
        return;
      }
      this.activeAnchor = ""; //清空之前的状态
      const range = 200;
      for (const dom of this.doms) {
        if (!dom) {
          //dom为null时，跳过当前循环
          continue;
        }
        const top = dom.getBoundingClientRect().top;
        if (0 <= top && top <= range) {
          //0<=top<=range时，直接设置this.activeAnchor
          this.activeAnchor = dom.id;
          return;
        } else if (top > range) {
          return;
        } else {
          this.activeAnchor = dom.id;
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.blog-toc-container {
  padding: 20px;
  .title {
    margin-bottom: 15px;
  }
}
</style>
