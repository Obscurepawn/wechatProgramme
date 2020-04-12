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

module.exports = {
  formatTime: formatTime,
  dateFormat: dateFormat,
  getRequestTimestamp: getRequestTimestamp,
  compareDate: compareDate,
}