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
  dateFormat: dateFormat,
  getRequestTimestamp: getRequestTimestamp,
  compareDate: compareDate
}