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