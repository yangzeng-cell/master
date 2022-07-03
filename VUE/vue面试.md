

# **nextTrick**

nextTrick就是在DOM更新循环结束之后执行延迟回调，获得更新之后的DOM

`nextTick`主要使用了宏任务和微任务。根据执行环境分别尝试采用

- `Promise`
- `MutationObserver`
- `setImmediate`
- 如果以上都不行则采用`setTimeout`

> 定义了一个异步方法，多次调用`nextTick`会将方法存入队列中，通过这个异步方法清空当前队列

### 生命周期

**对于MVVM的理解**

`MVVM`是`Model-View-ViewModel`缩写，也就是把MVC中的Controller演变成`ViewModel`。Model层代表数据模型，`View`代表UI组件，`ViewModel`是`View`和`Model`层的桥梁，数据会绑定到viewModel层并自动将数据渲染到页面中，视图变化的时候会通知viewModel层更新数据。

**请详细说下你对vue生命周期的理解**

vue的生命周期分为8个阶段,分别是beforecreate,created,beforemount,mounted,beforeupdate,updated,beforedestroy,destroyed.还有activited和diactivited

**生命周期是什么**

> Vue 实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模版、挂载Dom -> 渲染、更新 -> 渲染、卸载等一系列过程，我们称这是Vue的生命周期

![img](D:\memo\JavaScript\img\61.png)

首先，vue实例被创建，这时候是一个空的对象，只有一些默认的事件和生命周期钩子函数，其他属性和方法都未创建

到执行beforecreate钩子函数的时候，data和methods都还没有初始化

在created钩子函数的时候，data和methods都已经初始化完成。如果想要操作数据或者方法的时候最早可以在这个时候进行

然后执行vue中的代码，编译生成模板字符串，然后将编译好的模板字符串渲染成Dom,但是还没有挂在到页面中去

beforeMount执行的时候模板已经编译好，但是还没有挂在的真正的DOM中去，页面也还是旧的。

然后就将编译好的模板挂在到页面上

然后执行mounted,此时vue示例已经初始化完毕，组件已经脱离创建阶段，进入了运行阶段

组件进入销毁阶段的时候

在执行beforeDestroy钩子函数的时候，vue实例就已经从运行阶段进入了销毁阶段，当执行beforeDestroy的时候，组件上所有data和methods以继过滤器，指令等都还没有被销毁，仍然可用

当执行destroyed的时候,组件已经被销毁。

但数据变化的时候

在执行beforeupdate的时候页面是旧的，但是数据是新的，尚未更新到页面中。

在执行updated的时候。数据已经渲染到页面中，完成同步

**第一次页面加载会触发哪几个钩子？**

- 答：会触发下面这几个`beforeCreate`、`created`、`beforeMount`、`mounted` 。

**DOM 渲染在哪个周期中就已经完成？**

- 答：`DOM` 渲染在 `mounted` 中就已经完成了

##  Vue实现数据双向绑定的原理：Object.defineProperty()



- `vue`实现数据双向绑定主要是：采用数据劫持结合发布者-订阅者模式的方式，通过 `Object.defineProperty()` 来劫持各个属性的`setter`，`getter`，在数据变动时发布消息给订阅者，触发相应监听回调。当把一个普通 `Javascript` 对象传给 Vue 实例来作为它的 `data` 选项时，Vue 将遍历它的属性，用 `Object.defineProperty()` 将它们转为 `getter/setter`。用户看不到 `getter/setter`，但是在内部它们让 `Vue`追踪依赖，在属性被访问和修改时通知变化。
- vue的数据双向绑定 将`MVVM`作为数据绑定的入口，整合`Observer`，`Compile`和`Watcher`三者，通过`Observer`来监听自己的`model`的数据变化，通过`Compile`来解析编译模板指令（`vue`中是用来解析 `{{}}`），最终利用`watcher`搭起`observer`和`Compile`之间的通信桥梁，达到数据变化 —>视图更新；视图交互变化（`input`）—>数据`model`变更双向绑定效果。

**Vue组件间的参数传递**

# [vue组件间通信、数据传递（父子组件，同级组件）](https://segmentfault.com/a/1190000011882494)

##  Vue的路由实现：hash模式 和 history模式



- `hash`模式：在浏览器中符号`“#”`，#以及#后面的字符称之为`hash`，用 `window.location.hash` 读取。特点：`hash`虽然在`URL`中，但不被包括在`HTTP`请求中；用来指导浏览器动作，对服务端安全无用，`hash`不会重加载页面。
- `history`模式：h`istory`采用`HTML5`的新特性；且提供了两个新方法： `pushState()`， `replaceState()`可以对浏览器历史记录栈进行修改，以及`popState`事件的监听到状态变更

## vue路由的钩子函数



> 首页可以控制导航跳转，`beforeEach`，`afterEach`等，一般用于页面`title`的修改。一些需要登录才能调整页面的重定向功能。

- `beforeEach`主要有3个参数`to`，`from`，`next`。
- `to`：`route`即将进入的目标路由对象。
- `from`：`route`当前导航正要离开的路由。
- `next`：`function`一定要调用该方法`resolve`这个钩子。执行效果依赖n`ext`方法的调用参数。可以控制网页的跳转

##  v-if 和 v-show 区别



- 答：`v-if`按照条件是否渲染，`v-show`是`display`的`block`或`none`；

## `$route`和`$router`的区别



- `$route`是“路由信息对象”，包括`path`，`params`，`hash`，`query`，`fullPath`，`matched`，`name`等路由信息参数。
- 而`$router`是“路由实例”对象包括了路由的跳转方法，钩子函数等

## 如何让CSS只在当前组件中起作用?



> 将当前组件的`<style>`修改为`<style scoped>`

## `<keep-alive></keep-alive>`的作用是什么?



> keep-alive可以实现组件缓存，当组件切换时不会对当前组件进行卸载

- `<keep-alive></keep-alive>` 包裹动态组件时，会缓存不活动的组件实例,主要用于保留组件状态或避免重新渲染

- 常用的两个属性`include/exclude`，允许组件有条件的进行缓存
- 两个生命周期`activated/deactivated`，用来得知当前组件是否处于活跃状态

##  11 指令v-el的作用是什么?



> 提供页面上已经存在的DOM元素作为vue实例挂在的目标，可以是css选择器，也可以是html标签

## 在Vue中使用插件的步骤



- 采用`ES6`的`import ... from ...`语法或`CommonJS`的`require()`方法引入插件
- 使用全局方法`Vue.use( plugin )`使用插件,可以传入一个选项对象`Vue.use(MyPlugin, { someOption: true })`

## 请列举出3个Vue中常用的生命周期钩子函数?



- `created`: 实例已经创建完成之后调用,在这一步,实例已经完成数据观测, 属性和方法的运算, `watch/event`事件回调. 然而, 挂载阶段还没有开始, `$el`属性目前还不可见
- `mounted`: `el`被新创建的 `vm.$el` 替换，并挂载到实例上去之后调用该钩子。如果 `root` 实例挂载了一个文档内元素，当 `mounted`被调用时 `vm.$el` 也在文档内。
- `activated`: `keep-alive`组件激活时调用

## 路由之间跳转？



**声明式（标签跳转）**

```text
<router-link :to="index">
```

**编程式（ js跳转）**

```text
router.push('index')
```

**Vue 组件 data 为什么必须是函数**

- 每个组件都是 `Vue` 的实例。
- 组件共享 `data` 属性，当 `data` 的值是同一个引用类型的值时，改变其中一个会影响其他

##  *Vue computed 实现



- 建立与其他属性（如：`data`、 `Store`）的联系；
- 属性改变后，通知计算属性重新计算

> 实现时，主要如下

- 初始化 `data`， 使用 `Object.defineProperty` 把这些属性全部转为 `getter/setter`。
- 初始化 `computed`, 遍历 `computed` 里的每个属性，每个 `computed` 属性都是一个 `watch` 实例。每个属性提供的函数作为属性的 `getter`，使用 `Object.defineProperty` 转化。
- `Object.defineProperty getter` 依赖收集。用于依赖发生变化时，触发属性重新计算。
- 若出现当前 `computed` 计算属性嵌套其他 `computed` 计算属性时，先进行其他的依赖收集

## *Vue complier 实现

- 总的来说，`Vue complier` 是将 `template` 转化成一个 `render` 字符串。

> 可以简单理解成以下步骤：

- `parse` 过程，将 `template` 利用正则转化成`AST` 抽象语法树。
- `optimize` 过程，标记静态节点，后 `diff` 过程跳过静态节点，提升性能。
- `generate` 过程，生成 `render` 字符串

## 开发中常用的指令有哪些



- `v-model` :一般用在表达输入，很轻松的实现表单控件和数据的双向绑定
- `v-html`: 更新元素的 `innerHTML`
- `v-show` 与 `v-if`: 条件渲染, 注意二者区别

> 使用了v-if的时候，如果值为false，那么页面将不会有这个html标签生成。 v-show则是不管值为true还是false，html元素都会存在，只是CSS中的display显示或隐藏

- `v-on` : `click`: 可以简写为`@click`,`@`绑定一个事件。如果事件触发了，就可以指定事件的处理函数
- `v-for`:基于源数据多次渲染元素或模板块
- `v-bind`: 当表达式的值改变时，将其产生的连带影响，响应式地作用于 `DOM`

> 语法：`v-bind:title="msg"`简写：`:title="msg"`

## Proxy 相比于 defineProperty 的优势



> Object.defineProperty() 的问题主要有三个：

- 不能监听数组的变化
- 必须遍历对象的每个属性
- 必须深层遍历嵌套的对象

> Proxy 在 ES2015 规范中被正式加入，它有以下几个特点

- 针对对象：针对整个对象，而不是对象的某个属性，所以也就不需要对 keys 进行遍历。这解决了上述 Object.defineProperty() 第二个问题
- 支持数组：Proxy 不需要对数组的方法进行重载，省去了众多 hack，减少代码量等于减少了维护成本，而且标准的就是最好的。

> 除了上述两点之外，Proxy 还拥有以下优势：

- Proxy 的第二个参数可以有 13 种拦截方法，这比起 Object.defineProperty() 要更加丰富
- Proxy 作为新标准受到浏览器厂商的重点关注和性能优化，相比之下 Object.defineProperty() 是一个已有的老方法。

##  vue-router 有哪几种导航守卫?



- 全局守卫
- 路由独享守卫
- 路由组件内的守卫

**全局守卫**

> vue-router全局有三个守卫

- `router.beforeEach` 全局前置守卫 进入路由之前
- `router.beforeResolve` 全局解析守卫(2.5.0+) 在`beforeRouteEnter`调用之后调用
- `router.afterEach` 全局后置钩子 进入路由之后

```js
// main.js 入口文件
import router from './router'; // 引入路由
router.beforeEach((to, from, next) => { 
  next();
});
router.beforeResolve((to, from, next) => {
  next();
});
router.afterEach((to, from) => {
  console.log('afterEach 全局后置钩子');
});
```

**路由独享守卫**

> 如果你不想全局配置守卫的话，你可以为某些路由单独配置守卫

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => { 
        // 参数用法什么的都一样,调用顺序在全局前置守卫后面，所以不会被全局守卫覆盖
        // ...
      }
    }
  ]
})
```

**路由组件内的守卫**

- beforeRouteEnter 进入路由前, 在路由独享守卫后调用 不能 获取组件实例 this，组件实例还没被创建
- beforeRouteUpdate (2.2) 路由复用同一个组件时, 在当前路由改变，但是该组件被复用时调用 可以访问组件实例 this
- beforeRouteLeave 离开当前路由时, 导航离开该组件的对应路由时调用，可以访问组件实例 this

***watch与computed的区别**

**computed:**

- computed是计算属性,也就是计算值,它更多用于计算值的场景
- computed具有缓存性,computed的值在getter执行后是会缓存的，只有在它依赖的属性值改变之后，下一次获取computed的值时才会重新调用对应的getter来计算 computed适用于计算比较消耗性能的计算场景

**watch:**

- 更多的是「观察」的作用,类似于某些数据的监听回调,用于观察props $emit或者本组件的值,当数据变化时来执行回调进行后续操作
- 无缓存性，页面重新渲染时值不变化也会执行
- 当我们需要深度监听对象中的属性时，可以打开`deep：true`选项，这样便会对对象中的每一项进行监听

**小结:**

- 当我们要进行数值计算,而且依赖于其他数据，那么把这个数据设计为computed
- 如果你需要在某个数据变化时做一些事情，使用watch来观察这个数据变化。如果要在数据变化的同时进行异步操作或者是比较大的开销，那么`watch`为最佳选择

## *Vue是如何实现双向绑定的?



> 利用Object.defineProperty劫持对象的访问器,在属性值发生变化时我们可以获取变化,然后根据变化进行后续响应,在vue3.0中通过Proxy代理对象进行类似的操作。

```js
// 这是将要被劫持的对象
const data = {
  name: '',
};

function say(name) {
  if (name === '古天乐') {
    console.log('给大家推荐一款超好玩的游戏');
  } else if (name === '渣渣辉') {
    console.log('戏我演过很多,可游戏我只玩贪玩懒月');
  } else {
    console.log('来做我的兄弟');
  }
}

// 遍历对象,对其属性值进行劫持
Object.keys(data).forEach(function(key) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      console.log('get');
    },
    set: function(newVal) {
      // 当属性值发生变化时我们可以进行额外操作
      console.log(`大家好,我系${newVal}`);
      say(newVal);
    },
  });
});

data.name = '渣渣辉';
//大家好,我系渣渣辉
//戏我演过很多,可游戏我只玩贪玩懒月
```

## *Vue2.x 响应式原理



> Vue 采用数据劫持结合发布—订阅模式的方法，通过 Object.defineProperty() 来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

![img](D:\memo\JavaScript\img\vue.jpeg)

- `Observer` 遍历数据对象，给所有属性加上 `setter` 和 `getter`，监听数据的变化
- `compile` 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图

> `Watcher` 订阅者是 `Observer` 和 `Compile` 之间通信的桥梁，主要做的事情

- 在自身实例化时往属性订阅器 (`dep`) 里面添加自己
- 待属性变动 `dep.notice()` 通知时，调用自身的 `update()` 方法，并触发 `Compile` 中绑定的回调

**Vue3.x响应式数据原理**

> `Vue3.x`改用`Proxy`替代`Object.defineProperty`。因为`Proxy`可以直接监听对象和数组的变化，并且有多达13种拦截方法。并且作为新标准将受到浏览器厂商重点持续的性能优化。

`Proxy`只会代理对象的第一层，那么`Vue3`又是怎样处理这个问题的呢？

> 判断当前`Reflect.get的`返回值是否为`Object`，如果是则再通过`reactive`方法做代理， 这样就实现了深度观测。

**监测数组的时候可能触发多次get/set，那么如何防止触发多次呢？**

> 我们可以判断`key`是否为当前被代理对象`target`自身属性，也可以判断旧值与新值是否相等，只有满足以上两个条件之一时，才有可能执行`trigger`

**v-model双向绑定原理**

- `text` 和 `textarea` 元素使用 value 属性和 input 事件
- `checkbox` 和 `radio` 使用 checked 属性和 change 事件
- `select` 字段将 value 作为 prop 并将 change 作为事件

**所以我们可以v-model进行如下改写：**

```html
<input v-model="sth" />
//  等同于
<input :value="sth" @input="sth = $event.target.value" />
```

- 这个语法糖必须是固定的，也就是说属性必须为`value`，方法名必须为：`input`。
- 知道了`v-model`的原理，我们可以在自定义组件上实现`v-model`

```text
//Parent
<template>
    {{num}}
    <Child v-model="num">
</template>
export default {
    data(){
        return {
            num: 0
        }
    }
}

//Child
<template>
    <div @click="add">Add</div>
</template>
export default {
    props: ['value'],
    methods:{
        add(){
            this.$emit('input', this.value + 1)
        }
    }
}
```

 **scoped样式穿透**

> `scoped`虽然避免了组件间样式污染，但是很多时候我们需要修改组件中的某个样式，但是又不想去除`scoped`属性

1. 使用`/deep/`

```text
//Parent
<template>
<div class="wrap">
    <Child />
</div>
</template>

<style lang="scss" scoped>
.wrap /deep/ .box{
    background: red;
}
</style>

//Child
<template>
    <div class="box"></div>
</template>
```

1. 使用两个style标签

```text
//Parent
<template>
<div class="wrap">
    <Child />
</div>
</template>

<style lang="scss" scoped>
//其他样式
</style>
<style lang="scss">
.wrap .box{
    background: red;
}
</style>

//Child
<template>
    <div class="box"></div>
</template>
```

## $refs的作用



- 获取`dom`元素`this.$refs.box`
- 获取子组件中的`datathis.$refs.box.msg`
- 调用子组件中的方法`this.$refs.box.open()`

## vue修饰符



- `stop`：阻止事件的冒泡
- `prevent`：阻止事件的默认行为
- `once`：只触发一次
- `self`：只触发自己的事件行为时，才会执行



## vue.extend和vue.component



- `extend`是构造一个组件的语法器。 然后这个组件你可以作用到Vue.component这个全局注册方法里还可以在任意vue模板里使用组件。 也可以作用到vue实例或者某个组件中的components属性中并在内部使用apple组件。
- `Vue.component`你可以创建 ，也可以取组件。

## 既然Vue通过数据劫持可以精准探测数据变化,为什么还需要虚拟DOM进行diff检测差异?



> 现代前端框架有两种方式侦测变化,一种是pull一种是push

- pull: 其代表为React,我们可以回忆一下React是如何侦测到变化的,我们通常会用setStateAPI显式更新,然后React会进行一层层的Virtual Dom Diff操作找出差异,然后Patch到DOM上,React从一开始就不知道到底是哪发生了变化,只是知道「有变化了」,然后再进行比较暴力的Diff操作查找「哪发生变化了」，另外一个代表就是Angular的脏检查操作。
- push: Vue的响应式系统则是push的代表,当Vue程序初始化的时候就会对数据data进行依赖的收集,一但数据发生变化,响应式系统就会立刻得知,因此Vue是一开始就知道是「在哪发生变化了」,但是这又会产生一个问题,如果你熟悉Vue的响应式系统就知道,通常一个绑定一个数据就需要一个Watcher,一但我们的绑定细粒度过高就会产生大量的Watcher,这会带来内存以及依赖追踪的开销,而细粒度过低会无法精准侦测变化,因此Vue的设计是选择中等细粒度的方案,在组件级别进行push侦测的方式,也就是那套响应式系统,通常我们会第一时间侦测到发生变化的组件,然后在组件内部进行Virtual Dom Diff获取更加具体的差异,而Virtual Dom Diff则是pull操作,Vue是push+pull结合的方式进行变化侦测的

## Vue中的key到底有什么用？



- key是为Vue中的vnode标记的唯一id,通过这个key,我们的diff操作可以更准确、更快速
- diff算法的过程中,先会进行新旧节点的首尾交叉对比,当无法匹配的时候会用新节点的key与旧节点进行比对,然后超出差异.

> diff程可以概括为：oldCh和newCh各有两个头尾的变量StartIdx和EndIdx，它们的2个变量相互比较，一共有4种比较方式。如果4种比较都没匹配，如果设置了key，就会用key进行比较，在比较的过程中，变量会往中间靠，一旦StartIdx>EndIdx表明oldCh和newCh至少有一个已经遍历完了，就会结束比较,这四种比较方式就是首、尾、旧尾新头、旧头新尾.

> 准确: 如果不加key,那么vue会选择复用节点(Vue的就地更新策略),导致之前节点的状态被保留下来,会产生一系列的bug. 快速: key的唯一性可以被Map数据结构充分利用,相比于遍历查找的时间复杂度`O(n)`,`Map`的时间复杂度仅仅为`O(1)`.

![img](D:\memo\JavaScript\img\67.png)

##  

##  vue 项目性能优化



**代码层面：**

- 合理使用 `v-if` 和 `v-show`
- 区分 `computed` 和 `watch` 的使用
- `v-for` 遍历为 `item` 添加 `key`
- `v-for` 遍历避免同时使用 `v-if`
- 通过 `addEventListener`添加的事件在组件销毁时要用 `removeEventListener` 手动移除这些事件的监听
- 图片懒加载
- 路由懒加载
- 第三方插件按需引入
- `SSR`服务端渲染，首屏加载速度快，`SEO`效果好

**Webpack 层面优化：**

- 对图片进行压缩
- 使用 `CommonsChunkPlugin` 插件提取公共代码
- 提取组件的 CSS
- 优化 `SourceMap`
- 构建结果输出分析，利用 `webpack-bundle-analyzer` 可视化分析工具

## 说一下vue2.x中如何监测数组变化



> 使用了函数劫持的方式，重写了数组的方法，`Vue`将`data`中的数组进行了原型链重写，指向了自己定义的数组原型方法。这样当调用数组api时，可以通知依赖更新。如果数组中包含着引用类型，会对数组中的引用类型再次递归遍历进行监控。这样就实现了监测数组变化。

##  

## Vue事件绑定原理说一下



> 原生事件绑定是通过`addEventListener`绑定给真实元素的，组件事件绑定是通过`Vue`自定义的`$on`实现的

## ue模版编译原理知道吗，能简单说一下吗？



> 简单说，`Vue`的编译过程就是将`template`转化为`render`函数的过程。会经历以下阶段：

- 生成`AST`树
- 优化
- `codegen`
- 首先解析模版，生成`AST`语法树(一种用J`avaScript`对象的形式来描述整个模板)。 使用大量的正则表达式对模板进行解析，遇到标签、文本的时候都会执行对应的钩子进行相关处理。
- `Vue`的数据是响应式的，但其实模板中并不是所有的数据都是响应式的。有一些数据首次渲染后就不会再变化，对应的DOM也不会变化。那么优化过程就是深度遍历AST树，按照相关条件对树节点进行标记。这些被标记的节点(静态节点)我们就可以跳过对它们的比对，对运行时的模板起到很大的优化作用。
- 编译的最后一步是将优化后的`AST`树转换为可执行的代码

## Vue2.x和Vue3.x渲染器的diff算法分别说一下



> 简单来说，`diff`算法有以下过程

- 同级比较，再比较子节点
- 先判断一方有子节点一方没有子节点的情况(如果新的`children`没有子节点，将旧的子节点移除)
- 比较都有子节点的情况(核心`diff`)
- 递归比较子节点
- 正常`Diff`两个树的时间复杂度是`O(n^3)`，但实际情况下我们很少会进行跨层级的移动`DOM`，所以`Vue`将`Diff`进行了优化，从`O(n^3) -> O(n)`，只有当新旧`children`都为多个子节点时才需要用核心的`Diff`算法进行同层级比较。
- `Vue2`的核心`Diff`算法采用了双端比较的算法，同时从新旧`children`的两端开始进行比较，借助`key`值找到可复用的节点，再进行相关操作。相比`React`的`Diff`算法，同样情况下可以减少移动节点次数，减少不必要的性能损耗，更加的优雅
- 在创建`VNode`时就确定其类型，以及在`mount/patch`的过程中采用位运算来判断一个`VNode`的类型，在这个基础之上再配合核心的`Diff`算法，使得性能上较`Vue2.x`有了提升

## 再说一下虚拟Dom以及key属性的作用



- 由于在浏览器中操作`DOM`是很昂贵的。频繁的操作`DOM`，会产生一定的性能问题。这就是虚拟Dom的产生原因
- `Virtual DOM`本质就是用一个原生的JS对象去描述一个`DOM`节点。是对真实DOM的一层抽象
- `VirtualDOM`映射到真实DOM要经历`VNode`的`create`、`diff`、`patch`等阶段

**key的作用是尽可能的复用 DOM 元素**

- 新旧 `children` 中的节点只有顺序是不同的时候，最佳的操作应该是通过移动元素的位置来达到更新的目的
- 需要在新旧 `children` 的节点中保存映射关系，以便能够在旧 `children` 的节点中找到可复用的节点。`key`也就是`children`中节点的唯一标识

## Vue中组件生命周期调用顺序说一下



- 渲染顺序：先父后子，完成顺序：先子后父
- 更新顺序：父更新导致子更新，子更新完成后父
- 销毁顺序：先父后子，完成顺序：先子后父

**加载渲染过程**

> ```
> 父beforeCreate`->`父created`->`父beforeMount`->`子beforeCreate`->`子created`->`子beforeMount`- >`子mounted`->`父mounted
> ```

**子组件更新过程**

> ```
> 父beforeUpdate`->`子beforeUpdate`->`子updated`->`父updated
> ```

**父组件更新过程**

> ```
> 父 beforeUpdate` -> `父 updated
> ```

**销毁过程**

> ```
> 父beforeDestroy`->`子beforeDestroy`->`子destroyed`->`父destroyed
> ```

##  请说出vue.cli项目中src目录每个文件夹和文件的用法



- `assets`文件夹是放静态资源；
- `components`是放组件；
- `router`是定义路由相关的配置;
- `view`视图；
- `app.vue`是一个应用主组件；
- `main.js`是入口文件

## vue路由传参数



- 使用`query`方法传入的参数使用`this.$route.query`接受
- 使用`params`方式传入的参数使用`this.$route.params`接受

##  delete和Vue.delete删除数组的区别？



- `delete`只是被删除的元素变成了 `empty/undefined` 其他的元素的键值还是不变。
- `Vue.delete`直接删除了数组 改变了数组的键值。

```js
var a=[1,2,3,4]
var b=[1,2,3,4]
delete a[0]
console.log(a)  //[empty,2,3,4]
this.$delete(b,0)
console.log(b)  //[2,3,4]
```

## v-on可以监听多个方法吗？



可以

```html
<input type="text" :value="name" @input="onInput" @focus="onFocus" @blur="onBlur" />
```

**v-on 常用修饰符**

- `.stop` 该修饰符将阻止事件向上冒泡。同理于调用 `event.stopPropagation()` 方法
- `.prevent` 该修饰符会阻止当前事件的默认行为。同理于调用 `event.preventDefault()` 方法
- `.self` 该指令只当事件是从事件绑定的元素本身触发时才触发回调
- `.once` 该修饰符表示绑定的事件只会被触发一次

## Vue3.0 是如何变得更快的



### [#](http://interview.poetries.top/excellent-docs/7-Vue.html#diff-方法优化)diff 方法优化

- `Vue2.x` 中的虚拟 dom 是进行全量的对比。
- `Vue3.0` 中新增了静态标记(PatchFlag):在与上次虚拟结点进行对比的时候，值对比 带有 patch flag 的节点，并且可以通过 flag 的信息得知当前节点要对比的具体内容化

### [#](http://interview.poetries.top/excellent-docs/7-Vue.html#hoiststatic-静态提升)hoistStatic 静态提升

- `Vue2.x` : 无论元素是否参与更新，每次都会重新创建。
- `Vue3.0` : 对不参与更新的元素，只会被创建一次，之后会在每次渲染时候被不停的复用

### [#](http://interview.poetries.top/excellent-docs/7-Vue.html#cachehandlers-事件侦听器缓存)cacheHandlers 事件侦听器缓存

默认情况下 onClick 会被视为动态绑定，所以每次都会去追踪它的变化但是因为是同一 个函数，所以没有追踪变化，直接缓存起来复用即可

##  vue-router



**mode**

- `hash`
- `history`

**跳转**

- `this.$router.push()`
- `<router-link to=""></router-link>`

**占位**

```text
<router-view></router-view>
```

## 插槽与作用域插槽的区别



**插槽**

- 创建组件虚拟节点时，会将组件儿子的虚拟节点保存起来。当初始化组件时，通过插槽属性将儿子进行分类`{a:[vnode],b[vnode]}`
- 渲染组件时会拿对应的`slot` 属性的节点进行替换操作。（插槽的作用域为父组件）

**作用域插槽**

- 作用域插槽在解析的时候不会作为组件的孩子节点。会解析成函数，当子组件渲染时，会调用此函数进行渲染。
- 普通插槽渲染的作用域是父组件，作用域插槽的渲染作用域是当前子组件。

## ue中相同逻辑如何抽离



> 其实就是考察`vue.mixin` 用法，给组件每个生命周期，函数都混入一些公共逻辑。

##   Vue3.0相对于Vue2.x有哪些不同？



**performance**

首先在性能(performance)上有了更多的优化，一方面表现在`virtual dom`的生成上更快了，另外在底层还做了一些监听的缓存，也就是事件在被创建的时候会被推进一个缓存中，后续没有改变会直接取缓存。

**tree-shaking**

tree-shaking它表示的是在打包的时候会去除一些无用的代码。而在Vue3中对它的支持更加友好了，例如像transition、v-model、computed等功能没有用到的话，那么最后打包产生的代码就会将它们去除。也就是说，如果你的Vue项目只写了一个Hello Word的话，那么最后打包的代码中就只有一些核心的代码，如更新算法、响应式等，打包生成的文件可能就只有13.5kb。

**Fragments**

碎片(Fragments)，原本在Vue2.x中每个template下只能允许有一个根节点，但是在Vue3中它可以允许你有多个，用尤大大的话来说就是会将这些内容自动变为一个碎片。

**TS**

再者就是对TS的支持度很好。虽然Vue3本来就是用TS写的，但是不一定要用TS。另外它也支持Class Component，不过不是第一推荐。

**Component API**

语法上，对模版语法是零改变的。只不过更加推荐用Component API来写JS部分。Component API它并不是语法，而是新增的API。它带来的好处一个是逻辑重用，方便我们把一些功能的部分抽离出来。另一个它相对于options来说更加集中，用options来写代码想要追寻一个变量的变化比较麻烦。

**关于兼容性**

目前的Vue3.beta版本是不支持IE11的，因为核心的响应式原理用到了ES6的Proxy，但是以后会去兼容IE11。后面我们在创建一个Vue项目的时候，可以选择不同的版本，支持IE11和不支持IE11的。

##  Vue中hash模式和history模式的区别



- 最明显的是在显示上，`hash`模式的`URL`中会夹杂着`#`号，而`history`没有。
- `Vue`底层对它们的实现方式不同。`hash`模式是依靠`onhashchange`事件(监听`location.hash`的改变)，而`history`模式是主要是依靠的`HTML5 history`中新增的两个方法，`pushState()`可以改变`url`地址且不会发送请求，`replaceState()`可以读取历史记录栈,还可以对浏览器记录进行修改。
- 当真正需要通过`URL`向后端发送`HTTP`请求的时候，比如常见的用户手动输入`URL`后回车，或者是刷新(重启)浏览器，这时候`history`模式需要后端的支持。因为`history`模式下，前端的`URL`必须和实际向后端发送请求的`URL`一致，例如有一个`URL`是带有路径`path`的(例如`www.lindaidai.wang/blogs/id`)，如果后端没有对这个路径做处理的话，就会返回`404`错误。所以需要后端增加一个覆盖所有情况的候选资源，一般会配合前端给出的一个`404`页面。

```
hash:
window.onhashchange = function(event){
  // location.hash获取到的是包括#号的，如"#heading-3"
  // 所以可以截取一下
	let hash = location.hash.slice(1);
}
```

## 了解history有哪些方法吗？说下它们的区别



history 这个对象在html5的时候新加入两个api **history.pushState() 和 history.repalceState()** 这两个 API可以在不进行刷新的情况下，操作浏览器的历史纪录。唯一不同的是，前者是新增一个历史记录，后者是直接替换当前的历史记录。

从参数上来说：

```javascript
window.history.pushState(state,title,url)
//state：需要保存的数据，这个数据在触发popstate事件时，可以在event.state里获取
//title：标题，基本没用，一般传null
//url：设定新的历史纪录的url。新的url与当前url的origin必须是一样的，否则会抛出错误。url可以时绝对路径，也可以是相对路径。
//如 当前url是 https://www.baidu.com/a/,执行history.pushState(null, null, './qq/')，则变成 https://www.baidu.com/a/qq/，
//执行history.pushState(null, null, '/qq/')，则变成 https://www.baidu.com/qq/

window.history.replaceState(state,title,url)
//与pushState 基本相同，但她是修改当前历史纪录，而 pushState 是创建新的历史纪录
```

另外还有：

- `window.history.back()` 后退
- `window.history.forward()`前进
- `window.history.go(1)` 前进或者后退几步

从触发事件的监听上来说：

- `pushState()`和`replaceState()`不能被`popstate`事件所监听
- 而后面三者可以，且用户点击浏览器前进后退键时也可以

##  完整的导航解析流程



1. 导航被触发。
2. 在失活的组件里调用离开守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数