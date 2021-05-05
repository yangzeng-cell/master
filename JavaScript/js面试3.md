## forEach中return有效果吗？如何中断forEach循环？



> 在`forEach`中用`return`不会返回，函数会继续执行。

```js
let nums = [1, 2, 3];
nums.forEach((item, index) => {
  return;//无效
})
```

**中断方法：**

- 使用`try`监视代码块，在需要中断的地方抛出异常。
- 官方推荐方法（替换方法）：用`every`和`some`替代`forEach`函数。`every`在碰到`return false`的时候，中止循环。`some`在碰到`return true`的时候，中止循环

## [#](https://blog.poetries.top/FE-Interview-Questions/excellent-docs/3-JS模块.html#_23-js判断数组中是否包含某个值)23 JS判断数组中是否包含某个值



### [#](https://blog.poetries.top/FE-Interview-Questions/excellent-docs/3-JS模块.html#方法一-array-indexof)方法一：array.indexOf

> 此方法判断数组中是否存在某个值，如果存在，则返回数组元素的下标，否则返回`-1`。

```js
var arr=[1,2,3,4];
var index=arr.indexOf(3);
console.log(index);
```

### [#](https://blog.poetries.top/FE-Interview-Questions/excellent-docs/3-JS模块.html#方法二-array-includes-searcelement-fromindex)方法二：array.includes(searcElement[,fromIndex])

> 此方法判断数组中是否存在某个值，如果存在返回`true`，否则返回`false`

```js
var arr=[1,2,3,4];
if(arr.includes(3))
    console.log("存在");
else
    console.log("不存在");
```

### [#](https://blog.poetries.top/FE-Interview-Questions/excellent-docs/3-JS模块.html#方法三-array-find-callback-thisarg)方法三：array.find(callback[,thisArg])

返回数组中满足条件的第一个元素的值，如果没有，返回`undefined`

```js
var arr=[1,2,3,4];
var result = arr.find(item =>{
    return item > 3
});
console.log(result);
```

### [#](https://blog.poetries.top/FE-Interview-Questions/excellent-docs/3-JS模块.html#方法四-array-findeindex-callback-thisarg)方法四：array.findeIndex(callback[,thisArg])

> 返回数组中满足条件的第一个元素的下标，如果没有找到，返回`-1`

```js
var arr=[1,2,3,4];
var result = arr.findIndex(item =>{
    return item > 3
});
console.log(result);
```

##  JS中浅拷贝的手段有哪些



### [#](https://blog.poetries.top/FE-Interview-Questions/excellent-docs/3-JS模块.html#重要-什么是拷贝)重要: 什么是拷贝？

首先来直观的感受一下什么是拷贝

```js
let arr = [1, 2, 3];
let newArr = arr;
newArr[0] = 100;

console.log(arr);//[100, 2, 3]
```

> 这是直接赋值的情况，不涉及任何拷贝。当改变`newArr`的时候，由于是同一个引用，arr指向的值也跟着改变。

现在进行浅拷贝:

```js
let arr = [1, 2, 3];
let newArr = arr.slice();
newArr[0] = 100;

console.log(arr);//[1, 2, 3]
```

> 当修改newArr的时候，arr的值并不改变。什么原因?因为这里newArr是arr浅拷贝后的结果，newArr和arr现在引用的已经不是同一块空间啦！

这就是浅拷贝！

但是这又会带来一个潜在的问题:

```js
let arr = [1, 2, {val: 4}];
let newArr = arr.slice();
newArr[2].val = 1000;

console.log(arr);//[ 1, 2, { val: 1000 } ]
```

不是已经不是同一块空间的引用了吗？为什么改变了newArr改变了第二个元素的val值，arr也跟着变了。

> 这就是浅拷贝的限制所在了。它只能拷贝一层对象。如果有对象的嵌套，那么浅拷贝将无能为力。但幸运的是，深拷贝就是为了解决这个问题而生的，它能

解决无限极的对象嵌套问题，实现彻底的拷贝。当然，这是我们下一篇的重点。 现在先让大家有一个基本的概念。

接下来，我们来研究一下JS中实现浅拷贝到底有多少种方式？

### [#](https://blog.poetries.top/FE-Interview-Questions/excellent-docs/3-JS模块.html#_1-手动实现)1. 手动实现

```js
const shallowClone = (target) => {
  if (typeof target === 'object' && target !== null) {
    const cloneTarget = Array.isArray(target) ? []: {};
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
          cloneTarget[prop] = target[prop];
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}
```

### [#](https://blog.poetries.top/FE-Interview-Questions/excellent-docs/3-JS模块.html#_2-object-assign)2. Object.assign

> 但是需要注意的是，`Object.assgin()` 拷贝的是对象的属性的引用，而不是对象本身。

```js
let obj = { name: 'sy', age: 18 };
const obj2 = Object.assign({}, obj, {name: 'sss'});
console.log(obj2);//{ name: 'sss', age: 18 }
```

### [#](https://blog.poetries.top/FE-Interview-Questions/excellent-docs/3-JS模块.html#_3-concat浅拷贝数组)3. concat浅拷贝数组

```js
let arr = [1, 2, 3];
let newArr = arr.concat();
newArr[1] = 100;
console.log(arr);//[ 1, 2, 3 ]
```

### [#](https://blog.poetries.top/FE-Interview-Questions/excellent-docs/3-JS模块.html#_4-slice浅拷贝)4. slice浅拷贝

开头的例子

### [#](https://blog.poetries.top/FE-Interview-Questions/excellent-docs/3-JS模块.html#_5-展开运算符)5. ...展开运算符

```js
let arr = [1, 2, 3];
let newArr = [...arr];//跟arr.slice()是一样的效果
```

## [#](https://blog.poetries.top/FE-Interview-Questions/excellent-docs/3-JS模块.html#_26-数组-array)26 数组(array)



- `map`: 遍历数组，返回回调返回值组成的新数组
- `forEach`: 无法`break`，可以用`try/catch`中`throw new Error`来停止
- `filter`: 过滤
- `some`: 有一项返回`true`，则整体为`true`
- `every`: 有一项返回`false`，则整体为`false`
- `join`: 通过指定连接符生成字符串
- `push / pop`: 末尾推入和弹出，改变原数组， 返回推入/弹出项
- `unshift / shift`: 头部推入和弹出，改变原数组，返回操作项
- `sort(fn) / reverse`: 排序与反转，改变原数组
- `concat`: 连接数组，不影响原数组， 浅拷贝
- `slice(start, end)`: 返回截断后的新数组，不改变原数组
- `splice(start, number, value...)`: 返回删除元素组成的数组，`value`为插入项，改变原数组
- `indexOf / lastIndexOf(value, fromIndex)`: 查找数组项，返回对应的下标
- `reduce / reduceRight(fn(prev, cur)`， `defaultPrev)`: 两两执行，`prev` 为上次化简函数的`return`值，`cur`为当前值(从第二项开始)

**数组乱序：**

```js
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
arr.sort(function () {
    return Math.random() - 0.5;
});
```

**数组拆解: flat: [1,[2,3]] --> [1, 2, 3]**

```js
Array.prototype.flat = function() {
    this.toString().split(',').map(item => +item )
}
```

## 谈谈你对for in/for of的理解



> `for in`性能很差，迭代当前对象中可枚举的属性，并且一直查找到原型上去。

- 问题1：遍历顺序数字优先
- 问题2：无法遍历`symbol`属性
- 问题3：可以遍历到原型属性中可枚举的

```js
let obj = {
  name: 'poetry',
  age: 22,
  [Symbol('aa')]: 100,
  0: 200,
  1: 300
}
```

![img](http://img-repo.poetries.top/images/20210320102041.png) ![img](http://img-repo.poetries.top/images/20210320103701.png)

```js
for(let key in obj) {
  // 不遍历原型上的属性
  if(!obj.hasOwnProperty(key)) {
    break;
  }
}
```

**遍历obj的私有属性拼接**

```js
let keys = Object.keys(obj)
keys = keys.concat(Object.getOwnPropertySymbols(obj1))
keys.forEach(v=>{
  console.log(v)
})
```

**for of**

- 部分数据结构实现了迭代器规范
  - `Symbol.itertor`
  - `数组/set/map`
  - 对象没有实现，`for of`不能遍历对象

```js
// 数组具备迭代器规范，模拟实现
var arr = [1,2,3,4,5]

arr[Symbol.iterator] = function() {
  let self = this, index = 0;

  return {
    next() {
      if(index > self.length - 1) {
        return {
          done: true,
          value: undefined
        }
      }
      return {
        done: false,
        value: self[index++]
      }
    }
  }
}
// 使对象具备可迭代特性
let obj = {
  0: 100,
  1: 200,
  length: 2
}

obj[Symbol.iterator] = Array.prototype[Symbol.iterator]

for(var val of obj) {
  console.log(val)
}
```

## [#](https://blog.poetries.top/FE-Interview-Questions/excellent-docs/3-JS模块.html#_31-数组相关)31 数组相关



### [#](https://blog.poetries.top/FE-Interview-Questions/excellent-docs/3-JS模块.html#array-3-和array-3-4-的区别)Array(3)和Array(3, 4)的区别？

```javascript
console.log(Array(3)) // [empty x 3]
console.log(Array(3, 4)) // [3, 4]
```

### [#](https://blog.poetries.top/FE-Interview-Questions/excellent-docs/3-JS模块.html#请创建一个长度为100-值都为1的数组)请创建一个长度为100，值都为1的数组

```javascript
new Array(100).fill(1)
```

### [#](https://blog.poetries.top/FE-Interview-Questions/excellent-docs/3-JS模块.html#请创建一个长度为100-值为对应下标的数组)请创建一个长度为100，值为对应下标的数组

```javascript
// cool的写法：
[...Array(100).keys()]

// 其他方法：
Array(100).join(",").split(",").map((v, i) => i)
Array(100).fill().map((v, i) => i)
```

## [#](https://blog.poetries.top/FE-Interview-Questions/excellent-docs/3-JS模块.html#_32-setinterval存在哪些问题)32 setInterval存在哪些问题？



> `JavaScript`中使用 `setInterval` 开启轮询。定时器代码可能在代码再次被添加到队列之前还没有完成执行，结果导致定时器代码连续运行好几次，而之间没有任何停顿。而javascript引擎对这个问题的解决是：当使用`setInterval()`时，仅当没有该定时器的任何其他代码实例时，才将定时器代码添加到队列中。这确保了定时器代码加入到队列中的最小时间间隔为指定间隔。

但是，这样会导致两个问题：

- 某些间隔被跳过；
- 多个定时器的代码执行之间的间隔可能比预期的小

## [#](https://blog.poetries.top/FE-Interview-Questions/excellent-docs/3-JS模块.html#_33-链式调用settimeout对比setinterval)33 链式调用setTimeout对比setInterval



在上一题中也说到了`setInterval`本身是会存在一些问题的。而使用链式调用`setTimeout`这种方式会比它好一些：

```javascript
setTimeout(function fn(){
    console.log('我是setTimeout');
    setTimeout(fn, 1000);
},1000);
```

这个模式链式调用了`setTimeout()`，每次函数执行的时候都会创建一个新的定时器。第二个`setTimeout()`调用当前执行的函数，并为其设置另外一个定时器。这样做的好处是：

- 在前一个定时器代码执行完之前，不会向队列插入新的定时器代码，确保不会有任何缺失的间隔。
- 而且，它可以保证在下一次定时器代码执行之前，至少要等待指定的间隔，避免了连续的运行。