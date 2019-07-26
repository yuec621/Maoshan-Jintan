// pages/Scenic/detail.js
var domain = 'https://www.chinamaoshan.cn';
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
    name:'',
    
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
        console.log(res.data.arry);
        var data = res.data;
        that.setData({
          imgUrls:data.arry,
          title: data.name,
          content: data.content,
          scientList:data.scientList
       
        });
      }
    }),

    //热门美食
    wx.request({
      url: domain +'/actionapi/HomeRecommend/GetSportfulList?p=1&ps=3', //接口地址
        data: {
        },
        header: {
          "Content-Type": "application/json"
        },
        success: function (res) {
          //将获取到的json数据，存在名字叫goodsList的这个数组中
          that.setData({
            goodsList: res.data

          })
        }
      })
  },

  //点击导航
  bookScenic:function(e){
    var dataset = e.currentTarget.dataset;
    if (dataset.url) {
      console.log(dataset.url);
     
      wx.navigateTo({
        url: '../web-view/webViewPage?url=' + dataset.url,
        success: function (res) {
          console.log("videoClick success")
        },
        fail: function (err) {
        }
      });
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
  
  },
  foodClick:function(options){
    var id = options.target.dataset.id;
    wx.navigateTo({
      url: '../scenicspot/detail?id=' + id,
    })
  }
})