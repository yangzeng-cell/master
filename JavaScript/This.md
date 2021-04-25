### This

> 不同情况的调用，`this`指向分别如何。顺带可以提一下 `es6` 中箭头函数没有 `this`, `arguments`, `super` 等，这些只依赖包含箭头函数最接近的函数

> 我们先来看几个函数调用的场景

```js
function foo() {
  console.log(this.a)
}
var a = 1
foo()

const obj = {
  a: 2,
  foo: foo
}
obj.foo()

const c = new foo()
```

- 对于直接调用 `foo` 来说，不管 `foo` 函数被放在了什么地方，`this` 一定是`window`
- 对于 `obj.foo()` 来说，我们只需要记住，谁调用了函数，谁就是 `this`，所以在这个场景下 `foo` 函数中的 `this` 就是 `obj` 对象
- 对于 `new` 的方式来说，`this` 被永远绑定在了 `c` 上面，不会被任何方式改变 `this`

> 说完了以上几种情况，其实很多代码中的 `this` 应该就没什么问题了，下面让我们看看箭头函数中的 `this`

```js
function a() {
  return () => {
    return () => {
      console.log(this)
    }
  }
}
console.log(a()()())
```

- 首先箭头函数其实是没有 `this` 的，箭头函数中的 `this` 只取决包裹箭头函数的第一个普通函数的 `this`。在这个例子中，因为包裹箭头函数的第一个普通函数是 `a`，所以此时的 `this` 是 `window`。另外对箭头函数使用 `bind`这类函数是无效的。
- 最后种情况也就是 `bind` 这些改变上下文的 `API` 了，对于这些函数来说，`this` 取决于第一个参数，如果第一个参数为空，那么就是 `window`。
- 那么说到 `bind`，不知道大家是否考虑过，如果对一个函数进行多次 `bind`，那么上下文会是什么呢？

```js
let a = {}
let fn = function () { console.log(this) }
fn.bind().bind(a)() // => ?
```

> 如果你认为输出结果是 `a`，那么你就错了，其实我们可以把上述代码转换成另一种形式

```js
// fn.bind().bind(a) 等于
let fn2 = function fn1() {
  return function() {
    return fn.apply()
  }.apply(a)
}
fn2()
```

> 可以从上述代码中发现，不管我们给函数 `bind` 几次，`fn` 中的 `this` 永远由第一次 `bind` 决定，所以结果永远是 `window`

```js
let a = { name: 'poetries' }
function foo() {
  console.log(this.name)
}
foo.bind(a)() // => 'poetries'
```

> 以上就是 `this` 的规则了，但是可能会发生多个规则同时出现的情况，这时候不同的规则之间会根据优先级最高的来决定 `this` 最终指向哪里。

> 首先，`new` 的方式优先级最高，接下来是 `bind` 这些函数，然后是 `obj.foo()` 这种调用方式，最后是 `foo` 这种调用方式，同时，箭头函数的 `this` 一旦被绑定，就不会再被任何方式所改变。

![image.png](D:\memo\JavaScript\img\2.png)

**函数执行改变this**

- 由于 JS 的设计原理: 在函数中，可以引用运行环境中的变量。因此就需要一个机制来让我们可以在函数体内部获取当前的运行环境，这便是`this`。

> 因此要明白 `this` 指向，其实就是要搞清楚 函数的运行环境，说人话就是，谁调用了函数。例如

- `obj.fn()`，便是 `obj` 调用了函数，既函数中的 `this === obj`
- `fn()`，这里可以看成 `window.fn()`，因此 `this === window`

> 但这种机制并不完全能满足我们的业务需求，因此提供了三种方式可以手动修改 `this` 的指向:

- `call: fn.call(target, 1, 2)`
- `apply: fn.apply(target, [1, 2])`
- `bind: fn.bind(target)(1,2)`

### apply/call/bind 原理

![img](D:\memo\JavaScript\img\20210414155100.png)

> `call、apply` 和 `bind` 是挂在 `Function` 对象上的三个方法，调用这三个方法的必须是一个函数。

```text
func.call(thisArg, param1, param2, ...)
func.apply(thisArg, [param1,param2,...])
func.bind(thisArg, param1, param2, ...)
```

- 在浏览器里，在全局范围内this 指向window对象；
- 在函数中，this永远指向最后调用他的那个对象；
- 构造函数中，this指向new出来的那个新的对象；
- `call、apply、bind`中的this被强绑定在指定的那个对象上；
- 箭头函数中this比较特殊,箭头函数this为父作用域的this，不是调用时的this.要知道前四种方式,都是调用时确定,也就是动态的,而箭头函数的this指向是静态的,声明的时候就确定了下来；
- `apply、call、bind`都是js给函数内置的一些API，调用他们可以为函数指定this的执行,同时也可以传参。

**方法的应用场景**

> 下面几种应用场景，你多加体会就可以发现它们的理念都是“借用”方法的思路。我们来看看都有哪些。

1. 判断数据类型

> 用 `Object.prototype.toString` 来判断类型是最合适的，借用它我们几乎可以判断所有类型的数据

```js
function getType(obj){
  let type  = typeof obj;
  if (type !== "object") {
    return type;
  }
  return Object.prototype.toString.call(obj).replace(/^$/, '$1');
}
```

1. 类数组借用方法

> 类数组因为不是真正的数组，所有没有数组类型上自带的种种方法，所以我们就可以利用一些方法去借用数组的方法，比如借用数组的 `push` 方法，看下面的一段代码。

```js
var arrayLike = { 
  0: 'java',
  1: 'script',
  length: 2
} 
Array.prototype.push.call(arrayLike, 'jack', 'lily'); 
console.log(typeof arrayLike); // 'object'
console.log(arrayLike);
// {0: "java", 1: "script", 2: "jack", 3: "lily", length: 4}
```

> 用 `call` 的方法来借用 `Array 原型链上的 push` 方法，可以实现一个`类数组的 push` 方法，给 `arrayLike` 添加新的元素

1. 获取数组的最大 / 最小值

> 我们可以用 apply 来实现数组中判断最大 / 最小值，`apply` 直接传递数组作为调用方法的参数，也可以减少一步展开数组，可以直接使用 `Math.max、Math.min` 来获取数组的最大值 / 最小值，请看下面这段代码。

```js
let arr = [13, 6, 10, 11, 16];
const max = Math.max.apply(Math, arr); 
const min = Math.min.apply(Math, arr);
 
console.log(max);  // 16
console.log(min);  // 6
```

**实现一个 bind 函数**

对于实现以下几个函数，可以从几个方面思考

- 不传入第一个参数，那么默认为 `window`
- 改变了 `this` 指向，让新的对象可以执行该函数。那么思路是否可以变成给新的对象添加一个函数，然后在执行完以后删除？

```js
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  var _this = this
  var args = [...arguments].slice(1)
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}
```

**实现一个 call 函数**

```js
Function.prototype.myCall = function (context) {
  var context = context || window
  // 给 context 添加一个属性
  // getValue.call(a, 'pp', '24') => a.fn = getValue
  context.fn = this
  // 将 context 后面的参数取出来
  var args = [...arguments].slice(1)
  // getValue.call(a, 'pp', '24') => a.fn('pp', '24')
  var result = context.fn(...args)
  // 删除 fn
  delete context.fn
  return result
}
```

**实现一个 apply 函数**

```js
Function.prototype.myApply = function(context = window, ...args) {
  // this-->func  context--> obj  args--> 传递过来的参数

  // 在context上加一个唯一值不影响context上的属性
  let key = Symbol('key')
  context[key] = this; // context为调用的上下文,this此处为函数，将这个函数作为context的方法
  // let args = [...arguments].slice(1)   //第一个参数为obj所以删除,伪数组转为数组
  
  let result = context[key](args); // 这里和call传参不一样
  delete context[key]; // 不删除会导致context属性越来越多
  return result;
}
// 使用
function f(a,b){
 console.log(a,b)
 console.log(this.name)
}
let obj={
 name:'张三'
}
f.myApply(obj,[1,2])  //arguments[1]
```