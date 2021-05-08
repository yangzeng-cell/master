# 原生JS实现轮播图 方法总结

## 方法总结：

#### 方法一：

- 利用绝对定位`absolute`偏移量的改变来实现

- 具有往左往右滑动的效果

  **演示代码：**

  - [位移滑动轮播图1](https://juejin.cn/post/6850418121606594568#test1_1)

#### 方法二：

- 利用 `display/opacity/visibility`状态切换来实现

- 没有往左往右滑动的效果

  **演示代码：**

  - [display属性显示隐藏轮播图1](https://juejin.cn/post/6850418121606594568#test2_1)
  - [display属性显示隐藏轮播图2](https://juejin.cn/post/6850418121606594568#test2_2)

#### 方法三

- 旋转木马轮播图

- 存储每个图片的位置信息（`absolute`位置信息+`z-index`属性+`opacity`透明度 等等）到一个数组。对数组进行`pop push shift unshift`等操作再引用到DOM元素上，产生轮播效果。

  **演示代码：**

  - [旋转木马轮播图1](https://juejin.cn/post/6850418121606594568#test3_1)

**轮播图功能如下：**

1. 自动播放（鼠标移入：暂停播放，左右按钮显示；鼠标移出：自动播放，左右按钮隐藏）
2. 点击`“左右按钮”`切换`“上一张/下一张”`状态
3. 鼠标移入第`i`个小圆点，图片切换至第`i`张图片(方法二例2的小圆点功能体现在右侧的缩略图上)
4. 轮播图无缝连接

**作者有话说：**

下面有源代码，JS部分有注释，很详细了。

只要仔细看懂了其中一例轮播图，其他的例子看一遍肯定就会了。

方法都是一样，只做了部分改动。

我写的时候都是在第一个的模板上改动的。

html结构，css样式，js代码大部分都是一样的。（用更快的时间掌握轮播图）

持续更新中。。。

#### 方法一：位移滑动轮播图1



![在这里插入图片描述](https://user-gold-cdn.xitu.io/2020/7/17/1735b5750d703fc2?imageslim)

**全部代码：** JS部分有详细说明



```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>位移滑动轮播图1</title>
    <style>
        *{
            padding: 0;
            margin: 0;
        }
        #wrapper{
            position: relative;
            margin: 50px auto;
            padding: 0;
            width: 500px;
            height: 300px;
        }
        #wrapper .content{
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        #wrapper>.content>.imgs{
            position: absolute;
            margin: 0;
            padding: 0;
            left: 0;
            top: 0;
            width: 3000px;           /*多留出一张图片的宽度！*/
            list-style: none;
        }
        #wrapper>.content>.imgs li{
            float: left;
            margin: 0;
            padding: 0;
            width: 500px;
            height: 300px;
        }
        #wrapper>.content>.imgs>li img{
            width: 100%;
            height: 100%;
        }

        #wrapper>.content>.dots{
            position: absolute;
            right: 10px;
            bottom: 10px;
            list-style: none;
        }
        #wrapper>.content>.dots li{
            float: left;
            width: 20px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            border-radius: 50%; 
            margin-left:10px ;
            cursor: pointer;
        }

        li.active{
            background-color: white;
        }
        li.quiet{
            background-color: #5a5a58;
        }

        .btns{
            display: none;
        }
        .btns span{
            position: absolute;
            width: 40px;
            height: 40px;
            top: 50%;
            margin-top: -20px;
            line-height: 40px;
            text-align: center;
            font-weight: bold;
            font-family: Simsun;
            font-size: 30px;
            border: 1px solid #fff;
            opacity: 0.5;
            cursor: pointer;
            color: #fff;
            background: black;
        }
        .btns .left{
            left: 5px;
        }
        .btns .right{
            left: 100%;
            margin-left: -45px;
        } 
    </style>
</head>
<body>
    <body>
        <div id = "wrapper">
            <div class="content">
                <ul class="imgs">
                    <li><img src="images/bg1.jpg"/></li>
                    <li><img src="images/bg2.jpg"/></li>
                    <li><img src="images/bg3.jpg"/></li>
                    <li><img src="images/bg4.jpg"/></li>
                    <li><img src="images/bg5.jpg"/></li>
                </ul>
                <ul class='dots'></ul>
            </div>
            <div class="btns">
                <span class="left">&lt;</span>
                <span class="right">&gt;</span>
            </div>
        </div>
    </body>

    <script>
        var wrapper = document.getElementById("wrapper");
        var imgs = document.getElementsByClassName("imgs")[0];
        var dots = document.getElementsByClassName("dots")[0];
        var btns = document.getElementsByClassName("btns")[0];
        var dotss = dots.children;

        var len = imgs.children.length;  //图片张数
        var width = wrapper.offsetWidth; //每张图片的宽度
        var rate = 15;    //一张图片的切换速度， 单位为px
        var times = 1;    //切换速度的倍率
        var gap = 2000;   //自动切换间隙， 单位为毫秒
        var timer = null; //初始化一个定时器
        var imgSub = 0;   //当前显示的图片下标
        var dotSub = 0;   //当前显示图片的小圆点下标
        var temp;


        // 创建一个文档片段，此时还没有插入到 DOM 结构中
        const frag = document.createDocumentFragment()
        // 根据图片数量添加相应的小圆点到文档片段中
        for (let i=0; i<len; i++){
            const dot = document.createElement("li");
            dot.className = 'quiet';
            // 先插入文档片段中
            frag.appendChild(dot);
        }
        // 将小圆点片段统一插入到 DOM 结构中
        dots.appendChild(frag)

        // 第一个小圆点高亮显示
        dots.children[0].className = "active";

        // 滑动函数
        function Roll(distance){        //参数distance：滚动的目标点（必为图片宽度的倍数）
            clearInterval(imgs.timer);  //每次运行该函数必须清除之前的定时器！
            //判断图片移动的方向
            var speed = imgs.offsetLeft < distance ?  rate : (0-rate);
            //设置定时器，每隔10毫秒，调用一次该匿名函数
            imgs.timer = setInterval(function(){      
                //每一次调用滚动到的地方 (速度为 speed px/10 ms)         
                imgs.style.left = imgs.offsetLeft + speed + "px";   
                //距目标点剩余的px值      
                var leave = distance - imgs.offsetLeft;             
                /*接近目标点时的处理，滚动接近目标时直接到达， 避免rate值设置不当时不能完整显示图片*/
                if (Math.abs(leave) <= Math.abs(speed)) {                    
                    clearInterval(imgs.timer);
                    imgs.style.left = distance + "px";
                }
            },10);
        }

        /*克隆第一个li到列表末*/
        imgs.appendChild(imgs.children[0].cloneNode(true));

        function autoRun(){
            imgSub++;
            dotSub++;
            if(imgSub > len){          //滚动完克隆项后
                imgs.style.left = 0;   //改变left至真正的第一项处
                imgSub = 1;            //从第二张开始显示
            }
            // 调用滚动函数，参数为该下标的滚动距离
            Roll(-imgSub*width);
            
            // 如果圆点下标已滚动到最后，则将下标重置为0
            if(dotSub > len-1){                //判断是否到了最后一个圆点
                dotSub = 0;                 
            }
            // 循环修改所有圆点默认样式
            for(var i=0; i<len; i++){
                dotss[i].className = "quiet";
            }
            // 给当前滚动到的圆点添加高亮样式
            dotss[dotSub].className = "active";
        }

        // 创建定时器，开始自动滚动
        timer = setInterval(autoRun, gap);

        // 循环添加小圆点的触发事件
        for(var i=0; i<len; i++){
            dotss[i].index = i;
            dotss[i].onmouseover = function(){
                for(var j=0; j<len; j++){
                    dotss[j].className = "quiet";
                }
                this.className = "active";
                temp = dotSub;
                imgSub = dotSub = this.index;
                times = Math.abs(this.index - temp);  //距离上个小圆点的距离
                rate = rate*times;                    //根据距离改变切换速率
                Roll(-this.index * width);
                rate = 15;
            }
        }

        // 添加事件：鼠标移动到wrapper上，左右切换按钮显示
        wrapper.onmouseover = function(){
            clearInterval(timer);
            btns.style.display = 'block';
        }
        // 添加事件：鼠标移出wrapper，左右切换按钮隐藏
        wrapper.onmouseout = function(){
            timer = setInterval(autoRun, gap);
            btns.style.display = 'none';
        }



        // 点击上一张按钮 触发事件
        btns.children[0].onclick = function(){ 
            imgSub--;
            dotSub--;
            if(imgSub < 0){                               //滚动完第一项后
                imgs.style.left = -len*width + "px";  //改变left至克隆的第一项处
                imgSub = dotSub = len-1;
            }
            Roll(-imgSub*width);
          
            if(dotSub < 0){
                dotSub = len-1;
            }
            for(var i=0; i<len; i++){
                dotss[i].className = "quiet";
            }
            dotss[dotSub].className = "active";
        }
        // 点击下一张按钮 触发事件
        btns.children[1].onclick = autoRun;
    </script>
</body>
</html>
复制代码
```

#### 方法二：display属性显示隐藏轮播图1



![在这里插入图片描述](https://user-gold-cdn.xitu.io/2020/7/17/1735b5750db46a21?imageslim)



**全部代码：** JS部分有详细说明

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>display属性显示隐藏轮播图1</title>
    <style>
        *{
            padding: 0;
            margin: 0;
        }
        #wrapper{
            position: relative;
            margin: 50px auto;
            padding: 0;
            width: 500px;
            height: 300px;
        }
        #wrapper .content{
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        #wrapper>.content>.imgs{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            list-style: none;
        }
        #wrapper>.content>.imgs li{
            position:absolute;
            top:0;
            left:0;
            bottom:0;
            right:0;
            width: 100%;
            height: 100%;
        }
        #wrapper>.content>.imgs>li img{
            width: 100%;
            height: 100%;
        }
        #wrapper>.content>.dots{
            position: absolute;
            right: 10px;
            bottom: 10px;
            list-style: none;
        }
        #wrapper>.content>.dots li{
            float: left;
            width: 20px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            border-radius: 50%; 
            margin-left:10px ;
            cursor: pointer;
        }

        li.active{
            background-color: white;
        }
        li.quiet{
            background-color: #5a5a58;
        }

        .btns{
            display: none;
        }
        .btns span{
            position: absolute;
            width: 40px;
            height: 40px;
            top: 50%;
            margin-top: -20px;
            line-height: 40px;
            text-align: center;
            font-weight: bold;
            font-family: Simsun;
            font-size: 30px;
            border: 1px solid #fff;
            opacity: 0.5;
            cursor: pointer;
            color: #fff;
            background: black;
        }
        .btns .left{
            left: 5px;
        }
        .btns .right{
            left: 100%;
            margin-left: -45px;
        } 
    </style>
</head>
<body>
    <div id = "wrapper">
        <div class="content">
            <ul class="imgs">
                <li><img class="img" src="images/bg1.jpg"/></li>
                <li><img class="img" src="images/bg2.jpg"/></li>
                <li><img class="img" src="images/bg3.jpg"/></li>
                <li><img class="img" src="images/bg4.jpg"/></li>
                <li><img class="img" src="images/bg5.jpg"/></li>
            </ul>
            <ul class='dots'></ul>
        </div>
        <div class="btns">
            <span class="left">&lt;</span>
            <span class="right">&gt;</span>
        </div>
    </div>
    <script>
        // 滚动索引
        var index=0;
        var imgs = document.getElementsByClassName("img");
        var dots = document.getElementsByClassName("dots")[0];
        var btns = document.getElementsByClassName("btns")[0];
        var dotss = dots.children;
        
        var len = imgs.length;  //图片张数
        var timer = null; //定时器

        // 创建一个文档片段，此时还没有插入到 DOM 结构中
        const frag = document.createDocumentFragment()
        // 根据图片数量添加相应的小圆点到文档片段中
        for (let i=0; i<len; i++){
            const dot = document.createElement("li");
            dot.className = 'quiet';
            // 先插入文档片段中
            frag.appendChild(dot);
        }
        // 将小圆点片段统一插入到 DOM 结构中
        dots.appendChild(frag)
        // 第一个小圆点高亮显示
        dots.children[0].className = "active";

        //改变图片
        function ChangeImg() {
            index++;
            if(index>=len) index=0;

            // 循环将全部图片和圆点重置为默认样式
            for(var i=0; i<len; i++){
                imgs[i].style.display='none';
                dotss[i].className = "quiet";
            }

            // 将当前图片显示
            imgs[index].style.display='block';
            // 将当前圆点添加高亮样式
            dotss[index].className = "active";
        }

        // 循环添加小圆点的触发事件
        for(var i=0; i<len; i++){
            dotss[i].index = i;
            dotss[i].onmouseover = function(){
                for(var j=0; j<len; j++){
                    imgs[j].style.display='none';
                    dotss[j].className = "quiet";
                }
                this.className = "active";
                index = this.index;
                imgs[index].style.display='block';
            }
        }

        // 添加事件：鼠标移动到wrapper上，左右切换按钮显示
        wrapper.onmouseover = function(){
            clearInterval(timer);
            btns.style.display = 'block';
        }
        // 添加事件：鼠标移出wrapper，左右切换按钮隐藏
        wrapper.onmouseout = function(){
            timer = setInterval(ChangeImg,2000);
            btns.style.display = 'none';
        }


         // 点击上一张按钮 触发事件
        btns.children[0].onclick = function(){ 
            index--;
            //滚动完第一项后
            if(index< 0){                              
                index = len-1;
            }
 
            // 循环将全部图片和圆点重置为默认样式
            for(var i=0; i<len; i++){
                imgs[i].style.display='none';
                dotss[i].className = "quiet";
            }

            // 将当前图片显示
            imgs[index].style.display='block';
            // 将当前圆点添加高亮样式
            dotss[index].className = "active";

        }
        // 点击下一张按钮 触发事件
        btns.children[1].onclick = ChangeImg;

        //设置定时器，每隔两秒切换一张图片
        timer = setInterval(ChangeImg,2000);
    </script>
</body>
</html>
复制代码
```

#### 方法二：display属性显示隐藏轮播图2



![在这里插入图片描述](https://user-gold-cdn.xitu.io/2020/7/17/1735b5750dd538f7?imageslim)

**全部代码：** JS部分有详细说明



```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>display属性显示隐藏轮播图2</title>
    <style>
        *{
            padding: 0;
            margin: 0;
        }
        #wrapper{
            position: relative;
            margin: 50px auto;
            padding-right:100px;
            width: 500px;
            height: 300px;
        }
        #wrapper .content{
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        #wrapper>.content>.imgs{
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            padding:2px;
            border: 1px solid #ccc;
            background: #F0F0F0;
            border-radius: 5px;
            list-style: none;
        }
        #wrapper>.content>.imgs li{
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            border:1px solid #fff;
        }
        #wrapper>.content>.imgs>li img{
            width: 100%;
            height: 100%;
        }
        #wrapper>.dots{
            position: absolute;
            right:-5px;
            bottom:0px;
            top:0px;
            width:100px;
            list-style: none;
        }
        #wrapper>.dots li{
            box-sizing: border-box;
            width: 100px;
            height: 58px;
            padding:2px;
            border: 1px solid #ccc;
            background: #F0F0F0;
            margin-bottom:3px;
            border-radius:3px;
            cursor: pointer;
        }
        #wrapper>.dots li:last-child{
            margin-bottom:0;
        }
        #wrapper>.dots li .dot_img{
            box-sizing: border-box;
            width:100%;
            height:100%;
            border:1px solid #fff;
        }
        li.active{
            padding:1px !important;
            border: 1px solid #EDB5ED !important;
            background: #fff !important;
        }
        li.active .dot_img{
            border:3px solid #FFD1FF!important;
        }
        li.quiet{
            padding:2px;
            border: 1px solid #ccc;
            background: #F0F0F0;
        }
        li.quire .dot_img{
            border:1px solid #fff;
        }
    </style>
</head>
<body>
    <div id = "wrapper">
        <div class="content">
            <ul class="imgs">
                <li class="img"><img src="images/bg1.jpg"/></li>
                <li class="img"><img  src="images/bg2.jpg"/></li>
                <li class="img"><img  src="images/bg3.jpg"/></li>
                <li class="img"><img  src="images/bg4.jpg"/></li>
                <li class="img"><img src="images/bg5.jpg"/></li>
            </ul>
        </div>
        <ul class='dots'>
            <li><img class="dot_img" src="images/bg1.jpg"/></li>
            <li><img class="dot_img" src="images/bg2.jpg"/></li>
            <li><img class="dot_img" src="images/bg3.jpg"/></li>
            <li><img class="dot_img" src="images/bg4.jpg"/></li>
            <li><img class="dot_img" src="images/bg5.jpg"/></li>
        </ul>
    </div>
    <script>
        // 滚动索引
        var index=0;
        var imgs = document.getElementsByClassName("img");
        var dots = document.getElementsByClassName("dots")[0];
        var dotss = dots.children;
        
        var len = imgs.length;  //图片张数
        var timer = null; //定时器

        dotss[0].className="active";

        //改变图片
        function ChangeImg() {
            index++;
            if(index>=len) index=0;

            // 循环将全部图片和圆点重置为默认样式
            for(var i=0; i<len; i++){
                imgs[i].style.display='none';
                dotss[i].className = "quiet";
            }

            // 将当前图片显示
            imgs[index].style.display='block';
            // 将当前圆点添加高亮样式
            dotss[index].className = "active";
        }

        // 循环添加小圆点的触发事件
        for(var i=0; i<len; i++){
            dotss[i].index = i;
            dotss[i].onmouseover = function(){
                for(var j=0; j<len; j++){
                    imgs[j].style.display='none';
                    dotss[j].className = "quiet";
                }
                this.className = "active";
                index = this.index;
                imgs[index].style.display='block';
            }
        }

        // 添加事件：鼠标移动到wrapper上，暂停切换图片
        wrapper.onmouseover = function(){
            clearInterval(timer);
        }
        // 添加事件：鼠标移出wrapper，开始切换图片
        wrapper.onmouseout = function(){
            timer = setInterval(ChangeImg,2000);
        }

        //设置定时器，每隔两秒切换一张图片
        timer = setInterval(ChangeImg,2000);
    </script>
</body>
</html>
复制代码
```

#### 方法三：旋转木马轮播图1



![在这里插入图片描述](https://user-gold-cdn.xitu.io/2020/7/17/1735b5750f5e1ed9?imageslim)

**全部代码：** JS部分有详细说明



```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>旋转木马轮播图1</title>
    <style>
        *{
            margin: 0;
            padding: 0;
            border:none;
            list-style: none;
        }
        img{
            vertical-align: top;
        }
        #wrapper{
            position: relative;
            width: 900px;
            height: 300px;
            margin: 20px auto;
        }
        #wrapper>.content{
            width:100%;
            height:100%;
        }

        #wrapper li{
            position: absolute;
            left: 200px;
            top:0;
        }

        #wrapper li img{
            width: 100%;
            height: 100%;
        }
        .btns{
            display: none;
        }
        .btns span{
            position: absolute;
            width: 40px;
            height: 40px;
            top: 50%;
            margin-top: -20px;
            line-height: 40px;
            text-align: center;
            font-weight: bold;
            font-family: Simsun;
            font-size: 30px;
            border: 1px solid #fff;
            opacity: 0.6;
            cursor: pointer;
            color: #fff;
            background: black;
            z-index: 99;
        }
        .btns .prev{
            left: 5px;
        }
        .btns .next{
            left: 100%;
            margin-left: -45px;
        } 
    </style>
</head>
<body>
    <div id="wrapper">
        <div class="content">
            <ul class="imgs">
                <li><img src="images/bg1.jpg" alt=""></li>
                <li><img src="images/bg2.jpg" alt=""></li>
                <li><img src="images/bg3.jpg" alt=""></li>
                <li><img src="images/bg4.jpg" alt=""></li>
                <li><img src="images/bg5.jpg" alt=""></li>
            </ul>
        </div>
        <div class="btns">
            <span class="prev">&lt;</span>
            <span class="next">&gt;</span>
        </div>
    </div>
<script>
  
        //获取需要的标签
        var wrapper = document.getElementById("wrapper");
        var content = document.getElementsByClassName("content")[0];
        var imgs = document.getElementsByClassName("imgs")[0].children;
        var btns = document.getElementsByClassName("btns")[0];

        var timer = null; //初始化一个定时器

        // 图片位置信息的数组
        var json = [
            {   //  1
                width:200,
                top:20,
                left:130,
                opacity:0.2,
                zIndex:2
            },
            {  // 2
                width:300,
                top:70,
                left:0,
                opacity:0.8,
                zIndex:3
            },
            {   // 3
                width:400,
                top:100,
                left:250,
                opacity:1,
                zIndex:4
            },
            {  // 4
                width:300,
                top:70,
                left:600,
                opacity:0.8,
                zIndex:3
            },
            {   //5
                width:200,
                top:20,
                left:570,
                opacity:0.2,
                zIndex:2
            }
        ];
        // 循环初始化图片位置
        for(var i=0; i<json.length; i++){
            buffer(imgs[i], json[i]);
        }

        // 图片自动滚动函数
        function autoRun() {
            json.push(json.shift()); // 将数组第一个元素加到最后去
            // 图片重新布局
            for(var i=0; i<json.length; i++){
                buffer(imgs[i], json[i]);
            }
        }
        
        // 创建定时器，开始自动滚动
        timer = setInterval(autoRun, 2000);

        // 添加事件：鼠标移动到wrapper上，左右切换按钮显示，图片停止滚动
        wrapper.onmouseover = function () {
            clearInterval(timer);
            btns.style.display='block';
        };
        // 添加事件：鼠标移出wrapper，左右切换按钮隐藏，图片开始滚动
        wrapper.onmouseout = function () {
            timer = setInterval(autoRun, 2000);
            btns.style.display='none';
        };

        // 左右按钮点击事件
        btns.children[0].onclick = autoRun;
        btns.children[1].onclick = function() {
            json.unshift(json.pop()); // 将数组第一个元素加到前面
            // 重新布局
            for(var i=0; i<json.length; i++){
                buffer(imgs[i], json[i]);
            }
        }
        

        //获取css的样式值     
        function getCSSAttrValue(obj, attr) {
            if(obj.currentStyle){ // IE 和 opera
                return obj.currentStyle[attr];
            }else {
                return window.getComputedStyle(obj, null)[attr];
            }
        }

        /**
         * 缓动动画
         * @param obj
         * @param json
         * @param fn
         */
        function buffer(obj, json, fn) {
            // 1.1 清除定时器
            clearInterval(obj.timer);

            // 1.2 设置定时器
            var begin = 0, target = 0, speed = 0;
            obj.timer = setInterval(function () {
                var flag = true;
                for(var k in json){
                    // 1.3 获取初始值
                    if("opacity" === k){ // 透明度
                        begin =  parseInt( parseFloat(getCSSAttrValue(obj, k)) * 100);
                        target = parseInt(parseFloat(json[k]) * 100);
                    }else if("scrollTop" === k){
                        begin = Math.ceil(obj.scrollTop);
                        target = parseInt(json[k]);
                    }else { // 其他情况
                        begin = parseInt(getCSSAttrValue(obj, k)) || 0;
                        target = parseInt(json[k]);
                    }

                    // 1.4 求出步长
                    speed = (target - begin) * 0.2;

                    // 1.5 判断是否向上取整
                    speed = (target > begin) ? Math.ceil(speed) : Math.floor(speed);

                    // 1.6 动起来
                    if("opacity" === k){ // 透明度
                        // w3c的浏览器
                        obj.style.opacity = (begin + speed) / 100;
                        // ie 浏览器
                        obj.style.filter = 'alpha(opacity:' + (begin + speed) +')';
                    }else if("scrollTop" === k){
                        obj.scrollTop = begin + speed;
                    }else if("zIndex" === k){
                        obj.style[k] = json[k];
                    }else {
                        obj.style[k] = begin + speed + "px";
                    }

                    // 1.5 判断
                    if(begin !== target){
                        flag = false;
                    }
                }

                // 1.3 清除定时器
                if(flag){
                    clearInterval(obj.timer);
                    // 判断有没有回调函数
                    if(fn){
                        fn();
                    }
                }
            }, 20);
        }
    
</script>
</body>
</html>
```