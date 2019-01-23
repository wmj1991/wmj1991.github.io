// components/card/card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    datatype:String,
    goodslist:Array
  },
  attached(e) {
    var that=this;
    setTimeout(()=>{
      if (this.properties.goodslist.length) {
        var filterlist = this.properties.goodslist.filter(function (item) {
          return item.type == that.properties.datatype;
        })
        console.log(filterlist)
        this.setData({
          list:filterlist
        })
      }
    },3500)
  },
  /**
   * 组件的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
