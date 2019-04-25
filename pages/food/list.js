// pages/Scenic/list.js
var domain = 'https://cztour.sytours.com';
var p = 1;
var ps = 10;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth:0,
    winHeight:0,
    list:[],
    loading: "加载中..."
  },

  /**
   * 生命周期函数--监听页面加载
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
      url: domain + '/actionapi/HomeRecommend/GetSportfulList?p='+p+'&ps='+ps,
        method: 'GET',
        success: function (res) {
            that.setData({
                list: res.data
            });
        }
    });
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
    var that = this;
    wx.request({
      url: domain + '/actionapi/HomeRecommend/GetSportfulList?p=' + (p + 1) + "&ps=" + ps,
        success: function (res) {
            if (res.data.length == 0) {
                that.setData({
                    loading: "没有更多数据了~~"
                });
                return;
            }
            p = p + 1;
            var addlist = that.data.list;
            for (var item in res.data) {
                addlist.push(res.data[item]);
            }
            that.setData({
                list: addlist
            });
        }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  foodClick:function(options){
    var id = options.target.dataset.id;
    wx.navigateTo({
      url: 'detail?id=' + id,
    })
  }
})