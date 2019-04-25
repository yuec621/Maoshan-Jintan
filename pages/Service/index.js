// pages/Service/index.js
var domain="https://cztour.sytours.com";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth:0,
    winHeight:0,
    menuList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
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
    //构建menu数据
    var arr=[];
    // arr[0] = { name: '龙城攻略', pic: '../../images/service/gonglve.png', url: domain + '/Mobile/TravelNotes/Index', isOut: false };
    // arr[1] = { name: '本地天气', pic: '../../images/service/weather.png', url: 'http://e.weather.com.cn', isOut: true };
    // arr[2] = { name: '公交查询', pic: '../../images/service/publiccar.png', url: 'http://wap.czgj.cn:8081/MyBus/', isOut: true };
    // arr[3] = { name: '本地打车', pic: '../../images/service/taxi.png', url: 'http://common.diditaxi.com.cn/general/webEntry?wx=true', isOut: true };
    // arr[4] = { name: '本地租车', pic: '../../images/service/rantcar.png', url: 'http://m.zuche.com', isOut: true };
    // arr[5] = { name: '景区厕所', pic: '../../images/service/tolite.png', url: domain + '/Mobile/Service/map/公共厕所', isOut: false };
    // arr[6] = { name: '地铁查询', pic: '../../images/service/underground.png', url: domain + '/Mobile/Home/Subway', isOut: false };
    // arr[7] = { name: '语音地图', pic: '../../images/service/voicemap.png', url: domain + '/Mobile/Map/Index', isOut: false };
    // arr[8] = { name: '停车场', pic: '../../images/service/park.png', url: 'http://map.baidu.com/mobile/webapp/search/search/qt=s&wd=%E5%81%9C%E8%BD%A6%E5%9C%BA&c=348/vt=map', isOut: true };
    // arr[9] = { name: '附近医院', pic: '../../images/service/hospital.png', url:'http://map.baidu.com/mobile/webapp/search/search/qt=s&wd=%E5%8C%BB%E9%99%A2&c=348/vt=map', isOut: true };
    // arr[10] = { name: '火车票查询', pic: '../../images/service/train.png', url:'http://m.ctrip.com/webapp/train/v2/index#!/index', isOut: true };
    // arr[11] = { name: '飞机票查询', pic: '../../images/service/airplane.png', url:'http://m.ctrip.com/html5/flight/', isOut: true };
    // arr[12] = { name: '周边银行', pic: '../../images/service/bank.png', url: 'http://map.baidu.com/mobile/webapp/search/search/foo=bar&qt=s&wd=%E9%93%B6%E8%A1%8C&c=348/vt=map', isOut: true };
    // arr[13] = { name: '猫眼电影', pic: '../../images/service/movie.png', url: 'http://m.maoyan.com/#type=movies', isOut: true };
    // arr[14] = { name: '美食娱乐', pic: '../../images/service/food.png', url:  'http://i.meituan.com/changzhou', isOut: true };
    // arr[15] = { name: '阳光导游', pic: '../../images/service/guide.png', url: domain + '/Mobile/Home/guide', isOut: false };

    arr[0] = { name: '龙城攻略', pic: '../../images/service/gonglve.png', url: domain + '/Mobile/TravelNotes/Index', isOut: false };
    arr[1] = { name: '本地天气', pic: '../../images/service/weather.png', url: 'weather', isOut: 1 };
    arr[2] = { name: '地铁查询', pic: '../../images/service/underground.png', url: domain + '/Mobile/Home/Subway', isOut: false };
    arr[3] = { name: '阳光导游', pic: '../../images/service/guide.png', url: domain + '/Mobile/Home/guide', isOut: false };
    arr[4] = { name: '景区厕所', pic: '../../images/service/tolite.png', url: 'poi?keywords=厕所', isOut: 1 };
    arr[5] = { name: '停车场', pic: '../../images/service/park.png', url: 'poi?keywords=停车场', isOut: 1 };
    arr[6] = { name: '附近医院', pic: '../../images/service/hospital.png', url: 'poi?keywords=医院', isOut: 1 };
    arr[7] = { name: '周边银行', pic: '../../images/service/bank.png', url: 'poi?keywords=银行', isOut: 1 };
    that.setData({
      menuList:arr
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  menuClick:function(options)
  {
    let dataset=options.currentTarget.dataset;
    console.log(dataset);
    if(dataset.isout===true)
    {
        wx.navigateTo({
          url: '../OutLink/outlink?url='+dataset.url,
        });
        return;
    }
    else if (dataset.isout == 1)
    {
      wx.navigateTo({
        url: dataset.url,
      });
      return; 
    }
    else
    {
      wx.navigateTo({
        url: '../web-view/webViewPage?url='+dataset.url,
      });
      return;
    }
  }
})