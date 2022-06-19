function throttle(fn, interval, options = { leading: true, trailing: false }) {
  let lastTime = 0;
  let timer = null;
  let { leading, trailing, callback } = options;
  const _throttle = function (...args) {
    let nowTime = new Date().getTime();
    if (!lastTime && !leading) lastTime = nowTime;
    let duration = interval - (nowTime - lastTime);
    if (duration <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      const result = fn.apply(this, args);
      callback(result);
      lastTime = nowTime;
    }
    if (trailing && !timer) {
      timer = setTimeout(() => {
        const result = fn.apply(this, args);
        callback(result);
        timer = null;
        lastTime = leading ? 0 : new Date().getTime();
      }, duration);
    }
  };
  _throttle.cancel = function () {
    lastTime = leading ? 0 : new Date().getTime();
    if (timer) clearTimeout(timer);
    timer = null;
  };
  return _throttle;
}

function throttle(fn, interval) {
  let lastTime = 0;
  return function (...arg) {
    let nowTime = new Date().getTime();
    if (nowTime - lastTime >= interval) {
      fn.apply(this, arg);
      lastTime = nowTime;
    }
  };
}
