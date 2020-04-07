
Page({

  /**
   * 页面的初始数据
   */
  data: {
      sizes: [
        {
          index: 0,
          size: "12px",
          selected: false
        },
        {
          index: 1,
          size: "14px",
          selected: false
        },
        {
          index: 2,
          size: "16px",
          selected: false
        },
        {
          index: 3,
          size: "18px",
          selected: false
        }
      ],
      color: [
        {
          index: 0,
          color: "#000",
          selected: false
        },
        {
          index: 1,
          color: "#f00",
          selected: false
        },
        {
          index: 2,
          color: "#00ac00",
          selected: false
        },
        {
          index: 3,
          color: "#ffa0c1",
          selected: false
        }
      ],
    fontColor:'',/*在textarea属性中用来设置style */
    fontSize:'',
    textareaValue:'',
    fontBoxStyle:'',
    colorBoxStyle:'',/*点击颜色按钮，才能使得底下的颜色选择框显现出来，也就是colorBox */
    imgFilePaths: ''
  },
/*点击Tt按钮后触发该事件 */
  changeFont: function (event) {
    // let that=this;
    console.log(event.currentTarget);
    // let i=event.currentTarget.id;
    // this.data.sizes[i].selected = true;
    for (var i = 0; i < this.data.sizes.length; i++) {
      if (event.currentTarget.id == i) {
        this.data.sizes[i].selected = true
      }
      else {
        this.data.sizes[i].selected = false
      }
    }
    this.setData({
      fontSize: event.target.dataset.fontsize
    })
    this.setData(this.data);
    console.log(this.data);
  },
  
/*同上类似，点击画盘按钮触发 */
  changeColor: function (event) {
    for (var i = 0; i < this.data.color.length; i++) {
      if (event.currentTarget.id == i) {
        this.data.color[i].selected = true
      }
      else {
        this.data.color[i].selected = false
      }
    }
    this.setData(this.data);
    this.setData({
      fontColor: event.target.dataset.color
    })
  },

  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res);
        that.setData({
          imgFilePaths: res.tempFilePaths
        });
        wx.setStorage({
          key: "imageUrl",
          data: res.tempFilePaths
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    let that = this;
    wx.setNavigationBarTitle({
      title: 'Diary',
    });
    this.setData({
      textareaValue:query.content
    });
  },
/*点击Tt按钮，则会在下部显示字体大小选择按钮，并且colorbox会消失 */
  showFont:function(){
    this.setData({
      fontBoxStyle:'display:block',
      colorBoxStyle:''
    })
  },
  
  showColor:function(){
    this.setData({
      colorBoxStyle:'display:block',
      fontBoxStyle:''
    })
  },

  insPic: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9q
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res);
        that.setData({
          imgFilePaths: res.tempFilePaths
        });
        wx.setStorage({
          key: "imageUrl",
          data: res.tempFilePaths
        });
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