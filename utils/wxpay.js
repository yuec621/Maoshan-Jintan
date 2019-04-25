const wxpay = (domain,baseNo,openid)=>{
    wx.request({
        url: domain + '/actionapi/PersonalCenter/GetPayParams?baseNo=' + baseNo + '&openid=' + openid,
        method: 'GET',
        success: function (res) {
            if (res.data.code == 200) {
                var params = res.data.params;
                wx.requestPayment({
                    timeStamp: params['timeStamp'],
                    nonceStr: params['nonceStr'],
                    package: params['package'],
                    signType: params['signType'],
                    paySign: params['paySign'],

                    success: function (res) {
                        wx.showModal({
                            title: '支付成功',
                            content: '',
                            showCancel: false,
                        });
                    },
                    fail: function (res) {
                        if (res.errorMsg == 'requestPayment:fail cancel') {
                            wx.request({
                                url: domain + '/actionapi/PersonalCenter/CloseOrder?baseNo=' + baseNo,
                                success:function(r){
                                    //用户取消
                                    wx.showModal({
                                        title: '支付已取消',
                                        content: '',
                                        showCancel: false,
                                    });
                                }
                            })
                        }
                        else {
                            wx.showModal({
                                title: '支付失败，请联系管理员',
                                content: '',
                                showCancel: false,
                            });
                        }
                    }
                });
            }
            else {
                wx.showModal({
                    title: '支付失败，请联系管理员',
                    content: '',
                    showCancel: false,
                });
            }
        },
    });
}


module.exports = {
        wxpay: wxpay
}


