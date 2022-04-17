```
//生成器的声明
function *generatorFn(){

}
//生成器函数表达式的写法
let generatorFn=function *(){

}
//// 作为对象字面量方法的生成器函数
let f00={
	*generator(){
	
	}
}
//作为类实例方法的生成器函数
class Foo{
	*generator(){
	
	}
}
//作为类静态方法的生成器函数
class Foo{
static *generator(){

}
}


箭头函数不能用来定义生成器函数。



生成器函数内部的执行流程会针对每个生成器对象区分作用域。在一个生成器对象上调用 next()
不会影响其他生成器：
function* generatorFn() { 
 yield 'foo'; 
 yield 'bar'; 
 return 'baz'; 
} 
let generatorObject1 = generatorFn(); 
let generatorObject2 = generatorFn(); 
console.log(generatorObject1.next()); // { done: false, value: 'foo' } 
console.log(generatorObject2.next()); // { done: false, value: 'foo' }



yield 关键字只能在生成器函数内部使用，用在其他地方会抛出错误。类似函数的 return 关键字，
yield 关键字必须直接位于生成器函数定义中，出现在嵌套的非生成器函数中会抛出语法错误：
// 有效
function* validGeneratorFn() { 
 yield; 
} 
// 无效
function* invalidGeneratorFnA() { 
 function a() { 
 yield; 
 } 
} 
// 无效
function* invalidGeneratorFnB() { 
 const b = () => { 
 yield; 
 } 
} 
// 无效
function* invalidGeneratorFnC() { 
 (() => { 
 yield; 
 })(); 
} 



. 生成器对象作为可迭代对象
在生成器对象上显式调用 next()方法的用处并不大。其实，如果把生成器对象当成可迭代对象，
那么使用起来会更方便：
function* generatorFn() { 
 yield 1; 
 yield 2; 
 yield 3; 
} 
for (const x of generatorFn()) { 
 console.log(x); 
} 
// 1 
// 2 
// 3
```

