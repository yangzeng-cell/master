# Day11 作业布置

## 一. 完成课堂所有的代码练习

见vscode



## 二. 说出常见的CSS Transform形变有哪些

 transform属性允许对某一个元素进行某些形变, 包括旋转，缩放，倾斜或平移等。transform对于行内级非替换元素（如a，span）是无效的。

* translate(x, y) :平移，用于移动元素在平面上的位置 
* scale(x, y) :缩放，可改变元素的大小。 
* rotate(deg) :旋转，表示旋转的角度 。
* skew(deg, deg) :倾斜，定义了一个元素在二维平面上的倾斜转换 

## 三. 说出CSS Transition和Animation动画的区别

* transition:
  * 只能定义两个状态：开始状态和结束状态，不能定义中间状态
  * 不能重复执行动画，除非一再触发动画
  * 需要在特定状态触发后才能执行，比如某属性修改了
* animation:
  * 可以用@keyframes定义动画序列（每一帧如何执行）
  * 通过设置animation-iteration-count来规定动画执行的次数
  * 不需要触发特定状态即可执行
* animation动画比transition多了animation-iteration-count， animation-direction， animation-fill-mode 和 animation-play-state属性



## 四. 理解vertical-align的作用以及应用场景

vertical-align影响行内级元素在一个行盒中垂直方向的位置，默认值为baseline对齐/

* baseline(默认值)：基线对齐 
* top：把行内级盒子的顶部跟line boxes顶部对齐 
* middle：行内级盒子的中心点与父盒基线加上x-height一半的线对齐 
* bottom：把行内级盒子的底部跟line box底部对齐 

不同应用情景分析：

* 只有文字时：行盒包裹内容,文字的bottom-line和行盒底部对齐
* 有图片和文字时:图片的底部和文字的baseline对齐
* 有图片，有文字，有inline-block（比图片要大 : 图片的底部,行内块底部和文字的baseline对齐
* 有图片，有文字，有inline-block（比图片要大）而且设置了margin-bottom: 图片的底部,行内块margin-bottom底部和文字的baseline对齐
* 有图片、文字、 inline-block（比图片要大）而且设置了margin-bottom并且有文字 :文字的baseline和图片的底部,行内块内最后一行文字的baseline对齐

## 五. 完成小米布局中的动画效果

见vscode



## 六. 自己找一个包含动画的网页案例(比如考拉页面)

见vscode

















