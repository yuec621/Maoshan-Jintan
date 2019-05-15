// pages/Line/Detail.js
var domain = 'http://192.168.1.184:53561';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /** 
       * 页面配置 
       */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    tabId: 0,
    html:'',
    img:'',
    price:0,
    title:'',
    date:'',
    content: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    }); 
    wx.request({
      url: domain +'/actionapi/HomeRecommend/GetLinesInfo?id='+options.id,
      success:function(res){
        console.log(res.data);
        var data=res.data;
        var arr=[];
        arr[0] = data.remark;
        arr[1] = data.features;
        arr[2] = data.explan; 
        that.setData({
          img: data.pic,
          price:data.price,
          title: data.name,
          date: data.date,
          content: arr,
          html:arr[0]
        });
        wx.setStorageSync("detailid", options.id)
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
    wx.removeStorageSync('detailid')
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
  
  },

  // tabChange: function (e) {
  //   var that = this;
  //   that.setData({ tabId: e.detail.current });
  // },
  /** 
   * 点击tab切换 
   */
  switchTab: function (e) {
    var that = this;
    var current = e.target.dataset.current;
    if (this.data.tabId === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        tabId: current,
        html: that.data.content[current] ? that.data.content[current]:''
      })
    }
  },
  lineOrder: function (options) {
    var id = wx.getStorageSync("detailid");
    wx.navigateTo({
      url: 'Order?id=' + id,
    })
  }
})