**Node.childNodes** 返回包含指定节点的子节点的集合，该集合为即时更新的集合（live collection）。既是动态的节点

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/childNodes#.e8.af.ad.e6.b3.95.e5.92.8c.e5.80.bc)

```
var ndList = elementNodeReference.childNodes;
```

ndList变量为 [`NodeList`](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList) 类型，且为只读。

## [例子](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/childNodes#.e8.8c.83.e4.be.8b)

```
// parg 是一个到 <p> 元素的引用
if (parg.hasChildNodes())
// 首先我们检查它是否包含子节点
 {
   var children = parg.childNodes;
   for (var i = 0; i < children.length; i++)
   {
   // children[i]就是遍历到的每个子节点.
   // 注意:该NodeList对象为LIVE类型的NodeList, 添加或删除子节点都会实时的改变整个NodeList对象.
   };
 };
//下面的方法可以删除节点box的所有子节点
while (box.firstChild)
 {
    //box为LIVE类型的NodeList,所以firstChild属性每次会指向不同的子节点
    box.removeChild(box.firstChild);
 };
```

## [备注](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/childNodes#.e6.b3.a8.e6.84.8f)

集合的元素是一个节点而不是字符串。要从集合的元素获取数据，你必须使用它们的属性（例如：用 `elementNodeReference.childNodes[1].nodeName` 获取它们的名称，等等）。

`document`节点(文档节点)包含两个子节点： Doctype 声明和根节点。根节点通常为 `documentElement` 引用，且在 (X)HTML 文档中为 HTML 元素。

# Node.firstChild

**Node.firstChild** 只读属性返回树中节点的第一个子节点，如果节点是无子节点，则返回 `null。`

### [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/firstChild#syntax)

```
var childNode = node.firstChild;
```

### [描述](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/firstChild#描述)

如果有一个子节点, childNode 是节点的第一个子节点的引用，否则为null。

### [例子](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/firstChild#example)

#### Example 1

这个例子演示了`firstChild`属性的用法以及空白符节点对该属性的使用可能造成的影响.参见[备注](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/firstChild#备注)部分了解Gecko DOM中关于处理空白符的更多信息.

```
<p id="para-01">
  <span>First span</span>
</p>

<script type="text/javascript">
  var p01 = document.getElementById('para-01');
  alert(p01.firstChild.nodeName)
</script>
```

在上面的示例中, 提示框将显示 '#text',因为在<p>标签和<span>标签之前,有一个换行符和多个空格充当了一个文本节点.在Gecko中,任意多个的空白符都将导致文本节点的插入,包括一个到多个空格符,换行符,制表符等等.

</span>和</p>标签之间就是另外一个文本节点.

如果从源代码移出对应的空白符,则不会有文本节点被插入,span元素就成为了第一个子节点.下面的代码将弹出 'SPAN'.

```
<p id="para-01"><span>First span</span></p>

<script type="text/javascript">
  var p01 = document.getElementById('para-01');
  alert(p01.firstChild.nodeName)
</script>
```

#### Example 2

假设我们有一个HTML文档,如果该文档有一个DTD(文档类型定义),则下面的语句会弹出`[object DocumentType],如果该文档没有一个DTD,`则下面的语句会弹出`[object HTMLHtmlElement]`.

```
alert(document.firstChild);
```

### [备注](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/firstChild#.e6.b3.a8.e6.84.8f)



Gecko内核的浏览器会在源代码中标签内部有空白符的地方插入一个文本结点到文档中.因此,使用诸如 [`Node.firstChild`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/firstChild) 和 [`Node.previousSibling`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/previousSibling) 之类的方法可能会引用到一个空白符文本节点, 而不是使用者所预期得到的节点.

# Node.lastChild

## [概述](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/lastChild#summary)

`**Node.lastChild**` 是一个只读属性，返回当前节点的最后一个子节点。如果父节点为一个元素节点，则子节点通常为一个元素节点，或一个文本节点，或一个注释节点。如果没有子节点，则返回 `null`。

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/lastChild#语法)

```
var last_child = element.lastChild
```

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/lastChild#example)

```
var tr = document.getElementById("row1");
var corner_td = tr.lastChild;
```

# Node.isConnected

**`isConnected`** 是 [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 的一个只读属性接口。无论节点是否与 DOM 树连接，该属性都会返回一个[`布尔值` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)。例如: [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 对象与一般 DOM 树连接，[`ShadowRoot`](https://developer.mozilla.org/zh-CN/docs/Web/API/ShadowRoot) 与 shadow DOM 连接。

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/isConnected#语法)

```
var isItConnected = nodeObjectInstance.isConnected
```

### [返回值](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/isConnected#返回值)

返回 [`布尔值` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) — 如果该节点与 DOM 树连接则返回 `true`, 否则返回 `false`。

## [样例](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/isConnected#样例)

### [标准 DOM 树](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/isConnected#标准_dom_树)

```
let test = document.createElement('p');
console.log(test.isConnected); // Returns false
document.body.appendChild(test);
console.log(test.isConnected); // Returns true
```

# Node.nextSibling

`**Node.nextSibling**` 是一个只读属性，返回其父节点的 [`childNodes`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/childNodes) 列表中紧跟在其后面的节点，如果指定的节点为最后一个节点，则返回 `null`。

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nextSibling#syntax)

```
nextNode = node.nextSibling
```

## [备注](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nextSibling#notes)

 

Gecko内核的浏览器会在源代码中标签内部有空白符的地方插入一个文本结点到文档中.因此,使用诸如 [`Node.firstChild`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/firstChild) 和 [`Node.previousSibling`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/previousSibling) 之类的方法可能会引用到一个空白符文本节点, 而不是使用者所预期得到的节点.

详情请参见 [DOM 中的空白符 (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace) 和[W3C DOM 3 FAQ: 为什么一些文本节点是空的](http://www.w3.org/DOM/faq.html#emptytext).

 

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nextSibling#example)

```
<div id="div-01">Here is div-01</div>
<div id="div-02">Here is div-02</div>

<script type="text/javascript">
var el = document.getElementById('div-01').nextSibling,
    i = 1;

console.log('Siblings of div-01:');

while (el) {
  console.log(i + '. ' + el.nodeName);
  el = el.nextSibling;
  i++;
}

</script>

/**************************************************
  The following is written to the console as it loads:

     Siblings of div-01

      1. #text
      2. DIV
      3. #text
      4. SCRIPT

**************************************************/
```

从上面的例子中可以看出，在两个标签之间（即一个元素的闭合标签之后，下一个元素的起始标签之前）有空白出现时，会有`#text` 节点被插入到 DOM 中。使用 `document.write` 语句插入的两个元素之间不会有空白。

# Node.nodeName

 

**概述**

返回当前节点的节点名称

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeName#语法)

```
var str = node.nodeName;
```

- `str` 是一个存储了当前节点的节点名称的字符串.
- `nodeName 是一个只读属性`.

## [附注](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeName#附注)

下表列出了所有类型的节点的`nodeName`属性的值.

| 接口                                                         | nodeName属性值                                 |
| :----------------------------------------------------------- | :--------------------------------------------- |
| [Attr (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Attr) | 等同于 `Attr.name` 属性的值                    |
| [CDATASection (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/CDATASection) | "#cdata-section"                               |
| [Comment (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Comment) | "#comment"                                     |
| [Document](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) | "#document"                                    |
| [DocumentFragment (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) | "#document-fragment"                           |
| [DocumentType (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/DocumentType) | 等同于 `DocumentType.name`` 属性的值`          |
| [Element](https://developer.mozilla.org/zh-CN/docs/Web/API/element) | 等同于 `Element.tagName` 属性的值              |
| [Entity](https://developer.mozilla.org/zh-CN/docs/DOM/Entity) | 实体名称                                       |
| [EntityReference](https://developer.mozilla.org/zh-CN/docs/DOM/EntityReference) | 实体引用名称                                   |
| [Notation (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Notation) | Notation名称                                   |
| [ProcessingInstruction (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/ProcessingInstruction) | 等同于 `ProcessingInstruction.target` 属性的值 |
| [text (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Text) | "#text"                                        |

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeName#示例)

假设已经存在下面的HTML:

```
<div id="d1">hello world</div>
<input type="text" id="t"/>
```

以及下面的JavaScript:

```
var div1 = document.getElementById("d1");
var text_field = document.getElementById("t");

text_field.value = div1.nodeName;
```

在XHTML(以及属于XML类型的文档)中,`变量text_field`包含的值会是小写的"div".还在HTML中,`变量text_field`包含的值会是大写的"DIV",`nodeName`和`tagName`属性都有这种表现.查看[details on nodeName case sensitivity in different browsers](http://ejohn.org/blog/nodename-case-sensitivity/)一文深入了解.

如果是元素节点,`nodeName`属性和`tagName`属性返回相同的值,但如果是文本节点,`nodeName`属性会返回`"#text"`,而`tagName`属性会返回`undefined`.

# Node.nodeValue

[`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 的 `**nodeValue**` 属性返回或设置当前节点的值。

# Node.nodeType

只读属性 `**Node.nodeType**` 表示的是该节点的类型。

# Node.ownerDocument

**Node.ownerDocument** 只读属性会返回当前节点的顶层的 document 对象。

# Node.parentElement

返回当前节点的父元素节点，如果该元素没有父节点，或者父节点不是一个 DOM [`元素`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element)，则返回 `null`。

# Node.parentNode

## [概述](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/parentNode#summary)

返回指定的节点在DOM树中的父节点.

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/parentNode#syntax)

```
parentNode = node.parentNode
```

`parentNode是指定节点的父节点.一个元素节点的父节点可能是一个元素(``Element` `)节点,也可能是一个文档(``Document` `)节点,或者是个`文档碎片(`DocumentFragment`)节点.

## [例子](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/parentNode#example)

```
if (node.parentNode) {
  // 从DOM树中删除node节点,除非它已经被删除了.
  node.parentNode.removeChild(node);
}
```

## [备注](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/parentNode#notes)

对于下面的[节点类型](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType): `Attr`, `Document`, `DocumentFragment`, `Entity`, `Notation`,其`parentNode`属性返回`null`.

如果当前节点刚刚被建立,还没有被插入到DOM树中,则该节点的`parentNode属性也返回``null.`

# Node.previousSibling

### [概述](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/previousSibling#summary)

返回当前节点的前一个兄弟节点,没有则返回`null.`

### [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/previousSibling#syntax)

```
previousNode = node.previousSibling
```

### [例子](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/previousSibling#example)

```
// <a><b1 id="b1"/><b2 id="b2"/></a>
alert(document.getElementById("b1").previousSibling); // null
alert(document.getElementById("b2").previousSibling.id); // "b1"
```

### [备注](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/previousSibling#notes)

Gecko内核的浏览器会在源代码中标签内部有空白符的地方插入一个文本结点到文档中.因此,使用诸如 [`Node.firstChild`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/firstChild) 和 [`Node.previousSibling`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/previousSibling) 之类的方法可能会引用到一个空白符文本节点, 而不是使用者所预期得到的节点.

获取后一个兄弟节点,请使用[Node.nextSibling](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nextSibling).

# Node.textContent

[`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 接口的 `**textContent**` 属性表示一个节点及其后代的文本内容。

**注意:** `textContent` 和 [`HTMLElement.innerText`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/innerText) 容易混淆，但这两个属性在[重要方面有不同之处](https://wiki.developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent#与_innerText_的区别) 。

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent#syntax)

```
let text = someNode.textContent;
someOtherNode.textContent = string;
```

### [返回值](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent#返回值)

一个字符串或 `null`.

## [描述](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent#notes)

`textContent` 的值取决于具体情况：

- 如果节点是一个

   

  `document`

  ，或者一个 

  DOCTYPE

   

  ，则 

  ```
  textContent
  ```

   返回

   

  ```
  null
  ```

  。

  如果你要获取整个文档的文本以及 [CDATA data](https://wiki.developer.mozilla.org/en-US/docs/Web/API/CDATASection) ，可以使用 `document.documentElement (en-US).textContent`。

- 如果节点是个 [CDATA section](https://wiki.developer.mozilla.org/en-US/docs/Web/API/CDATASection)、注释、[processing instruction](https://wiki.developer.mozilla.org/en-US/docs/Web/API/ProcessingInstruction) 或者 [text node](https://wiki.developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode)，`textContent` 返回节点内部的文本内容，例如 [`Node.nodeValue`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeValue)。

- 对于其他节点类型，`textContent` 将所有子节点的 `textContent` 合并后返回，除了注释和processing instructions。（如果该节点没有子节点的话，返回一个空字符串。）

在节点上设置 `textContent` 属性的话，会删除它的所有子节点，并替换为一个具有给定值的文本节点。

### [与 **innerText** 的区别](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent#与_innertext_的区别)

不要被 `Node.textContent` 和 [`HTMLElement.innerText`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/innerText) 的区别搞混了。虽然名字看起来很相似，但有重要的不同之处：

- `textContent` 会获取*所有*元素的内容，包括 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script) 和 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/style) 元素，然而 `innerText` 只展示给人看的元素。

- ```
  textContent
  ```

   

  会返回节点中的每一个元素。相反，

  ```
  innerText
  ```

   

  受 CSS 样式的影响，并且不会返回隐藏元素的文本，

  - 此外，由于 `innerText` 受 CSS 样式的影响，它会触发回流（ [reflow](https://wiki.developer.mozilla.org/en-US/docs/Glossary/Reflow) ）去确保是最新的计算样式。（回流在计算上可能会非常昂贵，因此应尽可能避免。）

- 与 `textContent` 不同的是, 在 Internet Explorer (小于和等于 11 的版本) 中对 `innerText` 进行修改， 不仅会移除当前元素的子节点，而且还会*永久性地破坏*所有后代文本节点。在之后不可能再次将节点再次插入到任何其他元素或同一元素中。

### [与 **innerHTML** 的区别](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent#与_innerhtml_的区别)

正如其名称，[`Element.innerHTML`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/innerHTML) 返回 HTML。通常，为了在元素中检索或写入文本，人们使用 `innerHTML`。但是，`textContent` 通常具有更好的性能，因为文本不会被解析为HTML。

此外，使用 `textContent` 可以防止 [XSS 攻击](https://wiki.developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting)。

## [例子](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent#example)

给出这个 HTML 片段:

```
<div id="divA">This is <span>some</span> text!</div>
```

你可以使用 `textContent` 去获取该元素的文本内容：

```
let text = document.getElementById('divA').textContent;
// The text variable is now: 'This is some text!'
```

或者设置元素的文字内容：

```
document.getElementById('divA').textContent = 'This text is different!';
// The HTML for divA is now:
// <div id="divA">This text is different!</div>
```

## [IE8 的替代方法](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent#ie8_的替代方法)

```
// Source: Eli Grey @ https://eligrey.com/blog/post/textcontent-in-ie8
if (Object.defineProperty
  && Object.getOwnPropertyDescriptor
  && Object.getOwnPropertyDescriptor(Element.prototype, "textContent")
  && !Object.getOwnPropertyDescriptor(Element.prototype, "textContent").get) {
  (function() {
    var innerText = Object.getOwnPropertyDescriptor(Element.prototype, "innerText");
    Object.defineProperty(Element.prototype, "textContent",
     // Passing innerText or innerText.get directly does not work,
     // wrapper function is required.
     {
       get: function() {
         return innerText.get.call(this);
       },
       set: function(s) {
         return innerText.set.call(this, s);
       }
     }
   );
  })();
}
```