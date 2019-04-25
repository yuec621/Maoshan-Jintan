var md5=require('../../../utils/md5.js');
var domain = 'https://cztour.sytours.com';
//获取应用实例  
var app = getApp()
Page({
  data: {
    /** 
        * 页面配置 
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    orderList:[],
    userid:0
  },
  onLoad: function (e) {
    var that = this;
    var userid = 0;
    userid=wx.getStorageSync('userid');
    console.log(userid)
    wx.request({
      url: domain+'/actionapi/PersonalCenter/GetOrderList?orderStatus=0&userId=' + userid,
     /* data:{
        orderStatus: 0,
        userId: userid
      },*/
      success: function (res) {
        console.log("current", res.data)
        if(res.data.pic !=="" && res.data.ordername!=="")
        {
          //将获取到的json数据，存在名字叫orderList的这个数组中
          that.setData({
            orderList: res.data,
          })
        }
      }
    })
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
  switchNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    var userid = wx.getStorageSync('userid')
    wx.request({
      url: domain+'/actionapi/PersonalCenter/GetOrderList?orderStatus=' + e.target.dataset.current + '&userId=' + userid,
      /*data: {
        orderStatus: e.target.dataset.current,
        userId: userid
      },*/
      success: function (res) {
        if (res.data.pic !== "" && res.data.ordername !== "") {
        //将获取到的json数据，存在名字叫orderList的这个数组中
        that.setData({
          orderList: res.data
        })
        }
      }
    })
  },

  //支付
  pay:function(options)
  {
      var that=this;
      let openid = wx.getStorageSync('openid') || getApp().globalData.openid;
      let baseNo = options.currentTarget.dataset.baseno;
      let current = that.data.currentTab;
      console.log(openid+'-'+baseNo);
      wx.request({
          url: domain + '/actionapi/PersonalCenter/GetPayParams?baseNo=' + baseNo + '&openid=' + openid ,
          method:'GET',
          success:function(res){
            if(res.data.code==200)
            {
                var params=res.data.params;
                wx.requestPayment({
                    timeStamp: params['timeStamp'],
                    nonceStr: params['nonceStr'],
                    package: params['package'],
                    signType: params['signType'],
                    paySign: params['paySign'],

                    success:function(res){
                        wx.showModal({
                            title: '支付成功',
                            content: '',
                            showCancel: false,
                        });
                    },
                    fail:function(res){
                        if (res.errorMsg =='requestPayment:fail cancel')
                        {
                            //用户取消
                        }
                        else
                        {
                            wx.showModal({
                                title: '支付失败，请联系管理员',
                                content: '',
                                showCancel:false,
                            });
                        }
                    }
                });
            }
            else
            {    
                wx.showModal({
                    title: '支付失败，请联系管理员',
                    content: '',
                    showCancel: false,
                });
            }
          },
      });

      wx.request({
          url: domain + '/actionapi/PersonalCenter/GetOrderList?orderStatus=' + current + '&userId=' + userid,
          success: function (res) {
              if (res.data.pic !== "" && res.data.ordername !== "") {
                  //将获取到的json数据，存在名字叫orderList的这个数组中
                  that.setData({
                      orderList: res.data
                  })
              }
          }
      })
  }
})  
