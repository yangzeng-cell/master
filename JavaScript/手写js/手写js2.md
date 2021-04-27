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

```
#
6 模拟new
new操作符做了这些事：
创建一个全新的对象
这个对象的__proto__要指向构造函数的原型prototype
执行构造函数，使用 call/apply 改变 this 的指向
返回值为object类型则作为new方法的返回值返回，否则返回上述全新对象
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

## [#](http://interview.poetries.top/docs/handwritten.html#_18-转化为驼峰命名)18 转化为驼峰命名



```js
var s1 = "get-element-by-id"

// 转化为 getElementById

var f = function(s) {
    return s.replace(/-\w/g, function(x) {
        return x.slice(1).toUpperCase();
    })
}
```

## [#](http://interview.poetries.top/docs/handwritten.html#_19-查找字符串中出现最多的字符和个数)19 查找字符串中出现最多的字符和个数



> 例: abbcccddddd -> 字符最多的是d，出现了5次

```js
let str = "abcabcabcbbccccc";
let num = 0;
let char = '';

 // 使其按照一定的次序排列
str = str.split('').sort().join('');
// "aaabbbbbcccccccc"

// 定义正则表达式
let re = /(\w)\1+/g;      \1表示匹配（\w）的字符
str.replace(re,($0,$1) => {
    if(num < $0.length){
        num = $0.length;
        char = $1;        
    }
});
console.log(`字符最多的是${char}，出现了${num}次`);
```

## 20 字符串查找



> 请使用最基本的遍历来实现判断字符串 a 是否被包含在字符串 b 中，并返回第一次出现的位置（找不到返回 -1）。

```js
a='34';b='1234567'; // 返回 2
a='35';b='1234567'; // 返回 -1
a='355';b='12354355'; // 返回 5
isContain(a,b);
function isContain(a, b) {
  for (let i in b) {
    if (a[0] === b[i]) {
      let tmp = true;
      for (let j in a) {
        if (a[j] !== b[~~i + ~~j]) {
          tmp = false;
        }
      }
      if (tmp) {
        return i;
      }
    }
  }
  return -1;
}
```

## [#](http://interview.poetries.top/docs/handwritten.html#_21-实现千位分隔符)21 实现千位分隔符



```js
// 保留三位小数
parseToMoney(1234.56); // return '1,234.56'
parseToMoney(123456789); // return '123,456,789'
parseToMoney(1087654.321); // return '1,087,654.321'
function parseToMoney(num) {
  num = parseFloat(num.toFixed(3));
  let [integer, decimal] = String.prototype.split.call(num, '.');
  integer = integer.replace(/\d(?=(\d{3})+$)/g, '$&,');
  return integer + '.' + (decimal ? decimal : '');
}
```

## [#](http://interview.poetries.top/docs/handwritten.html#_22-判断是否是电话号码)22 判断是否是电话号码



```js
function isPhone(tel) {
    var regx = /^1[34578]\d{9}$/;
    return regx.test(tel);
}
```

## [#](http://interview.poetries.top/docs/handwritten.html#_23-验证是否是邮箱)23 验证是否是邮箱



```js
function isEmail(email) {
    var regx = /^([a-zA-Z0-9_\-])+@([a-zA-Z0-9_\-])+(\.[a-zA-Z0-9_\-])+$/;
    return regx.test(email);
}
```

## [#](http://interview.poetries.top/docs/handwritten.html#_24-验证是否是身份证)24 验证是否是身份证



```js
function isCardNo(number) {
    var regx = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return regx.test(number);
}
```

##  [#](http://interview.poetries.top/docs/handwritten.html#_25-用es5实现数组的map方法)25 用ES5实现数组的map方法



- 回调函数的参数有哪些，返回值如何处理
- 不修改原来的数组

```js
Array.prototype.MyMap = function(fn, context){
  // 转换类数组
  var arr = Array.prototype.slice.call(this);//由于是ES5所以就不用...展开符了
  var mappedArr = [];
  for (var i = 0; i < arr.length; i++ ){
    // 把当前值、索引、当前数组返回去。调用的时候传到函数参数中 [1,2,3,4].map((curr,index,arr))
    mappedArr.push(fn.call(context, arr[i], i, this));
  }
  return mappedArr;
}
```

## [#](http://interview.poetries.top/docs/handwritten.html#_26-用es5实现数组的reduce方法)26 用ES5实现数组的reduce方法



- 初始值不传怎么处理
- 回调函数的参数有哪些，返回值如何处理。

```js
Array.prototype.myReduce = function(fn, initialValue) {
  var arr = Array.prototype.slice.call(this);
  var res, startIndex;
  res = initialValue ? initialValue : arr[0]; // 不传默认取数组第一项
  startIndex = initialValue ? 0 : 1;
  for(var i = startIndex; i < arr.length; i++) {
    // 把初始值、当前值、索引、当前数组返回去。调用的时候传到函数参数中 [1,2,3,4].reduce((initVal,curr,index,arr))
    res = fn.call(null, res, arr[i], i, this); 
  }
  return res;
}
```

- 对于普通函数，绑定this指向
- 对于构造函数，要保证原函数的原型对象上的属性不能丢失

```js
Function.prototype.bind = function(context, ...args) {
    let self = this;//谨记this表示调用bind的函数
    let fBound = function() {
        //this instanceof fBound为true表示构造函数的情况。如new func.bind(obj)
        return self.apply(this instanceof fBound ? this : context || window, args.concat(Array.prototype.slice.call(arguments)));
    }
    fBound.prototype = Object.create(this.prototype);//保证原函数的原型对象上的属性不丢失
    return fBound;
}
```

大家平时说的手写bind，其实就这么简单

## [#](http://interview.poetries.top/docs/handwritten.html#_28-实现数组的flat)28 实现数组的flat



需求:多维数组=>一维数组

```js
let ary = [1, [2, [3, [4, 5]]], 6];
let str = JSON.stringify(ary);
//第0种处理:直接的调用
arr_flat = arr.flat(Infinity);
//第一种处理
ary = str.replace(/(\[|\])/g, '').split(',');
//第二种处理
str = str.replace(/(\[\]))/g, '');
str = '[' + str + ']';
ary = JSON.parse(str);
//第三种处理：递归处理
let result = [];
let fn = function(ary) {
  for(let i = 0; i < ary.length; i++) }{
    let item = ary[i];
    if (Array.isArray(ary[i])){
      fn(item);
    } else {
      result.push(item);
    }
  }
}
//第四种处理：用 reduce 实现数组的 flat 方法
function flatten(ary) {
    return ary.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
    }, []);
}
let ary = [1, 2, [3, 4], [5, [6, 7]]]
console.log(flatten(ary))
//第五种处理：扩展运算符
while (ary.some(Array.isArray)) {
  ary = [].concat(...ary);
}
```

**对象扁平化**

```js
function objectFlat(obj = {}) {
  const res = {}
  function flat(item, preKey = '') {
    Object.entries(item).forEach(([key, val]) => {
      const newKey = preKey ? `${preKey}.${key}` : key
      if (val && typeof val === 'object') {
        flat(val, newKey)
      } else {
        res[newKey] = val
      }
    })
  }
  flat(obj)
  return res
}

// 测试
const source = { a: { b: { c: 1, d: 2 }, e: 3 }, f: { g: 2 } }
console.log(objectFlat(source));
```

## 实现一个 sleep 函数，比如 sleep(1000) 意味着等待1000毫秒



```js
const sleep = (time) => {
  return new Promise(resolve => setTimeout(resolve, time))
}

sleep(1000).then(() => {
    // 这里写你的骚操作
})
```

## 给定两个数组，写一个方法来计算它们的交集



> 例如：给定 nums1 = [1, 2, 2, 1]，nums2 = [2, 2]，返回 [2, 2]。

```js
function union (arr1, arr2) {
  return arr1.filter(item => {
  	return arr2.indexOf(item) > - 1;
  })
}
 const a = [1, 2, 2, 1];
 const b = [2, 3, 2];
 console.log(union(a, b)); // [2, 2]
```

## 实现一个双向绑定



**defineProperty 版本**

```js
// 数据
const data = {
  text: 'default'
};
const input = document.getElementById('input');
const span = document.getElementById('span');
// 数据劫持
Object.defineProperty(data, 'text', {
  // 数据变化 --> 修改视图
  set(newVal) {
    input.value = newVal;
    span.innerHTML = newVal;
  }
});
// 视图更改 --> 数据变化
input.addEventListener('keyup', function(e) {
  data.text = e.target.value;
});
```

**proxy 版本**

```js
// 数据
const data = {
  text: 'default'
};
const input = document.getElementById('input');
const span = document.getElementById('span');
// 数据劫持
const handler = {
  set(target, key, value) {
    target[key] = value;
    // 数据变化 --> 修改视图
    input.value = value;
    span.innerHTML = value;
    return value;
  }
};
const proxy = new Proxy(data, handler);

// 视图更改 --> 数据变化
input.addEventListener('keyup', function(e) {
  proxy.text = e.target.value;
});
```

##  数组去重问题



> 首先:我知道多少种去重方式

### [#](http://interview.poetries.top/docs/handwritten.html#双层-for-循环)双层 for 循环

```js
function distinct(arr) {
    for (let i=0, len=arr.length; i<len; i++) {
        for (let j=i+1; j<len; j++) {
            if (arr[i] == arr[j]) {
                arr.splice(j, 1);
                // splice 会改变数组长度，所以要将数组长度 len 和下标 j 减一
                len--;
                j--;
            }
        }
    }
    return arr;
}
```

> 思想: 双重 `for` 循环是比较笨拙的方法，它实现的原理很简单：先定义一个包含原始数组第一个元素的数组，然后遍历原始数组，将原始数组中的每个元素与新数组中的每个元素进行比对，如果不重复则添加到新数组中，最后返回新数组；因为它的时间复杂度是`O(n^2)`，如果数组长度很大，效率会很低

### [#](http://interview.poetries.top/docs/handwritten.html#array-filter-加-indexof-includes)Array.filter() 加 indexOf/includes

```js
function distinct(a, b) {
    let arr = a.concat(b);
    return arr.filter((item, index)=> {
        //return arr.indexOf(item) === index
        return arr.includes(item)
    })
}
```

> 思想: 利用`indexOf`检测元素在数组中第一次出现的位置是否和元素现在的位置相等，如果不等则说明该元素是重复元素

### [#](http://interview.poetries.top/docs/handwritten.html#es6-中的-set-去重)ES6 中的 Set 去重

```js
function distinct(array) {
   return Array.from(new Set(array));
}
```

> 思想: ES6 提供了新的数据结构 Set，Set 结构的一个特性就是成员值都是唯一的，没有重复的值。

### [#](http://interview.poetries.top/docs/handwritten.html#reduce-实现对象数组去重复)reduce 实现对象数组去重复

```js
var resources = [
    { name: "张三", age: "18" },
    { name: "张三", age: "19" },
    { name: "张三", age: "20" },
    { name: "李四", age: "19" },
    { name: "王五", age: "20" },
    { name: "赵六", age: "21" }
]
var temp = {};
resources = resources.reduce((prev, curv) => {
 // 如果临时对象中有这个名字，什么都不做
 if (temp[curv.name]) {
 
 }else {
    // 如果临时对象没有就把这个名字加进去，同时把当前的这个对象加入到prev中
    temp[curv.name] = true;
    prev.push(curv);
 }
 return prev
}, []);
console.log("结果", resources);
```

> 这种方法是利用高阶函数 `reduce` 进行去重， 这里只需要注意`initialValue`得放一个空数组[]，不然没法`push`

##  基于Generator函数实现async/await原理



> 核心：传递给我一个`Generator`函数，把函数中的内容基于`Iterator`迭代器的特点一步步的执行

```js
function readFile(file) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(file);
    }, 1000);
    })
};

function asyncFunc(generator) {
    const iterator = generator(); // 接下来要执行next
  // data为第一次执行之后的返回结果，用于传给第二次执行
  const next = (data) => {
        let { value, done } = iterator.next(data); // 第二次执行，并接收第一次的请求结果 data
    
    if (done) return; // 执行完毕(到第三次)直接返回
    // 第一次执行next时，yield返回的 promise实例 赋值给了 value
    value.then(data => {
      next(data); // 当第一次value 执行完毕且成功时，执行下一步(并把第一次的结果传递下一步)
    });
  }
  next();
};

asyncFunc(function* () {
    // 生成器函数：控制代码一步步执行 
  let data = yield readFile('a.js'); // 等这一步骤执行执行成功之后，再往下走，没执行完的时候，直接返回
  data = yield readFile(data + 'b.js');
  return data;
})
```

##  基于Promise封装Ajax



- 返回一个新的Promise实例

- 创建HMLHttpRequest异步对象

- 调用open方法，打开url，与服务器建立链接（发送前的一些处理）

- 监听Ajax状态信息

- 如果

  ```
  xhr.readyState == 4
  ```

  （表示服务器响应完成，可以获取使用服务器的响应了）

  - `xhr.status == 200`，返回resolve状态
  - `xhr.status == 404`，返回reject状态

- `xhr.readyState !== 4`，把请求主体的信息基于send发送给服务器

```js
function ajax(url, method) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(url, method, true)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText)
        } else if (xhr.status === 404) {
          reject(new Error('404'))
        }
      } else {
        reject('请求数据失败')
      }
    }
    xhr.send(null)
  })
}
```

## reduce用法



**语法**

```js
array.reduce(function(total, currentValue, currentIndex, arr), initialValue);
/*
  total: 必需。初始值, 或者计算结束后的返回值。
  currentValue： 必需。当前元素。
  currentIndex： 可选。当前元素的索引；                     
  arr： 可选。当前元素所属的数组对象。
  initialValue: 可选。传递给函数的初始值，相当于total的初始值。
*/
```

> `reduceRight()` 该方法用法与`reduce()`其实是相同的，只是遍历的顺序相反，它是从数组的最后一项开始，向前遍历到第一项

### [#](http://interview.poetries.top/docs/handwritten.html#数组求和)数组求和

```js
const arr = [12, 34, 23];
const sum = arr.reduce((total, num) => total + num);

// 设定初始值求和
const arr = [12, 34, 23];
const sum = arr.reduce((total, num) => total + num, 10);  // 以10为初始值求和


// 对象数组求和
var result = [
  { subject: 'math', score: 88 },
  { subject: 'chinese', score: 95 },
  { subject: 'english', score: 80 }
];
const sum = result.reduce((accumulator, cur) => accumulator + cur.score, 0); 
const sum = result.reduce((accumulator, cur) => accumulator + cur.score, -10);  // 总分扣除10分
```

### [#](http://interview.poetries.top/docs/handwritten.html#数组最大值)数组最大值

```js
const a = [23,123,342,12];
const max = a.reduce((pre,next)=>pre>cur?pre:cur,0); // 342
```

### [#](http://interview.poetries.top/docs/handwritten.html#数组转对象)数组转对象

```js
var streams = [{name: '技术', id: 1}, {name: '设计', id: 2}];
var obj = streams.reduce((accumulator, cur) => {accumulator[cur.id] = cur; return accumulator;}, {});
```

### [#](http://interview.poetries.top/docs/handwritten.html#扁平一个二维数组)扁平一个二维数组

```js
var arr = [[1, 2, 8], [3, 4, 9], [5, 6, 10]];
var res = arr.reduce((x, y) => x.concat(y), []);
```

### [#](http://interview.poetries.top/docs/handwritten.html#数组去重)数组去重

```text
实现的基本原理如下：

① 初始化一个空数组
② 将需要去重处理的数组中的第1项在初始化数组中查找，如果找不到（空数组中肯定找不到），就将该项添加到初始化数组中
③ 将需要去重处理的数组中的第2项在初始化数组中查找，如果找不到，就将该项继续添加到初始化数组中
④ ……
⑤ 将需要去重处理的数组中的第n项在初始化数组中查找，如果找不到，就将该项继续添加到初始化数组中
⑥ 将这个初始化数组返回
var newArr = arr.reduce(function (prev, cur) {
    prev.indexOf(cur) === -1 && prev.push(cur);
    return prev;
},[]);
```

### [#](http://interview.poetries.top/docs/handwritten.html#对象数组去重)对象数组去重

```js
const dedup = (data, getKey = () => { }) => {
    const dateMap = data.reduce((pre, cur) => {
        const key = getKey(cur)
        if (!pre[key]) {
            pre[key] = cur
        }
        return pre
    }, {})
    return Object.values(dateMap)
}
```

### [#](http://interview.poetries.top/docs/handwritten.html#求字符串中字母出现的次数)求字符串中字母出现的次数

```js
const str = 'sfhjasfjgfasjuwqrqadqeiqsajsdaiwqdaklldflas-cmxzmnha';

const res = str.split('').reduce((pre,next)=>{
 pre[next] ? pre[next]++ : pre[next] = 1
 return pre 
},{})
// 结果
-: 1
a: 8
c: 1
d: 4
e: 1
f: 4
g: 1
h: 2
i: 2
j: 4
k: 1
l: 3
m: 2
n: 1
q: 5
r: 1
s: 6
u: 1
w: 2
x: 1
z: 1
```

### [#](http://interview.poetries.top/docs/handwritten.html#compose函数)compose函数

> `redux compose` 源码实现

```js
function compose(...funs) {
    if (funs.length === 0) {
        return arg => arg;
    }
    if (funs.length === 1) {
       return funs[0];
    }
    return funs.reduce((a, b) => (...arg) => a(b(...arg)))
}
```

##  手写原生AJAX



**步骤**

- 创建 `XMLHttpRequest` 实例
- 发出 HTTP 请求
- 服务器返回 XML 格式的字符串
- JS 解析 XML，并更新局部页面
- 不过随着历史进程的推进，XML 已经被淘汰，取而代之的是 JSON。

了解了属性和方法之后，根据 AJAX 的步骤，手写最简单的 GET 请求。

### [#](http://interview.poetries.top/docs/handwritten.html#版本1)版本1

```js
function ajax() {
  let xhr = new XMLHttpRequest() //实例化，以调用方法
  xhr.open('get', 'https://www.google.com')  //参数2，url。参数三：异步
  xhr.onreadystatechange = () => {  //每当 readyState 属性改变时，就会调用该函数。
    if (xhr.readyState === 4) {  //XMLHttpRequest 代理当前所处状态。
      if (xhr.status >= 200 && xhr.status < 300) {  //200-300请求成功
        let string = request.responseText
        //JSON.parse() 方法用来解析JSON字符串，构造由字符串描述的JavaScript值或对象
        let object = JSON.parse(string)
      }
    }
  }
  request.send() //用于实际发出 HTTP 请求。不带参数为GET请求
}
```

### [#](http://interview.poetries.top/docs/handwritten.html#promise实现)promise实现

```js
function ajax(url) {
  const p = new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open('get', url)
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status <= 300) {
          resolve(JSON.parse(xhr.responseText))
        } else {
          reject('请求出错')
        }
      }
    }
    xhr.send()  //发送hppt请求
  })
  return p
}

let url = '/data.json'
ajax(url).then(res => console.log(res))
  .catch(reason => console.log(reason))
  
```

## 创建10个标签，点击的时候弹出来对应的序号



```js
var a
for(let i=0;i<10;i++){
 a=document.createElement('a')
 a.innerHTML=i+'<br>'
 a.addEventListener('click',function(e){
     console.log(this)  //this为当前点击的<a>
     e.preventDefault()  //如果调用这个方法，默认事件行为将不再触发。
     //例如，在执行这个方法后，如果点击一个链接（a标签），浏览器不会跳转到新的 URL 去了。我们可以用 event.isDefaultPrevented() 来确定这个方法是否(在那个事件对象上)被调用过了。
     alert(i)
 })
 const d=document.querySelector('div')
 d.appendChild(a)  //append向一个已存在的元素追加该元素。
}
```

## 手写ES5数组常见方法



### [#](http://interview.poetries.top/docs/handwritten.html#实现foreach方法)实现forEach方法

```js
Array.prototype.myForEach = function(callback, context=window) {
  // this=>arr
  let self = this,  
      i = 0,
      len = self.length;

  for(;i<len;i++) {
    typeof callback == 'function' && callback.call(context,self[i], i)
   }
}
```

### [#](http://interview.poetries.top/docs/handwritten.html#实现filter方法)实现filter方法

```js
Array.prototype.myFilter=function(callback, context=window){

  let len = this.length
      newArr = [],
      i=0

  for(; i < len; i++){
    if(callback.apply(context, [this[i], i , this])){
      newArr.push(this[i]);
    }
  }
  return newArr;
}
```

### [#](http://interview.poetries.top/docs/handwritten.html#实现map方法)实现map方法

- 回调函数的参数有哪些，返回值如何处理
- 不修改原来的数组

```js
Array.prototype.myMap = function(callback, context){
  // 转换类数组
  var arr = Array.prototype.slice.call(this),//由于是ES5所以就不用...展开符了
      mappedArr = [], 
      i = 0;

  for (; i < arr.length; i++ ){
    // 把当前值、索引、当前数组返回去。调用的时候传到函数参数中 [1,2,3,4].map((curr,index,arr))
    mappedArr.push(callback.call(context, arr[i], i, this));
  }
  return mappedArr;
}
```

### [#](http://interview.poetries.top/docs/handwritten.html#实现reduce方法)实现reduce方法

- 初始值不传怎么处理
- 回调函数的参数有哪些，返回值如何处理。

```js
Array.prototype.myReduce = function(fn, initialValue) {
  var arr = Array.prototype.slice.call(this);
  var res, startIndex;

  res = initialValue ? initialValue : arr[0]; // 不传默认取数组第一项
  startIndex = initialValue ? 0 : 1;

  for(var i = startIndex; i < arr.length; i++) {
    // 把初始值、当前值、索引、当前数组返回去。调用的时候传到函数参数中 [1,2,3,4].reduce((initVal,curr,index,arr))
    res = fn.call(null, res, arr[i], i, this); 
  }
  return res;
}
```

### [#](http://interview.poetries.top/docs/handwritten.html#array-isarray-实现)Array.isArray 实现

```js
Array.myIsArray = function(o) {
  return Object.prototype.toString.call(Object(o)) === '[object Array]';
};

console.log(Array.myIsArray([])); // true
```

### [#](http://interview.poetries.top/docs/handwritten.html#array-of-实现)Array.of 实现

> `Array.of()`方法用于将一组值，转换为数组

- 这个方法的主要目的，是弥补数组构造函数`Array()`的不足。因为参数个数的不同，会导致`Array()`的行为有差异。
- `Array.of()`基本上可以用来替代`Array()`或`new Array()`，并且不存在由于参数不同而导致的重载。它的行为非常统一

```js
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
```

**实现**

```js
function ArrayOf(){
  return [].slice.call(arguments);
}
```

### [#](http://interview.poetries.top/docs/handwritten.html#find实现)find实现

- `find` 接收一个方法作为参数，方法内部返回一个条件
- `find` 会遍历所有的元素，执行你给定的带有条件返回值的函数
- 符合该条件的元素会作为 find 方法的返回值
- 如果遍历结束还没有符合该条件的元素，则返回 `undefined`

```js
var users = [
  {id: 1, name: '张三'},
  {id: 2, name: '张三'},
  {id: 3, name: '张三'},
  {id: 4, name: '张三'}
]

Array.prototype.myFind = function (callback) {
  // var callback = function (item, index) { return item.id === 4 }
  for (var i = 0; i < this.length; i++) {
    if (callback(this[i], i)) {
      return this[i]
    }
  }
}

var ret = users.myFind(function (item, index) {
  return item.id === 2
})

console.log(ret)
```

### [#](http://interview.poetries.top/docs/handwritten.html#findindex实现)findIndex实现

```js
var users = [
  {id: 1, name: '张三'},
  {id: 2, name: '张三'},
  {id: 3, name: '张三'},
  {id: 4, name: '张三'}
]

Array.prototype.myFindIndex = function (callback) {
  // var callback = function (item, index) { return item.id === 4 }
  for (var i = 0; i < this.length; i++) {
    if (callback(this[i], i)) {
      // 这里返回
      return i
    }
  }
}

var ret = users.myFind(function (item, index) {
  return item.id === 2
})

console.log(ret)
```

### [#](http://interview.poetries.top/docs/handwritten.html#实现every方法)实现every方法

```js
Array.prototype.myEvery=function(callback, context = window){
    var len=this.length,
        flag=true,
        i = 0;

    for(;i < len; i++){
      if(!callback.apply(context,[this[i], i , this])){
        flag=false;
        break;
      } 
    }
    return flag;
  }


  // var obj = {num: 1}
  // var aa=arr.myEvery(function(v,index,arr){
  // 	return v.num>=12;
  // },obj)
  // console.log(aa)
```

### [#](http://interview.poetries.top/docs/handwritten.html#实现some方法)实现some方法

```js
Array.prototype.mySome=function(callback, context = window){
 			var len = this.length,
 			    flag=false,
           i = 0;

 			for(;i < len; i++){
				if(callback.apply(context, [this[i], i , this])){
					flag=true;
					break;
				} 
 			}
 			return flag;
		}

		// var flag=arr.mySome((v,index,arr)=>v.num>=10,obj)
		// console.log(flag);
```