# Day06 作业布置

## 一. 完成课堂所有的代码





## 二. 继承关系图中的各个关系

* Function、Object、函数对象Foo的关系
* 普通对象、Foo创建出来的对象之间的关系
* 上面所有内容之间的关系



## 三. 编写ES6的类并且实现继承

class a{

constructor(name){

​	this.name=name

}

getName(){

return this.name}

}

class b extend a{

comnstructor(name){

super(name)

}

}

## 四. 使用babel进行ES6转ES5操作，并且阅读源码





## 五. 说说你对面向对象多态的理解

js可以说就是一种多态的表现形式，它可以展示为多种不同的表现形式，具体表现为对传入的参数可以是不同的类型



## 六. 自己写出案例进行字面量增强、解构练习

对象字面量增强：

```
const obj={
	方法的增强
	bar(name){
		return {
		属性的增强
		name
		}
	}
	//计算属性
	[symbol.iterator]:function(){
	
	}
}

const [name="张三",age=18,...newArr]=arr
const {name="zhang",age=18,...other}=obj
```























