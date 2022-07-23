<template>
  <ul class="right-list-container" ref="container">
    <li v-for="(item, i) in lists" :key="i">
      <div :class="{ 'set-display': item.aside }" class="set-normal">
        <span
          :class="{ active: item.isSelected }"
          @click="handleClick(item)"
          class="title"
        >
          {{ item.name }}
        </span>
        <span
          class="aside"
          v-if="item.aside"
          @click="handleClick(item)"
          :class="{ active: item.isSelected }"
        >
          {{ item.aside }}
        </span>
      </div>
      <RightList
        v-if="item.children && item.children.length > 0"
        :lists="item.children"
        @select="handleClick"
      />
    </li>
  </ul>
</template>

<script>
export default {
  name: "RightList", //允许组件模板递归地调用自身
  //lists:[{title:'',isSelected:true,children:[]}]
  props: {
    lists: {
      type: Array,
      default: () => [], //注意默认值为数组或对象时，需要用一函数返回
    },
  },
  methods: {
    handleClick(item) {
      !item.isSelected && this.$emit("select", item);
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.right-list-container {
  li {
    min-height: 30px;
    line-height: 30px;
    .right-list-container {
      margin-left: 1em;
    }
    span {
      cursor: pointer;
      &.aside {
        font-size: 12px;
        color: @gray;
      }
      &.active {
        color: @warn;
        font-weight: bold;
      }
    }
    .set-display {
      display: flex;
      span {
        &.title {
          width: 80px;
        }
        &.aside {
          width: 80px;
        }
      }
    }
    .set-normal {
      margin-bottom: 5px;
    }
  }
}
</style>
