// pages/car/car.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		goods: [],
		timeStamp: 0,
		url:"http://39.96.24.120:3300/vue"
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

		
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
		// wx.setStorageSync('username', '17683710610')
		wx.request({
			url: this.data.url +'/getCarList',
			method: 'get',
			data: {
				usertel: wx.getStorageSync('username')
			},
			success: (res) => {
				setTimeout(() => {
					this.setData({
						goods: res.data,
						timeStamp: (new Date()).getTime()
					})
					wx.showToast({
						title: '加载成功!',
						duration: 1000,
						color: "green"
					})
				}, 1000)

			}
		})
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