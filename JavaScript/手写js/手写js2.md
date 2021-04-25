手写call,apply,bind

## 实现防抖函数（debounce）



> 防抖函数原理：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时

防抖动和节流本质是不一样的。防抖动是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行

> eg. 像仿百度搜索，就应该用防抖，当我连续不断输入时，不会发送请求；当我一段时间内不输入了，才会发送一次请求；如果小于这段时间继续输入的话，时间会重新计算，也不会发送请求。

**手写简化版:**

```js
// func是用户传入需要防抖的函数
// wait是等待时间
const debounce = (func, wait = 50) => {
  // 缓存一个定时器id
  let timer = 0
  // 这里返回的函数是每次用户实际调用的防抖函数
  // 如果已经设定过定时器了就清空上一次的定时器
  // 开始一个新的定时器，延迟执行用户传入的方法
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}
```

**适用场景：**

> 按钮提交场景：防止多次提交按钮，只执行最后提交的一次 服务端验证场景：表单验证需要服务端配合，只执行一段连续的输入事件的最后一次，还有搜索联想词功能类似

## [#](http://interview.poetries.top/docs/handwritten.html#_5-实现instanceof)5 实现instanceOf



思路：

- 步骤1：先取得当前类的原型，当前实例对象的原型链
- 步骤2：一直循环（执行原型链的查找机制）
  - 取得当前实例对象原型链的原型链（`proto = proto.__proto__`，沿着原型链一直向上查找）
  - 如果 当前实例的原型链`__proto__`上找到了当前类的原型`prototype`，则返回 `true`
  - 如果 一直找到`Object.prototype.__proto__ == null`，`Object`的基类(`null`)上面都没找到，则返回 `false`

```js
// 实例.__ptoto__ === 类.prototype
function myInstanceof(example, classFunc) {
    let proto = Object.getPrototypeOf(example);
    while(true) {
        if(proto == null) return false;

        // 在当前实例对象的原型链上，找到了当前类
        if(proto == classFunc.prototype) return true;
        // 沿着原型链__ptoto__一层一层向上查
        proto = Object.getPrototypeof(proto); // 等于proto.__ptoto__
    }
}
```