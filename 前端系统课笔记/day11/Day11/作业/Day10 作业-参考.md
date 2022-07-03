# Day10 作业布置

## 一. 完成课堂所有的代码

* 边框可以不做





## 二. 说出为什么需要清除浮动以及如何清除浮动

- 由于浮动元素脱离了标准流 变成了浮动元素 不再向父元素汇报高度 所以父元素计算高度时并没有将浮动元素的高度计算进来 而一般父元素的高度是由内容撑开的 不予设置高度 因此就造成了**高度塌陷**的问题 而解决高度塌陷的问题就叫做清除浮动

- 清除浮动的目的是为了让父元素子计算高度的时候把浮动子元素的高度计算进去

- 清除浮动的方法

  - 给父元素增加固定高度 但是需要计算不方便

  - 在父元素的最后一个元素下面增加一个空的块级子元素 但是增加了无意义的标签 违反了结构与样式分离的原则

  - 给父元素添加一个伪元素(推荐)

    ```css
    .clear_fix::after {
    	content: "";
    	display: block;
    	clear:both;
    	visibility: hidden; /* 浏览器兼容性 */
    	height: 0; /* 浏览器兼容性 */
    	
    }
    .clear_fix {
    	*zoom: 1; /* IE6/7兼容性 */
    }
    ```

    



## 三. 利用浮动完成如下布局结构（完成结构即可）(选做)

![image-20220408012538662](https://tva1.sinaimg.cn/large/e6c9d24egy1h11o5003wxj20xf0djgpi.jpg)



```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box {
        width: 1190px;
        margin: 0 auto;
        background-color: #f00;
      }
      .container {
        margin-right: -10px;
      }
      .item {
        float: left;
        width: 190px;
        height: 470px;
        background-color: #0f0;
        margin-right: 10px;
      }
      /* .item1,
      .item3 {
      } */
      .item2 {
        width: 590px;
        background-color: #00f;
      }
      .item3 {
        background-color: #fff;
      }
      .item3 .block {
        height: 150px;
        margin-bottom: 10px;
        background-color: #0f0;
      }
      .item3 .block:last-child {
        margin-bottom: 0;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="container">
        <div class="item item1">1</div>
        <div class="item item2">2</div>
        <div class="item item3">
          <div class="block">3</div>
          <div class="block">4</div>
          <div class="block">5</div>
        </div>
        <div class="item item4">6</div>
      </div>
    </div>
  </body>
</html>

```



## 四. 总结flex布局container和item的属性以及作用（重要）

- container

  - flex-direction
    - 决定主轴(main axis)的方向(正方向或者反方向)有四个值
      - row(默认)
      - column 定义了主轴的方向和块轴排列的方向相同
      - row-reverse 与row的方向相反
      - column-reverse 与column的方向相反
  - flex-wrap
    - 定义了flex container是单行还是多行有如下值
      - nowrap(默认 不换行)
      - wrap(多行排列)
      - wrap-reverse 多行排列从下到上 与正常方向相反(不常用)
  - flex-flow
    - flex-direction与flex-wrap的缩写
  - align-items
    - 决定了items在纵横轴上的排布方式 值如下
      - baseline 与items的基线对齐
      - normal 在弹性布局中 效果和stretch 一样
      - center 居中对齐
      - flex-start 与cross start对齐
      - flex-end 与cross end 对齐
      - stretch 当items在cross axis的高度(默认为auto)为auto时 会自动拉伸至container的高度
  - justify-content
    - 决定了main axis方向上  flex items的对齐方式 值如下
    - center 居中对齐
    - flex-start  与main start对齐
    - flex-end 与main end对齐
    - space-between items之间的距离相等
    - space-around items之间的距离相等 items与main start 和main end之间的距离是 item与item之间距离的一半
    - space-evenly  items之间的距离相等 items与main start 和main end之间的距离与 item与item之间的距离相等
  - align-content
    - 决定了items 在 cross axis上的对齐方式 用法与 justify-content相似
    - 只是由main方向 换成了 cross axis方向

- item

  - flex-grow

    - grow 拉伸 可以设置任意非负数字(默认值是0)
    - 当item的宽度在main axis有剩余的size时 才会生效
    - 如果所有的items都有相同的 flex-grow 系数，那么所有的items将剩余空间按相同比例分配，否则将根据不同的 flex-grow 定义的比例进行分配。
    - 扩展后的最终size不能超过max-width/max-height

  - flex-shrink

    - shrink收缩 可以设置任意非负数字 只有当item size的盒超过了 contaienr的size时 才会生效)(默认值为1)
    - 如果
    - 收缩后的最终 size 不能小于 min-width\min-height

    

  - flex-basis

    - 用来设置item在主轴上的基本的size
    - item的优先级从高到低依次为
      - max/min-width/height
      - flex-basis
      - width/height
      - 内容本身的大小
    - 例外
      - 如果item内文字过长 会拉伸(没有设置width时无论实际宽度是否超出flex-basis的值)

  - align-self

    - 通过给某个flex item设置align-self，会对齐当前 grid 或 flex 行中的元素，并会覆盖align-items的设置。

  - order

    - 默认值是0 可以是任意整数 值越小排在前面

  - flex

    - flex-grow flex-shrink flex-basis的组合

    - ```
      none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
      
      ```

    - 可以使用一个，两个或三个值来指定 `flex`属性。

    - 一个值时

      - 数字 被当成flex-grow
      - 有效的宽度 被当成flex-basis
      - auto:  1 1 auto 
      - none: 0 0 auto

    - 两个值时
      - 第一个值必须为无单位数 被当成flex-grow
      - 第二个值为无单位值时 被当成flex-shrink 有单位时 是 flex-basis
    - 三个值时 前两个为无单位值 最后一个为有单位宽度值 依次为 flex-grow flex-shrink flex-basis

    

## 五. 自己找3个案例练习

* 案例一：其中用到元素定位
* 案例二：其中用到浮动布局
* 案例三：其中用到flex布局

- 三合一(flex用的比较少)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        background: url(https://img.alicdn.com/imgextra/i3/O1CN01PaQurJ1QgnAICTCgg_!!6000000002006-2-tps-1490-2984.png)
          repeat-y 0 36px;
        background-size: cover;
        overflow-x: hidden;
      }
      a {
        text-decoration: none;
      }

      .clearfix::after {
        content: " ";
        display: block;
        clear: both;

        visibility: hidden;
        height: 0;
      }
      .clearfix {
        *zoom: 1;
      }

      .box {
        width: 1200px;
        margin: 0 auto;
        height: 1000px;
      }
      .container {
        position: sticky;
        top: 0;
        margin-top: 60px;
        padding-top: 20px;
      }
      .container .tb-logo {
        float: left;
        width: 190px;

        margin-left: 32px;
      }

      .container .tb-logo .logo-bd {
        display: block;
        width: 148px;
        height: 0;
        padding-top: 58px;
        overflow: hidden;
        background: url(https://gw.alicdn.com/imgextra/i3/O1CN01uRz3de23mzWofmPYX_!!6000000007299-2-tps-143-59.png)
          no-repeat 0 0;
      }

      .container .tb-content {
        /* position: relative; */
        margin: 0 302px 0 255px;
      }
      .tb-content .search-bd {
        width: 728px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        /* padding: 0 10px; */
        background-color: hsl(0deg 0% 100%);
        border: 2px solid hsl(19deg 100% 50%);
        border-radius: 50px;

        position: relative;
      }
      .search-bd .search-left {
        position: absolute;
        left: 10px;
        top: 0;
        height: 38px;
        font-size: 14px;
      }

      .tb-content [action] .search-icon {
        position: absolute;
        left: 60px;
        top: 7px;
        width: 1px;
        height: 24px;
        background: hsl(0deg 11% 95%);
      }
      .tb-content [action] .search-center {
        margin-left: 0px;
        margin-right: 75px;
        overflow: hidden;
        padding-left: 65px;
      }
      [action] .search-center > input {
        width: 100%;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: hsl(0deg 0% 0%);

        border: 0;
        outline: none;
      }
      .tb-content [action] .search-btn {
        position: absolute;
        top: 2px;
        right: 0;
        width: 72px;
        height: 34px;
        margin-right: 2px;
        overflow: hidden;
        border-radius: 20px;
        background-clip: padding-box;
      }
      .tb-content .search-btn > [type] {
        width: 72px;
        height: 34px;
        border: none;
        background: hsl(19deg 100% 50%);
        font-size: 18px;
        font-weight: 700;
        color: hsl(0deg 0% 100%);
        background-image: linear-gradient(
          to right,
          hsl(34deg 100% 50%) 0,
          hsl(19deg 100% 50%) 100%
        );
        background-repeat: repeat-x;
        cursor: pointer;
      }

      .container .tb-wrapper {
        position: absolute;
        top: 0;
        right: 58px;
      }
      .container .tb-wrapper > a {
        position: relative;
        display: block;
        text-align: center;
        width: 74px;
        height: 88px;
        color: hsl(0deg, 0%, 40%);
        border: 1px solid hsl(0deg, 0%, 93%);
        background-color: hsl(0deg, 0%, 100%);
        font-size: 12px;

        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }

      .tb-wrapper a > img {
        width: 62px;
        height: 62px;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="container">
        <div class="tb-logo clearfix">
          <a class="logo-bd" href="">淘宝网 </a>
        </div>

        <div class="tb-content">
          <div class="search-bd">
            <div class="search-left">天猫</div>
            <form action="">
              <i class="search-icon"></i>
              <div class="search-center">
                <input type="text" placeholder="搜索" />
              </div>
              <div class="search-btn">
                <button type="submit">搜索</button>
              </div>
            </form>
          </div>
        </div>

        <div class="tb-wrapper">
          <a href="">
            <span>下载淘宝</span>
            <img
              src="data:image/png;base64,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"
              alt=""
            />
          </a>
        </div>
      </div>
    </div>
  </body>
</html>

```















