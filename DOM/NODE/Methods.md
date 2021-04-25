# Node.appendChild

`**Node.appendChild()**` 方法将一个节点附加到指定父节点的子节点列表的末尾处。如果将被插入的节点已经存在于当前文档的文档树中，那么 `appendChild()` 只会将它从原先的位置移动到新的位置（不需要事先移除要移动的节点）。

这意味着，一个节点不可能同时出现在文档的不同位置。所以，如果某个节点已经拥有父节点，在被传递给此方法后，它首先会被移除，再被插入到新的位置。若要保留已在文档中的节点，可以先使用 [`Node.cloneNode()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/cloneNode) 方法来为它创建一个副本，再将副本附加到目标父节点下。请注意，用 `cloneNode` 制作的副本不会自动保持同步。

如果给定的子节点是 [`DocumentFragment`](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment)，那么 [`DocumentFragment`](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment) 的全部内容将转移到指定父节点的子节点列表中。

**有更加新的 API 可供使用！**
[`ParentNode.append()`](https://developer.mozilla.org/zh-CN/docs/orphaned/Web/API/ParentNode/append) 方法支持多个参数，接受字符串作为参数，会将字符串转换为文本节点再附加。

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild#语法)

```
element.appendChild(aChild)
```

### [参数](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild#参数)

- `aChild`

  要追加给父节点（通常为一个元素）的节点。

### [返回值](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild#返回值)

返回追加后的子节点 （`aChild`），除非 `aChild` 是一个文档片段（[`DocumentFragment`](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment)），这种情况下将返回空文档片段（[`DocumentFragment`](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment)）。

## [附注](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild#附注)

如果你需要保留这个子节点在原先位置的显示,则你需要先用[`Node.cloneNode`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/cloneNode)方法复制出一个节点的副本,然后在插入到新位置.

这个方法只能将某个子节点插入到同一个文档的其他位置,如果你想跨文档插入,你需要先调用[`document.importNode`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/importNode)方法.

## [备注](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild#备注)

由于 `appendChild()` 返回的是被附加的子元素，所以链式调用可能无法按照你的预期去执行：

```
let aBlock = document.createElement('block').appendChild( document.createElement('b') );
```

（上述代码）只会将 `aBlock` 设置为 `<b></b>` ，这可能不是你所想要的。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild#示例)

```
// 创建一个新的段落元素 <p>，然后添加到 <body> 的最尾部
var p = document.createElement("p");
document.body.appendChild(p);
```

# Node.cloneNode

**`Node.cloneNode() `**方法返回调用该方法的节点的一个副本.

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/cloneNode#syntax)

```
var dupNode = node.cloneNode(deep);
```

- `node`

  将要被克隆的节点

- `dupNode`

  克隆生成的副本节点

- `deep` 可选

  是否采用深度克隆`,如果为true,`则该节点的所有后代节点也都会被克隆,如果为`false,则只克隆该节点本身.`

**注意:** 在 DOM4 规范中(实现于Gecko 13.0(Firefox 13.0 / Thunderbird 13.0 / SeaMonkey 2.10))，`deep`是一个可选参数。如果省略的话，参数的默认值为 `true，`也就是说默认是深度克隆。如果想使用浅克隆, 你需要将该参数设置为 `false。`

在最新的规范里，该方法的行为已经改变了，其默认值变成了 false。虽然该参数仍旧是可选的，但是你必须要为该方法设置 deep 参数，无论是为了向前还是向后兼容考虑。假如开发者没设置参数的话，Gecko 28.0 (Firefox 28 / Thunderbird 28 / SeaMonkey 2.25 / Firefox OS 1.3)) 版本的控制台会发出警告。从 Gecko 29.0 (Firefox 29 / Thunderbird 29 / SeaMonkey 2.26)) 开始该方法默认为浅复制而不是深度复制。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/cloneNode#example)

```
var p = document.getElementById("para1"),
var p_prime = p.cloneNode(true);
```

## [附注](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/cloneNode#notes)

克隆一个元素节点会拷贝它所有的属性以及属性值,当然也就包括了属性上绑定的事件(比如`onclick="alert(1)"`),但不会拷贝那些使用[`addEventListener()`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)方法或者`node.onclick = fn`这种用JavaScript动态绑定的事件.

在使用[`Node.appendChild()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild)或其他类似的方法将拷贝的节点添加到文档中之前,那个拷贝节点并不属于当前文档树的一部分,也就是说,它没有父节点.

如果`deep`参数设为`false`,则不克隆它的任何子节点.该节点所包含的所有文本也不会被克隆,因为文本本身也是一个或多个的[`Text`](https://developer.mozilla.org/zh-CN/docs/Web/API/Text)节点.

如果`deep`参数设为`true`,则会复制整棵DOM子树(包括那些可能存在的[`Text`](https://developer.mozilla.org/zh-CN/docs/Web/API/Text)子节点).对于空结点(例如[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img)和[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input)元素),`则deep`参数无论设为`true`还是设为`false,`都没有关系,但是仍然需要为它指定一个值.

注意:为了防止一个文档中出现两个ID重复的元素,使用`cloneNode()方法克隆的节点在需要时应该指定另外一个与原ID值不同的ID`

如果原始节点设置了ID，并且克隆节点会被插入到相同的文档中，那么应该更新克隆节点的ID以保证唯一性。name属性可能也需要进行修改，取决于你是否希望有相同名称的节点存在于文档中。

想要克隆一个节点来添加到另外一个文档中,请使用[`Document.importNode()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/importNode)代替本方法.

# Node.compareDocumentPosition

`**Node.compareDocumentPosition()**` 可以比较当前节点与任意文档中的另一个节点的位置关系。

# Node.contains

## [概述](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/contains#summary)

**Node.contains()**返回的是一个布尔值，来表示传入的节点是否为该节点的后代节点。

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/contains#syntax)

```
node.contains( otherNode )
```

- `node` 是否包含otherNode节点.
- `otherNode` 是否是node的后代节点.

如果 `otherNode` 是 `node 的后代节点或是` `node` 节点本身.则返回`true` , 否则返回 `false`.

## [例子](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/contains#example)

下面的函数用来检查一个元素是否是body元素的后代元素且非body元素本身.

```
function isInPage(node) {
  return (node === document.body) ? false : document.body.contains(node);
}
```

- `node` 是我们想要检查的元素节点.

# Node.getRootNode()





[`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 接口的 **`getRootNode()`** 方法返回上下文中的根节点，如果 shadow DOM 可用，则对 shadow DOM 同样适用。

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/getRootNode#语法)

```
var root = node.getRootNode(options);
```

### [参数](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/getRootNode#参数)

- `options` 可选

  获取根节点时的可选参数对象. 下列值可供选择:`composed`: [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 如果检索到 shadow Root 需要返回，则设置为（`false`，默认值），如果跳过shadow Root 检索普通Root则设置为（`true`）。

### [返回值](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/getRootNode#返回值)

返回一个继承自 [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 的对象。返回值会因为 `getRootNode()` 调用的地方不同而不同; 比如说:

- 在标准的网页中调用将会返回一个 [`HTMLDocument`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLDocument) 对象表示整个网页。
- 在Shadow DOM里调用将会返回一个与之相关联的 [`ShadowRoot`](https://developer.mozilla.org/zh-CN/docs/Web/API/ShadowRoot) 。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/getRootNode#示例)

第一个例子很简单，返回一个参照 HTML/document node 位置的一个节点。

```
rootNode = node.rootNode;
```

# Node.hasChildNodes

### [概述](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/hasChildNodes#概述)

**hasChildNodes**方法返回一个[布尔值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean),表明当前[节点](https://developer.mozilla.org/zh-CN/docs/Web/API/Node)是否包含有[子节点](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/childNodes).

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/hasChildNodes#syntax)

```
element.hasChildNodes()
```

## [例子](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/hasChildNodes#example)

下面的例子演示了:如果id为foo的这个元素有子节点,则从dom树中删除它的第一个子节点.

```
var foo = document.getElementById("foo");

if ( foo.hasChildNodes() ) {
  foo.removeChild( foo.childNodes[0] );
}
```

注意:`Node.hasChildNodes`是个方法,而不是普通属性,使用时必须加括号才能调用.

## [总结](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/hasChildNodes#specification)

有三种方法可以判断当前节点是否有子节点。

- node.firstChild !== null
- node.childNodes.length > 0
- node.hasChildNodes()

# Node.insertBefore()

`**Node.insertBefore()**` 方法在参考节点之前插入一个拥有指定父节点的子节点。如果给定的子节点是对文档中现有节点的引用，`insertBefore()` 会将其从当前位置移动到新位置（在将节点附加到其他节点之前，不需要从其父节点删除该节点）。

这意味着一个节点不能同时位于文档的两个点中。因此，如果节点已经有父节点，则首先删除该节点，然后将其插入到新位置。在将节点追加到新父节点之前，可以使用 [`Node.cloneNode()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/cloneNode) 复制节点。注意，使用 `cloneNode()` 创建的节点副本不会自动与原始节点保持同步。

如果引用节点为 `null`，则将指定的节点添加到指定父节点的子节点列表的末尾。

如果给定的子节点是 [`DocumentFragment`](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment)，那么 `DocumentFragment` 的全部内容将被移动到指定父节点的子节点列表中。

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/insertBefore#语法)

```
var insertedNode = parentNode.insertBefore(newNode, referenceNode);
```

- `insertedNode` 被插入节点(newNode)
- `parentNode` 新插入节点的父节点
- `newNode` 用于插入的节点
- `referenceNode` `newNode` 将要插在这个节点之前

如果 `referenceNode` 为 `null` 则 `newNode` 将被插入到子节点的末尾*。*

*`referenceNode`* 引用节点**不是**可选参数——你必须显式传入一个 `Node` 或者 `null`。如果不提供节点或者传入无效值，在不同的浏览器中会有[不同](https://bugzilla.mozilla.org/show_bug.cgi?id=119489)的[表现](https://code.google.com/p/chromium/issues/detail?id=419780)。

## [返回值](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/insertBefore#返回值)

函数返回被插入过的子节点；当 `newNode` 是 [`DocumentFragment`](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment) 时，返回空 [`DocumentFragment`](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment)。

## [例子](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/insertBefore#例子)

### [示例 1](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/insertBefore#示例_1)

```
<div id="parentElement">
   <span id="childElement">foo bar</span>
</div>

<script>
// 创建要插入的节点
var newNode = document.createElement("span");

// 获得父节点的引用
var parentDiv = document.getElementById("childElement").parentNode;

//实验一：referenceNode 存在 --> 正确返回
var sp2 = document.getElementById("childElement");
parentDiv.insertBefore(newNode, sp2);
//实验一结束

//实验二：referenceNode 为 undefined
var sp2 = undefined; // Not exist a node of id "childElement"
parentDiv.insertBefore(newNode, sp2); //隐式转换到节点类型
//实验二结束

//实验三：referenceNode 为字符类型的 "undefined"
var sp2 = "undefined"; //不存在id为"childElement"的referenceNode
parentDiv.insertBefore(newNode, sp2); // Generate "Type Error: Invalid Argument"
//实验三结束
</script>
```

### [示例 2](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/insertBefore#示例_2)

```
<div id="parentElement">
  <span id="childElement">foo bar</span>
</div>

<script>
//创建一个新的、普通的<span>元素
var sp1 = document.createElement("span");

//插入节点之前，要获得节点的引用
var sp2 = document.getElementById("childElement");
//获得父节点的引用
var parentDiv = sp2.parentNode;

//在DOM中在sp2之前插入一个新元素
parentDiv.insertBefore(sp1, sp2);
</script>
```

没有 `insertAfter()`。不过，可以使用 `insertBefore` 和 [`Node.nextSibling`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nextSibling) 来模拟它。

在前一个例子中，可使用下面代码将 `sp1` 插入到 `sp2` 之后：

```
parentDiv.insertBefore(sp1, sp2.nextSibling);
```

如果 `sp2` 没有下一个节点，则它肯定是最后一个节点，则 `sp2.nextSibling` 返回 `null`，且 `sp1` 被插入到子节点列表的最后面（即 `sp2` 后面）。

### [示例 3](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/insertBefore#example2)

在第一个子元素的前面插入一个元素，可使用 [firstChild](https://developer.mozilla.org/en-US/docs/Web/API/Node/firstChild) 属性。

```
//插入节点之前，要获得节点的引用
var parentElement = document.getElementById('parentElement');
//获得第一个子节点的引用
var theFirstChild = parentElement.firstChild;

//创建新元素
var newElement = document.createElement("div");

//在第一个子节点之前插入新元素
parentElement.insertBefore(newElement, theFirstChild);
```

当元素没有首节点时，`firstChild` 返回 `null`。该元素仍然会被插入到父元素中，位于最后一个节点后面。又由于父元素没有第一个子节点，也没有最后一个子节点。 最终，新元素成为唯一的子元素。

# Node.isDefaultNamespace

### [概述](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/isDefaultNamespace#summary)

`isDefaultNamespace` 接受一个命名空间URI作为参数,如果该命名空间是当前节点的默认命名空间,则返回`true`,否则返回`false`.

# Node.isEqualNode

 `**Node.isEqualNode()** `方法可以判断两个节点是否相等。当两个节点的类型相同，定义特征(defining characteristics)相同（对元素来说，即 id，孩子节点的数量等等），属性一致等，这两个节点就是相等的。一些具体的数据指出：多数时候的比较是根据节点的类型来的。

### [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/isEqualNode#语法)

```
var isEqualNode = node.isEqualNode(otherNode);
```

- otherNode: 比较是否相等的节点.

# Node.removeChild

**Node.removeChild()** 方法从DOM中删除一个子节点。返回删除的节点。

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/removeChild#syntax)

```
let oldChild = node.removeChild(child);

//OR

element.removeChild(child);
```

- `child` 是要移除的那个子节点.
- `node` 是`child`的父节点.
- oldChild保存对删除的子节点的引用. `oldChild` === `child`.

被移除的这个子节点仍然存在于内存中,只是没有添加到当前文档的DOM树中,因此,你还可以把这个节点重新添加回文档中,当然,实现要用另外一个变量比如`上例中的oldChild`来保存这个节点的引用. 如果使用上述语法中的第二种方法, 即没有使用 oldChild 来保存对这个节点的引用, 则认为被移除的节点已经是无用的, 在短时间内将会被[内存管理](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management)回收.

如果上例中的`child节点`不是`node`节点的子节点,则该方法会抛出异常.

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/removeChild#example)

```
<!--Sample HTML code-->
<div id="top" align="center"> </div>

<script type="text/javascript">
      var top = document.getElementById("top");
      var nested = document.getElementById("nested");
      var garbage = top.removeChild(nested);
      //Test Case 2: the method throws the exception (2)
</script>

<!--Sample HTML code-->
<div id="top" align="center">
 <div id="nested"></div>
</div>

<script type="text/javascript">
      var top = document.getElementById("top");
      var nested = document.getElementById("nested");
      var garbage = top.removeChild(nested);
      // This first call remove correctly the node
      garbage = top.removeChild(nested);
      // Test Case 1: the method in the second call here, throws the exception (1)
</script>
<!--示例HTML代码-->

<div id="top" align="center">
  <div id="nested"></div>
</div>
// 先定位父节点,然后删除其子节点
var d = document.getElementById("top");
var d_nested = document.getElementById("nested");
var throwawayNode = d.removeChild(d_nested);
// 无须定位父节点,通过parentNode属性直接删除自身
var node = document.getElementById("nested");
if (node.parentNode) {
  node.parentNode.removeChild(node);
}
// 移除一个元素节点的所有子节点
var element = document.getElementById("top");
while (element.firstChild) {
  element.removeChild(element.firstChild);
}
```

# Node.replaceChild()

**`Node.replaceChild()`** 方法用指定的节点替换当前节点的一个子节点，并返回被替换掉的节点。

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/replaceChild#语法)

```
parentNode.replaceChild(newChild, oldChild);
```

### [参数](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/replaceChild#参数)

- `**newChild**`

  用来替换 `oldChild` 的新节点。如果该节点已经存在于 DOM 树中，则它首先会被从原始位置删除。

- `**oldChild**`

  被替换掉的原始节点。



### [返回值](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/replaceChild#返回值)

The returned value is the replaced node. This is the same node as `oldChild`.

## [例子](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/replaceChild#例子)

```
// <div>
//  <span id="childSpan">foo bar</span>
// </div>

// 创建一个空的span元素节点
// 没有id,没有任何属性和内容
var sp1 = document.createElement("span");

// 添加一个id属性,值为'newSpan'
sp1.setAttribute("id", "newSpan");

// 创建一个文本节点
var sp1_content = document.createTextNode("新的span元素的内容.");

// 将文本节点插入到span元素中
sp1.appendChild(sp1_content);

// 获得被替换节点和其父节点的引用.
var sp2 = document.getElementById("childSpan");
var parentDiv = sp2.parentNode;

// 用新的span元素sp1来替换掉sp2
parentDiv.replaceChild(sp1, sp2);

// 结果:
// <div>
//   <span id="newSpan">新的span元素的内容.</span>
// </div>
```

# EventTarget





`EventTarget` 是一个 DOM 接口，由可以接收事件、并且可以创建侦听器的对象实现。

[`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element)，[`document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 和 [`window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window) 是最常见的 event targets ，但是其他对象也可以作为 event targets，比如 [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)，[`AudioNode`](https://developer.mozilla.org/zh-CN/docs/Web/API/AudioNode)，[`AudioContext`](https://developer.mozilla.org/zh-CN/docs/Web/API/AudioContext) 等等。

许多 event targets （包括 elements， documents 和 windows）支持通过 `onevent` 特性和属性设置[事件处理程序 (en-US)](https://developer.mozilla.org/en-US/docs/Web/Events/Event_handlers) ([event handlers](https://wiki.developer.mozilla.org/en-US/docs/Web/Guide/DOM/Events/Event_handlers))。



<iframe class="inheritance-diagram-frame" id="frame_inheritance_diagram" width="600" height="70" src="https://yari-demos.prod.mdn.mozit.cloud/zh-cn/docs/web/api/eventtarget/_samples_/inheritance_diagram" loading="lazy" style="box-sizing: border-box; border: 0px;"></iframe>



## [构造函数](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget#构造函数)

- [`EventTarget()`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/EventTarget)

  创建一个新的 `EventTarget` 对象实例。

## [方法](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget#methods)

- [`EventTarget.addEventListener()`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)

  在EventTarget上注册特定事件类型的事件处理程序。

- [`EventTarget.removeEventListener()`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/removeEventListener)

  EventTarget中删除事件侦听器。

- [`EventTarget.dispatchEvent()`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/dispatchEvent)

  将事件分派到此EventTarget。