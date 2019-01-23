// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodslist:[],
    datatypeList:[
      {text:'开业花篮',type:'kaiye'},
      {text:'生日鲜花',type:'shengri'},
      {text:'绿植',type:"lvzhi"},
      {text:'永生花',type:"yongsheng"}
      ],
    navindex:0,
    swiperindex:0,
    kaiyelist:[],
    shengrilist:[],
    lvzhilist:[],
    yongshenglist:[]
  },
  changecolor(e){
    this.setData({
      navindex:e.target.dataset.index,
      swiperindex: e.target.dataset.index
    })
  },
  changeswiperindex(e){
    this.setData({
      navindex: e.detail.current,
      swiperindex: e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: 'http://39.96.24.120:3300/vue/getlist',
      success(res){
        wx.hideLoading();
        var list=res.data;
        var kaiyelist=list.filter(function(item){
          return item.type=="kaiye"
        })
        var shengrilist = list.filter(function (item) {
          return item.type == "shengri"
        })
        var lvzhilist = list.filter(function (item) {
          return item.type == "lvzhi"
        })
        var yongshenglist = list.filter(function (item) {
          return item.type == "yongsheng"
        })
        that.setData({
          kaiyelist,
          shengrilist,
          lvzhilist,
          yongshenglist
        })
        wx.showToast({
          title: '数据加载成功',
          icon: 'success',
          duration: 1000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})