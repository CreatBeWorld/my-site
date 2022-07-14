import Vue from 'vue'
import App from './App.vue'
import "@/styles/global.less"
import router from './router'
import showMessage from './utils/showMessage'
Vue.prototype.$showMessage = showMessage
import "./mock"
//全局注册指令
import loading from "@/directives/loading/loading";
Vue.directive("loading",loading)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')