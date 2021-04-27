> - 原文地址：[Getting Your Head Around Vue.js Scoped Slots](https://vuejsdevelopers.com/2017/10/02/vue-js-scoped-slots/)
> - 原文作者：Anthony Gore
> - 译者：Chor

作用域插槽是 Vue.js 中一个很有用的特性，可以显著提高组件的通用性和可复用性。问题在于，它实在不太好理解。尝试搞清楚父子作用域之间错综复杂的关系，其痛苦程度不亚于求解一个棘手的数学方程。

当你无法理解一个东西的时候，最好的办法就是在解决问题的过程中体会它的应用。本文将向你展示如何使用作用域插槽构建一个可复用的列表组件。

![img](https://segmentfault.com/img/remote/1460000020643552)

![img](D:\memo\JavaScript\img\24409827-5d9f21947b0d0_fix732)

> 注意: 完整代码可以去 [Codepen](https://codepen.io/anthonygore/pen/zExPZX)点击预览 查看

## 最基础的组件

我们即将构建的组件叫做 `my-list` ，用来展示一系列的项目。它的特别之处就在于，你可以在每次使用组件的时候自定义列表项目的渲染方式。

我们先从最简单的单个列表开始：一个包含几何图形名字和边数的数组。

*app.js*

```
Vue.component('my-list', {
  template: '#my-list',
  data() {
    return {
      title: 'Shapes',
      shapes: [ 
        { name: 'Square', sides: 4 }, 
        { name: 'Hexagon', sides: 6 }, 
        { name: 'Triangle', sides: 3 }
      ]
    };
  }
});

new Vue({
  el: '#app'
});
```

*index.html*

```
<div id="app">
  <my-list></my-list>
</div>

<script type="text/x-template" id="my-list">
  <div class="my-list">
    <div class="title">{{ title }}</div>
    <div class="list">
      <div class="list-item" v-for="shape in shapes">
        <div>{{ shape.name }} <small>({{ shape.sides }} sides)</small></div>
      </div>
    </div>
  </div>
</script>
```

在加上一点样式，大概就会是下图这个样子：

![img](https://segmentfault.com/img/remote/1460000020643553)

![img](D:\memo\JavaScript\img\693739994-5d9f21b03fe60_fix732)

## 更通用的 `my-list`

现在我们想要让 `my-list` 更加通用，可以渲染任何类型的列表。这次我们展示的是一堆颜色的名字以及对应的颜色方块。

为此，我们需要将上例列表独有的数据进行抽象化。由于列表中的项目可能有不同的结构，我们将会给 `my-list` 一个插槽，让父组件来定义列表的展示方式。

*app.js*

```
Vue.component('my-list', {
  template: '#my-list',
  props: [ 'title' ]
});
```

*index.html*

```
<script type="text/x-template" id="my-list">
  <div class="my-list">
    <div class="title">{{ title }}</div>
    <div class="list">
      <slot></slot>
    </div>
  </div>
</script>
```

现在，我们在根实例中创建 `my-list` 组件的两个实例，分别展示两个测试用例列表：lists:

*app.js*

```
new Vue({
  el: '#app',
  data: {
    shapes: [ 
      { name: 'Square', sides: 4 }, 
      { name: 'Hexagon', sides: 6 }, 
      { name: 'Triangle', sides: 3 }
    ],
    colors: [
      { name: 'Yellow', hex: '#F4D03F', },
      { name: 'Green', hex: '#229954' },
      { name: 'Purple', hex: '#9B59B6' }
    ]
  }
});
<div id="app">
  <my-list :title="Shapes">
    <div class="list-item" v-for="item in shapes">
      <div>{{ shape.name }} <small>({{ shape.sides }} sides)</small></div>
    </div>
  </my-list>
  <my-list :title="Colors">
    <div class="list-item" v-for="color in colors">
      <div>
        <div class="swatch" :style="{ background: color.hex }"></div>
        {{ color.name }}
      </div>
    </div>
  </my-list>
</div>
```

效果如下图：

![img](https://segmentfault.com/img/remote/1460000020643554)

![img](D:\memo\JavaScript\img\24409827-5d9f21947b0d0_fix732111)

## 大材小用的组件

我们刚才创建的组件确实符合要求，但那段代码算不上很好。`my-list` 本来应该是一个展示列表的组件，但我们却把渲染列表需要的逻辑部分抽象到了父组件中，这样一来，子组件在这里只不过是用来包裹列表而已，未免显得大材小用了。

更糟糕的是，在两个组件的声明中存在着大量重复代码（例如，`<div class="list-item" v-for="item in ...">`）。如果我们能够在子组件中编写这些代码，那么子组件就不再是“打酱油的角色”了。

## 作用域插槽

普通插槽无法满足我们的需求，这时候，**作用域插槽**就派上用场了。作用域插槽允许你传递一个模板而不是已经渲染好的元素给插槽。之所以叫做”作用域“插槽，是因为模板虽然是在父级作用域中渲染的，却能拿到子组件的数据。

例如，带有作用域插槽的组件 `child` 大概是下面这个样子：

```
<div>
  <slot my-prop="Hello from child"></slot>
</div>
```

使用这个组件的父组件将会在插槽中声明一个 `template` 元素。这个模板元素会有一个 `scope` （译者注：Vue 2.6 后改为 `v-slot` 属性）属性指向一个对象，任何添加到插槽（位于子组件模板）中的属性都会作为这个对象的属性。

```
<child>
  <template scope="props">
    <span>Hello from parent</span>
    <span>{{ props.my-prop }}</span>
  </template>
</child>
```

将会渲染成：

```
<div>
  <span>Hello from parent</span>
  <span>Hello from child</span>
</div>
```

## 在 `my-list` 中使用作用域插槽

我们将两个列表数组通过 `props` 传递给 `my-list`。之后将普通插槽替换为作用域插槽，这样，`my-list` 就能够负责迭代列表项目，同时父组件依然能够定义每个项目具体的展示方式。

*index.html*

```
<div id="app">
  <my-list title="Shapes" :items="shapes">
    <!--在这里书写 template-->
  </my-list>
  <my-list title="Colors" :items="colors">
    <!--在这里书写 template-->
  </my-list>   
</div>
```

接着我们让 `my-list` 迭代项目。在 `v-for` 循环中，`item` 是当前迭代项目的别名。我们可以创建一个插槽并通过 `v-bind="item"` 将那个项目绑定到插槽中。

*app.js*

```
Vue.component('my-list', {
  template: '#my-list',
  props: [ 'title', 'items' ]
});
```

*index.html*

```
<script type="text/x-template" id="my-list">
  <div class="my-list">
    <div class="title">{{ title }}</div>
    <div class="list">
      <div v-for="item in items">
        <slot v-bind="item"></slot>
      </div>
    </div>
  </div>
</script>
```

> 注意：也许你之前没见过不带参数的 `v-bind` 用法。这种用法将会把整个对象的所以属性都绑定到当前元素上。在涉及作用域插槽时，这种用法很常见，因为绑定的对象可能有很多属性，而一一将它们列举出来并手动绑定显然太麻烦了。

现在，回到根实例这里来，在 `my-list` 的插槽中声明一个模板。首先看一下几何图形列表（第一个例子中的列表），我们声明的模板必须带有一个 `scope` 属性，这里将其赋值为 `shape`。`shape` 这个别名可以让我们访问作用域插槽。在模板中，我们可以继续沿用最初例子中的标记来展示项目。

```
<my-list title="Shapes" :items="shapes">
  <template scope="shape">
    <div>{{ shape.name }} <small>({{ shape.sides }} sides)</small></div>
  </template>
</my-list>
```

整个模板大概是下面这样：

```
<div id="app">
  <my-list title="Shapes" :items="shapes">
    <template scope="shape">
      <div>{{ shape.name }} <small>({{ shape.sides }} sides)</small></div>
    </template>
  </my-list>
  <my-list title="Colors" :items="colors">
    <template scope="color">
      <div>
        <div class="swatch" :style="{ background: color.hex }"></div>
        {{ color.name }}
      </div>
    </template>
  </my-list>   
</div>
```

## 结论

虽然用上作用域插槽之后，代码量并未减少，但是我们将通用的功能都交由子组件负责，这显著提高了代码的健壮性。