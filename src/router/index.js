import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { titleController } from "@/utils";
//安装插件(安装VueRouter插件时会全局注册RouterView、RouterLink组件)
if (!window.VueRouter) {
  //生产环境中无需手动安装VueRouter,因为使用传统的方式引入的话会自动成为vue插件
  Vue.use(VueRouter);
}
const router = new VueRouter({
  routes, //配置路由规则
  mode: "history", //配置路由模式
  base: "/",
});
//路由确认之后，执行钩子函数
router.afterEach((to) => {
  if (to.meta.title) {
    titleController.setRouteTitle(to.meta.title);
  }
});
export default router;
