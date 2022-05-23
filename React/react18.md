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
 	检测意外的副作用
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
 39.单向数据流
 40.react动画中<TransitionGroup>中需要再用<cssTransition>包裹,否则会报错
```
