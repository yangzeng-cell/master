# Day01 作业布置

## 一. 完成上课所有的代码练习

01-Vue的引入方式-CDN

```html
    <div id="app"></div>
    <script src="https://unpkg.com/vue@next"></script>
    <script>
      // 1.创建app
      const app = Vue.createApp({
        template: `<h2>hello world</h2><p>我是段落</p>`,
      });
      //2.挂载app
      app.mount("#app");
    </script>
```

02-Vue引入方式-本地

```html
<body>
    <div id="app"></div>
    <script src="../lib/vue.js"></script>
    <script>
      //1.创建app
      const app = Vue.createApp({
        template: `<h2>hello world</h2>`,
      });
      //2.挂载app
      app.mount("#app");
    </script>
</body>
```

03-Vue-动态数据

```html
<body>
    <div id="app">
      <h2>{{ message }}</h2>
      <p>{{ info }}</p>
    </div>
    <script src="../lib/vue.js"></script>
    <script>
      const app = Vue.createApp({
        data() {
          return {
            message: "hello world",
            info: "我是段落",
          };
        },
      });
      //挂载app
      app.mount("#app");
    </script>
  </body>
```

04-Vue体验-列表数据

```html
<body>
    <div id="app">
      <h2>{{message}}</h2>
      <ul>
        <li v-for="item in books">{{ item }}</li>
      </ul>
    </div>
    <script src="../lib/vue.js"></script>
    <script>
      const app = Vue.createApp({
        data() {
          return {
            message: "欢迎来我的书吧",
            books: ["三国演义", "西游记", "红楼梦", "小王子", "重返狼群"],
          };
        },
      });
      // 挂载app
      app.mount("#app");
    </script>
  </body>
```

05-计数器功能

```html
<body>
    <div id="app">
      <h2>当前计数:{{counter}}</h2>
      <button @click="increment">+1</button>
      <button @click="decrement">-1</button>
    </div>
    <script src="../lib/vue.js"></script>
    <script>
      const app = Vue.createApp({
        data() {
          return {
            counter: 0,
          };
        },
        methods: {
          increment() {
            this.counter++;
          },
          decrement() {
            this.counter--;
          },
        },
      });
      //2.挂载
      app.mount("#app");
    </script>
  </body>
```

06-原生实现计数器

```html
<body>
    <h2 class="title">当前计数:<span class="count"></span></h2>
    <button class="increment">+1</button>
    <button class="decrement">-1</button>
    <script>
      const incrementEl = document.querySelector(".increment");
      const decrementEl = document.querySelector(".decrement");
      const countEl = document.querySelector(".count");
      var counter = 0;
      countEl.textContent = counter;
      incrementEl.onclick = function () {
        counter++;
        countEl.textContent = counter;
      };
      decrementEl.onclick = function () {
        counter--;
        countEl.textContent = counter;
      };
    </script>
  </body>
```

07-data属性

```html
<body>
    <div id="app">
      <h2>{{message}}</h2>
      <button @click="changeMessage">改变message</button>
    </div>
    <script src="../lib/vue.js"></script>
    <script>
      const app = Vue.createApp({
        data() {
          return {
            message: "hello world",
          };
        },
        methods: {
          changeMessage() {
            this.message = "每一天都开开心心";
          },
        },
      });
      app.mount("#app");
    </script>
  </body>
```

08-methods

```html 
<body>
    <div id="app">
      <h2>当前计数:{{counter}}</h2>
      <button @click="increment">+1</button>
      <button @click="decrement">-1</button>
    </div>
    <script src="../lib/vue.js"></script>
    <script>
      const app = Vue.createApp({
        data() {
          return {
            counter: 0,
          };
        },
        methods: {
          increment() {
            this.counter++;
          },
          decrement() {
            console.log(this);
            this.counter--;
          },
          // decrement: () => {
          //   // window,所以不能用箭头函数
          //   console.log("箭头函数里的this", this);
          // },
        },
      });
      //2.挂载
      app.mount("#app");
    </script>
  </body>
```

09-代码片段-已在vscode中设置

10-mustache插值

```html
<body>
    <div id="app">
      <!-- mastache基本使用 -->
      <h2>{{ message }}</h2>
      <!-- 表达式 -->
      <h3>{{ num1 * 10 }}</h3>
      <!-- 调用methods中的函数 -->
      <h3>{{getSum(num1, num2)}}</h3>
      <!-- 三元表达式 -->
      <h3>{{ age > 18? "成年人":"未成年人" }}</h3>
      <!-- 错误写法 -->
      <!-- 这是个赋值语句,不是表达式 -->
      <h2>{{var name = "黎明"}}</h2>
      <!-- 错误,控制流的if也不支持 -->
      <h2>{{if(true) {return message} }}</h2>
    </div>

    <script src="../lib/vue.js"></script>
    <script>
      // 1.创建app
      const app = Vue.createApp({
        // data: option api
        data: function () {
          return {
            message: "hello",
            num1: 10,
            num2: 20,
            info: "I believe there is a person who brings sunshine into your life",
            age: 29,
          };
        },
        //methods: option api
        methods: {
          getSum(num1, num2) {
            return num1 + num2;
          },
        },
      });

      // 2.挂载app
      app.mount("#app");
    </script>
  </body>
```

11-v-once

```html 
<body>
    <div id="app">
      <!-- v-once用于指定元素或者组件以及他们的子元素都只渲染一次 -->
      <h2 v-once>{{ message }} <span>{{counter}}</span></h2>
      <p>{{ info }}</p>
      <button @click="changeMess">改变message</button>
    </div>

    <script src="../lib/vue.js"></script>
    <script>
      // 1.创建app
      const app = Vue.createApp({
        // data: option api
        data: function () {
          return {
            message: "hello",
            counter: 10,
            info: "粒粒皆辛苦",
          };
        },
        //methods: option api
        methods: {
          changeMess() {
            this.message = "v-once只渲染一次";
            this.counter = 40;
            this.info = "李白";
            // v-once只渲染一次 40
            console.log(this.message, this.counter);
          },
        },
      });

      // 2.挂载app
      app.mount("#app");
    </script>
  </body>
```

12-v-text

```html
<body>
    <div id="app">
      <!-- v-text 会覆盖,相当于textContent-->
      <h2 v-text="message">111</h2>
      <h2>{{ message }}111</h2>
    </div>

    <script src="../lib/vue.js"></script>
    <script>
      // 1.创建app
      const app = Vue.createApp({
        // data: option api
        data: function () {
          return {
            message: "helloworld",
          };
        },
        //methods: option api
        methods: {},
      });

      // 2.挂载app
      app.mount("#app");
    </script>
  </body>
```

13-v-html

```html
<body>
    <div id="app">
      <p v-html="info">我是段落</p>
    </div>

    <script src="../lib/vue.js"></script>
    <script>
      // 1.创建app
      const app = Vue.createApp({
        // data: option api
        data: function () {
          return {
            info: `<span style="color: green; font-size: 20px">我是span</span>`,
          };
        },
        //methods: option api
        methods: {},
      });

      // 2.挂载app
      app.mount("#app");
    </script>
  </body>
```

14-v-pre

```html 
<body>
    <div id="app">
      <!-- v-pre不在解析元素和它的所有子元素,显示原始的mustache标签 -->
      <div v-pre>
        <h2>{{title}}</h2>
        <span>{{content}}</span>
      </div>
    </div>

    <script src="../lib/vue.js"></script>
    <script>
      // 1.创建app
      const app = Vue.createApp({
        // data: option api
        data: function () {
          return {
            title: "我是标题",
            content: "我是span",
          };
        },
        //methods: option api
        methods: {},
      });

      // 2.挂载app
      app.mount("#app");
    </script>
  </body>
```

15-c-cloak

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      [v-cloak] {
        display: none;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <h2 v-cloak>{{message}}</h2>
    </div>

    <script src="../lib/vue.js"></script>
    <script>
      setTimeout(() => {
        // 1.创建app
        const app = Vue.createApp({
          // data: option api
          data: function () {
            return {
              message: "hello",
            };
          },
          //methods: option api
          methods: {},
        });

        // 2.挂载app
        app.mount("#app");
      }, 4000);
    </script>
  </body>
</html>

```

16-v-memo

```html
<body>
    <div id="app">
      <div v-memo="[name]">
        <h2>姓名:{{ name }}</h2>
        <h2>年龄:{{ age }}</h2>
        <h2>身高:{{ address }}</h2>
      </div>
      <button @click="updateInfo">修改信息</button>
    </div>

    <script src="../lib/vue.js"></script>
    <script>
      // 1.创建app
      const app = Vue.createApp({
        // data: option api
        data: function () {
          return {
            name: "张三",
            age: 90,
            address: "浙江",
          };
        },
        //methods: option api
        methods: {
          updateInfo() {
            this.age = 22;
          },
        },
      });

      // 2.挂载app
      app.mount("#app");
    </script>
  </body>
```

17-v-bind绑定基本属性

```html
<body>
    <div id="app">
      <img :src="showImgUrl" alt="" />
      <a :href="href">百度一下</a>
      <button @click="changeImg">切换图片</button>
    </div>

    <script src="../lib/vue.js"></script>
    <script>
      // 1.创建app
      const app = Vue.createApp({
        // data: option api
        data: function () {
          return {
            imgUrl1:
              "https://p1.music.126.net/ZPd-8Z83T12ykVA2aVuGXQ==/109951165081192530.jpg?param=140y140",
            imgUrl2:
              "https://p1.music.126.net/vXGo4pj_cVSz7gAClorJ-g==/109951162815522463.jpg?param=140y140",
            showImgUrl:
              "https://p1.music.126.net/ZPd-8Z83T12ykVA2aVuGXQ==/109951165081192530.jpg?param=140y140",
            href: "https://www.baidu.com/",
          };
        },
        //methods: option api
        methods: {
          // 切换图片
          changeImg() {
            this.showImgUrl =
              this.showImgUrl === this.imgUrl1 ? this.imgUrl2 : this.imgUrl1;
          },
        },
      });

      // 2.挂载app
      app.mount("#app");
    </script>
  </body>
```

18绑定class属性

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .active {
        color: green;
      }
      .title {
        background-color: pink;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <h2 :class="h2Class">我是标题啊</h2>

      <!-- 用三元表达式 -->
      <h3 :class="isActive?'active':''">测试active</h3>
      <!--对象语法:key(添加的class):value(布尔值)-->
      <!-- 如果isActive为true,添加active,否则不添加 -->
      <h3 :class="{ active: isActive }">测试active--用对象语法</h3>
      <!-- 对象语法的多个键值对 -->
      <h3 :class="{ active: isActive,title:true,two:false }">
        测试active--用对象语法的多个键值对
      </h3>
      <!-- 动态绑定的class是可以和普通的class同时使用,会结合 -->
      <h3 :class="{ active: isActive,title:true,two:false }" class="one">
        测试active--用对象语法的多个键值对
      </h3>
      <!-- 和函数结合 -->
      <h3 :class="getDynamicClasses()">测试active--函数结合</h3>
      <button @click="changeActive">按钮</button>
      <!-- 动态class可以写数组语法 -->
      <h2 :class="['one','two']">动态class可以写数组语法</h2>
      <!-- 数组中可以绑定变量 -->
      <h2 :class="['one',className]">动态class可以写数组语法</h2>
      <!-- 数组中可以使用三元运算符 -->
      <h2 :class="['one',isActive? 'active':'']">动态class可以写数组语法</h2>
      <!-- 数组中可以使用对象语法 -->
      <h2 :class="[className, { active: isActive}]">动态class可以写数组语法</h2>
    </div>

    <script src="../lib/vue.js"></script>
    <script>
      // 1.创建app
      const app = Vue.createApp({
        // data: option api
        data: function () {
          return {
            h2Class: "one two three",
            isActive: false,
            className: "title",
          };
        },
        //methods: option api
        methods: {
          changeActive() {
            this.isActive = !this.isActive;
          },
          getDynamicClasses() {
            return { active: this.isActive, title: true, two: false };
          },
        },
      });

      // 2.挂载app
      app.mount("#app");
    </script>
  </body>
</html>

```

19v-bind绑定style属性

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <h2 style="color: gray; font-size: 20px">标题一</h2>
      <!-- 2.style中的某些值, 来自data中 -->
      <!-- 2.1传入一个对象,并且对象内容是确定的 -->
      <h2 :style="{color: 'red','font-size': '30px'}">标题二</h2>
      <h2 :style="{color: 'green',fontSize: '30px'}">标题三</h2>
      <!-- 2.2 传入一个对象,值来自于data -->
      <h2 :style="{color: colorStyle,fontSize: fontStyle + 'px'}">标题四</h2>
      <!-- 2.3.动态的绑定属性, 这个属性是一个对象 -->
      <h2 :style="objStyle">标题五</h2>
      <!-- 3.style的数组语法 -->
      <h2 :style="[objStyle, {color: 'red'}]">标题六</h2>
    </div>

    <script src="../lib/vue.js"></script>
    <script>
      // 1.创建app
      const app = Vue.createApp({
        // data: option api
        data: function () {
          return {
            colorStyle: "pink",
            fontStyle: 40,
            objStyle: {
              backgroundColor: "blue",
              "font-size": "30px",
            },
          };
        },
        //methods: option api
        methods: {},
      });

      // 2.挂载app
      app.mount("#app");
    </script>
  </body>
</html>

```

20-v-bind绑定属性名

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .one {
        background-color: pink;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <!-- 动态绑定属性:属性名称不是固定的, -->
      <h2 :[name]="'one'">红红火火恍恍惚惚或或或</h2>
    </div>

    <script src="../lib/vue.js"></script>
    <script>
      // 1.创建app
      const app = Vue.createApp({
        // data: option api
        data: function () {
          return {
            name: "class",
          };
        },
        //methods: option api
        methods: {},
      });

      // 2.挂载app
      app.mount("#app");
    </script>
  </body>
</html>

```

21-bind直接绑定对象

```html
 <body>
    <div id="app">
      <h2 :name="name" :age="age" :address="address">
        放弃一个人这项工程有点难，多给点时间，别嫌烦。少年啊，爱一个人，那门是窄的，那路是长的。生活鸡毛狗血，爱情深拂憧憬，你无法回避一些残酷，正如你无法轻取想要的幸福
      </h2>
      <!-- 将对象的所有属性都绑定到元素上的所有属性 -->
      <h2 v-bind="info">你没事吧</h2>
    </div>

    <script src="../lib/vue.js"></script>
    <script>
      // 1.创建app
      const app = Vue.createApp({
        // data: option api
        data: function () {
          return {
            name: "张三",
            age: 22,
            address: "北京",
            info: {
              name: "张三1",
              age: 77,
              address: "浙江",
            },
          };
        },
        //methods: option api
        methods: {},
      });

      // 2.挂载app
      app.mount("#app");
    </script>
  </body>
```



## 二. 自己编写几个Vue小案例尝试Vue语法

模仿腾讯课堂

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body,
      p,
      h3,
      h5,
      h4 {
        margin: 0;
        padding: 0;
      }

      body {
        background-color: #f5f5f5;
        font: 12px/1.5 Helvetica Neue, Helvetica, Arial, Microsoft Yahei,
          Hiragino Sans GB, Heiti SC, WenQuanYi Micro Hei, sans-serif;
      }

      h4 {
        font-weight: 400;
      }

      /* a的重置 */
      a {
        text-decoration: none;
        color: #333;
        outline: none;
      }

      .item {
        box-sizing: border-box;
        width: 236px;
        height: 243px;
        padding: 7px 7px 8px 7px;
        margin: 100px auto;
        background-color: #fff;
        border: 1px solid transparent;
      }
      .item .img-link {
        display: block;
        width: 100%;
        margin-bottom: 8px;
      }
      .item .img-link img {
        width: 220px;
        height: 124px;
        vertical-align: middle;
      }
      .item .title {
        height: 40px;
        margin-bottom: 6px;
        font-size: 14px;
      }
      .item .info {
        height: 18px;
        /* line-height: 18px; */
        color: #999;
        margin-bottom: 3px;
      }
      .item .task {
        margin-right: 5px;
      }
      .item .teacher::before {
        content: "";
        display: inline-block;
        width: 1px;
        height: 12px;
        margin-right: 10px;
        background-color: #999;
        vertical-align: -1px;
      }
      .item .teacher {
        color: #999;
      }
      .item .desc {
        height: 24px;
        line-height: 24px;
        font-size: 14px;
        color: #999;
      }
      .item .desc .price {
        color: #999;
        margin-right: 10px;
        cursor: pointer;
      }
      .item:hover {
        border-color: #ddd;
        box-shadow: 1px 1px 2px 1px #ececec;
      }
      .item .desc .active {
        color: #f4621f;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <div class="item">
        <a :href="href" target="_blank" class="img-link"
          ><img :src="imgUrl" alt=""
        /></a>
        <h4 class="title">
          <a :href="href" target="_blank">{{courceName}}</a>
        </h4>
        <div class="info">
          <span class="task">共{{courceCount}}节</span>
          <a :href="href" class="teacher">{{teacher}}</a>
        </div>
        <div class="desc">
          <span class="price" :class="{active: isActive}" @click="changeActive"
            >¥{{price}}</span
          >
          <span class="user">{{peopleCount}}人最近报名</span>
        </div>
      </div>
    </div>

    <script src="../lib/vue.js"></script>
    <script>
      // 1.创建app
      const app = Vue.createApp({
        // data: option api
        data: function () {
          return {
            href: "https://ke.qq.com/course/3118036?taid=10705330542449620",
            courceName: "新概念英语第一册精讲公开体验课",
            teacher: "英语金老师",
            price: "1000",
            peopleCount: 1189,
            courceCount: 30,
            imgUrl:           "https://10.idqqimg.com/qqcourse_logo_ng/ajNVdqHZLLCE6qtSOvsmjFTcXL4rGn8LsMibXwUMUDmhfBDvBjskKia5l0XdIPmOuUqMXLPUibBXYM/356",
            isActive: false,
          };
        },
        //methods: option api
        methods: {
          changeActive() {
            this.isActive = !this.isActive;
          },
        },
      });
      // 2.挂载app
      app.mount("#app");
    </script>
  </body>
</html>

```





## 三. 说说声明式编程和命令式编程的区别

* 声明式编程

  * 声明式编程关注的是 “what to do”，由框架(机器)完成 “how”的过程

  * 我们会在createApp传入的对象中声明需要的内容，模板template、数据data、方法methods;这样的编写代码的过程，我们称之为是**声明式编程**

  * 目前Vue、React、Angular、小程序的编程模式，我们称之为**声明式编程**

    ```
    用vue实现计数器就是声明式编程
    ```

    

* 命令式编程

  * 命令式编程关注的是 “how to do”自己完成整个how的过程

  * 我们每完成一个操作，都需要通过JavaScript编写一条代码，来给浏览器一个指令; 这样的编写代码的过程，我们称之为**命令式编程**

  * 在早期的原生JavaScript和jQuery开发的过程中，我们都是通过这种命令式的方式在编写代码的

    ```
    原生实现计数器就是命令式编程
    ```

## 四. 说说什么是Options API？

* options api的data详解

  * data必须是一个函数, 函数会返回一个对象( 在Vue3.x的时候)
  * data返回的对象, 会被Vue进行劫持(放到响应式系统中), 所以data的数据发生改变时, 界面会重新渲染

* options api的methods详解

  * methods属性是一个对象 -> 定义很多方法--->这些方法可以绑定到模板上

  * 在该方法中，我们可以使用**this关键字**来直接访问到**data中返回的对象的属性**

  * 里面函数不能是箭头函数:

    * 如果是箭头函数,因为箭头函数不绑定this,所以它会在上层作用域中查找this, 查找到this-->window

      

      





## 五. 总结今天的Vue语法内容

### 2.2. mustache语法(插值语法)

* 把**数据显示到模板（template）**中，使用最多的语法是 “Mustache”语法 **(双大括号) **的文本插值

* 当data中的数据发生改变时，对应的内容也会发生更新

* Mustache中不仅仅可以是**data中的属性**，也可以是一个**JavaScript的表达式**,也可以**调用methods中的函数**,也可以是**三元运算符**

* 如下是错误写法

  ```html
         <!-- 错误写法 -->
        <!-- 这是个赋值语句,不是表达式 -->
        <h2>{{var name = "黎明"}}</h2>
        <!-- 错误,控制流的if也不支持 -->
        <h2>{{if(true) {return message} }}</h2>
  ```

  



### 2.3. 不算常用的指令

* v-once   **用于指定元素或者组件只渲染一次**,用于性能优化

  ```
  当数据发生变化时，元素或者组件以及其所有的子元素将视为静态内容并且跳过(只渲染一次)
  ```

* v-text     用于更新元素的 textContent

* v-html    如果我们展示的内容本身是html,那可以通过v-html解析

* v-pre     用于跳过元素和它的子元素的编译过程，显示原始的**Mustache**标签

* v-cloak   

```
和 CSS 规则如 [v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到组件实例准备完毕
```



### 2.4. 新的指令 v-memo

* v-memo是 Vue 3.2 新增的一个指令。它接受一个依赖数组，并且只有在数组中的一个值发生变化时才会重新渲染
* 如果传入一个空的依赖项数组，它将与使用 `v-once` 相同，它永远不会重新渲染
* **注意**，`v-memo` 在 `v-for` 循环中不起作用，所以如果我们想用 `v-for` 记忆一些东西，我们必须把它们放在同一个元素上



### 2.5. v-bind绑定属性

#### 2.5.1. v-bind绑定基本属性

* src
* href

```
v-bind用于绑定一个或多个属性值，或者向另一个组件传递props值
v-bind有一个对应的语法糖，也就是简写方式:
```

举例:v-bind绑定src和href,同时点击按钮,可以切换图片

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <img :src="showImgUrl" alt="" />
      <a :href="href">百度一下</a>
      <button @click="changeImg">切换图片</button>
    </div>

    <script src="../lib/vue.js"></script>
    <script>
      // 1.创建app
      const app = Vue.createApp({
        // data: option api
        data: function () {
          return {
            imgUrl1:
              "https://p1.music.126.net/ZPd-8Z83T12ykVA2aVuGXQ==/109951165081192530.jpg?param=140y140",
            imgUrl2:
              "https://p1.music.126.net/vXGo4pj_cVSz7gAClorJ-g==/109951162815522463.jpg?param=140y140",
            showImgUrl:
              "https://p1.music.126.net/ZPd-8Z83T12ykVA2aVuGXQ==/109951165081192530.jpg?param=140y140",
            href: "https://www.baidu.com/",
          };
        },
        //methods: option api
        methods: {
          // 切换图片
          changeImg() {
            this.showImgUrl =
              this.showImgUrl === this.imgUrl1 ? this.imgUrl2 : this.imgUrl1;
          },
        },
      });

      // 2.挂载app
      app.mount("#app");
    </script>
  </body>
</html>

```



#### 2.5.2. v-bind绑定class

* 基本绑定
* 对象语法:  我们可以传给 :class (v-bind:class 的简写) 一个对象，以动态地切换 class
  * { className: Boolean }
* 数组语法:  我们可以把一个数组传给 :class，以应用一个 class 列表



举例--对象语法

```html

      <!-- 用三元表达式 -->
      <h3 :class="isActive?'active':''">测试active</h3>
      
      <!--对象语法:key(添加的class):value(布尔值)-->
      <!-- 如果isActive为true,添加active,否则不添加 -->
      <h3 :class="{ active: isActive }">测试active--用对象语法</h3>
      
      <!-- 对象语法的多个键值对 -->
      <h3 :class="{ active: isActive,title:true,two:false }">
        测试active--用对象语法的多个键值对
      </h3>
      
      <!-- 动态绑定的class是可以和普通的class同时使用,会结合 -->
      <h3 :class="{ active: isActive,title:true,two:false }" class="one">
        测试active--用对象语法的多个键值对
      </h3>
      
      <!-- 和函数结合 -->
      <h3 :class="getDynamicClasses()">测试active--函数结合</h3>
      <button @click="changeActive">按钮</button>
```



举例-数组语法

```html
      <!-- 动态class可以写数组语法 -->
      <h2 :class="['one','two']">动态class可以写数组语法</h2>
      <!-- 数组中可以绑定变量 -->
      <h2 :class="['one',className]">动态class可以写数组语法</h2>
      <!-- 数组中可以使用三元运算符 -->
      <h2 :class="['one',isActive? 'active' : '']">动态class可以写数组语法</h2>
      <!-- 数组中可以使用对象语法 -->
      <h2 :class="[className, { active: isActive}]">动态class可以写数组语法</h2>
```



#### 2.5.3. v-bind绑定style

```
利用v-bind:style来绑定一些CSS内联样式
CSS property 名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名
```

* 对象语法:
  * { cssname: cssvalue }
* 数组语法:
  * [obj1, obj2]



举例-对象语法

```html
      <h2 style="color: gray; font-size: 20px">标题一</h2>
      
      <!-- 2.style中的某些值, 来自data中 -->
      <!-- 2.1传入一个对象,并且对象内容是确定的 -->
      <h2 :style="{color: 'red','font-size': '30px'}">标题二</h2>
      <h2 :style="{color: 'green',fontSize: '30px'}">标题三</h2>
      
      <!-- 2.2 传入一个对象,值来自于data -->
      <h2 :style="{color: colorStyle,fontSize: fontStyle + 'px'}">标题四</h2>
      
      <!-- 2.3.动态的绑定属性, 这个属性是一个对象 -->
      <h2 :style="objStyle">标题五</h2>
```

注意:  1)短横线分隔的属性名用引号或者驼峰式 ,比如font-size

举例-数组语法

* :style 的数组语法可以将多个样式对象应用到同一个元素上

  ```html 
  <!-- 3.style的数组语法 -->
  <h2 :style="[objStyle, {color: 'red'}]">标题六</h2>
  ```

  

### 2.6. 动态绑定属性名

* 如果属性名称不是固定的，我们可以使用 :[属性名]=“值” 的格式来定义；

* 这种绑定的方式，我们称之为动态绑定属性

```html
:[name]=""
```

```html
 <!-- 动态绑定属性:属性名称不是固定的, -->
<h2 :[name]="'one'">红红火火恍恍惚惚或或或</h2>
```



### 2.7. v-bind绑定对象

* 将对象中所有key/value, 作为属性绑定到元素(组件)上



```html 
 <!-- 将对象的所有属性都绑定到元素上的所有属性 -->
<h2 v-bind="info">你没事吧</h2>
```





































