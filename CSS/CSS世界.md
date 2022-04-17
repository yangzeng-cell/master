第三章



1. 块级元素和设置display为block不完全等价，块级元素因该包括设置display为block,table,list-item,li默认时list-item,tabe默认时table
2. 在实际开发中，设置用为元素after清除浮动的时候有设置display为table,和block却很少设置为list-item,因为会出现项目原点符号，可以加一行list-item:none来解决，但是用的比较少，还有一个原因时IE在使用为元素：after和before不支持设置display:list-item
3. 尽量不要使用宽度为100%
4. margin的背景永远时透明的，因此不可以作为background-clip或者background-origin的属性值出现，margin设置宽度和1高度没有意义
5. box-sizing:content-box和border-box的区别，前者width时作用在content上，后置时作用在border上
6. 为何box-sizing不支持margin-box
6. 在对于普通的文档流中，百分比高度要想生效，父级元素必须要一个可以生效的高度值
6. 为什么父元素有具体高度，父元素设置为height:auto;height：100%会无效？如果包含的宽度没有显示指定，即高度要由内容来来确定，并且该元素不是绝对定位，则计算值为auto。
6. 如何让元素height：100%生效？1.可以设置显式的高度值。2.使用绝对定位值
6. max-width会覆盖width即使设置了！important,当min-width和max-width发生冲突的时候，min-width会覆盖max-width

