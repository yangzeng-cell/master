### 列出你所知道可以改变页面布局的属性

- `position`、`display`、`float`、`width`、`height`、`margin`、`padding`、`top`、`left`、`right`、`

### 几种常见的CSS布局

#### [#](http://interview.poetries.top/docs/base.html#流体布局)流体布局

```css
	.left {
		float: left;
		width: 100px;
		height: 200px;
		background: red;
	}
	.right {
		float: right;
		width: 200px;
		height: 200px;
		background: blue;
	}
	.main {
		margin-left: 120px;
		margin-right: 220px;
		height: 200px;
		background: green;
	}
```

```html
<div class="container">
    <div class="left"></div>
    <div class="right"></div>
    <div class="main"></div>
</div>
```

#### 圣杯布局

- 要求：三列布局；中间主体内容前置，且宽度自适应；两边内容定宽
  - 好处：重要的内容放在文档流前面可以优先渲染
  - 原理：利用相对定位、浮动、负边距布局，而不添加额外标签

```css
 .container {
        padding-left: 150px;
        padding-right: 190px;
      }
      .main {
        float: left;
        width: 100%;
        background-color: red;
        height: 100px;
      }
      .left {
        float: left;
        width: 190px;
        margin-left: -100%;
        position: relative;
        left: -150px;
        background-color: green;
        height: 100px;
      }
      .right {
        float: left;
        width: 190px;
        margin-left: -190px;
        position: relative;
        right: -190px;
        background-color: black ;
        height: 100px;
      }
<div class="container">
	<div class="main"></div>
	<div class="left"></div>
	<div class="right"></div>
</div>
```

#### 双飞翼布局

- 双飞翼布局：对圣杯布局（使用相对定位，对以后布局有局限性）的改进，消除相对定位布局
- 原理：主体元素上设置左右边距，预留两翼位置。左右两栏使用浮动和负边距归位，消除相对定位。

```css
.container {
    /*padding-left:150px;*/
    /*padding-right:190px;*/
}
.main_a {
    width: 100%;
    float: left;
}
.main {
    margin-left: 150px;
    margin-right: 190px;
    background:red;
    height:100px;
}
.left {
    float: left;
    width: 150px;
    margin-left: -100%;
    background:green;
    height:100px;
    /*position: relative;*/
    /*left:-150px;*/
}
.right {
    float: left;
    width: 190px;
    margin-left: -190px;
    background:black;
    height:100px
    /*position:relative;*/
    /*right:-190px;*/
}
<div class="container">
        <div class="main_a">
            <div class="main"></div>
        </div>        
        <div class="left"></div>
        <div class="right"></div>
    </div>
```

### 如何水平垂直居中一个浮动元素？

```css
/**方法一：已知元素的高宽**/

#div1{
  background-color:#6699FF;
  width:200px;
  height:200px;
  position: absolute;        //父元素需要相对定位，要知道父元素的高度
  top: 50%;
  left: 50%;
  margin-top:-100px ;   //二分之一的height，width
  margin-left: -100px;
}

/**方法二:**/

#div1{
  width: 200px;
  height: 200px;
  background-color: #6699FF;
  margin:auto;
  position: absolute;        //父元素需要相对定位,要知道父元素的高度
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
/**方法三:**/
#div1{
            background-color: red;
            width: 200px;
            height: 200px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
```

**如何垂直居中一个`<img>`?**

```css
#container     /**<img>的容器设置如下**/
{
    display:table-cell;
    text-align:center;
    vertical-align:middle;
}
```

### 知道css有个content属性吗？有什么作用？有什么应用

> css的`content`属性专门应用在 `before/after`伪元素上，用于来插入生成内容。最常见的应用是利用伪类清除浮动。

```css
/**一种常见利用伪类清除浮动的代码**/
.clearfix:after {
    content:".";       //这里利用到了content属性
    display:block;
    height:0;
    visibility:hidden;
    clear:both; 
 }
.clearfix {
    *zoom:1;
}
```

### 重绘和回流（重排）是什么，如何避免？

- 重绘：当渲染树中的元素外观（如：颜色）发生改变，不影响布局时，产生重绘
- 回流：当渲染树中的元素的布局（如：尺寸、位置、隐藏/状态状态）发生改变时，产生重绘回流
- 注意：JS获取Layout属性值（如：`offsetLeft`、`scrollTop`、`getComputedStyle`等）也会引起回流。因为浏览器需要通过回流计算最新值
- 回流必将引起重绘，而重绘不一定会引起回流
- **如何最小化重绘(repaint)和回流(reflow)**：
  - 需要要对元素进行复杂的操作时，可以先隐藏(`display:"none"`)，操作完成后再显示
  - 需要创建多个`DOM`节点时，使用`DocumentFragment`创建完后一次性的加入`document`
  - 缓存`Layout`属性值，如：`var left = elem.offsetLeft;` 这样，多次使用 `left` 只产生一次回流
  - 尽量避免用`table`布局（`table`元素一旦触发回流就会导致table里所有的其它元素回流）
  - 避免使用`css`表达式(`expression`)，因为每次调用都会重新计算值（包括加载页面）
  - 尽量使用 `css` 属性简写，如：用 `border` 代替 `border-width`, `border-style`, `border-color`
  - 批量修改元素样式：`elem.className` 和 `elem.style.cssText` 代替 `elem.style.xxx`

### 如何实现小于12px的字体效果

> `transform:scale()`这个属性只可以缩放可以定义宽高的元素，而行内元素是没有宽高的，我们可以加上一个`display:inline-block`;

```text
transform: scale(0.7);
```

`css`的属性，可以缩放大小



### 外边距折叠(collapsing margins)

- 毗邻的两个或多个

   

  ```
  margin
  ```

   

  会合并成一个

  ```
  margin
  ```

  ，叫做外边距折叠。规则如下：

  - 两个或多个毗邻的普通流中的块元素垂直方向上的`margin`会折叠
  - 浮动元素或`inline-block`元素或绝对定位元素的`margin`不会和垂直方向上的其他元素的margin折叠
  - 创建了块级格式化上下文的元素，不会和它的子元素发生margin折叠
  - 元素自身的`margin-bottom`和`margin-top`相邻时也会折

### CSS选择符有哪些？哪些属性可以继承

- id选择器（ `# myid`）
- 类选择器（`.myclassname`）
- 标签选择器（`div`, `h1`, `p`）
- 相邻选择器（`h1 + p`）
- 子选择器（`ul > li`）
- 后代选择器（`li a`）
- 通配符选择器（ `*` ）
- 属性选择器（`a[rel = "external"]`）
- 伪类选择器（`a:hover, li:nth-child`）

**CSS哪些属性可以继承？哪些属性不可以继承**

- 可继承的样式： `font-size font-family color, UL LI DL DD DT`
- 不可继承的样式：`border padding margin width height`

### 用纯CSS创建一个三角形的原理是什么

```css
/* 把上、左、右三条边隐藏掉（颜色设为 transparent） */
#demo {
  width: 0;
  height: 0;
  border-width: 20px;
  border-style: solid;
  border-color: transparent transparent red transparent;
}
```

# li 与 li 之间有看不见的空白间隔是什么原因引起的？有什么解决办法

答案：浏览器的默认行为是把 inline 元素间的空白字符（空格换行 tab）渲染成一个空格，也就是我们上面的代码

换行后会产生换行字符，而它会变成一个空格，当然空格就占用一个字符的宽度。



解决方案：

方法一：既然是因为`<li>`换行导致的，那就可以将`<li>`代码全部写在一排，如下

```
<div class="wrap">
  <h3>li标签空白测试</h3>
  <ul>
    <li class="part1"></li>
    <li class="part2"></li>
    <li class="part3"></li>
    <li class="part4"></li>
  </ul>
</div>
```

方法二：我们为了代码美观以及方便修改，很多时候我们不可能将`<li>`全部写在一排，那怎么办？既然是空格占一个字符的宽度，那我们索性就将`<ul>`内的字符尺寸直接设为 0，将下面样式放入样式表，问题解决。

```
.wrap ul {
  font-size: 0px;
}
```

但随着而来的就是`<ul>`中的其他文字就不见了，因为其尺寸被设为 0px 了，我们只好将他们重新设定字符尺寸。
方法三：本来以为方法二能够完全解决问题，但经测试，将 li 父级标签字符设置为 0 在 Safari 浏览器依然出现间隔空白；既然设置字符大小为 0 不行，那咱就将间隔消除了，将下面代码替换方法二的代码，目前测试完美解决。同样随来而来的问题是 li 内的字符间隔也被设置了，我们需要将 li 内的字符间隔设为默认。

```
.wrap ul {
  letter-spacing: -5px;
}
```

之后记得设置 li 内字符间隔

```
.wrap ul li {
  letter-spacing: normal;
}
```

### 为什么要初始化CSS样式

> 因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异

### 请列举几种隐藏元素的方法

- `visibility: hidden;` 这个属性只是简单的隐藏某个元素，但是元素占用的空间任然存在
- `opacity: 0;` `CSS3`属性，设置`0`可以使一个元素完全透明
- `position: absolute;` 设置一个很大的 `left` 负值定位，使元素定位在可见区域之外
- `display: none;` 元素会变得不可见，并且不会再占用文档的空间。
- `transform: scale(0);` 将一个元素设置为缩放无限小，元素将不可见，元素原来所在的位置将被保留
- `<div hidden="hidden">` HTML5属性,效果和`display:none;`相同，但这个属性用于记录一个元素的状态
- `height: 0;` 将元素高度设为 `0` ，并消除边框
- `filter: blur(0);` CSS3属性，将一个元素的模糊度设置为`0`，从而使这个元素“消失”在页面中

###  rgba() 和 opacity 的透明效果有什么不同

- `opacity` 作用于元素以及元素内的所有内容（包括文字）的透明度

- `rgba()` 只作用于元素自身的颜色或其背景色，子元素不会继承透明效果

  

### 浏览器是怎样解析CSS选择器的

- 浏览器解析 CSS 选择器的方式是从右到左

  

### 元素竖向的百分比设定是相对于容器的高度吗

> 元素竖向的百分比设定是相对于容器的宽度，而不是高度

### a标签上四个伪类的执行顺序是怎么样的

> ```
> link > visited > hover > active
> ```

- `L-V-H-A` `love hate` 用喜欢和讨厌两个词来方便记忆

  

### 你对 line-height 是如何理解的

- `line-height` 指一行字的高度，包含了字间距，实际上是下一行基线到上一行基线距离
- 如果一个标签没有定义 `height` 属性，那么其最终表现的高度是由 `line-height` 决定的
- 一个容器没有设置高度，那么撑开容器高度的是 `line-height` 而不是容器内的文字内容
- 把 `line-height` 值设置为 `height` 一样大小的值可以实现单行文字的垂直居中
- `line-height` 和 `height` 都能撑开一个高度，`height` 会触发 `haslayout`，而 `line-height` 不会

### 一个高度自适应的div，里面有两个div，一个高度100px，希望另一个填满剩下的高度

- 方案1：
  - `.sub { height: calc(100%-100px); }`
- 方案2：
  - `.container { position:relative; }`
  - `.sub { position: absolute; top: 100px; bottom: 0; }`
- 方案3：
  - `.container { display:flex; flex-direction:column; }`
  - `.sub { flex:1; }`