# Day09 作业布置

## 一. 完成课堂所有的代码

- 重点
  - Proxy和Reflect配合使用监听对象的改变
  - ES5监听对象的方式
  - Promise的基本使用



## 二. 说出Proxy和Object.defineProperty的区别

- Proxy的设计初衷就是监听对象的改变,并且提供了13中方法监听对象的操作,大大方便了和丰富了对对象的监听操作

  - 拦截和监视外部对对象的访问
  - 可以直接监听数组的变化

- Object.defineProperty

  - 该属性设计初衷是定义对象的属性,所以有些监听操作是监听不到的

  - 对于复杂的对象,层级很深的话,需要深度监听

  - 删除属性,添加属性是不能被监听的

  - 不能监听数组的变化

    - 本质上是数组的length属性的数据属性描述符:
    - configurable: false 意味着length属性不能被修改,不能将length属性修改为存取属性描述符
    - 所以数组长度的变化的不能被监听的

    ```js
    const num = [1,2,3]
    console.log(Object.getOwnPropertyDescriptors(num))
    {
      '0': { value: 1, writable: true, enumerable: true, configurable: true },    
      '1': { value: 2, writable: true, enumerable: true, configurable: true },    
      '2': { value: 3, writable: true, enumerable: true, configurable: true },    
      length: { value: 3, writable: true, enumerable: false, configurable: false }
    }
    ```

    

## 三. 说说Reflect的作用和为什么需要使用它

- Reflect
  - 是一个对象
  - 提供了多种方法方便我们统一管理对象,在对对象进行操作时有些方法会有返回值,操作对象变的更加规范
  - Object作为构造函数,操作对象的方法放在它身上不是很合适,早期的设计不规范导致的
  - 在使用Proxy监听对象时,使用Reflect避免了对原对象的直接操作



## 四. 说说Promise的作用和使用方法（各个回调的作用）

- Promise	
  - 异步编程的一种解决方案,比传统的解决方案--回调函数-更加合理和更强大
  - 是一个对象
  - 对象的状态不受外界影响
  - 一旦状态改变,就不会再变

```js
const promise = new Promise((resolve,reject) => {
  resolve(value) //该函数执行时会回调onFulfilled
  reject(reason) //该函数执行时会回调onRejected
  console.log("这个回调函数会被立即执行~")
})

// 监听promise对象的状态 方式一
promise.then(onFulfilled).catch(onRejected)
// 监听promise对象的状态 方式二
promise.then(onFulfilled,onRejected)
```



## 五. 整理Promise的实例方法和类方法

- Promise的实例方法:
  - then(onFulfilled,onRejected)
    - onFulfilled ---->成功时的回调 
    - onRejected ----> 失败时的回调
    - 返回值是一个新的promise对象  所以promise支持链式调用的原因
  - catch(onRejected)
    - onRejected ---->失败时的回调
  - finally(callback)
    - callback ---->不管promise最后的状态,在执行完then或catch指定的回调函数后,都会执行的回调
- Promise的类方法
  - all() 
    - 接受一个数组作为参数,数组元素是promise对象,返回一个新的promise对象
    - 可以不是数组,但必须是可迭代对象,且返回的每一个成员都是Promise实例
    - 只有数组里所以的promise对象都是fulfilled状态时,返回的promsie的状态是fulfilled
    - 当数组中的promise对象有一个的rejected状态时,返回的promise的状态时rejected
  - race()
    - 接受一个数组作为参数,数组元素是promise对象,返回一个新的promise对象
    - 只要数组中的实例有一个率先改变,返回的promise对象就跟着改变
  - allSettled()
    - 接受一个数组作为参数,数组元素是promise对象,返回一个新的promise对象
    - 只有等数组中所有的promise对象都发生状态改变后,返回的promsie对象状态才会改变
    - 返回的promsie对象,一旦状态发生改变,状态总是fulfilled
  - any()
    - 接受一个数组作为参数,数组元素是promise对象,返回一个新的promise对象
    - 只要数组实例中有一个变成fulfilled状态,返回的promise对象就会变成fulfilled状态
    - 只有当数组中所有的promise实例都变成rejected状态,返回的promise 对象才变成rejected状态
  - resolve()
    - 将现有对象转为promsie实例
  - rejected()
    - 返回一个新的promsie实例,该实例的状态未为rejected































