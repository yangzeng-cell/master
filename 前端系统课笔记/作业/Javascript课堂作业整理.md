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

