// pages/search/list.js
var domain = 'https://www.chinamaoshan.cn';
var keyword = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      sign:[
        {name:'东方盐湖城'},
        {name:'茅山宝盛园'},
        {name:'乾观园'},
        {name:'湖鲜阁螃蟹'},
        {name:'耗牛掌'},
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this;
    // wx.request({
    //   url: domain + '/actionapi/HomeRecommend/GetSerachResult?keyword='+keyword,
    //     method: 'GET',
    //     success: function (res) {
    //       console.log(res.data)
    //         that.setData({
    //           msg:res.data.msg
    //         });
    //     }
    // });
  

  },
  // 搜索
goSearch: function(e) {
  var that = this;
  var formData = e.detail.value;
  console.log(formData)
  if (formData) {
   
   wx.request({
   
   url:domain + '/actionapi/HomeRecommend/GetSerachResult?keyword='+keyword,
   data: {
    title: formData
   },
   
   header: {
    'Content-Type': 'application/json'
   },
   success: function(res) {
    that.setData({
    search: res.data,
    })
    if (res.data.msg=='无相关视频'){
    wx.showToast({
     title: '无相关视频',
     icon: 'none',
     duration: 1500
    })
    }else{
    let str = JSON.stringify(res.data);
    // wx.navigateTo({
    //  url: '../searchShow/searchShow?data=' + str
    // })
    }
     
    console.log(res.data.msg)
   }
   })
  } else {
   
   wx.showToast({
   title: '输入不能为空',
   icon: 'none',
   duration: 1500
   })
   
  }
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