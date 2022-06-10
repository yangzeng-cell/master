# Day06 作业布置

## 一. 完成课堂所有的代码





## 二. 继承关系图中的各个关系

* Function、Object、函数对象Foo的关系

  * Function/Object/Foo 都是Function的实例对象

  * Object是Function/Foo的父类
  * 函数的`__proto__`都指向Function的显示原型,包括Function自己的`__proto__`

  ```js
  var obj = {}; //相当于new Object()  ---> function Object(){}
  function Foo() {} //相当于 new Function() ---> function Function(){}
  function Person() {}
  
  console.log(obj.__proto__ === Object.prototype);
  
  console.log(Foo.__proto__ === Function.prototype);
  console.log(Person.__proto__ === Function.prototype);
  console.log(Foo.__proto__ === Person.__proto__);
  
  console.log(Object.__proto__ === Function.prototype);
  console.log(Function.__proto__ === Function.prototype);
  
  console.log(Foo.prototype.__proto__ === Object.prototype);
  console.log(Function.prototype.__proto__ === Object.prototype);
  
  var p1 = new Person();
  console.log(p1.__proto__ === Person.prototype);
  ```

* 普通对象、Foo创建出来的对象之间的关系

  * 普通对象的父类和Foo创建出来的对象的父类都是Object

* 上面所有内容之间的关系

查看ppt中的继承关系图



## 三. 编写ES6的类并且实现继承

```js
class Person{
    constructor(name,age,height) {
        this.name = name
        this.age = age
        this.height = height
    }
    running() {
        console.log("running~")
    }
    eating() {
        console.log("eating~")
    }
}
class Coder extends Person{
    constructor(name,age,height){
        super(name,age,height)
    }
    running() {
        console.log("在健身房")
        super.running()
    }
    code() {
        console.log("Write code~")
    }
    static work() {
        console.log("Working overtime every day~")
    }
}

var coderwhy = new Coder()
coderwhy.code()
Coder.work()
```



























