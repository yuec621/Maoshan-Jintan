// pages/mine/mineHomePage/mineHomePage.js
var Unionid = ''//储存获取到Unionid
var domain ='https://cztour.sytours.com';
Page({
  

  /**
   * 页面的初始数据
   */
  data: {
  },
  myOrderTap: function (e) {
    wx.navigateTo({
      url: '../myOrder/myOrder',
    })
  },
  couponTap: function (e) {
    wx.navigateTo({
      url: '../coupon/coupon',
    })
  },
  mineSetTap: function (e) {
    wx.navigateTo({
      url: '../mineSet/mineSet',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // 获取用户信息
    var that = this;
    that.setData({
      userName: wx.getStorageSync('userName'),
      userHeadImg: wx.getStorageSync('userHeadImg'),
      userVouchers: wx.getStorageSync('userVouchers')
    })
 /*   if (wx.getStorageSync('isauth')===1) {
            console.log("isget","yes")
            var that = this;
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            //将获取到的json数据绑定用户信息
            wx.getStorage({
              key: 'userName',
              success: function (res) {
                that.setData({
                  userName: res.data
                })
              }
            })
            wx.getStorage({
              key: 'userHeadImg',
              success: function (res) {
                that.setData({
                  userHeadImg: res.data
                })
              }
            })
            wx.getStorage({
              key: 'userVouchers',
              success: function (res) {
                that.setData({
                  userVouchers: res.data
                })
              }
            })
          }
          else
          {
            console.log("isget", "no")
            var that = this;
            wx.login({
              success: function (res) {
                console.log("code", res.code)
                if (res.code) {
                  console.log("islogin", "yes")
                  wx.request({
                    //获取openid接口  
                    url: domain+'/actionapi/PersonalCenter/WxLogin?js_code=' + res.code,
                    method: 'GET',
                    success: function (res) {
                      console.log("sss", res.data)
                      var session_key = res.data.session_key
                      getApp().globalData.openid = res.data.openid
                      if(res.data.success===true)
                      {
                        if (res.data.unionid!=="") 
                        {
                          that.setData({
                            showModel: true
                          })
                          getApp().globalData.unionid = res.data.unionid
                          console.info("showModel:chenggong"); 
                          wx.setStorageSync('isauth', 1)
                        }
                        else {
                          that.setData({
                            showModel: true
                          })
                          getApp().globalData.session_key = session_key
                          wx.setStorageSync('isauth', 1)
                        }
                      }
                    }
                  })
                } else {
                  console.log('登录失败！' + res.errMsg)
                }
              }
            });
          }*/
  },
 /* agreeGetUser: function (e) {
    this.setData({
      showModel: false
    })
    var userinfo = e.detail.userInfo
    Unionid = getApp().globalData.unionid;//获取到的Unionid
    if(Unionid !=null)
    {
      var that = this;
      wx.request({
        url: domain+'/actionapi/PersonalCenter/GetPersonInfo?Unionid=' + Unionid + '&openId=' + getApp().globalData.openid + '&nickName=' + userinfo.nickName+ '&avatarUrl=' + userinfo.avatarUrl, //根据openid获取用户信息的接口地址
        
        success: function (res) {
          console.log("returnres", res)
          //将获取到的json数据绑定用户信息
          that.setData({
            userVouchers: res.data.userVouchers,
            userHeadImg: res.data.userHeadImg,
            userName: res.data.userName
          })
          wx.setStorage({
            key: "userid",
            data: res.data.userId
          })
          wx.setStorage({
            key: "userHeadImg",
            data: res.data.userHeadImg
          })
          wx.setStorage({
            key: "userName",
            data: res.data.userName
          })
          wx.setStorage({
            key: "userVouchers",
            data: res.data.userVouchers
          })
        }
      })
    }
    else{
    var that = this;
      var session_key = getApp().globalData.session_key;
      var encryptedData = e.detail.encryptedData;
      var iv = e.detail.iv;
      wx.request({
        url: domain+'/actionapi/PersonalCenter/AddNewUser?encryptedData=' + encryptedData + '&iv=' + iv + '&session_key=' + session_key + '&openid=' + getApp().globalData.openid,
        method: 'GET',
        success: function (res) {
          //将获取到的json数据绑定用户信息
          that.setData({
            userVouchers: res.data.userVouchers,
            userHeadImg: res.data.userHeadImg,
            userName: res.data.userName
          })
          wx.setStorage({
            key: "userid",
            data: res.data.userId
          })
          wx.setStorage({
            key: "userHeadImg",
            data: res.data.userHeadImg
          })
          wx.setStorage({
            key: "userName",
            data: res.data.userName
          })
          wx.setStorage({
            key: "userVouchers",
            data: res.data.userVouchers
          })
        },
      })
    }
  },*/
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    wx.getStorage({
      key: 'userName',
      success: function (res) {
        that.setData({
          userName: res.data
        })
        
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