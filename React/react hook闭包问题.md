什么是闭包陷阱

hooks的闭包陷阱是指useEffect等hook中用到某个state,但是没有把他加到deps数组里，导致state变了，但是执行的函数依然会引用之前的state



他的解决方式是正确设置deps数组，把用到的state放到deps数组里，这样每次state变了就能执行最新的函数，同时要清理上次的定时器，事件监听器等等



```
import { useEffect, useState } from 'react';

function Dong() {

    const [count,setCount] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setCount(count + 1);
        }, 500);
    }, []);

    useEffect(() => {
        setInterval(() => {
            console.log(count);
        }, 500);
    }, []);

    return <div>guang</div>;
}

export default Dong;
```

每次打印都是 0 ：

解决方式就是把 count 设置到 deps 里，并添加清理函数：

```
import { useEffect, useState } from 'react';

function Dong() {

    const [count,setCount] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCount(count + 1);
        }, 500);
        return () => clearInterval(timer);
    }, [count]);

    useEffect(() => {
        const timer = setInterval(() => {
            console.log(count);
        }, 500);
        return () => clearInterval(timer);
    }, [count]);

    return <div>guang</div>;
}

export default Dong;
```

这样就能解决闭包陷阱：

但是这种解决闭包陷阱的方式用在定时器上不是很合适。

因为现在每次 count 变了就会重置定时器，那之前的计时就重新计算，这样就会导致计时不准。

所以，这种把依赖的 state 添加到 deps 里的方式是能解决闭包陷阱，但是定时器不能这样做。

那还有什么方式能解决闭包陷阱呢？

useRef。

闭包陷阱产生的原因就是 useEffect 的函数里引用了某个 state，形成了闭包，那不直接引用不就行了？

useRef 是在 memorizedState 链表中放一个对象，current 保存某个值



初始化的时候创建了一个对象放在 memorizedState 上，后面始终返回这个对象。

这样通过 useRef 保存回调函数，然后在 useEffect 里从 ref.current 来取函数再调用，避免了直接调用，也就没有闭包陷阱的问题了。



```js
const fn = () => {
    console.log(count);
};
const ref = useRef(fn);

useLayoutEffect(() => {
    ref.current = fn;
});

useEffect(() => {
    setInterval(() => ref.current(), 500);
}, []);
```

useEffect 里执行定时器，deps 设置为了 []，所以只会执行一次，回调函数用的是 ref.current，没有直接依赖某个 state，所以不会有闭包陷阱。

用 useRef 创建个 ref 对象，初始值为打印 count 的回调函数，每次 render 都修改下其中的函数为新创建的函数，这个函数里引用的 count 就是最新的。

这里用了 useLayoutEffect 而不是 useEffect 是因为 useLayoutEffect 是在 render 后同步执行的，useEffect 是在 render 后异步执行的，所以用 useLayoutEffect 能保证在 useEffect 之前被调用。

这种方式避免了 useEffect 里直接对 state 的引用，从而避免了闭包问题。

另外，修改 count 的地方，可以用 setCount(count => count + 1) 代替 setCount(count + 1)，这样也就避免了闭包问题：

```js
useEffect(() => {
    setInterval(() => {
        setCount(count => count + 1);
    }, 500);
}, []);
```

```js
import { useEffect, useLayoutEffect, useState, useRef } from 'react';


function Dong() {

    const [count, setCount] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setCount(count => count + 1);
        }, 500);
    }, []);

    const fn = () => {
        console.log(count);
    };
    const ref = useRef(fn);

    useLayoutEffect(() => {
        ref.current = fn;
    });

    useEffect(() => {
        setInterval(() => ref.current(), 500);
    }, []);

    return <div>guang</div>;
}

export default Dong;
```

确实，打印也是正常的，这就是解决闭包陷阱的第二种方式，通过 useRef 避免直接对 state 的引用，从而避免闭包问题。

我们通过把依赖的 state 添加到 deps 数组中的方式，使得每次 state 变了就执行新的函数，引用新的 state，从而解决了闭包陷阱问题。

这种方式用在定时器上是不合适的，因为定时器一旦被重置和重新计时，那计时就不准确了。

所以我们才用了避免闭包陷阱的第二种方式：使用 useRef。

useRef 能解决闭包陷阱的原因是 useEffect 等 hook 里不直接引用 state，而是引用 ref.current，这样后面只要修改了 ref 中的值，这里取出来的就是最新的。

然后我们把这段逻辑封装成了个自定义 hook，这样可以方便复用。

解决 hooks 的闭包陷阱有两种方式：

- 设置依赖的 state 到 deps 数组中并添加清理函数
- 不直接引用 state，把 state 放到 useRef 创建的 ref 对象中再引用

处理定时器的时候，为保证计时的准确，最好使用 useRef 的方式，其余情况两种都可以。