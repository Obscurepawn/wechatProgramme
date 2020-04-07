var util = require('../../utils/util.js');
Page({
  data: {
    date: '',
    list: [],
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
    ]
  },
  onLoad: function (query) {
    this.setData({
      date: query.date,
      list: getApp().globalData.list
    });
    for(var i = 0;i < this.data.list.length;i++){
        this.data.list[i].day=i;
        this.data.list[i].month=this.data.color[i%4].color;
    }
    this.setData({
      list:this.data.list
    });
  },
})