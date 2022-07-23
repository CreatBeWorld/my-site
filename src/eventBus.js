// const listeners = {}
// export default {
//   //注册事件
//   $on(eventName, handler) {
//     if (!listeners[eventName]) {
//       listeners[eventName] = new Set();
//     }
//     listeners[eventName].add(handler);
//   },
//   //移除事件监听
//   $off(eventName, handler) {
//     if (!eventName && !handler) {
//       //没有提供参数，则移除所有的事件监听器
//       for (const l in listeners) {
//         listeners[l].clear()
//       }
//     }
//     if (eventName && !handler) {
//       //只提供事件，则移除该事件的所有处理函数
//       if (listeners[eventName]) {
//         listeners[eventName].clear();
//       }
//     }
//     if (!listeners[eventName]) {
//       return
//     }
//     listeners[eventName].delete(handler);
//   },
//   //触发事件
//   $emit(eventName, ...args) {
//     if (!listeners[eventName]) {
//       return
//     }
//     for (const handler of listeners[eventName]) {
//       handler(...args);
//     }
//   }
// }
//注：1-38行代码为手动实现eventBus，实践上vue实例已经实现了$on，$emit,$off这三个函数
/*
  事件名:mainScroll,
  含义：主区域滚动条位置变化后触发
  参数：滚动的dom元素，如果是undefined，则表示dom元素已经不存在了

  事件名：scrollTop,
  含义：设置主区域滚动条至指定的位置
  参数：高度
*/
import Vue from "vue";
export default new Vue({})