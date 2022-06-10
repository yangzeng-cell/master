# Day08 作业布置

## 一. 完成课堂所有的代码

 [1.模板字符串的使用.html](上课代码\1.模板字符串的使用.html) 

 [2.函数增强-默认参数用法.html](上课代码\2.函数增强-默认参数用法.html) 

 [3.默认参数注意事项.html](上课代码\3.默认参数注意事项.html) 

 [4.函数增强-默认参数结构.html](上课代码\4.函数增强-默认参数结构.html) 

 [5.函数增强-箭头函数的补充.html](上课代码\5.函数增强-箭头函数的补充.html) 

 [6.展开语法-展开基本使用.html](上课代码\6.展开语法-展开基本使用.html) 

 [7.引用赋值-浅拷贝-深拷贝.html](上课代码\7.引用赋值-浅拷贝-深拷贝.html) 

 [8.数字表示-进制和长数字.html](上课代码\8.数字表示-进制和长数字.html) 

 [9.Symbol-基本使用过程.html](上课代码\9.Symbol-基本使用过程.html) 

 [10.Symbol-额外知识补充.html](上课代码\10.Symbol-额外知识补充.html) 

 [11.Set的基本使用.html](上课代码\11.Set的基本使用.html) 

 [12.WeakSet的使用.html](上课代码\12.WeakSet的使用.html) 

 [13.Map和WeakMap的使用.html](上课代码\13.Map和WeakMap的使用.html) 

 [14.ES8-对象相关的属性.html](上课代码\14.ES8-对象相关的属性.html) 

 [15.ES8-字符串填充-尾部逗号.html](上课代码\15.ES8-字符串填充-尾部逗号.html) 

 [16.ES10-flat和flatMap.html](上课代码\16.ES10-flat和flatMap.html) 

 [17.ES10-Object.fromEntries.html](上课代码\17.ES10-Object.fromEntries.html) 

 [18.ES10-trimStart-trimEnd.html](上课代码\18.ES10-trimStart-trimEnd.html) 

 [19.ES11-BigInt表示大数字.html](上课代码\19.ES11-BigInt表示大数字.html) 

 [20.ES11-空值合并运算符.html](上课代码\20.ES11-空值合并运算符.html) 

 [21.ES11-可选连的使用过程.html](上课代码\21.ES11-可选连的使用过程.html) 

## 二. 整理ES6~ES11新增知识点（讲完后整理）

ES6 :

- 使用class用来定义类
  - constructor构造器
  - extends实现继承
  - super关键字代表继承的父类
- 对象字面量的增强
  - 属性的简写
  - 方法的简写
  - 计算属性名
- 解构
- let/const的使用
  - 不能重复声明变量
  - 不存在作用域提升
  - 存在暂时性死区
  - 不添加window
  - 存在块级作用域
- 字符串模板
  - 在模板字符串中，我们可以通过 ${expression} 来嵌入动态的内容
  - 标签模板字符串
- 函数的默认参数
- 函数的剩余参数
- 箭头函数
  - 没有显式原型prototype
  - 不绑定this、arguments、super参数
- 展开语法
  - 在函数调用时使用；
  - 在数组构造时使用；
  - 展开运算符其实是一种浅拷贝
  - 在构建对象字面量时，也可以使用展开运算符，这个是在ES2018（ES9）中添加的新特性；
- 规范了二进制和八进制的写法
- 新增Symbol
- Set、WeakSet、Map、WeakMap

ES7 :

- Array Includes
  - 通过includes来判断一个数组中是否包含一个指定的元素，根据情况，包含返回 true，否则返回false。
- 指数exponentiation运算符
  - **,对数字来计算乘方。

ES8 :

- Object values
  - 通过Object.values 来获取所有的value值
- Object entries
  - 通过 Object.entries 可以获取到一个数组，数组中会存放可枚举属性的键值对数组
- String Padding
  - padStart 和 padEnd 方法，分别对字符串的首尾进行填充的。
- Trailing Commas
  - 允许在函数定义和调用时多加一个逗号：
- Object.getOwnPropertyDescriptors

ES9 :

- 构建对象字面量时，可以使用展开运算符

ES10 :

- flat 
  - flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
- flatMap
  - flatMap是先进行map操作，再做flat的操作
  - flatMap中的flat相当于深度为1
- Object fromEntries
  -  Object.formEntries将entries转换成一个对象
- trimStart trimEnd
  - 去除字符串前面或者后面的空格

ES11 :

- BigInt
  - BigInt，用于表示大的整数(超过最大安全整数)
  - BitInt的表示方法是在数值的后面加上n
- 空值合并操作符
  - ??当前面的值为null或者undefined是,显式??后面的值
- Optional Chaining
  - 可选链?.
  - 当?.前面的值为空时返回undefined
- Global This
  - JavaScript环境的全局对象
- for..in标准化
  - for...in遍历对象时遍历的是key

## 三. 说说Symbol的用法和作用

用法

- Symbol值是通过Symbol函数来生成的
- Symbol()表示生成一个独一无二的值
- 我们也可以在创建Symbol值的时候,在()里面传入一个description,描述当前的Symbol
- 获取Symbol,使用Object.getOwnPropertySymbols()获取当前对象的Symbol,结果为一个数组

作用

- 用于对象的属性名,表示一个唯一的属性名

相同值的Symbol:

- 使用Symbol.for()生成,当key一样的时候,生成表示相同的Symbol
- Symbol.keyFor(Symbol.for())获取对应的key

## 四. 说说Set、WeakSet、Map、WeakMap的特点

Set:

- 用来存储数据,类似于数组,
- 与数组的区别是元素不能重复,
- 可以使用forEach方法和使用for...of...遍历
- 常见属性和方法
  - size：返回Set中元素的个数
  - add(value)：添加某个元素，返回Set对象本身
  - delete(value)：从set中删除和这个值相等的元素，返回boolean类型
  - has(value)：判断set中是否存在某个元素，返回boolean类型
  - clear()：清空set中所有的元素
  - forEach(callback, [, thisArg])：通过forEach遍历set

WeakSet: 

- 只能存储对象类型,不能存放基本数据类型,
- 对对象的引用是一个弱引用,如果没有其他对对象的引用,那么相应对象会被GC进行清除,
- 不能遍历
- 常见的方法
  - add(value)：添加某个元素，返回WeakSet对象本身
  - delete(value)：从WeakSet中删除和这个值相等的元素，返回boolean类型
  - has(value)：判断WeakSet中是否存在某个元素，返回boolean类型

Map:

- 用于存储映射关系,存储的为键值对,
- 每个键值对为一个数组,
- 与对象的区别是存储的key可以为一个对象
- 可以使用forEach方法和使用for...of...遍历
- 常见属性和方法
  - size：返回Set中元素的个数
  - set(key, value)：在Map中添加key、value，并且返回整个Map对象
  - get(key)：根据key获取Map中的value
  - has(key)：判断是否包括某一个key，返回Boolean类型
  - delete(key)：根据key删除一个键值对，返回Boolean类型
  - clear()：清空所有的元素
  - forEach(callback, [, thisArg])：通过forEach遍历Map

WeakMap:

- 存储的key只能为对象,不允许是其他类型
- 对对象的引用是一个弱引用,如果没有其他对对象的引用,那么相应对象会被GC进行清除,
- 不能进行遍历
- 常见的方法
  - set(key, value)：在Map中添加key、value，并且返回整个Map对象
  - get(key)：根据key获取Map中的value
  - has(key)：判断是否包括某一个key，返回Boolean类型
  - delete(key)：根据key删除一个键值对，返回Boolean类型

## 五. 掌握引用赋值-浅拷贝-深拷内存情况

引用赋值: 将一个变量中存储的对对象的引用地址赋值给另一个变量

```js
const obj = {}
const obj1 = obj
```

浅拷贝: 

- 使用...运算符展开一个对象时是一种浅拷贝,
- 只是将对像内的内容进行简单的复制,
- 如果对象中存储的内容为另一个对象时,并不是将另一个对象进行复制,
- 而是将外面对象内存储的对里面对象的引用进行复制

```js
const obj = {
    name: "xhf",
    foo: {
        name: "james"
    }
}
const obj1 = {...obj}
```

深拷贝:

- 完完全全的创建一个和原来的对象有相同结构的新的对象,
- 如果对象中存储的有其他的对象,在拷贝后的对象中也创建一个新的和里面对象除了内存地址不同,其他完全相同的对象
- 改变新对象中的任何内容,都不会对我们进行拷贝的对象造成任何影响

```js
const obj = {
    name: "xhf",
    foo: {
        name: "james"
    }
}
const obj1 = JSON.parse(JSON.stringify(obj))
```