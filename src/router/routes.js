import {asyncLoadingComp} from "@/utils"
//路由匹配规则
export default [
  {
    path: "/",
    redirect: {
      name: "Home"
    }
  },
  {
    path: "/home",
    component: asyncLoadingComp(()=>import(/* webpackChunkName: "home" */ "@/views/Home")),//路由懒加载，需要用到该路由时，再去加载该组件(页面分包)
    name: "Home",
    meta: {
      title: "首页",
    },
  },
  {
    path: "/about",
    component: asyncLoadingComp(()=>import(/* webpackChunkName: "about" */ "@/views/About")), //动态导入，返回一个promise，promise完成之后得到一个组件
    name: "About", //设置路由名字
    meta: {
      title: "关于我",
    },
  },
  {
    path: "/article",
    component: asyncLoadingComp(()=>import(/* webpackChunkName: "blog" */ "@/views/Blog")),
    name: "Blog",
    meta: {
      title: "文章",
    },
  },
  {
    path: "/article/cate/:categoryId", //动态路由，其中变化的部分被称为params
    component: asyncLoadingComp(()=>import(/* webpackChunkName: "blog" */"@/views/Blog")),
    name: "CategoryBlog",
    meta: {
      title: "文章",
    },
  },
  {
    path: "/message",
    component: asyncLoadingComp(()=>import(/* webpackChunkName: "message" */"@/views/Message")),
    name: "Message",
    meta: {
      title: "留言板",
    },
  },
  {
    path: "/project",
    component: asyncLoadingComp(()=>import(/* webpackChunkName: "project" */"@/views/Project")),
    name: "Project",
    meta: {
      title: "项目&效果",
    },
  },
  {
    path: "/article/:id",
    name: "BlogDetail",
    component: asyncLoadingComp(()=>import(/* webpackChunkName: "blogDetail" */"@/views/Blog/BlogDetail")),
    meta: {
      title: "文章详情",
    },
  },
  {
    path: "*",//通配符，上述组件没有匹配到则使用该组件
    name: "NotFound",
    component:()=>import("@/components/NotFound")
  }
];
