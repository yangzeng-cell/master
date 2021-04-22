# 一、组件目录结构

- 父组件：app.vue
- 子组件：page1.vue
- 子组件：page2.vue

## 父组件 app.vue

<template>
  <div id="app">
    <p>请输入单价: <input type="text" v-model="price"></p>
    <page1 :price="price" @downPrice="downPrice"></page1>
    <page2></page2>
  </div>
</template>

<script>
import Page1 from "./components/page1";
import Page2 from "./components/page2";
export default {
  name: "App",
  data() {
    return {
      price: ""
    };
  },
  components: {
    Page1,
    Page2
  },
  methods: {
    downPrice() {
      this.price = (this.price - 1).toString();
    }
  }
};
</script>

## 子组件 page1.vue

<template>
    <div>
        <p><span>单价：</span><span>{{price}}</span> <button @click="downPrice">降价1元</button></p>
        <p>数量: {{count}} </p>

    </div>
</template>
<script>
import bus from  '../eventBus.js'
export default {
    props:{
        price:{
            type:String,
            default:''
        }
    },
    data(){
        return{
            count:10
        }
    },
    methods:{
        downPrice(){
            this.$emit('downPrice')
        }
    },
    watch:{
       price(newPrice){
          bus.$emit('priceChange',newPrice,this.count) 
       } 
    }
}
</script>

## 子组件 page2.vue

<template>
    <div>
        <p>
            <span>总金额：{{totalMoney}}元 </span>剩余金额：
            <span>{{balance}}元</span>
        </p>
    </div>
</template>
<script>
import bus from "../eventBus.js";
export default {
  data() {
    return {
      balance: 1000,
      totalMoney: 1000
    };
  },
  mounted() {
    bus.$on("priceChange", (price, count) => {
      this.balance = this.totalMoney - price * count;
    });
  }
};
</script>

# 二、通信过程介绍

## 1.父组件向子组件传值

### 1.1在父组件中引入需要通信的子组件

```
import Page1 from "./components/page1";
```

### 1.2 在父组件的`components`中注册该子组件

```
components: {
    Page1
  }
```

### 1.3 在父组件的`template`中使用子组件

```
<page1></page1>
```

### 1.4 将需要传递给子组件的值通过`v-bind(如果传递的是固定值，则不需要v-bind，直接属性名，属性值传递即可)`。

```
<page1 :price="price"></page1>

//  此处的price则是传递给子组件的值
```

### 1.5 在对应的子组件中，通过`props`属性接收传递过来的值

```
props:{
        price:{
            type:String,
            default:''
        }
  }
```

### 1.6 在子组件中使用该值

```
<p><span>单价：</span><span>{{price}}</span></p>
```

## 2.子组件向父组件中传值

### 2.1 在page1.vue中，通过触发子组件的方法(这里是自定义的`downPrice`方法),

```
 <p><span>单价：</span><span>{{price}}</span> <button @click="downPrice">降价1元</button></p>
```

### 2.2 在子组件的`methods`的`downPrice`中，通过`this.$emit()`,将事件和参数传递给父组件

```
downPrice(count){
            this.$emit('downPrice',count)
  }

// downPrice 是传递给父组件的事件，父组件触发并相应这个方法
// count 传递给父组件的参数，在父组件中，可以对和这个参数进行相应操作
```

### 2.3 在父组件中接受子组件传递的事件`downPrice`和数据

```
<page1 :price="price" @downPrice="downPrice"></page1>
```

### 2.4 父组件对接收到的事件和数据做出响应

```
downPrice(count) {
      this.price = (this.price - 1).toString();
      // this.price = (this.price - count).toString();
    }
```

## 3、父组件调用子组件方法

```
方法一：
```

### 3.1 在使用子组件时，给子组件加一个`ref`引用

```
<page1 :price="price" @downPrice="downPrice" ref="page1"></page1>
```

### 3.2 父组件通过`this.$refs`即可找到该子组件，也可以操作子组件的方法

```
this.$refs.page1.子组件方法
```

打印出获取到的子组件信息：

![clipboard.png](https://segmentfault.com/img/bVbetkC?w=751&h=571)

![img](D:\memo\JavaScript\img\2502360935-5b5d1907999c5_fix732)

```
方法二：
```

### 3.3 通过`$children`,可以获取到所有子组件的集合

```
this.$children[0].某个方法
```

## 4、子组件调用父组件方法

### 4.1 通过 `$parent`可以找到父组件，进而调用其方法

```
this.$parent.父组件方法
```

打印出的父组件信息
![clipboard.png](https://segmentfault.com/img/bVbetkF?w=810&h=586)

![img](D:\memo\JavaScript\img\4009007548-5b5d19837cd7a_fix732)

## 5、平级组件通信

**同级组件不能直接传值，需要一个中间桥梁，可以先将数据传递给公共的父组件，然后父组件再将数据传递给需要的子组件。**

### 5.1 定义一个公共文件 `eventBus.js`

代码很简单(就2句)，只是创建一个空的vue实例

```
import Vue from 'vue'
export default new Vue()
```

### 5.2 在需要通信的同级组件中分别引入`eventBus.js`文件

```
import bus from '../eventBus.js'
```

### 5.3 在page1.vue中，通过`$emit`将事件和参数传递给page2.vue

```
price(newPrice){
          bus.$emit('priceChange',newPrice,this.count) 
} 
```

### 5.4 在page2.vue 中，通过`$on`接收接收参数和相应事件

```
bus.$on("priceChange", (price, count) => {
      this.balance = this.totalMoney - price * count;
    });
```

> **一般大型的项目，推荐使用[\**Vuex\**](https://vuex.vuejs.org/zh-cn/intro.html)来管理组件之间的通信**