### 1.React的严格模式如何使用，有什么用处？

```
<React.StrictMode></React.StrictMode>
StrictMode是一个用来突出显示应用程序中潜在问题的工具
	和Fragment一样，StrictMode不会渲染任何可见的UI；
	它为其后代元素触发额外的检查和警告
	严格模式检查只能在开发模式下运行，他不会影响生产构建
	可以为应用程序的任何部分开启严格模式
	
但是检测，到底检测什么
	1.识别不安全的生命周期
	2.使用过时的ref API
	3.使用废弃的findDOMNODE方法
		在之前的react api中 可以通过findDOMNodde来获取DOM。不过已经不推荐了
	4.检测意外的副作用
		这个组件的constructor会被调用两次
		这个是严格模式下故意进行的操作，让你来查看这里雌鳄的一些逻辑代码被多次调用时，是否会产生副作用
		在生产环境中，是不会被调用两次的
	5.检测过时的context API
```

### 2.在React中遍历的方法有哪些？

遍历数组：map/for循环

遍历对象：for..in/Object.keys().map()/Object.entries().map()

### 3.在React中页面重新加载时怎样保留数据？

将数据存储到Redux中

### 4.React必须使用JSX吗

不一定要使用jsx，因为jsx是React.createElement(component，props,...children)的语法糖

### 5.为什么使用jsx的组件中没有看到使用react却需要引入react？

因为jsx需要使用到React.createElement(),jsx是createElement()的语法糖

### 6.在React中怎么使用async/await？

async/await是ES7的新特性，如果是使用了React手脚架搭建的项目则直接使用，因为手脚架中已经整合了bable,如果是自己搭建项目中使用，就要使用babel的transform-to-module-method插件来转换

### 7.React.Children.map和js的map有什么区别？

js中的map不会对null和undefined的数据进行处理，而react中的 map则会处理children中null和undefined的情况

### 8.React 中的高阶组件运用了什么设计模式

使用的是装饰模式

就是不需要改变被装饰对象本身，只是在外面讨了个壳

### 9.类组件和函数组件有何不同？

​	类组件需要继承自react.component,函数式组件中没有this

​	class组件可以定义自己的state,用来保存自己内部状态，函数式组件需要使用

​	hook useState()来实现

​	class由自己的生命周期，而函数式组件需要使用useEffect来完成

​	函数式组件比class组件更加的简洁

### 10.React 中 keys 的作用是什么？

​		key的作用，在react中，比较新旧两个vnode节点是使用diffing算法来比较，使用key可以减少对DOM节点的操作，例如新旧vnode中，如果元素两个key相同，就可以直接对比他的子元素，如果旧节点中key不存在则直接添加，如果新的节点中key不存在，则直接删除旧的key

### 11.为什么调用 setState 而不是直接改变 state？

开发过程中我们并不能直接通过修改state的值来让界面发生更新

​	因为我们修改了state之后，希望React根据最新的State来重新渲染界面，但是这种方式的修改React并不知道数据发生了变化

​	React中没有实现类似于Vue2的Object.defineProperty或者Vue3的new Proxy这种方式来监听数据变化时重新渲染界面

​	所以需要使用setState的方式来修改数据通知到界面