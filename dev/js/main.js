/////////////////////////////////////////////
 //////// START jQuery
 /////////////////////////////////////////////
$(document).ready(function() {
// The customers lotteryticket

var userNumbers = [6,5,4,5,7]
// All the correct numbers

var winningNumbers = {
first: [
  [6,5,4,5,7]
],
second: [
  [4,5,2,8,4],
  [6,5,4,5,7],
  [9,3,8,8,6],
  [1,5,3,3,4]
],
third: [
  [3,4,5,3,4],
  [1,3,4,9,2],
  [3,3,6,7,8],
  [0,5,2,8,4],
  [6,5,4,5,7],
  [3,3,6,8,6],
  [3,3,8,7,4]
]
}

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

var correctAmount2 = {
  first: [],
  second: [],
  third: []
};

for (var key in winningNumbers) {

  for (var i = 0; i < winningNumbers[key].length; i++) {
    let correct = 0;
    // console.log(winningNumbers[key][i]);
    for (var  j= 0; j < winningNumbers[key][i].length; j++) {
      // console.log(winningNumbers[key][i][j]);
      if(winningNumbers[key][i][j] === userNumbers[j])
      {
          correct++;
      }
    }
    correctAmount2[key].push(correct);
  }
}

console.log(correctAmount2);




// Function to push the value to the array
checkArray = (x) => {
  let correct = 0;
  for (var i = 0; i < correctNumbers[x].length; i++) {
      if(correctNumbers[x][i] === userNumbers[i]) {
      correct++;
      }
    }
    correctAmount.push(correct);
}



// Call the function
for (var i = 0; i < correctNumbers.length; i++) {
checkArray(i);
}
// console.log(correctAmount);
// console.log(correctAmount);


// Check which number is the highest in the array
getMaxOfArray = (numArray) =>  Math.max.apply(null, numArray);

// Get the number
var highestNumber = getMaxOfArray(correctAmount);
if(highestNumber === userNumbers.length) {
  winning = true;
}
// The array that we are gonna use in the animation and compare with
var drawArray = correctNumbers[correctAmount.indexOf(highestNumber)];


// console.log(drawArray);

// console.log(drawArray+" är den närmaste och den vi kommer utgå från");

/////////////////////////////////////////////
// *
// LOTTERY ANIMATION
// *
/////////////////////////////////////////////
var lotteryNumbers = document.getElementsByClassName('Lottery-number');

var spinnInterval = 200; // Interval for spinn start for each number

for (var i = 0; i < userNumbers.length; i++) {
  for (var j = 0; j < 10; j++) {
  var number = document.createElement("div");
  if(j == userNumbers[i]) {
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
var ratio = spinnTime * ( userNumbers[0] / 10);

function correct() {

  var stop = 4000; // INITIAL VALUE (Kinda pointless)
  var diff = 0;

  if(y < userNumbers.length)
    {
      if(userNumbers[y+1] > userNumbers[y]) {
        diff = userNumbers[y+1] - userNumbers[y];
      }
      else {
        diff = 10 - (userNumbers[y] - userNumbers[y+1]);
      }

      startInterval ? stop = spinnInterval + (( diff * spinnTime )/10) : stop =  (( diff * spinnTime )/10);

      lotteryNumbers[y].className = "Lottery-number";

      if(userNumbers[y] === drawArray[y]) {
        lotteryNumbers[y].innerHTML = "<div class='Lottery-correct'>"+userNumbers[y]+"</div>";
      } else {
        lotteryNumbers[y].innerHTML = "<div class='Lottery-wrong'>"+userNumbers[y]+"</div>";
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvdHRlcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAvLy8vLy8vLyBTVEFSVCBqUXVlcnlcbiAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuLy8gVGhlIGN1c3RvbWVycyBsb3R0ZXJ5dGlja2V0XG5cbnZhciB1c2VyTnVtYmVycyA9IFs2LDUsNCw1LDddXG4vLyBBbGwgdGhlIGNvcnJlY3QgbnVtYmVyc1xuXG52YXIgd2lubmluZ051bWJlcnMgPSB7XG5maXJzdDogW1xuICBbNiw1LDQsNSw3XVxuXSxcbnNlY29uZDogW1xuICBbNCw1LDIsOCw0XSxcbiAgWzYsNSw0LDUsN10sXG4gIFs5LDMsOCw4LDZdLFxuICBbMSw1LDMsMyw0XVxuXSxcbnRoaXJkOiBbXG4gIFszLDQsNSwzLDRdLFxuICBbMSwzLDQsOSwyXSxcbiAgWzMsMyw2LDcsOF0sXG4gIFswLDUsMiw4LDRdLFxuICBbNiw1LDQsNSw3XSxcbiAgWzMsMyw2LDgsNl0sXG4gIFszLDMsOCw3LDRdXG5dXG59XG5cbnZhciBjb3JyZWN0TnVtYmVycyA9IFtcbiAgWzMsNCw1LDMsNF0sIC8vIDEgcsOkdHRcbiAgWzEsMyw0LDksMl0sIC8vIDEgcsOkdHRcbiAgWzMsMyw2LDcsOF0sIC8vIEFsbGEgcsOkdHRcbiAgWzAsNSwyLDgsNF0sIC8vIEFsbGEgRmVsXG4gIFsxLDEsNiw1LDNdLCAvLyBBbGxhIEZlbFxuICBbMywzLDYsOCw2XSwgLy8gMCwgMSwgMiByw6R0dFxuICBbMywzLDgsNyw0XSAgLy8gMCwgMSwgMyByw6R0dFxuXVxuLy8gQ2hlY2sgaG93IGNvcnJlY3QgZWFjaCBhcnJheSBpcyBpbiBudW1iZXIuIEVnXG4vLyBJZiBhbiBhcnJheSBtYXRjaGVzIGJ5IHR3byBkaWdpdHMgdGhlIHZhbHVlIHdpbGwgYmUgdHdvXG52YXIgY29ycmVjdEFtb3VudCA9IFtdO1xudmFyIHdpbm5pbmcgPSBmYWxzZTtcblxudmFyIGNvcnJlY3RBbW91bnQyID0ge1xuICBmaXJzdDogW10sXG4gIHNlY29uZDogW10sXG4gIHRoaXJkOiBbXVxufTtcblxuZm9yICh2YXIga2V5IGluIHdpbm5pbmdOdW1iZXJzKSB7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB3aW5uaW5nTnVtYmVyc1trZXldLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGNvcnJlY3QgPSAwO1xuICAgIC8vIGNvbnNvbGUubG9nKHdpbm5pbmdOdW1iZXJzW2tleV1baV0pO1xuICAgIGZvciAodmFyICBqPSAwOyBqIDwgd2lubmluZ051bWJlcnNba2V5XVtpXS5sZW5ndGg7IGorKykge1xuICAgICAgLy8gY29uc29sZS5sb2cod2lubmluZ051bWJlcnNba2V5XVtpXVtqXSk7XG4gICAgICBpZih3aW5uaW5nTnVtYmVyc1trZXldW2ldW2pdID09PSB1c2VyTnVtYmVyc1tqXSlcbiAgICAgIHtcbiAgICAgICAgICBjb3JyZWN0Kys7XG4gICAgICB9XG4gICAgfVxuICAgIGNvcnJlY3RBbW91bnQyW2tleV0ucHVzaChjb3JyZWN0KTtcbiAgfVxufVxuXG5jb25zb2xlLmxvZyhjb3JyZWN0QW1vdW50Mik7XG5cblxuXG5cbi8vIEZ1bmN0aW9uIHRvIHB1c2ggdGhlIHZhbHVlIHRvIHRoZSBhcnJheVxuY2hlY2tBcnJheSA9ICh4KSA9PiB7XG4gIGxldCBjb3JyZWN0ID0gMDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3JyZWN0TnVtYmVyc1t4XS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYoY29ycmVjdE51bWJlcnNbeF1baV0gPT09IHVzZXJOdW1iZXJzW2ldKSB7XG4gICAgICBjb3JyZWN0Kys7XG4gICAgICB9XG4gICAgfVxuICAgIGNvcnJlY3RBbW91bnQucHVzaChjb3JyZWN0KTtcbn1cblxuXG5cbi8vIENhbGwgdGhlIGZ1bmN0aW9uXG5mb3IgKHZhciBpID0gMDsgaSA8IGNvcnJlY3ROdW1iZXJzLmxlbmd0aDsgaSsrKSB7XG5jaGVja0FycmF5KGkpO1xufVxuLy8gY29uc29sZS5sb2coY29ycmVjdEFtb3VudCk7XG4vLyBjb25zb2xlLmxvZyhjb3JyZWN0QW1vdW50KTtcblxuXG4vLyBDaGVjayB3aGljaCBudW1iZXIgaXMgdGhlIGhpZ2hlc3QgaW4gdGhlIGFycmF5XG5nZXRNYXhPZkFycmF5ID0gKG51bUFycmF5KSA9PiAgTWF0aC5tYXguYXBwbHkobnVsbCwgbnVtQXJyYXkpO1xuXG4vLyBHZXQgdGhlIG51bWJlclxudmFyIGhpZ2hlc3ROdW1iZXIgPSBnZXRNYXhPZkFycmF5KGNvcnJlY3RBbW91bnQpO1xuaWYoaGlnaGVzdE51bWJlciA9PT0gdXNlck51bWJlcnMubGVuZ3RoKSB7XG4gIHdpbm5pbmcgPSB0cnVlO1xufVxuLy8gVGhlIGFycmF5IHRoYXQgd2UgYXJlIGdvbm5hIHVzZSBpbiB0aGUgYW5pbWF0aW9uIGFuZCBjb21wYXJlIHdpdGhcbnZhciBkcmF3QXJyYXkgPSBjb3JyZWN0TnVtYmVyc1tjb3JyZWN0QW1vdW50LmluZGV4T2YoaGlnaGVzdE51bWJlcildO1xuXG5cbi8vIGNvbnNvbGUubG9nKGRyYXdBcnJheSk7XG5cbi8vIGNvbnNvbGUubG9nKGRyYXdBcnJheStcIiDDpHIgZGVuIG7DpHJtYXN0ZSBvY2ggZGVuIHZpIGtvbW1lciB1dGfDpSBmcsOlblwiKTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyAqXG4vLyBMT1RURVJZIEFOSU1BVElPTlxuLy8gKlxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgbG90dGVyeU51bWJlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdMb3R0ZXJ5LW51bWJlcicpO1xuXG52YXIgc3Bpbm5JbnRlcnZhbCA9IDIwMDsgLy8gSW50ZXJ2YWwgZm9yIHNwaW5uIHN0YXJ0IGZvciBlYWNoIG51bWJlclxuXG5mb3IgKHZhciBpID0gMDsgaSA8IHVzZXJOdW1iZXJzLmxlbmd0aDsgaSsrKSB7XG4gIGZvciAodmFyIGogPSAwOyBqIDwgMTA7IGorKykge1xuICB2YXIgbnVtYmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgaWYoaiA9PSB1c2VyTnVtYmVyc1tpXSkge1xuICBudW1iZXIuaW5uZXJIVE1MID0gajtcbiAgLy8gbnVtYmVyLmNsYXNzTmFtZSA9IFwiXCI7XG4gIH0gZWxzZSB7XG4gIC8vIG51bWJlci5jbGFzc05hbWUgPSBcIlwiO1xuICBudW1iZXIuaW5uZXJIVE1MID0gajtcbiAgfVxuICBsb3R0ZXJ5TnVtYmVyc1tpXS5hcHBlbmRDaGlsZChudW1iZXIpXG4gIH1cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBTVEFSVCBST0xMSU5HIFRIRSBOVU1CRVJTXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnZhciBjb3VudGVyID0gMDtcblxudmFyIHN0YXJ0SW50ZXJ2YWwgPSB0cnVlOyAvLyBTZXQgdG8gdHJ1ZSBpZiB0aGUgc3Bpbm5lciBzaG91bGQgc3RhcnQgYXQgdGhlIHNhbWUgdGltZVxuXG5mdW5jdGlvbiByb2xsTnVtYmVycygpIHtcblxuaWYoc3RhcnRJbnRlcnZhbCkge1xuXG4gICAgaWYoY291bnRlcjxsb3R0ZXJ5TnVtYmVycy5sZW5ndGgpXG4gICAgICB7XG4gICAgICAgIGxvdHRlcnlOdW1iZXJzW2NvdW50ZXJdLmNsYXNzTmFtZSA9IFwiTG90dGVyeS1udW1iZXIgTG90dGVyeS1udW1iZXItLXNwaW5uaW5nXCI7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgcm9sbE51bWJlcnMoKVxuICAgICAgICB9LCBzcGlubkludGVydmFsXG4gICAgICApO1xuICAgICAgICAgY291bnRlcisrO1xuICAgICAgfVxufSBlbHNlIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsb3R0ZXJ5TnVtYmVycy5sZW5ndGg7IGkrKykge1xuICAgIGxvdHRlcnlOdW1iZXJzW2ldLmNsYXNzTmFtZSA9IFwiTG90dGVyeS1udW1iZXIgTG90dGVyeS1udW1iZXItLXNwaW5uaW5nXCI7XG4gIH1cbn1cbn1cblxuXG52YXIgeSA9IDA7XG52YXIgc3Bpbm5UaW1lID0gMjUwMDsgLy8gSE9XIExPTkcgRE9FUyBUSEUgQU5JTUFUSU9OLCBTWU5DIFdJVEggQ1NTIEZJTEVcbnZhciByYXRpbyA9IHNwaW5uVGltZSAqICggdXNlck51bWJlcnNbMF0gLyAxMCk7XG5cbmZ1bmN0aW9uIGNvcnJlY3QoKSB7XG5cbiAgdmFyIHN0b3AgPSA0MDAwOyAvLyBJTklUSUFMIFZBTFVFIChLaW5kYSBwb2ludGxlc3MpXG4gIHZhciBkaWZmID0gMDtcblxuICBpZih5IDwgdXNlck51bWJlcnMubGVuZ3RoKVxuICAgIHtcbiAgICAgIGlmKHVzZXJOdW1iZXJzW3krMV0gPiB1c2VyTnVtYmVyc1t5XSkge1xuICAgICAgICBkaWZmID0gdXNlck51bWJlcnNbeSsxXSAtIHVzZXJOdW1iZXJzW3ldO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGRpZmYgPSAxMCAtICh1c2VyTnVtYmVyc1t5XSAtIHVzZXJOdW1iZXJzW3krMV0pO1xuICAgICAgfVxuXG4gICAgICBzdGFydEludGVydmFsID8gc3RvcCA9IHNwaW5uSW50ZXJ2YWwgKyAoKCBkaWZmICogc3Bpbm5UaW1lICkvMTApIDogc3RvcCA9ICAoKCBkaWZmICogc3Bpbm5UaW1lICkvMTApO1xuXG4gICAgICBsb3R0ZXJ5TnVtYmVyc1t5XS5jbGFzc05hbWUgPSBcIkxvdHRlcnktbnVtYmVyXCI7XG5cbiAgICAgIGlmKHVzZXJOdW1iZXJzW3ldID09PSBkcmF3QXJyYXlbeV0pIHtcbiAgICAgICAgbG90dGVyeU51bWJlcnNbeV0uaW5uZXJIVE1MID0gXCI8ZGl2IGNsYXNzPSdMb3R0ZXJ5LWNvcnJlY3QnPlwiK3VzZXJOdW1iZXJzW3ldK1wiPC9kaXY+XCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb3R0ZXJ5TnVtYmVyc1t5XS5pbm5lckhUTUwgPSBcIjxkaXYgY2xhc3M9J0xvdHRlcnktd3JvbmcnPlwiK3VzZXJOdW1iZXJzW3ldK1wiPC9kaXY+XCI7XG4gICAgICB9XG5cbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKVxuICAgICAge1xuICAgICAgICBjb3JyZWN0KClcbiAgICAgIH0sXG4gICAgICBzdG9wXG4gICAgKTtcbiAgICAgICB5Kys7XG4gICAgfVxufVxuXG5cbnZhciBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJTdGFydC1sb3R0ZXJ5LS1qc1wiKVswXTtcblxuc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24oKSB7XG4gIHJvbGxOdW1iZXJzKCk7XG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgY29ycmVjdCgpOyB9LCBzcGlublRpbWUrcmF0aW8pO1xufSlcblxuXG5cblxuXG5cblxuXG5cbn0pO1xuIl19
