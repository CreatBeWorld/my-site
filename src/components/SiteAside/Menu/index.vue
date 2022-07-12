<template>
  <ul class="menu-container">
    <li v-for="item in menuItems" :key="item.name">
      <!-- :to="{ name: item.name }"根据对应的路由名找到对应的路由path,并把path的值替换{} -->
      <RouterLink
        :to="{ name: item.name }"
        :exact="item.exact"
        active-class="selected"
        exact-active-class=""
      >
        <Icon :type="item.icon" />
        <span>{{ item.title }}</span>
      </RouterLink>
    </li>
  </ul>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  name: "Menu",
  components: {
    Icon,
  },
  data() {
    return {
      menuItems: [
        {
          title: "首页",
          name: "Home",
          icon: "home",
          exact: true,
        },
        {
          title: "文章",
          name: "Blog",
          icon: "blog",
          exact: false, //当前路径和导航路径是否需要精确匹配才能添加类名.router-link-active
        },
        {
          title: "关于我",
          name: "About",
          icon: "about",
          exact: true,
        },
        {
          title: "项目&效果",
          name: "Project",
          icon: "code",
          exact: true,
        },
        {
          title: "留言板",
          name: "Message",
          icon: "chat",
          exact: true,
        },
      ],
    };
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.menu-container {
  width: 100%;
  color: @lightWords;
  a {
    display: block;
    padding: 8px 40px;
    &:hover {
      color: #fff;
    }
    &.selected {
      background-color: darken(@words, 6%);
      color: #fff;
    }
    span {
      margin-left: 6px;
    }
  }
}
</style>
