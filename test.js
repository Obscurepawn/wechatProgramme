var myDate = new Date();
month = myDate.getMonth();
function test(month){
    return month+1;
}
console.log(month)
console.log(typeof(month))
console.log(test(month))