var util = require('../../utils/util.js');
Page({
  data: {
    date: '',
    list: [],
    day:'',
    month:'',
    year:'',
    week:'',
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
    var date = new Date();
    var d=(date.getDate()<10? '0'+(date.getDate()) :date.getDate());
    var m=(date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):date.getMonth()+1);
    var y=date.getFullYear();
    let time = util.formatDate(new Date());
    let dateArray = util.getDates(7, time);
    var weekString=dateArray[0].week;

    this.setData({
      day:d,
      month:m,
      year:y,
      week:weekString,
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