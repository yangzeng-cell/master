# rest参数

ES6引入rest参数（形式为“...变量名”），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

**rest参数中的变量代表一个数组**，所以数组特有的方法都可以用于这个变量。下面是一个利用rest参数改写数组push方法的例子。

```php
function push(array, ...items) {
  items.forEach(function(item) {
    array.push(item);
    console.log(item);
  });
}
123456123456
```

var a = [];
push(a, 1, 2, 3)

注意，**rest参数之后不能再有其他参数（即只能是最后一个参数）**，否则会报错。

# 扩展运算符

### 含义

扩展运算符（spread）是三个点（...）。它好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列。

```javascript
console.log(...[1, 2, 3])
// 1 2 3
1212
```

console.log(1, …[2, 3, 4], 5)
// 1 2 3 4 5

[…document.querySelectorAll(‘div’)]
// [<div>, <div>, <div>]

该运算符主要用于函数调用。

```php
function push(array, ...items) {
  array.push(...items);
}
123123
```

function add(x, y) {
return x + y;
}

var numbers = [4, 38];
add(…numbers) // 42

上面代码中，`array.push(...items)`和`add(...numbers)`这两行，都是函数的调用，它们的都使用了扩展运算符。该运算符将一个数组，变为参数序列。
扩展运算符与正常的函数参数可以结合使用，非常灵活。

```javascript
function f(v, w, x, y, z) { }
var args = [0, 1];
f(-1, ...args, 2, ...[3]);
123123
```

### 替代数组的apply方法

由于扩展运算符可以展开数组，所以不再需要apply方法，将数组转为函数的参数了。

```javascript
// ES5的写法
function f(x, y, z) {
  // ...
}
var args = [0, 1, 2];
f.apply(null, args);
123456123456
```

// ES6的写法
function f(x, y, z) {
// …
}
var args = [0, 1, 2];
f(…args);

一个例子是通过push函数，将一个数组添加到另一个数组的尾部。

```javascript
// ES5的写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);
12341234
```

// ES6的写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1.push(…arr2);

上面代码的ES5写法中，push方法的参数不能是数组，所以只好通过apply方法变通使用push方法。有了扩展运算符，就可以直接将数组传入push方法。

### 扩展运算符的应用

###### （1）合并数组

扩展运算符提供了数组合并的新写法。

```
var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];
123
```

// ES5的合并数组
arr1.concat(arr2, arr3);
// [ ‘a’, ‘b’, ‘c’, ‘d’, ‘e’ ]

// ES6的合并数组
[…arr1, …arr2, …arr3]
// [ ‘a’, ‘b’, ‘c’, ‘d’, ‘e’ ]

###### （2）与解构赋值结合

扩展运算符可以与解构赋值结合起来，用于生成数组。

```cpp
onst [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]
123123
```

const [first, …rest] = [];
first // undefined
rest // []:

const [first, …rest] = [“foo”];
first // “foo”
rest // []

如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。

```cpp
const [...butLast, last] = [1, 2, 3, 4, 5];
// 报错
1212
```

const [first, …middle, last] = [1, 2, 3, 4, 5];
// 报错

###### （3）函数的返回值

JavaScript的函数只能返回一个值，如果需要返回多个值，只能返回数组或对象。扩展运算符提供了解决这个问题的一种变通方法。

```javascript
var dateFields = readDateFields(database);
var d = new Date(...dateFields);
1212
```

上面代码从数据库取出一行数据，通过扩展运算符，直接将其传入构造函数Date。

###### （4）字符串

扩展运算符还可以将字符串转为真正的数组。

```
[...'hello']
// [ "h", "e", "l", "l", "o" ]
12
```

上面的写法，有一个重要的好处，那就是能够正确识别32位的Unicode字符。

###### （5）实现了Iterator接口的对象

任何Iterator接口的对象，都可以用扩展运算符转为真正的数组。

```javascript
var nodeList = document.querySelectorAll('div');
var array = [...nodeList];
1212
```

上面代码中，querySelectorAll方法返回的是一个nodeList对象。它不是数组，而是一个类似数组的对象。这时，扩展运算符可以将其转为真正的数组，原因就在于NodeList对象实现了Iterator接口。
对于那些没有部署Iterator接口的类似数组的对象，扩展运算符就无法将其转为真正的数组。

```javascript
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};
123456123456
```

// TypeError: Cannot spread non-iterable object.
let arr = […arrayLike];

上面代码中，arrayLike是一个类似数组的对象，但是没有部署Iterator接口，扩展运算符就会报错。这时，可以改为使用Array.from方法将arrayLike转为真正的数组。

###### （6）Map和Set结构，Generator函数

扩展运算符内部调用的是数据结构的Iterator接口，因此只要具有Iterator接口的对象，都可以使用扩展运算符，比如Map结构。

```javascript
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);
1234512345
```

let arr = […map.keys()]; // [1, 2, 3]

Generator函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。

```javascript
var go = function*(){
  yield 1;
  yield 2;
  yield 3;
};
1234512345
```

[…go()] // [1, 2, 3]

上面代码中，变量go是一个Generator函数，执行后返回的是一个遍历器对象，对这个遍历器对象执行扩展运算符，就会将内部遍历得到的值，转为一个数组。
如果对没有iterator接口的对象，使用扩展运算符，将会报错。

```javascript
var obj = {a: 1, b: 2};
let arr = [...obj]; // TypeError: Cannot spread non-iterable object
1212
```

From [函数的拓展](https://shuoshubao.gitbooks.io/ecmascript6/content/docs/function.html)

```
      </div>
```