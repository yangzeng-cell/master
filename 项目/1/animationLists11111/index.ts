const appAnimationLists = getApp();
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    // addGlobalClass: true
  },
  properties: {
    scene: {
      type: String,
      default: '',
    },
    animationLists: {
      type: Array,
      default: [],
      // observer: function(val) {
      // console.log('animationList', val);
      // if (val && val.length <= 1) {
      //   this.setData({
      //     singleType: true
      //   });
      // } else {
      //   this.setData({
      //     singleType: false
      //   });
      // }
      // }
    },
    singleType: {
      type: Boolean,
      default: false,
      observer(val) {
        if (val) {
          this.setData({
            chooseItem: 0,
          });
        } else {
          this.setData({
            chooseItem: -1,
          });
        }
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
    difineCustom: {
      // 是否是自定义导航栏
      type: Boolean,
      default: false,
    },
  },

  data: {
    isIphoneX: false,
    singleType: true, // 是否是单列表,单列表直接展开
    chooseItem: -1, // 多列表时被展开的那一列的index值
    statusBarHeight: 20, // statusBar的高度
  },
  methods: {
    showList(event) {
      // 展示当前列表
      const { index } = event.currentTarget.dataset;
      let chooseItem = -1;
      if (index === this.data.chooseItem) {
        chooseItem = -1;
      } else {
        chooseItem = index;
      }
      this.setData({
        chooseItem,
      });
      this.triggerEvent('chooseItemChange', { chooseItem }, {});
    },
    itemClick(e: any) {
      const { item } = e.currentTarget.dataset;
      const bankType = e.currentTarget.dataset.banktype;
      if (this.data.scene === 'history') {
        // 已转出存单列表页
        this.triggerEvent('depositClick', { item });
      } else {
        this.triggerEvent('listItemClick', { item, bankType });
      }
    },
  },
  lifetimes: {
    attached() {
      this.setData({
        isIphoneX: appAnimationLists.globalData.isIphoneX,
      });
      wx.getSystemInfo({
        success: (res) => {
          this.setData({
            statusBarHeight: res.statusBarHeight,
          });
        },
      });
    },
  },
});
