var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
var imgdomain = 'http://www.cztour.com/';
Page({
  data: {
    weather: {},
    weather_id:0,
    time:'',
    bgstyle:''
  },
  onLoad: function() {
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({key: key});
    myAmapFun.getWeather({
      type:'live',
      success: function(data){
        var wea_id=-1;
        switch(data.weather.data){
          case '晴':
            wea_id=0;break;
          case '多云':
            wea_id=1;break;
          case '阴':
            wea_id=2;break;
          case '阵雨':
          case '雷阵雨':
            wea_id='3';break;
          case '小雨':
          case '中雨':
          case '大雨':
            wea_id = '3-1';break;
          case '雨夹雪':
            wea_id = '3-2'; break;
          case '阵雪':
          case '小雪':
          case '中雪':
            wea_id = '4'; break;
          case '大雪':
          case '暴雪':
            wea_id = '4'; break;
        }
        var gtime=data.liveData.reporttime.substring(10);
        var style='background-image:url("'+imgdomain+'/wxapp/weather/'+wea_id+'.png");background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;'
        that.setData({
          weather: data,
          weather_id:wea_id,
          time:gtime,
          bgstyle: style
        });
      },
      fail: function(info){
        // wx.showModal({title:info.errMsg})
      }
    })
  }
})