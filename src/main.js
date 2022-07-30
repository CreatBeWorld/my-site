import Vue from 'vue'
import App from './App.vue'
import "@/styles/global.less"
import router from './router'
import showMessage from './utils/showMessage'
Vue.prototype.$showMessage = showMessage
import "./mock"
//全局注册指令
import loading from "@/directives/loading/loading";
Vue.directive("loading", loading)
import lazy from "@/directives/lazy/lazy"
Vue.directive("lazy", lazy)
//时间总线
import eventBus from "./eventBus"
Vue.prototype.$eventBus = eventBus
//Vuex
import store from "./store";
//请求全局设置数据
store.dispatch("setting/getSetting")

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')