## 1. 整理节点、元素的导航有哪些？

```
1.父节点 parentNode 父元素 parentElement
2.子节点 childNode 子元素 children
3.上一个兄弟节点 previousSibling 上一个兄弟元素 previousElementsSibling
4.下一个兄弟节点 nextSibling 下一个兄弟元素 nextElementSibling
5.第一个子节点 firstChild 第一个子元素 firstElementChild
6.最后一个子节点 lastChild 最后一个子元素 lastElementChild
```



## 2. 说说节点（Node）常见的属性

```
1.nodeType 获取节点的类型  注释节点8 文本节点3 元素节点1
2.tagName 获取元素的名字
3.nodeName 获得节点的名字
4.innerHTML 获取/写入html元素
5.textContent 获取/写入文本节点
6.outerHtml 获取当前元素及其子元素/设置就是替换掉当前元素及其子元素
7.nodeValue/data 获取非元素节点的文本内容
8.hidden 也是一个全局属性，可以在元素上设置，可以用于设置元素的隐藏
	ele.hidden=true
```



## 3. 说说attribute和Property的区别和关系

对于标准的attribute,attribute和property是相等的，但是对于自定义的attribute属性，则没有对应的

property,大对数情况下他们是相互作用的，修改property，attribute也会相应的改变，input的value属性只能通过attribute来修改，大对数情况下推荐使用property



## 4. 说说修改class和修改style的区别

```
修改class可以使用ele.className="class why"
			   ele.classList.add(),
			   ele.classList.remove()
			   ele.calssList.has()
			   ele.classList.contains()
修改style:ele.style.width="18px"
如果是多个style修改 ele.style.cssText=`
	width:18px;
	heigtht:20px`;
```



## 5. 整理DOM常见的操作方法



```
1.document.getElementsByTagName()
2.document.getElementsByClassName()
3.document.getElementById()
4.document.querySelector()
5.document.querySelectorAll()
6.document.write()
7.document.createElement(ele)
8.node.append(node/string)//子元素尾部添加
9.node.prepend()//子元素头部添加
10.node.before()//元素前面添加
11.node.after()//元素后面添加
12.node.replaceWith()//替换子元素
13.node.remove()删除元素本身
14.ele.cloneNode(true)//克隆元素本身
```

## 6.整理常见的事件，并且说出mouseenter和mouseover的区别



```
1.鼠标事件：
	click 鼠标点击
	mouseover/mouseout //鼠标指针移入移出
	mousedown/mouseup //鼠标按下弹起
	mousemove //鼠标移动
	mouseenter/mouseleave
2.键盘事件
	keydown/keyup
3.表单事件
	submit/reset/focus/change/checked
4.Document事件
	DomContentLoaded //当HTML加载和处理完成，Dom完成渲染时
5.CSS事件
	transitioned 当一个css动画完成时

mouseenter和mouseleave
	不支持冒泡
	进入子元素依然属于在该元素内，没有任何反应
mouseover和mouseout
	支持冒泡
	进入元素的子元素时
	会先触发父元素的mouseout,再触法子元素的mouseover,
	因为支持冒泡，所以会将mouseover传递到父元素
```

## 7.说说load和DOMContentLoaded的区别

DOMContentLoaded:浏览器已经完全加载HTML。并且构建了DOM树，但是像img和css之类的外部资源可能还没有加载

load：浏览器不仅构建完成DOM，而且加载完成了所有的外部资源

## 8.说说事件冒泡和事件捕获的理解

事件冒泡就是默认情况下事件由最内层元素向最外层元素依次传递

事件捕获就是事件从最外层向内层逐级传递

## 9.EventTarget的使用

所有的节点，元素都继承自EventTarget,window对象也是继承自Eventtarget,EventTarget是一个DOM接口，主要用于添加，删除，派发Event事件

EventTarget常用的方法

```
addEventListener(event,callbackName,[true/false])
removeEventListener(callbackName)
dispatchEvent
```

## 10.说说你对事件委托的理解

子元素被点击的时候，父元素可以通过事件冒泡来监听事件的点击，通过

event.target来获取当前监听的元素

## 11.整理JSON的相关用法和应用场景

数据传输，配置文件

JSOM序列化 JSON.stringfy(obj)

JSON的反序列化 JSON.parse(str)

## 12.localStorage和sessionStorage的区别

```
1.关闭网页后重新打开，localStorage会保留，而sessionStorage会被删除
2.在页面内实现跳转，localStoragw会保留，sessionStorage也会保留
3.在页面外实现跳转(打开新的网页)，localStorage会保留，sessionStorage不会保留
```



## 13.整理this的绑定规则

```
1.默认绑定:函数的独立调用时，this默认绑定window
2.隐式绑定：通过对象进行函数调用时，this会绑定到object
3.显示绑定：通过call,apply,bind可以修改this的绑定对象
4.new绑定：通过new 创建的对象，this会绑定到新创建的对象身上
默认绑定的优先级最低
显示绑定的优先级高于隐式绑定
new绑定的优先级高于隐式绑定
bind的优先级高于call,apply
new绑定和call,apply不可以同时使用
new绑定可以和bind一起使用，new绑定优先级更高
forEach中的this默认指向window
事件绑定中this指向绑定的元素
setTimeout中this指向window
```

## 14.说出apply、call、bind函数的用法和区别

```
1.apply函数第二个参数是一个数组，需要把多个参数放入数组中，apply调用会立即执行
2.call函数可以传入多个参数，也是会立即调用
3.bind函数不会立即调用，会返回一个新的函数
call,apply第一个参数传null,undefined参数表示函数的调用，但是this是默认绑定
```

## 15.说出箭头函数的各种用法和简写

```
箭头函数没有绑定this,箭头函数中的this由上层作用域来决定
箭头函数中没有arguments,如果在箭头函数中使用了arguments,他回去上层作用域中去找arguments
箭头函数不可以作为构造函数，所以不可以用new创建对象，
箭头函数不可以作为生成器函数
箭头函数不可以使用显示绑定
箭头函数可以替代const _this=this
箭头函数的写法()=>{
return
}
或者錒a=>b
```

## 16.this的面试题

![](C:\Users\10152\Desktop\study\memo\前端系统课笔记\image\QQ截图20220610135220.png)

![QQ截图20220610140505](C:\Users\10152\Desktop\study\memo\前端系统课笔记\image\QQ截图20220610140505.png)

![QQ截图20220610145355](C:\Users\10152\Desktop\study\memo\前端系统课笔记\image\QQ截图20220610145355.png)

![](C:\Users\10152\Desktop\study\memo\前端系统课笔记\image\QQ截图20220610214721.png)

## 16.new创建对象具体做了什么

1.创建一个空对象

2.让构造函数中的this指向空对象

3.让新创建对象的__proto__指向构造函数的prototype

4.执行该构造函数

5.如果该构造函数没有返回非空对象，则返回新创建的对象

## 17.说出浏览器输入一个URL到页面显示的过程

首先通过DNS解析，获取到真实的ip地址，然后向真实的ip地址的服务器发起http请求，获取到服务器返回的静态资源，然后浏览器就会对返回的静态资源进行解析，对html文件进行从上至下的解析，首先将html解析成DOM树，如果遇到css文件，则会加载css文件，但不会阻塞dom的解析，但会阻塞render树的构建，解析css成cssom树，然会组合成render树，如果遇到js文件，js的加载会阻塞dom的解析，因为js可能会操作dom，所以会造成dom树的重新挂载，会进行回流重绘，最终渲染到浏览器上



回流

DOM结构发生改变，例如节点的移动，删除，增加，

改变了页面的布局例如修改了width,heigth,padding,margin,font-size

窗口的尺寸发生了改变，例如resize

调用getComputedStyle方法和getBoundingClientRect获得元素的尺寸，位置信息

重绘

就是修改了backgroundColor，color等颜色

回流一定会产生重绘，重绘不一定会发生回流

解决方法

1.对DOM节点进行批量修改，使用Document.createDocumentFragment()对需要修改的节点进行批量修改

2.对需要修改的DOM节点可以先他不挂在dom树上，设置display：none,再就行修改

3.修改样式时尽量一次性修改，可以使用css class修改，也可以使用cssText

4.尽量避免使用getComputedStyled获取尺寸。如果要使用尽量避免频繁的获取，可以先存储起来

5.对某些元素使用position的absolute或者fixed

6.默认情况下，标准流中的内容都会被绘制再同一个图层上。利用一些属性创建一个新的合成图层。

​	这些layer可以使用GPU加速绘制。因为这些图层都是单独渲染的，减少了回流和重绘

例如 3d transforms，vedio,canvas,iframe,opacity动画转换时，position：fixed

​		animation或者trasition 设置了opacity,transform

分层确实可以提高性能，但是不要过度使用，他是以内存为代价的

##  18.说说async和defer的使用以及区别

浏览器在解析HTML的过程中，遇到script元素是不能继续构建。他会等js代码下载完成以后执行js脚本，等js脚本执行完成后，才继续解析HTML代码，构建HTML树。js代码中可能需要操作DOM，所以会带来大量的回流和重绘。如果js代码过多，浏览器处理时间就会很长，就可能造成页面阻塞。所有有两个属性async和defer

defer

​	脚本的下载会和DOM构建同时进行

​	如果脚本提前下载完成，会等DOM树构建完成之后在DOMContentLoaded事件之前执行defer中的代码

​	如果有多个defer属性的script标签，则会按照顺序执行

​	推荐将defer属性script放在head中可以尽快解析

​	对于script默认的内容则会忽略

async

​	脚本的下载会与DOM树的构建同时进行

​	让一个脚本完全独立的进行解析，与DOM的构建顺序没有关系

​	多个async不会按顺序加载

​	通常用于独立的脚本并且不会对其他脚本有依赖

## 19.写出v8引擎执行代码的大致流程

Parse模块会将Javascript代码转化成AST树(抽象语法树)。如果函数没有被调用，那么就是不会被转化成AST树

Ignition是一个解释器，会将AST转化成ByteCode(字节码)，同时会收集TurboFan优化需要的信息

TurboFan是一个编译器，可以将字节码编译成CPU可以直接执行的机器码，如果某个函数被调用多次，则会被标记称为热点函数，会经过TurBoFan转换的优化的机器码，让CPU执行，提高代码性能

如果后续执行代码过程中，函数参数的类型发生了变化，机器码也会被还原为字节码，让CPU执行

执行流程

​	首先会编译javascript,编译过程分为三部

​	词法解析

​	会将对应的每一行的代码的字节流分解成有意义的代码块，代码块也被称为此法单元（token进行记号化）

​	语法解析

​	将对应的tokens分析成一个元素逐级嵌套的树，这个树被称为抽象语法树（AST）

​	会进行对应的预解析(pre-parser)

​	将AST通过Ignition解释器转换成对应的字节码，交还给CPU执行，同时收集信息，将可优化的信息通过TurBoFan编译器，编译成更好使用的机器码交给CPU执行

​	如果后续代码的参数类型发生了改变，则会逆优化为字节码交由CPU执行

## 20.整理JavaScript的代码的执行流程

ji引擎内部有一个执行上下文调用栈。当执行js代码的时候，在执行上下文栈中会

入栈一个全局执行上下文，而每一个执行上下文中都关联者一个VO（Variable Object,变量对象），所以这个VO就会指向堆内存中的GO对象，而GO对象中包含着全局的属性和方法，以及自己定义的全局变量和和方法，由于函数是第一等公民所以在代码被解析的时候，就会在堆内存中开辟一块空间，，用var声明的变量会先创建出来，但是没有赋值，在全局执行上下文栈中还有作用域链的指向，以及this的绑定，然后开始执行代码。执行到函数调用的时候，会在创建一个函数执行上下文栈，入栈，然后在堆内存中开辟一块空间存储这形参，argumnets，以及定义的变量，如果有函数，则会继续创建一块函数的地址，这个地址空间叫做AO，并将VO指向AO，他的作用域链就是VO+父级的作用域链，this的绑定，然后执行函数体进行赋值操作，如果执行完了，就会出栈，并且被GC回收掉。。。。。



参考答案：

- 首先在执行前会现在堆内存中开辟一块空间(GO) 存放一些初始的值 如Number String等等
- 还有代码中定义的一些变量 函数(在parser转成AST树的过程中存放在GO中的 )并没有赋值
- 同时在执行代码时在执行上下文栈(ECS)中存放一个全局执行上下文(GEC) 用于执行代码
  - GO中对应的函数 也会在堆内存中开辟出空间 为 Function Object 初始一些数据(name length scope chain等)
- 开始执行代码
- 每个EC中有着三个重要的内容(VO scope chain 以及this)
- VO指向对应的作用域(全局作用域(GO) 函数作用域(AO))
- ...

​	

##  21.说说你对GO/AO/VO的理解以及作用域和作用域链的理解

```
GO
	global object js代码在执行前会现在堆内存中创建一个全局对象(GO)
	用于存放一些定义好的变量方法等包含Date,Array,String,Number,setTimeout等
	同时有一个window属性指向自己
	同时在词法解析转化成AST的过程中也会将一些变量函数 存放在GO中 只是变量的初始值为undefined
AO
	函数在在执行前会先在堆内存中创建一个AO对象，里面存放着arguments对应函数的形参，以及在函数中定义的变量，初始值为undefined
VO	
	varibale object 在执行函数时，会在执行上下文栈中进入一个函数执行上下文，其中有三个核心，核心之一是VO指向是该函数在内存中解析时创建的AO而在全局执行上下文中指向的是go
	
	作用域和作用域链
		当进入一个执行上下文的时候，执行上下文会关联一个作用域链
		通常作用域链在解析时会被确定，因此作用域链函数的定义位置有关和他被调用的位置无关
```

## 22.说说V8引擎的内存管理以及垃圾回收器

## 23.你是如何理解闭包的,闭包到底是什么?

广义上讲javascript函数都是闭包

狭义上将javascript中的函数如果访问了外层作用域中的变量，则称为闭包

实际上是一个函数与包含他的作用域的引用绑定在一起的组合

## 24.闭包为什么会产生内存泄露以及如何解决

闭包使得本该销毁的作用域由于内层函数的引用没有销毁，始终存在堆内存中，因此产生了内存泄漏

解决

​	将保存着上层作用域引用的函数在使用完之后设置为null,将他的引用销毁，在GC的下次检查中，对应的内存就会被销毁

## 25.理解纯函数以及编写自己的纯函数

纯函数就是相同的输入产生确定的输出，不会对外部的数据发生更改，不会产生副作用，不依赖外部变量，只是单纯的实现自己的业务，而不需要关注外部数据的变化

## 26.理解函数柯里化以及说出柯里化的作用

## 27.理解组合函数以及组合函数的作用

## 28.说说你对严格模式的理解

## 29.什么是原型、原型链？

每个对象中都有一个特殊的内置属性[[prototype]],这个[[prototype]]属性会指向创建这个对象的函数的prototype，而这个对象就是由他的原型创建出来的。

原型链就是通过函数的继承，如果当前实例对象，调用属性或者方法，实例就会先在自身去寻找，如果找不到，就会去他的原型上去寻找，通过原型的继承，一直找到null为止。

## 30.如何通过原型链实现继承？

## 31.继承的各个方案以及优缺点

## 32.最终ES5实现继承的方案

## 33.继承关系图中的各个关系

* Function、Object、函数对象Foo的关系

* 普通对象、Foo创建出来的对象之间的关系

* 上面所有内容之间的关系

  ```
  Function.prototype.__proto__===Object.prototype
  Foo.prototype.__proto__===Object.prototype
  foo.__proto__===FOO.prototype
  function Foo.__proto__===Function.prototype
  function Object.__proto__===Function.prototype
  function Function.__proto__===Function.prototype
  Object.prototype.__proto__===null
  object.__proto__===Object.prototype
  ```

## 34.编写ES6的类并且实现继承

```
class a{
connstructor(name){
this.name=
}
getName(){
return this.name
}
}

class b extend  a{
	constructor(name,age){
		super(name)
		this.age=age
	}
}
```

## 35.说说你对面向对象多态的理解

## 36.说说let、const和var的区别

```
let,const不会进行变量提升，不可以在变量被声明之前访问，var会出现变量提升
let和const会形成块级作用域，而var没有块级作用域
let和const不可以重复声明，会保存，var 重复申明后面会覆盖前面的
let和const在声明前使用会出现暂时性死区
let和const申明的全局变量不会加到window对象中，而var会
const存储的边练不可以修改
```

## 37.理解let的块级作用域以及作用

```
let会形成一个独立的块级作用域
```

## 38.整理ES6~ES13新增知识点

## 39.Symbol的用法和作用

## 40.说说Set、Map、WeakMap的用法

## 41.说出Proxy和Object.defineProperty的区别

new Proxy(target,{捕获器})可以对整个对象进行监听，有13中捕获器，

Object.defineProperty需要遍历来监听每个属性的getSet,但是不可以监听到属性的删除和新增

## 42.说说Reflect的作用和为什么需要使用它

## 43.说说Promise的作用和使用方法（各个回调的作用）

## 44.整理Promise的实例方法和类方法

```
Promise.prototype.then()
Promise.prototype.catch()
Promise.prototype.finally()
Promise.resolve()
Promise.reject()
Promise.all()
Promise.allSettle()
Promsie.race()
Promise.any()
```

## 45.整理Array的常见操作		

```
创建数组：const arr=[]/new Array()
Array.prototype.slice()
Array.prototype.join()
Array.prototype.concat()
Array.prototype.length
Array.prototype.map()
Array.prototype.forEach()
Array.prototype.filter()
Array.prototype.include()
Array.prototype.indexOf()
Array.prototype.splice()
Array.prototype.reduce()
Array.prototype.push()/shift()/pop()/unshift()
arr[1]=0//通过数组下标索引进行赋值和获取
for.forin forof
Array.prototype.find()/findIndex()
Array.prototype.sort()
Array.prototype.reverse()
```

## 46. 整理Date的常见操作

```
创建事件
	new Date()
	new Date(1000)//毫秒
	new Date("2022-08-08")//dateString
		dateString的表示方式
		new Date()//默认是RFC-2822
		new Date().toISOString()//ISO 8601标准
			YYYY-年份，MM-月份，DD-日期 ，HH-小时，mm-分钟，ss-秒 ，.sss-毫秒 Z-时区
	new Date(year,monthIndex,day?,hours?,minutes?,seconds?,milliseconds?)
	
	获得信息的方法
	getFullYear()
	getMonth()
	getDate()
	getHours()
	getMinutes()
	getSeconds()
	getMilliseconds()
	getDay()
	
	设置Date信息的方法
	setFullYear(year,[month],[date])
	setMonth(month.[date])
	setDate(date)
	setHours(hour,[min],[sec].[ms])
	setMinutes(min,[sec],[ms])
	setTime(millseconds)
	
	Date获取Unix时间戳
	new Date().getTime()
	new Date().valueOf()
	+new Date()
	Date.now()
	
	将日期字符串转换成时间戳
	Date.parse(str)<=>new Date().getTime()
```



## 47.JavaScript 的交互方式有哪些？

```
1.弹窗输出 alert("hello world")
2.控制台输出 console.log("hello world")
3.文档输出 document.write("hello world")
4.弹出输入框输入 var result=prompt("weite","第二个参数是默认值")
5.弹出确认 var result=confirm(message)

这些都是window对象里面的方法
```

## 48.自己总结常见的运算符

```
+-*/%(**)
赋值运算符 =
+=
-=
%=
*=
/=
**=
++
--
>,<,<=,>=,!=,==,===
逻辑运算符 &&，||，！
```

## 49.说出count++和++count的区别

```
count++是先赋值然后再count+1,++count是先count+1,再赋值结果
```

## 50.说出==和===的区别

* ==  (普通相等)
  * 在类型不相同的情况下, 会将运算元先转成Number的值, 再进行比较(隐式转换)
  * null比较特殊: null在进行比较的时候, 应该是会被当成一个对象和原生类型进行比较的
* === (严格不等)
  * 在类型不同的情况下,直接返回false

## 51.说出对DOM和document对象的理解

DOM:文档对象模型是将页面所有内容表示为可以修改的对象

​		1.浏览器将我们编写在HTML中的每一个元素都抽象成为一个对象

​		2.所有这些对象都可以通过javascript来对其进行访问，那么我们就可以通过Javascript来操作页面

​		3.所以我们将这个抽象的过程称之为文档对象模型

Document节点表示的整个载入的网页，他的实例是全局的document对象

​		对DOM的所有操作是从document对象开始的

​		它是DOM的入口点，可以从document开始去访问任何节点信息

## 52.浏览器内核是什么？有哪些常见的浏览器内核？

```
浏览器的渲染引擎也被称为浏览器内核
trident：IE,360安全,搜狗
Gecko:firefox
Presto->blink:opera
webkit:Safari,360高速，移动端的浏览器都是
webkit->blink:chrome
```

## 53.元素的结构是什么？有哪些单标签元素、双标签元素？

```
元素的主要组成部分
	开始标签，结束标签，内容，元素组成
	
单标签元素：
	br,hr,img,meta,input
双标签元素：
	html,body,head,h2,p,a元素
```

## 54.说出div元素和span元素的作用和区别

```
div元素是块级元素，可以设置宽高，默认会独占一行，默认高度由内容撑起
span是行内非替换元素，不可以设置宽高，由内容撑起宽高
div一般是作为容器把元素包裹起来，多个span包裹的内容会在同一行显示
多个div包裹的内容是在多行显示
```

## 55. HTML全局属性有哪些？分别是什么作用

常见的全局属性有：id,class,style,title

## 56.说说你对元素语义化的理解

元素语义化就用正确的元素做正确的事情。虽然在理论上，所有的HTML元素都可以通过CSS来实现，但是,这么做会使事情复杂话，所以需要元素语义化来降低复杂度

标签语义化的好处

​	方便代码维护

​	减少让开发者之间的沟通成本

​	能让语音合成工具正确识别网页元素的用途，以便做出正确的反应

​	有利于SEO

## 57.说说你对SEO的理解

SEO就是搜索引擎优化，SEO通过了解搜索引擎的运行规则来调整网站，提升网站的曝光度和排名

Google 搜索引擎的工作流程主要分为三个阶段：

**抓取**：Google 会使用名为“抓取工具”的自动程序搜索网络，以查找新网页或更新后的网页。Google 会将这些网页的地址（即网址）存储在一个大型列表中，以便日后查看。我们会通过许多不同的方法查找网页，但主要方法是跟踪我们已知的网页中的链接。

**编入索引**：Google 会访问它通过抓取得知的网页，并会尝试分析每个网页的主题。Google 会分析网页中的内容、图片和视频文件，尝试了解网页的主题。这些信息存储在 Google 索引中，而 Google 索引是一个存储在海量计算机中的巨大数据库。

**呈现搜索结果**：当用户在 Google 上进行搜索时，Google 会尝试确定最优质的搜索结果。“最佳”结果取决于许多因素，包括用户的位置、语言、设备（桌面设备或手机）以及先前用过的搜索查询。例如，在用户搜索“自行车维修店”后，Google 向巴黎用户显示的答案与向香港用户显示的答案有所不同。支付费用不能提高网页在 Google 搜索结果中的排名，网页排名是完全依靠算法完成的。

## 58.CSS编写样式的方式以及应用场景

三种常见的编写样式的方式：内联样式，内部样式，外部样式

## 59.具体说明text-align居中的条件

text-align：center可以让行内元素例如图片文字，等水平居中

如果需要让块级元素水平居中，可以设置display:inline-block准换成行内块元素，再设置text-align:center

## 60.line-height为什么可以让文字居中？

line-height表示一行文字的高度，也是两行文字基线之间的距离

当line-height=height,就可以使这行文字在div内部垂直居中

这是因为行高-文本高度就是行距，而行距平均分成上下两块，就会使文本垂直居中了

## 61.总结目前所学过的所有选择器？思考它们的应用场景

通用选择器 *

简单选择器

​	类选择器  .box{}

​	id选择器 #box{}

​	class选择器  .box{}

后代选择器

​	所有后代选择器 .box span{}

​	直接子代选择器 .box>span{}

属性选择器

​	拥有某个属性 [attr]{}

​	属性等于某个值 [att=val]{}

​	属性包含某个值[attr^=val]{}

兄弟选择器

​	相邻兄弟选择器  .one+div{}

​	普遍兄弟选择器  .one~div{}

选择器组

​	交集选择器  .box.one

​	并集选择器  .box,.one

伪类选择器：

​	动态伪类：:link,:visited,:hover,:active,:focus

​	目标伪类：:target,

​	语言伪类：:lang()

​	元素状态伪类：:enabled,:disabled,:checked

​	结构伪类：

​	:nth-child(n);:nth-last-child,:nth-of-type(n),:nth-last-of-type(n),:first-child,:last-child,first-of-type,:last-of-type,:root,:only-child,:only-of-child,:empty

​	否定伪类：

​	:not

## 62.总结元素隐藏的方法，并且说出他们的区别

```
display:none//元素不显示，也不占据任何空间
visibility:hidden//元素不显示，但是会占据空间
rgba设置透明度，会占据空间，但是不会影响子元素
opacity:0//占据空间，会影响到子元素
```

## 63.说说你对margin的传递和折叠的理解

上下margin的传递

​	margin-top的传递

​	如果块级元素的顶部线和父元素的顶部线重叠，那么这个块级元素的margin-top会传递到父元素

​	margin-bottom的传递

​	如果块级元素的底部线和父元素的底部线重叠，并且父元素的高度是auto,那么块级元素的margin-bottm会传递给父元素

解决方法

​	父元素设置padding而不要子元素设置margin

​	给父元素设置border

​	触发BFC,例如设置overflow：auto

上下margin的折叠

​	垂直方向上相邻的两个margin(margin-bottom,margin-top)会出现折叠，会取较大的那个值

​	水平方向上永远不会重叠

解决方式：只设置一个margin

兄弟块级元素之间以及父子块级元素之间都会出现margin的折叠

## 64.行内非替换元素在设置padding/border的上下时，有什么特殊的地方？

​	上下会被撑起来，但是不会占据空间

## 65.写出盒子模型包含的内容以及如何设置

```
盒模型包括：标准盒模型和IE盒模型
标准盒模型：content+margin+padding+border
IE盒模型: content包括content+padding+border
box-sizing:border-box和box-sizing:content-box来相互转换
```

## 66.说出元素水平居中的方案以及对应的场景

```
行内块元素
	text-align:center
块级元素
	margin：0,auto
```

## 67.说出表单元素什么情况下使用name和value？

name属性的作用是后台接受数据时使用的键值对中的key随着表单的提交而提交，表单中不可或缺的元素，一个form表单中该元素的名称对应不同类型的input也是不同的

value是后台接受数据时使用的键值对中的值。value可以有默认值

## 68.说出form提交时的属性作用

```
action
	处理表单提交的url,一般填写表单提交的路径
method
	用于提交方法,默认是get
target
	如何跳转
	_blank 新开页面跳转
	_self 当前页面跳转
	_parent 当前父级页面跳转
	_top 当前顶层跳转
```

## 69.说出结构伪类的nth-child和nth-of-type的区别，并且写出案例练习

:nth-child  只计算父元素的第几个子元素 ,不管是否是同种类型,也不会排除干扰项.

:nth-of-type  计数时只计算同种类型的元素,会排除所有的干扰项

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* 获取box 的第3个div元素 */
      .box div:nth-child(3) {
        color: red;
      }
      /* 父元素下的3个孩子 */
      .box :nth-child(3) {
        color: pink;
      }
      /* 需求: 选择box中的第三个div元素(排除所有的干扰项) */
      .box div:nth-of-type(3) {
        font-weight: 700;
        color: green;
      }
      .box div:nth-of-type(2n) {
        background-color: pink;
      }
      .box div:nth-of-type(2n + 1) {
        background-color: blue;
      }
      /* 前几个 */
      .box div:nth-of-type(-n + 4) {
        color: purple;
        font-weight: 700;
      }
      /* 会找ul下的子元素同类型的第几个 */
      ul :nth-of-type(3) {
        color: pink;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div>第1个元素</div>
      <span>干扰项1</span>
      <span>干扰项2</span>
      <span>干扰项3</span>
      <span>干扰项4</span>
      <span>干扰项5</span>
      <div>第2个元素</div>
      <div>第3个元素</div>
      <div>第4个元素</div>
      <div>第5个元素</div>
      <div>第6个元素</div>
      <div>第7个元素</div>
      <div>第8个元素</div>
      <p>干扰项6</p>
      <div>第9个元素</div>
      <div>第10个元素</div>
    </div>
    <ul>
      <li>第1个li元素</li>
      <li>第2个li元素</li>
      <span>干扰项3</span>
      <span>干扰项4</span>
      <span>干扰项5</span>
      <li>第3个li元素</li>
      <li>第4个li元素</li>
      <li>第5个li元素</li>
      <li>第6个li元素</li>
      <li>第7个li元素</li>
      <li>第8个li元素</li>
      <li>第9个li元素</li>
      <li>第10个li元素</li>
    </ul>
  </body>
</html>
```

# 70.总结绝对定位的相对元素以及常见的解决方案

子绝父相

​	子元素绝对定位

​	父元素相对定位

子绝父绝

​	子元素绝对定位

​	父元素相对定位

 子绝父固

​	子元素绝对定位

​	父元素相对定位

## 71.总结浮动常见的规则内容

规则1

​	元素一旦浮动后就会脱离标准流，朝向左或者向右移动吗，直到自己的边界紧贴包含块(一般是父元素)或者其他浮动元素的边界为止，定位元素会层叠在浮动元素上面

规则2

​	元素向左或者向右浮动，浮动元素的左右边界不可以超过包含快的左右边界

规则三

​	浮动元素之间不能层叠

​	如果一个元素浮动，另一个浮动元素已经在那个位置了，后面的浮动元素会津贴者前面的浮动元素(左浮找左浮，又浮找又浮)	

​	如果水平方向剩余的空间不够显示的话他会向下移动寻找合适的空间

规则4

​	浮动元素不能与行内级元素内容层叠，行内元素会被推出

规则5

行内级元素，inline-block元素浮动后，其顶部将于所在行的顶部对齐

浮动元素会出现高度塌陷的问题

因为浮动元素会脱离标准流，变成脱标元素，不在向父元素汇报高度，父元素计算高度的时候，就不会计算子元素的高度，导致高度塌陷问题

解决父元素高度塌陷的问题称为请浮动

目的是让父元素计算总高度时，把子元素的告诉计算在内

```
1.在子元素浮动，可以在父元素上面设置clear:both
2.给父元素设置固定的高度
3.在父元素最后添加一个空的块级元素,并且设置clear:both
4.使用伪元素
	.clearfix::after{
		content:""
		clear:both;
		display:block;
		visibility:hidden;
		hidden:0;
	}
	.clearfix{
	*zoom:1;
	}
```

## 72.总结flex布局container和item的属性以及作用（重要）

```
flex container
	flex-flow//flex-direction，flex-wrap的语法糖
	flex-direction
	flex-wrap
	justify-content
	align-items
	align-content//决定多行flex items在cross axis上的对齐方式与justify-content属性值相同
	
flex-item
	order 决定了flex items的排布顺序
	align-self 可以覆盖align-items进行单独设置
	flex-grow 如何拉伸。
	flex-shrink 如何收缩
	flex-basis 水平方向上的宽度
	flex简写
```

## 73.说出常见的CSS Transform形变有哪些

```
transform:translate(x,y)//平移
transform:rotate(deg)//旋转
transform：scale(x,y)//缩放
transform:skew(deg,deg)//倾斜
```

## 74.说出CSS Transition和Animation动画的区别

transition:

​	只能定义两个状态:开始状态和结束状态，不可以定义中间态

​	不能够重复执行动画，除非一再触发动画

​	需要在特定状态触发后才能执行，比如属性的修改

animation

​	可以用@keyframes来定义动画序列(每一帧如何执行)

​	通过设置animation-iteration-count来规定动画执行的次数

​	不需要触发特定状态既可以执行

animation动画比transition多了animation-iterator-count,animation-direction,animation-fill-mode,

animation-play-state属性

## 75.理解vertical-align的作用以及应用场景

vartical-align影响行内级元素在一个行盒中垂直方向的位置，默认位置为baseline对齐

​	baseline:基线对齐

​	top:把行内级盒子的顶部和line-boxes顶部对齐

​	middle:行内级盒子的中心点和父盒子基线加上x-height一半的线对齐

​	bottom:把行内级盒子的底部和line box底部对齐

不同的场景分析

​	只有文字时，行盒包裹内容，文字的bottom-line和行盒底部对齐

​	有图片和文字时，图片底部和文字的baseline对齐

​	有图片，有文字，有inline-block(比图片要大：图片的底部，行内块的底部，文字的baseline对齐)

​	有图片，有文字，有inline-block(比图片大)而且设置了margin-bottom:图片底部，行内块margin-bottom底部和文字的baseline对齐

​	有图片，文字，inline-block(比图片要大)而且设置了margin-bottom并且有文字，文字的baseline和图片的底部，行内块的最后一行文字baseline对齐

## 76.说说你对BFC的理解（面试题）

bfc就是块级格式化上下文

​	是页面的一块渲染区域，并且有一套渲染规则，来决定了子元素如何定位，以及与其他元素之间的排列布局之间的关系

​	BFC是一个独立的环境相当于是一个容器，在其中按照一定的规则对块级元素进行摆放，并且不会影响其他的布局环境中的盒子，如果一个元素触发BFC，则BFC中的元素布局不受外界影响

块级元素在标准流中的布局是属于BFC的

创建BFC的条件

​	根元素

​	浮动元素(元素的float不是none)

​	绝对定位元素(元素的position为absolute或者fixed)

​	行内块元素(display:inline-block)

​	表格单元格

​	匿名表格单元格元素

​	overflow计算值不为visible的块元素

​	display:flex的子元素、

​	网格元素

​	display:flow-root的元素

在BFC中，box会在垂直方向上一个挨着一个排布

垂直方向上的间距由margin属性决定

在同一个BFC中，相邻两个box之间的margin会折叠(collapse)

在BFC中，每个元素元素的左边缘是紧挨着包含块的左边缘的、



BFC可以解决margin的折叠问题

解决浮动元素父元素高度塌陷的问题

​	给父元素触发BFC，并且给浮动元素的父元素的高度设置为auto
