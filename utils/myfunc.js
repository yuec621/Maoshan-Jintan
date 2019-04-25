var urlhelper = require("url.js")
var CusBase64 = require('base64.js');
wx.pro = {};
wx.pro.request = function (obj) {
    obj.url = "https://cztour.sytours.com/redirect?url=" + urlhelper.UrlEncode(obj.url);
    if(obj.method=="POST")
    {
        obj.url = obj.url + "&data=" + CusBase64.CusBASE64.encoder(obj.data);
        obj.data={};
    }
    console.log("url:"+obj.url);
    wx.request(obj);
}