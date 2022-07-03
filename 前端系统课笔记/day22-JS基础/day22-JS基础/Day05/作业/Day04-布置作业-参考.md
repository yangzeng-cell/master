# Day04 作业布置

## 一. 完成课堂所有的代码

```js
// 函数的声明
function foo() {
  console.log('我是函数的声明');
}
foo()
// 函数的调用


// 函数的表达式
var bar = function () {
  console.log('我是函数的表达式');
}
bar()

// 函数的参数
function sum(num1, num2) { //形参
  var res = num1 + num2
  console.log(res);
}
sum(10, 20)  //实参


// 函数的返回值
function sum2(num1, num2) {
  return num1 + num2
}
console.log(sum2(10, 20));

// 数字格式化
function formatNum(count) {
  let strCount = count + ''
  if (strCount.length < 5) {
    return count * 1
  } else if (strCount.length >= 9) {
    return strCount / 100_000_000 + "亿"
  } else {
    return strCount / 10000 + '万'
  }
}

console.log(formatNum(554));
console.log(formatNum(10000));
console.log(formatNum(900_000_000));


function arg() {
  console.log(arguments); //arrlike
}
arg(10, 20, 30, 40)


// 1 1  2  3  5  8   13 
// 1 2  3  4  5  6   7
function num(n){
  if (n===1 || n===2) {
      return 1 
  }

  return num(n-1) + num(n-2)
}

console.log(num(7))


// 全局变量
let num222 = 10

function send(){
  var num = 20
  //局部变量
  console.log(num);
}


function add(num1,num2){
  return num1+num2
}

function isAdd(fn){
  if (fn(10,20)<50) {
      console.log('结果比50小');
  }
}

isAdd(add)
```





## 二. 自己定义3个自己的函数

* 要求：有参数、有返回值

  ```js
  function sum2(num1, num2) {
    return num1 + num2
  }
  console.log(sum2(10, 20));
  
  
  function joinStr(str1,str2){
      return str1+str2
  }
  
  console.log(joinStr('aaa','bbbb'));
  
  
  
  
  let arr =[10,20,30,40,50]
  
  let result = arr.filter(function(item){
    return item>20
  })
  
  console.log(result);
  ```

  



## 三. 总结局部变量和全局变量的使用(变量的访问顺序)

局部变量:定义在函数里面的遍历

全局变量：在函数以外声明的变量

优先访问自己作用域中的变量，如果没有找到，向父作用域继续查找，直到找到为止，如果找到window还没有找到，会报错



## 四. 总结函数头等公民、函数回调、匿名函数等概念的理解

一等公民：函数可以作为别的函数的参数、函数的返回值，赋值给变量或存储在数据结构中

回调函数：一个函数作为另外一个函数的参数，称之为回调函数，也称为高阶函数

匿名函数：如果在传入一个函数时，我们没有指定这个函数的名词或者通过函数表达式指定函数对应的变量，那么这个函数称之为匿名函数

















