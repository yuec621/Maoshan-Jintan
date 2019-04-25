// pages/HomePage/Index.js
var urlhelper = require("../../utils/url.js")
require("../../utils/myfunc.js")
//文件引用  
var CusBase64 = require('../../utils/base64.js');
var Unionid = ''//储存获取到Unionid
var domain = 'https://cztour.sytours.com';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //轮播图
    imgUrls: [
      {
        link: '/pages/index/index',
        img: 'http://www.cztour.com/Upload/AdInfo/201804/161336557633981.jpg'
      }, {
        link: '/pages/logs/logs',
        img: 'http://www.cztour.com/pictures/TrustSoft/AdInfo/2018319105514116.jpg'
      }, {
        link: '/pages/test/test',
        img: 'http://www.cztour.com/pictures/TrustSoft/AdInfo/2018319105549106.jpg'
      }
    ],
    indicatorDots: true,//是否出现焦点
    autoplay: true,//是否自动播放
    interval: 5000,//自动播放时间
    duration: 1000, //滑动动画时间
    circular: true,//是否采用衔接滑动

    //资讯
   infomationList: [
      {
          id: 1,
          title: "常州乡村旅游节 暨春到茅山赏",
          url: "https://cztour.sytours.com/Mobile/Service/Index",
          imageUrl: "http://img1.sytours.com/Upload/City/2016-09-19/1915594261226518.jpg",
         
      },
     
      {
        id: 2,
        title: "蜜月旅拍都来这儿花谷奇缘景区正式成为国家",
        url: "https://cztour.sytours.com/Mobile/Service/Index",
        imageUrl: "http://img1.sytours.com/Upload/City/2016-09-19/1915594966950392.jpg",
         
      },
      {
        id: 3,
        title: "茅山怡园杯 2018中国茅山",
        url: "https://cztour.sytours.com/Mobile/Service/Index",
        imageUrl: "http://img1.sytours.com/Upload/city/20160928/281811194461.jpg",
         
      }
  ],
  //美食
  cuisineList: [
    {
        id: 1,
        title: "道家三丹",
        url: "https://cztour.sytours.com/Mobile/Service/Index",
        imageUrl: "../../images/cuisine/6.jpg",
       
    },
   
    {
      id: 2,
      title: "秘制滆湖鸭",
      url: "https://cztour.sytours.com/Mobile/Service/Index",
      imageUrl: "../../images/cuisine/5.jpg",
       
    },
    {
      id: 3,
      title: "养生大鱼头",
      url: "https://cztour.sytours.com/Mobile/Service/Index",
      imageUrl: "../../images/cuisine/4.jpg",
       
    },
    {
      id: 4,
      title: "宏景豆腐",
      url: "https://cztour.sytours.com/Mobile/Service/Index",
      imageUrl: "../../images/cuisine/3.jpg",
     
  },
 
  {
    id: 5,
    title: "逍遥饼",
    url: "https://cztour.sytours.com/Mobile/Service/Index",
    imageUrl: "../../images/cuisine/2.jpg",
     
  },
  {
    id: 6,
    title: "嗜香扣肉",
    url: "https://cztour.sytours.com/Mobile/Service/Index",
    imageUrl: "../../images/cuisine/1.jpg",
     
  }
],





    
    //菜单
    menuList: [
      {
        id: 1, title: "景点景区", url: "https://cztour.sytours.com/Mobile/Service/Index", imageUrl: "../../images/menu/scenicSpot.png"
      },
      {
        id: 2, title: "美食茅山", url: "https://cztour.sytours.com/Mobile/New/Index", imageUrl: "../../images/menu/maoshanCuisine.png"
      }, {
        id: 3, title: "旅游攻略", url: "https://cztour.sytours.com/Mobile/ScenicTicket/Classify", imageUrl: "../../images/menu/tourismStrategy.png"
      },
      {
        id: 4, title: "度假酒店", url: "https://cztour.sytours.com/Mobile/Tour/Index", imageUrl: "../../images/menu/resortHotel.png"
      },
      {
        id: 5, title: "乡村旅游", url: "https://m.ctrip.com/webapp/hotel/?from=http%3A%2F%2Fm.ctrip.com%2Fhtml5%2F", imageUrl: "../../images/menu/ruralTourism.png"
      },
      {
        id: 6, title: "旅游资讯", url: "https://cztour.sytours.com/Mobile/Country/Classify", imageUrl: "../../images/menu/travelInformation.png"
      }
    
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this


    if (wx.getStorageSync('isauth') !== 1) 
    {
    wx.login({
      success: function (res) {
        console.log("code", res.code)
        if (res.code) {
          console.log("islogin", "yes")
          wx.request({
            //获取openid接口  
            url: domain + '/actionapi/PersonalCenter/WxLogin?js_code=' + res.code,
            /*data: {
              appid: APP_ID,
              secret: APP_SECRET,
              js_code: res.code,
              grant_type: 'authorization_code'
            },*/
            method: 'GET',
            success: function (res) {
              console.log("sss", res.data)
              var session_key = res.data.session_key
              getApp().globalData.openid = res.data.openid;
              wx.setStorage({
                  key: 'openid',
                  data: res.data.openid,
              });
              if (res.data.success === true) {
                if (res.data.unionid !== "") {
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
    })
    }

    wx.request({
      url: 'https://cztour.sytours.com/actionapi/HomeRecommend/GetAdList', //接口地址
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫videoList的这个数组中
        that.setData({
          imgUrls: res.data

        })
        console.log("res", res.data);
      }
    }),
    wx.request({
      url: 'https://cztour.sytours.com/actionapi/HomeRecommend/GetVideoList', //接口地址
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫videoList的这个数组中
        that.setData({
          videoList: res.data

        })
        console.log("res",res.data);
      }
    }),
      wx.request({
      url: 'https://cztour.sytours.com/actionapi/HomeRecommend/GetGoodsList', //接口地址
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

  agreeGetUser: function (e) {
    this.setData({
      showModel: false
    })
    var userinfo = e.detail.userInfo
    Unionid = getApp().globalData.unionid;//获取到的Unionid
    if (Unionid != null) {
      var that = this;
      wx.request({
        url: domain + '/actionapi/PersonalCenter/GetPersonInfo?Unionid=' + Unionid + '&openId=' + getApp().globalData.openid + '&nickName=' + userinfo.nickName + '&avatarUrl=' + userinfo.avatarUrl, //根据openid获取用户信息的接口地址
        /* data: {
           Unionid: Unionid,
           openId: getApp().globalData.openid,
           nickName: userinfo.nickName,
           avatarUrl: userinfo.avatarUrl
         },*/

        success: function (res) {
          console.log("returnres", res)
          //将获取到的json数据绑定用户信息
          wx.setStorageSync("userid", res.data.userId)
          wx.setStorageSync("userHeadImg", res.data.userHeadImg)
          wx.setStorageSync("userName", res.data.userName)
          wx.setStorageSync("userVouchers", res.data.userVouchers)
          console.log("1", wx.getStorageSync('userid'))
          console.log("2", wx.getStorageSync('userName'))
          console.log("3", wx.getStorageSync('userHeadImg'))
          console.log("4", wx.getStorageSync('userVouchers'))
        }
      })
    }
    else {
      var that = this;
      var session_key = getApp().globalData.session_key;
      var encryptedData = e.detail.encryptedData;
      var iv = e.detail.iv;
      wx.request({
        url: domain + '/actionapi/PersonalCenter/AddNewUser?encryptedData=' + encryptedData + '&iv=' + iv + '&session_key=' + session_key + '&openid=' + getApp().globalData.openid,
        method: 'GET',
        /*data: {
          encryptedData: encryptedData,
          iv: iv,
          session_key: session_key,
          openid: getApp().globalData.openid
        },*/
        success: function (res) {
          //将获取到的json数据绑定用户信息
          wx.setStorageSync("userid", res.data.userId)
          wx.setStorageSync("userHeadImg", res.data.userHeadImg)
          wx.setStorageSync("userName", res.data.userName)
          wx.setStorageSync("userVouchers", res.data.userVouchers)
        },
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

  },
  menuClick: function (e) {
    //首页菜单点击事件
    var dataset = e.currentTarget.dataset;
    if (dataset.url) {

      /*外链处理*/
      if (
        false 
        )
      {
        wx.navigateTo({
          url: '../OutLink/outlink?url='+dataset.url,
          success:function(res){
            console.log(res);
            console.log('outlink success');
          }
        });
        return;
      }
      else if (dataset.url == this.data.menuList[3].url)
      {
        wx.navigateTo({
          url: '../Line/List',
        });
        return;
      }
      else if (dataset.url == this.data.menuList[0].url)
      {
        wx.navigateTo({
          url: '../Service/index',
        });
        return;
      }
      else if( dataset.url == this.data.menuList[2].url)
      {
          wx.navigateTo({
              url: '../Scenic/list',
          });
          return;
      }
      else if (dataset.url == this.data.menuList[4].url) {
        wx.navigateTo({
          url: '../Hotel/list',
        });
        return;
      }
      else if (dataset.url == this.data.menuList[6].url) {
        wx.navigateTo({
          url: '../food/list',
        });
        return;
      }

      wx.navigateTo({
        url: '../web-view/webViewPage?url=' + dataset.url,
        success: function (res) {
          console.log("menuClick success")
        },
        fail: function (err) {
        }
      });
    }
  },
  videoMore: function (e) {
    //首页热门视频更多点击事件
    var dataset = e.currentTarget.dataset;
    if (dataset.url) {
      wx.navigateTo({
        url: '../web-view/webViewPage?url=' + dataset.url,
        success: function (res) {
          console.log("videoMoreClick success")
        },
        fail: function (err) {
        }
      });
    }
  },
  goodsMore: function (e) {
    //首页热门美食更多点击事件
    var dataset = e.currentTarget.dataset;
    if (dataset.url) {
      wx.navigateTo({
        url: '../web-view/webViewPage?url=' + dataset.url,
        success: function (res) {
          console.log("goodMoreClick success")
        },
        fail: function (err) {
        }
      });
    }
  },
  videoClick: function (e) {
    //首页文章视图点击事件
    var dataset = e.currentTarget.dataset;
    if (dataset.url) {
      console.log(dataset.url);
      console.log(urlhelper.UrlEncode(dataset.url));
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
  GoodsClick: function (e) {
    //首页文章视图点击事件
    var dataset = e.currentTarget.dataset;
    if (dataset.url) {
      console.log(dataset.url);
      console.log(urlhelper.UrlEncode(dataset.url));
      wx.navigateTo({
        url: '../web-view/webViewPage?url=' +dataset.url,
        success: function (res) {
          console.log("GoodsClick success")
        },
        fail: function (err) {
        }
      });
    }
  }
})