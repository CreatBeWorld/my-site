import getComponentRootDom from './getComponentRootDom'
import Icon from '@/components/Icon'
import styles from './showMessage.module.less'
/**
 * 弹出消息
 * @param {Object} options 配置对象，该对象共有5个属性，message-消息的内容
 *  type-消息的类型(info-普通 error-错误  success-成功 warn-警告) duration多久后弹出消息框消失；
 *  container-弹出消息框应该加入到哪个容器中;callback-弹窗结束后的回调函数
 */
export default function (options) {
  const message = options.message || ''
  const type = options.type || 'info'
  const duration = options.duration || 2000
  let container = options.container
  const callback = options.callback
  const div = document.createElement('div');
  const iconOutHTML = getComponentRootDom(Icon, {
    type
  }).outerHTML //获取图标组件outHTML
  div.innerHTML = `<span class="${styles.icon}">${iconOutHTML}</span><div>${message}</div>`
  div.className = `${styles.message} ${styles[`message-` + type]}`
  if (!container) {
    container = document.body
  } else {
    if (getComputedStyle(container).position === 'static') {
      container.style.position = 'relative'
    }
  }
  container.appendChild(div)
  //浏览器强行渲染
  div.clientHeight; //导致reflow
  div.style.opacity = "1"
  div.style.transform = "translate(-50%,-50%)";
  //指定时间后，弹窗消失
  setTimeout(() => {
    div.style.opacity = "0"
    div.style.transform = "translate(-50%, -50%) translateY(-25px)"
    div.addEventListener("transitionend", () => {
      div.remove() //移除dom元素
      callback && callback() //调用回调函数
    }, {
      once: true //事件处理函数触发一次后，被移除
    })
  }, duration)

}