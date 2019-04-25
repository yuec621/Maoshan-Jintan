// pages/mine/mineSet/mineSet.js
var urlhelper = require("../../../utils/url.js")
require("../../../utils/myfunc.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  Submit:function(e){
    //获取小程序缓存
    var userid = wx.getStorageSync('userid')
    console.log("userid", userid)
    wx.pro.request({
      url: 'http://www.cztour.com/actionapi/PersonalCenter/ChangeUser?userName=' + e.detail.value.username +'&userid='+userid,
      /*data:{
        userName: e.detail.value.username,
        userid: userid
      },*/
      success: function (res) {
        console.log("res.data.result", res.data.result)
        if (res.data.result===1)
        {
          wx.setStorage({
            key: "userName",
            data: e.detail.value.username
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'userName',
      success: function (res) {
        that.setData({
          userName: res.data
        });
      }
    })
    wx.getStorage({
      key: 'userHeadImg',
      success: function (res) {
        that.setData({
          userHeadImg: res.data
        });
      }
    })
    console.log("用户名：" + getApp().globalData.userName);
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