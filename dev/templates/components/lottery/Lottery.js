var lotteryNumbers = {
  myNumbers: [2,0,5,5,6,3],
  correctNumbers: [
    {
      header: "1.000.000",
      numbers: [
        [6,5,4,5,6,1]
      ]
    },
    {
      header: "300.000",
      numbers: [
        [1,1,3,3,4,2],
        [2,0,4,5,6,1],
        [0,1,1,1,1,1]
      ]
    },
    {
      header: "30.000",
      numbers: [
        [3,4,5,3,4,5],
        [1,3,4,9,2,3],
        [3,3,6,7,8,2],
        [0,5,2,8,4,9],
      ]
    }
    // ,
    // {
    //   header: "10.000",
    //   numbers: [
    //     [3,4,5,3,4,5],
    //     [1,3,4,9,2,3],
    //     [3,3,6,7,8,2],
    //     [0,5,2,8,4,9],
    //     [2,3,3,7,8,2],
    //     [0,5,2,9,9,9],
    //   ]
    // },
    // {
    //   header: "5.000",
    //   numbers: [
    //     [3,4,5,3,4,5],
    //     [1,3,4,9,2,3],
    //     [3,3,6,7,8,2],
    //     [0,5,2,8,4,9],
    //     [2,3,3,7,8,2],
    //     [0,5,2,9,9,9],
    //   ]
    // },
    // {
    //   header: "500",
    //   numbers: [
    //     [3,4,5,3,4,5],
    //     [1,3,4,9,2,3],
    //     [3,3,6,7,8,2],
    //     [0,5,2,8,4,9],
    //     [2,3,3,7,8,2],
    //     [0,5,2,9,9,9],
    //   ]
    // },
    // {
    //   header: "200",
    //   numbers: [
    //     [3,4,5,3,4,5],
    //     [1,3,4,9,2,3],
    //     [3,3,6,7,8,2],
    //     [0,5,2,8,4,9],
    //     [2,3,3,7,8,2],
    //     [0,5,2,9,9,9],
    //   ]
    // }
  ]
}


/////////////////////////////////////////////
// Variables which will be reset
/////////////////////////////////////////////
var winning = false;
var objectCounter = 0;
var correctAmount; // Will be an array
var correctNumbers = lotteryNumbers.correctNumbers;
var myNumbers = lotteryNumbers.myNumbers;

/////////////////////////////////////////////
// SET INITIAL STATE OF APPLICATION
/////////////////////////////////////////////
// Set My Lottery-number
var myLotteryNumber = document.getElementsByClassName("Lottery-mynumber--js")[0];
myLotteryNumber.innerHTML = myNumbers.toString().replace(/^[,]$|[,]+/g,"");

// Set Lottery-row
var lotteryNumbers = document.getElementsByClassName('Lottery-number');
var lotteryHeader = document.getElementsByClassName("Lottery-price-header")[0];
lotteryHeader.innerHTML = correctNumbers[objectCounter].header;

const startLottery = () => {
  // Clear it after first iteration
    for (var i = 0; i < lotteryNumbers.length; i++) {
      lotteryNumbers[i].innerHTML = "";
    }
  // Add new numbers
  for (var i = 0; i < lotteryNumbers.length; i++) {
    for (var l = 0; l < 2; l++) {
      for (var j = 0; j < 10; j++) {
      var number = document.createElement("div");
      number.innerHTML = j;
      lotteryNumbers[i].appendChild(number)
      }
    }
  }

 // CHANGE THE HEADER
lotteryHeader.innerHTML = correctNumbers[objectCounter].header;
lotteryMessage.innerHTML = "Dragning pågår";
// Check how correct each array is in number. Eg
// If an array matches by two digits the value will be two
correctAmount = [];
// var winning = false;
// Function to push the value to the array
checkArray = (winningNumbers) => {
  let correct = 0;
  for (var i = 0; i < winningNumbers.length; i++) {
        if(winningNumbers[i] === myNumbers[i]) {
        correct++;
        }
  }
  correctAmount.push(correct);
}

// Call the function
for (var i = 0; i < correctNumbers[objectCounter].numbers.length; i++) {
  checkArray(correctNumbers[objectCounter].numbers[i])
}

// Check which number is the highest in the array
getMaxOfArray = (numArray) =>  Math.max.apply(null, numArray);

// Get the number
var highestNumber = getMaxOfArray(correctAmount);

if(highestNumber === myNumbers.length) {
  winning = true;
}
// The array that the drawing will be based on
var drawArray = correctNumbers[objectCounter].numbers[correctAmount.indexOf(highestNumber)];
/////////////////////////////////////////////
// *
// LOTTERY ANIMATION
// *
/////////////////////////////////////////////
var spinnInterval = 100; // Interval for spinn start for each number

/////////////////////////////////////////////
// START ROLLING THE NUMBERS
/////////////////////////////////////////////
var counter = 0;
var startInterval = true; // Set to true if the spinner should start at the same time
const rollNumbers = () => {
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
var spinnTime = 1700; // HOW LONG DOES THE ANIMATION, SYNC WITH CSS FILE
var ratio = spinnTime * ( drawArray[0] / 10);
const correct = () => {
  var stop = 2000; // INITIAL VALUE (Kinda pointless)
  var diff = 0;

  if(y < drawArray.length)
    {
      if(drawArray[y+1] > drawArray[y]) {
        diff = drawArray[y+1] - drawArray[y];
      }
      else {
        diff = 10 - (drawArray[y] - drawArray[y+1]);
      }
      startInterval ? stop = spinnInterval + (( diff * spinnTime )/10) : stop =  (( diff * spinnTime )/10);

      lotteryNumbers[y].className = "Lottery-number";

      if(drawArray[y] === myNumbers[y]) {
        lotteryNumbers[y].innerHTML = "<div class='Lottery-correct'>"+drawArray[y]+"</div>";
      } else {
        lotteryNumbers[y].innerHTML = "<div class='Lottery-wrong'>"+drawArray[y]+"</div>";
      }

      setTimeout(() =>
      {
        correct()
      },
      stop
    );
       y++;
    } else {
      // Drawing done
      drawingDone()
    }
}
rollNumbers();
setTimeout( function(){ correct(); }, spinnTime+ratio);
}
/////////////////////////////////////////////
// END STARTLOTTERY FUNCTION
/////////////////////////////////////////////
var lotteryBtn = document.getElementsByClassName("Start-lottery-btn--js")[0];
lotteryBtn.addEventListener("click",function() {
  startLottery();
  this.className += " Hide-element";
})

/////////////////////////////////////////////
// After a single drawing round is done
/////////////////////////////////////////////
var messageContainer = document.getElementsByClassName("Lottery-message-container")[0];
var lotteryMessage = document.getElementsByClassName("Lottery-message--js")[0];
// var countDownMessage = document.getElementsByClassName("Lottery-countdown--js")[0];

function drawingDone()  {
  objectCounter++; // Counter for the iteration in the JSON RESPONSE

  /////////////////////////////////////////////
  // COUNTDOWN FUNCTIONALITY
  /////////////////////////////////////////////
  if(objectCounter < correctNumbers.length) {
    var count = 3;
    var myVar;
    function myFunction() {
      myVar = setInterval(function(){ countDown() }, 1000);
    }
    function myStopFunction() {
        clearTimeout(myVar);
    }
    function countDown() {
      lotteryMessage.innerHTML =  "Nästa dragning för "+correctNumbers[objectCounter].header+" om "+count+" sekunder";
      if(count < 0) {
        startLottery();
        myStopFunction();
      }
      count--;
    }
    myFunction();
  }
  /////////////////////////////////////////////
  // WHEN ALL ROUNDS ARE DONE
  /////////////////////////////////////////////
  else {
    console.log("KLART!!! DAGS ATT HÄMTA PRISER");
    lotteryMessage.className += " Hide-element";


  }

}
