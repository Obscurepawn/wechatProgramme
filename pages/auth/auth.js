// pages/auth/auth.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  next: function () {
    wx.redirectTo({
      url: '/pages/mainPage/mainPage',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    let that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            /* 
              if successfully get userinfo
              jump to mainPage
            */
            success: res => {
              getApp().globalData.userInfo = res.userInfo
              that.next()
            }
          });
        }
      }
    })
  },
  // 点击“授权登录” 获取用户信息并跳转页面
  bindUserInfo(res) {
    let app = getApp();
    let that = this;
    // 登录
    wx.login({
      success: r => {
        //  // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = r.code; //登录凭证
        if (code) {
          //2、调用获取用户信息接口
          wx.getUserInfo({
            success: function (res) {
              //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
              wx.request({
                url: 'http://47.102.203.228:5000/openId', //自己的服务接口地址
                method: 'post',
                header: {
                  'content-type': 'application/json'
                },
                data: {
                  encryptedData: res.encryptedData,
                  iv: res.iv,
                  code: code
                },
                success: function (res) {
                  //4.解密成功后 获取自己服务器返回的结果
                  if (res.data.return_code == 0) {
                    app.globalData.openId = res.data.data.openId;
                    console.log(app.globalData.openId);
                    //5. 获取初始账单信息
                    wx.request({
                      url: 'http://47.102.203.228:5000/init',
                      data: {
                        openId: app.globalData.openId
                      },
                      header: {
                        'content-type': 'application/json'
                      },
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
                    // 6. 请求日记信息
                    wx.request({
                      url: 'http://106.15.198.136:8001/v1/diary/'+ app.globalData.openId,
                      method:'GET',
                      success: res => {
                        var diaries = res.data.data.diaries;
                        var date;
                        for(let i in diaries) {
                          date = new Date(diaries[i].time)
                          diaries[i].time = date.toLocaleTimeString()
                        }
                        wx.setStorageSync('diaries', diaries);
                        console.log('Resd diary from server');
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

                    // 成功登录后跳转页面
                    that.next()
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
              console.log('获取用户信息失败');
            }
          })
        } else {
          console.log('获取用户登录态失败！' + r.errMsg);
        }
      },
      fail: function () {
        console.log('登陆失败了');
        return;
      }
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

  }
})