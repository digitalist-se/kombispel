/////////////////////////////////////////////
 //////// START jQuery
 /////////////////////////////////////////////
$(document).ready(function() {

var lotteryNumbers = document.getElementsByClassName('Lottery-number');
var numbers = [3,3,6,7]

for (var i = 0; i < numbers.length; i++) {
  for (var j = 0; j < 10; j++) {
  var number = document.createElement("div");
  if(j == numbers[i]) {
  number.innerHTML = j;
  number.className = "correct";
  } else {
  number.className = "wrong";
  number.innerHTML = j;
  }
  lotteryNumbers[i].appendChild(number)
  }
}



console.log("oibaroibearoi!!!");




});
