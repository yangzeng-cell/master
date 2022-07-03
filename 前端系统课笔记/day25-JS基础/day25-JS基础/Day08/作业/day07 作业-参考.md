# Day01 作业布置

## 一. 完成课堂所有的代码



## 二. 整理Array的常见操作
* 创建数组:
  * 通过 []
  * 通过 Array()构造函数

```js
//数组的创建
var arr1 = ["HTML", "CSS", "JavaScript", "vue", "react"]
console.log(typeof arr1) //object

var arr2 = new Array()
var arr3 = new Array("HTML", "CSS", "JavaScript", "vue", "react")
```

* 访问数组中的元素 和 修改数组中的元素
  * 通过[index]
  * arr.at(i)
  * i >= 0，arr.at(i)与arr[i] 完全相同对于 i为负数的情况，arr.at(i)则从数组的尾部向前数
```js
var arr =  new Array("HTML", "CSS", "JavaScript", "vue", "react")

// 访问数组中的元素
console.log(arr[2]) //JavaScript
console.log(arr[-1]) //undefined

//arr.at(i)
console.log(arr.at(3))//vue
console.log(arr.at(-4))//CSS

//修改数组中的元素
arr[3] = "Angular"
console.log(arr)//['HTML', 'CSS', 'JavaScript', 'Angular', 'react']
```
* 增加数组中的元素 和 删除数组中的元素
  * 在数组的尾端添加或删除元素: push 在末端添加元素;pop 从末端取出一个元素
  * 在数组的首端添加或删除元素: shift 取出队列首端的一个元素，整个数组元素向前前移动; unshift 在首端添加元素，整个其他数组元素向后移动
  * 添加,删除和替换元素:arr.splice((start, deleteCount, item1, item2, itemN))
    * 从start位置开始，处理数组中的元素
    * deleteCount:要删除元素的个数，如果为0或者负数表示不删除
    * item1, item2, ...:在添加元素时，需要添加的元素;
```js
var arr =  new Array("HTML", "CSS", "JavaScript")

// 在数组的尾端添加或删除元素: push 和 pop
var num = arr.push("vue", "react")
console.log(arr, num) //['HTML', 'CSS', 'JavaScript', 'vue', 'react'] 5

var arr2 =  new Array("HTML", "CSS", "JavaScript")
var str = arr2.pop()
console.log(arr2, str)// ['HTML', 'CSS']  'JavaScript'

// 在数组的首端添加或删除元素 shift 和 unshift 
var arr3 =  new Array("HTML", "CSS", "JavaScript")
var str = arr3.shift()
console.log(arr3, str)//['CSS', 'JavaScript'] 'HTML'

var arr4 =  new Array("HTML", "CSS", "JavaScript")
var num = arr4.unshift("vue", "react")
console.log(arr4, num)//['vue', 'react', 'HTML', 'CSS', 'JavaScript'] 5

// arr.splice():返回被删除的元素组成的数组 没有被删除的元素 返回空数组

var arr5 =  new Array("HTML", "CSS", "JavaScript")
// 删除元素
var deleteaArr = arr5.splice(1, 2)
console.log(arr5) //['HTML']  
console.log(deleteaArr)//['CSS', 'JavaScript']

// 添加元素
var arr6 = new Array("HTML", "CSS", "JavaScript")
var deleteaArr = arr6.splice(0, 0, "vue", "react")
console.log(arr6)// ['vue', 'react', 'HTML', 'CSS', 'JavaScript']
console.log(deleteaArr)//[]

//替换元素
var arr7 = new Array("HTML", "CSS", "JavaScript")
var deleteArr = arr7.splice(1, 1, "vue", "react", "angular")
console.log(arr7)//['HTML', 'vue', 'react', 'angular', 'JavaScript']
console.log(deleteArr)//['CSS']
```

* 数组的长度:arr.length
* 数组的遍历:for; for..in; for..of
```js
var arr =  new Array("HTML", "CSS", "JavaScript")
//数组的长度
console.log(arr.length) // 3

//数组的遍历
for (var i = 0; i < arr.length; i++) {
  console.log(arr[i])
}

for (var index in arr) {
  console.log(index, arr[index])
}

for (var item of arr) {
  console.log(item)
}
```
* arr.slice(begin, end) 方法:用于对数组进行截取
  * 包含begin元素，但是不包含end元素
  * slice不会修改原数组 splice 修改原数组
* arr.concat方法:创建一个新数组，其中包含来自于其他数组和其他项的值
* arr.join:将一个数组的所有元素连接成一个字符串并返回这个字符串
```js
//arr.slice
var arr = new Array("HTML", "CSS", "JavaScript", "vue", "react")
var subArr = arr.slice(1, 3)
console.log(subArr) //['CSS', 'JavaScript']
console.log(arr) // ['HTML', 'CSS', 'JavaScript', 'vue', 'react']

//arr.conca
var arr2 = new Array("angular", "nodejs")
var arr3 = new Array("less", "sass")
var newArr = arr.concat(arr2, arr3)

// arr.join
var str = arr.join("--")
console.log(str)//HTML--CSS--JavaScript--vue--react
```

* 查找数组中的元素
  * arr.indexOf()方法: 查找某个元素的索引
  * arr.includes()方法:判断数组是否包含某个元素 
  * arr.find():返回提供的数组中满足提供的函数的第一个元素
  * arr.findIndex(): 返回提供的数组中满足提供的函数的第一个元素的索引
```js
//arr.indexOf() 和 arr.includes()
var arr = new Array("HTML", "CSS", "JavaScript", "vue", "react")
var index = arr.indexOf("JavaScript")
console.log(index)// 2
console.log(arr.indexOf("less")) // -1

console.log(arr.includes("JavaScript")) // true
console.log(arr.includes("less")) // false

// arr.find() arr.findIndex()
var students = [
  { id: 100, name: "aa", age: 18 },
  { id: 101, name: "bb", age: 30 },
  { id: 102, name: "cc", age: 25 },
  { id: 103, name: "dd", age: 22 }
]
var stu1 = students.find(function(item) {
  return item.id === 101
})

console.log(stu1) //{id: 101, name: 'bb', age: 30}

var arr = new Array("HTML", "CSS", "JavaScript", "vue", "react")
var findIndex = arr.findIndex(function(item, index, arr) {
return item === "JavaScript"
})
// var findIndex = arr.findIndex(item => item === "JavaScript")
console.log(findIndex) // 2
```

* 数组的排序和反转
  * arr.sort()方法:用于对数组进行排序, 直接改变原数组
  * arr.reverse():方法将数组中元素的位置颠倒，并返回该数组
```js
var arr = new Array("HTML", "CSS", "JavaScript", "vue", "react")
arr.sort() 
console.log(arr)//['CSS', 'HTML', 'JavaScript', 'react', 'vue']

var arr2 = new Array(18, 3, 15, 56, 80, 66)
arr2.sort(function(item1, item2){
  return item1 - item2
})
console.log(arr2)// [3, 15, 18, 56, 66, 80]

arr2.reverse()
console.log(arr2)//[80, 66, 56, 18, 15, 3]
```

* 数组中的其他高阶函数
  * arr.forEach():遍历数组，并且让数组中每一个元素都执行一次对应的方法
  * arr.filter():过滤出满足函数条件的元素创建一个新数组
  * arr.map():返回由原数组中的每个元素都调用一次提供的函数后的返回值组成的新数组
  * arr.reduce():用于计算数组中所有元素的总和
```js
//arr.forEach()
var arr = new Array("HTML", "CSS", "JavaScript", "vue", "react")
arr.forEach(function(item, index, arr) {
  console.log(index, item, arr)
})

//arr.filter()
var arr1 = new Array(1, 2, 3, 4, 5, 6, 7, 8)
var newarr = arr1.filter(function(item, index, arr){
  return item % 2 === 0
})
console.log(newarr)//[2, 4, 6, 8]

//arr.map()
var arr2 = new Array(3, 10, 15, 8, 6, 5)
var newarr2 = arr2.map(function(item, index, arr) {
  return item * 2
})
console.log(newarr2) //[6, 20, 30, 16, 12, 10]

//arr.reduce()
var nums = [11, 20, 55, 100, 88, 32]
var sum = nums.reduce(function(preValue, currentValue){
    return preValue + currentValue
}, 0)
console.log(sum) //306
```

## 三. 整理Date的常见操作
* 创建date对象
```js
// 1.没有传入任何的参数, 获取到当前时间
var date = new Date()
console.log(date)  //Mon May 16 2022 09:00:32 GMT+0800 (中国标准时间)

// 2.传入参数: 时间字符串
var date2 = new Date("2022-01-01")
console.log(date2)//Sat Jan 01 2022 08:00:00 GMT+0800 (中国标准时间)

// 3.传入具体的年月日时分秒毫秒
var date3 = new Date(2033, 10, 10, 09, 08, 07, 333)
console.log(date3)//Thu Nov 10 2033 09:08:07 GMT+0800 (中国标准时间)

// 4.传入时间戳 1s -> 1000ms
var date4 = new Date(1111325412312)
console.log(date4)//Sun Mar 20 2005 21:30:12 GMT+0800 (中国标准时间)
```
* dateString时间的表示方式
```js
//默认打印的时间格式是RFC 2822标准的:
var date = new Date()
console.log(date) // Mon May 16 2022 09:11:22 GMT+0800 (中国标准时间)
// 其他表示方式
console.log(date.toISOString()) //2022-05-16T01:13:06.968Z
console.log(date.toDateString()) //Mon May 16 2022
  
console.log(date.toLocaleDateString()) //2022/5/16
console.log(date.toLocaleTimeString()) //09:16:09
```

* Date对象方法
```js
var date = new Date()
console.log(date) // Mon May 16 2022 09:24:32 GMT+0800

console.log(date.getFullYear()) //2022
console.log(date.getMonth()) // 4 (表示5月份)
console.log(date.getDate()) // 16
console.log(date.getHours()) // 9
console.log(date.getMinutes()) // 24
console.log(date.getSeconds()) // 32
console.log(date.getMilliseconds()) // 465
console.log(date.getTime()) //1652664272465
console.log(date.getDay()) // 1 星期一
```

* 获取date对象的时间戳
```js
// 获取时间戳的方式
var date1 = new Date()
var date2 = new Date("2033-03-03")

// 方法一: 当前时间的时间戳
var timestamp = Date.now() //1652665290035
console.log(timestamp)

// 方法二/三将一个date对象转成时间戳
var timestamp2 = date1.valueOf()
console.log(timestamp2) //1652665290035
var timestamp3 = date2.getTime()
console.log(timestamp3) //1993420800000

// 方法四:
console.log(+date) //1132324234242
```
* 字符串转时间戳:Date.parse(str)
```js
var str = "2022-08-31" // -> Wed Aug 31 2022 08:00:00 GMT+0800 (中国标准时间)
console.log(Date.parse(str))//1661904000000
var str2 = "2021/05/31 10:30"
console.log(Date.parse(str2))//1622428200000

var str3 = "2022.08.31"// -> Wed Aug 31 2022 00:00:00 GMT+0800 (中国标准时间)
console.log(Date.parse(str3))//1661875200000

var srt4 = "123abc"
console.log(Date.parse(srt4)) //NaN
```



## 四. 说出对DOM和document对象的理解
* DOM:`文档对象模型(Document Object Model)将页面所有的内容表示为可以修改的对象`
  * 浏览器将我们编写在HTML中的每一个元素(Element)都抽象成了一个个对象
  * 所有这些对象都可以通过JavaScript来对其进行访问，那么我们就可以通过JavaScript来操作页面;
  * 所以，我们将这个抽象过程称之为 文档对象模型(Document Object Model)
* Document节点表示的整个载入的网页，它的实例是全局的document对象: 
  * `对DOM的所有操作都是从 document 对象开始的`
  * 它是DOM的入口点，可以从document开始去访问任何节点元素;



## 五. 整理节点、元素的导航有哪些？
* 节点之间的导航:
  * 父节点:parentNode
  * 前兄弟节点:previousSibling 
  * 后兄弟节点:nextSibling
  * 子节点:childNodes
  * 第一个子节点:firstChild
  * 第二个子节点:lastChild
* 元素之间的导航:
  * 父元素:parentElement
  * 前兄弟节点:previousElementSibling 
  * 后兄弟节点:nextElementSibling
  * 子节点:children
  * 第一个子节点:firstElementChild
  * 第二个子节点:lastElementChild



## 六. 说说节点常见的属性
* nodeName:获取node节点的名字
* tagName:获取元素的标签名词
* innerHTML:将元素中的 HTML 获取为字符串形式;设置元素中的内容
* outerHTML:包含了元素的完整 HTML;innerHTML 加上元素本身一样
* textContent:仅仅获取元素中的文本内容
* nodeValue:用于获取非元素节点的文本内容
* hidden:可以用于设置元素隐藏



## 七. 完成如下表格的效果

![表格效果](https://tva1.sinaimg.cn/large/e6c9d24egy1h28av3mn4ij207205paac.jpg)

























