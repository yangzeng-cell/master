- 不要在同一行声明多个变量
- 请使用`===/!==`来比较`true/false`或者数值
- 使用对象字面量替代`new Array`这种形式
- 不要使用全局函数
- `Switch`语句必须带有`default`分支
- `If`语句必须使用大括号
- `for-in`循环中的变量 应该使用`var`关键字明确限定作用域，从而避免作用域污染
- 符号优先级可以用括号来区分
- 尽量不要使用var,可以使用let和const来代替
- 在js中尽量使用exports和export default，import不要使用require和exports，module export
- 不要使用for in 来遍历数组和对象，因为会遍历原型链上的属性和对象，要使用for of 来遍历数组和对象