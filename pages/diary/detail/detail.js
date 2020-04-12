// pages/diary/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    time:"",
    content:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    var dirList = wx.getStorageSync('dirList');
    var dir=[];
    for(var i = 0;i < dirList.length; i++) {
      if(dirList[i].did == id) {
        dir = dirList[i];
        break;
      }
    }
    if(dir == []) {
      wx.showToast({
        title: '未知错误',
        icon: 'none'
      });
      wx.navigateBack({
        complete: (res) => {},
      });
    }
    this.setData({
      time: dir.time,
      title: dir.title,
      content: dir.content
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