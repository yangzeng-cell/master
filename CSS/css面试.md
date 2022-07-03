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

**回流**：

触发条件：当我们对 DOM 结构的修改引发 DOM 几何尺寸变化的时候，会发生`回流`的过程。

例如以下操作会触发回流：

1.一个 DOM 元素的几何属性变化，常见的几何属性有`width`、`height`、`padding`、`margin`、`left`、`top`、`border` 等等, 这个很好理解。 2. 使 DOM 节点发生`增减`或者`移动`。 3. 读写 `offset`族、`scroll`族和`client`族属性的时候，浏览器为了获取这些值，需要进行回流操作。 4. 调用 `window.getComputedStyle` 方法。

> 回流过程：由于DOM的结构发生了改变，所以需要从生成DOM这一步开始，重新经过`样式计算`、`生成布局树`、`建立图层树`、再到`生成绘制列表`以及之后的显示器显示这整一个渲染过程走一遍，开销是非常大的。

**重绘**：

触发条件：

- 当 DOM 的修改导致了样式的变化，并且没有影响几何属性的时候，会导致`重绘`(`repaint`)。
- 重绘过程：由于没有导致 DOM 几何属性的变化，因此元素的位置信息不需要更新，所以当发生重绘的时候，会跳过`生存布局树`和`建立图层树`的阶段，直接到`生成绘制列表`，然后继续进行分块、生成位图等后面一系列操作。

**如何避免触发回流和重绘**：

1. 避免频繁使用 style，而是采用修改`class`的方式。
2. 将动画效果应用到`position`属性为`absolute`或`fixed`的元素上。
3. 也可以先为元素设置`display: none`，操作结束后再把它显示出来。因为在`display`属性为`none`的元素上进行的DOM操作不会引发回流和重绘
4. 使用`createDocumentFragment`进行批量的 DOM 操作。
5. 对于 resize、scroll 等进行防抖/节流处理。
6. 避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。
7. 利用 CSS3 的`transform`、`opacity`、`filter`这些属性可以实现合成的效果，也就是`CPU`加速。

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

## 盒模型



content（元素内容） + padding（内边距） + border（边框） + margin（外边距）

> 页面渲染时，`dom` 元素所采用的 布局模型。可通过`box-sizing`进行设置。根据计算宽高的区域可分为

**box-sizing**

- `content-box`：默认值，总宽度 = `margin` + `border` + `padding` + `width`
- `border-box`：盒子宽度包含 `padding` 和 `border`，`总宽度 = margin + width`
- `inherit`：从父元素继承 `box-sizing` 属性

## BFC



> 块级格式化上下文，是一个独立的渲染区域，让处于 `BFC` 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。

> IE下为 `Layout`，可通过 `zoom:1` 触发

**触发条件:**

- 根元素
- `position: absolute/fixed`
- `display: inline-block / table`
- `float` 元素
- `ovevflow !== visible`

**规则:**

- 属于同一个 `BFC` 的两个相邻 `Box` 垂直排列
- 属于同一个 `BFC` 的两个相邻 `Box` 的 `margin` 会发生重叠
- `BFC` 中子元素的 `margin box` 的左边， 与包含块 (BFC) `border box`的左边相接触 (子元素 `absolute` 除外)
- `BFC` 的区域不会与 `float` 的元素区域重叠
- 计算 `BFC` 的高度时，浮动子元素也参与计算
- 文字层不会被浮动层覆盖，环绕于周围

**应用:**

- 阻止`margin`重叠

- 可以包含浮动元素 —— 清除内部浮动(清除浮动的原理是两个`div`都位于同一个 `BFC` 区域之中)

- 自适应两栏布局

- 可以阻止元素被浮动元素覆盖

  

## 层叠上下文



> 元素提升为一个比较特殊的图层，在三维空间中 (z轴) 高出普通元素一等。

**触发条件**

- 根层叠上下文(`html`)

- `position`

- ```
  css3
  ```

  属性

  - `flex`
  - `transform`
  - `opacity`
  - `filter`
  - `will-change`
  - `webkit-overflow-scrolling`

**层叠等级：层叠上下文在z轴上的排序**

- 在同一层叠上下文中，层叠等级才有意义
- `z-index`的优先级最高

![img](https://poetries1.gitee.io/img-repo/2020/09/111.png)

## link 与 @import 的区别



- `link`功能较多，可以定义 `RSS`，定义 `Rel` 等作用，而`@import`只能用于加载 `css`
- 当解析到`link`时，页面会同步加载所引的 `css`，而`@import`所引用的 `css` 会等到页面加载完才被加载
- `@import`需要 `IE5` 以上才能使用
- `link`可以使用 `js` 动态引入，`@import`不行

## 有哪些方式（CSS）可以隐藏页面元素



- `opacity:0`：本质上是将元素的透明度将为0，就看起来隐藏了，但是依然占据空间且可以交互
- `visibility:hidden`: 与上一个方法类似的效果，占据空间，但是不可以交互了
- `overflow:hidden`: 这个只隐藏元素溢出的部分，但是占据空间且不可交互
- `display:none`: 这个是彻底隐藏了元素，元素从文档流中消失，既不占据空间也不交互，也不影响布局
- `z-index:-9999`: 原理是将层级放到底部，这样就被覆盖了，看起来隐藏了
- `transform: scale(0,0)`: 平面变换，将元素缩放为0，但是依然占据空间，但不可交互

## calc函数



> calc函数是css3新增的功能，可以使用`calc()`计算`border、margin、pading、font-size`和width等属性设置动态值

```css
#div1 {
    position: absolute;
    left: 50px;
    width: calc( 100% / (100px * 2) );
    /* 兼容写法 */
    width: -moz-calc( 100% / (100px * 2) );
    width: -webkit-calc( 100% / (100px * 2) );
    border: 1px solid black;
}
```

**注意点：**

- 需要注意的是，运算符前后都需要保留一个空格，例如：`width: calc(100% - 10px)`;

- `calc()`函数支持 `"+"`, "`-"`, `"*"`, `"/"` 运算;

- 对于不支持 `calc()`的浏览器，整个属性值表达式将被忽略。不过我们可以对那些不支持`calc()`的浏览器，使用一个固定值作为回退。

  

## CSS加载问题



根据页面渲染流程可得知：

- `css`加载不会阻塞DOM树的解析;
- `css`加载会阻塞DOM树的渲染；
- `css`加载会阻塞后面js语句的执行

## 文字单超出显示省略号



```css
div {
	width: 200px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
```

**文字多行超出显示省略号**

```css
div {
	width: 200px;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;
}
```

该方法适用于WebKit浏览器及移动端。

**跨浏览器兼容方案：**

```css
p {
    position:relative;
    line-height:1.4em;
    /* 3 times the line-height to show 3 lines */
    height:4.2em;
    overflow:hidden;
}
p::after {
    content:"...";
    font-weight:bold;
    position:absolute;
    bottom:0;
    right:0;
    padding:0 20px 1px 45px;
}
```

## CSS中可继承的属性



> 可继承的只有：`颜色`、`文字`、`字体间距`、`行高对齐方式`，`列表样式`。

所有元素可继承：`visibility`和`cursor`。

- 内联元素可继承：
  - letter-spacing
  - word-spacing
  - white-space
  - line-height
  - color
  - font
  - font-family
  - font-size
  - font-style
  - font-variant
  - font-weight
  - text-decoration
  - text-transform
  - direction
- 块状：`text-indent`和`text-align`。
- 列表元素可继承：`list-style`、`list-style-type`、`list-style-position`、`list-style-image`

## inline-block的使用场景



1. 要设置某些子元素在一行或者多行内显示，尤其是排列方向一致的情况下，应尽量用`inline-block`。
2. 希望若干个元素平行排列，且在父元素中居中排列，此时可以用`inline-block`，且给父元素设`text-align: center`。
3. `inline-block`可以用一排`a {display: inline-block}`实现横向导航栏，无论是居左的导航栏还是居右的都适用。

对于第一种和第三种情况虽然都可以使用`float`来实现，不过`inline-block`会比它好一些，原因如下：

- 浮动会脱离文档流，导致父元素高度塌陷

## position: fixed什么时候会失效？



我们知道，设置了`position: fixed`固定定位属性的元素会脱离文档流，达到“超然脱俗”的境界。

> 也就是说此时给这种元素设置`top, left, right, bottom`等属性是根据**浏览器窗口**定位的，与其上级元素的位置无关。

但是有一种情况例外：

- 若是设置了`position: fixed`属性的元素，它的祖先元素设置了`transform`属性则会导致固定定位属性失效。
- 只要你的`transform`设置的不是`none`，都会影响到`position: fixed`，因为此时就会相对于祖先元素指定坐标，而不是浏览器窗口。

注意，这个特性表现，目前只在Chrome浏览器/FireFox浏览器下有。IE浏览器，包括IE11, `fixed`还是`fixed`的表现。

### CSS画圆半圆扇形三角梯形

```css
div{
    margin: 50px;
    width: 100px;
    height: 100px;
    background: red;
}
/* 半圆 */
.half-circle{
    height: 50px;
    border-radius: 50px 50px 0 0;
}
/* 扇形 */
.sector{
    border-radius: 100px 0 0;
}
/* 三角 */
.triangle{
    width: 0px;
    height: 0px;
    background: none;
    border: 50px solid red;
    border-color: red transparent transparent transparent;
}
/* 梯形 */
.ladder{
    width: 50px;
    height: 0px;
    background: none;
    border: 50px solid red;
    border-color: red transparent transparent transparent;
}
```

### 圆？半圆？椭圆？

```css
div {
  width: 100px;
  height: 100px;
  background-color: red;
  margin-top: 20px;
}
.box1 { /* 圆 */
  /* border-radius: 50%; */
  border-radius: 50px;
}
.box2 { /* 半圆 */
  height: 50px;
  border-radius: 50px 50px 0 0;
}
.box3 { /* 椭圆 */
  height: 50px;
  border-radius: 50px/25px; /* x轴/y轴 */
}
```