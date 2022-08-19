---

title: vue3笔记

date: 2022-08-16 01:18:36

categories:

- [vue, note]

---



1.vue手脚架代价脚本  两种方式

```
vue create  项目名  构建工具是webpack
npm init vue@latest  
	1.安装一个本地工具：create-vue  
	2.使用create-vue创建一个vue项目  构建工具是vite
```

2.$attrs

3.emits

vue3中增加了$emit事件的声明

4.reactive只能传入一个对象，定义复杂类型的数据，事实上编写的data函数在内部也是调用reactive来完成响应式的

5.ref函数，用于定义简单类型的数据，也可以定义复杂类型的数据。ref会进行自动解包，ref的解包是浅层解包

但是在深层次引用的时候，使用的时候是直接使用，在设置的时候需要用.value

6.ref和reactive的使用场景

​		reactive可以应用于本地的数据，多个数据之间是有联系的，是聚合数据

​		其他场景可以运用ref,定义网络请求中的数据也是用ref

7. ## `readonly`

​	不要违反单项数据流，把响应式的reactive或者ref传递给子组件，子组件可以修改数据，为了不要让子组件修改数据，可以将传入的响应式变成readonly

```
const obj1=readonly(obj)//可以将这个obj1传递过去
```

readonly会返回原始对象的只读代理，本质上是劫持proxy的set方法，不能进行设置新的值

8.isProxy 判断是否是由reactive或者readonly创建的proxy

9.isReactive 检查对象是否是由reactive创建的响应式代理，如果该代理是由readonly创建的，但是包裹reactive,也是true

10.isReadonly  是否是readonly

11.toRow 返回reactive或者readonly代理的原始对象

12.shallowReactive  创建一个响应式代理，跟踪本身的property,但是不会执行嵌套对象的深层响应式代理

13.shallowReadonly 只读的浅层

14.toRefs  将响应式对象转换成普通对象，里面的property转成ref,可以进行解构成ref响应式

```
const {a}=toRefs(reactive({a:"zjag"})  //可以用于reactive的解构
```

reactive默认情况下解构的值没有响应式

15.setup的生命周期

16.Provide函数

17.路由钩子函数

18.beforeEach 全局的前置守卫beforeEach是会在导航触发的时候被调用，他又两个参数to,from,又返回值，返回false则会取消当前导航，不返回或者返回undefined则使用默认导航，返回一个路由地址，可以是字符串，也可以是object，包括路由信息

19.什么是MVVM，和MVC的区别

20.data必须是一个函数，并且返回一个对象，在vue2中，也可以传入一个对象，在vue3中必须使用函数

21.箭头函数不能定义method中的函数，因为箭头函数中·没有this,箭头函数的this是由上层作用域的this来决定的，所以不会指定到当前组件实例

22.在源码中this的指向

23.v-once 表示当前元素或者组件只会更新一次，就是初始化以后就不会再次渲染，包含的子组件也是渲染也是渲染一次，在特定多的场合使用可以提高性能

24.v-text

```
 <h1>{{count}}</h1>
 <h1 v-text="count"></h1>  //二者是等价的
```

25.v-html  可以将字符串转换成html

默认情况下，如果我们展示的内容本身是html 的，那么vue并不会对其进行特殊的解析。

如果我们希望这个内容被Vue可以解析出来，那么可以使用 v-html 来展示

```
 <h1 v-html="content"></h1>
 
  data() {
          return {
            count: 0,
            content: `<span style="color: red; font-size: 30px;">哈哈哈</span>`,
          };
        },
```

26.v-pre

用于跳过元素和他的子元素的编译过程，显示原始的Mustach标签，就是不会对其进行编译

<img src="https://img1.imgtp.com/2022/08/16/6QxUMw0k.png" alt="QQ截图20220805010351.png" style="zoom:200%;" />

![QQ截图20220805010445.png](https://img1.imgtp.com/2022/08/16/RQQz8CXr.png)

27.v-cloak

这个指令保持在元素上直到关联的组件实例结束编译，需要和css结合使用

<img src="https://img1.imgtp.com/2022/08/16/0K3EfAAB.png" alt="图片1.png" style="zoom:200%;" />

28.v-memo适用于性能优化，只有对应的数组中属性的值发生变化时才会重新渲染

<img src="https://img1.imgtp.com/2022/08/16/JpOvHIxe.png" alt="QQ截图20220805011104.png" style="zoom:200%;" />

29.v-bind  v-bind的简写

30.class绑定的语法

动态绑定的class可以和普通的class一起使用

:class可以是字符串，属性，对象，数组，计算属性返回一个对象，或是使用方法的调用返回一个对象或者数组

31.style绑定的语法

![QQ截图20220805023313.png](https://img1.imgtp.com/2022/08/16/7GFaKEon.png)

32.:[name]="value"  动态绑定属性

33. ```
    <h1 v-bind="obj"></h1> //绑定对象 可以将所有对象的属性遍历，绑定过去
    ```

34.v-on事件绑定  @简写

35.v-on事件的参数传递

![QQ截图20220806014535.png](https://img1.imgtp.com/2022/08/16/gFZd2jBM.png)

36.v-on的修饰符

.stop - 调用 event.stopPropagation()。

.prevent - 调用 event.preventDefault()。

.capture - 添加事件侦听器时使用 capture 模式。

.self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。

.{keyAlias} - 仅当事件是从特定键触发时才触发回调。

.once - 只触发一次回调。

.left - 只当点击鼠标左键时触发。

.right - 只当点击鼠标右键时触发。

.middle - 只当点击鼠标中键时触发。

.passive - { passive: true } 模式添加侦听器

37.v-if ,v-else, v-else-if

v-if的渲染原理

v-if是惰性的，只有在条件判断为true的时候，才会重新渲染。当为false的时候不会渲染

38.v-show

39.template元素

template元素可以在页面中不做渲染，可以用于包裹元素，但是不会在页面中渲染

40.v-for和v-show的区别

**首先，在用法上的区别：**

v-show是不支持template；

v-show不可以和v-else一起使用；

**其次，本质的区别：**

v-show元素无论是否需要显示到浏览器上，它的DOM实际都是有存在的，只是通过CSS的display属性来进行切换；

v-if当条件为false时，其对应的原生压根不会被渲染到DOM中；

**开发中如何进行选择呢？**

如果我们的原生需要在显示和隐藏之间频繁的切换，那么使用v-show；

如果不会频繁的发生切换，那么使用v-if；

41.v-for

![QQ截图20220806191249.png](https://img1.imgtp.com/2022/08/16/Rt9R3gK5.png)

42.数组跟新检测

vue会对以下数组的方法进行包裹，所以通过这些方法变更数组可以触发页面的更新

push()

pop()

shift()

unshift()

splice()

sort()

reverse()

这些方法都会直接修改原来的数组，

对于一些纯函数的数组方法，他会返回一个新的数组，所以必须将这个新的数组赋值给原来的属性

43.v-for中key的作用

key属性主要适用于Diff算法中，在新旧node对比时辨识vnode,如果不使用key,vue会使用一种最大限度减少动态元素并且尽可能的尝试就地复用或者修改相同类型的元素的算法

而使用了key时，他会基于key的变化重新排列元素顺序，并且会移除/销毁key不存在的元素

44.什么是vnode

vnode 全称virual node 就是虚拟节点，组件和元素都会被抽象成一个个虚拟节点，vnode本质就是一个个对象

45.diff算法

针对有key的vnode进行diff操作时

1.首先会对新旧节点进行遍历，从头部开始，遇到相同的节点则继续，直到遇到不用的节点则跳出

2.然后再从新旧vnode节点的尾部开始遍历，遇到相同的节点则继续，遇到不同的节点则会跳出

3.如果最后新的节点更多，那么就添加新的节点

4.如果旧的节点比较多，则会移除旧的节点

5.如果中间存在无序的节点，就通过key建立所用途最大限度的复用旧节点

46.computed

​	computed有缓存，只有依赖的属性发生变化的时候才会重新执行

​	computed和method的区别

​			computed是计算属性，method是方法，每次都会调用，computed只有数据变化时才会调用

​	computed的get set写法

![](C:\Users\10152\Desktop\study\memo\前端系统课笔记\image\QQ截图20220806170911.png)

47.watch

![QQ截图20220807012240.png](https://img1.imgtp.com/2022/08/16/c9HE9R2T.png)

48.jsconfig.json主要是给vscode中给项目更好的提示，没有也没关系

```
//vue.config.js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      // 配置路径别名
      // @是已经配置好的路径别名: 对应的是src路径
      alias: {
        "utils": "@/utils" 
      }
    }
  }
})

```

```
//jsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "baseUrl": "./",//定义根目录
    "moduleResolution": "node",
    "paths": {
      "@/*": [
        "src/*"
      ],
      //webpack配置了别名，为了给项目中更好的提示，可以在这里配置，否则写的时候没有提示
      "utils/*": [
        "src/utils/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  }
}

```

49.v-model

50.使用手脚架开发

```
npm install @vue/cli -g   //安装手脚架
npm update @vue/cli -g //更手脚架
Vue create 项目的名称

这种方式采用webpack作为构建工具

现在官方已经不再作为推荐的手脚搭建工具了
开始使用npm init vue@latest 命令  使用vite作为构建工具
```

<img src="https://img1.imgtp.com/2022/08/15/2VVktFIN.png" alt="图片1.png" style="zoom:200%;" />

<img src="https://img1.imgtp.com/2022/08/15/QcWf8mgQ.png" alt="图片2.png" style="zoom:200%;" />

<img src="https://img1.imgtp.com/2022/08/15/hS9wL3j1.png" alt="图片3.png" style="zoom:200%;" />

<img src="https://img1.imgtp.com/2022/08/15/0QrTy1qq.png" alt="图片4.png" style="zoom:200%;" />

![QQ截图20220815210717.png](https://img1.imgtp.com/2022/08/16/v3jDRHw7.png)

```js
import { createApp } from "vue/dist/vue.esm-bundler";
// import App from './App.vue'
/**
 * 当App是以对象的形式写的话就要使用 vue/dist/vue.esm-bundler
 * 这两种方式的不同，使用对象的方式，是因为如果引入的是vue,vue是runtime的代码，，不会编译template成	
 * vnode,需要使用vue/dist/vue.esm-bundler
 * 里面包括compiler+runtime，可以将template->createVNode->Vnode->DOM,对象的写法是由
 * vue/dist/vue.esm-bundler的源码来完成的，.vue文件的写法是由vue-loader来完成template->vnode的过程
 */
const App = {
  data() {
    return {};
  },
  template: `<h1>vue</h1>`,
};
createApp(App).mount("#app");
```

51.注册组件的方式

全局组件

局部组件

52.父组件向子组件传递数据

父组件向子组件传递数据是通过props来完成的

```js
<script>
export default {
  // 写法一
  // props: ["height", "name", "gender", "width"],
  // 写法二
  // props: {
  //   height: Object,
  //   name: Number,
  //   gender: String,
  //   width: Number,
  // },
  // 第三种写法
  // 当默认值是对象或者函数的时候，必须返回一个函数
  props: {
    propsB: {
      // 当props是一个函数的时候，这个不是一个工厂函数，而是作为一个默认值
      type: Function,
      default() {
        return "default";
      },
    },
    h: [Number, String], //可以是多种类型
    a: {
      type: Number,
      required: true, //表示是必填值
    },
    height: {
      type: Object,
      default: () => ({ name: "hhhh" }),
    },
    name: {
      type: String,
      default: "我是string",
    },
    gender: {
      type: Array,
      default() {
        return [1, 2, 3];
      },
    },
    width: {
      type: Number,
      default: 88888,
    },
  },
};
</script>
```

##### prop常见的两种用法

字符串数组，就是数组中的字符串就是attribute的名称，传递的数据类型时只能是字符串，不能是其他类型

```html
<show-info name="why" :age="18" :height="1.88" 
             address="广州市" abc="cba" class="active" />
//传递的数据类型不是string值，是其他类型或者是变量，必须用v-bind/:
```

对象类型，对象类型我们可以指定attribute名称时，指定传递类型默认值，校验等

```html
<show-info :age="100" show-message="哈哈哈哈"/>
```

##### props允许的数据类型

String,Number,Boolean,Array,Object,Date,Function,Symbol

##### props的命名

html中attribute名大小写不敏感，所以浏览器会把所有大写解释为小写，在模板中使用驼峰规则，的prop名要写成短横线

#### 53.非prop的attribute

当我们传递一个组件某个属性值，但是这个属性值没有对应的props和emits，就是非props的attribute，例如class,style,id等。

当组件有单个根节点时，非prop的attribute就会默认绑定到根节点上

如果不希望绑定到根节点，想要手动的绑定节点，可以在组件中设置

```
inheritAttr:false
```

就可以通过$attrs来访问所有的非props的attribute

```html
<template>
  <div>
    <h1 :class="$attr.class">hhhhhhhh</h1>
  </div>
</template>

<script>
  export default {
    inheritAttrs:false
  }
```

**多个根节点的attribute**

如果是多个根节点的情况，多个根节点的attribute如果没有显示的绑定，那么会报警告，我们必须手动的指定要绑定到哪一个元素上

```html
<template>
  <div>
    <h1 v-bind="$attr">hhhhhhhh</h1>
    <div>33333</div>
    <div>4444</div>
  </div>
</template>
```

*注意*template模板中允许有多个根节点

#### 54.子组件向父组件从传递数据

```html
//子组件
<template>
  <div class="add">
    <button @click="btnClick(1)">+1</button>
    <button @click="btnClick(5)">+5</button>
    <button @click="btnClick(10)">+10</button>
  </div>
</template>

<script>
  export default {
    // 1.emits数组语法
    emits: ["add"],
    // 2.emmits对象语法
    // emits: {
    //   add: function(count) {
    //     if (count <= 10) {
    //       return true
    //     }
    //     return false
    //   }
    // },
    methods: {
      btnClick(count) {
        console.log("btnClick:", count)
        // 让子组件发出去一个自定义事件
        // 第一个参数自定义的事件名称
        // 第二个参数是传递的参数
        this.$emit("add", 100)
      }
    }
  }
</script>

```

```html
//app,vue
<add-counter @add="addBtnClick"></add-counter>
```

#### 55.插槽slot

插槽的使用过程其实是抽取共性、预留不同

```html
//show-message.vue
//插槽的定义方式，使用<slot>标签进行占位，可以写入默认值，没有传递时就是用默认值

<div class="content">
    <slot>
      <p>我是默认内容, 哈哈哈</p>
    </slot>
  </div>
```

```html
//插槽的使用
<show-message>
      <a href="#">百度一下</a>
</show-message>
```

#### 56.具名插槽的使用

当需要插入不同的模块到不同的slot的时候，需要定义具体的名字。默认情况下不带名字时，会有默认的名字。

一个不带 name 的slot，会带有隐含的名字 default；

具名插槽使用的时候缩写：

跟 v-on 和 v-bind 一样，v-slot 也有缩写； 

 即把参数之前的所有内容 (v-slot:) 替换为字符 #；

```html
//nav-bar.vue
<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left">left</slot>
    </div>
    <div class="center">
      <slot name="center">center</slot>
    </div>
    <div class="right">
      <slot name="right">right</slot>
    </div>
  </div>

  <div class="other">
    <slot name="default"></slot>
  </div>
</template>

```

```html
//App.vue

<template>
  <nav-bar>
  //简写
    <template #left>
      <button>{{ leftText }}</button>
    </template>

    <template #center>
      <span>内容</span>
    </template>
//完整写法
    <template v-slot:right>
      <a href="#">登录</a>
    </template>
  </nav-bar>

  <!-- nav-bar只给一个插槽传入数据 -->
  <nav-bar>
  //动态插槽名
    <template v-slot:[position]>
      <a href="#">注册</a>
    </template>
  </nav-bar>
  <button @click=" position = 'left' ">左边</button>
  <button @click=" position = 'center' ">中间</button>
  <button @click=" position = 'right' ">右边</button>
</template>

<script>
  import NavBar from './NavBar.vue'

  export default {
    components: {
      NavBar
    },
    data() {
      return {
        position: "center",
        leftText: "返回"
      }
    }
  }
</script>
```

#### 57.渲染作用域

在vue模板中，父级模板的所有内容都是在父级作用域中编译完成的

子模版中所有内容都是在作用域中编译完成的，所以具名插槽的作用域是在父级，而作用域插槽的作用域是在子模版中

#### 58.作用域插槽

作用域插槽可以通过插槽访问子组件的内容，而修改每个具体的样式

```html
//tabControll.vue
<template>
  <div class="tab-control">
    <template v-for="(item, index) in titles" :key="item">
      <div class="tab-control-item"
           :class="{ active: index === currentIndex }"
           @click="itemClick(index)">
        <slot :item="item" abc="cba">
          <span>{{ item }}</span>//这是默认值
        </slot>
      </div>
    </template>
  </div>
</template>
```

```html
//App.vue
<template>
  <div class="app">
    <!-- 1.tab-control -->
    <tab-control :titles="['衣服', '鞋子', '裤子']" 
                 @tab-item-click="tabItemClick"/>

    <!-- <tab-control :titles="['流行', '最新', '优选']"/> -->

    <!-- 2.展示内容 -->
    <h1>{{ pageContents[currentIndex] }}</h1>

    <!-- 1.tab-control: button -->
    <tab-control :titles="['衣服', '鞋子', '裤子']" 
                 @tab-item-click="tabItemClick">
      <template v-slot:default="props">
        <button>{{ props.item }}</button>
      </template>
    </tab-control>

    
    <!-- 2.tab-control: a元素(重要) -->
    <tab-control :titles="['衣服', '鞋子', '裤子']" 
                 @tab-item-click="tabItemClick">
      <template #default="props">
        <a href="#">{{ props.item }}</a>
      </template>
    </tab-control>

    <!-- 3.独占默认插槽的简写(了解) -->
    <tab-control :titles="['衣服', '鞋子', '裤子']" 
                 @tab-item-click="tabItemClick">
      <template v-slot="props">
        <button>{{ props.item }}</button>
      </template>
    </tab-control>

    <!-- 4.如果只有一个默认插槽, 那么template可以省略 -->
    <tab-control :titles="['衣服', '鞋子', '裤子']" 
                 @tab-item-click="tabItemClick"
                 v-slot="props">
      <button>{{ props.item }}</button>
    </tab-control>
  </div>
</template>
```

#### 59.非父子组件之间的通信

1.全局的事件总线

vue3中移除了$on,$off,$once方法，如果需要使用事件总线，可以使用第三方库，或者通过自己写的事件总线方法。事件总线不经可以用于非父子组件的通信，也可以用于任意组件的通信

```js
//event-bus.js  事件总线初始化
import { HYEventBus } from 'hy-event-store'

const eventBus = new HYEventBus()

export default eventBus

```

```js
//App.vue   在created声明周期中监听事件
created() {
      // fetch()

      // 事件监听
      eventBus.on("whyEvent", (name, age, height) => {
        console.log("whyEvent事件在app中监听", name, age, height)
        this.message = `name:${name}, age:${age}, height:${height}`
      })
    }
```

```js
  //在Category.vue中 created中监听，在unmounted中移出事件
  import eventBus from './utils/event-bus'

  export default {
    methods: {
      whyEventHandler() {
        console.log("whyEvent在category中监听")
      }
    },
    created() {
      eventBus.on("whyEvent", this.whyEventHandler)
    },
    unmounted() {
      console.log("category unmounted")
      eventBus.off("whyEvent", this.whyEventHandler)
    }
  }
```

```js
 //HomeBanner.vue  emit事件
 import eventBus from './utils/event-bus'

  export default {
    methods: {
      bannerBtnClick() {
        console.log("bannerBtnClick")
        eventBus.emit("whyEvent", "why", 18, 1.88)
      }
    }
  }
```

2.Provide/inject

provide和inject可以用于跨组件的通信

```js
 //App.vue
 // provide一般都是写成函数 也可以写成对象，如果需要使用data中的属性，必须使用函数形式
    provide() {
      return {
        name: "why",
        age: 18,
        //默认不是响应式的，如果需要变成响应式的，要使用computed，computed的返回值是一个ref对象，需要使用.value来获取
        message: computed(() => this.message)//要写箭头函数，箭头函数的this是由上层作用域来决定的
      }
    }
  }
```

```vue
<template>
  <div class="banner">
    <h2>HomeBanner: {{ name }} - {{ age }} - {{message.value}}</h2>
  </div>
</template>

<script>
  export default {
    inject: ["name", "age", "message"]
  }
</script>
```

#### 60.组件的生命周期

![lifecycle.16e4c08e.png](https://img1.imgtp.com/2022/08/17/Lqxt3NMi.png)

父子组件的挂载过程

父组件beforeCreate ->父组件created->父组件beforemount->子组件beforeCreate->子组件created-> 子组件beforeMount->子组件mounted->父组件mounted

#### 61.$refs的使用

通过$refs可以获取到子元素或者子组件

通过`this.$refs.refName`可以获取到子组件实例，子组件实例是一个Proxy代理，vue组件是一个对象类似于一个class，根据class创建一个组件实例，通过`this.$refs.refname.$el`可以获取到组件DOM元素。，`this.$parent`获取到父组件元素，`this.$root`获取到根组件元素，$ref还可以调用子组件的属性和方法在Vue3中已经移除了$children的属性

如果template中由多个根，拿到的是第一个node节点

![QQ截图20220817150027.png](https://img1.imgtp.com/2022/08/17/RTih8iQq.png)

#### 62.动态组件

is中的组件只能是局部已注册的组件和全局组件

```vue
<component name="why" 
                 :age="18"
                 @homeClick="homeClick"
                 :is="currentTab">
</component>
```

#### 63.组件缓存keep-alive

如果组件频繁的切换会造成性能消耗增加，如果需要保存组件切换之前的状态，可以使用keep-alive，他通常和Component动态组件一起使用

```
<div class="view">
      <!-- include: 组件的名称来自于组件内部定义时name选项  -->
      <keep-alive include="home,about">
        <component :is="currentTab"></component>
      </keep-alive>
    </div>
```

##### include/exclude

`<KeepAlive>` 默认会缓存内部的所有组件实例，但我们可以通过 `include` 和 `exclude` prop 来定制该行为。这两个 prop 的值都可以是一个以英文逗号分隔的字符串、一个正则表达式，或是包含这两种类型的一个数组：

```html
<!-- 以英文逗号分隔的字符串 -->
<KeepAlive include="a,b">
  <component :is="view" />
</KeepAlive>

<!-- 正则表达式 (需使用 `v-bind`) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>

<!-- 数组 (需使用 `v-bind`) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>
```

它会根据组件的 [`name`](https://cn.vuejs.org/api/options-misc.html#name) 选项进行匹配，所以组件如果想要条件性地被 `KeepAlive` 缓存，就必须显式声明一个 `name` 选项

*TIP*

*在 3.2.34 或以上的版本中，使用 `<script setup>` 的单文件组件会自动根据文件名生成对应的 `name` 选项，无需再手动声明。*

##### 最大缓存实例数[#](https://cn.vuejs.org/guide/built-ins/keep-alive.html#max-cached-instances

我们可以通过传入 `max` prop 来限制可被缓存的最大组件实例数。`<KeepAlive>` 的行为在指定了 `max` 后类似一个 [LRU 缓存](https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU))：如果缓存的实例数量即将超过指定的那个最大数量，则最久没有被访问的缓存实例将被销毁，以便为新的实例腾出空间。

```html
<KeepAlive :max="10">
  <component :is="activeComponent" />
</KeepAlive>
```

缓存实例的生命周期

```js
export default {
  activated() {
    // 在首次挂载、
    // 以及每次从缓存中被重新插入的时候调用
  },
  deactivated() {
    // 在从 DOM 上移除、进入缓存
    // 以及组件卸载时调用
  }
}
```

#### 64.异步组件

vue2中的异步组件是使用import().then()来实现的

vue3中提供了函数defineAsyncComponent来实现异步组件，这这样可以对组件进行分包处理，不会打包到一个文件中，而是单独打到一个包中

```js
//方法一 因为这种方式也会返回一个promise
const AsyncCategory = defineAsyncComponent(() => import("./views/Category.vue"))
```

```js
//方法二
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ...从服务器获取组件
    resolve(/* 获取到的组件 */)
  })
})
// ... 像使用其他一般组件一样使用 `AsyncComp`
```

`defineAsyncComponent` 方法接收一个返回 Promise 的加载函数。这个 Promise 的 `resolve` 回调方法应该在从服务器获得组件定义时调用。你也可以调用 `reject(reason)` 表明加载失败。

全局注册方式

```js
app.component('MyComponent', defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
))
```

defineAsyncComponent的高级选项

```js
const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import('./Foo.vue'),

  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,

  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000
})
```

#### 65.组件中的v-model

可以对组件进行双向数据绑定

1. 将内部原生 `input` 元素的 `value` attribute 绑定到 `modelValue` prop
2. 输入新的值时在 `input` 元素上触发 `update:modelValue` 事件

```js
//App.js
<CustomInput
  :modelValue="searchText"
  @update:modelValue="newValue => searchText = newValue"
/>
```

```js
<!-- CustomInput.vue -->
<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue']
}
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

```js
<CustomInput v-model="searchText" />//这是上面的简写 v-model就可以使用了
```

方式二。使用computed来实现v-model

```js
<!-- CustomInput.vue -->
<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>

<template>
  <input v-model="value" />
</template>
```

v-model的参数是可以修改的

```js
<MyComponent v-model:title="bookTitle" />  //在组件中修改props的值还有emits的值为title和update:title
```

###### 多个 `v-model` 绑定

```js
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>
```

```js
<script>
export default {
  props: {
    firstName: String,
    lastName: String
  },
  emits: ['update:firstName', 'update:lastName']
}
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```

###### 处理 `v-model` 修饰符

我们来创建一个自定义的修饰符 `capitalize`，它会自动将 `v-model` 绑定输入的字符串值第一个字母转为大写：

```js
<MyComponent v-model.capitalize="myText" />

```

组件的 `v-model` 上所添加的修饰符，可以通过 `modelModifiers` prop 在组件内访问到。在下面的组件中，我们声明了 `modelModifiers` 这个 prop，它的默认值是一个空对象

```js
<script>
export default {
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  created() {
    console.log(this.modelModifiers) // { capitalize: true }
  }
}
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

注意这里组件的 `modelModifiers` prop 包含了 `capitalize` 且其值为 `true`，因为它在模板中的 `v-model` 绑定上被使用了。

有了 `modelModifiers` 这个 prop，我们就可以在原生事件侦听函数中检查它的值，然后决定触发的自定义事件中要向父组件传递什么值。在下面的代码里，我们就是在每次 `<input>` 元素触发 `input` 事件时将值的首字母大写：

```js
<script>
export default {
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  methods: {
    emitValue(e) {
      let value = e.target.value
      if (this.modelModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1)
      }
      this.$emit('update:modelValue', value)
    }
  }
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
```

对于又有参数又有修饰符的 `v-model` 绑定，生成的 prop 名将是 `arg + "Modifiers"`。举例来说：

```js
<MyComponent v-model:title.capitalize="myText">

```

```js
export default {
  props: ['title', 'titleModifiers'],
  emits: ['update:title'],
  created() {
    console.log(this.titleModifiers) // { capitalize: true }
  }
}
```

#### 66.mixins

局部混入的写法

```
const mixin = {
  created() {
    console.log(1)
  }
}

createApp({
  created() {
    console.log(2)
  },
  mixins: [mixin]
})

// => 1
// => 2
```

