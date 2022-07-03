console.log(Date.now());
var date = new Date();
console.log(date.getTime());
console.log(date.valueOf());
console.log(+date);

var dateString = "2020-5-15";
console.log(new Date(dateString).getTime());
console.log(Date.parse(dateString));


Array.prototype.prototype===Object.prototype===