// pages/Line/Order.js
var domain = 'https://cztour.sytours.com';
Page({
  data:{
    pri:0,
    chi_pri:0,
    old_pri:0,
    ins_pri:0,
    Total_pri:0,
    date:"选择日期",
    array: ['0','1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'
      , '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62'
      , '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100'],
    aindex: 0,
    cindex: 0,
    oindex: 0,
    iindex: 0,
    coupontext:"--请选择优惠券--"
  },
  onLoad: function (options) {
    wx.setStorageSync('pri', 0);
    wx.setStorageSync('chi_pri', 0);
    wx.setStorageSync('old_pri', 0);
    wx.setStorageSync('ins_pri', 0);
    var that = this;
    wx.request({
      url: domain + '/actionapi/HomeRecommend/GetLinesPriceOrder?Lid=' + options.id,
      method: 'GET',
      success: function (res) {
        that.setData({
          linesname: res.data.linesname,
          SellPrice: res.data.baseprice,
          ChildSellPrice: res.data.childbaseprice,
          OldSellPrice: res.data.oldbaseprice,
          Insurance: res.data.insurance,
          startdate: res.data.startdate,
          enddate : res.data.enddate
        });
        wx.setStorageSync('Lid', options.id);
        wx.setStorageSync('SellPrice', res.data.baseprice);
        wx.setStorageSync('ChildSellPrice', res.data.childbaseprice);
        wx.setStorageSync('OldSellPrice', res.data.oldbaseprice);
        wx.setStorageSync('Insurance', res.data.insurance);
      }
    })
    var ahtml = '[{"count":1}]';
    var jj = JSON.parse(ahtml);
    that.setData({
      pasAdult: jj
    })
//获取优惠券
    wx.request({
      url: domain + '/actionapi/HomeRecommend/GetUserCoupon?UserId=' + wx.getStorageSync("userid"),
      method: 'GET',
      success: function (res) {
        console.log("coures", res.data)
        if (res.data.length !== 0) {
          that.setData({
            couponarray: res.data.tip,
            ciid: res.data.CIId
          });
        }
      }
    })
  },
  listenerAdultPicker:function(e){
    wx.setStorageSync('Adultnum', e.detail.value);
    var that = this;
    var sellprice = wx.getStorageSync('SellPrice');
    //var adpri = wx.getStorageSync('pri');
    var chi_pri = wx.getStorageSync('chi_pri');
    var old_pri = wx.getStorageSync('old_pri');
    var ins_pri = wx.getStorageSync('ins_pri');
    that.setData({
      aindex: e.detail.value,
      pri: e.detail.value*sellprice,
      Total_pri: (e.detail.value * sellprice) + chi_pri + old_pri + ins_pri
    })
    wx.setStorageSync('pri', e.detail.value * sellprice);
    wx.setStorageSync('totalprice', (e.detail.value * sellprice) + chi_pri + old_pri + ins_pri)
    if(e.detail.value <= 1)
    {
      var ahtml = '[{"count":1}]';
      var jj = JSON.parse(ahtml);
      that.setData({
        pasAdult: jj
      })
    }
    else if(e.detail.value >1)
    {
      var html = '[{"count":1}';
      for(var i = 2;i<=e.detail.value;i++)
      {
        html = html + ',{"count":'+ i +'}';
      }
      html = html + ']';
      var jj = JSON.parse(html);
      that.setData({
        pasAdult: jj
      })
    }
  },
  listenerChildPicker: function (e) {
    var that = this;
    var ahtml = '[]';
    var jj = JSON.parse(ahtml);
    that.setData({
      chipasAdult: jj
    })
    wx.setStorageSync('Childnum', e.detail.value);
    var sellprice = wx.getStorageSync('ChildSellPrice');
    var adpri = wx.getStorageSync('pri');
    //var chi_pri = wx.getStorageSync('chi_pri');
    var old_pri = wx.getStorageSync('old_pri');
    var ins_pri = wx.getStorageSync('ins_pri');
    that.setData({
      cindex: e.detail.value,
      chi_pri: e.detail.value * sellprice,
      Total_pri: adpri + (e.detail.value * sellprice) + old_pri + ins_pri
    })
    wx.setStorageSync('chi_pri', e.detail.value * sellprice);
    wx.setStorageSync('totalprice', adpri + (e.detail.value * sellprice) + old_pri + ins_pri)
    if (e.detail.value >= 1) {
      var html = '[{"count":1}';
      if(e.detail.value > 1)
      {
        for (var i = 2; i <= e.detail.value; i++) {
          html = html + ',{"count":' + i + '}';
        }
      }
      html = html + ']';
      var jj = JSON.parse(html);
      that.setData({
        chipasAdult: jj
      })
    }
  },
  listenerOldPicker: function (e) {
    var that = this;
    var ahtml = '[]';
    var jj = JSON.parse(ahtml);
    that.setData({
      oldpasAdult: jj
    })
    wx.setStorageSync('Oldnum', e.detail.value);
    var sellprice = wx.getStorageSync('OldSellPrice');
    var adpri = wx.getStorageSync('pri');
    var chi_pri = wx.getStorageSync('chi_pri');
    //var old_pri = wx.getStorageSync('old_pri');
    var ins_pri = wx.getStorageSync('ins_pri');
    that.setData({
      oindex: e.detail.value,
      old_pri: e.detail.value * sellprice,
      Total_pri: adpri + (e.detail.value * sellprice) + chi_pri + ins_pri
    })
    wx.setStorageSync('old_pri', e.detail.value * sellprice);
    wx.setStorageSync('totalprice', adpri + (e.detail.value * sellprice) + chi_pri + ins_pri)
    if (e.detail.value >= 1) {
      var html = '[{"count":1}';
      if (e.detail.value > 1) {
      for (var i = 2; i <= e.detail.value; i++) {
        html = html + ',{"count":' + i + '}';
      }
      }
      html = html + ']';
      var jj = JSON.parse(html);
      that.setData({
        oldpasAdult: jj
      })
    }
  },
  listenerInsPicker: function (e) {
    var that = this;
    var sellprice = wx.getStorageSync('Insurance');
    var adpri = wx.getStorageSync('pri');
    var chi_pri = wx.getStorageSync('chi_pri');
    var old_pri = wx.getStorageSync('old_pri');
    //var ins_pri = wx.getStorageSync('ins_pri');
    that.setData({
      iindex: e.detail.value,
      ins_pri: e.detail.value * sellprice,
      Total_pri: adpri + (e.detail.value * sellprice) + old_pri + chi_pri
    })
    wx.setStorageSync('ins_pri', e.detail.value * sellprice);
    wx.setStorageSync('totalprice', adpri + (e.detail.value * sellprice) + old_pri + chi_pri);
  },
  listenercouponPicker: function (e) {
    var that = this;
    wx.request({
      url: domain + '/actionapi/HomeRecommend/CheckUserCoupon?UserId=' + Lid + '&CouponsItemId=' + e.detail.value + '&totalprice=' + wx.getStorageSync('totalprice'),
      method: 'GET',
      success: function (res) {
        if(res.data.status === 1)
        {
          wx.setStorageSync("CIId", e.detail.value)
          that.setData({
            ciid: e.detail.value
          })
        }
        else{
          wx.showModal({
            title: '提示',
            content: '当前优惠券不满足使用条件',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
          wx.setStorageSync("CIId", 0)
        }
      }
    })
    
},


  bindDateChange: function (e) {
    var that = this;
    var Lid = wx.getStorageSync('Lid')
    wx.request({
      url: domain + '/actionapi/HomeRecommend/GetLinesDayPrice?Lid=' + Lid+'&date='+e.detail.value,
      method: 'GET',
      success: function (res) {
        if(res.data.status ===1)
        {
          var Adultnum = wx.getStorageSync('Adultnum');
          var Childnum = wx.getStorageSync('Childnum');
          var Oldnum = wx.getStorageSync('Oldnum');
          var insprice = wx.getStorageSync('ins_pri');
          that.setData({
            date: e.detail.value,
            SellPrice: res.data.SellPrice,
            ChildSellPrice: res.data.ChildSellPrice,
            OldSellPrice: res.data.OldSellPrice,
            adpri: Adultnum * res.data.SellPrice,
            chi_pri: Childnum * res.data.ChildSellPrice,
            old_pri: Oldnum * res.data.OldSellPrice,
            Total_pri: insprice + (Adultnum * res.data.SellPrice) + (Childnum * res.data.ChildSellPrice) + (Oldnum * res.data.OldSellPrice)
          })
          wx.setStorageSync('SellPrice', res.data.SellPrice);
          wx.setStorageSync('ChildSellPrice', res.data.ChildSellPrice);
          wx.setStorageSync('OldSellPrice', res.data.OldSellPrice);
          wx.setStorageSync('pri', Adultnum * res.data.SellPrice);
          wx.setStorageSync('chi_pri', Childnum * res.data.ChildSellPrice);
          wx.setStorageSync('old_pri', Oldnum * res.data.OldSellPrice);
          wx.setStorageSync('totalprice', insprice + (Adultnum * res.data.SellPrice) + (Childnum * res.data.ChildSellPrice) + (Oldnum * res.data.OldSellPrice))
        } else if (res.data.status === -1){
          wx.showToast({
            title: '该日期没有团出发,请重新选择',
            icon: 'none',
            duration: 1000,
          })
        } else if (res.data.status === 0){
          that.setData({
            date: e.detail.value
          })
        }
      }
    })
    
  },
  /**
  * 生命周期函数--监听页面卸载
  */
  onUnload: function () {
    wx.removeStorageSync('Adultnum')
    wx.removeStorageSync('Childnum')
    wx.removeStorageSync('Oldnum')
    wx.removeStorageSync('ins_pri')
    wx.removeStorageSync('SellPrice')
    wx.removeStorageSync('ChildSellPrice')
    wx.removeStorageSync('OldSellPrice')
    wx.removeStorageSync('pri')
    wx.removeStorageSync('chi_pri')
    wx.removeStorageSync('old_pri')
    wx.removeStorageSync('totalprice')
  },
  formSubmit: function(e){
    var that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var pattern = /^(\+86)?(13|14|15|17|18)[0-9]{9}$/;
    if (wx.getStorageSync('pri') === 0 && wx.getStorageSync('chi_pri') === 0 && wx.getStorageSync('old_pri') === 0 )
    {
      wx.showToast({
        title: '请选择出游人数',
        icon: 'none',
        duration: 1000,
      })
    }
    else if (e.detail.value.GoOuttime ==="选择日期")
    {
      wx.showToast({
        title: '请选择发团日期',
        icon: 'none',
        duration: 1000,
      })
    } else if (e.detail.value.ContractName === "" || e.detail.value.Mobile === "" || e.detail.value.CardNum===""){
      wx.showToast({
        title: '请填写完整的预定信息',
        icon: 'none',
        duration: 1000,
      })
    }
     else if (!pattern.test(e.detail.value.Mobile)){
      wx.showToast({
        title: '请填写正确的手机号码',
        icon: 'none',
        duration: 1000,
      })
    } else if (!(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(e.detail.value.CardNum)) && !(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(e.detail.value.CardNum))) {
      wx.showToast({
        title: '请填写正确的身份证号码',
        icon: 'none',
        duration: 1000,
      })
    }
    else{
      var formdata = JSON.stringify(e.detail.value)
      console.log("formdata", formdata)
      var ciid = wx.getStorageSync("CIId")
      if(ciid ===null||ciid==="")
      {
        ciid =0;
      }
      console.log("ciid1", ciid)
    wx.request({
      url: domain + '/actionapi/HomeRecommend/OrderSubmit?form=' + formdata + '&Lid=' + wx.getStorageSync("Lid") + '&userId=' + wx.getStorageSync("userid") + '&userName=' + wx.getStorageSync("userName") + '&couponsItemId=' + ciid,
      method: 'GET',
      success: function (res) {
        if (res.data.status ===1)
        {
          wx.showToast({
            title: '下单成功',
            icon: 'success',
            duration: 2000
          });
          setTimeout( function() {
            wx.navigateTo({
              url: '../mine/myOrder/myOrder',
            })
          },2000)
        }
        else{
          wx.showToast({
            title: '下单失败，请重试',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
    }
  }
})