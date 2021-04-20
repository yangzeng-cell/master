### 变量提升

var会出现变量提升，let和const都不会，函数的优先级会高于var.

### 执行上下文

> 当执行 JS 代码时，会产生三种执行上下文

- 全局执行上下文

- 函数执行上下文

- `eval` 执行上下文

  > 每个执行上下文中都有三个重要的属性

  - 变量对象（`VO`），包含变量、函数声明和函数的形参，该属性只能在全局上下文中访问
  - 作用域链（`JS` 采用词法作用域，也就是说变量的作用域是在定义时就决定了）
  - `this`

### 作用域

> 作用域可以理解为变量的可访问性，总共分为三种类型，分别为：

- 全局作用域
- 函数作用域
- 块级作用域，ES6 中的 `let`、`const` 就可以产生该作用域

首先作用域链是在定义时就被确定下来的，和箭头函数里的 this 一样，后续不会改变，JS 会一层层往上寻找需要的内容

- 其实作用域链这个东西我们在闭包小结中已经看到过它的实体了：`[[Scopes]]`

![img](D:\memo\JavaScript\img\20210406201055.png)

图中的 `[[Scopes]]` 是个数组，作用域的一层层往上寻找就等同于遍历 `[[Scopes]]`

 **全局作用域**

> 全局变量是挂载在 window 对象下的变量，所以在网页中的任何位置你都可以使用并且访问到这个全局变量

```js
var globalName = 'global';
function getName() { 
  console.log(globalName) // global
  var name = 'inner'
  console.log(name) // inner
} 
getName();
console.log(name); // 
console.log(globalName); //global
function setName(){ 
  vName = 'setName';
}
setName();
console.log(vName); // setName
```

- 从这段代码中我们可以看到，globalName 这个变量无论在什么地方都是可以被访问到的，所以它就是全局变量。而在 getName 函数中作为局部变量的 name 变量是不具备这种能力的
- 当然全局作用域有相应的缺点，我们定义很多全局变量的时候，会容易引起变量命名的冲突，所以在定义变量的时候应该注意作用域的问题。

**2. 函数作用域**

> 函数中定义的变量叫作函数变量，这个时候只能在函数内部才能访问到它，所以它的作用域也就是函数的内部，称为函数作用域

```js
function getName () {
  var name = 'inner';
  console.log(name); //inner
}
getName();
console.log(name);
```

> 除了这个函数内部，其他地方都是不能访问到它的。同时，当这个函数被执行完之后，这个局部变量也相应会被销毁。所以你会看到在 getName 函数外面的 name 是访问不到的

**3. 块级作用域**

> ES6 中新增了块级作用域，最直接的表现就是新增的 let 关键词，使用 let 关键词定义的变量只能在块级作用域中被访问，有“暂时性死区”的特点，也就是说这个变量在定义之前是不能被使用的。

在 JS 编码过程中 `if 语句`及 `for` 语句后面 `{...}` 这里面所包括的，就是`块级作用域`

```js
console.log(a) //a is not defined
if(true){
  let a = '123'；
  console.log(a)； // 123
}
console.log(a) //a is not defined
```

> 从这段代码可以看出，变量 a 是在 `if 语句{...}` 中由 `let 关键词`进行定义的变量，所以它的作用域是 if 语句括号中的那部分，而在外面进行访问 a 变量是会报错的，因为这里不是它的作用域。所以在 if 代码块的前后输出 a 这个变量的结果，控制台会显示 a 并没有定义