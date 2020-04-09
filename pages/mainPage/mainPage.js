// pages/mainPage/mainPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //page style
    inHomePage: true, // this is for bottom menu
    cashWindowHeight: "500rpx",
    diaryWindowHeight: "500rpx",
    // whether to show diary of cashBook
    showCashBook: true,
    showDiary: true,
    // for calender
    today: "",
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    isTodayWeek: false,
    todayIndex: 0,
    // for cashbook list
    cashList: undefined,
    // for diary list
    diaryList: undefined
  },
  axisGetRandomColor() {
    var color = [
      "red", "blue", "green", "purple", "coral", "yellowgreen",
      "blueviolet", "aqua", "slateblue", "royalblue", "gold", "brown", "chocolate"
    ];
    var getRandNum = (min, max) => {
      var r = Math.floor(Math.random() * (max - min + 1) + min);
      return r;
    }
    return color[getRandNum(0, color.length - 1)];
  },
  /**
   * 初始化时间
   */
  dateInit: function (setYear, setMonth) {
    //全部时间的月份都是按0~11基准,显示月份才+1
    let dateArr = []; //需要遍历的日历数组数据
    let arrLen = 0; //dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth(); //没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay(); //目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate(); //获取目标月有多少天
    let obj = {};
    let num = 0;
    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        obj = {
          isToday: '' + year + (month + 1) + num,
          dateNum: num,
          weight: 5
        }
      } else {
        obj = {};
      }
      dateArr[i] = obj;
    }
    this.setData({
      dateArr: dateArr
    })
    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;
    if (nowYear == getYear && nowMonth == getMonth) {
      this.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      this.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
  },
  /** 
   * 页面跳转相关函数
   */
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
  gotoDiary: function () {
    wx.navigateTo({
      url: '/pages/diary/diary',
    })
  },
  /** 
   * 改变页面状态，收缩展开
   */
  cashBookViewControl: function () {
    let nextCond = !this.data.showCashBook;
    this.setData({
      showCashBook: nextCond,
      cashWindowHeight: nextCond?"500rpx":"80rpx"
    });
  },
  diaryViewControl: function () {
    let nextCond = !this.data.showDiary;
    this.setData({
      showDiary: nextCond,
      diaryWindowHeight:nextCond?"500rpx":"80rpx"
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // get now time in format 'xx年xx月'
    var date = new Date();
    var t = date.getFullYear() + '年' + (date.getMonth() + 1) + '月';
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    this.dateInit();
    this.setData({
      today: t,
      year: year,
      month: month,
      isToday: '' + year + month + now.getDate()
    })
    // create cashList test group
    var cashBookListTest = [{
        "color": "",
        "time": "9:00",
        "event": "充饭卡",
        "money": "$100"
      },
      {
        "color": "",
        "time": "12:10",
        "event": "捡到100元",
        "money": "$100"
      },
      {
        "color": "",
        "time": "14:17",
        "event": "吃小汉堡",
        "money": "$38"
      },
      {
        "color": "",
        "time": "14:17",
        "event": "吃小汉堡",
        "money": "$38"
      },
      {
        "color": "",
        "time": "14:17",
        "event": "吃小汉堡",
        "money": "$38"
      },
      {
        "color": "",
        "time": "14:17",
        "event": "吃小汉堡",
        "money": "$38"
      },
      {
        "color": "",
        "time": "14:17",
        "event": "吃小汉堡",
        "money": "$38"
      },
      {
        "color": "",
        "time": "14:17",
        "event": "吃小汉堡",
        "money": "$38"
      },
      {
        "color": "",
        "time": "14:17",
        "event": "吃小汉堡",
        "money": "$38"
      },
      {
        "color": "",
        "time": "14:17",
        "event": "吃小汉堡",
        "money": "$38"
      },
      {
        "color": "",
        "time": "14:17",
        "event": "吃小汉堡",
        "money": "$38"
      },
      {
        "color": "",
        "time": "14:17",
        "event": "吃小汉堡",
        "money": "$38"
      },
      {
        "color": "",
        "time": "14:17",
        "event": "吃小汉堡",
        "money": "$38"
      },
      {
        "color": "",
        "time": "14:17",
        "event": "吃小汉堡",
        "money": "$38"
      },
      {
        "color": "",
        "time": "14:17",
        "event": "吃小汉堡",
        "money": "$38"
      }
    ]
    for (var i = 0; i < cashBookListTest.length; i++) {
      cashBookListTest[i].color = that.axisGetRandomColor()
    }
    // create diaryList test group
    var diaryListTest = [{
        "color": "blue",
        "time": "0:12",
        "title": "《hello,world》"
      },
      {
        "color": "pink",
        "time": "9:12",
        "title": "《今天捡了100元,美滋滋》"
      },
      {
        "color": "yellowgreen",
        "time": "23:59",
        "title": "《小程序真好玩orz》"
      }, {
        "color": "yellowgreen",
        "time": "23:59",
        "title": "《小程序真好玩orz》"
      }, {
        "color": "yellowgreen",
        "time": "23:59",
        "title": "《小程序真好玩orz》"
      }, {
        "color": "yellowgreen",
        "time": "23:59",
        "title": "《小程序真好玩orz》"
      }, {
        "color": "yellowgreen",
        "time": "23:59",
        "title": "《小程序真好玩orz》"
      }, {
        "color": "yellowgreen",
        "time": "23:59",
        "title": "《小程序真好玩orz》"
      }, {
        "color": "yellowgreen",
        "time": "23:59",
        "title": "《小程序真好玩orz》"
      }, {
        "color": "yellowgreen",
        "time": "23:59",
        "title": "《小程序真好玩orz》"
      }, {
        "color": "yellowgreen",
        "time": "23:59",
        "title": "《小程序真好玩orz》"
      }, {
        "color": "yellowgreen",
        "time": "23:59",
        "title": "《小程序真好玩orz》"
      }, {
        "color": "yellowgreen",
        "time": "23:59",
        "title": "《小程序真好玩orz》"
      }, {
        "color": "yellowgreen",
        "time": "23:59",
        "title": "《小程序真好玩orz》"
      }, {
        "color": "yellowgreen",
        "time": "23:59",
        "title": "《小程序真好玩orz》"
      }, {
        "color": "yellowgreen",
        "time": "23:59",
        "title": "《小程序真好玩orz》"
      }, {
        "color": "yellowgreen",
        "time": "23:59",
        "title": "《小程序真好玩orz》"
      }
    ]
    for (var i = 0; i < diaryListTest.length; i++) {
      diaryListTest[i].color = that.axisGetRandomColor()
    }
    this.setData({
      cashList: cashBookListTest,
      diaryList: diaryListTest
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