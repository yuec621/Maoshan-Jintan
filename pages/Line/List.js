// pages/Line/List.js

var domain='https://cztour.sytours.com';
var p=1;
var ps=10;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    lineList:[],
    loading:"加载中..."
  },

  /**
   * 生命周期函数--监听页面加载
   */

  /*
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: domain +'/actionapi/HomeRecommend/GetLinesList',
      method:'GET',
      success:function(res){
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
          lineList:res.data
        });
      }
    })
  },
  */

 /**
   * 生命周期函数--监听页面加载(旅游路线二次更改)
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    wx.request({
      url: domain + '/actionapi/HomeRecommend/GetLinesList?p=' + p + '&ps=' + ps,
      method: 'GET',
      success: function (res) {
        that.setData({
          lineList: res.data
        });
      }
    });
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that=this;
    wx.request({
      url: domain +'/actionapi/HomeRecommend/GetLinesList?p='+(p+1)+"&ps="+ps,
      success:function(res){
        if(res.data.length==0)
        {
          that.setData({
            loading:"没有更多数据了~~"
          });
          return;
        }
        p=p+1;
        var list = that.data.lineList;
        for(var item in res.data)
        {
          list.push(res.data[item]);
        }
        that.setData({
          lineList:list  
        });
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  lineDetail: function(options){
    var id=options.target.dataset.id;
    wx.navigateTo({
      url: 'Detail?id='+id,
    })
  },
  lineOrder: function (options){
    var id = options.target.dataset.id;
    wx.navigateTo({
      url: 'Order?id=' + id,
    })
  }
})