# day02 作业布置

## 一. 完成课堂所有的代码练习（必须全部自己实现）

01.文档类型声明

```html
<!DOCTYPE html>     01.文档类型声明
```

02.HTML元素的属性

```html
<html lang="en">
    <head></head>
    <body>内容</body>
</html>   
<html lang="zh-CN">
    <head></head>
    <body>内容</body>
</html>             02.HTML元素的属性,lang：1.帮助语言合成工具确定要使用的发音2.帮助翻译工具确定使用翻译规则
```

03.head元素的属性

```html
<html>
    <head>
        <meta charest="utf-8">
        <title>我是标题</title>
    </head>
    <body></body>
</html>             03.head元素的属性，两个元素一个title设置网页的标题，一个meta设置网页的编码形式
```

04.h元素的用法

```html
<html>
    <head></head>
    <body>
        <h1>标题1</h1>
        <h2>标题2</h2>
        <h3>标题3</h3>
        <h4>标题4</h4>
        <h5>标题5</h5>
        <h6>标题6</h6>
    </body>
</html>             04.h元素的用法,通常用作标题,h1最大,h6最小
```

05.p元素的用法


```html
<html>
    <head></head>
    <body>
        <p>
            昨天一个朋友问我，怎么才能让房价迅速降下来？
        </p>
        <p>
            有人说，这还用问，当然是调控。
        </p>
        <p>
            的确，2021年，二手房指导价出台，成为众多城市楼市的梦魇，就连不可一世的炒房第一城深圳，也被立斩于马下，学区房一夜掉价几百万，至今缓不过来。
        </p>
    </body>
</html>             05.p元素的用法,作用是段落,分段
```

06.h元素和p元素的案例


```html
<html>
    <head>
        <h1>这些城市，房子真的太多了</h1>
    </head>
    <body>
        <p>
            昨天一个朋友问我，怎么才能让房价迅速降下来？
        </p>
        <p>
            有人说，这还用问，当然是调控。
        </p>
        <p>
            的确，2021年，二手房指导价出台，成为众多城市楼市的梦魇，就连不可一世的炒房第一城深圳，也被立斩于马下，学区房一夜掉价几百万，至今缓不过来。
        </p>
    </body>
</html>             06.h元素和p元素的案例
```

07.img元素的基本使用


```html
<html>
    <head>
    </head>
    <body>
       <img src="https://p6.toutiagin/tos-cn-i-qvj2lq49k0/ec7d03634695464cab47abfe2a00efb0?from=pc" alt="小王子">
    </body>
</html>             07.img元素的基本使用,src填写目标图片的文件路径,有相对路径跟绝对路径,alt图片加载不成功显示文本,屏幕阅读器可将图片信息传达给需要的人听
```

08.相对路径跟绝对路径


```html
<html>
    <head>
    </head>
    <body>
        <img src="../images/gouwujie01.jpg" alt=""><!--相对路径-->
        <img src="C:\Users\Administrator\Desktop\新建文件夹\Day02\Learn_HTML_CSS\images\gouwujie01.jpg" alt="图片"><!--绝对路径-->
    </body>
</html>             08.相对路径跟绝对路径
```

09.a元素的使用


```html
<html>
    <head>
    </head>
    <body>
        <a  href="https://www.toutiao.com/?wid=1648208779618" target="_blank">今日头条</a>
        <a  href="./08.相对路径跟绝对路径.html" target="_self">本地</a>
        <a  href="https://www.toutiao.com/?wid=1648208779618" target="_self">头条</a>
    </body>
</html>             09.a元素的使用
```

10.a元素的在本页面的锚点链接


```html
<html>
    <head>
    </head>
    <body>
        <a  href="#table1" >跳转到第一个</a>
        <a  href="#table2" >跳转到第二个</a>
        <a  href="#table3" >跳转到第三个</a>
        <h3 id="table1">
            第一个标题
        </h3>
        <p>
            66666
        </p>
        <h3 id="table2">
            第二个标题
        </h3>
        <p>
            66666
        </p>
        <h3 id="table3">
            第三个标题
        </h3>
        <p>
            66666
        </p>
    </body>
</html>             10.a元素的在本页面的锚点链接
```
11.a元素跟img元素的结合使用
```html
<html>
    <head>
    </head>
    <body>
        <a href="https://www.toutiao.com/article/7078655559993508352/?log_from=fd63341789015_1648211460637">
            <img src="https://p6.toutiaoimg.com/origin/tos-cn-i-qvj2lq49k0/b84a189a99204c269221fdfccf9d6998?from=pc">
        </a>
    </body>
</html>             11.a元素跟img元素的结合使用
```

12.a元素跟其他元素的链接
```html
<html>
    <head>
    </head>
    <body>
        <a href="https://github.com/coderwhy/HYMiniMall/archive/master.zip">下载</a>
        <a href="mailto:12345@qq.com">发送邮件到12345qq邮箱</a>
    </body>
</html>             12.a元素跟其他元素的链接
```
13.iframe元素的使用
```html
<html>
    <head>
    </head>
    <body>
        <iframe src="https://www.toutiao.com/?wid=1648208779618" frameborder="1"></iframe>
    </body>
</html>             13.iframe元素的使用
```
14.iframe元素和a元素的结合使用
```html
<html>
    <head>
    </head>
    <body>
        <iframe src="./others/a元素的网页.html" frameborder="1"></iframe>
    </body>
</html>             14.iframe元素和a元素的结合使用
```
15.div元素和span元素的调用
```html
<html>
    <head>
    </head>
    <body>
        <h1>学习前端</h1>
        <div>
            <h2>学习前端</h2>
            <p>学习html</p>
        </div>
        <div>
            <h2>学习前端</h2>
            <p>学习<span>css</span></p>
        </div>
        <div>
            <h2>学习前端</h2>
            <p>学习js</p>
        </div>
    </body>
</html>             15.div元素和span元素的调用
```
16.不太常用的元素演练
```html
<html>
    <head>
    </head>
    <body>
        <p>
           hello<strong>你好</strong>,真的<i>好的</i> 
        </p>
    </body>
</html>             16.不太常用的元素演练
```
17.全局属性-title属性
```html
<html>
    <head>
    </head>
    <body>
        <p title="你好,世界">helloworld</p>
    </body>
</html>             17.全局属性-title属性
```
18.字符实体-额外补充

```html
<html>
    <head>
    </head>
    <body>
        <span>&nbsp;你好你好&nbsp;</span>
        <span>&lt;你好你好&lt;</span>
        <span>&gt;你好你好&gt;</span>
    </body>
</html>             18.字符实体-额外补充
```



## 二. 寻找h元素和p元素的案例，并且实现

```html
<html>
    <head>
        <h1>这些城市，房子真的太多了</h1>
    </head>
    <body>
        <p>
            昨天一个朋友问我，怎么才能让房价迅速降下来？
        </p>
        <p>
            有人说，这还用问，当然是调控。
        </p>
        <p>
            的确，2021年，二手房指导价出台，成为众多城市楼市的梦魇，就连不可一世的炒房第一城深圳，也被立斩于马下，学区房一夜掉价几百万，至今缓不过来。
        </p>
    </body>
</html>  
```



## 三. 寻找a元素结合img元素的案例（3个）

```html
<html>
    <head> </head>
    <body>
        <a href="https://shouji.jd.com/?skuId=100025047302_100004325476&groupId=03312682&productId=09173749"><img src="https://img20.360buyimg.com/img/s100x100_jfs/t1/193030/20/17827/75476/6110f9eeE3b3eec9f/6e32be8839b5a110.jpg!cc_100x100.webp"></a>
    </body>
</html>
```

```html
<html>
    <head> </head>
    <body>
        <a href="https://www.vivo.com.cn/brand/news/detail?id=956&type=0"><img src="https://wwwstatic.vivo.com.cn/vivoportal/files/image/brand/20210719/1e632d569ea1da9b277254fc8e6d0356.jpg"></a>
    </body>
</html>
```

```html
<html>
    <head> </head>
    <body>
        <a href="https://www.baidu.com/s?wd=%E7%99%BE%E5%BA%A6%E7%83%AD%E6%90%9C&sa=ire_dl_gh_logo_texing&rsv_dl=igh_logo_pcs"><img src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"></a>
    </body>
</html>
```



## 四. 说出div元素和span元素的作用和区别

div元素跟span元素都是纯粹的容器,也可以称作"盒子",都是用来包裹内容的

div元素包裹的内容会显示在不同的行,可以把网页分成多个独立的部分,一般作为其他的元素的父容器

span元素包裹的内容会显示在同一行,默认情况下是跟普通的文本没有区别,可以用来凸显一些关键字



## 五. HTML全局属性有哪些？分别是什么作用。

- id:唯一的标识符,在文档内必须要是唯一的
- class:一个以空格分割的元素的类名列表,它允许css,js通过类选择器(或者dom方法)选择和访问特定的元素
- title:包含表示与其所属元素相关信息的文本,可以呈现给用户看,不是必须
- style:是给元素添加样式

## 六.预习CSS（按照MDN文档）

https://developer.mozilla.org/zh-CN/docs/Learn/CSS/First_steps

