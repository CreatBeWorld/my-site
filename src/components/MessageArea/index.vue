<template>
  <div class="message-area-container">
    <DataForm v-on="$listeners" />
    <h2 class="title">
      {{ title }}
      <span>{{subTitle}}</span>
    </h2>
    <DataList :list="list" />
    <div class="loading" v-loading="isListLoading"></div>
  </div>
</template>

<script>
import DataForm from "./DataForm.vue";
import DataList from "./DataList.vue";
export default {
  name: "MessageArea",
  props: {
    title: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
      default: () => [],
    },
    isListLoading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    DataForm,
    DataList,
  },
};
</script>

<style scoped lang="less">
.title {
  padding: 30px 0 10px 0;
}
.loading{
  position:relative;
}
</style>
