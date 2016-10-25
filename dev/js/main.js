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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvdHRlcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuIC8vLy8vLy8vIFNUQVJUIGpRdWVyeVxuIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG5cbnZhciBsb3R0ZXJ5TnVtYmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ0xvdHRlcnktbnVtYmVyJyk7XG52YXIgbnVtYmVycyA9IFszLDMsNiw3XVxuXG5mb3IgKHZhciBpID0gMDsgaSA8IG51bWJlcnMubGVuZ3RoOyBpKyspIHtcbiAgZm9yICh2YXIgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gIHZhciBudW1iZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBpZihqID09IG51bWJlcnNbaV0pIHtcbiAgbnVtYmVyLmlubmVySFRNTCA9IGo7XG4gIG51bWJlci5jbGFzc05hbWUgPSBcImNvcnJlY3RcIjtcbiAgfSBlbHNlIHtcbiAgbnVtYmVyLmNsYXNzTmFtZSA9IFwid3JvbmdcIjtcbiAgbnVtYmVyLmlubmVySFRNTCA9IGo7XG4gIH1cbiAgbG90dGVyeU51bWJlcnNbaV0uYXBwZW5kQ2hpbGQobnVtYmVyKVxuICB9XG59XG5cblxuXG5jb25zb2xlLmxvZyhcIm9pYmFyb2liZWFyb2khISFcIik7XG5cblxuXG5cbn0pO1xuIl19
