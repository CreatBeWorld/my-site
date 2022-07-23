export default (func, duration=100) => {
  let timerId=null;
  return (...args) => {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      func(...args)
    }, duration);
  }
}