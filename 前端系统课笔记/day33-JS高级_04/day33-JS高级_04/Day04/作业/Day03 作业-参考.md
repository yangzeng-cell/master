# Day03 作业布置

## 一. 完成课堂所有的代码



```
  var message = "Global Message"

    function foo(num) {
      var message = "Foo Message"
      var age = 18
      var height = 1.88
      console.log(bar);
    }
    foo(123)
    foo(456)
    foo(789)
    var num1 = 10
    var num2 = 20
    var result = num1 + num2
    console.log(result);
    
     var message = "Global Message"

    function bar() {
      console.log("bar function");
      var address = "bar"
    }

    function foo(num) {
      var message = "Foo Message"
      var age = 18
      var height = 1.88
      bar()
      console.log(bar);
    }
    foo(123)
    var num1 = 10
    var num2 = 20
    var result = num1 + num2
    console.log(result);
    
        var name = "why"
    var age = 18

    var height = 1.88
    var address = "111"
    var intro = "了解真相 你才能获得真正的自由"

    function foo() {
      var message = "Hello World"
      console.log(message, name, age, height, address, intro);
    }
```



## 二. 整理JavaScript的代码的执行流程

- 首先在执行前会现在堆内存中开辟一块空间(GO) 存放一些初始的值 如Number String等等
- 还有代码中定义的一些变量 函数(在parser转成AST树的过程中存放在GO中的 )并没有赋值
- 同时在执行代码时在执行上下文栈(ECS)中存放一个全局执行上下文(GEC) 用于执行代码
  - GO中对应的函数 也会在堆内存中开辟出空间 为 Function Object 初始一些数据(name length scope chain等)
- 开始执行代码
- 每个EC中有着三个重要的内容(VO scope chain 以及this)
- VO指向对应的作用域(全局作用域(GO) 函数作用域(AO))
- ...

## 三. 说说你对GO/AO/VO的理解以及作用域和作用域链的理解

GO

- Global Object JS代码在执行前会现在堆内存中创建一个全局对象(GO)
- 用于存放一些定义好的变量方法等包含Date Array String Number setTimeout等
- 同时有一个window属性指向自己
- 同时在语法分析转成AST的过程中也会将一些变量 函数 存放在GO中 只是变量的初始值为undefined

AO 

- 函数在执行前会先在堆内存中创建一个AO(Activation Object)对象 里面存放这arguments 对应函数的形参 以及在函数中定义的变量 初始值为undefined

VO

- Variable Object  在执行函数时 会在执行上下文栈(ECS)中进入一个函数执行上下文(FEC)其中有三个核心 核心之一是VO 指向的是该函数在内存中解析时创建的AO 而在全局执行上下文中指向的是GO

作用域,作用域链

- 当进入到一个执行上下文时 执行上下文会关联一个作用域链
- 通常作用域链在解析时就被确定 因此 作用域链域函数的定义位置有关 而与它的调用位置无关



## 四. 说说V8引擎的内存管理以及垃圾回收器

内存管理

- JavaScript的内存管理是自动的
- 关于原始数据类型 直接在栈内存中分配
- 关于复杂数据类型 在堆内存中分配

垃圾回收(GC)

- 因为内存大小是有限的 所以在内存不需要的时候 需要进行释放 用于腾出空间
- GC对于内存管理有着对应的算法
- 常见的算法
  - 引用计数(Reference Count) 
    - 当一个对象有引用指向它时 对应的引用计数+1 
    - 当没有对象指向它时 则为0 此时进行回收
    - 但是有一个严重的问题 - 会产生循环引用
  - 标记清除(Mark-Sweep)
    - 核心思路: 可达性
    - 有一个根对象 从该对象出发 开始引用到所用到的对象 对于根对象没有引用到的对象 认为是不可用的对象
    - 对于不可用的对象 则进行回收
    - 该算法有效的解决了循环引用的问题
    - 目前V8引擎采用的就是该算法
- V8引擎为了优化 在采用标记清除的过程中也引用了其他的算法
  - 标记整理
    - 和标记清除相似 不同的是回收时 会将保留下来的存储对象整合到连续的内存空间 避免内存碎片化
  - 分代收集(Generational Collection)
    - 将内存中的对象分为两组 新的空间 旧的空间
    - 对于长期存活的对象 会将该对象从新空间移到旧空间中 同时GC检查次数减少
    - 将新空间分为from和to 对象的GC查找之后从from移动到to空间中 然后to变为from from变为to 循环几次 对于依然存在的对象 移动到旧空间中
  - 增量收集(Increment Collection)
    - 如果存在许多对象 则GC试图一次性遍历所有的对象 可能会对性能造成一定的影响 
    - 所以引擎试图将垃圾收集工作分成几部分 然后这几部分逐一处理 这样会造成微小的延迟 而不是很大的延迟
  - 闲时收集(IdIe-time Collection)
    - GC只会在CPU空闲的时候运行 减少可能对代码执行造成的影响

## 五. 你是如何理解闭包的,闭包到底是什么?

广义上讲 JavaScript的函数都是闭包

狭义上将 JavaScript中的函数如果访问了外层作用域中的变量 则称为闭包

实现上是一个函数与包含它的作用的引用绑定在了一起的组合



## 六. 闭包为什么会产生内存泄露以及如何解决

- 闭包使得原本该销毁的作用域由于内部函数的引用没有销毁 始终存在在堆内存中 因此产生了内存泄露

- 解决
  - 将保存着上层作用域引用的函数在使用完之后置为null将它的引用销毁在GC的下一次检查中 对应的内存就会被销毁

















