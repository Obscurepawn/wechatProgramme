// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inUser: true,
    name: "游客",
    userInfo: undefined,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasLogin:false,
    refused: false,
    showModal:false,
  },
  gotoCashBook: function () {
    wx.navigateTo({
      url: '/pages/cashBook/cashBook',
    })
  },
  gotoHistory: function () {
    wx.navigateTo({
      url: '/pages/hisSearch/hisSearch',
    })
  },
  gotoHomePage: function () {
    wx.navigateTo({
      url: '/pages/mainPage/mainPage',
    });
  },
  bindUser(e) {
    var that = this;
    // 用户点击不允许
    if (!e.detail.userInfo) {
      this.setData({
        refused:true,
        showModal:false
      });
      return;
    }
    // 如果openId没有获取到说明登录不正常，重新请求登录
    if(!getApp().globalData.openId) {
      this.do_login();
    }
    var userInfo = e.detail.userInfo;
    that.setData({
      userInfo: userInfo,
      hasLogin:true,
      refused:false,
      showModal:false
    });
  },
  tryLogin() {
    this.setData({
      refused:false,
      showModal:true
    });
  },
  cancel() {
    this.setData({
      refused:true,
      showModal:false
    });
  },
  do_login() {
    var that = this;
    wx.login({
      success: r => {
        //  // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = r.code; //登录凭证
        if (code) {
          //2、调用获取用户信息接口
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo;
              //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
              wx.request({
                url: 'https://uestczyj.com:5000/openId', //自己的服务接口地址
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
                    getApp().globalData.openId = res.data.data.openId;
                    getApp().globalData.userInfo = userInfo;
                    console.log(getApp().globalData.openId);
                    //获取初始账单信息
                    wx.request({
                      url: 'https://uestczyj.com:5000/init',
                      data: {
                        openId: getApp().globalData.openId
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
                        }
                      },
                      fail: function () {
                        console.log("系统错误");
                      }
                    });
                    //  获得日记
                    // wx.request({
                    //   url: 'https://uestcml.com:8010/v1/diary/' + getApp().globalData.openId,
                    //   method: "GET",
                    //   success: res => {
                    //     if (res.data.status != 0) {
                    //       return;
                    //     }
                    //     // 将服务器返回数据存入到diarylist中
                    //     var diaries = res.data.data;
                    //     //将日记List存入本地缓存，方便其他页面读取
                    //     wx.setStorage({
                    //       key: 'diaries',
                    //       data: diaries
                    //     });
                    //   }
                    // });
                    that.setData({
                      userInfo:res.userInfo
                    });
                  } else {
                    console.log('解密失败');
                  }
                },
                fail: function () {
                  console.log('系统错误');
                }
              });
            },
            // 说明此刻用户可能没有允许登录
            fail: function () {
              console.log('获取用户信息失败');
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success: res => {
        that.setData({
          userInfo: res.userInfo,
          hasLogin:true
        });
      },
      fail: () => {
        ;
      }
    })
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