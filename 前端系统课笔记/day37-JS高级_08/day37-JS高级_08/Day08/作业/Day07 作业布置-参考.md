# Day07 作业布置

## 一. 完成课堂所有的代码

01-多态

```js
<script>
      // 继承是多态的前提
      class Shape {
        getArea() {}
      }
      class Rectangle extends Shape {
        constructor(width, height) {
          super();
          this.width = width;
          this.height = height;
        }
        getArea() {
          return this.width * this.height;
        }
      }
      class Circle extends Shape {
        constructor(radius) {
          super();
          this.radius = radius;
        }
        getArea() {
          return this.radius * this.radius * Math.PI;
        }
      }
      var rect1 = new Rectangle(10, 20);
      var rect2 = new Rectangle(20, 50);
      var c1 = new Circle(10);
      var c2 = new Circle(20);

      function getShapeArea(shape) {
        console.log(shape.getArea());
      }
      getShapeArea(rect1);
      getShapeArea(c1);
      var obj = {
        getArea: function () {
          return 100;
        },
      };
      getShapeArea(obj);
</script>
```

02-函数对象原型关系

```js
<script>
      function foo(name, age) {
        console.log(name, age);
      }
      function test() {}
      console.log(Function.prototype === foo.__proto__);
      Function.prototype.message = "hello";
      console.log(foo.message);
      console.log(test.message);
      Function.prototype.hytest = function () {
        console.log("斤斤计较");
      };
      test.hytest();
      foo.hytest();
</script>
```

03-对象字面量的增强

```js
<script>
      var age = 90;
      var message = "hello";
      var key = "height" + age;
      var obj = {
        // 属性的简写
        age,
        message,
        // 方法的简写
        eating() {
          console.log("吃饭了");
        },
        [key]() {
          console.log("hhhh");
        },
        [message + "world"]: "你好",
      };
      console.log(obj);
      function foo() {
        const age = 22;
        const address = "北京";
        return { age, address };
      }
      let info = foo();
      console.log(info);
</script>
```

04-解构

```js
<script>
      //数组的解构
      //1.按顺序赋值
      var names = ["张三", "李四", "杨幂", undefined, "张杰"];
      var [name1, name2, name3] = names;
      console.log(name1, name2, names);
      //2.只想解构后面的元素
      var [, , item3] = names;
      console.log(item3);
      // 3.解构出一个元素,后面的元素放到新数组去
      var [item1, ...args] = names;
      console.log(args);
      //4.默认值
      var [item1, item2, item3, item4 = "默认值"] = names;
      console.log(item4);
      //二.对象的解构
      // 按Key赋值,没有顺序
      var obj = {
        age: 90,
        address: "北京",
        count: 20,
        size: undefined,
      };
      // var { age, count } = obj;
      // console.log(age, count);
      //1.只解构一个元素
      var { count } = obj;
      console.log(count);
      //2.重命名
      var { age: newAge } = obj;
      // console.log(age); //报错
      console.log(newAge);
      //3.默认值
      var { size = 20 } = obj;
      console.log(size);
      //4.重命名加默认值
      var {
        age: newAge1,
        address: newAddress,
        count: newCount,
        size: newSize = 2222,
        height: newHeight = 190,
      } = obj;
      console.log(newHeight, newSize);
      //5.对象的剩余内容
      var { age, ...otherObj } = obj;
      console.log(otherObj);
      //应用
      function getArea({ width, height }) {
        console.log(width, height);
      }
      getArea({ width: 111, height: 222 });
</script>
```

05-apply实现

```js
<script>
      function foo(name, age) {
        console.log(this, name, age);
      }
      // apply(this指向,数组)
      foo.apply({ info: "hello" }, ["张三", 28]);
      foo.apply("aaa", ["lisi", 22]);
      foo.apply(123, ["王五", 24]);
      // 手动实现apply
      //1.在Function的原型上添加
      //2.函数的参数
      Function.prototype.hyApply = function (thisArg, otherArgs) {
        //3.获取thisArg,并且确保是对象类型,注意null,undefined---window,数字--包装类
        thisArg =
          thisArg === null || thisArg === undefined ? window : Object(thisArg);
        // this--foo
        // thisArg.fn = this;
        //4.属性描述符添加属性
        Object.defineProperty(thisArg, "fn", {
          configurable: true,
          writable: false,
          enumerable: false,
          value: this,
        });
        //5.隐式绑定,调用
        thisArg.fn(...otherArgs);
        //6.删除
        delete thisArg.fn;
      };

      foo.hyApply("bbb", ["小红", 23]);
      foo.hyApply("123", ["小明", 23]);
      foo.hyApply({ info: "三生三世" }, ["小红2", 23]);
</script>
```

06-call实现

```js
<script>
      function foo(name, age) {
        console.log(this, name, age);
      }
      // call(this指向,参数列表)
      foo.call({ info: "hello" }, "张三", 28);
      foo.call("aaa", "lisi", 22);
      foo.call(123, "王五", 24);
      // 手动实现apply
      //1.在Function的原型上添加
      //2.函数的参数
      Function.prototype.hyCall = function (thisArg, ...otherArgs) {
        //3.获取thisArg,并且确保是对象类型,注意null,undefined---window,数字--包装类
        thisArg =
          thisArg === null || thisArg === undefined ? window : Object(thisArg);
        // this--foo
        // thisArg.fn = this;
        //4.属性描述符添加属性
        Object.defineProperty(thisArg, "fn", {
          configurable: true,
          writable: false,
          enumerable: false,
          value: this,
        });
        //5.隐式绑定,调用
        thisArg.fn(...otherArgs);
        //6.删除
        delete thisArg.fn;
      };

      foo.hyCall("bbb", "小红", 23);
      foo.hyCall("123", "小明", 23);
      foo.hyCall({ info: "三生三世" }, "小红2", 23);
</script>
```

07-apply,call抽取

```js
<script>
      function foo(name, age) {
        console.log(this, name, age);
      }
      // call(this指向,参数列表)
      foo.call({ info: "hello" }, "张三", 28);
      foo.call("aaa", "lisi", 22);
      foo.call(123, "王五", 24);
      // 封装方式一
      function execFn(thisArg, otherArgs, fn) {
        thisArg =
          thisArg === null || thisArg === undefined ? window : Object(thisArg);
        // this--foo
        // thisArg.fn = this;
        //4.属性描述符添加属性
        Object.defineProperty(thisArg, "fn", {
          configurable: true,
          writable: false,
          enumerable: false,
          value: fn,
        });
        //5.隐式绑定,调用
        thisArg.fn(...otherArgs);
        //6.删除
        delete thisArg.fn;
      }
      // 封装方式二
      Function.prototype.hyExec = function (thisArg, otherArgs) {
        thisArg =
          thisArg === null || thisArg === undefined ? window : Object(thisArg);
        // this--foo
        // thisArg.fn = this;
        //4.属性描述符添加属性
        Object.defineProperty(thisArg, "fn", {
          configurable: true,
          writable: false,
          enumerable: false,
          value: this,
        });
        //5.隐式绑定,调用
        thisArg.fn(...otherArgs);
        //6.删除
        delete thisArg.fn;
      };
      // 手动实现apply
      //1.在Function的原型上添加
      //2.函数的参数
      Function.prototype.hyCall = function (thisArg, ...otherArgs) {
        // this--foo
        // execFn(thisArg, otherArgs, this);
        this.hyExec(thisArg, ...otherArgs);
      };
      Function.prototype.hyApply = function (thisArg, otherArgs) {
        this.hyExec(thisArg, otherArgs);
      };
      foo.hyCall("bbb", "小红", 23);
      foo.hyCall("123", "小明", 23);
      foo.hyCall({ info: "三生三世" }, "小红2", 23);
      foo.hyApply({ info: "三生三世" }, ["小红2", 23]);
</script>
```

08-bind实现

```js
<script>
      function foo(name, age, height, score) {
        console.log(this, name, age, height, score);
      }
      var newFoo = foo.bind("abc", "张三", 23);
      newFoo(190, 220);
      // 自己实现bind
      Function.prototype.hyBind = function (thisArg, ...otherArgs) {
        // 获取thisArg,确保是对象
        thisArg =
          thisArg === null || thisArg === undefined ? window : Object(thisArg);
        //添加属性
        Object.defineProperty(thisArg, "fn", {
          configurable: true,
          enumerable: false,
          value: this,
        });
        // 返回新函数
        return (...args) => {
          // 合并参数
          var newArr = [...otherArgs, ...args];
          // 调用
          thisArg.fn(...newArr);
        };
      };
      var newFn = foo.hyBind("abc", "lili", 23, 111, 222);
      newFn();
      var newFn1 = foo.hyBind("abc", "lili");
      newFn1(23, 111, 222);
      var newFn2 = foo.hyBind("abc", "lili", 111, 222);
      newFn2(23);
</script>
```

09-let,const的使用

```js
<script>
      // ES6之前
      var num = 1;
      num = 23;
      num = 201;
      console.log(num);
      //ES6之后
      let message = "梦华录";
      message = "刘亦菲演员";
      message = "陈晓男主";
      console.log(message);
      //const 一旦被赋值,就不能被修改
      const age = 23;
      // age = 21;
      console.log(age);
      // const如果赋值的是引用类型,那可以通过引用找到对应的对象,修改对象的内容
      const info = {
        name: "lili",
        age: 10,
      };
      // info = {}; //报错,重新赋值了
      info.age = 99; //可以
      console.log(info);
</script>
```

10-重复声明

```
<script>
      // var 可以重复声明变量
      var age = 12;
      var age = 90;
      var age = 11;
      // let,const不可以重复声明变量
      let message = "hello";
      // let message = "hi";
      const info = "hi";
      // const info = "how are you";
</script>
```

11-作用域提升

```js
<script>
      // var 声明的变量会作用域提升
      console.log(age);
      var age = 10;
      // let/const声明的变量不会作用域提升,会先被创建但是在声明之前不能被访问
      // console.log(message); //报错
      let message = "hhh";
      console.log(info); //报错
      const info = "你好";
</script>
```

12-暂时性死区

```js
<script>
      // let,const定义的变量在声明之前不能被访问
      function bar() {
        //在暂时性死区
        // console.log(message, age);
        let message = "hello";
        let age = 90;
      }
      bar();
      //2.暂时性死区和定义的位置没有关系,和执行顺序有关
      function foo() {
        console.log(num); //90
      }
      let num = 90;
      foo();
      //暂时性死区形成之后,在该区域内这个标识符不能被访问
      // let count = 10;
      var count = 10;
      function fn() {
        console.log(count);
        let count = 99;
      }
      fn();

      // 1.形成的词法环境
      var message = "Hello World";
      var age = 18;
      function foo() {}
      let address = "广州市";

      {
        var height = 1.88;

        let title = "教师";
        let info = "了解真相~";
      }
</script>
```

13-let,const不添加window

```html
<script>
      //var 定义的变量会添加到window上
      var info = "哈哈哈哈";
      var num = 90;
      console.log(window.info, window.num);
      // let/const定义的变量不会添加到window上
      let age = 22;
      const address = "北京";
      console.log(window.age, window.address); //undefined
</script>
```

14-块级作用域

```js
<script>
      // 在ES5以及之前,只有函数和全局有自己的作用域
      {
        var message = "hhh";
      }
      console.log(message); //hhh
      //从ES6开始, 使用let/const/function/class声明的变量是有块级作用域
      console.log(info); //变量提升
      // foo(); //报错
      {
        var info = "hello";
        let age = 22;
        const name = "丽丽";
        class Person {
          constructor(name, age) {
            this.name = name;
            this.age = age;
          }
        }
        function foo() {
          console.log("999");
        }
      }
      // console.log(age); //报错
      // const p1 = new Person("王五", 23);
      foo();
      console.log(info);
</script>
```

15-块级作用域的应用

```js
<script>
      var btnEls = document.querySelectorAll("button");
      //第一种--用index
      for (var i = 0; i < btnEls.length; i++) {
        var btnEl = btnEls[i];
        btnEl.index = i;
        btnEl.onclick = function () {
          console.log(`点击了按钮${this.index}`);
        };
      }
      // 第二种-用立即执行函数
      for (var i = 0; i < btnEls.length; i++) {
        var btnEl = btnEls[i];
        (function (m) {
          btnEl.onclick = function () {
            console.log(`点击了按钮${m}`);
          };
        })(i);
      }
      // 第三种 -用let
      for (let i = 0; i < btnEls.length; i++) {
        var btnEl = btnEls[i];
        btnEl.onclick = function () {
          console.log(`点击了按钮${i}`);
        };
      }
</script>
```



## 二. 说说你对面向对象多态的理解

* 当对不同的数据类型执行同一个操作时, 如果表现出来的行为(形态)不一样, 那么就是多态的体现
* 继承也是多态的前提



## 三. 整理词法环境、环境记录等概念

* 词法环境是一种规范类型，用于在词法嵌套结构中定义关联的变量、函数等标识符
* 一个词法环境是由环境记录（Environment Record）和一个外部词法环境（outer Lexical Environment）组成
* 一个词法环境经常用于关联一个函数声明、代码块语句、try-catch语句，当它们的代码被执行时，词法环境被创建出来
* 环境记录分为声明式环境记录和对象式环境记录
  * 声明式环境记录：声明性环境记录用于定义ECMAScript语言语法元素的效果，如函数声明、变量声明和直接将标识符绑定与ECMAScript语言值关联起来的Catch子句
  * 对象式环境记录：对象环境记录用于定义ECMAScript元素的效果，例如WithStatement，它将标识符绑定与某些对象的属性关联起来



## 四. 说说let、const和var的区别

* 作用域提升

  * var声明的变量是会进行作用域提升
  * let、const没有进行作用域提升，但是会在解析阶段被创建出来 
  * let,const具有暂时性死区

* 块级作用域

  * var不存在块级作用域
  * let和const存在块级作用域

* 重复声明

  * var允许重复声明变量
  * let和const在同一作用域不允许重复声明变量

* 修改声明的变量

  * let,var 可以修改声明的变量

  * const它表示保存的数据一旦被赋值，就不能被修改,但是如果赋值的是引用类型，那么可以通过引用找到对应的对象，修改对象的内容



## 五. 理解let的块级作用域以及作用

* let/const/class/function会形成块级作用域
* 当点击按钮时,用let定义i,会具有块级作用域































