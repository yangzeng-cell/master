/* eslint-disable @typescript-eslint/no-this-alias */
import * as log from '../../lib/log';
import { reportsCommon } from '../../lib/onClickDepositReport';
const appVerifyCode = getApp();

Component({
  properties: {
    code: {
      type: String,
      default: '',
    },
    number: {
      type: String,
      default: '',
    },
    buttonName: {
      type: String,
      default: '下一步',
    },
    showAlert: {
      type: Boolean,
      default: false,
    },
    alertDetail: {
      type: Object,
      default: {},
    },
    bottomTips: {
      type: String,
      default: '',
    },
    reportMode: {
      // 数据上报所用的模块名称
      type: String,
      default: '',
    },
    pageId: {
      // 数据上报所用的pageId
      type: String,
      default: '',
    },
  },
  data: {
    isIphoneX: false,
    second: 60,
    showSend: true,
    number: '',
    next: false,
    bottomValue: 0, // 下一步按钮距离页面底部距离
    windowHeight: 0, // 页面高度
    // timer: '', // 页面定时器
    showTips: false, // 是否展示“收不到验证码”的弹框
    errCodeTips: '', // 验证码错误的提示内容
  },
  methods: {
    SeeSolution() {
      // 查看支持的银行
      const that = this;
      wx.openUrl({
        url: that.data.alertDetail.tips_url,
      });
    },
    inputFocus(e) {
      // 监听键盘的聚焦事件
      log.info('verifyCode__键盘高度__屏幕高度', e.detail.height, this.data.windowHeight);
      if (e.detail.height > 0) {
        // 头部部分的高度320px，若手机太短，那么键盘就不上移，让键盘遮住按钮
        if (!(e.detail.height + 64 + 80 + 320 + 40 > this.data.windowHeight)) {
          // this.data.bottomValue = e.detail.height + 64;
          this.setData({
            bottomValue: e.detail.height + 64,
          });
        }
      }
    },
    blurFocus() {
      // 监听键盘的失焦事件
      this.setData({
        bottomValue: 0,
      });
    },
    sendSuccess() {
      const self = this;
      this.setData({
        showSend: false,
      });
      // 计时器
      if (appVerifyCode.globalData.timer) {
        clearInterval(appVerifyCode.globalData.timer);
      }
      console.log(233333, appVerifyCode.globalData.timer);
      const timer = setInterval(function () {
        appVerifyCode.globalData.timer = timer;
        if (self.data.second === 1) {
          self.setData({
            second: 61,
            showSend: true,
          });
          clearInterval(appVerifyCode.globalData.timer);
        }
        self.data.second = self.data.second - 1;
        console.log(self.data.second);
        self.setData({
          second: self.data.second,
        });
      }, 1000);
      console.log(999, 'timer', appVerifyCode.globalData.timer);
    },
    sendClick() {
      // this.$emit('sendClick');
      this.triggerEvent('sendClick', {});
    },
    nextClick() {
      if (!this.data.next) {
        return;
      }
      if (this.data.next && this.data.code.length === 6) {
        const { code } = this.data;
        this.triggerEvent('nextClick', { code });
      } else {
        this.setData({
          errCodeTips: '验证码格式错误',
        });
      }
    },
    tipsClick() {
      this.selectComponent('#animationCards').showCardsBlock();
      // reportsCommon('OnclickCannotGetVeriCode');
      reportsCommon(
        'phone_notGetVerificationCode',
        this.data.reportMode,
        this.data.pageId,
        appVerifyCode.globalData.depositBankType,
      );
    },
    closeTips() {
      this.selectComponent('#animationCards').closeCards();
    },
    bindInput(e) {
      this.setData({
        errCodeTips: '',
      });
      if (e.detail.value) {
        this.setData({
          next: true,
          code: e.detail.value,
        });
      } else {
        // this.data.next = false;
        this.setData({
          next: false,
        });
      }
    },
    closeAlert() {
      // console.log('closeAlert');
      this.triggerEvent('closeAlert', {});
    },
    changePhoneNumber() {
      this.triggerEvent('changePhoneNumber', {});
      // console.log('changePhoneNumber');
    },
  },
  attached() {
    const _this = this;
    wx.getSystemInfo({
      success(res) {
        _this.data.windowHeight = res.windowHeight;
      },
    });
    this.setData({
      isIphoneX: appVerifyCode.globalData.isIphoneX,
    });
  },
  // pageLifetimes: {
  //   show: function() {
  //     // 页面被展示
  //     clearInterval(appVerifyCode.globalData.timer);
  //   }
  // }
});
