// pages/diary/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: -1,
    diary: []
  },

  delDiary() {
    let that = this
    wx.showModal({
      title: '确定删除该日记吗?',
      cancelColor: 'red',
      success: res => {
        if (res.confirm) {
          wx.request({
            url: 'http://106.15.198.136:8007/v1/diary',
            header: {
              'content-type': 'application/json'
            },
            method: 'DELETE',
            dataType: 'json',
            data: this.diary,
            //删除成功
            success: res => {
              if (res.statusCode == 200) {
                // 同时删除缓存中的日记
                var diaryList = wx.getStorageSync('diaryList');
                if (diaryList != undefined) {
                  diaryList = diaryList.splice(that.index, 1);
                  wx.setStorageSync('diaryList', diaryList);
                }
                wx.navigateBack({
                  complete: (res) => {},
                })
              }
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
    var dirList = wx.getStorageSync('diaryList');
    var dir = [];
    for (var i = 0; i < dirList.length; i++) {
      if (dirList[i].did == id) {
        dir = dirList[i];
        break;
      }
    }
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
    console.log(i);
    this.setData({
      index: i,
      diary: dir
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