// pages/Scenic/detail.js
var domain = "https://www.chinamaoshan.cn";
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
    html: '',
    img: '',
    price: 0,
    title: '',
    date: '',
    content: [],

    name:'' ,
    
    indicatorDots: true,//是否出现焦点
    autoplay: true,//是否自动播放
    interval: 5000,//自动播放时间
    duration: 1000, //滑动动画时间
    circular: true,//是否采用衔接滑动

   
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
      url: domain + '/actionapi/HomeRecommend/GetScenicInfo?id=' + options.id,
      success: function (res) {
        
        var data = res.data;
        
        that.setData({
          // img: data.pic,
          title: data.name,
          content: data.content,
          img:data.arry
          
        });
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