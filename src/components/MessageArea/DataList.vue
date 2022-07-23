<template>
  <ul class="data-list-container">
    <li v-for="item in list" :key="item.id">
      <Avatar :url="item.avatar" :size="40" />
      <div class="content">
        <div class="name">{{ item.nickname }}</div>
        <div class="comment">{{ item.content }}</div>
        <span>{{ formatDate(item.createDate, true) }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
import Avatar from "@/components/Avatar";
import formatDate from "@/utils/formatDate";
export default {
  name: "DataList",
  components: {
    Avatar,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    formatDate,
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
li {
  padding: 15px 0;
  border-bottom: 1px solid lighten(@gray, 10%);
  display: flex;
  .content {
    margin-left: 15px;
    flex: 1 1 auto;
    position: relative;
    .name {
      color: @success;
      font-size: 18px;
      margin-bottom: 10px;
    }
    span {
      position: absolute;
      top: 8px;
      right: 5px;
      font-size: 12px;
      color: lighten(@lightWords, 10%);
    }
  }
}
</style>
