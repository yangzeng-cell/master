# Day02 作业布置

## 一. 完成课堂所有的代码

```


  <!-- 1.下载需要很长的事件, 并且执行也需要很长的时间 -->
  <!-- 总结一: 加上defer之后, js文件的下载和执行, 不会影响后面的DOM Tree的构建 -->
  <script>
    // 总结三: defer代码是在DOMContentLoaded事件发出之前执行
    window.addEventListener("DOMContentLoaded", () => {
      console.log("DOMContentLoaded")
    })
  </script>
  
  <h1>哈哈哈哈啊</h1>
  
    <style>
    .box,
    .container {
      width: 200px;
      height: 200px;
      background-color: orange;
    }

    .container {
      background-color: red;

      /* 会生成新的图层 */
      /* position: fixed; */
      /* transform值为3D的情况下 会生成新的图层 */
      /* transform: translateZ(10px); */

      /* opacity: 0.9;
      transition: all 1s ease; */

      will-change: transform;
    }

    .container:hover {
      /* transform: translateX(100px); */
      opacity: 0.2;
      /* margin-left: 100px; */

```



## 二. 完成this的面试题解析

```

var name = "window";
function Person(name) {
  this.name = name;
  this.foo1 = function () {
    console.log(this.name);
  };
  this.foo2 = () => console.log(this.name);
  this.foo3 = function () {
    return function () {
      console.log(this.name);
    };
  };
  this.foo4 = function () {
    return () => {
      console.log(this.name);
    };
  };
}
var person1 = new Person("person1");
var person2 = new Person("person2");
// person1.foo1() // person1 隐式调用 
// person1.foo1.call(person2) // person2 显示调用 this指向person2所在的对象
// person1.foo2(); // person1 箭头函数 向上层作用查找 上层作用域中的this为person1指向的对象
// person1.foo2.call(person2); // person1 箭头函数 显示绑定没用

// person1.foo3()() // window 相当于将返回的函数赋值给一个变量 指向该变量 是独立函数调用
// person1.foo3.call(person2)() // window 默认调用
// person1.foo3().call(person2) // person2 将函数的this显示绑定到person2所在的对象

// person1.foo4()() // person1 箭头函数 向上层作用域中查找this foo4中的this隐式绑定为person1
// person1.foo4.call(person2)() // person2  箭头函数 向上层作用域中查找this foo4中的this显示绑定为person2
// person1.foo4().call(person2) // person1 箭头函数显示绑定没用 和person1.foo4()()xiang'tong

```



## 三. 说出浏览器输入一个URL到页面显示的过程

- 首先通过DNS服务器进行域名解析
- 解析出对应的IP地址 然后从ip地址对应的主机发送http请求 获取对应的静态资源
- 默认情况服务器会返回index.html文件
- 然后浏览器内核开始解析HTML
- 首先 会解析对应的html 生成DOM Tree
- 解析过程中 如果遇到css的link标签 则会下载对应的css文件
  - 下载css文件和生成DOM树是同时进行
- 下载完对应的css文件后会进行css解析 生成CSSOM( CSS object model)
- 当DOM Tree和CSSTree都解析完成之后 会进行合并用来生成Render Tree(渲染树)
- 初步生成的渲染树会显示节点以及部分样式 但是并不表示每个节点的尺寸 位置信息 于是进行Layout(布局)来生成渲染树中节点的宽度 高度位置信息
- 经过Layout之后 浏览器内核将布局时的每个frame转屏幕上的每个像素点 将每个节点绘制到屏幕上

`注意: 第一次确定节点的大小位置 称之为布局(Layout) 之后对节点大小位置改变后的重新计算称之为回流`

引起回流的情况:

- DOM结构发生改变(节点的增删)
- 修改了节点的布局(宽度 高度 字体大小等)
- 修改窗口的尺寸
- 调用getComputedStyle获取位置信息

`第一次绘制节点 渲染到页面上称之为绘制(paint) 之后重新绘制 称之为重绘`

引起重绘情况:

- 修改背景色颜色 等

`回流一定会引起重绘 所以回流非常消耗性能`

如何避免回流

- 尽量一次性的修改样式
  - 通过添加classList
- 避免频繁的操作DOM
- 避免通过getComputedStyle获取尺寸位置信息等
- 对于某些元素使用position:absolute/fixed
  - 开销较小 不会对其他元素造成影响



## 四. 说说async和defer的使用以及区别

浏览器在解析构建DOM树的过程中 如果遇到script元素会停止构建DOM树 先下载JavaScript代码 执行对应的脚本

但是某些JavaScript代码中可能存在对某个节点的操作 如果等待DOM树构建完成 之后在进行对应的操作 则会造成大量的回流和重绘

同时在如果JavaScript 代码过多 则浏览器处理的时间会过长 则会造成页面的阻塞

为了解决这个问题 出现了两个属性 async defer

defer

- 脚本的下载会与DOM树的构建同时进行
- 如果脚本提前下载好了 则会等到DOM树构建完成之后 在DOMContentLoaded事件之前执行defer中的代码
- 同时多个defer属性的script标签 则会按照顺序执行
- 推荐放到head标签中 可以早解析
- 对于script默认的内容 会忽略

async

- 脚本的下载会与DOM树的构建同时进行
- 让一个脚本完全独立 脚本的解析 运行于DOM的构建无关
- 多个async属性的脚本不保证运行顺序
- 通常用于独立的脚本 对于其他脚本 DOM没有依赖

## 五. 写出v8引擎执行代码的大致流程

- Parse模块 将JavaScript代码转成AST Tree
- Ignition :解释器 将ASTTree 转换为字节码(byte Code)
  - 同时收集TurboFan 优化需要的信息
- TurboFan :编译器 将字节码编译为CPU可以直接执行的机器码(machine code)
  - 如果某一个函数呗被多次调用 则会被标记为热点函数 会经过TurBoFan转换的优化的机器码 让CPU执行 提高代码性能
  - 如果后续执行代码过程中 改函数调用时的参数类型发生了改变 则会逆向的转成字节码 让CPU执行

执行流程:

- 首先会编译JavaScript  编译过程分为三步

- 1 词法分析(scanner)

  - 会将对应的每一行的代码的字节流分解成有意义的代码块 代码块被称为词法单元(token 进行记号化)

- 2 语法分析(parser)

  - 将对应的tokens分析成一个元素逐级嵌套的树 这个树称之为 抽象语法树(Abstract Syntax Tree AST)
  - 这里也有对应的 pre-parser

- 3 将AST 通过Ignition解释器转换成对应的字节码(ByteCode) 交给CPU执行 同时收集信息 

  - 将可优化的信息 通过TurBoFan编译器 编译成更好使用的机器码交给CPU执行
  - 如果后续代码的参数类型发生改变 则会逆优化(Deoptimization)为字节码

  





















