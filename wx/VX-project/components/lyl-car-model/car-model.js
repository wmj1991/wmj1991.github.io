// components/shopping/shopping.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        username: String,
        goods: Object,
        timeStamp: Number
    },
    /**
     * 组件的初始数据
     */
    data: {
        mydata: [],
        total: 0,
        checkAll: false,
        url: "http://39.96.24.120:3300/vue"
    },
    lifetimes: {
        show() {
            console.log(1)
        },
        hide() {
            // 页面被隐藏
        },
        resize(size) {
            // 页面尺寸变化
        }
    },
    ready() {

        setTimeout(() => {
            this.setData({
                total: this.data.total.toFixed(2)
            });

            this.properties.goods.map((item, i) => {
                if (item.num > 1) {
                    item.disabled = false;
                } else {
                    item.disabled = true;
                }
            })
            this.setData({
                mydata: this.properties.goods
            })
        },2000)


    },
    /**
     * 组件的方法列表
     */
    methods: {
        checkAll(e) {
            if (e.detail.value.length == 0) {
                this.data.mydata.map((item, i) => {
                    item.check = false
                })
                this.setData({
                    mydata: this.data.mydata
                })
            } else {
                this.data.mydata.map((item, i) => {
                    item.check = true
                })
                this.setData({
                    mydata: this.data.mydata
                })
            }
            this.total();
        },
        checkOne(e) {
            var checkNum = 0;
            this.data.mydata.map((item, i) => {
                if (i == e.target.dataset.key && item.check == false) {
                    item.check = true;
                } else if (i == e.target.dataset.key && item.check == true) {
                    item.check = false;
                    this.setData({
                        checkAll: false
                    })
                }
                if (item.check == true) {
                    checkNum++;
                    if (checkNum == this.data.mydata.length) {
                        this.setData({
                            checkAll: true
                        })
                    } else {
                        this.setData({
                            checkAll: false
                        })
                    }
                }
            })
            this.setData({
                mydata: this.data.mydata
            })
            this.total();
        },
        total() {
            var allPay = 0;
            this.data.mydata.map((item, i) => {
                if (item.check) {
                    allPay = allPay * 1 + item.goodsprice * item.num;
                }
            })
            this.setData({
                total: allPay.toFixed(2)
            });
        },
        add(e) {
            this.data.mydata.map((item, i) => {
                if (i == e.target.dataset.addindex) {
                    item.num++;
                    item.disabled = false;
                }
                this.changenum(item.goodsid, item.num);
            })
            this.setData({
                mydata: this.data.mydata
            })
            this.total();
        },
        reduce(e) {
            this.data.mydata.map((item, i) => {
                if (i == e.target.dataset.reduceindex) {
                    if (item.num > 1) {
                        item.num--;
                    }
                    if (item.num <= 1) {
                        item.disabled = true;
                    }
                }
                this.changenum(item.goodsid, item.num);
            })
            this.setData({
                mydata: this.data.mydata
            })
            this.total();
        },
        del(e) {
            this.data.mydata.map((item, i) => {
                if (i == e.target.dataset.delindex) {
                    this.data.mydata.splice(i, 1);
                    wx.request({
                        url: this.data.url + '/delgoods',
                        method: 'get',
                        data: {
                            usertel: wx.getStorageSync('username'),
                            goodsid: item.goodsid
                        },
                        success: (res) => {
                            wx.showToast({
                                title: res.data.msg,
                                duration: 1000,
                                color: "green"
                            })
                        }
                    })
                }
            })
            this.setData({
                mydata: this.data.mydata
            })
            this.total();

        },

        changenum(goodsId, changeNum) {
            wx.request({
                url: this.data.url + '/prev',
                method: 'get',
                data: {
                    usertel: wx.getStorageSync('username'),
                    goodsid: goodsId,
                    num: changeNum
                },
                success: (res) => {
                    wx.showToast({
                        title: res.data.msg,
                        duration: 1000,
                        color: "green"
                    })
                }
            })
        },
        pay() {
            wx.showModal({
                title: '确认购买',
                content: '请确认',
                success(res) {
                    if (res.confirm) {
                        wx.showToast({
                            title: '系统维护中',
                        })
                        wx.switchTab({
                            url: '../home/home',
                        })
                    } else if (res.cancel) {
                        wx.showToast({
                            title: '您将停留在购物车页面',
                        })
                    }
                }
            })
        }


    }
})