<template>
  <ul class="menu-container">
    <li v-for="item in menuItems" :key="item.link">
      <a :href="item.link" :class="{ selected: isSelected(item) }">
        <Icon :type="item.icon" />
        <span>{{ item.name }}</span>
      </a>
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
          name: "首页",
          link: "/",
          icon: "home",
        },
        {
          name: "文章",
          link: "/blog",
          icon: "blog",
          startsWith:true,//路径是否已link开头
        },
        {
          name: "关于我",
          link: "/about",
          icon: "about",
        },
        {
          name: "项目&效果",
          link: "/project",
          icon: "code",
        },
        {
          name: "留言板",
          link: "/message",
          icon: "chat",
        },
      ],
    };
  },
  methods: {
    isSelected(item) {
      const link = item.link.toLowerCase()
      const currentPath = location.pathname.toLowerCase();//当前的访问路径
      if (item.startsWith) {
        return currentPath.startsWith(link);
      } else {
        return link === currentPath;
      }
    },
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
      background-color: darken(@words,6%);
      color: #fff;
    }
    span {
      margin-left: 6px;
    }
  }
}
</style>
