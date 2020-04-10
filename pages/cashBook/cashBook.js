// pages/cashBook/cashBook.js
var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      "text": "统计图",
      "iconPath": "/images/cashBook/line-chart.jpg",
      "selectedIconPath": "/images/cashBook/line-chart.jpg",
      dot: 'true'
    },
    {
      "text": "AA分账",
      "iconPath": "/images/cashBook/calculator.jpg",
      "selectedIconPath": "/images/cashBook/calculator.jpg",
      dot: 'true'
    },
    ],
    icon_path: {
      "car": "/images/cashBook/car.png",
      "financial": "/images/cashBook/financial.png",
      "book": "/images/cashBook/book.png",
      "food": "/images/cashBook/food.png",
      "house": "/images/cashBook/house.png",
      "play": "/images/cashBook/play.png"
    },
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate() + 1,
    time: util.formatTime(new Date()).substring(0, 10),
    expenditrue: 0,
    income: 0,
    groups: [
      {
        date: "2020-4-9",
        income: undefined,
        expenditrue: undefined,
        detail: [{
          usefulness: "car",
          amount: -15,
          comments: "回学校",
          payer: "Jankos"
        },
        {
          usefulness: "food",
          amount: -7,
          comments: "吃早餐",
          payer: "Me"
        },
        {
          usefulness: "play",
          amount: -300,
          comments: "买最新款的游戏",
          payer: "Me",
        },
        ]
      },
      {
        date: "2020-4-7",
        income: undefined,
        expenditrue: undefined,
        detail: [
          {
            usefulness: "house",
            amount: -7000,
            comments: "付房租",
            payer: "Me",
          },
          {
            usefulness: "financial",
            amount: 13000,
            comments: "发工资",
            payer: "Boss",
          },
          {
            usefulness: "book",
            amount: -50,
            comments: "买《白夜行》",
            payer: "Me",
          },
        ]
      },
      {
        date: "2020-4-2",
        income: undefined,
        expenditrue: undefined,
        detail: [{
          usefulness: "car",
          amount: -77,
          comments: "打的士",
          payer: "Me"
        },
        {
          usefulness: "food",
          amount: -89,
          comments: "吃午饭",
          payer: "Me"
        },
        {
          usefulness: "other",
          amount: 280,
          comments: "路上捡到钱",
          payer: "Me",
        },
        ]
      },
      {
        date: "2020-3-31",
        income: undefined,
        expenditrue: undefined,
        detail: [{
          usefulness: "financial",
          amount: -2000,
          comments: "买指数基金进行投资",
          payer: "Me"
        },
        {
          usefulness: "food",
          amount: -2700,
          comments: "吃晚饭",
          payer: "Boss"
        },
        {
          usefulness: "play",
          amount: -180,
          comments: "游戏充值",
          payer: "Me",
        },
        ]
      },
      {
        date: "2020-3-9",
        income: undefined,
        expenditrue: undefined,
        detail: [{
          usefulness: "book",
          amount: -80,
          comments: "买计算机组成原理教材",
          payer: "Me"
        },
        {
          usefulness: "other",
          amount: -78,
          comments: "去洗脚城按摩",
          payer: "Kris"
        },
        {
          usefulness: "other",
          amount: -300,
          comments: "给女朋友买礼物",
          payer: "Me",
        },
        ]
      },
    ],
  },

  tabChange(e) {
    console.log('tab change', e);
  },

  getMonth: function (val) {
    if (val.length < 8 || val.length > 10) {
      return "Unknown";
    }
    if (val[4] == "-") {
      return (val[6] == "-") ? val[5] : val.substring(5, 7);
    }
    return "Unknown";
  },

  getNowMonth: function () {
    var myDate = new Date();
    var month = myDate.getMonth();
    var nowMonth = month + 1;
    return nowMonth;
  },

  getSum: function (val) {
    var Expenditrue = 0;
    var Income = 0;
    var expendTemp = 0;
    var incomeTemp = 0;
    var str1 = ".expenditrue";
    var str2 = ".income";
    var str3 = "groups"
    var index = 0;
    var path1 = "";
    var path2 = "";
    var basePath = "";
    val.forEach(element => {
      element.detail.forEach(bill => {
        if (bill.amount < 0) {
          expendTemp += bill.amount;
        } else if (bill.amount > 0) {
          incomeTemp += bill.amount;
        }
      });
      basePath = str3 + '[' + index + ']' + '.';
      path1 =  basePath + str1;
      path2 = basePath + str2;
      this.setData({
        [path1]: expendTemp,
        [path2]: incomeTemp
      })
      if (this.getMonth(element.date) == this.getNowMonth()) {
        Expenditrue += expendTemp;
        Income += incomeTemp;
      }
      expendTemp = 0;
      incomeTemp = 0;
      index += 1
    })
    console.log(Expenditrue);
    console.log(Income);
    this.setData({
      expenditrue: Expenditrue,
      income: Income
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSum(this.data.groups)
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