//小马哥，你看下509行那儿，把录音存到后台吧...太难了
const app = getApp()

const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()

var interval;
var tempFilePath = '';
var donghuaStop = '';
var donghuaStops = '';
var number = 1;

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
    imgFilePaths: '',
    //录音
    imageShows: false,
    random: '',
    viconPlay: true,
    imageShow: '/images/diary/recordTime.png',
    recordingDuration: 0, //录音时长
    count: 0, // 设置 计数器 初始为0
    hiddenmodalput: true,
    show: false
  },

  /*日记内容存储 */
  saveDiaryContent: function (event) {
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
      title: '时光手账',
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
  touchAddNew: function () {
    var util = require('../../utils/util');
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
    newDiary["time"] = date.getHours() + ":" + util.toDouble(date.getMinutes()) + ":" + util.toDouble(date.getSeconds());

    temp.diaries.push(newDiary);
    // 日记内容为空，不能上传到服务器
    if (newDiary.content == undefined || newDiary.content == "") {
      wx.showToast({
        title: '日记内容不能为空',
        icon: 'none'
      });
      return;
    }
    // 上传当前日记到服务器
    wx.request({
      url: 'https://uestcml.com:8010/v1/diary',
      header: { 'content-type': 'application/json' },
      method: 'PUT',
      // dataType: 'json',
      data: temp,
      success: res => {
        console.log("Request Successfully!");
        if (res.data.status != 0) {
          console.log(res.data.msg);
          return;
        }
        // 更新本地日记缓存
        // 更新当地缓存(还没想好怎么写),目前暂时清空内容和标题缓存
        wx.setStorage({
          data: undefined,
          key: 'diaryTitle',
        });
        wx.setStorage({
          data: undefined,
          key: 'diaryContent',
        });
        var list = wx.getStorageSync('diaries');
        if (list.length == 0) {
          list.push(temp);
          wx.setStorageSync('diaries', list)
        } else {
          for (var i in list) {
            if (list[i].date == temp.date) {
              list[i] = temp;
              wx.setStorageSync('diaries', list)
              break;
            }
          }
          if (i >= list.length) {
            list.push(temp);
          }
        }
        this.setData({
          modalShowStyle: "",
          dairyTitle: "",
        })
        // 添加成功返回上级，同时销毁页面
        wx.redirectTo({
          url: '/pages/mainPage/mainPage',
        });
      },
      fail: () => {
        console.log("add error");
      }
    })
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
    if (this.data.show == true) {
      recorderManager.stop();
    }
    clearInterval(donghuaStops);
    clearInterval(donghuaStop);
    if (!this.data.viconPlay) {
      innerAudioContext.stop();
      this.setData({
        imageShow: '/images/diary/record.png',
        viconPlay: true
      });
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (this.data.show == true) {
      recorderManager.stop();
    }
    clearInterval(donghuaStops);
    clearInterval(donghuaStop);
    if (!this.data.viconPlay) {
      innerAudioContext.stop();
      this.setData({
        imageShow: '/images/diary/record.png',
        viconPlay: true
      });
    }
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

  },

  modalinput: function () {
    //关闭录音播放
    if (!this.data.viconPlay) {
      innerAudioContext.stop();
      this.setData({
        imageShow: '/images/diary/record.png',
        viconPlay: true
      });
    }
    if (this.data.show == false) { }
    hiddenmodalput: !this.data.hiddenmodalput,
      this.setData({
        show: !this.data.show
      })
    this.start();
  },

  //开始录音
  start: function () {
    var that = this;
    const options = {
      duration: 60000, //指定录音的时长，单位 ms
      sampleRate: 16000, //采样率
      numberOfChannels: 1, //录音通道数
      encodeBitRate: 96000, //编码码率
      format: 'mp3', //音频格式，有效值 aac/mp3
      frameSize: 50 //指定帧大小，单位 KB
    }

    //开始录音
    recorderManager.start(options);
    recorderManager.onStart(() => {
      //设置gif图片重新加载
      clearInterval(donghuaStops);
      that.setData({
        imageShows: true,
      })
      if (that.data.imageShows == true) {
        donghuaStop = setInterval(() => {
          that.setData({
            random: "?t=" + new Date().getTime()
          })
          number = number + 1;
          //当60秒执行完了 自动上传
          if (number == 2) {
            that.confirm();
          }
        }, 60000)
      }
    });
    //错误回调
    recorderManager.onError((res) => {
      console.log("错误回调")
      console.log(res);
    })
  },

  //取消按钮 不返回录音  
  cancel: function () {
    donghuaStops = setInterval(() => {
      this.setData({
        random: "?t=" + new Date().getTime()
      })
    }, 500)
    this.setData({
      show: !this.data.show
    })
    if (this.data.show == false) {
      this.setData({
        imageShow: '/images/diary/cancel.png'
      })
    }
    this.data.count = 0;
    this.shutRecording(false);
    //关闭gif动画定时器
    clearInterval(donghuaStop);
  },

  // 只有确认事件才返回录音
  confirm: function () {
    //关闭gif动画定时器
    clearInterval(donghuaStop);

    number = 1;
    donghuaStops = setInterval(() => {
      this.setData({
        random: "?t=" + new Date().getTime()
      })
    }, 500)
    this.shutRecording(true);
    this.setData({
      show: !this.data.show
    })
  },

  //播放\暂停 声音
  play: function () {
    innerAudioContext.obeyMuteSwitch = false;
    innerAudioContext.autoplay = true
    innerAudioContext.src = tempFilePath
    if (this.data.viconPlay == true) {
      innerAudioContext.play()
      this.setData({
        imageShow: '/images/diary/record.png',
        viconPlay: false
      });
    }
    //暂停事件
    else {
      innerAudioContext.stop();
      this.setData({
        imageShow: '/images/diary/record.png',
        viconPlay: true
      });
    };
    innerAudioContext.onEnded(() => {
      console.log("结束播放")
      this.setData({
        imageShow: '/images/diary/record.png',
        viconPlay: true
      });
    });
  },

  //结束录音
  shutRecording: function (booble) {

    //关闭模态框
    this.setData({
      hiddenmodalput: true
    });
    var that = this;
    recorderManager.stop();
    recorderManager.onStop((res) => {
      //用户点击说完了但是时间很短
      if (res.duration < 1000 && booble == true) {
        app.commonTip("录音时间太短")
      }
      else if (res.duration > 1000 && booble == true) {
        app.loadingTip("上传中",true)
        res.duration = res.duration * 0.001;
        wx.uoloadFile({ //靠小马哥了
          url: ``, //这是你自己后台的连接
          filePath: res.tempFilePath,
          name: "", //后台要绑定的名称
          header: {
            'X-Auth-Token': app.getToken()
          },
        formData: {
          recordingtime: res.duration.toFixed(0),
          topicid: that.data.topicid,
          userid: 1,
          praisepoints: 0
        },
        success: (ress) => {
          var ress = JSON.parse(ress.data);
          if (ress.e == 200) {
            that.setData({
              recordingDuration: res.duration.toFixed(0), //录音的本地地址
            });
            tempFilePath = ress.d.filepath
          }
          app.loadingTip('上传中', false)
          wx.showToast({
            title: '保存完成',
            icon: 'success',
            duration: 2000,
            mask: true,
          })
          number=-1;
      },
        fail: function (ress) {
          console.log("录音保存失败");
        }
    })
    }
  })
  }  
})
  