# Day01 作业布置

## 一. 完成课堂所有的代码





## 二. 整理this的绑定规则

- 默认绑定：独立函数调用，函数没有被绑定到某个对象上进行调用

- 隐式绑定：通过某个对象发起的函数调用，在调用对象内部有一个对函数的引用。

- 显式绑定：明确this指向的对象，第一个参数相同并要求传入一个对象。

  - apply/call
  - bind

- new绑定：

  - 创建一个全新对象
  - 新对象被执行prototype链接
  - 新对象绑定到函数调用的this
  - 如果函数没有返回其他对象，表达式会返回这个对象

  

## 三. 说出apply、call、bind函数的用法和区别

​	  用法：

* ​    apply

  ​     第一个参数: 绑定this

  ​    第二个参数: 传入额外的实参, 以数组的形式

* ​    call

  ​    第一个参数: 绑定this

  ​    参数列表: 后续的参数以多参数的形式传递, 会作为实参

* ​    bind(不希望obj对象身上有函数)

  ```js
      var bar = foo.bind(obj)
  ​    bar() // this -> obj
  ```

  区别：

* call、apply和bind都可以改变函数的this指向

* call、apply和bind第一个参数的是this要指向的对象

* call、apply和bind都可以后续为函数传参，apply是将参数并成一个数组，call和bind是将参数依次列出

* call、apply都是直接调用，bind生成的this指向改变函数需要手动调用。
  



## 四. 说出箭头函数的各种用法和简写

- 基本写法
  - ()：函数的参数
  
  - {}:函数的执行体
  
  - ```js
        var foo3 = (name, age) => {
          console.log("箭头函数的函数体")
          console.log(name, age)
        }
    ```
  
    
- 优化写法
  - 只有一个参数时, 可以省略()
  
    ```js
        names.forEach(item => {
           console.log(item)
        })
    ```
  
    
  
  - 只有一行代码时, 可以省略{}
  
    ```js
    names.forEach(item => console.log(item))
    ```
  
    
  
  - 只要一行代码时, 表达式的返回值会作为箭头函数默认返回值, 所以可以省略return
  
    ```js
    var newNums = nums.filter(item => item % 2 === 0)
    var newNums = nums.filter(item => item % 2 === 0)
    ```
  
    
  
  - 如果箭头函数默认返回的是对象, 在省略{}的时候, 对象必须使用()包裹 () => ({name: "why"})
  
    ```JS
        var arrFn = () => ["abc", "cba"]
        var arrFn = () => {} // 注意: 这里是{}执行体
        var arrFn = () => ({ name: "why" })
        console.log(arrFn())
    ```
  
    

## 五. 完成this的面试题解析(不要求)



















