// pages/cashBook/cashBook.js
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
    month:undefined,
    year:undefined,
    expenditrue: 0,
    income: 0,
    groups: [
      {
        date: "2020-4-8",
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
      }
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
    month = myDate.getMonth();
    nowMonth = month+1;
    this.setData({
      month:nowMonth
    })
    return nowMonth;
  },

  getSum: function () {
    var Expenditrue = 0;
    var Income = 0;
    this.groups.forEach(element => {
      if (this.getMonth(element.date) == this.getNowMonth) {
        element.detail.forEach(bill => {
          if (bill.amount < 0) {
            Expenditrue += bill.amount;
          }else if(bill.amount>0){
            Income += bill.amount;
          }
        });
      }
    });
    this.setData({
      expenditrue: Expenditrue,
      income:Income
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSum()
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