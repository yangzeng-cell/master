## 实现ES6的extends



```js
function B(name){
  this.name = name;
};
function A(name,age){
  //1.将A的原型指向B
  Object.setPrototypeOf(A,B);
  //2.用A的实例作为this调用B,得到继承B之后的实例，这一步相当于调用super
  Object.getPrototypeOf(A).call(this, name)
  //3.将A原有的属性添加到新实例上
  this.age = age; 
  //4.返回新实例对象
  return this;
};
var a = new A('poetry',22);
console.log(a);
```

```
function Parent(value) {
  this.val = value
}
Parent.prototype.getValue = function() {
  console.log(this.val)
}

function Child(value) {
  Parent.call(this, value)
}
Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    enumerable: false,
    writable: true,
    configurable: true
  }
})

const child = new Child(1)

child.getValue() // 1
child instanceof Parent // true
```

