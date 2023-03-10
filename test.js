let moment =  require('moment');

var date = moment("2023-03-08");
var now = moment();

// if(moment().diff(date, 'minutes') > 0){
//    console.log("past time");
// }
// else if( moment().diff(date, 'minutes') <= 0 || moment().diff(date, 'minutes')<= -1440){
//    console.log("present time");
// }
// else{
//    "future time"
// }

// if()

// if (now > date) {
//    console.log(now);
// }
// else if (date == now) {
// console.log("present date");
// }
// else {
//    console.log("future date");
// }

if(moment(now).isSame(date , "day")){
   console.log("present");
}
else if(moment(now).isBefore(date)){
   console.log("future");
}
else if(moment(now).isAfter(date)){
   console.log("past");
}
// console.log(moment(now).isBefore(date));