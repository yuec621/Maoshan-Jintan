// pages/HomePage/Index.js
var urlhelper = require("../../utils/url.js")
require("../../utils/myfunc.js")
//文件引用  
var CusBase64 = require('../../utils/base64.js');
var Unionid = ''//储存获取到Unionid
var domain = 'https://www.chinamaoshan.cn';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    
    indicatorDots: true,//是否出现焦点
    autoplay: true,//是否自动播放
    interval: 5000,//自动播放时间
    duration: 1000, //滑动动画时间
    circular: true,//是否采用衔接滑动

    

    //菜单
    menuList: [
      {
        id: 1, title: "茅山·肴", url: "https://i.meituan.com/changzhou/all/?cid=2&stid_b=1&cateType=poi", imageUrl: "../../images/menu/nav-pic2.png"
      },
      {
        id: 2, title: "茅山·居",
        url: "https://www.chinamaoshan.cn/Mobile/Hotel",
         imageUrl: "../../images/menu/nav-pic4.png"
      },
      {
        id: 3, title: "茅山·行", url: "https://www.chinamaoshan.cn/Mobile/TravelNotes/Index", imageUrl: "../../images/menu/nav-pic3.png"
      },
      {
        id: 4, title: "优惠预订", url: "https://www.chinamaoshan.cn/Mobile/News/Index", imageUrl: "../../images/menu/nav-pic6.png"
      },
      {
        id: 5, title: "茅山·趣", url: "https://www.chinamaoshan.cn/Mobile/Scenicintro", imageUrl: "../../images/menu/nav-pic1.png"
      },
         
      {
        id: 6, title: "茅山·道", 
        url: "https://www.chinamaoshan.cn/Mobile/Scenicintro",
        imageUrl: "../../images/menu/nav-pic5.png"
      },
      

      {
        id: 7, title: "茅山·礼", url: "https://www.chinamaoshan.cn/Mobile/TravelVideo/Index", imageUrl: "../../images/menu/nav-pic7.png"
      },
      {
        id: 8, title: "茅山资讯", url: "https://www.chinamaoshan.cn/Mobile/News/Index", imageUrl: "../../images/menu/nav-pic8.png"
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
        wx.setStorage({
          key: 'code',
          data: res.code,
        });
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
              wx.setStorage({
                key: 'session_key',
                data: res.data.session_key,
              });
              if (res.data.success === true) {
                if (res.data.unionid !== null) {
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
      url: domain +'/actionapi/HomeRecommend/GetAdList', //接口地址
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
      url: domain +'/actionapi/HomeRecommend/GetVideoList', //接口地址
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
    //最新资讯
    wx.request({
      url: domain +'/actionapi/HomeRecommend/GetNewsList?p=1&ps=5', //接口地址
        data: {
        },
        header: {
          "Content-Type": "application/json"
        },
        success: function (res) {
       
          //将获取到的json数据，存在名字叫goodsList的这个数组中
          that.setData({
            infomationList: res.data

          })
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

  agreeGetUser: function (e) {
    this.setData({
      showModel: false
    })
    var userinfo = e.detail.userInfo
    Unionid = getApp().globalData.unionid;//获取到的Unionid
    if (Unionid !="") {
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
     
      else if (dataset.url == this.data.menuList[2].url)
      {
        wx.navigateTo({
          url:'../web-view/webViewPage?url=' + dataset.url
        });
        return;
      }
      else if (dataset.url == this.data.menuList[0].url)
      {
        wx.navigateTo({
          url: '../food/list',
        });
        return;
      }
      
     
      else if (dataset.url == this.data.menuList[4].url) {
        wx.navigateTo({
          url: '../scenicspot/list',
        });
        return;
      }
      else if (dataset.url == this.data.menuList[3].url) {
        wx.navigateTo({
          url: '../reserve/list',
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
  //热门资讯详情
  infoClick:function(e){
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
    console.log(dataset)
    if (dataset.url) {
      wx.navigateTo({
        // url: '../web-view/webViewPage?url=' + dataset.url,
        url: '../food/list',

        success: function (res) {
          console.log("goodMoreClick success")
        },
        fail: function (err) {
        }
      });
    }
  },
  newsMore: function (e) {
    //首页热门新闻更多点击事件
    var dataset = e.currentTarget.dataset;
    console.log(dataset)
    if (dataset.url) {
      wx.navigateTo({
        url: '../web-view/webViewPage?url=' + dataset.url,
       

        success: function (res) {
          console.log("newsMoreClick success")
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
  },

  foodClick:function(options){
    var id = options.target.dataset.id;
    wx.navigateTo({
      url: '../food/detail?id=' + id,
    })
  }
})