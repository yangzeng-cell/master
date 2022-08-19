1. ### vue2的源码使用Flow进行类型检测的，vue3使用Typescript进行重构，比vue2更好的对typescript进行支持。
2. ### vue3中使用Proxy来实现对数据劫持，vue2中使用Object.defineProperty来劫持数据的getter和setter方法的，这这种方式存在缺点就是在给对象添加和删除属性的时候，是无法劫持和监听的。所以必须使用$set和$delete方法。
3. ### vue3删除了$set和$off,$once.移除了filter,内敛模板等特性
4. ### 在编译方面做了优化：生成Block tree,Slot编译优化，diff算法优
5. ### vue3中已经去掉了事件总线，可以使用mitt
6. ### vue3中增加了componsition API 
7. ### vue3中移除了$children
8. ### vue3中的推荐的构建工具已经从vue cli转成vite
9. ### vue3中的推荐的状态管理工具已经从vuex转成pinia
10. ### IDE支持Vetur->Volar
11. ### vue3的响应式是使用了proxy，proxy不支持IE，所以vue3也不支持IE，目前IE已经不再进行更新，已经被淘汰
12. ### 添加了全新的全局api :createApp()来替代new Vue()来创建vue实例

| 2.x Global API             | 3.x Instance API (`app`)                   |
| -------------------------- | ------------------------------------------ |
| Vue.config                 | app.config                                 |
| Vue.config.productionTip   | 删除                                       |
| Vue.config.ignoredElements | app.config.compilerOptions.isCustomElement |
| Vue.component              | app.component                              |
| Vue.directive              | app.directive                              |
| Vue.mixin                  | app.mixin                                  |
| Vue.use                    | app.use                                    |
| Vue.prototype              | app.config.globalProperties                |
| Vue.extend                 | 删除                                       |

### 13.全局 API Treeshaking

```vue
import Vue from 'vue'

Vue.nextTick(() => {
  // something DOM-related
})
```

在Vue2.X中Vue.nextTick()是一个暴露在单个Vue对象中的全局的api，事实上，实例方法$nextTick()只是一个包装器，为了方便Vue.nextTick()，回调函数的this会自动绑定到当前实例中，但是在vite和webpack中，Vue.nextTick不可以进行treeshaking,所以在Vue3中做了优化，让nextTick可以进行treeShaking,全局的模块只能作为ES模块构建的命名导出来进行访问，

```vue
import { nextTick } from 'vue'

nextTick(() => {
  // something DOM-related
})

```

```vue
import { shallowMount } from '@vue/test-utils'
import { MyComponent } from './MyComponent.vue'
import { nextTick } from 'vue'

test('an async feature', async () => {
  const wrapper = shallowMount(MyComponent)

  // execute some DOM-related tasks

  await nextTick()

  // run your assertions
})

```

如果在Vue3中使用Vue.nextTick()会导致臭名昭著的`undefined is not a function`错误

通过此更改，如果模块捆绑器支持 tree-shaking，则未在 Vue 应用程序中使用的全局 API 将从最终捆绑包中删除，从而获得最佳文件大小

##### 以下Vue2的全局QAPI会受到影响

- `Vue.nextTick`
- `Vue.observable`（替换为`Vue.reactive`）
- `Vue.version`
- `Vue.compile`（仅在完整版本中）
- `Vue.set`（仅在兼容版本中）//不要使用
- `Vue.delete`（仅在兼容版本中）//不要使用

除了如上全局API之外，许多内部组件将不再作为默认导入的一部分，需要使用到时再导入，有利于treeShaking,

```vue
<transition>
  <div v-show="ok">hello</div>
</transition>
```

会被编译成

```vue
import { h, Transition, withDirectives, vShow } from 'vue'

export function render() {
  return h(Transition, [withDirectives(h('div', 'hello'), [[vShow, this.ok]])])
}

```

可以减少包的大小

**notice**

**上述内容仅适用于与支持 tree-shaking 的捆绑器一起使用的[ES 模块构建](https://github.com/vuejs/core/tree/master/packages/vue#which-dist-file-to-use)- UMD 构建仍然包含所有功能并在 Vue 全局变量上公开所有内容（并且编译器将生成适当的输出以使用全局 API 而不是导入）。**

再插件中使用时

Vue2.x中使用全局api

```js
const plugin = {
  install: Vue => {
    Vue.nextTick(() => {
      // ...
    })
  }
}

```

Vue3.x使用全局API

```js
import { nextTick } from 'vue'

const plugin = {
  install: app => {
    nextTick(() => {
      // ...
    })
  }
}

```

在webpack中如果把上诉代码打包成一个buddle,他会把vue源码也会打包进去，如果要避免这样的发生可以使用externals排除

```js
// webpack.config.js
module.exports = {
  /*...*/
  externals: {
    vue: 'Vue'
  }
}

```

rollUp中的写法

```js
// rollup.config.js
export default {
  /*...*/
  external: ['vue']
}
```

### 14.v-model

在组建中使用v-model

在vue2.x,`v-model`在组件上使用 a 相当于传递一个`value`prop 并发出一个`input`事件：

```vue
<ChildComponent v-model="pageTitle" />

<!-- would be shorthand for: -->

<ChildComponent :value="pageTitle" @input="pageTitle = $event" />

```

如果想更改属性名和事件的时候，需要使用在组件中添加model选项，

```vue
<!-- ParentComponent.vue -->

<ChildComponent v-model="pageTitle" />

```

```json
// ChildComponent.vue

export default {
  model: {
    prop: 'title',
    event: 'change'
  },
  props: {
    // this allows using the `value` prop for a different purpose
    value: String,
    // use `title` as the prop which take the place of `value`
    title: {
      type: String,
      default: 'Default title'
    }
  }
}

```

所以v-model实际上时这样的

```vue
<ChildComponent :title="pageTitle" @change="pageTitle = $event" />
```

### 使用`v-bind.sync`[#](https://v3-migration.vuejs.org/breaking-changes/v-model.html#using-v-bind-sync)

在某些情况下，我们可能需要一个道具的“双向绑定”（有时除了现有`v-model`的不同道具之外）。为此，我们建议以`update:myPropName`. 例如，对于`ChildComponent`上一个带有`title`prop 的示例，我们可以通过以下方式传达分配新值的意图：

```vue
this.$emit('update:title', newValue)
```

然后，如果需要，父级可以侦听该事件并更新本地数据属性。例如：

```vue
<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
```

`.sync`为方便起见，我们使用修饰符对这种模式进行了简写：

```vue
<ChildComponent :title.sync="pageTitle" />
```

在Vue3.x中 自定义组件的双向数据绑定时使用modelValue，@update:modelValue来替代

```vue
<ChildComponent v-model="pageTitle" />

<!-- would be shorthand for: -->

<ChildComponent
  :modelValue="pageTitle"
  @update:modelValue="pageTitle = $event"
/>

```

如果需要修改model的名称则直接修改

```vue
<ChildComponent v-model:title="pageTitle" />

<!-- would be shorthand for: -->

<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />

```

也可以作为.sync的替代，可以在组件中双向数据绑定多个值

```vue
<ChildComponent v-model:title="pageTitle" v-model:content="pageContent" />

<!-- would be shorthand for: -->

<ChildComponent
  :title="pageTitle"
  @update:title="pageTitle = $event"
  :content="pageContent"
  @update:content="pageContent = $event"
/>

```

