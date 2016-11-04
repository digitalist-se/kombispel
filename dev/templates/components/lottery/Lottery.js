/////////////////////////////////////////////
 //////// START jQuery
 /////////////////////////////////////////////
$(document).ready(function() {
// The customers lotteryticket
var numbers = [6,5,4,5,6,3]
var counter = 1;

var correctNumbers = [
  {
    header: "1 000 000",
    numbers: [
      [6,5,4,5,6,1]
    ]
  },
  {
    header: "300 000",
    numbers: [
      [3,4,5,3,4,2],
      [6,5,7,5,6,3],
      [6,5,4,5,6,8]
    ]
  },
  {
    header: "100 000",
    numbers: [
      [3,4,5,3,4,5],
      [1,3,4,9,2,3],
      [3,3,6,7,8,2],
      [0,5,2,8,4,9],
    ]
  }
]

// Check how correct each array is in number. Eg
// If an array matches by two digits the value will be two
var correctAmount = [];
var winning = false;

// Function to push the value to the array
checkArray = (winningNumbers) => {
  let correct = 0;
  for (var i = 0; i < winningNumbers.length; i++) {
        if(winningNumbers[i] === numbers[i]) {
        correct++;
        }
  }
  correctAmount.push(correct);
}


// Call the function
for (var i = 0; i < correctNumbers[counter].numbers.length; i++) {
  checkArray(correctNumbers[counter].numbers[i])
}
// console.log(correctAmount);


// Check which number is the highest in the array
getMaxOfArray = (numArray) =>  Math.max.apply(null, numArray);

// Get the number
var highestNumber = getMaxOfArray(correctAmount);

// console.log(highestNumber);

if(highestNumber === numbers.length) {
  winning = true;
}
// console.log(winning);


// The array that the drawing will be based on
var drawArray = correctNumbers[counter].numbers[correctAmount.indexOf(highestNumber)];

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
