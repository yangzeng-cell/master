

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