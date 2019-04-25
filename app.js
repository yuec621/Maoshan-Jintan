//app.js
App({
  onLaunch: function () {
    /*
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code)
        {
          console.log("code:"+res.code);
          wx.request({
            url: "http://www.cztour.com/WxOpen/OnLogin",
            data:{
              code: res.code
            },
            method: 'POST',
            dataType:'json',
            success:function(result){
              var data=result.data;
              if (data.success)
              {
                console.info("set storage");
                wx.setStorage({
                  key: 'sessionId',
                  data: data.sessionId,
                });
                wx.getUserInfo({
                  success: function(info)
                  {
                    console.info(info);
                    var encryptedData = info.encryptedData;
                    var iv= info.iv;
                    var sessionId = wx.getStorageSync('sessionId');
                    console.info(sessionId);
                    wx.request({
                      url: 'http://www.cztour.com/WxOpen/RegisterOrUpdate',
                      method:'POST',
                      header:{
                        'sessionId':sessionId
                      },
                      data:{
                        encryptedData: encryptedData,
                        iv:iv
                      },
                      success:function(){},
                    })
                  }
                })
              }
            },
            complete: function (result){
              console.info(result);
            }
          })
        } else {
          console.log(res.errMsg);
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.info("UserInfo:" + res.userInfo);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })*/
  },
  globalData: {
    userInfo: null,
    userid:null,
    userHeadImg:null,
    userName:null,
    unionid:null,
    session_key:null,
    openid:null,
    isauth:0
  }
})