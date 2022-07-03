# Day05 作业布置

## 一. 完成课堂所有的代码



## 二. 什么是原型、原型链？

原型：在JavaScript中，每一个对象都会有一个属性[[prototype]]，这个属性就是对象的原型，这个属性的值也是一个对象，是原对象的原型对象。访问对象中属性时，会先在对象自身进行查找，如果没有找到，那么会去对象的原型对象上查找。

原型链：每个对象都有自己的原型对象，原型对象也有自己的原型对象。在访问对象的属性时，会沿着对象自身=>自身的原型对象=>原型对象的原型对象......这样的链条一路查找上去，这条链式结构就叫做原型链。原型链的尽头是Object的原型对象的[[prototype]]属性，值为null。

## 三. 如何通过原型链实现继承？

 原型链继承：重写子类的显式原型对象，让子类的显式原型对象的隐式原型指向父类的显式原型对象。

ES5中继承的演变过程：原型链继承=> 构造函数继承=> 组合继承（原型链+构造函数继承）=> 寄生组合继承(原型链+寄生式函数+构造函数继承)

```javascript
function createObject(o) {
  function F() {}
  F.prototype = o
  return new F()
}
function inherit(Subtype, Supertype) {
  Subtype.prototype = createObject(Supertype.prototype)
  Object.defineProperty(Subtype.prototype, "constructor", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: Subtype
  })
}
function Person() {}
function Student() {
  Person.call(this)
}
inherit(Student, Person)
```



## 四. 继承的各个方案以及优缺点

方案一：直接将父类的prototype赋值给子类的prototype，父类和子类共享原型对象

缺点：在子类原型对象上添加方法和属性会影响到父类

```javascript
function Person() {}
function Student() {}
Student.prototype = Pesrson.prototype
```

方案二：通过new操作符创建一个新的对象，将这个对象作为子类的原型对象(显式原型)

缺点：

- 子类的实例对象继承过来的属性是在原型上的，无法打印
- 没有完美的实现属性的继承（子类的实对象可以从父类继承属性，也可以拥有自己的属性）

```javascript
function Person() {}
function Student() {}
var p = new Person()
Student.prototype = p
```

方案三：通过new操作符创建一个新的对象，将这个对象作为子类的原型对象(显式原型)，并且在子类的内部通过借用构造函数的方法实现属性的继承

缺点：父类构造函数会被调用两次，并且子类的实例对象总是有两份相同的属性，一份在自身，一份在其原型对象上

```javascript
function Person(arg1, arg2) {}
function Student() {
  Person.call(this, arg1, arg2)
}
var p = new Person()
Student.prototype = p
```

方案四：让子类的原型对象(显式原型)的原型对象(隐式原型)指向父类的原型对象(显式原型)

缺点：存在兼容性问题,`__proto__`属性只有部分游览器支持

```javascript
function Person() {}
function Student() {}
Student.prototype.__proto__ = Person.prototype
```

方案五：寄生组合式继承(ES5中实现继承的最终方案)

```javascript
function createObject(o) {
  function F() {}
  F.prototype = o
  return new F()
}
function inherit(Subtype, Supertype) {
  Subtype.prototype = createObject(Supertype.prototype)
  Object.defineProperty(Subtype.prototype, "constructor", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: Subtype
  })
}
function Person() {}
function Student() {
  Person.call(this)
}
inherit(Student, Person)
```

## 五. 最终ES5实现继承的方案

寄生组合式继承

```javascript
function createObject(o) {
  function F() {}
  F.prototype = o
  return new F()
}
function inherit(Subtype, Supertype) {
  Subtype.prototype = createObject(Supertype.prototype)
  Object.defineProperty(Subtype.prototype, "constructor", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: Subtype
  })
}
function Person() {}
function Student() {
  Person.call(this)
}
inherit(Student, Person)
```



















