# Day10 作业布置

## 一. 完成课堂所有的代码







## 二. 整理Promise的实例方法和类方法

- **实例方法       存放在Promise的prototype上**

  - **then方法       可以接收两个参数**
    - `fulfilled`的回调函数：当状态变成`fulfilled`时会回调的函数
    - `reject`的回调函数`reject`
  - **then方法多次调用**
    - 每次调用我们都可以传入对应的`fulfilled`回调
    - 当`Promise`变成的时候回调函数都会被执行
  - **catch方法      可以多次调用**
    - 每次调用我们都可以传入对应的`reject`回调
    - 当`Promise`的状态变成`reject`的时候，这些回调函数都会被执行
  - **finally方法** 
    - `Promise`对象无论变成`fulfilled `还是`rejected`状态, 最终都会被执行的代码
    - `finally`方法是不接收参数的，因为无论前面是`fulfilled`状态，还是`rejected`状态，它都会执行

- **类方法**

  - **resolve方法**

    - 有现成内容, 希望将其转成`Promise`来使用, 这个时候可以使用`Promise.resolve`方法来完成

      ```js
      //Promise.resolve的用法相当于new Promise，并且执行resolve操作
      Promise.resolve("YOYO")
      // 上面等价于下面的一行语句
      new Promise(resolve => {"YOYO"})
      ```

      

    - 参数形态

      - 情况一:   如果`resolve`传入一个普通的值或者对象，那么这个值会作为`then`回调的参数；
      - 情况二：如果`rsolve`中传入的是另 外一个`Promise`，那么这个新`Promise`会决定原`Promise`的状态
      - 情况三:   如果`resolve`中传入的是一个对象, 并且这个对象有实现`then`方法, 那么会执行`then`方法, 并且根据`then`方法的结果来决定`Promise`的状态

  - **reject方法**

    - `reject`方法类似于`resolve`方法，只是会将`Promise`对象的状态设置为`reject`状态。

    - `Promise.reject`的用法相当于`new Promise`，只是会调用`reject`

      ```js
      Promise.reject("YoYO")
      // 相当于
      new Promise((resolve, reject ) => reject("YOYO"))
      ```

      

    - 参数形态

      - `Promise.reject`传入的参数无论是什么形态，都会直接作为`reject`状态的参数传递到`catch`的

  - **all方法**

    - all方法有一个缺陷：当有其中一个`Promise`变成`reject`状态时，新`Promise`就会立即变成对应的`reject`状态

    - 作用是将多个`Promise`包裹在一起形成一个新的`Promise`

      - 新的`Promise`状态由包裹的所有`Promise`共同决定

        - 当所有的`Promise`状态变成`fulfilled`状态时，新的`Promise`状态为`fulfilled`，并且会将所有`Promise`的返回值组成一个数组

        - 当有一个`Promise`状态为reject时，新的`Promise`状态为`reject`，并且会将第一个`reject`的返回值作为参数

          ```js
          // all:全部/所有    p1, p2, p3 是new 出来的Promise对象
          Promise.all([p1, p2, p3]).then(res => {
              console.log("all promise res:", res)
          }).catch(err => {
              console.log("all promise err:", err)
          })
          ```

  - **allSettled方法**

    - 该方法会在所有的`Promise`都有结果（`settled`），无论是`fulfilled`，还是`rejected`时，才会有最终的状态

    - 并且这个的结果一定是的

      ```js
      // 类方法: allSettled
      Promise.allSettled([p1, p2, p3]).then(res => {
          console.log("all settled:", res)
      })
      ```

  - **race方法**

    - 多个Promise相互竞争，谁先有结果，那么就使用谁的结果

      ```js
      // 类方法: race方法
      // 特点: 会等到一个Promise有结果(无论这个结果是fulfilled还是rejected)
      Promise.race([p1, p2, p3]).then(res => {
          console.log("race promise:", res)
      }).catch(err => {
          console.log("race promise err:", err)
      })
      ```

  - **any方法**

    - `any`方法会等到一个`fulfilled`状态，才会决定新`Promise`的状态；

    - 如果所有的`Promise`都是`reject`的，那么也会等到所有的`Promise`都变成`rejected`状态, 会报一个**`AggregateError`**的错误

      ```js
      / any promise err: AggregateError: All promises were rejected
      ```

      



## 三. 什么是迭代器？什么是可迭代对象？

* **迭代器**

  * 迭代器是帮助我们对某个数据结构进行遍历的对象

  * 迭代器也是一个具体的对象，这个对象需要符合迭代器**协议**

    * 迭代器协议定义了产生一系列值（无论是有限还是无限个）的标准方式
    * 在`JavaScript`中这个标准就是一个特定的`next`方法

  * `next`方法的要求

    * 一个无参数或者一个参数的函数，返回一个应当拥有以下两个属性的对象：
    * `done`（`boolean`）
      * 如果迭代器可以产生序列中的下一个值，则为 `false`。（这等价于没有指定 `done `这个属性。）
      * 如果迭代器已将序列迭代完毕，则为 `true`。这种情况下，`value `是可选的，如果它依然存在，即为迭代结束之后的默认返回值。
    * `value`
      * 迭代器返回的任何 `JavaScript `值。`done `为 `true `时可省略

    ```js
    // 封装一个为数组创建迭代器的函数
    function createArrayIterator(arr) {
        let index = 0
        return {
            next: function() {
                if (index < arr.length) {
                    return { done: false, value: arr[index++] }
                } else {
                    return { done: true }
                }
            }
        }
    }
    ```

    

* **可迭代对象 **

  *  和迭代器不是一个概念

    * 当一个对象实现了`iterable protocol`协议时，它就是一个可迭代对象；
    * 这个对象的要求是必须实现 `@@iterator`方法，在代码中我们使用 `Symbol.iterator `访问该属性

  * 转成这样的好处

    * 当一个对象变成一个可迭代对象的时候，就可以进行某些迭代操作
    * 比如 `for...of` 操作时，其实就会调用它的` @@iterator` 方法

  * 实现可迭代协议的原生对象

    * `String`、`Array`、`Map`、`Set`、`arguments`对象、`NodeList`集合...

  * 可迭代对象的应用

    * JavaScript中语法：`for ...of`、展开语法（`spread syntax`）、`yield*`、解构赋值（`Destructuring_assignment`）
    * 创建一些对象时：`new Map([Iterable])、new WeakMap([iterable])、new
      Set([iterable])、new WeakSet([iterable])`
    * 一些方法的调用：`Promise.all(iterable)、Promise.race(iterable)、Array.from(iterable)`

  * 迭代器的中断

    * 比如遍历的过程中通过`break、return、throw`中断了循环操作
    * 比如在解构的时候，没有解构所有的值

  * 自定义类的迭代实现

    ```js
    class Person {
          constructor(name, age, height, friends) {
            this.name = name
    		...
          }
          // 实例方法
          running() {}
    /      [Symbol.iterator]() {
            let index = 0
            const iterator = {
              next: () => {
                if (index < this.friends.length) {
                  return { done: false, value: this.friends[index++] }
                } else {
                  return { done: true }
                }
              }
            }
            return iterator
          }
        }
    ```

    

## 四. 什么是生成器？生成器和迭代器有什么关系？

* **生成器  (ES6新增)** 

  * 生成器函数也是一个函数，但是和普通的函数有一些区别

    * 首先，生成器函数需要在function的后面加一个符号：*
    * 其次，生成器函数可以通过yield关键字来控制函数的执行流程：
    * 最后，生成器函数的返回值是一个（生成器）
      * 生成器事实上是一种特殊的迭代器

  * 生成器函数

    ```js
    生成器函数: 
    1.function后面会跟上符号: *
    2.代码的执行可以被yield控制
    3.生成器函数默认在执行时, 返回一个生成器对象
        * 要想执行函数内部的代码, 需要生成器对象, 调用它的next操作
        * 当遇到yield时, 就会中断执行
    ```

    

  * 生成器传递参数 -- next函数

    * 调用next函数的时候，可以给它传递参数，那么这个参数会作为上一个yield语句的返回值
    * 也就是说我们是为本次的函数代码块执行提供了一个值

  * 生成器提前结束

    * return传值后这个生成器函数就会结束，之后调用next不会继续生成值

  * 生成器抛出异常 -- throw函数

    * 抛出异常后我们可以在生成器函数中捕获异常
    * 但是在catch语句中不能继续yield新的值了，但是可以在catch语句外使用yield继续中断函数的执行

  * 生成器替代迭代器

    * 使用yield来生产一个可迭代对象
    * 这个时候相当于是一种yield的语法糖，只不过会依次迭代这个可迭代对象，每次迭代其中的一个值

    ```js
    function* createArrayIterator(arr) {
        yield* arr
    }
    ```

  * 自定义类迭代 -- 生成器实现

    ```js
    // 以Person为例  添加到实例方法
    *[Symbol.iterator]() {
        yield* this.friends
    }
    ```

    

## 五. 预习





























