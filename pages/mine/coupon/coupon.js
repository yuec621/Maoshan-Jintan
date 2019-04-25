//获取应用实例  
var app = getApp()
var domain = 'https://cztour.sytours.com';
Page({
  data: {
    /** 
        * 页面配置 
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
  },
  onLoad: function () {
    var that = this;
    var userid = wx.getStorageSync('userid')
    console.log("userid", userid)
    wx.request({
      url: domain+'/actionapi/PersonalCenter/GetCouponList?userId='+userid,
      /*data: {
        userId: userid
      },*/
      success: function (res) {
        console.log("res.data.data", res.data.data)
        console.log("res.data.edata", res.data.edata)
        that.setData({
          couponslist: res.data.data

        })
      }
    });
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
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    var userid = wx.getStorageSync('userid')
    console.log("userid", userid)
    wx.request({
      url: domain + '/actionapi/PersonalCenter/GetCouponList?userId=' + userid,
      /*data: {
        userId: userid
      },*/
      success: function (res) {
        if (that.data.currentTab === 0)
        {
        that.setData({
          couponslist: res.data.data
        })
        } else if (that.data.currentTab === 1)
        {
          that.setData({
            couponslist: res.data.edata
          })
        }
      }
    })
  }
})  
