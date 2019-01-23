//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    navItems: [],
    activeId: 0,
    current: 0,
    goods: [],
    show: false,
    flag: false,
    imgUrls: [
      '../../images/1.jpg',
      '../../images/3.jpg',
      '../../images/2.jpg'
    ],
    indicatorDots: false,
    hasUserInfo: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function(options) {
    var that = this;
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: 'http://39.96.24.120:3300/vue/getlist',
      success(res) {
        wx.hideLoading();
        that.setData({
          goods: res.data
        })
        console.log(that.data.goods)
        wx.showToast({
          title: '数据加载成功',
          icon: 'success',
          duration: 1000
        })
      }
    })
  },

  swiperChange(e) {
    this.setData({
      activeId: e.detail.current
    })
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})