最近看zepto源码，发现有用到了位运算符-not (~)，以前也见过类似“~~value”的用法，所以研究了下为什么这样用。

# 按位非运算符“~”

先看看w3c的定义：

> 位运算 NOT 由否定号（~）表示，它是 ECMAScript 中为数不多的与二进制算术有关的运算符之一。
>
> 位运算 NOT 是三步的处理过程：
>
> 1. 把运算数转换成 32 位数字
> 2. 把二进制数转换成它的二进制反码（0->1, 1->0）
> 3. 把二进制数转换成浮点数

简单的理解，对任一数值 x 进行按位非操作的结果为 **-(x + 1)**

```
console.log('~null: ', ~null);       // => -1
console.log('~undefined: ', ~undefined);  // => -1
console.log('~0: ', ~0);          // => -1
console.log('~{}: ', ~{});         // => -1
console.log('~[]: ', ~[]);         // => -1
console.log('~(1/0): ', ~(1/0));      // => -1
console.log('~false: ', ~false);      // => -1
console.log('~true: ', ~true);       // => -2
console.log('~1.2543: ', ~1.2543);     // => -2
console.log('~4.9: ', ~4.9);       // => -5
console.log('~(-2.999): ', ~(-2.999));   // => 1
```

那么, ~~x就为 **-(-(x+1) + 1)**

```
console.log('~~null: ', ~~null);       // => 0
console.log('~~undefined: ', ~~undefined);  // => 0
console.log('~~0: ', ~~0);          // => 0
console.log('~~{}: ', ~~{});         // => 0
console.log('~~[]: ', ~~[]);         // => 0
console.log('~~(1/0): ', ~~(1/0));      // => 0
console.log('~~false: ', ~~false);      // => 0
console.log('~~true: ', ~~true);       // => 1
console.log('~~1.2543: ', ~~1.2543);     // => 1
console.log('~~4.9: ', ~~4.9);       // => 4
console.log('~~(-2.999): ', ~~(-2.999));   // => -2
```

## ~value的使用

判断数值中是否有某元素时，以前这样判断：

```
if(arr.indexOf(ele) > -1){...} //易读
```

现在可以这样判断，两者效率：

```
if(~arr.indexOf(ele)){...} //简洁
```

## ~~value的使用

对于浮点数，~~value可以代替parseInt(value)，而且前者效率更高些

```
parseInt(-2.99) //-2
~~(-2.99) //-2
```

```
var time1 = +new Date();
var count = 5000000;
var ele = 1;
var arr = [1,2,4,5,2];
var h = 1.01;

console.time('parseInt');
for (var i = count; i > 0; i--) {
    parseInt(h);
}
console.timeEnd('parseInt'); //84.385ms

console.time('~~');
for (var i = count; i>0; i--) {
    ~~h;
}
console.timeEnd('~~'); //13.386ms


console.time('arr.indexOf(ele) > -1');
for (var j = count; j>0; j--) {
    arr.indexOf(ele) > -1;
}
console.timeEnd('arr.indexOf(ele) > -1'); //16.263ms

console.time('~arr.indexOf(ele)');
for (var i = count; i>0; i--) {
    ~arr.indexOf(ele);
}
```

