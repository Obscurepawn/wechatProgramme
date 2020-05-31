//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    let that = this;
    // 登录
    wx.login({
      success: r => {
        //  // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = r.code;//登录凭证
        if (code) {
          //2、调用获取用户信息接口
          wx.getUserInfo({
            success: function (res) {
              //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
              wx.request({
                url: 'http://47.102.203.228:5000/openId',//自己的服务接口地址
                method: 'post',
                header: {
                  'content-type': 'application/json'
                },
                data: { encryptedData: res.encryptedData, iv: res.iv, code: code },
                success: function (res) {
                  //4.解密成功后 获取自己服务器返回的结果
                  if (res.data.return_code == 0) {
                    that.globalData.openId = res.data.data.openId;
                    console.log(that.globalData.openId);
                    //获取初始账单信息
                    wx.request({
                      url: 'http://47.102.203.228:5000/init',
                      data: { openId: that.globalData.openId },
                      header: { 'content-type': 'application/json' },
                      method: 'POST',
                      dataType: 'json',
                      success: (result) => {
                        if (result.statusCode != 200) {
                          console.log(result.message);
                        } else {
                          console.log(result.data.data);
                          wx.setStorageSync("bills", result.data.data);
                          console.log("Init Successfully");
                        }
                      },
                      fail: function () {
                        console.log("系统错误");
                      }
                    })
                    // 请求日记
                    wx.request({
                      url: 'http://106.15.198.136:8001/v1/diary/' + that.globalData.openId,
                      method: 'GET',
                      success: res => {
                        var diaries = res.data.data.diaries;
                        var date;
                        for (let i in diaries) {
                          date = new Date(diaries[i].time)
                          diaries[i].time = date.toLocaleTimeString()
                        }
                        wx.setStorageSync('diaries', diaries);
                        console.log('Read diary from server');
                      },
                      fail: () => {
                        console.log('系统错误')
                      }
                    })
                    //由于这个是网络请求，所以使用app.js的openId时需要在onReady中使用
                    //这样可确保app的网络请求完成后才进行页面数据通信
                    //也可以使用如下所示的回调函数解决
                    // if (that.userInfoReadyCallback) {
                    //    that.userInfoReadyCallback(res);
                    // }
                  } else {
                    console.log('解密失败');
                  }
                },
                fail: function () {
                  console.log('系统错误');
                }
              })
            },
            fail: function () {
              console.log('获取用户信息失败n');
            }
          })
        } else {
          console.log('获取用户登录态失败！' + r.errMsg);
        }
      },
      fail: function () {
        console.log('登陆失败');
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openId: null,
    list: []
  },
}),
  Array.prototype.remove = function (item) {
    if (this.indexOf(item) === -1) return this;
    this.splice(this.indexOf(item), 1);
    return this;
  }
