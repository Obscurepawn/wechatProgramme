var util = require("../../util/util.js");
Page({
  data: {
    date: util.dateFormat(Date.now()),
    start: "1900-01-01",
    end: "3000-12-31",
    words: [],
  },

  onLoad: function () {
    var logs = wx.getStorageSync("logs") || [];
    this.setData({logs: logs.slice(0, 10)});
  },
  onShow: function () {
    var node = this;
    wx.request({
      url: 'http://119.23.53.56:8080/mysql?appId=101',
      success: function (res) {
        if(res.data.res_code === 0) {
          var list = [];
          res.data.body.forEach(function (n) {
            list.push(n.name);
          });
          node.setData({
            words: list
          })
        }
      }
    });
  },
  onChangeDate: function (event) {
    var value = event.detail.value;
    this.setData({date:value});
  },
  changeDateByTag: function (event) {
    var value = event.target.dataset.date;
    this.setData({ date: value });
  },
  search: function () {
    var date = this.data.date.substr(5).split('-').join('');
    wx.showLoading({
      title: '正在查询',
    });
    wx.request({
      url: 'http://route.showapi.com/119-42',
      data: {
        date: date,
        showapi_appid: "68354",
        showapi_sign: "255dd762226b4cb689d9b5c244374e81",
      },
      success: function (res) {
        var body = res.data.showapi_res_body;
        if (body.ret_code === 0) {
          body.list.forEach(evt => {
            evt.date = util.compareDate(evt);
          });
          getApp().list = body.list;
          wx.hideLoading();
          wx.navigateTo({
            url: '../history/history?date=' + date,
          });
        }
        else {
          wx.hideLoading();
          wx.showToast({
            title: '查询失败，' + body.error_info,
            icon: 'none'
          });
        }
      },
      fail: function (e) {
        console.log(e);
        wx.hideLoading();
        wx.showToast({
          title: '查询失败:'+e.errMsg,
          icon: "none"
        })
      }
    });
  }
})