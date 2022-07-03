# Day15 作业布置

## 一. 完成上课所有的代码练习





## 二. 说说你对BFC的理解（面试题）

- block format context(块级格式化上下文)
  - 是页面的一块渲染区域 并且有一套渲染规则,决定了子元素如何定位 以及与其他元素之间的排列 布局之间的关系
  - BFC是一个独立的布局环境 相当于是一个容器 在其中按照一定的规则对块级元素进行摆放 ,并且不会影响其他的布局环境中的盒子,如果一个元素触发BFC则BFC中的元素布局不受外界的影响
- 块级元素在标准流中的布局是属于BFC的
- 创建BFC的条件:
  - 根元素: body/:root
  - float left/right
  - position absolute/fixed
  - overflow: 除visible
  - display: inline-block/table-cell/table-caption ,flex/grid...
- 特点
  - 垂直方向 自上而下排布
  -  垂直方向的间距由margin决定
  - 同一个BFC中 盒子之间的margin会折叠
  - BFC中 每个元素的左边缘紧挨着包含快的左边缘
  - 计算 BFC 的高度时，需要计算浮动元素的高度
  - BFC内部不会影响外部元素
  - BFC区域不会与浮动的元素发生重叠
- 作用
  - 解决margin折叠的问题
  - 解决高度塌陷的问题
    - 前提 :浮动的父级BFC高度为auto
  - 创建两栏布局
    - 左边浮动 右边overflow:hidden



## 三. 整理<王者荣耀>用到的CSS知识点

- 定位: absolute relative fixed
  - 定位实现左右或者垂直居中 
  - 给盒子一个高度或宽度 l0r0/t0b0 设置margin在对应方向的auto
  - 对z-index的设置决定部分定位元素的层叠
- flex布局
  - 运用justify-content align-items来决定axis与cross axis上的元素的位置
  - 以及让单个 flex item 不拉伸 设置flex-shrink的值 单纯设置 flex-grow避免flex-basis的影响
- 动画以及transition
  - 设置帧动画 
  - @keyframes来进行透明度的动画
  - 设置animation: name duration timing-function delay  等等
  - display对动画无效 可以在disblock的时候设置透明度的动画
  - 对height设置的transition 可以给父元素设置对应的padding-bottom以及box-sizing:border-box使得文字不动

 







