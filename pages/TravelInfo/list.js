// pages/TravelInfo/list.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图
  imgUrls: [
    {
      link: '/pages/index/index',
      img: 'http://www.cztour.com/Upload/AdInfo/201804/161336557633981.jpg',
      Name:'常州乡村旅游节暨春到茅山赏花季开幕'
    }, {
      link: '/pages/logs/logs',
      img: 'http://www.cztour.com/pictures/TrustSoft/AdInfo/2018319105514116.jpg',
      Name:'常州乡村旅游节暨春到茅山赏花季开幕'
    }, {
      link: '/pages/test/test',
      img: 'http://www.cztour.com/pictures/TrustSoft/AdInfo/2018319105549106.jpg',
      Name:'常州乡村旅游节暨春到茅山赏花季开幕'
    }
  ],
  indicatorDots: false,//是否出现焦点
  autoplay: true,//是否自动播放
  interval: 5000,//自动播放时间
  duration: 1000, //滑动动画时间
  circular: true,//是否采用衔接滑动

  tabList: [
    
    '文旅资讯', '景区资讯', '节日活动','美丽乡村'],
  current: 0,//当前选中的Tab项
},

  
  
   /**
     * Tab的点击切换事件
     */
    tabItemClick: function (e) {
           
      this.setData({
          current: e.currentTarget.dataset.pos
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
		
     

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

  },
  
})