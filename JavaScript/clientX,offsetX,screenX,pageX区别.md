![img](https://user-gold-cdn.xitu.io/2019/6/26/16b91a360f58be3f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

# MouseEvent.offsetX

#### Experimental

**这是一个实验中的功能**
此功能某些浏览器尚在开发中，请参考[浏览器兼容性表格](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/offsetX#browser_compatibility)以得到在不同浏览器中适合使用的前缀。由于该功能对应的标准文档可能被重新修订，所以在未来版本的浏览器中该功能的语法和行为可能随之改变。



[`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent) 接口的只读属性 **offsetX** 规定了事件对象与目标节点的内填充边（padding edge）在 X 轴方向上的偏移量。

### [返回值](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/offsetX#返回值)

一个`双精度` 浮点值。早期的规范将其规定为整数值。详见浏览器兼容性部分

| Feature                           | Chrome | Edge  | Firefox (Gecko)                                              | Internet Explorer | Opera | Safari |
| :-------------------------------- | :----- | :---- | :----------------------------------------------------------- | :---------------- | :---- | :----- |
| Basic support                     | (Yes)  | (Yes) | [39.0](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/39) (39.0) | 6                 | (Yes) | (Yes)  |
| Redefined from `long` to `double` | 56     | ?     | ?                                                            | ?                 | ?     | ?      |

| Feature                           | Android Webview | Chrome for Android | Edge  | Firefox Mobile (Gecko) | IE Mobile | Opera Mobile | Safari Mobile |
| :-------------------------------- | :-------------- | :----------------- | :---- | :--------------------- | :-------- | :----------- | :------------ |
| Basic support                     | (Yes)           | (Yes)              | (Yes) | 43.0 (43.0)            | ?         | ?            | ?             |
| Redefined from `long` to `double` | 56              | 56                 | ?     | ?                      | ?         | ?            | ?             |

# MouseEvent.offsetY

# MouseEvent.clientX





**`MouseEvent.clientX`** 是只读属性， 它提供事件发生时的应用客户端区域的水平坐标 (与页面坐标不同)。例如，不论页面是否有水平滚动，当你点击客户端区域的左上角时，鼠标事件的 `clientX` 值都将为 0 。最初这个属性被定义为长整型（long integer），如今 **CSSOM** 视图模块将其重新定义为双精度浮点数（double float）。你可以查阅浏览器兼容性部分的文档来进一步了解有关信息。

### [`返回值`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/clientX#返回值)

被 CSSOM View Module 重新定义为一个 `double` 类型的浮点值. 原来这个属性是被定义为一个 `long` 整数. 可以在 "浏览器兼容性" 那里查看详细内容.

# MouseEvent.pageX





 `**pageX**` 是一个由[`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent)接口返回的相对于整个文档的x（水平）坐标以像素为单位的只读属性。

这个属性将基于文档的边缘，考虑任何页面的水平方向上的滚动。举个例子，如果页面向右滚动 200px 并出现了滚动条，这部分在窗口之外，然后鼠标点击距离窗口左边 100px 的位置，pageX 所返回的值将是 300。

 起初这个属性被定义为长整型。 CSSOM 视图模块将它重新定位为双浮点数类型。请参阅浏览器兼容性部分了解详情。

# MouseEvent.screenX





 **`screenX`** 是 [`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent) 的只读属性，提供鼠标在全局（屏幕）中的水平坐标（偏移量）。