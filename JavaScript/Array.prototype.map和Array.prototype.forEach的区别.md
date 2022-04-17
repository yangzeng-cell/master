# Array.prototype.map和Array.prototype.forEach的区别

1. map会返回新的数组，foreach不会直接修改被调用的对象，回调函数可能修改那个对象
2. map需要一个返回值，foreach返回值是undefined且不可以链式调用
3. thisArg中map没有赋值，map回调函数中的this会指向undefined,forEach如果没有赋值或者为null,undefined则指向全局
4. forEach不可以中断执行，只有抛出异常