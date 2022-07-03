```
function getData() {
	return new Promise((resolve, reject) => {
	  setTimeout(resolve('hello'), 2000)
	})
}
getData().then(res => {
  console.log(res)
})
// 立马输出 hello

```

```
function getData() {
	return new Promise((resolve, reject) => {
	  setTimeout(resolve('hello'), 2000)
	})
}
getData().then(res => {
  console.log(res)
})
// 立马输出 hello

```

其实呢，这个差异就是 func() 和 func 的区别，setTimeout 的第一个参数是 func，如果用 func() 相当于其返回值为第一个参数。

这个地方应该是一个函数 func ，如果你传的是 func() ，代码解析器执行到此处的时候，就会立即执行这个函数，起不到延时的效果了。


## 实现一个 sleep 函数

```
/ 1s 后执行的代码
const sleep = (time) => {
  return new Promise(resolve => setTimeout(resolve, time))
}

sleep(1000).then(() => {
  // 这里写你的操作
})
```

```
// 代码延时
const sleep = (time) => {
  return new Promise(resolve => setTimeout(resolve, time))
}

async function sleepAsync() {
  console.log('1')
  let res = await sleep(1000)
  console.log('2')
  return res
}

sleepAsync()
```

