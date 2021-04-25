## Vertical-Align

切记 **vertical-align** 只对 **table-cell** 以及 **inline-element** 起作用，**vertical-align** 的值是相对于其父元素的，父元素必须是行内元素。

- 对于一行文字来讲，该属性的值是相对于行高（line-height）的。
- 对于 **table-cell**，该属性的值是相对于表格的行高的。

**vertical-align** 对于块级元素不起作用，例如我们无法用它去垂直居中一个div中的p元素，因此这个方法通常不是垂直居中的最优选择。



## Line-Height 方法

这个方法适用于单行文字的垂直居中，只需要将包含文字元素的容器行高设置为大于字体大小并且等于元素的高度。默认情况下，文字上下部分会留有相同的空间，因而实现了文字的垂直居中。

**html**



```html
<div id="parent">
    <div id="child">Text here</div>
</div>
```

**css**



```css
#child {
    line-height: 200px;
}
```

这种方法只适用于单行文字的垂直居中，如果需要多行文字居中，需要选择其他方法。

## 使用 Line-Height 垂直居中图片

使 **line-height** 可以实现图片的垂直居中，只需要在包含图片的父元素上设置 **line-height** 然后为图片设置 `vertical-align: middle`。

**html**



```html
<div id="parent">
    <img src="image.png" alt="" />
</div>
```

**css**



```css
#parent { 
    line-height: 200px;
}

#parent img {
    vertical-align: middle;
}
```

## CSS表格法

之前已经提到 **vertical-align** 适用于 **table-cell**, 因此可以通过将元素转化为table来实现垂直居中。

**html**



```html
<div id="parent">
    <div id="child">Text here</div>
</div>
```

**css**



```css
#parent {
    display: table;
}

#child {
    display: table-cell;
    vertical-align: middle;
}
```

注意这种方法的好处在于支持内容的动态改变，缺点是不支持旧版的IE浏览器（<=IE7）。

## 绝对定位和负边距法

这种方法适用于块级元素，需要设置元素的高度。

下面的代码同时实现了子元素的水平和垂直居中：

**html**



```html
<div id="parent">
    <div id="child">Content here</div>
</div>
```

**css**



```css
#parent {
    position: relative
}

#child {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 30%;
    width: 50%;
    margin: -15% 0 0 -25%;
}
```

这种方法利用绝对定位先将元素的上边界和左边界移动到50%的位置，再根据元素的尺寸调整负边距以达到居中的效果。

这种方法适用于所有浏览器，但是由于需要预先设定元素高度，因此可能出现内容超出容器的情况。

## 绝对定位和拉伸法

和上一种方法一样，这种方法也需要将需要居中的元素设置绝对定位，并预先指定高度和宽度。不过在具体实现思想上有所不同。

**html**



```html
<div id="parent">
    <div id="child">Content here</div>
</div>
```

**css**



```css
#parent {
    position: relative
}

#child {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    height: 30%;
    width: 50%;
    margin: auto;
}
```

这个方法的原理是使子元素有拉伸到容器边界的“趋势”，但由于子元素设置了高宽，因此无法拉伸。同时因为设置了 `margin: auto`，意味着相对方向的外边距相等，因此元素被“挤”到了容器的中央。

和上一种方法一样，这种方法的子元素内容也可能超出容器。

## 上下内边距（padding）相等法

这种方法通过设置上下padding相等来实现垂直居中。

**html**



```html
<div id="parent">
    <div id="child">Content here</div>
</div>
```

**css**



```css
#parent {
    padding: 5% 0;
}

#child {
    padding: 10% 0;
}
```

上面的代码使用了相对尺寸，然而如果需要指定元素尺寸时，就需要使用绝对尺寸并做一个简单的计算了。例如，如果指定父元素高度为400px，子元素高度为100px，要实现垂直居中需要设置父元素的上下padding为150px。

## 浮动元素法

这个方法的原理是利用一个空的浮动元素来控制主要内容在容器中的位置。

**html**



```html
<div id="parent">
    <div id="floater"></div>
    <div id="child">Content here</div>
</div>
```

**css**



```css
#parent {
    padding: 5% 0;
}

#floater {
    float: left;
    height: 50%;
    width: 100%;
    margin-bottom: -50px;
}

#child {
    clear: both;
    height: 100px;
}
```

这个浮动元素可以向任意方向浮动，设置高度为50%，同时利用margin-bottom使该元素上移，上移高度为主要内容元素高度的一半。为了使内容元素移动到浮动元素下方，还需要为该元素设置 `clear: both`。

这种方法同样适用于所有浏览器，缺点是需要提前知道内容元素的高度。



