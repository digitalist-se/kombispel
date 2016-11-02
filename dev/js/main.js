/////////////////////////////////////////////
 //////// START jQuery
 /////////////////////////////////////////////
$(document).ready(function() {
// The customers lotteryticket

var userNumbers = [9,5,2,5,3]
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

$(".Login-toggle-help--js").click(function() {
  $(this).next().slideToggle();
});


$(".Login-clickarea--js, .Login-close-form--js").click(function() {
  $(".Login-overlay-container").fadeOut("fast");
});

/////////////////////////////////////////////
// TOGGLE MENU OPEN
/////////////////////////////////////////////

var menuText = $(".Menu-row-title-title");

$(".Menu-row-menu--js").click(function() {
  toggleMenu();
})

$(".Menu-level-one-header--js").click(function() {
  $(this).next().slideToggle();
  $(this).toggleClass("children-open");
})


function toggleMenu() {
  $(".Menu-container").toggleClass("Menu--open")
  $(".Site-container").toggleClass("locked")
  $(".Menu-row-menu--js").toggleClass("Burger--open");

  if(menuText.text() == "meny") {
      menuText.text("stäng meny")
  } else {
    menuText.text("meny")
  }
}

$(".Menu-row-profile--js, .Correct-lottery-btn--js, .Open-login--js").click(function() {
    $(".Login-overlay-container").fadeIn("fast");

    if($(".Menu-container").hasClass("Menu--open")) {
        toggleMenu();
    }
})

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvdHRlcnkuanMiLCJMb2dpbi5qcyIsIk1lbnUuanMiLCJNZW51LXJvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gLy8vLy8vLy8gU1RBUlQgalF1ZXJ5XG4gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbi8vIFRoZSBjdXN0b21lcnMgbG90dGVyeXRpY2tldFxuXG52YXIgdXNlck51bWJlcnMgPSBbOSw1LDIsNSwzXVxuLy8gQWxsIHRoZSBjb3JyZWN0IG51bWJlcnNcblxudmFyIHdpbm5pbmdOdW1iZXJzID0ge1xuZmlyc3Q6IFtcbiAgWzYsNSw0LDUsN11cbl0sXG5zZWNvbmQ6IFtcbiAgWzQsNSwyLDgsNF0sXG4gIFs2LDUsNCw1LDddLFxuICBbOSwzLDgsOCw2XSxcbiAgWzEsNSwzLDMsNF1cbl0sXG50aGlyZDogW1xuICBbMyw0LDUsMyw0XSxcbiAgWzEsMyw0LDksMl0sXG4gIFszLDMsNiw3LDhdLFxuICBbMCw1LDIsOCw0XSxcbiAgWzYsNSw0LDUsN10sXG4gIFszLDMsNiw4LDZdLFxuICBbMywzLDgsNyw0XVxuXVxufVxuXG52YXIgY29ycmVjdE51bWJlcnMgPSBbXG4gIFszLDQsNSwzLDRdLCAvLyAxIHLDpHR0XG4gIFsxLDMsNCw5LDJdLCAvLyAxIHLDpHR0XG4gIFszLDMsNiw3LDhdLCAvLyBBbGxhIHLDpHR0XG4gIFswLDUsMiw4LDRdLCAvLyBBbGxhIEZlbFxuICBbMSwxLDYsNSwzXSwgLy8gQWxsYSBGZWxcbiAgWzMsMyw2LDgsNl0sIC8vIDAsIDEsIDIgcsOkdHRcbiAgWzMsMyw4LDcsNF0gIC8vIDAsIDEsIDMgcsOkdHRcbl1cbi8vIENoZWNrIGhvdyBjb3JyZWN0IGVhY2ggYXJyYXkgaXMgaW4gbnVtYmVyLiBFZ1xuLy8gSWYgYW4gYXJyYXkgbWF0Y2hlcyBieSB0d28gZGlnaXRzIHRoZSB2YWx1ZSB3aWxsIGJlIHR3b1xudmFyIGNvcnJlY3RBbW91bnQgPSBbXTtcbnZhciB3aW5uaW5nID0gZmFsc2U7XG5cbnZhciBjb3JyZWN0QW1vdW50MiA9IHtcbiAgZmlyc3Q6IFtdLFxuICBzZWNvbmQ6IFtdLFxuICB0aGlyZDogW11cbn07XG5cbmZvciAodmFyIGtleSBpbiB3aW5uaW5nTnVtYmVycykge1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgd2lubmluZ051bWJlcnNba2V5XS5sZW5ndGg7IGkrKykge1xuICAgIGxldCBjb3JyZWN0ID0gMDtcbiAgICAvLyBjb25zb2xlLmxvZyh3aW5uaW5nTnVtYmVyc1trZXldW2ldKTtcbiAgICBmb3IgKHZhciAgaj0gMDsgaiA8IHdpbm5pbmdOdW1iZXJzW2tleV1baV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHdpbm5pbmdOdW1iZXJzW2tleV1baV1bal0pO1xuICAgICAgaWYod2lubmluZ051bWJlcnNba2V5XVtpXVtqXSA9PT0gdXNlck51bWJlcnNbal0pXG4gICAgICB7XG4gICAgICAgICAgY29ycmVjdCsrO1xuICAgICAgfVxuICAgIH1cbiAgICBjb3JyZWN0QW1vdW50MltrZXldLnB1c2goY29ycmVjdCk7XG4gIH1cbn1cblxuY29uc29sZS5sb2coY29ycmVjdEFtb3VudDIpO1xuXG5cblxuXG4vLyBGdW5jdGlvbiB0byBwdXNoIHRoZSB2YWx1ZSB0byB0aGUgYXJyYXlcbmNoZWNrQXJyYXkgPSAoeCkgPT4ge1xuICBsZXQgY29ycmVjdCA9IDA7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29ycmVjdE51bWJlcnNbeF0ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKGNvcnJlY3ROdW1iZXJzW3hdW2ldID09PSB1c2VyTnVtYmVyc1tpXSkge1xuICAgICAgY29ycmVjdCsrO1xuICAgICAgfVxuICAgIH1cbiAgICBjb3JyZWN0QW1vdW50LnB1c2goY29ycmVjdCk7XG59XG5cblxuXG4vLyBDYWxsIHRoZSBmdW5jdGlvblxuZm9yICh2YXIgaSA9IDA7IGkgPCBjb3JyZWN0TnVtYmVycy5sZW5ndGg7IGkrKykge1xuY2hlY2tBcnJheShpKTtcbn1cbi8vIGNvbnNvbGUubG9nKGNvcnJlY3RBbW91bnQpO1xuLy8gY29uc29sZS5sb2coY29ycmVjdEFtb3VudCk7XG5cblxuLy8gQ2hlY2sgd2hpY2ggbnVtYmVyIGlzIHRoZSBoaWdoZXN0IGluIHRoZSBhcnJheVxuZ2V0TWF4T2ZBcnJheSA9IChudW1BcnJheSkgPT4gIE1hdGgubWF4LmFwcGx5KG51bGwsIG51bUFycmF5KTtcblxuLy8gR2V0IHRoZSBudW1iZXJcbnZhciBoaWdoZXN0TnVtYmVyID0gZ2V0TWF4T2ZBcnJheShjb3JyZWN0QW1vdW50KTtcbmlmKGhpZ2hlc3ROdW1iZXIgPT09IHVzZXJOdW1iZXJzLmxlbmd0aCkge1xuICB3aW5uaW5nID0gdHJ1ZTtcbn1cbi8vIFRoZSBhcnJheSB0aGF0IHdlIGFyZSBnb25uYSB1c2UgaW4gdGhlIGFuaW1hdGlvbiBhbmQgY29tcGFyZSB3aXRoXG52YXIgZHJhd0FycmF5ID0gY29ycmVjdE51bWJlcnNbY29ycmVjdEFtb3VudC5pbmRleE9mKGhpZ2hlc3ROdW1iZXIpXTtcblxuXG4vLyBjb25zb2xlLmxvZyhkcmF3QXJyYXkpO1xuXG4vLyBjb25zb2xlLmxvZyhkcmF3QXJyYXkrXCIgw6RyIGRlbiBuw6RybWFzdGUgb2NoIGRlbiB2aSBrb21tZXIgdXRnw6UgZnLDpW5cIik7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gKlxuLy8gTE9UVEVSWSBBTklNQVRJT05cbi8vICpcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xudmFyIGxvdHRlcnlOdW1iZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnTG90dGVyeS1udW1iZXInKTtcblxudmFyIHNwaW5uSW50ZXJ2YWwgPSAyMDA7IC8vIEludGVydmFsIGZvciBzcGlubiBzdGFydCBmb3IgZWFjaCBudW1iZXJcblxuZm9yICh2YXIgaSA9IDA7IGkgPCB1c2VyTnVtYmVycy5sZW5ndGg7IGkrKykge1xuICBmb3IgKHZhciBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgdmFyIG51bWJlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGlmKGogPT0gdXNlck51bWJlcnNbaV0pIHtcbiAgbnVtYmVyLmlubmVySFRNTCA9IGo7XG4gIC8vIG51bWJlci5jbGFzc05hbWUgPSBcIlwiO1xuICB9IGVsc2Uge1xuICAvLyBudW1iZXIuY2xhc3NOYW1lID0gXCJcIjtcbiAgbnVtYmVyLmlubmVySFRNTCA9IGo7XG4gIH1cbiAgbG90dGVyeU51bWJlcnNbaV0uYXBwZW5kQ2hpbGQobnVtYmVyKVxuICB9XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gU1RBUlQgUk9MTElORyBUSEUgTlVNQkVSU1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgY291bnRlciA9IDA7XG5cbnZhciBzdGFydEludGVydmFsID0gdHJ1ZTsgLy8gU2V0IHRvIHRydWUgaWYgdGhlIHNwaW5uZXIgc2hvdWxkIHN0YXJ0IGF0IHRoZSBzYW1lIHRpbWVcblxuZnVuY3Rpb24gcm9sbE51bWJlcnMoKSB7XG5cbmlmKHN0YXJ0SW50ZXJ2YWwpIHtcblxuICAgIGlmKGNvdW50ZXI8bG90dGVyeU51bWJlcnMubGVuZ3RoKVxuICAgICAge1xuICAgICAgICBsb3R0ZXJ5TnVtYmVyc1tjb3VudGVyXS5jbGFzc05hbWUgPSBcIkxvdHRlcnktbnVtYmVyIExvdHRlcnktbnVtYmVyLS1zcGlubmluZ1wiO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgIHJvbGxOdW1iZXJzKClcbiAgICAgICAgfSwgc3Bpbm5JbnRlcnZhbFxuICAgICAgKTtcbiAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgIH1cbn0gZWxzZSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbG90dGVyeU51bWJlcnMubGVuZ3RoOyBpKyspIHtcbiAgICBsb3R0ZXJ5TnVtYmVyc1tpXS5jbGFzc05hbWUgPSBcIkxvdHRlcnktbnVtYmVyIExvdHRlcnktbnVtYmVyLS1zcGlubmluZ1wiO1xuICB9XG59XG59XG5cblxudmFyIHkgPSAwO1xudmFyIHNwaW5uVGltZSA9IDI1MDA7IC8vIEhPVyBMT05HIERPRVMgVEhFIEFOSU1BVElPTiwgU1lOQyBXSVRIIENTUyBGSUxFXG52YXIgcmF0aW8gPSBzcGlublRpbWUgKiAoIHVzZXJOdW1iZXJzWzBdIC8gMTApO1xuXG5mdW5jdGlvbiBjb3JyZWN0KCkge1xuXG4gIHZhciBzdG9wID0gNDAwMDsgLy8gSU5JVElBTCBWQUxVRSAoS2luZGEgcG9pbnRsZXNzKVxuICB2YXIgZGlmZiA9IDA7XG5cbiAgaWYoeSA8IHVzZXJOdW1iZXJzLmxlbmd0aClcbiAgICB7XG4gICAgICBpZih1c2VyTnVtYmVyc1t5KzFdID4gdXNlck51bWJlcnNbeV0pIHtcbiAgICAgICAgZGlmZiA9IHVzZXJOdW1iZXJzW3krMV0gLSB1c2VyTnVtYmVyc1t5XTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBkaWZmID0gMTAgLSAodXNlck51bWJlcnNbeV0gLSB1c2VyTnVtYmVyc1t5KzFdKTtcbiAgICAgIH1cblxuICAgICAgc3RhcnRJbnRlcnZhbCA/IHN0b3AgPSBzcGlubkludGVydmFsICsgKCggZGlmZiAqIHNwaW5uVGltZSApLzEwKSA6IHN0b3AgPSAgKCggZGlmZiAqIHNwaW5uVGltZSApLzEwKTtcblxuICAgICAgbG90dGVyeU51bWJlcnNbeV0uY2xhc3NOYW1lID0gXCJMb3R0ZXJ5LW51bWJlclwiO1xuXG4gICAgICBpZih1c2VyTnVtYmVyc1t5XSA9PT0gZHJhd0FycmF5W3ldKSB7XG4gICAgICAgIGxvdHRlcnlOdW1iZXJzW3ldLmlubmVySFRNTCA9IFwiPGRpdiBjbGFzcz0nTG90dGVyeS1jb3JyZWN0Jz5cIit1c2VyTnVtYmVyc1t5XStcIjwvZGl2PlwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG90dGVyeU51bWJlcnNbeV0uaW5uZXJIVE1MID0gXCI8ZGl2IGNsYXNzPSdMb3R0ZXJ5LXdyb25nJz5cIit1c2VyTnVtYmVyc1t5XStcIjwvZGl2PlwiO1xuICAgICAgfVxuXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKClcbiAgICAgIHtcbiAgICAgICAgY29ycmVjdCgpXG4gICAgICB9LFxuICAgICAgc3RvcFxuICAgICk7XG4gICAgICAgeSsrO1xuICAgIH1cbn1cblxuXG52YXIgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiU3RhcnQtbG90dGVyeS0tanNcIilbMF07XG5cbnN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGZ1bmN0aW9uKCkge1xuICByb2xsTnVtYmVycygpO1xuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7IGNvcnJlY3QoKTsgfSwgc3Bpbm5UaW1lK3JhdGlvKTtcbn0pXG5cblxuXG5cblxuXG5cblxuXG59KTtcbiIsIiQoXCIuTG9naW4tdG9nZ2xlLWhlbHAtLWpzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKHRoaXMpLm5leHQoKS5zbGlkZVRvZ2dsZSgpO1xufSk7XG5cblxuJChcIi5Mb2dpbi1jbGlja2FyZWEtLWpzLCAuTG9naW4tY2xvc2UtZm9ybS0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuTG9naW4tb3ZlcmxheS1jb250YWluZXJcIikuZmFkZU91dChcImZhc3RcIik7XG59KTtcbiIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gVE9HR0xFIE1FTlUgT1BFTlxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbnZhciBtZW51VGV4dCA9ICQoXCIuTWVudS1yb3ctdGl0bGUtdGl0bGVcIik7XG5cbiQoXCIuTWVudS1yb3ctbWVudS0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gIHRvZ2dsZU1lbnUoKTtcbn0pXG5cbiQoXCIuTWVudS1sZXZlbC1vbmUtaGVhZGVyLS1qc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJCh0aGlzKS5uZXh0KCkuc2xpZGVUb2dnbGUoKTtcbiAgJCh0aGlzKS50b2dnbGVDbGFzcyhcImNoaWxkcmVuLW9wZW5cIik7XG59KVxuXG5cbmZ1bmN0aW9uIHRvZ2dsZU1lbnUoKSB7XG4gICQoXCIuTWVudS1jb250YWluZXJcIikudG9nZ2xlQ2xhc3MoXCJNZW51LS1vcGVuXCIpXG4gICQoXCIuU2l0ZS1jb250YWluZXJcIikudG9nZ2xlQ2xhc3MoXCJsb2NrZWRcIilcbiAgJChcIi5NZW51LXJvdy1tZW51LS1qc1wiKS50b2dnbGVDbGFzcyhcIkJ1cmdlci0tb3BlblwiKTtcblxuICBpZihtZW51VGV4dC50ZXh0KCkgPT0gXCJtZW55XCIpIHtcbiAgICAgIG1lbnVUZXh0LnRleHQoXCJzdMOkbmcgbWVueVwiKVxuICB9IGVsc2Uge1xuICAgIG1lbnVUZXh0LnRleHQoXCJtZW55XCIpXG4gIH1cbn1cbiIsIiQoXCIuTWVudS1yb3ctcHJvZmlsZS0tanMsIC5Db3JyZWN0LWxvdHRlcnktYnRuLS1qcywgLk9wZW4tbG9naW4tLWpzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICQoXCIuTG9naW4tb3ZlcmxheS1jb250YWluZXJcIikuZmFkZUluKFwiZmFzdFwiKTtcblxuICAgIGlmKCQoXCIuTWVudS1jb250YWluZXJcIikuaGFzQ2xhc3MoXCJNZW51LS1vcGVuXCIpKSB7XG4gICAgICAgIHRvZ2dsZU1lbnUoKTtcbiAgICB9XG59KVxuIl19
