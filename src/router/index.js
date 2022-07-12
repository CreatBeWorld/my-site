import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes'
//安装插件(安装VueRouter插件时会全局注册RouterView组件)
Vue.use(VueRouter)
const router = new VueRouter({
  routes,//配置路由规则
  mode:'history',//配置路由模式
})
export default router
