var util = require('../../utils/util.js');
Page({
  data: {
    date: '',
    list: [],
    day: '',
    month: '',
    year: '',
    week: '',
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
    loading: false
  },


  onLoad: function (query) {
    console.log('query :>> ', query);
    let that = this;
    this.setData({
      loading: true
    })
    setTimeout(function () {
      that.setData({
        loading: false
      })
    }, 1500)
    var date = new Date();
    var d = Number(query.date.substring(2))
    var m = Number(query.date.substring(0, 2));
    var y = date.getFullYear();
    let time = util.formatDate(new Date());
    let dateArray = util.getDates(7, time);
    var weekString = dateArray[0].week;

    this.setData({
      day: d,
      month: m,
      year: y,
      week: weekString,
      date: query.date,
      list: getApp().globalData.list
    });

    for (var i = 0; i < this.data.list.length; i++) {
      this.data.list[i].day = i;
      this.data.list[i].month = this.data.color[i % 4].color;
    }
    this.setData({
      list: this.data.list
    });
  },
})