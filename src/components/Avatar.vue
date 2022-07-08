<template>
  <img
    class="avatar-container"
    :src="url"
    :style="{ width: size + 'px', height: size + 'px' }"
  />
</template>

<script>
export default {
  name: "Avatar", //组件在注册的时候没有指定名字时，则使用该名字（vue-devtools中组件名以该值显示）
  props: {
    url: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 150, //头像的默认尺寸为150px
    },
  },
};
</script>

<style scoped>
/* 带有作用域的样式 */
.avatar-container {
  border-radius: 50%;
  object-fit: cover;
  display: block;
}
</style>
