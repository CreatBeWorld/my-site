import loadingUrl from "@/assets/loading.svg";
import styles from './loading.module.less';

function getLoadingImg(el) {
  return el.querySelector("img[data-role=loading]")
}

function createLoadingImg(el) {
  const loadingImg = document.createElement("img")
  loadingImg.src = loadingUrl
  loadingImg.classList.add(styles.loading)
  loadingImg.dataset.role = "loading";
  el.appendChild(loadingImg)
}
export default function (el, binding) {
  const loadingImg = getLoadingImg(el)
  if (binding.value) {
    !loadingImg&&createLoadingImg(el)
  } else {
    loadingImg && loadingImg.remove()
  }
}