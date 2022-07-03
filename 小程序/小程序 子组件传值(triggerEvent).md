需求,把A子组件的值传给父组件,在通过父组件传给子组件接收

A子组件

js: data

  /**
     * 组件的属性列表
     */
    properties: {
        hideBaitiao: {
            type: Boolean,
            // 默认隐藏
            value: true
        },
        baitiao: { // 分期内容的数据
            type: Array,
        }
    },    
    data: {
        selectIndex:0
    },

     makeBaitiao(){//立即打白条
     
            // 取到点击的具体下标
            let selectIndex = this.data.baitiao[this.data.selectIndex]
            // 点击事件带参传入父级
            this.triggerEvent('updataSelect',selectIndex)
        }
父组件 

html:接收

   <!-- 白条弹框 -->
  <IOU bind:updataSelect="selectItem"></IOU>
js:赋值

   selectItem(e){//点击立即打白条,获取子组件传过来的值
        console.log(e.detail.desc)//可以从e中得到传过来信息
        let updaSelectItem = e.detail;
        this.setData({
            baitiaoSelectItem: e.detail
        })

    },

