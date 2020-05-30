const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 原util
function toDouble (n) {
  n = String(n);
  return n.length === 1 ? "0"+n:n;
}

function dateFormat (timestamp) {
  var date = new Date(timestamp);
  return date.getFullYear() + "-" + toDouble(date.getMonth() + 1) + "-" + toDouble(date.getDate());
}

function getRequestTimestamp () {
  var date = new Date();
  return date.getFullYear() + toDouble(date.getMonth()) + toDouble(date.getDate()) + toDouble(date.getHours()) + toDouble(date.getMinutes()) + toDouble(date.getSeconds());
}

function compareDate (obj) {
  return obj.year + '-' + toDouble(obj.month) + '-' + toDouble(obj.day);
}

//得到时间格式2020-4-12
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')

}
//todate默认参数是当前日期，可以传入对应时间 todate格式为2020-4-12
function getDates(days, todate) {
  var dateArry = [];
  for (var i = 0; i < days; i++) {
    var dateObj = dateLater(todate, i);
    dateArry.push(dateObj)
  }
  return dateArry;
}

function dateLater(dates, later) {
  let dateObj = {};
  let show_day = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
  let date = new Date(dates);
  date.setDate(date.getDate() + later);
  let day = date.getDay();
  let yearDate = date.getFullYear();
  let month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1);
  let dayFormate = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
  dateObj.time = yearDate + '-' + month + '-' + dayFormate;
  dateObj.week = show_day[day];
  return dateObj;
}

function isToday(time1, time2) {
  let d = new Date(time1);
  if(time2 == undefined) {
    var today = new Date();
  } else {
    var today = new Date(t);
  }
  return (d.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0));
}
module.exports = {
  formatTime: formatTime,
  dateFormat: dateFormat,
  getRequestTimestamp: getRequestTimestamp,
  compareDate: compareDate,
  formatDate: formatDate,
  getDates: getDates,
  toDouble: toDouble,
  isToday: isToday
}