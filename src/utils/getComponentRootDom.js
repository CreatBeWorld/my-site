import Vue from 'vue';
/**
 * 获取组件渲染的Dom根元素
 * @param {Component} comp 组件对象 
 * @param {Object} props 组件的属性对象  {type:'home'}如其中某个组件具有type属性
 */
  export default function(comp, props) {
    const vm = new Vue({
      render: h => h(comp, {
        props
      })
    })
    vm.$mount();
    return vm.$el;
  }