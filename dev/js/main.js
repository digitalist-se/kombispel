/////////////////////////////////////////////
 //////// START jQuery
 /////////////////////////////////////////////
$(document).ready(function() {
// The customers lotteryticket
var numbers = [3,5,6,1]
// All the correct numbers
var correctNumbers = [
  [3,4,5,3], // 1 rätt
  [1,3,4,9], // 1 rätt
  [3,3,6,7], // Alla rätt
  [0,5,2,8], // Alla Fel
  [1,1,6,5], // Alla Fel
  [3,3,6,8], // 0, 1, 2 rätt
  [3,3,8,7]  // 0, 1, 3 rätt
]
// Check how correct each array is in number. Eg
// If an array matches by two digits the value will be two
var correctAmount = [];
var winning = false;

// Function to push the value to the array
checkArray = (x) => {
  let correct = 0;
  for (var i = 0; i < correctNumbers[x].length; i++) {
      if(correctNumbers[x][i] == numbers[i]) {
      correct++;
      }
    }
    correctAmount.push(correct);
}
// Call the function
for (var i = 0; i < correctNumbers.length; i++) {
checkArray(i);
}

// Check which number is the highest in the array
getMaxOfArray = (numArray) =>  Math.max.apply(null, numArray);

// Get the number
var highestNumber = getMaxOfArray(correctAmount);
if(highestNumber === numbers.length) {
  winning = true;
}
// The array that we are gonna use in the animation and compare with
var drawArray = correctNumbers[correctAmount.indexOf(highestNumber)];

console.log(drawArray);

/////////////////////////////////////////////
// *
// LOTTERY ANIMATION
// *
/////////////////////////////////////////////
var lotteryNumbers = document.getElementsByClassName('Lottery-number');

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

/////////////////////////////////////////////
// START ROLLING THE NUMBERS
/////////////////////////////////////////////
var counter = 0;

function rollNumbers() {


  // for (var i = 0; i < lotteryNumbers.length; i++) {
  //   lotteryNumbers[i].className = "Lottery-number Lottery-number--spinning";
  // }




  if(counter<lotteryNumbers.length)
    {
      lotteryNumbers[counter].className = "Lottery-number Lottery-number--spinning";
      setTimeout(function()
      {
        rollNumbers()
      }, 1000
    );
       counter++;
    }
}


rollNumbers();
console.log("Restart");


// rollNumbers()
// setTimeout(function(){ rollNumbers(); }, 500);

var y = 0;
var spinnTime = 5000; //

// var ratio = 5000 * 0.7;
// console.log(numbers[0] * 0.1);

var ratio = 5000 * ( numbers[0] / 10);

console.log(ratio);

function correct() {

  var stop = 4000; // INITIAL VALUE (Kinda pointless)

  if(y < numbers.length)
    {
      if(numbers[y+1] > numbers[y]) {
        console.log("Nästa siffra är högre");
        stop = 1000 + (((numbers[y+1] - numbers[y])*spinnTime)/10);
      }
      else {





        console.log("Nästa siffra är lägre");
      }













      lotteryNumbers[y].className = "Lottery-number";
      lotteryNumbers[y].innerHTML = "<div>"+numbers[y]+"</div>";
      setTimeout(function()
      {
        correct()
      },
      stop
      //1000+(numbers[y]*1000)
      // 1000+(numbers[y]*1000)
    );
       y++;
    }
}




setTimeout(function(){ correct(); }, spinnTime+ratio);

});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvdHRlcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gLy8vLy8vLy8gU1RBUlQgalF1ZXJ5XG4gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbi8vIFRoZSBjdXN0b21lcnMgbG90dGVyeXRpY2tldFxudmFyIG51bWJlcnMgPSBbMyw1LDYsMV1cbi8vIEFsbCB0aGUgY29ycmVjdCBudW1iZXJzXG52YXIgY29ycmVjdE51bWJlcnMgPSBbXG4gIFszLDQsNSwzXSwgLy8gMSByw6R0dFxuICBbMSwzLDQsOV0sIC8vIDEgcsOkdHRcbiAgWzMsMyw2LDddLCAvLyBBbGxhIHLDpHR0XG4gIFswLDUsMiw4XSwgLy8gQWxsYSBGZWxcbiAgWzEsMSw2LDVdLCAvLyBBbGxhIEZlbFxuICBbMywzLDYsOF0sIC8vIDAsIDEsIDIgcsOkdHRcbiAgWzMsMyw4LDddICAvLyAwLCAxLCAzIHLDpHR0XG5dXG4vLyBDaGVjayBob3cgY29ycmVjdCBlYWNoIGFycmF5IGlzIGluIG51bWJlci4gRWdcbi8vIElmIGFuIGFycmF5IG1hdGNoZXMgYnkgdHdvIGRpZ2l0cyB0aGUgdmFsdWUgd2lsbCBiZSB0d29cbnZhciBjb3JyZWN0QW1vdW50ID0gW107XG52YXIgd2lubmluZyA9IGZhbHNlO1xuXG4vLyBGdW5jdGlvbiB0byBwdXNoIHRoZSB2YWx1ZSB0byB0aGUgYXJyYXlcbmNoZWNrQXJyYXkgPSAoeCkgPT4ge1xuICBsZXQgY29ycmVjdCA9IDA7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29ycmVjdE51bWJlcnNbeF0ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKGNvcnJlY3ROdW1iZXJzW3hdW2ldID09IG51bWJlcnNbaV0pIHtcbiAgICAgIGNvcnJlY3QrKztcbiAgICAgIH1cbiAgICB9XG4gICAgY29ycmVjdEFtb3VudC5wdXNoKGNvcnJlY3QpO1xufVxuLy8gQ2FsbCB0aGUgZnVuY3Rpb25cbmZvciAodmFyIGkgPSAwOyBpIDwgY29ycmVjdE51bWJlcnMubGVuZ3RoOyBpKyspIHtcbmNoZWNrQXJyYXkoaSk7XG59XG5cbi8vIENoZWNrIHdoaWNoIG51bWJlciBpcyB0aGUgaGlnaGVzdCBpbiB0aGUgYXJyYXlcbmdldE1heE9mQXJyYXkgPSAobnVtQXJyYXkpID0+ICBNYXRoLm1heC5hcHBseShudWxsLCBudW1BcnJheSk7XG5cbi8vIEdldCB0aGUgbnVtYmVyXG52YXIgaGlnaGVzdE51bWJlciA9IGdldE1heE9mQXJyYXkoY29ycmVjdEFtb3VudCk7XG5pZihoaWdoZXN0TnVtYmVyID09PSBudW1iZXJzLmxlbmd0aCkge1xuICB3aW5uaW5nID0gdHJ1ZTtcbn1cbi8vIFRoZSBhcnJheSB0aGF0IHdlIGFyZSBnb25uYSB1c2UgaW4gdGhlIGFuaW1hdGlvbiBhbmQgY29tcGFyZSB3aXRoXG52YXIgZHJhd0FycmF5ID0gY29ycmVjdE51bWJlcnNbY29ycmVjdEFtb3VudC5pbmRleE9mKGhpZ2hlc3ROdW1iZXIpXTtcblxuY29uc29sZS5sb2coZHJhd0FycmF5KTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyAqXG4vLyBMT1RURVJZIEFOSU1BVElPTlxuLy8gKlxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgbG90dGVyeU51bWJlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdMb3R0ZXJ5LW51bWJlcicpO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IG51bWJlcnMubGVuZ3RoOyBpKyspIHtcbiAgZm9yICh2YXIgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gIHZhciBudW1iZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBpZihqID09IG51bWJlcnNbaV0pIHtcbiAgbnVtYmVyLmlubmVySFRNTCA9IGo7XG4gIG51bWJlci5jbGFzc05hbWUgPSBcImNvcnJlY3RcIjtcbiAgfSBlbHNlIHtcbiAgbnVtYmVyLmNsYXNzTmFtZSA9IFwid3JvbmdcIjtcbiAgbnVtYmVyLmlubmVySFRNTCA9IGo7XG4gIH1cbiAgbG90dGVyeU51bWJlcnNbaV0uYXBwZW5kQ2hpbGQobnVtYmVyKVxuICB9XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gU1RBUlQgUk9MTElORyBUSEUgTlVNQkVSU1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgY291bnRlciA9IDA7XG5cbmZ1bmN0aW9uIHJvbGxOdW1iZXJzKCkge1xuXG5cbiAgLy8gZm9yICh2YXIgaSA9IDA7IGkgPCBsb3R0ZXJ5TnVtYmVycy5sZW5ndGg7IGkrKykge1xuICAvLyAgIGxvdHRlcnlOdW1iZXJzW2ldLmNsYXNzTmFtZSA9IFwiTG90dGVyeS1udW1iZXIgTG90dGVyeS1udW1iZXItLXNwaW5uaW5nXCI7XG4gIC8vIH1cblxuXG5cblxuICBpZihjb3VudGVyPGxvdHRlcnlOdW1iZXJzLmxlbmd0aClcbiAgICB7XG4gICAgICBsb3R0ZXJ5TnVtYmVyc1tjb3VudGVyXS5jbGFzc05hbWUgPSBcIkxvdHRlcnktbnVtYmVyIExvdHRlcnktbnVtYmVyLS1zcGlubmluZ1wiO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpXG4gICAgICB7XG4gICAgICAgIHJvbGxOdW1iZXJzKClcbiAgICAgIH0sIDEwMDBcbiAgICApO1xuICAgICAgIGNvdW50ZXIrKztcbiAgICB9XG59XG5cblxucm9sbE51bWJlcnMoKTtcbmNvbnNvbGUubG9nKFwiUmVzdGFydFwiKTtcblxuXG4vLyByb2xsTnVtYmVycygpXG4vLyBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7IHJvbGxOdW1iZXJzKCk7IH0sIDUwMCk7XG5cbnZhciB5ID0gMDtcbnZhciBzcGlublRpbWUgPSA1MDAwOyAvL1xuXG4vLyB2YXIgcmF0aW8gPSA1MDAwICogMC43O1xuLy8gY29uc29sZS5sb2cobnVtYmVyc1swXSAqIDAuMSk7XG5cbnZhciByYXRpbyA9IDUwMDAgKiAoIG51bWJlcnNbMF0gLyAxMCk7XG5cbmNvbnNvbGUubG9nKHJhdGlvKTtcblxuZnVuY3Rpb24gY29ycmVjdCgpIHtcblxuICB2YXIgc3RvcCA9IDQwMDA7IC8vIElOSVRJQUwgVkFMVUUgKEtpbmRhIHBvaW50bGVzcylcblxuICBpZih5IDwgbnVtYmVycy5sZW5ndGgpXG4gICAge1xuICAgICAgaWYobnVtYmVyc1t5KzFdID4gbnVtYmVyc1t5XSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIk7DpHN0YSBzaWZmcmEgw6RyIGjDtmdyZVwiKTtcbiAgICAgICAgc3RvcCA9IDEwMDAgKyAoKChudW1iZXJzW3krMV0gLSBudW1iZXJzW3ldKSpzcGlublRpbWUpLzEwKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuXG5cblxuXG5cbiAgICAgICAgY29uc29sZS5sb2coXCJOw6RzdGEgc2lmZnJhIMOkciBsw6RncmVcIik7XG4gICAgICB9XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiAgICAgIGxvdHRlcnlOdW1iZXJzW3ldLmNsYXNzTmFtZSA9IFwiTG90dGVyeS1udW1iZXJcIjtcbiAgICAgIGxvdHRlcnlOdW1iZXJzW3ldLmlubmVySFRNTCA9IFwiPGRpdj5cIitudW1iZXJzW3ldK1wiPC9kaXY+XCI7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKClcbiAgICAgIHtcbiAgICAgICAgY29ycmVjdCgpXG4gICAgICB9LFxuICAgICAgc3RvcFxuICAgICAgLy8xMDAwKyhudW1iZXJzW3ldKjEwMDApXG4gICAgICAvLyAxMDAwKyhudW1iZXJzW3ldKjEwMDApXG4gICAgKTtcbiAgICAgICB5Kys7XG4gICAgfVxufVxuXG5cblxuXG5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7IGNvcnJlY3QoKTsgfSwgc3Bpbm5UaW1lK3JhdGlvKTtcblxufSk7XG4iXX0=
