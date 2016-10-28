/////////////////////////////////////////////
 //////// START jQuery
 /////////////////////////////////////////////
$(document).ready(function() {
// The customers lotteryticket
var numbers = [6,5,4,5,6]
// All the correct numbers
var correctNumbers = [
  [3,4,5,3,4], // 1 rätt
  [1,3,4,9,2], // 1 rätt
  [3,3,6,7,8], // Alla rätt
  [0,5,2,8,4], // Alla Fel
  [1,1,6,5,3], // Alla Fel
  [3,3,6,8,6], // 0, 1, 2 rätt
  [3,3,8,7,4]  // 0, 1, 3 rätt
]
// Check how correct each array is in number. Eg
// If an array matches by two digits the value will be two
var correctAmount = [];
var winning = false;


// Function to push the value to the array
checkArray = (x) => {
  let correct = 0;
  for (var i = 0; i < correctNumbers[x].length; i++) {
      if(correctNumbers[x][i] === numbers[i]) {
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

console.log(drawArray+" är den närmaste och den vi kommer utgå från");

/////////////////////////////////////////////
// *
// LOTTERY ANIMATION
// *
/////////////////////////////////////////////
var lotteryNumbers = document.getElementsByClassName('Lottery-number');

var spinnInterval = 200; // Interval for spinn start for each number

for (var i = 0; i < numbers.length; i++) {
  for (var j = 0; j < 10; j++) {
  var number = document.createElement("div");
  if(j == numbers[i]) {
  number.innerHTML = j;
  // number.className = "";
  } else {
  // number.className = "";
  number.innerHTML = j;
  }
  lotteryNumbers[i].appendChild(number)
  }
}

/////////////////////////////////////////////
// START ROLLING THE NUMBERS
/////////////////////////////////////////////
var counter = 0;

var startInterval = true; // Set to true if the spinner should start at the same time

function rollNumbers() {

if(startInterval) {

    if(counter<lotteryNumbers.length)
      {
        lotteryNumbers[counter].className = "Lottery-number Lottery-number--spinning";
        setTimeout(function()
        {
          rollNumbers()
        }, spinnInterval
      );
         counter++;
      }
} else {
  for (var i = 0; i < lotteryNumbers.length; i++) {
    lotteryNumbers[i].className = "Lottery-number Lottery-number--spinning";
  }
}
}


var y = 0;
var spinnTime = 2500; // HOW LONG DOES THE ANIMATION, SYNC WITH CSS FILE
var ratio = spinnTime * ( numbers[0] / 10);

function correct() {

  var stop = 4000; // INITIAL VALUE (Kinda pointless)
  var diff = 0;

  if(y < numbers.length)
    {
      if(numbers[y+1] > numbers[y]) {
        diff = numbers[y+1] - numbers[y];
      }
      else {
        diff = 10 - (numbers[y] - numbers[y+1]);
      }

      startInterval ? stop = spinnInterval + (( diff * spinnTime )/10) : stop =  (( diff * spinnTime )/10);

      lotteryNumbers[y].className = "Lottery-number";

      if(numbers[y] === drawArray[y]) {
        lotteryNumbers[y].innerHTML = "<div class='Lottery-correct'>"+numbers[y]+"</div>";
      } else {
        lotteryNumbers[y].innerHTML = "<div class='Lottery-wrong'>"+numbers[y]+"</div>";
      }

      setTimeout(function()
      {
        correct()
      },
      stop
    );
       y++;
    }
}


var startButton = document.getElementsByClassName("Start-lottery--js")[0];

startButton.addEventListener("click",function() {
  rollNumbers();
  setTimeout(function(){ correct(); }, spinnTime+ratio);
})









});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvdHRlcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuIC8vLy8vLy8vIFNUQVJUIGpRdWVyeVxuIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4vLyBUaGUgY3VzdG9tZXJzIGxvdHRlcnl0aWNrZXRcbnZhciBudW1iZXJzID0gWzYsNSw0LDUsNl1cbi8vIEFsbCB0aGUgY29ycmVjdCBudW1iZXJzXG52YXIgY29ycmVjdE51bWJlcnMgPSBbXG4gIFszLDQsNSwzLDRdLCAvLyAxIHLDpHR0XG4gIFsxLDMsNCw5LDJdLCAvLyAxIHLDpHR0XG4gIFszLDMsNiw3LDhdLCAvLyBBbGxhIHLDpHR0XG4gIFswLDUsMiw4LDRdLCAvLyBBbGxhIEZlbFxuICBbMSwxLDYsNSwzXSwgLy8gQWxsYSBGZWxcbiAgWzMsMyw2LDgsNl0sIC8vIDAsIDEsIDIgcsOkdHRcbiAgWzMsMyw4LDcsNF0gIC8vIDAsIDEsIDMgcsOkdHRcbl1cbi8vIENoZWNrIGhvdyBjb3JyZWN0IGVhY2ggYXJyYXkgaXMgaW4gbnVtYmVyLiBFZ1xuLy8gSWYgYW4gYXJyYXkgbWF0Y2hlcyBieSB0d28gZGlnaXRzIHRoZSB2YWx1ZSB3aWxsIGJlIHR3b1xudmFyIGNvcnJlY3RBbW91bnQgPSBbXTtcbnZhciB3aW5uaW5nID0gZmFsc2U7XG5cblxuLy8gRnVuY3Rpb24gdG8gcHVzaCB0aGUgdmFsdWUgdG8gdGhlIGFycmF5XG5jaGVja0FycmF5ID0gKHgpID0+IHtcbiAgbGV0IGNvcnJlY3QgPSAwO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvcnJlY3ROdW1iZXJzW3hdLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZihjb3JyZWN0TnVtYmVyc1t4XVtpXSA9PT0gbnVtYmVyc1tpXSkge1xuICAgICAgY29ycmVjdCsrO1xuICAgICAgfVxuICAgIH1cbiAgICBjb3JyZWN0QW1vdW50LnB1c2goY29ycmVjdCk7XG59XG5cblxuLy8gQ2FsbCB0aGUgZnVuY3Rpb25cbmZvciAodmFyIGkgPSAwOyBpIDwgY29ycmVjdE51bWJlcnMubGVuZ3RoOyBpKyspIHtcbmNoZWNrQXJyYXkoaSk7XG59XG5cbi8vIENoZWNrIHdoaWNoIG51bWJlciBpcyB0aGUgaGlnaGVzdCBpbiB0aGUgYXJyYXlcbmdldE1heE9mQXJyYXkgPSAobnVtQXJyYXkpID0+ICBNYXRoLm1heC5hcHBseShudWxsLCBudW1BcnJheSk7XG5cbi8vIEdldCB0aGUgbnVtYmVyXG52YXIgaGlnaGVzdE51bWJlciA9IGdldE1heE9mQXJyYXkoY29ycmVjdEFtb3VudCk7XG5pZihoaWdoZXN0TnVtYmVyID09PSBudW1iZXJzLmxlbmd0aCkge1xuICB3aW5uaW5nID0gdHJ1ZTtcbn1cbi8vIFRoZSBhcnJheSB0aGF0IHdlIGFyZSBnb25uYSB1c2UgaW4gdGhlIGFuaW1hdGlvbiBhbmQgY29tcGFyZSB3aXRoXG52YXIgZHJhd0FycmF5ID0gY29ycmVjdE51bWJlcnNbY29ycmVjdEFtb3VudC5pbmRleE9mKGhpZ2hlc3ROdW1iZXIpXTtcblxuY29uc29sZS5sb2coZHJhd0FycmF5K1wiIMOkciBkZW4gbsOkcm1hc3RlIG9jaCBkZW4gdmkga29tbWVyIHV0Z8OlIGZyw6VuXCIpO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vICpcbi8vIExPVFRFUlkgQU5JTUFUSU9OXG4vLyAqXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnZhciBsb3R0ZXJ5TnVtYmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ0xvdHRlcnktbnVtYmVyJyk7XG5cbnZhciBzcGlubkludGVydmFsID0gMjAwOyAvLyBJbnRlcnZhbCBmb3Igc3Bpbm4gc3RhcnQgZm9yIGVhY2ggbnVtYmVyXG5cbmZvciAodmFyIGkgPSAwOyBpIDwgbnVtYmVycy5sZW5ndGg7IGkrKykge1xuICBmb3IgKHZhciBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgdmFyIG51bWJlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGlmKGogPT0gbnVtYmVyc1tpXSkge1xuICBudW1iZXIuaW5uZXJIVE1MID0gajtcbiAgLy8gbnVtYmVyLmNsYXNzTmFtZSA9IFwiXCI7XG4gIH0gZWxzZSB7XG4gIC8vIG51bWJlci5jbGFzc05hbWUgPSBcIlwiO1xuICBudW1iZXIuaW5uZXJIVE1MID0gajtcbiAgfVxuICBsb3R0ZXJ5TnVtYmVyc1tpXS5hcHBlbmRDaGlsZChudW1iZXIpXG4gIH1cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBTVEFSVCBST0xMSU5HIFRIRSBOVU1CRVJTXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnZhciBjb3VudGVyID0gMDtcblxudmFyIHN0YXJ0SW50ZXJ2YWwgPSB0cnVlOyAvLyBTZXQgdG8gdHJ1ZSBpZiB0aGUgc3Bpbm5lciBzaG91bGQgc3RhcnQgYXQgdGhlIHNhbWUgdGltZVxuXG5mdW5jdGlvbiByb2xsTnVtYmVycygpIHtcblxuaWYoc3RhcnRJbnRlcnZhbCkge1xuXG4gICAgaWYoY291bnRlcjxsb3R0ZXJ5TnVtYmVycy5sZW5ndGgpXG4gICAgICB7XG4gICAgICAgIGxvdHRlcnlOdW1iZXJzW2NvdW50ZXJdLmNsYXNzTmFtZSA9IFwiTG90dGVyeS1udW1iZXIgTG90dGVyeS1udW1iZXItLXNwaW5uaW5nXCI7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgcm9sbE51bWJlcnMoKVxuICAgICAgICB9LCBzcGlubkludGVydmFsXG4gICAgICApO1xuICAgICAgICAgY291bnRlcisrO1xuICAgICAgfVxufSBlbHNlIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsb3R0ZXJ5TnVtYmVycy5sZW5ndGg7IGkrKykge1xuICAgIGxvdHRlcnlOdW1iZXJzW2ldLmNsYXNzTmFtZSA9IFwiTG90dGVyeS1udW1iZXIgTG90dGVyeS1udW1iZXItLXNwaW5uaW5nXCI7XG4gIH1cbn1cbn1cblxuXG52YXIgeSA9IDA7XG52YXIgc3Bpbm5UaW1lID0gMjUwMDsgLy8gSE9XIExPTkcgRE9FUyBUSEUgQU5JTUFUSU9OLCBTWU5DIFdJVEggQ1NTIEZJTEVcbnZhciByYXRpbyA9IHNwaW5uVGltZSAqICggbnVtYmVyc1swXSAvIDEwKTtcblxuZnVuY3Rpb24gY29ycmVjdCgpIHtcblxuICB2YXIgc3RvcCA9IDQwMDA7IC8vIElOSVRJQUwgVkFMVUUgKEtpbmRhIHBvaW50bGVzcylcbiAgdmFyIGRpZmYgPSAwO1xuXG4gIGlmKHkgPCBudW1iZXJzLmxlbmd0aClcbiAgICB7XG4gICAgICBpZihudW1iZXJzW3krMV0gPiBudW1iZXJzW3ldKSB7XG4gICAgICAgIGRpZmYgPSBudW1iZXJzW3krMV0gLSBudW1iZXJzW3ldO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGRpZmYgPSAxMCAtIChudW1iZXJzW3ldIC0gbnVtYmVyc1t5KzFdKTtcbiAgICAgIH1cblxuICAgICAgc3RhcnRJbnRlcnZhbCA/IHN0b3AgPSBzcGlubkludGVydmFsICsgKCggZGlmZiAqIHNwaW5uVGltZSApLzEwKSA6IHN0b3AgPSAgKCggZGlmZiAqIHNwaW5uVGltZSApLzEwKTtcblxuICAgICAgbG90dGVyeU51bWJlcnNbeV0uY2xhc3NOYW1lID0gXCJMb3R0ZXJ5LW51bWJlclwiO1xuXG4gICAgICBpZihudW1iZXJzW3ldID09PSBkcmF3QXJyYXlbeV0pIHtcbiAgICAgICAgbG90dGVyeU51bWJlcnNbeV0uaW5uZXJIVE1MID0gXCI8ZGl2IGNsYXNzPSdMb3R0ZXJ5LWNvcnJlY3QnPlwiK251bWJlcnNbeV0rXCI8L2Rpdj5cIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvdHRlcnlOdW1iZXJzW3ldLmlubmVySFRNTCA9IFwiPGRpdiBjbGFzcz0nTG90dGVyeS13cm9uZyc+XCIrbnVtYmVyc1t5XStcIjwvZGl2PlwiO1xuICAgICAgfVxuXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKClcbiAgICAgIHtcbiAgICAgICAgY29ycmVjdCgpXG4gICAgICB9LFxuICAgICAgc3RvcFxuICAgICk7XG4gICAgICAgeSsrO1xuICAgIH1cbn1cblxuXG52YXIgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiU3RhcnQtbG90dGVyeS0tanNcIilbMF07XG5cbnN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGZ1bmN0aW9uKCkge1xuICByb2xsTnVtYmVycygpO1xuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7IGNvcnJlY3QoKTsgfSwgc3Bpbm5UaW1lK3JhdGlvKTtcbn0pXG5cblxuXG5cblxuXG5cblxuXG59KTtcbiJdfQ==
