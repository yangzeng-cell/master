# 基于Vue实现上拉加载更多（方法+思路）

[![img](https://cdn2.jianshu.io/assets/default_avatar/14-0651acff782e7a18653d7530d6b27661.jpg)](https://www.jianshu.com/u/f7a45f2d976c)

[北边的江](https://www.jianshu.com/u/f7a45f2d976c)关注

0.7062018.09.05 19:13:17字数 636阅读 20,563

首先我们需要一个的大致结构差不多是这样的



```jsx
<div class="load-more">
    <slot>这里的作用不多说</slot>
    <div class="load-state" v-if="showState">
      <div class="finish" v-if="finish">
        <span>加载完成</span>
      </div>
      <div class="more" v-else>
        <span>加载中</span>
      </div>
    </div>
</div>
```

分为一个大的div盒子，然后里面包含了父元素给的数据内容，底部一些自己加载的状态

我们要实现的功能：
1、页面进入自动去加载我们的数据，滑动到底部继续加载新的数据
2、当第一次数据加载完成但是数据不足一屏，继续实行加载方法，直到超过一屏停止
3、页面数据少，不足一屏且没有更多数据，不显示底部加载状态

我们在data里配置一些我们需要的参数



```kotlin
data () {
  return {
    loadState: true, // 是否显示底部加载状态，默认true
    finish: false, // 是否加载完成
    loading: false, // 是否正在加载中
    domHeight: 0, // 内容可视区的高度
    container: null // 绑定能被监听滚动的元素
  }
},
```

接下来我们在mounted里面写一些我们需要的内容：



```kotlin
mounted () {
    // 如果组件是基于body或者其他父元素进行滚动，则下面获取的对象为相应的对象
    this.container = this.$el
    this.domHeight = this.$el.clientHeight
    this.switchBottom()
    this.bindSrcoll()
}
```

上拉加载更多功能及什么时候加载等



```kotlin
scrollPage () {
  if (!this.$el) {
    return
  }
  // 获取内容向上滚动了多少距离
  var domScrollTop = this.container.scrollTop
  // 当内容滚动到距离底部<50时,且没有加载完成&&没有正在加载中
  // 内容距离底部多少距离 = 内容总高度-滚动高度-当前可视高度
  if (this.$el.scrollHeight - domScrollTop - this.domHeight < 50 && !this.loading && !this.finish) {
  // 设置为正在加载中
    this.loading = true
    // 0.5秒后执行父组件接口方法
    setTimeout(() => {
        this.$emit('loadMore')
    }, 500)
  }
},
```

到这里是不是大概明白加载更多实现方式了，现在来写上面实现功能的第二和第三点：



```kotlin
switchBottom () {
  this.$nextTick(() => {
    // 判断容器内容是否 大于 自身内容可视区域高度
    if (this.$el.scrollHeight > this.domHeight) {
        // 如果大于，则显示加载状态，至于是加载完成还是没有可以继续加载，我们不用关心，如果继续上滑有数据会执行方法的
        this.showState = true
    } else {
      // 如果页面不足一屏且还有下一页数据，继续执行加载更多方法
        if (!this.finish) {
            // 不足一屏，还有数据，现在加载状态
          this.showState = true
            // 执行父组件请求数据方法
          setTimeout(() => {
            this.$emit('loadMore')
          }, 1000)
      } else {
        // 没有数据不显示底部加载状态
        this.showState = false
      }
    }
  })
},
```

上面的switchBottom我们会在上面的mounted里面默认执行一次
但是如果只执行一次，那么如果遇到我们功能的第二点场景的时候，就不能实现我们要的效果了，所以我们需要在updated周期时候再执行，如果有用到缓存，也需要将方法写在activated一次



```kotlin
// 视图数据更新，重新调用
updated () {
    this.switchBottom()
},
// 如果有用到keep-alive，组件激活时调用
activated () {
  this.switchBottom()
},
```

最后我们需要将页面元素绑定一个滚动事件和移除滚动事件，滚动事件方法也需要在mounted里调用



```kotlin
bindSrcoll () {
  this.unScroll()
  if (this.scrollContainer) {
    this.container.addEventListener('scroll', this.scrollPage)
  }
},
unScroll () {
  if (this.scrollContainer) {
    this.container.removeEventListener('scroll', this.scrollPage)
  }
}
```

最后一点要注意，我们离开了当前路由，是需要将我们的滚动事件销毁的，不要会一直处于监听状态



```kotlin
// 页面销毁，移除滚动监听
beforeDestroy () {
    this.unScroll()
}
```

到此我们的加载更多方法基本完成；
值得注意的是，需要里面绑定滚动的元素是生效在什么地方，需要根据自己项目具体去写对应的样式，总之，能滚动的元素是有一个固定高度的，如果都没有，只能将滚动事件绑定到body上，将body的高度设置为100%，voerflow：auto即可

最后怎么使用，在父元素引入我们的组件

```
import LoadMore from '@/public/LoadMore/Index.vue'
```

在html片段写上

```
<LoadMore ref="LoadMore" @loadMore="onScrollBottom"></LoadMore>
```

conScrollBottom方法里面调用请求数据的方法



```kotlin
// 加载更多
onScrollBottom () {
    this.getData()
},
```

getData方法里面需要进行如下判断
数据请求成功后：



```kotlin
// 假如数据拿成功并渲染
if (result.code == 0) {
    this.list = this.list.concat(result.data.fileList)
    // 如果没有更多数据，则加载完成
    if (!result.data.nextPage) {
      this.$refs.LoadMore.finish = true
      return
    }
    // 关闭正在加载中
    if (this.$refs.LoadMore) {
        this.$refs.LoadMore.loading = false
    }
}
```