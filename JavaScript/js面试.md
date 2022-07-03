### 事件模型

> `W3C`中定义事件的发生经历三个阶段：捕获阶段（`capturing`）、目标阶段（`targetin`）、冒泡阶段（`bubbling`）

- 冒泡型事件：当你使用事件冒泡时，子级元素先触发，父级元素后触发

- 捕获型事件：当你使用事件捕获时，父级元素先触发，子级元素后触发

- `DOM`事件流：同时支持两种事件模型：捕获型事件和冒泡型事件

- 阻止冒泡：在`W3c`中，使用`stopPropagation()`方法；在IE下设置`cancelBubble = true`

- 阻止捕获：阻止事件的默认行为，例如`click - <a>`后的跳转。在`W3c`中，使用`preventDefault()`方法，在`IE`下设置`window.event.returnValue = false`

  



### Ajax

```javascript
/** 1. 创建连接 **/
var xhr = null;
xhr = new XMLHttpRequest()
/** 2. 连接服务器 **/
xhr.open('get', url, true)
/** 3. 发送请求 **/
xhr.send(null);
/** 4. 接受请求 **/
xhr.onreadystatechange = function(){
	if(xhr.readyState == 4){
		if(xhr.status == 200){
			success(xhr.responseText);
		} else { 
			/** false **/
			fail && fail(xhr.status);
		}
	}
}
```

### 那些操作会造成内存泄漏

> JavaScript 内存泄露指对象在不需要使用它时仍然存在，导致占用的内存不能使用或回收

- 未使用 var 声明的全局变量
- 闭包函数(Closures)
- 循环引用(两个对象相互引用)
- 控制台日志(console.log)
- 移除存在绑定事件的DOM元素(IE)
- `setTimeout` 的第一个参数使用字符串而非函数的话，会引发内存泄漏
- 垃圾回收器定期扫描对象，并计算引用了每个对象的其他对象的数量。如果一个对象的引用数量为 0（没有其他对象引用过该对象），或对该对象的惟一引用是循环的，那么该对象的内存即可回收

### XML和JSON的区别？

- 数据体积方面
  - `JSON`相对`于XML`来讲，数据的体积小，传递的速度更快些。
- 数据交互方面
  - `JSON`与`JavaScript`的交互更加方便，更容易解析处理，更好的数据交互
- 数据描述方面
  - `JSON`对数据的描述性比`XML`较差
- 传输速度方面
  - `JSON`的速度要远远快于`XML`

### 说说你对promise的了解

### Node的应用场景

- 特点：
  - 1、它是一个`Javascript`运行环境
  - 2、依赖于`Chrome V8`引擎进行代码解释
  - 3、事件驱动
  - 4、非阻塞`I/O`
  - 5、单进程，单线程
- 优点：
  - 高并发（最重要的优点）
- 缺点：
  - 1、只支持单核`CPU`，不能充分利用`CPU`
  - 2、可靠性低，一旦代码某个环节崩溃，整个系统都崩溃

### 谈谈你对AMD、CMD的理解

- `CommonJS`是服务器端模块的规范，`Node.js`采用了这个规范。`CommonJS`规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。`AMD`规范则是非同步加载模块，允许指定回调函数
- `AMD`推荐的风格通过返回一个对象做为模块对象，`CommonJS`的风格通过对`module.exports`或`exports`的属性赋值来达到暴露模块对象的目的

**es6模块 CommonJS、AMD、CMD**

- `CommonJS` 的规范中，每个 `JavaScript` 文件就是一个独立的模块上下文（`module context`），在这个上下文中默认创建的属性都是私有的。也就是说，在一个文件定义的变量（还包括函数和类），都是私有的，对其他文件是不可见的。
- `CommonJS`是同步加载模块,在浏览器中会出现堵塞情况，所以不适用
- `AMD` 异步，需要定义回调`define`方式
- `es6` 一个模块就是一个独立的文件，该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用`export`关键字输出该变量 `es6`还可以导出类、方法，自动适用严格模式

### JS的基本数据类型和引用数据类型

- 基本数据类型：`undefined`、`null`、`boolean`、`number`、`string`、`symbol`,BigInt(es10新增)

- 引用数据类型：对象`Object`（包含普通对象-`Object`，数组对象-`Array`，正则对象-`RegExp`，日期对象-`Date`，数学函数-`Math`，函数对象-`Function`

  基本数据类型是存储在栈中，内存大小比较小，会被频繁的调用，他们可以直接的比较大小，而引用数据类型存储在堆内存中。引用数据类型的内存会比较大，引用数据类型在栈中存储的是指针，而指针指向堆中存储的起始地址。从而获取存储的内容

**数据类型检测**

**（1）typeof**

> typeof 对于原始类型来说，除了 null 都可以显示正确的类型

```js
console.log(typeof 2);               // number
console.log(typeof true);            // boolean
console.log(typeof 'str');           // string
console.log(typeof []);              // object     []数组的数据类型在 typeof 中被解释为 object
console.log(typeof function(){});    // function
console.log(typeof {});              // object
console.log(typeof undefined);       // undefined
console.log(typeof null);            // object     null 的数据类型被 typeof 解释为 object
```

**2）instanceof**

> ```
> instanceof` 可以正确的判断对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的 `prototype
> ```

```js
console.log(2 instanceof Number);                    // false
console.log(true instanceof Boolean);                // false 
console.log('str' instanceof String);                // false  
console.log([] instanceof Array);                    // true
console.log(function(){} instanceof Function);       // true
console.log({} instanceof Object);                   // true    
// console.log(undefined instanceof Undefined);
// console.log(null instanceof Null);
```

- `instanceof` 可以准确地判断复杂引用数据类型，但是不能正确判断基础数据类型；

- 而 `typeof` 也存在弊端，它虽然可以判断基础数据类型（`null` 除外），但是引用数据类型中，除了 `function` 类型以外，其他的也无法判断

  ```js
  // 我们也可以试着实现一下 instanceof
  function instanceof(left, right) {
      // 获得类型的原型
      let prototype = right.prototype
      // 获得对象的原型
      left = left.__proto__
      // 判断对象的类型是否等于类型的原型
      while (true) {
      	if (left === null)
      		return false
      	if (prototype === left)
      		return true
      	left = left.__proto__
      }
  }
  ```

  **（3）constructor**

  ```js
  console.log((2).constructor === Number); // true
  console.log((true).constructor === Boolean); // true
  console.log(('str').constructor === String); // true
  console.log(([]).constructor === Array); // true
  console.log((function() {}).constructor === Function); // true
  console.log(({}).constructor === Object); // true
  ```

  > 这里有一个坑，如果我创建一个对象，更改它的原型，`constructor`就会变得不可靠了

  ```js
  function Fn(){};
   
  Fn.prototype=new Array();
   
  var f=new Fn();
   
  console.log(f.constructor===Fn);    // false
  console.log(f.constructor===Array); // true 
  ```

  **（4）Object.prototype.toString.call()**

  > `toString()` 是 `Object` 的原型方法，调用该方法，可以统一返回格式为 `“[object Xxx]”` 的字符串，其中 `Xxx` 就是对象的类型。对于 `Object` 对象，直接调用 `toString()` 就能返回 `[object Object]`；而对于其他对象，则需要通过 `call` 来调用，才能返回正确的类型信息。我们来看一下代码。

  ```js
  Object.prototype.toString({})       // "[object Object]"
  Object.prototype.toString.call({})  // 同上结果，加上call也ok
  Object.prototype.toString.call(1)    // "[object Number]"
  Object.prototype.toString.call('1')  // "[object String]"
  Object.prototype.toString.call(true)  // "[object Boolean]"
  Object.prototype.toString.call(function(){})  // "[object Function]"
  Object.prototype.toString.call(null)   //"[object Null]"
  Object.prototype.toString.call(undefined) //"[object Undefined]"
  Object.prototype.toString.call(/123/g)    //"[object RegExp]"
  Object.prototype.toString.call(new Date()) //"[object Date]"
  Object.prototype.toString.call([])       //"[object Array]"
  Object.prototype.toString.call(document)  //"[object HTMLDocument]"
  Object.prototype.toString.call(window)   //"[object Window]"
  
  // 从上面这段代码可以看出，Object.prototype.toString.call() 可以很好地判断引用类型，甚至可以把 document 和 wind
  ```

  > 实现一个全局通用的数据类型判断方法，来加深你的理解，代码如下

  ```js
  function getType(obj){
    let type  = typeof obj;
    if (type !== "object") {    // 先进行typeof判断，如果是基础数据类型，直接返回
      return type;
    }
    // 对于typeof返回结果是object的，再进行如下的判断，正则返回结果
    return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1');  // 注意正则中间有个空格
  }
  /* 代码验证，需要注意大小写，哪些是typeof判断，哪些是toString判断？思考下 */
  getType([])     // "Array" typeof []是object，因此toString返回
  getType('123')  // "string" typeof 直接返回
  getType(window) // "Window" toString返回
  getType(null)   // "Null"首字母大写，typeof null是object，需toString来判断
  getType(undefined)   // "undefined" typeof 直接返回
  getType()            // "undefined" typeof 直接返回
  getType(function(){}) // "function" typeof能判断，因此首字母小写
  getType(/123/g)      //"RegExp" toString返回
  ```

  **小结**

  - ```
    typeof
    ```

    - 直接在计算机底层基于数据类型的值（二进制）进行检测
    - `typeof null`为`object` 原因是对象存在在计算机中，都是以`000`开始的二进制存储，所以检测出来的结果是对象
    - `typeof` 普通对象/数组对象/正则对象/日期对象 都是`object`
    - `typeof NaN === 'number'`

  - ```
    instanceof
    ```

    - 检测当前实例是否属于这个类的
    - 底层机制：只要当前类出现在实例的原型上，结果都是true
    - 不能检测基本数据类型

  - ```
    constructor
    ```

    - 支持基本类型
    - constructor可以随便改，也不准

  - ```
    Object.prototype.toString.call([val])
    ```

    - 返回当前实例所属类信息

  > 判断 `Target` 的类型，单单用 `typeof` 并无法完全满足，这其实并不是 `bug`，本质原因是 `JS` 的万物皆对象的理论。因此要真正完美判断时，我们需要区分对待:

  - 基本类型(`null`): 使用 `String(null)`
  - 基本类型(`string / number / boolean / undefined`) + `function`: - 直接使用 `typeof`即可
  - 其余引用类型(`Array / Date / RegExp Error`): 调用`toString`后根据`[object XXX]`进行判断

  **数据类型转换**

  ### 转化规则

  - `-、*、/、%`：一律转换成数值后计算
- +：
    - 数字 + 字符串 = 字符串， 运算顺序是从左到右
  - 数字 + 对象， 优先调用对象的`valueOf -> toString`
    - 数字 + `boolean/null` -> 数字
  - 数字 + `undefined` -> `NaN`
  - `[1].toString() === '1'`
  - `{}.toString() === '[object object]'`
  - `NaN !== NaN` 、+`undefined` 为 `NaN`
  
  > 在 `JS` 中类型转换只有三种情况，分别是：
  
  - 转换为布尔值
  
  - 转换为数字
  
  - 转换为字符串
  
    ![img](D:\memo\JavaScript\img\1.png)

**转Boolean**

> 在条件判断时，除了 `undefined`，`null`， `false`， `NaN`， `''`， `0`， `-0`，其他所有值都转为 `true`，包括所有对象

```js
Boolean(0)          //false
Boolean(null)       //false
Boolean(undefined)  //false
Boolean(NaN)        //false
Boolean(1)          //true
Boolean(13)         //true
Boolean('12')       //true
```

**对象转原始类型**

> 对象在转换类型的时候，会调用内置的 `[[ToPrimitive]]` 函数，对于该函数来说，算法逻辑一般来说如下

- 如果已经是原始类型了，那就不需要转换了
- 调用 `x.valueOf()`，如果转换为基础类型，就返回转换的值
- 调用 `x.toString()`，如果转换为基础类型，就返回转换的值
- 如果都没有返回原始类型，就会报错

> 当然你也可以重写 `Symbol.toPrimitive`，该方法在转原始类型时调用优先级最高。

```js
let a = {
  valueOf() {
    return 0
  },
  toString() {
    return '1'
  },
  [Symbol.toPrimitive]() {
    return 2
  }
}
1 + a // => 3
```

**四则运算符**

> 它有以下几个特点：

- 运算中其中一方为字符串，那么就会把另一方也转换为字符串
- 如果一方不是字符串或者数字，那么会将它转换为数字或者字符串

```js
1 + '1' // '11'
true + true // 2
4 + [1,2,3] // "41,2,3"
```

- 对于第一行代码来说，触发特点一，所以将数字 `1` 转换为字符串，得到结果 `'11'`
- 对于第二行代码来说，触发特点二，所以将 `true` 转为数字 `1`
- 对于第三行代码来说，触发特点二，所以将数组通过 `toString`转为字符串 `1,2,3`，得到结果 `41,2,3`

> 另外对于加法还需要注意这个表达式 `'a' + + 'b'`

```text
'a' + + 'b' // -> "aNaN"
```

- 因为 `+ 'b'` 等于 `NaN`，所以结果为 `"aNaN"`，你可能也会在一些代码中看到过 `+ '1'`的形式来快速获取 `number` 类型。
- 那么对于除了加法的运算符来说，只要其中一方是数字，那么另一方就会被转为数字

```js
4 * '3' // 12
4 * [] // 0
4 * [1, 2] // NaN
```

**比较运算符**

- 如果是对象，就通过 `toPrimitive` 转换对象
- 如果是字符串，就通过 `unicode` 字符索引来比较

```js
let a = {
  valueOf() {
    return 0
  },
  toString() {
    return '1'
  }
}
a > -1 // true
```

> 在以上代码中，因为 `a` 是对象，所以会通过 `valueOf` 转换为原始类型再比较值。

**强制类型转换**

> 强制类型转换方式包括 `Number()`、`parseInt()`、`parseFloat()`、`toString()`、`String()`、`Boolean()`，这几种方法都比较类似

- `Number()` 方法的强制转换规则
- 如果是布尔值，`true` 和 `false` 分别被转换为 `1` 和 `0`；
- 如果是数字，返回自身；
- 如果是 `null`，返回 `0`；
- 如果是 `undefined`，返回 `NaN`；
- 如果是字符串，遵循以下规则：如果字符串中只包含数字（或者是 `0X / 0x` 开头的十六进制数字字符串，允许包含正负号），则将其转换为十进制；如果字符串中包含有效的浮点格式，将其转换为浮点数值；如果是空字符串，将其转换为 `0`；如果不是以上格式的字符串，均返回 NaN；
- 如果是 `Symbol`，抛出错误；
- 如果是对象，并且部署了 `[Symbol.toPrimitive]` ，那么调用此方法，否则调用对象的 `valueOf()` 方法，然后依据前面的规则转换返回的值；如果转换的结果是 `NaN` ，则调用对象的 `toString()` 方法，再次依照前面的顺序转换返回对应的值。

```js
Number(true);        // 1
Number(false);       // 0
Number('0111');      //111
Number(null);        //0
Number('');          //0
Number('1a');        //NaN
Number(-0X11);       //-17
Number('0X11')       //17
```

**Object 的转换规则**

> 对象转换的规则，会先调用内置的 `[ToPrimitive]` 函数，其规则逻辑如下：

- 如果部署了 `Symbol.toPrimitive` 方法，优先调用再返回；
- 调用 `valueOf()`，如果转换为基础类型，则返回；
- 调用 `toString()`，如果转换为基础类型，则返回；
- 如果都没有返回基础类型，会报错。

```js
var obj = {
  value: 1,
  valueOf() {
    return 2;
  },
  toString() {
    return '3'
  },
  [Symbol.toPrimitive]() {
    return 4
  }
}
console.log(obj + 1); // 输出5
// 因为有Symbol.toPrimitive，就优先执行这个；如果Symbol.toPrimitive这段代码删掉，则执行valueOf打印结果为3；如果valueOf也去掉，则调用toString返回'31'(字符串拼接)
// 再看两个特殊的case：
10 + {}
// "10[object Object]"，注意：{}会默认调用valueOf是{}，不是基础类型继续转换，调用toString，返回结果"[object Object]"，于是和10进行'+'运算，按照字符串拼接规则来，参考'+'的规则C
[1,2,undefined,4,5] + 10
// "1,2,,4,510"，注意[1,2,undefined,4,5]会默认先调用valueOf结果还是这个数组，不是基础数据类型继续转换，
```

**'==' 的隐式类型转换规则**

- 如果类型相同，无须进行类型转换；
- 如果其中一个操作值是 `null` 或者 `undefined`，那么另一个操作符必须为 `null` 或者 `undefined`，才会返回 `true`，否则都返回 `false`；
- 如果其中一个是 `Symbol` 类型，那么返回 `false`；
- 两个操作值如果为 `string` 和 number 类型，那么就会将字符串转换为 `number`；
- 如果一个操作值是 `boolean`，那么转换成 `number`；
- 如果一个操作值为 `object` 且另一方为 `string`、`number` 或者 `symbol`，就会把 `object` 转为原始类型再进行判断（调用 `object` 的 `valueOf/toString` 方法进行转换）。

```
null == undefined       // true  规则2
null == 0               // false 规则2
'' == null              // false 规则2
'' == 0                 // true  规则4 字符串转隐式转换成Number之后再对比
'123' == 123            // true  规则4 字符串转隐式转换成Number之后再对比
0 == false              // true  e规则 布尔型隐式转换成Number之后再对比
1 == true               // true  e规则 布尔型隐式转换成Number之后再对比
var a = {
  value: 0,
  valueOf: function() {
    this.value++;
    return this.value;
  }
};
// 注意这里a又可以等于1、2、3
console.log(a == 1 && a == 2 && a ==3);  //true f规则 Object隐式转换
// 注：但是执行过3遍之后，再重新执行a==3或之前的数字就是false，因为value已经加上去了，这里需要注意一下
```

**'+' 的隐式类型转换规则**

> '+' 号操作符，不仅可以用作数字相加，还可以用作字符串拼接。仅当 '+' 号两边都是数字时，进行的是加法运算；如果两边都是字符串，则直接拼接，无须进行隐式类型转换。

- 如果其中有一个是字符串，另外一个是 `undefined`、`null` 或布尔型，则调用 `toString()` 方法进行字符串拼接；如果是纯对象、数组、正则等，则默认调用对象的转换方法会存在优先级，然后再进行拼接。
- 如果其中有一个是数字，另外一个是 `undefined`、`null`、布尔型或数字，则会将其转换成数字进行加法运算，对象的情况还是参考上一条规则。
- 如果其中一个是字符串、一个是数字，则按照字符串规则进行拼接

```js
1 + 2        // 3  常规情况
'1' + '2'    // '12' 常规情况
// 下面看一下特殊情况
'1' + undefined   // "1undefined" 规则1，undefined转换字符串
'1' + null        // "1null" 规则1，null转换字符串
'1' + true        // "1true" 规则1，true转换字符串
'1' + 1n          // '11' 比较特殊字符串和BigInt相加，BigInt转换为字符串
1 + undefined     // NaN  规则2，undefined转换数字相加NaN
1 + null          // 1    规则2，null转换为0
1 + true          // 2    规则2，true转换为1，二者相加为2
1 + 1n            // 错误  不能把BigInt和Number类型直接混合相加
'1' + 3           // '13' 规则3，字符串拼接
```

> 整体来看，如果数据中有字符串，JavaScript 类型转换还是更倾向于转换成字符串，因为第三条规则中可以看到，在字符串和数字相加的过程中最后返回的还是字符串，这里需要关注一下

### 介绍js有哪些内置对象

- `Object` 是 `JavaScript` 中所有对象的父对象
- 数据封装类对象：`Object`、`Array`、`Boolean`、`Number` 和 `String`
- 其他对象：`Function`、`Arguments`、`Math`、`Date`、`RegExp`、`Error`

### 对象转原始类型是根据什么流程运行的

> 对象转原始类型，会调用内置的`[ToPrimitive]`函数，对于该函数而言，其逻辑如下：

- 如果有`Symbol.toPrimitive()`方法，优先调用再返回
- 调用`valueOf()`，如果转换为原始类型，则返回
- 调用`toString()`，如果转换为原始类型，则返回
- 如果都没有返回原始类型，会报错

```js
var obj = {
  value: 3,
  valueOf() {
    return 4;
  },
  toString() {
    return '5'
  },
  [Symbol.toPrimitive]() {
    return 6
  }
}
console.log(obj + 1); // 输出7
```

###  [] == ![]结果是什么？为什么？

- `==` 中，左右两边都需要转换为数字然后进行比较
- `[]`转换为数字为`0`
- `![]` 首先是转换为布尔值，由于`[]`作为一个引用类型转换为布尔值为`true`
- 因此`![]`为`false`，进而在转换成数字，变为`0`
- `0 == 0` ， 结果为`true`

### 说几条写JavaScript的基本规范

- 不要在同一行声明多个变量

- 请使用`===/!==`来比较`true/false`或者数值

- 使用对象字面量替代`new Array`这种形式

- 不要使用全局函数

- `Switch`语句必须带有`default`分支

- `If`语句必须使用大括号

- `for-in`循环中的变量 应该使用`var`关键字明确限定作用域，从而避免作用域污染

- 符号优先级可以用括号来区分

- 尽量不要使用var,可以使用let和const来代替

  

### JavaScript有几种类型的值

- 栈：原始数据类型（`Undefined`，`Null`，`Boolean`，`Number`、`String`）
- 堆：引用数据类型（对象、数组和函数）
- 两种类型的区别是：存储位置不同；
- 原始数据类型直接存储在栈(`stack`)中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储；
- 引用数据类型存储在堆(`heap`)中的对象,占据空间大、大小不固定,如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其
- 在栈中的地址，取得地址后从堆中获得实体

### eval是做什么的

- 它的功能是把对应的字符串解析成`JS`代码并运行
- 应该避免使用`eval`，不安全，非常耗性能（`2`次，一次解析成`js`语句，一次执行）
- 由`JSON`字符串转换为JSON对象的时候可以用`eval，var obj =eval('('+ str +')')`

### null，undefined 的区别

- `undefined` 表示不存在这个值。
- `undefined` :是一个表示"无"的原始值或者说表示"缺少值"，就是此处应该有一个值，但是还没有定义。当尝试读取时会返回 `undefined`
- 例如变量被声明了，但没有赋值时，就等于`undefined`
- `null` 表示一个对象被定义了，值为“空值”
- `null` : 是一个对象(空对象, 没有任何属性和方法)
- 例如作为函数的参数，表示该函数的参数不是对象；
- 在验证`null`时，一定要使用　`===` ，因为 `==`无法分别`null` 和　`undefined`

###  ["1", "2", "3"].map(parseInt) 答案是多少

- `[1, NaN, NaN]`因为 `parseInt` 需要两个参数 `(val, radix)`，其中`radix` 表示解析时用的基数。
- `map`传了 `3`个`(element, index, array)`，对应的 `radix` 不合法导致解析失败。

### JSON 的了解

- `JSON(JavaScript Object Notation)` 是一种轻量级的数据交换格式
- 它是基于`JavaScript`的一个子集。数据格式简单, 易于读写, 占用带宽小
- `JSON`字符串转换为JSON对象:

```javascript
var obj =eval('('+ str +')');
var obj = str.parseJSON();
var obj = JSON.parse(str);
```

- `JSON`对象转换为JSON字符串：

```text
var last=obj.toJSONString();
var last=JSON.stringify(obj);
```

### defer和async

	defer js的下载和执行不阻塞Dom tree的构建
	defer代码执行的时候Dom构建完成，defer会在DomContentLoad以后执行
	多个defer顺序执行
	defer推荐放在head中
	defer仅适用于外部脚本，对script的内容会忽略
	
	async 多个async不能保证顺序执行，不会组设Dom渲染。不能保证DOMContentLoaded之前或者之后执行行
	async用于独立脚本，没有外部依赖

### 说说严格模式的限制

- 变量必须声明后再使用
- 函数的参数不能有同名属性，否则报错
- 不能使用with语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀0表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量`delete prop`，会报错，只能删除属性`delete global[prop]`
- `eval`不会在它的外层作用域引入变量
- `eval`和`arguments`不能被重新赋值
- `arguments`不会自动反映函数参数的变化
- 不能使用`arguments.callee`
- 不能使用`arguments.caller`
- 禁止`this`指向全局对象
- 不能使用`fn.caller`和`fn.arguments`获取函数调用的堆栈
- 增加了保留字（比如`protected`、`static`和`interface`）

### attribute和property的区别是什么

- `attribute`是`dom`元素在文档中作为`html`标签拥有的属性；
- `property`就是`dom`元素在`js`中作为对象拥有的属性。
- 对于`html`的标准属性来说，`attribute`和`property`是同步的，是会自动更新的
- 但是对于自定义的属性来说，他们是不同步的

###  谈谈你对ES6的理解

- 新增模板字符串（为`JavaScript`提供了简单的字符串插值功能）
- 箭头函数
- `for-of`（用来遍历数据—例如数组中的值。)
- `arguments`对象可被不定参数和默认参数完美代替。
- `ES6`将p`romise`对象纳入规范，提供了原生的`Promise`对象。
- 增加了`let`和`const`命令，用来声明变量。
- 增加了块级作用域。
- `let`命令实际上就增加了块级作用域。
- 还有就是引入`module`模块的概念

###  什么是面向对象编程及面向过程编程，它们的异同和优缺点

- 面向过程就是分析出解决问题所需要的步骤，然后用函数把这些步骤一步一步实现，使用的时候一个一个依次调用就可以了
- 面向对象是把构成问题事务分解成各个对象，建立对象的目的不是为了完成一个步骤，而是为了描叙某个事物在整个解决问题的步骤中的行为
- 面向对象是以功能来划分问题，而不是步骤

### 面向对象编程思想

- 基本思想是使用对象，类，继承，封装等基本概念来进行程序设计
- 优点
  - 易维护
    - 采用面向对象思想设计的结构，可读性高，由于继承的存在，即使改变需求，那么维护也只是在局部模块，所以维护起来是非常方便和较低成本的
  - 易扩展
  - 开发工作的重用性、继承性高，降低重复工作量。
  - 缩短了开发周期



### 如何通过JS判断一个数组

- ```
  instanceof
  ```

  方法

  - `instanceof` 运算符是用来测试一个对象是否在其原型链原型构造函数的属性

```javascript
var arr = [];
arr instanceof Array; // true
```

- ```
  constructor
  ```

  方法

  - `constructor`属性返回对创建此对象的数组函数的引用，就是返回对象相对应的构造函数

```javascript
var arr = [];
arr.constructor == Array; //true
```

- 最简单的方法
  - 这种写法，是 `jQuery` 正在使用的

```javascript
Object.prototype.toString.call(value) == '[object Array]'
// 利用这个方法，可以写一个返回数据类型的方法
var isType = function (obj) {
     return Object.prototype.toString.call(obj).slice(8,-1);
}
```

- `ES5`新增方法`isArray()`

```javascript
var a = new Array(123);
var b = new Date();
console.log(Array.isArray(a)); //true
console.log(Array.isArray(b)); //false
```

### 谈一谈箭头函数与普通函数的区别？

- 函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象

- 不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误

- 不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用`Rest`参数代替

- 不可以使用`yield`命令，因此箭头函数不能用作`Generator`函数

  

### 快速的让一个数组乱序

```javascript
var arr = [1,2,3,4,5,6,7,8,9,10];
arr.sort(function(){
    return Math.random() - 0.5;
})
console.log(arr);
```

### 希望获取到页面中所有的checkbox怎么做？

> 不使用第三方框架

```js
 var domList = document.getElementsByTagName(‘input’)
 var checkBoxList = [];
 var len = domList.length;　　//缓存到局部变量
 while (len--) {　　//使用while的效率会比for循环更高
 　　if (domList[len].type == ‘checkbox’) {
     　　checkBoxList.push(domList[len]);
 　　}
 }
```

### 怎样添加、移除、移动、复制、创建和查找节点

**创建新节点**

```js
createDocumentFragment()    //创建一个DOM片段
createElement()   //创建一个具体的元素
createTextNode()   //创建一个文本节点
```

**添加、移除、替换、插入**

```js
appendChild()      //添加
removeChild()      //移除
replaceChild()      //替换
insertBefore()      //插入
```

**查找**

```js
getElementsByTagName()    //通过标签名称
getElementsByName()     //通过元素的Name属性的值
getElementById()        //通过元素Id，唯一性
```

### window.onload和$(document).ready

> 原生`JS`的`window.onload`与`Jquery`的`$(document).ready(function(){})`有什么不同？如何用原生JS实现Jq的`ready`方法？

- `window.onload()`方法是必须等到页面内包括图片的所有元素加载完毕后才能执行。
- `$(document).ready()`是`DOM`结构绘制完毕后就执行，不必等到加载完毕

```js
function ready(fn){
      if(document.addEventListener) {        //标准浏览器
          document.addEventListener('DOMContentLoaded', function() {
              //注销事件, 避免反复触发
              document.removeEventListener('DOMContentLoaded',arguments.callee, false);
              fn();            //执行函数
          }, false);
      }else if(document.attachEvent) {        //IE
          document.attachEvent('onreadystatechange', function() {
             if(document.readyState == 'complete') {
                 document.detachEvent('onreadystatechange', arguments.callee);
                 fn();        //函数执行
             }
         });
     }
 };
```

### addEventListener()和attachEvent()的区别

- `addEventListener()`是符合W3C规范的标准方法; `attachEvent()`是IE低版本的非标准方法
- `addEventListener()`支持事件冒泡和事件捕获; - 而`attachEvent()`只支持事件冒泡
- `addEventListener()`的第一个参数中,事件类型不需要添加`on`; `attachEvent()`需要添加`'on'`
- 如果为同一个元素绑定多个事件, `addEventListener()`会按照事件绑定的顺序依次执行, `attachEvent()`会按照事件绑定的顺序倒序执行

###  Javascript全局函数和全局变量

**全局变量**

- `Infinity` 代表正的无穷大的数值。
- `NaN` 指示某个值是不是数字值。
- `undefined` 指示未定义的值。

**全局函数**

- `decodeURI()` 解码某个编码的 `URI`。
- `decodeURIComponent()` 解码一个编码的 `URI` 组件。
- `encodeURI()` 把字符串编码为 URI。
- `encodeURIComponent()` 把字符串编码为 `URI` 组件。
- `escape()` 对字符串进行编码。
- `eval()` 计算 `JavaScript` 字符串，并把它作为脚本代码来执行。
- `isFinite()` 检查某个值是否为有穷大的数。
- `isNaN()` 检查某个值是否是数字。
- `Number()` 把对象的值转换为数字。
- `parseFloat()` 解析一个字符串并返回一个浮点数。
- `parseInt()` 解析一个字符串并返回一个整数。
- `String()` 把对象的值转换为字符串。
- `unescape()` 对由`escape()` 编码的字符串进行解码

### 浏览器缓存

> 浏览器缓存分为强缓存和协商缓存。当客户端请求某个资源时，获取缓存的流程如下

- 先根据这个资源的一些 `http header` 判断它是否命中强缓存，如果命中，则直接从本地获取缓存资源，不会发请求到服务器；
- 当强缓存没有命中时，客户端会发送请求到服务器，服务器通过另一些`request header`验证这个资源是否命中协商缓存，称为`http`再验证，如果命中，服务器将请求返回，但不返回资源，而是告诉客户端直接从缓存中获取，客户端收到返回后就会从缓存中获取资源；
- 强缓存和协商缓存共同之处在于，如果命中缓存，服务器都不会返回资源； 区别是，强缓存不对发送请求到服务器，但协商缓存会。
- 当协商缓存也没命中时，服务器就会将资源发送回客户端。
- 当 `ctrl+f5` 强制刷新网页时，直接从服务器加载，跳过强缓存和协商缓存；
- 当 `f5`刷新网页时，跳过强缓存，但是会检查协商缓存；

**强缓存**

- `Expires`（该字段是 `http1.0` 时的规范，值为一个绝对时间的 `GMT` 格式的时间字符串，代表缓存资源的过期时间）
- `Cache-Control:max-age`（该字段是 `http1.1`的规范，强缓存利用其 `max-age` 值来判断缓存资源的最大生命周期，它的值单位为秒）

**协商缓存**

- `Last-Modified`（值为资源最后更新时间，随服务器response返回）
- `If-Modified-Since`（通过比较两个时间来判断资源在两次请求期间是否有过修改，如果没有修改，则命中协商缓存）
- `ETag`（表示资源内容的唯一标识，随服务器`response`返回）
- `If-None-Match`（服务器通过比较请求头部的`If-None-Match`与当前资源的`ETag`是否一致来判断资源是否在两次请求之间有过修改，如果没有修改，则命中协商缓存）

### 深浅拷贝

### 防抖/节流

### 实现效果，点击容器内的图标，图标边框变成border 1px solid red，点击空白处重置

```js
const box = document.getElementById('box');
function isIcon(target) {
  return target.className.includes('icon');
}

box.onClick = function(e) {
  e.stopPropagation();
  const target = e.target;
  if (isIcon(target)) {
    target.style.border = '1px solid red';
  }
}
const doc = document;
doc.onclick = function(e) {
  const children = box.children;
  for(let i; i < children.length; i++) {
    if (isIcon(children[i])) {
      children[i].style.border = 'none';
    }
  }
}
```

### 请简单实现双向数据绑定`mvvm`

###  前端面试之MVVM浅析

### 实现Storage，使得该对象为单例，并对`localStorage`进行封装设置值setItem(key,value)和getItem(key)

```js
var instance = null;
class Storage {
  static getInstance() {
    if (!instance) {
      instance = new Storage();
    }
    return instance;
  }
  setItem = (key, value) => localStorage.setItem(key, value),
  getItem = key => localStorage.getItem(key)
}
```

### 说说`event loop`

###  请手写实现一个`promise` 

### 说说从输入URL到看到页面发生的全过程，越详细越好

### 说一下浏览器的缓存机制

### `caller`和`callee`的区别

### ajax、axios、fetch区别