// pages/goodsdetail/goodsdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:{}
  },
  goback(){
    wx.switchTab({
      url: '../list/list',
    })
  },
  gotocar(){
    wx.switchTab({
      url: '../car/car',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var goodsid=options.datatype;
    var that=this;
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: 'http://39.96.24.120:3300/vue/getdetail',
      data:{
        goodsid
      },
      success(res) {
        wx.hideLoading();
        that.setData({
          goods: res.data
        })
        wx.showToast({
          title: '数据加载成功',
          icon: 'success',
          duration: 1000
        })
      }
    })
  },
  addtocar(e){
    var username;
    wx.getStorage({
      key: 'username',
      success: function (res) {
        username=res.data;
        var json = {};
        json.usertel = username;
        json.goodsid = e.target.dataset.goodsid;
        json.goodsimg = e.target.dataset.goodsimg;
        json.goodsname = e.target.dataset.goodsname;
        json.goodsprice = e.target.dataset.goodsprice;
        wx.request({
          url: "http://39.96.24.120:3300/vue/addGoods",
          data: json,
          success:()=>{
			  wx.showToast({
				  title: '加入购物车成功',
			  })
          }
        })
      }
    });
  },
  gotocar(e){
    var username;
    wx.getStorage({
      key: 'username',
      success: function (res) {
        username = res.data;
        var json = {};
        json.usertel = username;
        json.goodsid = e.target.dataset.goodsid;
        json.goodsimg = e.target.dataset.goodsimg;
        json.goodsname = e.target.dataset.goodsname;
        json.goodsprice = e.target.dataset.goodsprice;
        wx.request({
          url: "http://39.96.24.120:3300/vue/addGoods",
          data: json,
          success: () => {
            wx.switchTab({
              url: '../car/car'
            }) 
          }
        })
      }
    });
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