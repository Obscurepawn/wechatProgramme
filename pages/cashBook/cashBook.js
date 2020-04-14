// pages/cashBook/cashBook.js
var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    useList: [
      "book",
      "financial",
      "food",
      "house",
      "play",
      "other",
      "transpotation",
    ],
    useIndex: 0,
    input_amount: undefined,
    input_comment: undefined,
    input_payer: undefined,
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
      {
        "text": "增加记录",
        "iconPath": "/images/cashBook/add.png",
        "selectedIconPath": "/images/cashBook/add.png",
        dot: 'true'
      },
    ],
    icon_path: {
      "transpotation": "/images/cashBook/transpotation.png",
      "financial": "/images/cashBook/financial.png",
      "book": "/images/cashBook/book.png",
      "food": "/images/cashBook/food.png",
      "house": "/images/cashBook/house.png",
      "play": "/images/cashBook/play.png"
    },
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    time: undefined,
    showTime: undefined,
    expenditrue: 0,
    income: 0,
    // searchResultText:undefined,
    groups: [{
        date: "2020-04-09",
        income: undefined,
        expenditrue: undefined,
        detail: [{
            usefulness: "transpotation",
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
        date: "2020-04-07",
        income: undefined,
        expenditrue: undefined,
        detail: [{
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
        date: "2020-04-02",
        income: undefined,
        expenditrue: undefined,
        detail: [{
            usefulness: "transpotation",
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
        date: "2020-03-31",
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
            usefulness: "financial",
            amount: 180,
            comments: "投资收益",
            payer: "Me",
          },
        ]
      },
      {
        date: "2020-03-09",
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
    show: [],
    bill_attributes: [
      "usefulness",
      "amount",
      "comments",
      "payer"
    ],
    tab: -1,
    // picker_value: [1],
    // inputShowed: false,
    // inputVal: "",
  },

  newIndexOf: function (list, data) {
    list.forEach(value => {
      if (value == data) {
        return true;
      }
    });
    return false;
  },

  makeList: function (val, groups) {
    let list = val.split(" ");
    console.log(list)
    console.log(groups)
    let count = 0;
    let temp = [];
    groups.forEach(element => {
      count = 0;
      if (element.date.search(val) != -1 || this.newIndexOf(list, element.date)) {
        count += 1;
      }
      if (element.income == val || this.newIndexOf(list, element.income)) {
        count += 1;
      }
      if (element.expenditrue == val || this.newIndexOf(list, element.expenditrue)) {
        count += 1;
      }
      element.detail.forEach(bill => {
        this.data.bill_attributes.forEach(attribute => {
          if (this.newIndexOf(list, bill[attribute])) {
            count += 1
          } else if (typeof bill[attribute] == "string") {
            if (bill[attribute].search(val) != -1) {
              count += 1
            }
          } else if (typeof bill[attribute] == "number") {
            if (bill[attribute] == val) {
              count += 1;
            }
          }
        });
      });
      if (count != 0) {
        temp.push(element);
        temp[temp.length - 1].count = count;
      }
    })
    return temp.sort(function (a, b) {
      return b.count - a.count
    });
  },

  makeText: function (list) {
    console.log(list)
    let ret = [];
    let temp;
    list.forEach(element => {
      temp = ""
      temp += element.date + ";";
      element.detail.forEach(bill => {
        temp += bill.comments + ";";
      })
      ret.push({
        text: temp
      });
    });
    console.log(ret);
    return ret;
  },

  tabChange(e) {
    console.log('tab change', e.detail.index);
    if (e.detail.index == 2) {
      this.setData({
        tab: 2,
        showTime: this.data.time,
      })
    }
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
      path1 = basePath + str1;
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

  search: function (value) {
    return new Promise((resolve, reject) => {
      resolve(this.makeText(this.makeList(value, JSON.parse(JSON.stringify(this.data.groups)))))
    });
    // JSON.parse(JSON.stringify(object)) //对象深拷贝
  },

  inputAmount(e) {
    console.log(e.detail.value)
    this.setData({
      input_amount: e.detail.value
    })
  },

  inputPayer(e) {
    console.log(e.detail.value)
    this.setData({
      input_payer: e.detail.value
    })
  },

  inputComment(e) {
    console.log(e.detail.value)
    this.setData({
      input_comment: e.detail.value
    })
  },

  bindDateChange(e) {
    console.log(e.detail.value);
    this.setData({
      showTime: e.detail.value
    })
    console.log(this.data.showTime);
  },

  bindUseChange(e) {
    this.setData({
      useIndex: e.detail.value
    })
  },

  selectResult: function (e) {
    let list = e.detail.item.text.split(";");
    console.log(list);
    let date = list[0];
    console.log(date);
    let temp = [];
    this.data.groups.forEach(element => {
      console.log(element);
      if (element.date == date) {
        temp.push(element);
        this.setData({
          show: temp
        });
        return;
      }
    })
    console.log('select result', e.detail.item.text)
  },

  modalCancel() {
    this.setData({
      tab: -1
    })
  },

  dateCompare: function (a, b) {
    let date1 = a.date;
    let date2 = b.date;
    let year1 = parseInt(date1.substring(0, 4));
    let year2 = parseInt(date2.substring(0, 4));
    if (year1 != year2) {
      return year2 - year1;
    }
    let month1 = parseInt(date1.substring(5, 7));
    let month2 = parseInt(date2.substring(5, 7));
    if (month1 != month2) {
      return month2 - month1;
    }
    let Date1 = parseInt(date1.substring(8));
    let Date2 = parseInt(date2.substring(8));
    if (Date1 != Date2) {
      return Date2 - Date1;
    }
    return 0;
  },

  // usefulness: "transpotation",
  // amount: -15,
  // comments: "回学校",
  // payer: "Jankos",
  // date: "2020-03-09",
  // income: undefined,
  // expenditrue: undefined,
  // detail:
  modalConfirm(e) {
    this.setData({
      tab: -1
    })
    let newItem = new Object();
    newItem.usefulness = this.data.useList[this.data.useIndex];
    newItem.amount = this.data.input_amount;
    newItem.comments = this.data.input_comment;
    newItem.payer = this.data.input_payer;
    let isDateExist = false;
    this.data.groups.forEach(element => {
      if (element.date == this.data.showTime) {
        element.detail.push(newItem);
        isDateExist = true;
        if (newItem.amount < 0) {
          element.expenditrue += newItem.amount;
        } else {
          element.income += newItem.amount;
        }
      }
    })
    if (isDateExist == false) {
      let dateBill = new Object();
      let detail = [];
      detail.push(newItem);
      console.log(this.data.showTime);
      dateBill.date = this.data.showTime;
      dateBill.expenditrue = 0;
      dateBill.income = 0;
      if (newItem.amount < 0) {
        dateBill.expenditrue += newItem.amount;
      } else {
        dateBill.income += newItem.amount;
      }
      dateBill.detail = detail;
      this.data.groups.push(dateBill);
      this.data.groups.sort(this.dateCompare);
      console.log(dateBill);
      this.setData({
        show: this.data.groups,
      })
    }
  },

  timeAssign: function () {
    return this.data.year + ((this.data.month < 10) ? "-0" : "-") + this.data.month + ((this.data.date < 10) ? "-0" : "-") + this.data.date;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      search: this.search.bind(this),
      time: this.timeAssign()
    });
    this.getSum(this.data.groups);
    this.setData({
      show: this.data.groups
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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