function hydebounce(fn, delay, immediate = false) {
  let timer = null
  let isInvoke = false

  const newFn = function(...args) {
    return new Promise((resolve, reject) => {
      if (timer) clearTimeout(timer)

      let res = null
      if (immediate && !isInvoke) {
        res = fn.apply(this, args)
        isInvoke = true
      } else {
        timer = setTimeout(() => {
          res = fn.apply(this, args)
          isInvoke = false
          timer = null
        }, delay);
      }

      resolve(res)
    })
  }

  newFn.cancel = function() {
    if (timer) clearTimeout(timer)
    timer = null
    isInvoke = false
  }

  return newFn
}