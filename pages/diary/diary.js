Page({

  /**
   * 页面的初始数据
   */
  data: {
    sizes: [{
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
    color: [{
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
    dairyTitle: '',
    fontColor: '',
    /*在textarea属性中用来设置style */
    fontSize: '',
    textareaValue: '',
    fontBoxStyle: '',
    colorBoxStyle: '',
    /*点击颜色按钮，才能使得底下的颜色选择框显现出来，也就是colorBox */
    imgFilePaths: ''
  },

  /*日记内容存储 */
  saveDiaryContent: function (event) {
    console.log(event);
    this.setData({
      textareaValue: event.detail.value
    });
    wx.setStorage({
      key: 'diaryContent',
      data: event.detail.value
    });
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
      } else {
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
      } else {
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
    let buf = wx.getStorageSync('diaryContent') || [];
    wx.setNavigationBarTitle({
      title: 'Diary',
    });
    // 内容为缓存区或者空内容
    this.setData({
      textareaValue: buf
    });
  },
  /*点击Tt按钮，则会在下部显示字体大小选择按钮，并且colorbox会消失 */
  showFont: function () {
    this.setData({
      fontBoxStyle: 'display:block',
      colorBoxStyle: ''
    })
  },

  showColor: function () {
    this.setData({
      colorBoxStyle: 'display:block',
      fontBoxStyle: ''
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
  /*点击确定按钮，弹出输入标题*/
  showSave: function () {
    this.setData({
      modalShowStyle: "opacity:1;pointer-events:auto;"
    })
  },
  /*输入标题后进行存储 */
  titleInput: function (event) {
    var title = event.detail.value;
    // 输入过程实时更新标题
    this.setData({
      dairyTitle: event.detail.value,
    });
  },

  /*点击确定按钮 先将标题存储，然后输入框消失 */
  touchAddNew: function (event) {
    console.log(this.data.dairyTitle);
    // 检查标题是否为空
    if (this.data.dairyTitle == "") {
      wx.showToast({
        title: '标题不能为空',
        icon: 'none',
        duration: 500
      })
      return;
    }
    //存储数据库
    var newDiary = {};
    let date = new Date();
    var temp = wx.getStorageSync('todayDiary');
    temp["uid"] = getApp().globalData.openId;
    newDiary["title"] = this.data.dairyTitle;
    newDiary["content"] = this.data.textareaValue;
    newDiary["time"] = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    console.log("nigger",temp);

    temp.diaries.push(newDiary);
    // 日记内容为空，不能上传到服务器
    if (newDiary.content == undefined || newDiary.content == "") {
      wx.showToast({
        title: '日记内容不能为空',
        icon: 'none'
      });
      return;
    }
    console.log(newDiary);
    // 上传当前日记到服务器
    wx.request({
      url: 'http://106.15.198.136:8001/v1/diary',
      method: 'PUT',
      dataType:'json',
      data: temp,
      success: res => {
        if(res.data.status != 0) {
          console.log(res.data.msg);
          return;
        }
        // 更新本地日记缓存
        // 更新当地缓存(还没想好怎么写),目前暂时清空内容和标题缓存
        wx.setStorage({
          data: undefined,
          key: 'diaryTitle',
        })
        wx.setStorage({
          data: undefined,
          key: 'diaryContent',
        })
        this.setData({
          modalShowStyle: "",
          dairyTitle: "",
        })
        // 添加成功返回上级，同时销毁页面
        wx.redirectTo({
          url: '/pages/mainPage/mainPage',
        });
      }
    });
  },

  /*点击取消按钮 不存储，输入框消失 */
  touchCancel: function (event) {
    this.setData({
      modalShowStyle: "",
      dairyTitle: "",
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