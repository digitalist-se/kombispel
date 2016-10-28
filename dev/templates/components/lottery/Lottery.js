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
