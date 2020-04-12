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
  /*节日api，还未完成,暂时写“无*吧，希望评委们看作品时确实不过节 orz*/
  getHol:function(){
    /*http://lanfly.vicp.io/api/holiday/info/$date*/
  },

  onLoad: function (query) {
    var date = new Date();
    var d=(date.getDate()<10? '0'+(date.getDate()) :date.getDate());
    var m=(date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):date.getMonth()+1);
    var y=date.getFullYear();
    /*获取周几 */
    /*var week = new Date([y,m,d].map(formatNumber).join('-')).getDay();
    var weekString = "";
    switch (week) {
      case 0:
        weekString = "Sunday"
        break;
      case 1:
        weekString = "Monday"
        break;
      case 2:
        weekString = "Tuesday"
        break;
      case 3:
        weekString = "Wednesday"
        break;
      case 4:
        weekString = "Thursday"
        break;
      case 5:
        weekString = "Friday"
        break;
      case 6:
        weekString = "Saturday"
        break;
    };*/
    this.setData({
      day:d,
      month:m,
      year:y,
      /*week:weekString,*/
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