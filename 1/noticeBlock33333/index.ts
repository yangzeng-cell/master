// const app = getApp();
Component({
  properties: {
    announce: {
      type: Object,
      default: {},
    },
    bgColor: {
      type: String,
      default: '',
    },
    fontColor: {
      type: String,
      default: '',
    },
  },
  data: {},
  methods: {
    bulletinLocation(e) {
      console.log('emitEvent');
      const { item } = e.currentTarget.dataset;
      if (item.can_click && item.url) {
        // url跳转
        if (item.url_type === 1) {
          // 1:内部连接 2:h5
          wx.navigateTo({
            url: item.url,
          });
        } else if (item.url_type === 2) {
          wx.openUrl({
            url: item.url,
          });
        }
      } else {
        if (item.emitEvent) {
          this.triggerEvent(item.emitEvent, {
            item,
          });
        }
      }
    },
  },
  attached() {},
});
