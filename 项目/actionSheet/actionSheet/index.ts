const appActionSheet = getApp();
Component({
  properties: {
    showListsConetnt: {
      type: Boolean,
      default: false,
    },
    showCards: {
      type: Boolean,
      default: false,
      observer(newVal) {
        if (newVal === false) {
          setTimeout(() => {
            this.setData({
              showListsConetnt: false,
            });
          }, 200);
        }
      },
    },
    syncInfo: {
      type: Object,
      default: {},
    },
  },
  data: {
    isIphoneX: false,
    showListsConetnt: false,
    showCards: false,
  },
  methods: {
    showListItem() {
      // 选择Item
      // this.data.showListsConetnt = true
      // this.data.showCards = true
      this.setData({
        showListsConetnt: true,
        showCards: true,
      });
    },
    closeListItem() {
      // this.data.showCards = false
      this.setData({
        showCards: false,
      });
      // this.triggerEvent('closeSheet', {
      //   showCards: false
      // });
      // setTimeout(() => {
      //   this.setData({
      //     showListsConetnt: false
      //   });
      // }, 300);
    },
    emitEvent(e) {
      const { item } = e.currentTarget.dataset;
      const defineEvent = item.event;
      this.closeListItem();
      this.triggerEvent(defineEvent, {
        item,
      });
    },
  },
  attached() {
    this.setData({
      isIphoneX: appActionSheet.globalData.isIphoneX,
    });
  },
});
