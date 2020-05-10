// pages/mainPage/mainPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //page style
    inHomePage: true, // this is for bottom menu
    cashWindowHeight: "",
    defaultCashHeight: "",
    diaryWindowHeight: "",
    defaultDiaryHeight: "",
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
    cashList: [],
    // for diary list
    diaryList: []
  },
  /**
   * 读取数据库
   */
  getDiaryFromDB() {
    var that = this;
    var diaryList = [];
    wx.request({
      url: 'http://106.15.198.136:8001/v1/diary',
      method: "GET",
      success: res => {
        // 将服务器返回数据存入到diarylist中
        for (let i = 0; i < res.data.data.length; i++) {
          var newDiary = {};
          newDiary["did"] = res.data.data[i].Did;
          newDiary["color"] = that.axisGetRandomColor();
          newDiary["title"] = res.data.data[i].Title;
          newDiary["content"] = res.data.data[i].Content;
          // 设置时间
          var d = new Date(res.data.data[i].Time);
          newDiary["time"] = d.getHours() + ':' + d.getMinutes();
          diaryList.push(newDiary);
        }
        //将日记List存入本地缓存，方便其他页面读取
        wx.setStorage({
          data: diaryList,
          key: 'dirList',
        });
        // 动态设置高度
        var diaryHeight = Math.min((1 + diaryList.length) * 120, 500);
        this.setData({
          diaryList: diaryList,
          defaultDiaryHeight: diaryHeight + "rpx",
          diaryWindowHeight: diaryHeight + "rpx",
        })
      }
    });

  },
  /**
   * 得到随机时间轴颜色
   */
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
  gotoDetailDiary: event => {
    let url = "/pages/diary/detail/detail"
    var query = "?id=" + event.currentTarget.dataset.id;
    url += query;
    wx.navigateTo({
      url: url,
    });
  },
  /** 
   * 改变页面状态，收缩展开
   */
  cashBookViewControl: function () {
    var that = this;
    let nextCond = !this.data.showCashBook;
    this.setData({
      showCashBook: nextCond,
      cashWindowHeight: nextCond ? that.data.defaultCashHeight : "80rpx"
    });
  },
  diaryViewControl: function () {
    var that = this;
    let nextCond = !this.data.showDiary;
    this.setData({
      showDiary: nextCond,
      diaryWindowHeight: nextCond ? that.data.defaultDiaryHeight : "80rpx"
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var date = new Date();
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let t = year + '年' + month + '月' // for title
    this.dateInit();
    this.getDiaryFromDB();
    this.setData({
      today: t,
      year: year,
      month: month,
      isToday: '' + year + month + now.getDate(),
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