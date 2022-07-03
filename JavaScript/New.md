new 关键词的`主要作用就是执行一个构造函数、返回一个实例对象`

new关键字的执行步骤：

​	创建一个新对象

​	把对象连接到构造函数的原型链上，并绑定this。(this指向新对象)

​	执行构造函数

​	返回这个新的对象

在第四步返回新对象这边有一个情况会例外：

> 那么问题来了，如果不用 `new` 这个关键词，结合上面的代码改造一下，去掉 `new`，会发生什么样的变化呢？我们再来看下面这段代码

```js
function Person(){
  this.name = 'Jack';
}
var p = Person();
console.log(p) // undefined
console.log(name) // Jack
console.log(p.name) // 'name' of undefined
```

- 从上面的代码中可以看到，我们没有使用 `new` 这个关键词，返回的结果就是 `undefined`。其中由于 `JavaScript` 代码在默认情况下 `this` 的指向是 `window`，那么 `name` 的输出结果就为 `Jack`，这是一种不存在 `new` 关键词的情况。

  

- 那么当构造函数中有 `return` 一个对象的操作，结果又会是什么样子呢？我们再来看一段在上面的基础上改造过的代码。

```js
function Person(){
   this.name = 'Jack'; 
   return {age: 18}
}
var p = new Person(); 
console.log(p)  // {age: 18}
console.log(p.name) // undefined
console.log(p.age) // 18
```

> 通过这段代码又可以看出，当构造函数最后 `return` 出来的是一个和 `this` 无关的对象时，`new 命令会直接返回这个新对象`，`而不是通过 new 执行步骤生成的 this 对象`

但是这里要求构造函数必须是返回一个对象，`如果返回的不是对象，那么还是会按照 new 的实现步骤，返回新生成的对象`。接下来还是在上面这段代码的基础之上稍微改动一下

```js
function Person(){
   this.name = 'Jack'; 
   return 'tom';
}
var p = new Person(); 
console.log(p)  // {name: 'Jack'}
console.log(p.name) // Jack
```

可以看出，当构造函数中 `return` 的不是一个对象时，那么它还是会根据 `new` 关键词的执行逻辑，生成一个新的对象（绑定了最新 `this`），最后返回出来

> 因此我们总结一下：`new 关键词执行之后总是会返回一个对象，要么是实例对象，要么是 return 语句指定的对象`

**手工实现New的过程**

```js
function create(fn, ...args) {
  if(typeof fn !== 'function') {
    throw 'fn must be a function';
  }
	// 1、用new Object() 的方式新建了一个对象obj
  var obj = new Object(),
	// 2、给该对象的__proto__赋值为fn.prototype，即设置原型链
  obj.__proto__ = Object.create(fn.prototype);
	// 3、执行fn，并将obj作为内部this。使用 apply，改变构造函数 this 的指向到新建的对象，这样 obj 就可以访问到构造函数中的属性
  var res = fn.apply(obj, args);
	// 4、如果fn有返回值，则将其作为new操作返回内容，否则返回obj
	return res instanceof Object ? res : obj;
};
```

测试

```js
//使用create代替new
function Person() {...}
// 使用内置函数new
var person = new Person(1,2)

// 使用手写的new，即create
var person = create(Person, 1,2)
```

**new 被调用后大致做了哪几件事情**

- 让实例可以访问到私有属性；
- 让实例可以访问构造函数原型（`constructor.prototype`）所在原型链上的属性；
- 构造函数返回的最后结果是引用数据类型。