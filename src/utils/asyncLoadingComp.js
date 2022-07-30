import "nprogress/nprogress.css";
import { start, done, configure } from "nprogress";
configure({
  showSpinner: false,
  trickle: true,
  trickleSpeed: 20,
});
function delay(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}
export default function asyncLoadingComp(asyncCompResolver) {
//  Vue 只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染
  return async () => {
    start();
    if (process.env.NODE_ENV === "development") {
      await delay(1000); //模拟等待效果
    }
    const comp = await asyncCompResolver();
    done();
    return comp;
  };
}
