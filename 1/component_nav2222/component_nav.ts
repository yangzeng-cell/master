/* eslint-disable @typescript-eslint/no-this-alias */
Component({
  properties: {
    backIconType: {
      type: Number,
      value: 0,
    },
    backgroundColor: {
      type: String,
      value: '',
    },
    navRight: {
      type: String,
      value: '',
      observer(newVal) {
        if (newVal === 'more') {
          if (Number(this.data.backIconType) === 1) {
            this.setData({
              navRight: './images/more_black.png',
            });
          } else {
            this.setData({
              navRight: './images/more.png',
            });
          }
        }
      },
    },
    customLeftEvent: {
      // 是否自定义左边的按钮事件
      type: Boolean,
      value: false,
    },
    title: {
      type: String,
      value: '',
    },
    titleColor: {
      type: String,
      value: '',
    },
  },

  data: {
    statusBarHeight: 20,
    isClose: false,
  },

  lifetimes: {
    created() {
      const that = this;
      wx.getSystemInfo({
        success(res) {
          that.setData({
            statusBarHeight: res.statusBarHeight,
          });
        },
      });
    },

    attached() {
      const that = this;
      const pageStack = getCurrentPages();
      wx.getSystemInfo({
        success(res) {
          that.setData({
            statusBarHeight: res.statusBarHeight,
          });
        },
      });
      that.setData({
        isClose: pageStack.length <= 1,
      });
    },
  },

  methods: {
    tapRightEvent() {
      this.triggerEvent('tapRightEvent');
    },
    tapLeftEvent() {
      if (this.data.customLeftEvent) {
        this.triggerEvent('tapLeftEvent');
      } else {
        this.triggerEvent('tapLeftEvent');
        wx.navigateBack();
      }
    },
  },
});
