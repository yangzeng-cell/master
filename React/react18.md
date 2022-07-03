1. react中，方法中this的默认是指向undefined的，

2. vscode创建用户代码片段

3. ```
   jsx写注释{/* */}
    render(){
       return (
         <div>
           {/*这是一段注释*/}
         </div>
       )
     }
   }
   ```

​    4.

```
 //这三个值无法在jsx中渲染出来
    test1:undefined
    test2:null
    text3:false
```

```
5.在jsx中对象类型不可以作为子元素,进行直接展示
<div>{this.state.obj}</div>
6.jsx嵌入表达式
	运算表达式
	三元运算符
	执行一个函数
	
7.jsx中的class用className
8.jsx中style的写法<h1 style={{color:"red",fontSzie:"24px"}}>hello world</h1>

9.react的事件绑定
	react的事件绑定方法中this默认是undefined
	this的绑定的三种方式
	1. this.click1=this.click1.bind(this)
	2.click2=()=>{
    this.setState({
      num:this.state.num+1
    })
  }
  	3.<button onClick={()=>{
          this.click3()
        }}>点击3</button>
 10.react事件的传参
 	  <button onClick={(e)=>{
          this.click3(e,item,name)
        }}>点击3</button>
        可以用来传递event
        
 在执行事件函数时，有可能我们需要获取一些参数信息：比如event对象、其他参数
 情况一：获取event对象
 很多时候我们需要拿到event对象来做一些事情（比如阻止默认行为）
 假如我们用不到this，那么直接传入函数就可以获取到event对象；
 情况二：获取更多参数
 有更多参数时，我们最好的方式就是传入一个箭头函数，主动执行的事件函数，并且传入相关的其他参数
 
 11.react的列表渲染使用最多的是使用map
 	过滤filter
 	截取slice
 12.React.createElement() jsx是他的语法糖
 13.render() 将virtual Dom=>Dom
 14.频繁的操作DOM，会产生回流和重绘
 15.React 组件名称首字母必须大写 html标签必须小写
 	类组件需要继承自 React.Component
 	 类组件必须实现render函数
 16.函数式组件
 	 没有生命周期，也会被更新并挂载，但是没有生命周期函数；
 	 没有this(组件实例）；
	 没有内部状态（state）
 17.render函数、函数式组件的返回类型
 		组件，html元素
 		数组、fragments
 		Portals
 		字符串或者数值类型
 		Boolean，null
 18.react的生命周期
    常用的生命周期函数
    	1.contructor(){
    	
    	}
         如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数。
         constructor中通常只做两件事情：
         通过给 this.state 赋值对象来初始化内部的state；
         为事件绑定实例（this）；
 		2.componentDidMount()
 		  componentDidMount() 会在组件挂载后（插入 DOM 树中）立即调用	
 		  可以进行网络请求，添加订阅
 		3.componentDidUpdate(prevProps, prevState, snapshot)
 		  会在更行后立即调用，首次渲染不会执行，可以使用setState方法，但是必须用于条件语句
 		4.componentWillUnmount()
 		  可以用于清楚timer,取消网络请求，取消订阅
 		  
   19.组件通信
   	  1.父组件向子组件传递数据 传递参数是常量非string的时候要将其当作变量用{}
   	  	<Children2 name="里斯" age={55}></Children2>
   	  2.子组件向父组件传递数据，定义回调函数传递给子组件调用
   	  3.跨组件通信Context，可以使用组件的组合来替代Context
   	  4.使用事件总线
   20.对props进行类型检查 propTypes
   		Children2.propTypes = {
          // 必填属性
          name: PropTypes.string.isRequired,
          age: PropTypes.number,
          time:PropTypes.array
        };
        // 可以定义默认·值
        Children2.defaultProps={
          time:["2022/5/11","2022/5/6"]
        }
        
    21.props为什么不写也是可以的
    	 constructor(){
            super()
            this.state={}
          }
       因为react内部会强制性给当前实例复制props
       this.instance=element.props
       
    22.组件插槽的实现
    23.setState
       setState是异步更新，可以显著提升性能
       如果每一次调用setState都进行一次更新，那么意味着render函数需要频繁的调用
       最好的办法是获取多个更新，之后进行批量更新
       如果同步更新了state,但是还没执行render函数，那么state和props不能保持同步
       state和props不能保持一致性，会在开发中产生很多问题
       
       为了拿到异步更新后的数据
     24.组件创建的时候会被调用一次
     25.render函数，组件更新时调用render函数会让所有子组件都会进行一次更新。使用shouldComponentUpdate这个生命周期函数可以控制state和props发生变化时是否重新调用render函数
               shouldComponentUpdate(nextProps,nextState){
            if(this.state.num!==nextState.num){
              return true
            }
            return false
          }
        在开发中每个组件都写shouldComponentUpdate比较麻烦，可以在使用PureComponent
        class Man extends React.PureComponent
     26.PureComponent不能用于函数式组件，需要用memo
     27.state中的属性的不可变性
     28.react不建议直接在操作dom，可以使用ref
     	使用ref的三种方式
```

```37
import React,{createRef} from "react";
class RefDemo extends React.Component{
  constructor(props){
    super(props)
    this.state={}
    this.titleRef=createRef()
    // 第三种使用函数
    this.textInput = null;
  }
  componentDidMount(){
   
  }
  componentWillUnmount(){
    
  }
  changeRef1(){
    // 方式一已经被淘汰了
    this.refs.refTitle.innerHTML="hello ref"
  }
  changeRef2(){
    // 官方推荐以这种方式
     this.titleRef.current.innerHTML="hello big"
    console.log(this.titleRef.current)
  }
  focusTextInput(){
    this.textInput.focus()
    console.log(this.textInput)
  }
  render(){
    return (
      <div>
        <h1 ref="refTitle">hello react</h1>
        <button onClick={()=>this.changeRef1()}>按钮1</button>
        <h1 ref={this.titleRef}>hello world</h1>
        <button onClick={()=>this.changeRef2()}>按钮2</button>
        <button onClick={()=>this.focusTextInput()}>focus</button>
        <div><input ref={element=>this.textInput=element} type="text" /></div>
      </div>
    )
  }
}


export default RefDemo


函数式组件中没有ref属性，要使用const textInput = useRef(null);
可以通过ref访问子组件的方法和属性和vue一样
26.受控组件
27.非受控组件
28.高阶组件
29.ref的转发，获取函数式组件内部的ref 可以使用forwardRef高阶函数
30.Portals的使用，用于将渲染元素独立于父组件，渲染到其他元素之上。使用React.createPortal(child,container)
31.fragment的使用，相当于vue的template在实际的dom中不渲染，带key的时候不能使用短语法
	还可以使用短语发
            class Columns extends React.Component {
      render() {
        return (
          <>
            <td>Hello</td>
            <td>World</td>
          </>
        );
      }
    }
 32.StrictMode 开启react的严格模式，只有开发环境下起作用
 	可以识别不安全的生命周期
 	过时的ref的警告
 	检测意外的副作用。有些组件可能会调用两次
 	检测过时的context api 
 33.react中的css
 	1.内联样式
 	2.css modules
 	 	要创建moudle.css文件
 	 	不能使用连接符创建类名，js不支持，需要使用{style.className}来编写
 	 	不方便更改样式
 	 3.css in js
 	 	常用的 css in js库
 	 		styled-components
 	 		emotion
 	 		glamorous
 34.axios中，axios({})这样是使用他默认创建的实例，如果要自己创建一个实例要使用axios.create({})
 35.react-transition-group
 36.react纯函数
 37.node中对ES6模块化的支持 在13.2.0以后对es6的支持，需要在package.json中添加属性"type":"module",导入文件时要跟上.js后缀名
 38.redux
 	redux主要是负责状态管理
 	store:createStore(reducer,..)
 	state:通过store.getState()来获取当前state
 	react的组成
 		action:是用来更新数据，所有的数据变化，必须通过dispatch来派发action来更新，action可以是一个对象，也可以是一个函数，函数必须返回一个对象
 		reducer：是将state和action连接起来，reducer是一个纯函数，reducer是将传入的reducer和action整和成为一个新的state
 		dispatch:用来派发action
 	redux的三大原则
 		1.单一数据源
 		2.state是只读的
 		3.使用纯函数来执行修改
 39.单向数据流
 40.react动画中<TransitionGroup>中需要再用<cssTransition>包裹,否则会报错
 41.react-router
 	默认是模糊匹配
 42.react-hook
 	import React from "react"//这个是在函数式组件和类组件都要写，因为jsx是React.createElement()的语法糖，会在内部调用
 	useState()
 	Hook的使用规则：
 		只能在函数最外层调用Hook,不要在循环，条件判断或者子函数中调用
 		只能在React的函数组件中调用Hook,不要再其他js函数中使用
 		
 	 const [count, setCount] = useState(() => 10);//useState可以传入一个函数

  console.log("CounterHook渲染");

  function handleBtnClick() {
    // setCount(count + 10);
  
 
    setCount((prevCount) => prevCount + 10);//preCount是上一个count
    
    如果你的更新函数返回值与当前 state 完全相同，则随后的重渲染会被完全跳过。
    与 class 组件中的 setState 方法不同，useState 不会自动合并更新对象。你可以用函数式的 	setState 结合展开运算符来达到合并更新对象的效果。
    setState(prevState => {
      // 也可以使用 Object.assign
      return {...prevState, ...updatedValues};
    });
    useReducer 是另一种可选方案，它更适合用于管理包含多个子值的 state 对象。


 43.useEffect()
 	useEffect(() => {
    console.log("订阅一些事件");

    return () => {
      console.log("取消订阅事件")
    }
  }, []);//通过返回一个函数来执行类似componmentwillumnount来清除副作用，[]这个可以作为优化，只有在组件切换时才执行，[]只会执行一次，相当于是componentDiMount,componentWillUnmount
  44.useEffect第二个参数
   useEffect(() => {
    console.log("修改DOM", count);
  }, [count]);//useEffect可以让某个属性发生改变时才执行，这个属性必须在useEffect的回调函数中有使用到
  如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。这并不属于特殊情况 —— 它依然遵循依赖数组的工作方式。
  45.useContext的使用
  46.useCallback的使用
  47.useMemo的使用
  48.useCallback是针对回调函数进行优化，useMemo是对返回值进行优化
  49.Refs的转发
  		就是父组件想获取到子组件的ref,在高阶组件中转发refs
  		可以使用React.forwardRef()
  		const ref=useRef(initialValue)//初始化值后不会发生改变
  		
  		
  		export default function RefHookDemo02() {
  const [count, setCount] = useState(0);

  const numRef = useRef(count);

  useEffect(() => {
    numRef.current = count;
  }, [count])

  return (
    <div>
      {/* <h2>numRef中的值: {numRef.current}</h2>
      <h2>count中的值: {count}</h2> */}
      <h2>count上一次的值: {numRef.current}</h2>
      <h2>count这一次的值: {count}</h2>
      <button onClick={e => setCount(count + 10)}>+10</button>
    </div>
  )
}//useEffect和useRef结合使用可以修改numRef.current
50.useImperativeHandle要和React.forwardRef()一起使用
51.自定义hook：就是将react的hook封装成函数
52.fiber的原理
53.不要在条件表达式中使用hook
54.使用normailze.css对项目进行初始化
	使用@craco/craco修改react 配置
		修改webpack的alias
	使用react-config-router进行路由配置
	使用styled-compoments进行写css样式
		background:url(${reuire()})//需要使用require来引入图片
		搜索框使用antDesign
		数据都是用redux来管理
		用redux-thunk进行异步请求
		配置redux-devtool
		将各个模块的redux分开写再各个文件中，然后进行合并，使用combineReducers
		store使用Provider进行传递
		所有组件用memo()包裹管理
		使用redux的hook:useDispatch()
					   useSelector(state=>({}),shallowEqual)
					   shallowEqual//进行浅层比较,做优化
		Immutablejs可以解决使用拷贝来决绝数据可变性的问题，带来的性能问题
			const im=immutable
			const info={}
			const imfoIM=im(info)
			imfoIm.set()
			imfoIM.get()
			imfoIm.list()
			imfoim.fromJS()//深层次转换
		2.只能再react函数中调用成immutable类型 
			state.getIn(["a","b"])//相当于a.b
			styled-components的传参
			使用useCallback对需要传给子组件的函数进行包裹，可以有缓存，并提高性能
			
			使用 redux-immutable中的commineReducer来优化combineReducer,提高性能
			
55 Hook的本质就是javascript函数，他要遵循两条规则
	1.只在最顶层使用hook
		不要再循环，条件或者嵌套函数中调用hook,确保总是再你的react函数的最顶层去调用他们
		遵守这条规则，你就能确保 Hook 在每一次渲染中都按照同样的顺序被调用。这让 React 能够在多次的 useState 和 useEffect 调用之间保持 hook 状态的正确
	2.只能再react函数中调用Hook
	  不要在普通的javascript中调用hook,可以在reat函数组件中调用hook,也可以在在定义hook中调用其他hook
56.自定义HOOK一定要以use开头
57.在两个组件中使用相同的 Hook 会共享 state 吗？不会。自定义 Hook 是一种重用状态逻辑的机制(例如设置为订阅并存储当前值)，所以每次使用自定义 Hook 时，其中的所有 state 和副作用都是完全隔离的。
58.自定义 Hook 如何获取独立的 state？每次调用 Hook，它都会获取独立的 state
	由于我们直接调用了 useFriendStatus，从 React 的角度来看，我们的组件只是调用了 useState 和 useEffect
59.惰性初始化state
```

`initialState` 参数只会在组件的初始渲染中起作用，后续渲染时会被忽略。如果初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用：

```
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

#### 60.useEffect是在每一轮渲染结束后执行

61.组件卸载时需要清除effect创建的订阅，定时器等，useEffect函数需要返回一个清理函数

```
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // 清除订阅
    subscription.unsubscribe();
  };
});
```

为防止内存泄漏，清除函数会在组件卸载之前执行。另外，如果组件多次渲染，则会在子啊个effect之前，上一个effect就会被清除

###### 62.effect的执行时机

与componentDidMount,cimponentDidUpadate不同的是，在浏览器完成布局与绘制之后，

传给useEffect的函数会延迟调用，这使得它适用于许多常见的副作用场景，比如设置订阅和事件处理情况，因此不应在函数值执行阻塞浏览器更新的操作

###### 63.useContext

​	

```
const MyContext= React.createContext(value)

const value = useContext(MyContext);

```

myContext是React.createContext的返回值，并返回该context的当前值，当前的value值由

他的上层组件距离当前组件最近的<MyContext.Provider>的value prop决定的

当Provider中的value发生更新的时候，useContext就会出发重新渲染，即使组件时使用React.emo包裹，或者使用shouldComponentUpdat生命周期，该组件都会重新渲染

只要MyConetext里面的值发生改变，使用了useContext的组件都会重新渲染，如果重新渲染开销大，可以使用memoization来优化

useContext(MyContext)===>class中的static contextType=MyContext或者<MyContext.Consumer>

`useContext(MyContext)` 只是让你能够*读取* context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用 `<MyContext.Provider>` 来为下层组件*提供* context。

###### 64.`useReducer`

```
const [state, dispatch] = useReducer(reducer, initialArg, init);

useState的替代方案
在某些场合会比useState更加适用，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等。并且，使用 useReducer 还能给那些会触发深更新的组件做性能优化，因为你可以向子组件传递 dispatch 而不是回调函数 。
```

```
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

#### 惰性初始化

useReducer的第三个参数传入一个函数，这样初始state将设置为传入函数的返回值

可以通过外部来传入

```
function init(initialCount) {
  return {count: initialCount};
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}

```

如果 Reducer Hook 的返回值与当前 state 相同，React 将跳过子组件的渲染及副作用的执行。（React 使用 [`Object.is` 比较算法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description) 来比较 state。）

如果你在渲染期间执行了高开销的计算，则可以使用 `useMemo` 来进行优化。

useReducer不可以作为redux的替代方案，不可以进行数据共享

65.使用memo包裹函数，可以进行性能优化，会对props进行浅层比较，如果props没有发生更新，则不会重新渲染

66.没有优化以前。父组件发生改变子组件也会重新渲染

67.useCallback

返回一个 [memoized](https://en.wikipedia.org/wiki/Memoization) 回调函数。

把内联回调函数及依赖项数组作为参数传入 `useCallback`，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 `shouldComponentUpdate`）的子组件时，它将非常有用。

![](C:\Users\10152\Desktop\study\memo\React\QQ截图20220620112711.png)

![QQ截图20220620112901](C:\Users\10152\Desktop\study\memo\React\QQ截图20220620112901.png)

68.useMeno

​	`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`。

useCallback是返回[memoized](https://en.wikipedia.org/wiki/Memoization) 回调函数。useMeno是返回一个memoized值

useMemo只会在依赖项发生改变时才会重新计算执行，返回新的值，避免每次渲染时都进行高开销的计算

记住，传入 `useMemo` 的函数会在渲染期间执行。请不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作属于 `useEffect` 的适用范畴，而不是 `useMemo`。

如果没有提供依赖项数组，`useMemo` 在每次渲染时都会计算新的值

![](C:\Users\10152\Desktop\study\memo\React\QQ截图20220620131653.png)

![QQ截图20220620131701](C:\Users\10152\Desktop\study\memo\React\QQ截图20220620131701.png)

69.useRef

useRef返回一个ref对象，返回的ref对象在组件的整个生命周期保持不变

最常用的ref是两种用法

​	1.引入DOM(或者是class组件)元素，不可以用在函数组件中

​	2.保存一个数据，这个对象在整个生命周期中可以保持不变

![](C:\Users\10152\Desktop\study\memo\React\QQ截图20220620143141.png)

![QQ截图20220620143158](C:\Users\10152\Desktop\study\memo\React\QQ截图20220620143158.png)

70.`useImperativeHandle`

useImperativeHandle要和forwardRef结合使用，使用useImperativeHandle可以使父元素不可以对子组件中的ref进行随意操作

![](C:\Users\10152\Desktop\study\memo\React\QQ截图20220620143648.png)

![QQ截图20220620143735](C:\Users\10152\Desktop\study\memo\React\QQ截图20220620143735.png)

71.useLayoutEffect

​	和useEffect的区别是

​	useEffect会在渲染的内容更新到DOM之后再执行，而不会阻塞DOM的更新

​	useLayoutEffect会在渲染的内容更新到DOM上之前执行，会阻塞DOM的更新

​	![](C:\Users\10152\Desktop\study\memo\React\QQ截图20220620144244.png)

![QQ截图20220620144253](C:\Users\10152\Desktop\study\memo\React\QQ截图20220620144253.png)

72.redux-thunk

​	 使用中间件目的是再dispatch的action和reducer之间扩展自己的代码，例如日志记录，调用异步接口，添加代码调试功能等等

​	可以使用redux-thunk发送异步请求

​	1.通常情况下。dispatch(action),actionn余姚是一个javascript对象

​	2.redux-thunk可以让dispatch(action函数)，action可以是一个函数

​	3.这个函数被调用的时候，会返回一个函数并给这个函数传一个patch,getState函数

​				dispatch函数用于再次派发action

​				getState函数获取到之前的状态

![](C:\Users\10152\Desktop\study\memo\React\QQ截图20220620161818.png)

![](C:\Users\10152\Desktop\study\memo\React\QQ截图20220620162945.png)

###### 73.redux-devtools

是用来对redux中的状态进行跟踪调试

![](C:\Users\10152\Desktop\study\memo\React\QQ截图20220620163435.png)

##### 74.combineReducers

redux中提供了一个函数combineReducers来合并多个reducer

combinerReducer的实现

​	它会将reducer合并，并且返回一个combation函数相当于是新的reducer

​	在执行combination函数的过程中，它会通过判断前后返回的数据是否相同来决定返回之前的state还是新的state；

   新的state会触发订阅者发生对应的刷新，而旧的state可以有效的组织订阅者发生刷新；

![](C:\Users\10152\Desktop\study\memo\React\QQ截图20220620163958.png)

##### 75.useSelector()

```
import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'

export const CounterComponent = () => {
  const counter = useSelector((state) => state.counter,shallowEqual)
  return <div>{counter}</div>
}
//在hook中使用redux,使用useSlectore来获取state
```

##### 76.`useDispatch()`

```
const dispatch = useDispatch()//派发action
```

```
export const Todos = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
    // Safe to add dispatch to the dependencies array
  }, [dispatch])
}
```

##### 77.`useStore()`

替代createStore()
