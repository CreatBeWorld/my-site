//该指令用于实现图片的懒加载
import defaultGif from "@/assets/default.gif";
import eventBus from "@/eventBus";
import {
  debounce
} from "@/utils"
let images = [];

function setImage(img) {
  img.dom.src = defaultGif
  //该图片是否在视口范围内
  const viewPortHeight = document.documentElement.clientHeight
  const rect = img.dom.getBoundingClientRect()
  const imgHeight = rect.height || 120
  if (rect.top >= -imgHeight && rect.top <= viewPortHeight) {
    //在视口范围加载真实图片
    img.dom.src = img.src
    //从images数组中移除已加载或正在加载真实图片的img数据
    images = images.filter(i => i !== img)
  }
}

function handleScroll() {
  for (const img of images) {
    setImage(img)
  }
}
eventBus.$on("mainScroll", debounce(handleScroll, 50))
export default {
  inserted(el, binding) {
    const img = {
      dom: el,
      src: binding.value
    }
    images.push(img)
    //设置图片
    setImage(img)
  },
  //指令与元素解绑时，从images数组中移除绑定的图片
  unbind(el) {
    images = images.filter(img => img.dom !== el)
  }
}