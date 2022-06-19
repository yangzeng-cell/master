function debounce(fn, delay, immediate = false) {
  let timer = null;
  let isInvoke = false;
  let _debounce = function (...args) {
    return new Promise((resolve, reject) => {
      if (timer) clearTimeout(timer);
      if (!isInvoke && immediate) {
        const result = fn.apply(this, args);
        resolve(result);
        // callback(result);
        isInvoke = true;
      } else {
        timer = setTimeout(() => {
          const result = fn.apply(this, args);
          // callback(result);
          resolve(result);
          isInvoke = false;
        }, delay);
      }
    });
  };
  _debounce.cancel = function () {
    if (timer) clearTimeout(timer);
    timer = null;
    isInvoke = false;
  };
  return _debounce;
}

function debounce1(fn, delay) {
  let timer = null;
  return function (...arg) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, arg);
      timer = null;
    }, delay);
  };
}
