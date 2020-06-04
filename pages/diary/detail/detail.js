// pages/diary/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diary: [],
    index: -1
  },

  delDiary() {
    let that = this
    wx.showModal({
      title: '确定删除该日记吗?',
      cancelColor: 'red',
      success: res => {
        if (res.confirm) {
          var temp = wx.getStorageSync('todayDiary');
          temp["uid"] = getApp().globalData.openId;
          temp.diaries.splice(that.data.index, 1);
          console.log('After:', temp);
          wx.request({
            url: 'https://uestcml.com:8010/v1/diary',
            header: {
              'content-type': 'application/json'
            },
            method: 'put',
            dataType: 'json',
            data: temp,
            //删除成功
            success: res => {
                if(res.data.status != 0) {
                  console.log("Error:",res.data.msg);
                  return;
                }
                wx.setStorageSync('todayDiary', temp);
                var list = wx.getStorageSync('diaries');
                for(let i in list) {
                  if(list[i].date == temp.date) {
                      list[i] = temp;
                      wx.setStorageSync('diaries', list)
                      break;
                  }
                }
                wx.navigateBack({
                  complete: (res) => {},
                })
            },
            fail: () => {
              wx.showToast({
                title: '删除失败',
                icon: 'none',
                duration: 1000
              })
            }
          }); // _wx.requests
        } // _if
      }, // _success
    }) // _wx.showModal
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    var dirList = wx.getStorageSync('todayDiary');
    if(dirList == undefined) {
      wx.showToast({
        title: '未知错误',
        icon: 'none',
        duration: 2000
      });
      wx.navigateBack({
        complete: (res) => {},
      });    
    }
    var dir = dirList.diaries[id];
    
    if (dir == []) {
      wx.showToast({
        title: '未知错误',
        icon: 'none',
        duration: 2000
      });
      wx.navigateBack({
        complete: (res) => {},
      });
    }
    this.setData({
      diary: dir,
      index: id
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