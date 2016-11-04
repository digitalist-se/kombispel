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

/////////////////////////////////////////////
 // CLOSE MODAL
 ////////////////////////////////////////////
$(".Login-clickarea--js, .Login-close-form--js").click(function() {
  $(".Login-overlay-container").fadeOut("fast")
})

/////////////////////////////////////////////
 // SLIDETOGGLE THE HELPBOXES
 ////////////////////////////////////////////
$(".Login-username-toggle--js").click(function() {
  $(".Login-username-help-box--js").slideToggle();
});

$(".Login-password-toggle--js").click(function() {
  $(".Login-password-help-box--js").slideToggle();
});

/////////////////////////////////////////////
// STATE OF THE FORM
/////////////////////////////////////////////
var state = {
  userName: false, // IS CUSTOMERNUMBER OR EMAIL OK
  passWord: false,
  emailReg: false,
  numberReg: false
}

/////////////////////////////////////////////
// USERNAME CHECK
/////////////////////////////////////////////
  // REGEX mail.
var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  // REGEX user number.
var userNumberReg = new RegExp('^[a-zA-Z]{2}[0-9]{6}$');
var validUser;
var userNameMessage = "Du har inte angivet ett korrekt kundnummer eller e-postadress.";
var passwordMessage = "Felaktigt lösenord.";

// INPUT FIELD CHANGE
$('.Login-input-username--js').on('input', function() {

    if(emailReg.test($(this).val()) ) {
      state.emailReg = true;
      state.numberReg = false;
    } else if(userNumberReg.test($(this).val() )) {
      state.numberReg = true;
      state.emailReg = false;
    } else {
      state.numberReg = false;
      state.emailReg = false;
    }

    validUser = state.numberReg || state.emailReg;
      if (validUser) {
        state.userName = true;
      }
      else {
        state.userName = false;
      }
});

// WHEN INPUT IS DONE WITH THE FIELD
$('.Login-input-username--js').focusout(function() {
  // console.log("INPUT NOT IN FOCUS ANY MORE");
  if(state.userName == false) {
    $(".Login-username-toggle--js").removeClass("Login-question-icon--js").removeClass("Login-check-icon--js").addClass("Login-error-icon--js")
    $(this).addClass("Login-input-error--js")
    $(".Login-username-message").show().html(userNameMessage)

  } else {
    $(".Login-username-toggle--js").removeClass("Login-question-icon--js").removeClass("Login-error-icon--js").addClass("Login-check-icon--js")
    $(this).removeClass("Login-input-error--js")
    $(".Login-username-message").hide().html("")
  }

  // WHICH BOX SHOULD SHOW
  if(state.emailReg) {
    passwordBox("reset")
    $(".Login-reset-email--js").html($('.Login-input-username--js').val()) // SET THE EMAIL IN THE MESSAGE TO WHATEVER IT IS IN THE INPUT IF IT IS VALID
  } else {
    passwordBox("default")
  }
})

$(".Login-reset-password-btn--js").click(function(e) {
   e.preventDefault();
  passwordBox("sent")
})

/////////////////////////////////////////////
// PASSWORD HELP BOX
/////////////////////////////////////////////
function passwordBox(box) {
  if(box == "reset") {
    $(".Login-password-reset-box--js").show();
    $(".Login-password-sent-box--js, .Login-password-default-box--js").hide();
  } else if(box == "sent") {
    $(".Login-password-reset-box--js, .Login-password-default-box--js").hide();
    $(".Login-password-sent-box--js").show();
  } else if(box == "default") {
    $(".Login-password-sent-box--js, .Login-password-reset-box--js").hide();
    $(".Login-password-default-box--js").show();
  }
}

/////////////////////////////////////////////
// PASSWORD INPUT FIELD
/////////////////////////////////////////////

$(".Login-input-password--js").on('input', function() {
  if($(this).val() == "kombi") {
    state.passWord = true
  } else {
    state.passWord = false
  }
    if(state.passWord != true) {
      $(".Login-password-message").hide();
    }
    if($(this).hasClass("Login-input-error--js")) {
      $(this).removeClass("Login-input-error--js")
      $(".Login-password-toggle--js").removeClass("Login-error-icon--js").addClass("Login-question-icon--js")
    }
 });

///////////////////////////////////////////////////////
// CHECK IF LOGIN PASSED (JUST FOR PROTOTYPE TESTING)
//////////////////////////////////////////////////////
$(".Login-form-submit-btn--js").click(function(e) {
  e.preventDefault(e)
  if(validUser && state.passWord) {
    window.location.replace("account.html");
  }
  else if(validUser == true && state.passWord != true) {
    $(".Login-password-toggle--js").removeClass("Login-question-icon--js").addClass("Login-error-icon--js")
    $(".Login-header--js").addClass("Login-header--error").html("Inloggningen misslyckades")
    $(".Login-input-password--js").addClass("Login-input-error--js")
    $(".Login-password-message").show().html(passwordMessage)
  }
  else {
    $(".Login-header--js").addClass("Login-header--error").html("Inloggningen misslyckades")
    $(".Login-input-password--js").addClass("Login-input-error--js")
    $(".Login-username-toggle--js").removeClass("Login-question-icon--js").removeClass("Login-check-icon--js").addClass("Login-error-icon--js")
    $(".Login-password-toggle--js").removeClass("Login-question-icon--js").addClass("Login-error-icon--js")
    $(".Login-username-message").show().html(userNameMessage)
    $(".Login-password-message").show().html(passwordMessage)
  }
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

$(".Menu-overlay--js").click(function() {
  toggleMenu()
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


$(".Correct-lottery-btn--js").click(function() {
  $(".Login-header--js").html("Logga in för att rätta din lott")
  $(".Login-overlay-container").fadeIn("fast");
  if($(".Menu-container").hasClass("Menu--open")) {
      toggleMenu();
  }
})

$(".Menu-row-profile--js, .Open-login--js").click(function() {
  $(".Login-header--js").html("Logga in på Min Sida")
    $(".Login-overlay-container").fadeIn("fast");
    if($(".Menu-container").hasClass("Menu--open")) {
        toggleMenu();
    }
})

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvdHRlcnkuanMiLCJMb2dpbi5qcyIsIk1lbnUuanMiLCJNZW51LXJvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gLy8vLy8vLy8gU1RBUlQgalF1ZXJ5XG4gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbi8vIFRoZSBjdXN0b21lcnMgbG90dGVyeXRpY2tldFxudmFyIG51bWJlcnMgPSBbNiw1LDQsNSw2LDNdXG52YXIgY291bnRlciA9IDE7XG5cbnZhciBjb3JyZWN0TnVtYmVycyA9IFtcbiAge1xuICAgIGhlYWRlcjogXCIxIDAwMCAwMDBcIixcbiAgICBudW1iZXJzOiBbXG4gICAgICBbNiw1LDQsNSw2LDFdXG4gICAgXVxuICB9LFxuICB7XG4gICAgaGVhZGVyOiBcIjMwMCAwMDBcIixcbiAgICBudW1iZXJzOiBbXG4gICAgICBbMyw0LDUsMyw0LDJdLFxuICAgICAgWzYsNSw3LDUsNiwzXSxcbiAgICAgIFs2LDUsNCw1LDYsOF1cbiAgICBdXG4gIH0sXG4gIHtcbiAgICBoZWFkZXI6IFwiMTAwIDAwMFwiLFxuICAgIG51bWJlcnM6IFtcbiAgICAgIFszLDQsNSwzLDQsNV0sXG4gICAgICBbMSwzLDQsOSwyLDNdLFxuICAgICAgWzMsMyw2LDcsOCwyXSxcbiAgICAgIFswLDUsMiw4LDQsOV0sXG4gICAgXVxuICB9XG5dXG5cbi8vIENoZWNrIGhvdyBjb3JyZWN0IGVhY2ggYXJyYXkgaXMgaW4gbnVtYmVyLiBFZ1xuLy8gSWYgYW4gYXJyYXkgbWF0Y2hlcyBieSB0d28gZGlnaXRzIHRoZSB2YWx1ZSB3aWxsIGJlIHR3b1xudmFyIGNvcnJlY3RBbW91bnQgPSBbXTtcbnZhciB3aW5uaW5nID0gZmFsc2U7XG5cbi8vIEZ1bmN0aW9uIHRvIHB1c2ggdGhlIHZhbHVlIHRvIHRoZSBhcnJheVxuY2hlY2tBcnJheSA9ICh3aW5uaW5nTnVtYmVycykgPT4ge1xuICBsZXQgY29ycmVjdCA9IDA7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgd2lubmluZ051bWJlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYod2lubmluZ051bWJlcnNbaV0gPT09IG51bWJlcnNbaV0pIHtcbiAgICAgICAgY29ycmVjdCsrO1xuICAgICAgICB9XG4gIH1cbiAgY29ycmVjdEFtb3VudC5wdXNoKGNvcnJlY3QpO1xufVxuXG5cbi8vIENhbGwgdGhlIGZ1bmN0aW9uXG5mb3IgKHZhciBpID0gMDsgaSA8IGNvcnJlY3ROdW1iZXJzW2NvdW50ZXJdLm51bWJlcnMubGVuZ3RoOyBpKyspIHtcbiAgY2hlY2tBcnJheShjb3JyZWN0TnVtYmVyc1tjb3VudGVyXS5udW1iZXJzW2ldKVxufVxuLy8gY29uc29sZS5sb2coY29ycmVjdEFtb3VudCk7XG5cblxuLy8gQ2hlY2sgd2hpY2ggbnVtYmVyIGlzIHRoZSBoaWdoZXN0IGluIHRoZSBhcnJheVxuZ2V0TWF4T2ZBcnJheSA9IChudW1BcnJheSkgPT4gIE1hdGgubWF4LmFwcGx5KG51bGwsIG51bUFycmF5KTtcblxuLy8gR2V0IHRoZSBudW1iZXJcbnZhciBoaWdoZXN0TnVtYmVyID0gZ2V0TWF4T2ZBcnJheShjb3JyZWN0QW1vdW50KTtcblxuLy8gY29uc29sZS5sb2coaGlnaGVzdE51bWJlcik7XG5cbmlmKGhpZ2hlc3ROdW1iZXIgPT09IG51bWJlcnMubGVuZ3RoKSB7XG4gIHdpbm5pbmcgPSB0cnVlO1xufVxuLy8gY29uc29sZS5sb2cod2lubmluZyk7XG5cblxuLy8gVGhlIGFycmF5IHRoYXQgdGhlIGRyYXdpbmcgd2lsbCBiZSBiYXNlZCBvblxudmFyIGRyYXdBcnJheSA9IGNvcnJlY3ROdW1iZXJzW2NvdW50ZXJdLm51bWJlcnNbY29ycmVjdEFtb3VudC5pbmRleE9mKGhpZ2hlc3ROdW1iZXIpXTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyAqXG4vLyBMT1RURVJZIEFOSU1BVElPTlxuLy8gKlxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgbG90dGVyeU51bWJlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdMb3R0ZXJ5LW51bWJlcicpO1xuXG52YXIgc3Bpbm5JbnRlcnZhbCA9IDIwMDsgLy8gSW50ZXJ2YWwgZm9yIHNwaW5uIHN0YXJ0IGZvciBlYWNoIG51bWJlclxuXG5mb3IgKHZhciBpID0gMDsgaSA8IG51bWJlcnMubGVuZ3RoOyBpKyspIHtcbiAgZm9yICh2YXIgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gIHZhciBudW1iZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBpZihqID09IG51bWJlcnNbaV0pIHtcbiAgbnVtYmVyLmlubmVySFRNTCA9IGo7XG4gIC8vIG51bWJlci5jbGFzc05hbWUgPSBcIlwiO1xuICB9IGVsc2Uge1xuICAvLyBudW1iZXIuY2xhc3NOYW1lID0gXCJcIjtcbiAgbnVtYmVyLmlubmVySFRNTCA9IGo7XG4gIH1cbiAgbG90dGVyeU51bWJlcnNbaV0uYXBwZW5kQ2hpbGQobnVtYmVyKVxuICB9XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gU1RBUlQgUk9MTElORyBUSEUgTlVNQkVSU1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgY291bnRlciA9IDA7XG5cbnZhciBzdGFydEludGVydmFsID0gdHJ1ZTsgLy8gU2V0IHRvIHRydWUgaWYgdGhlIHNwaW5uZXIgc2hvdWxkIHN0YXJ0IGF0IHRoZSBzYW1lIHRpbWVcblxuZnVuY3Rpb24gcm9sbE51bWJlcnMoKSB7XG5cbmlmKHN0YXJ0SW50ZXJ2YWwpIHtcblxuICAgIGlmKGNvdW50ZXI8bG90dGVyeU51bWJlcnMubGVuZ3RoKVxuICAgICAge1xuICAgICAgICBsb3R0ZXJ5TnVtYmVyc1tjb3VudGVyXS5jbGFzc05hbWUgPSBcIkxvdHRlcnktbnVtYmVyIExvdHRlcnktbnVtYmVyLS1zcGlubmluZ1wiO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgIHJvbGxOdW1iZXJzKClcbiAgICAgICAgfSwgc3Bpbm5JbnRlcnZhbFxuICAgICAgKTtcbiAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgIH1cbn0gZWxzZSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbG90dGVyeU51bWJlcnMubGVuZ3RoOyBpKyspIHtcbiAgICBsb3R0ZXJ5TnVtYmVyc1tpXS5jbGFzc05hbWUgPSBcIkxvdHRlcnktbnVtYmVyIExvdHRlcnktbnVtYmVyLS1zcGlubmluZ1wiO1xuICB9XG59XG59XG5cblxudmFyIHkgPSAwO1xudmFyIHNwaW5uVGltZSA9IDI1MDA7IC8vIEhPVyBMT05HIERPRVMgVEhFIEFOSU1BVElPTiwgU1lOQyBXSVRIIENTUyBGSUxFXG52YXIgcmF0aW8gPSBzcGlublRpbWUgKiAoIG51bWJlcnNbMF0gLyAxMCk7XG5cbmZ1bmN0aW9uIGNvcnJlY3QoKSB7XG5cbiAgdmFyIHN0b3AgPSA0MDAwOyAvLyBJTklUSUFMIFZBTFVFIChLaW5kYSBwb2ludGxlc3MpXG4gIHZhciBkaWZmID0gMDtcblxuICBpZih5IDwgbnVtYmVycy5sZW5ndGgpXG4gICAge1xuICAgICAgaWYobnVtYmVyc1t5KzFdID4gbnVtYmVyc1t5XSkge1xuICAgICAgICBkaWZmID0gbnVtYmVyc1t5KzFdIC0gbnVtYmVyc1t5XTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBkaWZmID0gMTAgLSAobnVtYmVyc1t5XSAtIG51bWJlcnNbeSsxXSk7XG4gICAgICB9XG5cbiAgICAgIHN0YXJ0SW50ZXJ2YWwgPyBzdG9wID0gc3Bpbm5JbnRlcnZhbCArICgoIGRpZmYgKiBzcGlublRpbWUgKS8xMCkgOiBzdG9wID0gICgoIGRpZmYgKiBzcGlublRpbWUgKS8xMCk7XG5cbiAgICAgIGxvdHRlcnlOdW1iZXJzW3ldLmNsYXNzTmFtZSA9IFwiTG90dGVyeS1udW1iZXJcIjtcblxuICAgICAgaWYobnVtYmVyc1t5XSA9PT0gZHJhd0FycmF5W3ldKSB7XG4gICAgICAgIGxvdHRlcnlOdW1iZXJzW3ldLmlubmVySFRNTCA9IFwiPGRpdiBjbGFzcz0nTG90dGVyeS1jb3JyZWN0Jz5cIitudW1iZXJzW3ldK1wiPC9kaXY+XCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb3R0ZXJ5TnVtYmVyc1t5XS5pbm5lckhUTUwgPSBcIjxkaXYgY2xhc3M9J0xvdHRlcnktd3JvbmcnPlwiK251bWJlcnNbeV0rXCI8L2Rpdj5cIjtcbiAgICAgIH1cblxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpXG4gICAgICB7XG4gICAgICAgIGNvcnJlY3QoKVxuICAgICAgfSxcbiAgICAgIHN0b3BcbiAgICApO1xuICAgICAgIHkrKztcbiAgICB9XG59XG5cblxudmFyIHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIlN0YXJ0LWxvdHRlcnktLWpzXCIpWzBdO1xuXG5zdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixmdW5jdGlvbigpIHtcbiAgcm9sbE51bWJlcnMoKTtcbiAgc2V0VGltZW91dChmdW5jdGlvbigpeyBjb3JyZWN0KCk7IH0sIHNwaW5uVGltZStyYXRpbyk7XG59KVxuXG5cblxuXG5cblxuXG5cblxufSk7XG4iLCIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAvLyBDTE9TRSBNT0RBTFxuIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4kKFwiLkxvZ2luLWNsaWNrYXJlYS0tanMsIC5Mb2dpbi1jbG9zZS1mb3JtLS1qc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5Mb2dpbi1vdmVybGF5LWNvbnRhaW5lclwiKS5mYWRlT3V0KFwiZmFzdFwiKVxufSlcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gLy8gU0xJREVUT0dHTEUgVEhFIEhFTFBCT1hFU1xuIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4kKFwiLkxvZ2luLXVzZXJuYW1lLXRvZ2dsZS0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuTG9naW4tdXNlcm5hbWUtaGVscC1ib3gtLWpzXCIpLnNsaWRlVG9nZ2xlKCk7XG59KTtcblxuJChcIi5Mb2dpbi1wYXNzd29yZC10b2dnbGUtLWpzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKFwiLkxvZ2luLXBhc3N3b3JkLWhlbHAtYm94LS1qc1wiKS5zbGlkZVRvZ2dsZSgpO1xufSk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gU1RBVEUgT0YgVEhFIEZPUk1cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xudmFyIHN0YXRlID0ge1xuICB1c2VyTmFtZTogZmFsc2UsIC8vIElTIENVU1RPTUVSTlVNQkVSIE9SIEVNQUlMIE9LXG4gIHBhc3NXb3JkOiBmYWxzZSxcbiAgZW1haWxSZWc6IGZhbHNlLFxuICBudW1iZXJSZWc6IGZhbHNlXG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gVVNFUk5BTUUgQ0hFQ0tcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAvLyBSRUdFWCBtYWlsLlxudmFyIGVtYWlsUmVnID0gbmV3IFJlZ0V4cCgvXigoXCJbXFx3LVxcc10rXCIpfChbXFx3LV0rKD86XFwuW1xcdy1dKykqKXwoXCJbXFx3LVxcc10rXCIpKFtcXHctXSsoPzpcXC5bXFx3LV0rKSopKShAKCg/OltcXHctXStcXC4pKlxcd1tcXHctXXswLDY2fSlcXC4oW2Etel17Miw2fSg/OlxcLlthLXpdezJ9KT8pJCl8KEBcXFs/KCgyNVswLTVdXFwufDJbMC00XVswLTldXFwufDFbMC05XXsyfVxcLnxbMC05XXsxLDJ9XFwuKSkoKDI1WzAtNV18MlswLTRdWzAtOV18MVswLTldezJ9fFswLTldezEsMn0pXFwuKXsyfSgyNVswLTVdfDJbMC00XVswLTldfDFbMC05XXsyfXxbMC05XXsxLDJ9KVxcXT8kKS9pKTtcbiAgLy8gUkVHRVggdXNlciBudW1iZXIuXG52YXIgdXNlck51bWJlclJlZyA9IG5ldyBSZWdFeHAoJ15bYS16QS1aXXsyfVswLTldezZ9JCcpO1xudmFyIHZhbGlkVXNlcjtcbnZhciB1c2VyTmFtZU1lc3NhZ2UgPSBcIkR1IGhhciBpbnRlIGFuZ2l2ZXQgZXR0IGtvcnJla3Qga3VuZG51bW1lciBlbGxlciBlLXBvc3RhZHJlc3MuXCI7XG52YXIgcGFzc3dvcmRNZXNzYWdlID0gXCJGZWxha3RpZ3QgbMO2c2Vub3JkLlwiO1xuXG4vLyBJTlBVVCBGSUVMRCBDSEFOR0VcbiQoJy5Mb2dpbi1pbnB1dC11c2VybmFtZS0tanMnKS5vbignaW5wdXQnLCBmdW5jdGlvbigpIHtcblxuICAgIGlmKGVtYWlsUmVnLnRlc3QoJCh0aGlzKS52YWwoKSkgKSB7XG4gICAgICBzdGF0ZS5lbWFpbFJlZyA9IHRydWU7XG4gICAgICBzdGF0ZS5udW1iZXJSZWcgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYodXNlck51bWJlclJlZy50ZXN0KCQodGhpcykudmFsKCkgKSkge1xuICAgICAgc3RhdGUubnVtYmVyUmVnID0gdHJ1ZTtcbiAgICAgIHN0YXRlLmVtYWlsUmVnID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlLm51bWJlclJlZyA9IGZhbHNlO1xuICAgICAgc3RhdGUuZW1haWxSZWcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YWxpZFVzZXIgPSBzdGF0ZS5udW1iZXJSZWcgfHwgc3RhdGUuZW1haWxSZWc7XG4gICAgICBpZiAodmFsaWRVc2VyKSB7XG4gICAgICAgIHN0YXRlLnVzZXJOYW1lID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzdGF0ZS51c2VyTmFtZSA9IGZhbHNlO1xuICAgICAgfVxufSk7XG5cbi8vIFdIRU4gSU5QVVQgSVMgRE9ORSBXSVRIIFRIRSBGSUVMRFxuJCgnLkxvZ2luLWlucHV0LXVzZXJuYW1lLS1qcycpLmZvY3Vzb3V0KGZ1bmN0aW9uKCkge1xuICAvLyBjb25zb2xlLmxvZyhcIklOUFVUIE5PVCBJTiBGT0NVUyBBTlkgTU9SRVwiKTtcbiAgaWYoc3RhdGUudXNlck5hbWUgPT0gZmFsc2UpIHtcbiAgICAkKFwiLkxvZ2luLXVzZXJuYW1lLXRvZ2dsZS0tanNcIikucmVtb3ZlQ2xhc3MoXCJMb2dpbi1xdWVzdGlvbi1pY29uLS1qc1wiKS5yZW1vdmVDbGFzcyhcIkxvZ2luLWNoZWNrLWljb24tLWpzXCIpLmFkZENsYXNzKFwiTG9naW4tZXJyb3ItaWNvbi0tanNcIilcbiAgICAkKHRoaXMpLmFkZENsYXNzKFwiTG9naW4taW5wdXQtZXJyb3ItLWpzXCIpXG4gICAgJChcIi5Mb2dpbi11c2VybmFtZS1tZXNzYWdlXCIpLnNob3coKS5odG1sKHVzZXJOYW1lTWVzc2FnZSlcblxuICB9IGVsc2Uge1xuICAgICQoXCIuTG9naW4tdXNlcm5hbWUtdG9nZ2xlLS1qc1wiKS5yZW1vdmVDbGFzcyhcIkxvZ2luLXF1ZXN0aW9uLWljb24tLWpzXCIpLnJlbW92ZUNsYXNzKFwiTG9naW4tZXJyb3ItaWNvbi0tanNcIikuYWRkQ2xhc3MoXCJMb2dpbi1jaGVjay1pY29uLS1qc1wiKVxuICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJMb2dpbi1pbnB1dC1lcnJvci0tanNcIilcbiAgICAkKFwiLkxvZ2luLXVzZXJuYW1lLW1lc3NhZ2VcIikuaGlkZSgpLmh0bWwoXCJcIilcbiAgfVxuXG4gIC8vIFdISUNIIEJPWCBTSE9VTEQgU0hPV1xuICBpZihzdGF0ZS5lbWFpbFJlZykge1xuICAgIHBhc3N3b3JkQm94KFwicmVzZXRcIilcbiAgICAkKFwiLkxvZ2luLXJlc2V0LWVtYWlsLS1qc1wiKS5odG1sKCQoJy5Mb2dpbi1pbnB1dC11c2VybmFtZS0tanMnKS52YWwoKSkgLy8gU0VUIFRIRSBFTUFJTCBJTiBUSEUgTUVTU0FHRSBUTyBXSEFURVZFUiBJVCBJUyBJTiBUSEUgSU5QVVQgSUYgSVQgSVMgVkFMSURcbiAgfSBlbHNlIHtcbiAgICBwYXNzd29yZEJveChcImRlZmF1bHRcIilcbiAgfVxufSlcblxuJChcIi5Mb2dpbi1yZXNldC1wYXNzd29yZC1idG4tLWpzXCIpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgcGFzc3dvcmRCb3goXCJzZW50XCIpXG59KVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFBBU1NXT1JEIEhFTFAgQk9YXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmZ1bmN0aW9uIHBhc3N3b3JkQm94KGJveCkge1xuICBpZihib3ggPT0gXCJyZXNldFwiKSB7XG4gICAgJChcIi5Mb2dpbi1wYXNzd29yZC1yZXNldC1ib3gtLWpzXCIpLnNob3coKTtcbiAgICAkKFwiLkxvZ2luLXBhc3N3b3JkLXNlbnQtYm94LS1qcywgLkxvZ2luLXBhc3N3b3JkLWRlZmF1bHQtYm94LS1qc1wiKS5oaWRlKCk7XG4gIH0gZWxzZSBpZihib3ggPT0gXCJzZW50XCIpIHtcbiAgICAkKFwiLkxvZ2luLXBhc3N3b3JkLXJlc2V0LWJveC0tanMsIC5Mb2dpbi1wYXNzd29yZC1kZWZhdWx0LWJveC0tanNcIikuaGlkZSgpO1xuICAgICQoXCIuTG9naW4tcGFzc3dvcmQtc2VudC1ib3gtLWpzXCIpLnNob3coKTtcbiAgfSBlbHNlIGlmKGJveCA9PSBcImRlZmF1bHRcIikge1xuICAgICQoXCIuTG9naW4tcGFzc3dvcmQtc2VudC1ib3gtLWpzLCAuTG9naW4tcGFzc3dvcmQtcmVzZXQtYm94LS1qc1wiKS5oaWRlKCk7XG4gICAgJChcIi5Mb2dpbi1wYXNzd29yZC1kZWZhdWx0LWJveC0tanNcIikuc2hvdygpO1xuICB9XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gUEFTU1dPUkQgSU5QVVQgRklFTERcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4kKFwiLkxvZ2luLWlucHV0LXBhc3N3b3JkLS1qc1wiKS5vbignaW5wdXQnLCBmdW5jdGlvbigpIHtcbiAgaWYoJCh0aGlzKS52YWwoKSA9PSBcImtvbWJpXCIpIHtcbiAgICBzdGF0ZS5wYXNzV29yZCA9IHRydWVcbiAgfSBlbHNlIHtcbiAgICBzdGF0ZS5wYXNzV29yZCA9IGZhbHNlXG4gIH1cbiAgICBpZihzdGF0ZS5wYXNzV29yZCAhPSB0cnVlKSB7XG4gICAgICAkKFwiLkxvZ2luLXBhc3N3b3JkLW1lc3NhZ2VcIikuaGlkZSgpO1xuICAgIH1cbiAgICBpZigkKHRoaXMpLmhhc0NsYXNzKFwiTG9naW4taW5wdXQtZXJyb3ItLWpzXCIpKSB7XG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiTG9naW4taW5wdXQtZXJyb3ItLWpzXCIpXG4gICAgICAkKFwiLkxvZ2luLXBhc3N3b3JkLXRvZ2dsZS0tanNcIikucmVtb3ZlQ2xhc3MoXCJMb2dpbi1lcnJvci1pY29uLS1qc1wiKS5hZGRDbGFzcyhcIkxvZ2luLXF1ZXN0aW9uLWljb24tLWpzXCIpXG4gICAgfVxuIH0pO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBDSEVDSyBJRiBMT0dJTiBQQVNTRUQgKEpVU1QgRk9SIFBST1RPVFlQRSBURVNUSU5HKVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4kKFwiLkxvZ2luLWZvcm0tc3VibWl0LWJ0bi0tanNcIikuY2xpY2soZnVuY3Rpb24oZSkge1xuICBlLnByZXZlbnREZWZhdWx0KGUpXG4gIGlmKHZhbGlkVXNlciAmJiBzdGF0ZS5wYXNzV29yZCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKFwiYWNjb3VudC5odG1sXCIpO1xuICB9XG4gIGVsc2UgaWYodmFsaWRVc2VyID09IHRydWUgJiYgc3RhdGUucGFzc1dvcmQgIT0gdHJ1ZSkge1xuICAgICQoXCIuTG9naW4tcGFzc3dvcmQtdG9nZ2xlLS1qc1wiKS5yZW1vdmVDbGFzcyhcIkxvZ2luLXF1ZXN0aW9uLWljb24tLWpzXCIpLmFkZENsYXNzKFwiTG9naW4tZXJyb3ItaWNvbi0tanNcIilcbiAgICAkKFwiLkxvZ2luLWhlYWRlci0tanNcIikuYWRkQ2xhc3MoXCJMb2dpbi1oZWFkZXItLWVycm9yXCIpLmh0bWwoXCJJbmxvZ2duaW5nZW4gbWlzc2x5Y2thZGVzXCIpXG4gICAgJChcIi5Mb2dpbi1pbnB1dC1wYXNzd29yZC0tanNcIikuYWRkQ2xhc3MoXCJMb2dpbi1pbnB1dC1lcnJvci0tanNcIilcbiAgICAkKFwiLkxvZ2luLXBhc3N3b3JkLW1lc3NhZ2VcIikuc2hvdygpLmh0bWwocGFzc3dvcmRNZXNzYWdlKVxuICB9XG4gIGVsc2Uge1xuICAgICQoXCIuTG9naW4taGVhZGVyLS1qc1wiKS5hZGRDbGFzcyhcIkxvZ2luLWhlYWRlci0tZXJyb3JcIikuaHRtbChcIklubG9nZ25pbmdlbiBtaXNzbHlja2FkZXNcIilcbiAgICAkKFwiLkxvZ2luLWlucHV0LXBhc3N3b3JkLS1qc1wiKS5hZGRDbGFzcyhcIkxvZ2luLWlucHV0LWVycm9yLS1qc1wiKVxuICAgICQoXCIuTG9naW4tdXNlcm5hbWUtdG9nZ2xlLS1qc1wiKS5yZW1vdmVDbGFzcyhcIkxvZ2luLXF1ZXN0aW9uLWljb24tLWpzXCIpLnJlbW92ZUNsYXNzKFwiTG9naW4tY2hlY2staWNvbi0tanNcIikuYWRkQ2xhc3MoXCJMb2dpbi1lcnJvci1pY29uLS1qc1wiKVxuICAgICQoXCIuTG9naW4tcGFzc3dvcmQtdG9nZ2xlLS1qc1wiKS5yZW1vdmVDbGFzcyhcIkxvZ2luLXF1ZXN0aW9uLWljb24tLWpzXCIpLmFkZENsYXNzKFwiTG9naW4tZXJyb3ItaWNvbi0tanNcIilcbiAgICAkKFwiLkxvZ2luLXVzZXJuYW1lLW1lc3NhZ2VcIikuc2hvdygpLmh0bWwodXNlck5hbWVNZXNzYWdlKVxuICAgICQoXCIuTG9naW4tcGFzc3dvcmQtbWVzc2FnZVwiKS5zaG93KCkuaHRtbChwYXNzd29yZE1lc3NhZ2UpXG4gIH1cbn0pO1xuIiwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBUT0dHTEUgTUVOVSBPUEVOXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxudmFyIG1lbnVUZXh0ID0gJChcIi5NZW51LXJvdy10aXRsZS10aXRsZVwiKTtcblxuJChcIi5NZW51LXJvdy1tZW51LS1qc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgdG9nZ2xlTWVudSgpO1xufSlcblxuJChcIi5NZW51LWxldmVsLW9uZS1oZWFkZXItLWpzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKHRoaXMpLm5leHQoKS5zbGlkZVRvZ2dsZSgpO1xuICAkKHRoaXMpLnRvZ2dsZUNsYXNzKFwiY2hpbGRyZW4tb3BlblwiKTtcbn0pXG5cbiQoXCIuTWVudS1vdmVybGF5LS1qc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgdG9nZ2xlTWVudSgpXG59KVxuXG5cblxuZnVuY3Rpb24gdG9nZ2xlTWVudSgpIHtcbiAgJChcIi5NZW51LWNvbnRhaW5lclwiKS50b2dnbGVDbGFzcyhcIk1lbnUtLW9wZW5cIilcbiAgJChcIi5TaXRlLWNvbnRhaW5lclwiKS50b2dnbGVDbGFzcyhcImxvY2tlZFwiKVxuICAkKFwiLk1lbnUtcm93LW1lbnUtLWpzXCIpLnRvZ2dsZUNsYXNzKFwiQnVyZ2VyLS1vcGVuXCIpO1xuXG4gIGlmKG1lbnVUZXh0LnRleHQoKSA9PSBcIm1lbnlcIikge1xuICAgICAgbWVudVRleHQudGV4dChcInN0w6RuZyBtZW55XCIpXG4gIH0gZWxzZSB7XG4gICAgbWVudVRleHQudGV4dChcIm1lbnlcIilcbiAgfVxufVxuIiwiXG4kKFwiLkNvcnJlY3QtbG90dGVyeS1idG4tLWpzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKFwiLkxvZ2luLWhlYWRlci0tanNcIikuaHRtbChcIkxvZ2dhIGluIGbDtnIgYXR0IHLDpHR0YSBkaW4gbG90dFwiKVxuICAkKFwiLkxvZ2luLW92ZXJsYXktY29udGFpbmVyXCIpLmZhZGVJbihcImZhc3RcIik7XG4gIGlmKCQoXCIuTWVudS1jb250YWluZXJcIikuaGFzQ2xhc3MoXCJNZW51LS1vcGVuXCIpKSB7XG4gICAgICB0b2dnbGVNZW51KCk7XG4gIH1cbn0pXG5cbiQoXCIuTWVudS1yb3ctcHJvZmlsZS0tanMsIC5PcGVuLWxvZ2luLS1qc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5Mb2dpbi1oZWFkZXItLWpzXCIpLmh0bWwoXCJMb2dnYSBpbiBww6UgTWluIFNpZGFcIilcbiAgICAkKFwiLkxvZ2luLW92ZXJsYXktY29udGFpbmVyXCIpLmZhZGVJbihcImZhc3RcIik7XG4gICAgaWYoJChcIi5NZW51LWNvbnRhaW5lclwiKS5oYXNDbGFzcyhcIk1lbnUtLW9wZW5cIikpIHtcbiAgICAgICAgdG9nZ2xlTWVudSgpO1xuICAgIH1cbn0pXG4iXX0=
