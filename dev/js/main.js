/////////////////////////////////////////////
 //////// START jQuery
 /////////////////////////////////////////////
$(document).ready(function() {
// The customers lotteryticket
var numbers = [2,0,5,5,6,3];

var correctNumbers = [
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
    header: "100.000",
    numbers: [
      [3,4,5,3,4,5],
      [1,3,4,9,2,3],
      [3,3,6,7,8,2],
      [0,5,2,8,4,9],
    ]
  },
  {
    header: "50.000",
    numbers: [
      [3,4,5,3,4,5],
      [1,3,4,9,2,3],
      [3,3,6,7,8,2],
      [0,5,2,8,4,9],
      [2,3,3,7,8,2],
      [0,5,2,9,9,9],
    ]
  }
]
/////////////////////////////////////////////
// Variables which will be reset
/////////////////////////////////////////////
var winning = false;
var objectCounter = 0;
var correctAmount; // Will be an array

/////////////////////////////////////////////
// SET INITIAL STATE OF APPLICATION
/////////////////////////////////////////////
// Set My Lottery-number
var myLotteryNumber = document.getElementsByClassName("Lottery-mynumber--js")[0];
myLotteryNumber.innerHTML = numbers.toString().replace(/^[,]$|[,]+/g,"");


// Set Lottery-row
var lotteryNumbers = document.getElementsByClassName('Lottery-number');
var lotteryHeader = document.getElementsByClassName("Lottery-prince-header")[0];
lotteryHeader.innerHTML = correctNumbers[objectCounter].header;
for (var i = 0; i < numbers.length; i++) {
  for (var j = 0; j < 10; j++) {
  var number = document.createElement("div");
  number.innerHTML = j;
  lotteryNumbers[i].appendChild(number)
  }
}


const startLottery = () => {
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
        if(winningNumbers[i] === numbers[i]) {
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

if(highestNumber === numbers.length) {
  winning = true;
}
// The array that the drawing will be based on
var drawArray = correctNumbers[objectCounter].numbers[correctAmount.indexOf(highestNumber)];
/////////////////////////////////////////////
// *
// LOTTERY ANIMATION
// *
/////////////////////////////////////////////
var spinnInterval = 200; // Interval for spinn start for each number
for (var i = 0; i < drawArray.length; i++) {
  for (var j = 0; j < 10; j++) {
  var number = document.createElement("div");
  if(j == drawArray[i]) {
  number.innerHTML = j;
  } else {
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
var spinnTime = 2500; // HOW LONG DOES THE ANIMATION, SYNC WITH CSS FILE
var ratio = spinnTime * ( drawArray[0] / 10);
const correct = () => {
  var stop = 4000; // INITIAL VALUE (Kinda pointless)
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

      if(drawArray[y] === numbers[y]) {
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
setTimeout(function(){ correct(); }, spinnTime+ratio);
}
/////////////////////////////////////////////
// END STARTLOTTERY FUNCTION
/////////////////////////////////////////////

var startButton = document.getElementsByClassName("Start-lottery--js")[0];
startButton.addEventListener("click",function() {
  startLottery();
})


/////////////////////////////////////////////
// After the drawing is done
/////////////////////////////////////////////
var messageContainer = document.getElementsByClassName("Lottery-message-container")[0];
var lotteryMessage = document.getElementsByClassName("Lottery-message--js")[0];


const drawingDone = () => {
  if(winning) {
    lotteryMessage.innerHTML = "Grattis du vann";
  } else {
    lotteryMessage.innerHTML = "Tyvärr du vann inte "+correctNumbers[objectCounter].header+" kr." ;
  }
  objectCounter++;
  startButton.innerHTML = "Starta dragning för "+correctNumbers[objectCounter].header+" kr."

  // WHEN THE LAST NUMBER HAS BEEN DRAWED
  if(objectCounter === correctNumbers.length) {

  }
}



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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvdHRlcnkuanMiLCJMb2dpbi5qcyIsIk1lbnUuanMiLCJNZW51LXJvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuIC8vLy8vLy8vIFNUQVJUIGpRdWVyeVxuIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4vLyBUaGUgY3VzdG9tZXJzIGxvdHRlcnl0aWNrZXRcbnZhciBudW1iZXJzID0gWzIsMCw1LDUsNiwzXTtcblxudmFyIGNvcnJlY3ROdW1iZXJzID0gW1xuICB7XG4gICAgaGVhZGVyOiBcIjEuMDAwLjAwMFwiLFxuICAgIG51bWJlcnM6IFtcbiAgICAgIFs2LDUsNCw1LDYsMV1cbiAgICBdXG4gIH0sXG4gIHtcbiAgICBoZWFkZXI6IFwiMzAwLjAwMFwiLFxuICAgIG51bWJlcnM6IFtcbiAgICAgIFsxLDEsMywzLDQsMl0sXG4gICAgICBbMiwwLDQsNSw2LDFdLFxuICAgICAgWzAsMSwxLDEsMSwxXVxuICAgIF1cbiAgfSxcbiAge1xuICAgIGhlYWRlcjogXCIxMDAuMDAwXCIsXG4gICAgbnVtYmVyczogW1xuICAgICAgWzMsNCw1LDMsNCw1XSxcbiAgICAgIFsxLDMsNCw5LDIsM10sXG4gICAgICBbMywzLDYsNyw4LDJdLFxuICAgICAgWzAsNSwyLDgsNCw5XSxcbiAgICBdXG4gIH0sXG4gIHtcbiAgICBoZWFkZXI6IFwiNTAuMDAwXCIsXG4gICAgbnVtYmVyczogW1xuICAgICAgWzMsNCw1LDMsNCw1XSxcbiAgICAgIFsxLDMsNCw5LDIsM10sXG4gICAgICBbMywzLDYsNyw4LDJdLFxuICAgICAgWzAsNSwyLDgsNCw5XSxcbiAgICAgIFsyLDMsMyw3LDgsMl0sXG4gICAgICBbMCw1LDIsOSw5LDldLFxuICAgIF1cbiAgfVxuXVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBWYXJpYWJsZXMgd2hpY2ggd2lsbCBiZSByZXNldFxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgd2lubmluZyA9IGZhbHNlO1xudmFyIG9iamVjdENvdW50ZXIgPSAwO1xudmFyIGNvcnJlY3RBbW91bnQ7IC8vIFdpbGwgYmUgYW4gYXJyYXlcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBTRVQgSU5JVElBTCBTVEFURSBPRiBBUFBMSUNBVElPTlxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBTZXQgTXkgTG90dGVyeS1udW1iZXJcbnZhciBteUxvdHRlcnlOdW1iZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiTG90dGVyeS1teW51bWJlci0tanNcIilbMF07XG5teUxvdHRlcnlOdW1iZXIuaW5uZXJIVE1MID0gbnVtYmVycy50b1N0cmluZygpLnJlcGxhY2UoL15bLF0kfFssXSsvZyxcIlwiKTtcblxuXG4vLyBTZXQgTG90dGVyeS1yb3dcbnZhciBsb3R0ZXJ5TnVtYmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ0xvdHRlcnktbnVtYmVyJyk7XG52YXIgbG90dGVyeUhlYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJMb3R0ZXJ5LXByaW5jZS1oZWFkZXJcIilbMF07XG5sb3R0ZXJ5SGVhZGVyLmlubmVySFRNTCA9IGNvcnJlY3ROdW1iZXJzW29iamVjdENvdW50ZXJdLmhlYWRlcjtcbmZvciAodmFyIGkgPSAwOyBpIDwgbnVtYmVycy5sZW5ndGg7IGkrKykge1xuICBmb3IgKHZhciBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgdmFyIG51bWJlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG51bWJlci5pbm5lckhUTUwgPSBqO1xuICBsb3R0ZXJ5TnVtYmVyc1tpXS5hcHBlbmRDaGlsZChudW1iZXIpXG4gIH1cbn1cblxuXG5jb25zdCBzdGFydExvdHRlcnkgPSAoKSA9PiB7XG4gLy8gQ0hBTkdFIFRIRSBIRUFERVJcbmxvdHRlcnlIZWFkZXIuaW5uZXJIVE1MID0gY29ycmVjdE51bWJlcnNbb2JqZWN0Q291bnRlcl0uaGVhZGVyO1xubG90dGVyeU1lc3NhZ2UuaW5uZXJIVE1MID0gXCJEcmFnbmluZyBww6Vnw6VyXCI7XG4vLyBDaGVjayBob3cgY29ycmVjdCBlYWNoIGFycmF5IGlzIGluIG51bWJlci4gRWdcbi8vIElmIGFuIGFycmF5IG1hdGNoZXMgYnkgdHdvIGRpZ2l0cyB0aGUgdmFsdWUgd2lsbCBiZSB0d29cbmNvcnJlY3RBbW91bnQgPSBbXTtcbi8vIHZhciB3aW5uaW5nID0gZmFsc2U7XG5cbi8vIEZ1bmN0aW9uIHRvIHB1c2ggdGhlIHZhbHVlIHRvIHRoZSBhcnJheVxuY2hlY2tBcnJheSA9ICh3aW5uaW5nTnVtYmVycykgPT4ge1xuICBsZXQgY29ycmVjdCA9IDA7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgd2lubmluZ051bWJlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYod2lubmluZ051bWJlcnNbaV0gPT09IG51bWJlcnNbaV0pIHtcbiAgICAgICAgY29ycmVjdCsrO1xuICAgICAgICB9XG4gIH1cbiAgY29ycmVjdEFtb3VudC5wdXNoKGNvcnJlY3QpO1xufVxuXG5cbi8vIENhbGwgdGhlIGZ1bmN0aW9uXG5mb3IgKHZhciBpID0gMDsgaSA8IGNvcnJlY3ROdW1iZXJzW29iamVjdENvdW50ZXJdLm51bWJlcnMubGVuZ3RoOyBpKyspIHtcbiAgY2hlY2tBcnJheShjb3JyZWN0TnVtYmVyc1tvYmplY3RDb3VudGVyXS5udW1iZXJzW2ldKVxufVxuXG4vLyBDaGVjayB3aGljaCBudW1iZXIgaXMgdGhlIGhpZ2hlc3QgaW4gdGhlIGFycmF5XG5nZXRNYXhPZkFycmF5ID0gKG51bUFycmF5KSA9PiAgTWF0aC5tYXguYXBwbHkobnVsbCwgbnVtQXJyYXkpO1xuXG4vLyBHZXQgdGhlIG51bWJlclxudmFyIGhpZ2hlc3ROdW1iZXIgPSBnZXRNYXhPZkFycmF5KGNvcnJlY3RBbW91bnQpO1xuXG5pZihoaWdoZXN0TnVtYmVyID09PSBudW1iZXJzLmxlbmd0aCkge1xuICB3aW5uaW5nID0gdHJ1ZTtcbn1cbi8vIFRoZSBhcnJheSB0aGF0IHRoZSBkcmF3aW5nIHdpbGwgYmUgYmFzZWQgb25cbnZhciBkcmF3QXJyYXkgPSBjb3JyZWN0TnVtYmVyc1tvYmplY3RDb3VudGVyXS5udW1iZXJzW2NvcnJlY3RBbW91bnQuaW5kZXhPZihoaWdoZXN0TnVtYmVyKV07XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vICpcbi8vIExPVFRFUlkgQU5JTUFUSU9OXG4vLyAqXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnZhciBzcGlubkludGVydmFsID0gMjAwOyAvLyBJbnRlcnZhbCBmb3Igc3Bpbm4gc3RhcnQgZm9yIGVhY2ggbnVtYmVyXG5mb3IgKHZhciBpID0gMDsgaSA8IGRyYXdBcnJheS5sZW5ndGg7IGkrKykge1xuICBmb3IgKHZhciBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgdmFyIG51bWJlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGlmKGogPT0gZHJhd0FycmF5W2ldKSB7XG4gIG51bWJlci5pbm5lckhUTUwgPSBqO1xuICB9IGVsc2Uge1xuICBudW1iZXIuaW5uZXJIVE1MID0gajtcbiAgfVxuICBsb3R0ZXJ5TnVtYmVyc1tpXS5hcHBlbmRDaGlsZChudW1iZXIpXG4gIH1cbn1cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gU1RBUlQgUk9MTElORyBUSEUgTlVNQkVSU1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgY291bnRlciA9IDA7XG52YXIgc3RhcnRJbnRlcnZhbCA9IHRydWU7IC8vIFNldCB0byB0cnVlIGlmIHRoZSBzcGlubmVyIHNob3VsZCBzdGFydCBhdCB0aGUgc2FtZSB0aW1lXG5jb25zdCByb2xsTnVtYmVycyA9ICgpID0+IHtcbmlmKHN0YXJ0SW50ZXJ2YWwpIHtcbiAgICBpZihjb3VudGVyPGxvdHRlcnlOdW1iZXJzLmxlbmd0aClcbiAgICAgIHtcbiAgICAgICAgbG90dGVyeU51bWJlcnNbY291bnRlcl0uY2xhc3NOYW1lID0gXCJMb3R0ZXJ5LW51bWJlciBMb3R0ZXJ5LW51bWJlci0tc3Bpbm5pbmdcIjtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICByb2xsTnVtYmVycygpXG4gICAgICAgIH0sIHNwaW5uSW50ZXJ2YWxcbiAgICAgICk7XG4gICAgICAgICBjb3VudGVyKys7XG4gICAgICB9XG59IGVsc2Uge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxvdHRlcnlOdW1iZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgbG90dGVyeU51bWJlcnNbaV0uY2xhc3NOYW1lID0gXCJMb3R0ZXJ5LW51bWJlciBMb3R0ZXJ5LW51bWJlci0tc3Bpbm5pbmdcIjtcbiAgfVxufVxufVxudmFyIHkgPSAwO1xudmFyIHNwaW5uVGltZSA9IDI1MDA7IC8vIEhPVyBMT05HIERPRVMgVEhFIEFOSU1BVElPTiwgU1lOQyBXSVRIIENTUyBGSUxFXG52YXIgcmF0aW8gPSBzcGlublRpbWUgKiAoIGRyYXdBcnJheVswXSAvIDEwKTtcbmNvbnN0IGNvcnJlY3QgPSAoKSA9PiB7XG4gIHZhciBzdG9wID0gNDAwMDsgLy8gSU5JVElBTCBWQUxVRSAoS2luZGEgcG9pbnRsZXNzKVxuICB2YXIgZGlmZiA9IDA7XG5cbiAgaWYoeSA8IGRyYXdBcnJheS5sZW5ndGgpXG4gICAge1xuICAgICAgaWYoZHJhd0FycmF5W3krMV0gPiBkcmF3QXJyYXlbeV0pIHtcbiAgICAgICAgZGlmZiA9IGRyYXdBcnJheVt5KzFdIC0gZHJhd0FycmF5W3ldO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGRpZmYgPSAxMCAtIChkcmF3QXJyYXlbeV0gLSBkcmF3QXJyYXlbeSsxXSk7XG4gICAgICB9XG4gICAgICBzdGFydEludGVydmFsID8gc3RvcCA9IHNwaW5uSW50ZXJ2YWwgKyAoKCBkaWZmICogc3Bpbm5UaW1lICkvMTApIDogc3RvcCA9ICAoKCBkaWZmICogc3Bpbm5UaW1lICkvMTApO1xuXG4gICAgICBsb3R0ZXJ5TnVtYmVyc1t5XS5jbGFzc05hbWUgPSBcIkxvdHRlcnktbnVtYmVyXCI7XG5cbiAgICAgIGlmKGRyYXdBcnJheVt5XSA9PT0gbnVtYmVyc1t5XSkge1xuICAgICAgICBsb3R0ZXJ5TnVtYmVyc1t5XS5pbm5lckhUTUwgPSBcIjxkaXYgY2xhc3M9J0xvdHRlcnktY29ycmVjdCc+XCIrZHJhd0FycmF5W3ldK1wiPC9kaXY+XCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb3R0ZXJ5TnVtYmVyc1t5XS5pbm5lckhUTUwgPSBcIjxkaXYgY2xhc3M9J0xvdHRlcnktd3JvbmcnPlwiK2RyYXdBcnJheVt5XStcIjwvZGl2PlwiO1xuICAgICAgfVxuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+XG4gICAgICB7XG4gICAgICAgIGNvcnJlY3QoKVxuICAgICAgfSxcbiAgICAgIHN0b3BcbiAgICApO1xuICAgICAgIHkrKztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRHJhd2luZyBkb25lXG4gICAgICBkcmF3aW5nRG9uZSgpXG4gICAgfVxufVxucm9sbE51bWJlcnMoKTtcbnNldFRpbWVvdXQoZnVuY3Rpb24oKXsgY29ycmVjdCgpOyB9LCBzcGlublRpbWUrcmF0aW8pO1xufVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBFTkQgU1RBUlRMT1RURVJZIEZVTkNUSU9OXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxudmFyIHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIlN0YXJ0LWxvdHRlcnktLWpzXCIpWzBdO1xuc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24oKSB7XG4gIHN0YXJ0TG90dGVyeSgpO1xufSlcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIEFmdGVyIHRoZSBkcmF3aW5nIGlzIGRvbmVcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xudmFyIG1lc3NhZ2VDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiTG90dGVyeS1tZXNzYWdlLWNvbnRhaW5lclwiKVswXTtcbnZhciBsb3R0ZXJ5TWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJMb3R0ZXJ5LW1lc3NhZ2UtLWpzXCIpWzBdO1xuXG5cbmNvbnN0IGRyYXdpbmdEb25lID0gKCkgPT4ge1xuICBpZih3aW5uaW5nKSB7XG4gICAgbG90dGVyeU1lc3NhZ2UuaW5uZXJIVE1MID0gXCJHcmF0dGlzIGR1IHZhbm5cIjtcbiAgfSBlbHNlIHtcbiAgICBsb3R0ZXJ5TWVzc2FnZS5pbm5lckhUTUwgPSBcIlR5dsOkcnIgZHUgdmFubiBpbnRlIFwiK2NvcnJlY3ROdW1iZXJzW29iamVjdENvdW50ZXJdLmhlYWRlcitcIiBrci5cIiA7XG4gIH1cbiAgb2JqZWN0Q291bnRlcisrO1xuICBzdGFydEJ1dHRvbi5pbm5lckhUTUwgPSBcIlN0YXJ0YSBkcmFnbmluZyBmw7ZyIFwiK2NvcnJlY3ROdW1iZXJzW29iamVjdENvdW50ZXJdLmhlYWRlcitcIiBrci5cIlxuXG4gIC8vIFdIRU4gVEhFIExBU1QgTlVNQkVSIEhBUyBCRUVOIERSQVdFRFxuICBpZihvYmplY3RDb3VudGVyID09PSBjb3JyZWN0TnVtYmVycy5sZW5ndGgpIHtcblxuICB9XG59XG5cblxuXG59KTtcbiIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuIC8vIENMT1NFIE1PREFMXG4gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiQoXCIuTG9naW4tY2xpY2thcmVhLS1qcywgLkxvZ2luLWNsb3NlLWZvcm0tLWpzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKFwiLkxvZ2luLW92ZXJsYXktY29udGFpbmVyXCIpLmZhZGVPdXQoXCJmYXN0XCIpXG59KVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAvLyBTTElERVRPR0dMRSBUSEUgSEVMUEJPWEVTXG4gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiQoXCIuTG9naW4tdXNlcm5hbWUtdG9nZ2xlLS1qc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5Mb2dpbi11c2VybmFtZS1oZWxwLWJveC0tanNcIikuc2xpZGVUb2dnbGUoKTtcbn0pO1xuXG4kKFwiLkxvZ2luLXBhc3N3b3JkLXRvZ2dsZS0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuTG9naW4tcGFzc3dvcmQtaGVscC1ib3gtLWpzXCIpLnNsaWRlVG9nZ2xlKCk7XG59KTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBTVEFURSBPRiBUSEUgRk9STVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgc3RhdGUgPSB7XG4gIHVzZXJOYW1lOiBmYWxzZSwgLy8gSVMgQ1VTVE9NRVJOVU1CRVIgT1IgRU1BSUwgT0tcbiAgcGFzc1dvcmQ6IGZhbHNlLFxuICBlbWFpbFJlZzogZmFsc2UsXG4gIG51bWJlclJlZzogZmFsc2Vcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBVU0VSTkFNRSBDSEVDS1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIC8vIFJFR0VYIG1haWwuXG52YXIgZW1haWxSZWcgPSBuZXcgUmVnRXhwKC9eKChcIltcXHctXFxzXStcIil8KFtcXHctXSsoPzpcXC5bXFx3LV0rKSopfChcIltcXHctXFxzXStcIikoW1xcdy1dKyg/OlxcLltcXHctXSspKikpKEAoKD86W1xcdy1dK1xcLikqXFx3W1xcdy1dezAsNjZ9KVxcLihbYS16XXsyLDZ9KD86XFwuW2Etel17Mn0pPykkKXwoQFxcWz8oKDI1WzAtNV1cXC58MlswLTRdWzAtOV1cXC58MVswLTldezJ9XFwufFswLTldezEsMn1cXC4pKSgoMjVbMC01XXwyWzAtNF1bMC05XXwxWzAtOV17Mn18WzAtOV17MSwyfSlcXC4pezJ9KDI1WzAtNV18MlswLTRdWzAtOV18MVswLTldezJ9fFswLTldezEsMn0pXFxdPyQpL2kpO1xuICAvLyBSRUdFWCB1c2VyIG51bWJlci5cbnZhciB1c2VyTnVtYmVyUmVnID0gbmV3IFJlZ0V4cCgnXlthLXpBLVpdezJ9WzAtOV17Nn0kJyk7XG52YXIgdmFsaWRVc2VyO1xudmFyIHVzZXJOYW1lTWVzc2FnZSA9IFwiRHUgaGFyIGludGUgYW5naXZldCBldHQga29ycmVrdCBrdW5kbnVtbWVyIGVsbGVyIGUtcG9zdGFkcmVzcy5cIjtcbnZhciBwYXNzd29yZE1lc3NhZ2UgPSBcIkZlbGFrdGlndCBsw7ZzZW5vcmQuXCI7XG5cbi8vIElOUFVUIEZJRUxEIENIQU5HRVxuJCgnLkxvZ2luLWlucHV0LXVzZXJuYW1lLS1qcycpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgaWYoZW1haWxSZWcudGVzdCgkKHRoaXMpLnZhbCgpKSApIHtcbiAgICAgIHN0YXRlLmVtYWlsUmVnID0gdHJ1ZTtcbiAgICAgIHN0YXRlLm51bWJlclJlZyA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZih1c2VyTnVtYmVyUmVnLnRlc3QoJCh0aGlzKS52YWwoKSApKSB7XG4gICAgICBzdGF0ZS5udW1iZXJSZWcgPSB0cnVlO1xuICAgICAgc3RhdGUuZW1haWxSZWcgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUubnVtYmVyUmVnID0gZmFsc2U7XG4gICAgICBzdGF0ZS5lbWFpbFJlZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhbGlkVXNlciA9IHN0YXRlLm51bWJlclJlZyB8fCBzdGF0ZS5lbWFpbFJlZztcbiAgICAgIGlmICh2YWxpZFVzZXIpIHtcbiAgICAgICAgc3RhdGUudXNlck5hbWUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHN0YXRlLnVzZXJOYW1lID0gZmFsc2U7XG4gICAgICB9XG59KTtcblxuLy8gV0hFTiBJTlBVVCBJUyBET05FIFdJVEggVEhFIEZJRUxEXG4kKCcuTG9naW4taW5wdXQtdXNlcm5hbWUtLWpzJykuZm9jdXNvdXQoZnVuY3Rpb24oKSB7XG4gIC8vIGNvbnNvbGUubG9nKFwiSU5QVVQgTk9UIElOIEZPQ1VTIEFOWSBNT1JFXCIpO1xuICBpZihzdGF0ZS51c2VyTmFtZSA9PSBmYWxzZSkge1xuICAgICQoXCIuTG9naW4tdXNlcm5hbWUtdG9nZ2xlLS1qc1wiKS5yZW1vdmVDbGFzcyhcIkxvZ2luLXF1ZXN0aW9uLWljb24tLWpzXCIpLnJlbW92ZUNsYXNzKFwiTG9naW4tY2hlY2staWNvbi0tanNcIikuYWRkQ2xhc3MoXCJMb2dpbi1lcnJvci1pY29uLS1qc1wiKVxuICAgICQodGhpcykuYWRkQ2xhc3MoXCJMb2dpbi1pbnB1dC1lcnJvci0tanNcIilcbiAgICAkKFwiLkxvZ2luLXVzZXJuYW1lLW1lc3NhZ2VcIikuc2hvdygpLmh0bWwodXNlck5hbWVNZXNzYWdlKVxuXG4gIH0gZWxzZSB7XG4gICAgJChcIi5Mb2dpbi11c2VybmFtZS10b2dnbGUtLWpzXCIpLnJlbW92ZUNsYXNzKFwiTG9naW4tcXVlc3Rpb24taWNvbi0tanNcIikucmVtb3ZlQ2xhc3MoXCJMb2dpbi1lcnJvci1pY29uLS1qc1wiKS5hZGRDbGFzcyhcIkxvZ2luLWNoZWNrLWljb24tLWpzXCIpXG4gICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcIkxvZ2luLWlucHV0LWVycm9yLS1qc1wiKVxuICAgICQoXCIuTG9naW4tdXNlcm5hbWUtbWVzc2FnZVwiKS5oaWRlKCkuaHRtbChcIlwiKVxuICB9XG5cbiAgLy8gV0hJQ0ggQk9YIFNIT1VMRCBTSE9XXG4gIGlmKHN0YXRlLmVtYWlsUmVnKSB7XG4gICAgcGFzc3dvcmRCb3goXCJyZXNldFwiKVxuICAgICQoXCIuTG9naW4tcmVzZXQtZW1haWwtLWpzXCIpLmh0bWwoJCgnLkxvZ2luLWlucHV0LXVzZXJuYW1lLS1qcycpLnZhbCgpKSAvLyBTRVQgVEhFIEVNQUlMIElOIFRIRSBNRVNTQUdFIFRPIFdIQVRFVkVSIElUIElTIElOIFRIRSBJTlBVVCBJRiBJVCBJUyBWQUxJRFxuICB9IGVsc2Uge1xuICAgIHBhc3N3b3JkQm94KFwiZGVmYXVsdFwiKVxuICB9XG59KVxuXG4kKFwiLkxvZ2luLXJlc2V0LXBhc3N3b3JkLWJ0bi0tanNcIikuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBwYXNzd29yZEJveChcInNlbnRcIilcbn0pXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gUEFTU1dPUkQgSEVMUCBCT1hcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZnVuY3Rpb24gcGFzc3dvcmRCb3goYm94KSB7XG4gIGlmKGJveCA9PSBcInJlc2V0XCIpIHtcbiAgICAkKFwiLkxvZ2luLXBhc3N3b3JkLXJlc2V0LWJveC0tanNcIikuc2hvdygpO1xuICAgICQoXCIuTG9naW4tcGFzc3dvcmQtc2VudC1ib3gtLWpzLCAuTG9naW4tcGFzc3dvcmQtZGVmYXVsdC1ib3gtLWpzXCIpLmhpZGUoKTtcbiAgfSBlbHNlIGlmKGJveCA9PSBcInNlbnRcIikge1xuICAgICQoXCIuTG9naW4tcGFzc3dvcmQtcmVzZXQtYm94LS1qcywgLkxvZ2luLXBhc3N3b3JkLWRlZmF1bHQtYm94LS1qc1wiKS5oaWRlKCk7XG4gICAgJChcIi5Mb2dpbi1wYXNzd29yZC1zZW50LWJveC0tanNcIikuc2hvdygpO1xuICB9IGVsc2UgaWYoYm94ID09IFwiZGVmYXVsdFwiKSB7XG4gICAgJChcIi5Mb2dpbi1wYXNzd29yZC1zZW50LWJveC0tanMsIC5Mb2dpbi1wYXNzd29yZC1yZXNldC1ib3gtLWpzXCIpLmhpZGUoKTtcbiAgICAkKFwiLkxvZ2luLXBhc3N3b3JkLWRlZmF1bHQtYm94LS1qc1wiKS5zaG93KCk7XG4gIH1cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBQQVNTV09SRCBJTlBVVCBGSUVMRFxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiQoXCIuTG9naW4taW5wdXQtcGFzc3dvcmQtLWpzXCIpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuICBpZigkKHRoaXMpLnZhbCgpID09IFwia29tYmlcIikge1xuICAgIHN0YXRlLnBhc3NXb3JkID0gdHJ1ZVxuICB9IGVsc2Uge1xuICAgIHN0YXRlLnBhc3NXb3JkID0gZmFsc2VcbiAgfVxuICAgIGlmKHN0YXRlLnBhc3NXb3JkICE9IHRydWUpIHtcbiAgICAgICQoXCIuTG9naW4tcGFzc3dvcmQtbWVzc2FnZVwiKS5oaWRlKCk7XG4gICAgfVxuICAgIGlmKCQodGhpcykuaGFzQ2xhc3MoXCJMb2dpbi1pbnB1dC1lcnJvci0tanNcIikpIHtcbiAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJMb2dpbi1pbnB1dC1lcnJvci0tanNcIilcbiAgICAgICQoXCIuTG9naW4tcGFzc3dvcmQtdG9nZ2xlLS1qc1wiKS5yZW1vdmVDbGFzcyhcIkxvZ2luLWVycm9yLWljb24tLWpzXCIpLmFkZENsYXNzKFwiTG9naW4tcXVlc3Rpb24taWNvbi0tanNcIilcbiAgICB9XG4gfSk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIENIRUNLIElGIExPR0lOIFBBU1NFRCAoSlVTVCBGT1IgUFJPVE9UWVBFIFRFU1RJTkcpXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiQoXCIuTG9naW4tZm9ybS1zdWJtaXQtYnRuLS1qc1wiKS5jbGljayhmdW5jdGlvbihlKSB7XG4gIGUucHJldmVudERlZmF1bHQoZSlcbiAgaWYodmFsaWRVc2VyICYmIHN0YXRlLnBhc3NXb3JkKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoXCJhY2NvdW50Lmh0bWxcIik7XG4gIH1cbiAgZWxzZSBpZih2YWxpZFVzZXIgPT0gdHJ1ZSAmJiBzdGF0ZS5wYXNzV29yZCAhPSB0cnVlKSB7XG4gICAgJChcIi5Mb2dpbi1wYXNzd29yZC10b2dnbGUtLWpzXCIpLnJlbW92ZUNsYXNzKFwiTG9naW4tcXVlc3Rpb24taWNvbi0tanNcIikuYWRkQ2xhc3MoXCJMb2dpbi1lcnJvci1pY29uLS1qc1wiKVxuICAgICQoXCIuTG9naW4taGVhZGVyLS1qc1wiKS5hZGRDbGFzcyhcIkxvZ2luLWhlYWRlci0tZXJyb3JcIikuaHRtbChcIklubG9nZ25pbmdlbiBtaXNzbHlja2FkZXNcIilcbiAgICAkKFwiLkxvZ2luLWlucHV0LXBhc3N3b3JkLS1qc1wiKS5hZGRDbGFzcyhcIkxvZ2luLWlucHV0LWVycm9yLS1qc1wiKVxuICAgICQoXCIuTG9naW4tcGFzc3dvcmQtbWVzc2FnZVwiKS5zaG93KCkuaHRtbChwYXNzd29yZE1lc3NhZ2UpXG4gIH1cbiAgZWxzZSB7XG4gICAgJChcIi5Mb2dpbi1oZWFkZXItLWpzXCIpLmFkZENsYXNzKFwiTG9naW4taGVhZGVyLS1lcnJvclwiKS5odG1sKFwiSW5sb2dnbmluZ2VuIG1pc3NseWNrYWRlc1wiKVxuICAgICQoXCIuTG9naW4taW5wdXQtcGFzc3dvcmQtLWpzXCIpLmFkZENsYXNzKFwiTG9naW4taW5wdXQtZXJyb3ItLWpzXCIpXG4gICAgJChcIi5Mb2dpbi11c2VybmFtZS10b2dnbGUtLWpzXCIpLnJlbW92ZUNsYXNzKFwiTG9naW4tcXVlc3Rpb24taWNvbi0tanNcIikucmVtb3ZlQ2xhc3MoXCJMb2dpbi1jaGVjay1pY29uLS1qc1wiKS5hZGRDbGFzcyhcIkxvZ2luLWVycm9yLWljb24tLWpzXCIpXG4gICAgJChcIi5Mb2dpbi1wYXNzd29yZC10b2dnbGUtLWpzXCIpLnJlbW92ZUNsYXNzKFwiTG9naW4tcXVlc3Rpb24taWNvbi0tanNcIikuYWRkQ2xhc3MoXCJMb2dpbi1lcnJvci1pY29uLS1qc1wiKVxuICAgICQoXCIuTG9naW4tdXNlcm5hbWUtbWVzc2FnZVwiKS5zaG93KCkuaHRtbCh1c2VyTmFtZU1lc3NhZ2UpXG4gICAgJChcIi5Mb2dpbi1wYXNzd29yZC1tZXNzYWdlXCIpLnNob3coKS5odG1sKHBhc3N3b3JkTWVzc2FnZSlcbiAgfVxufSk7XG4iLCIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFRPR0dMRSBNRU5VIE9QRU5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG52YXIgbWVudVRleHQgPSAkKFwiLk1lbnUtcm93LXRpdGxlLXRpdGxlXCIpO1xuXG4kKFwiLk1lbnUtcm93LW1lbnUtLWpzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICB0b2dnbGVNZW51KCk7XG59KVxuXG4kKFwiLk1lbnUtbGV2ZWwtb25lLWhlYWRlci0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQodGhpcykubmV4dCgpLnNsaWRlVG9nZ2xlKCk7XG4gICQodGhpcykudG9nZ2xlQ2xhc3MoXCJjaGlsZHJlbi1vcGVuXCIpO1xufSlcblxuJChcIi5NZW51LW92ZXJsYXktLWpzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICB0b2dnbGVNZW51KClcbn0pXG5cblxuXG5mdW5jdGlvbiB0b2dnbGVNZW51KCkge1xuICAkKFwiLk1lbnUtY29udGFpbmVyXCIpLnRvZ2dsZUNsYXNzKFwiTWVudS0tb3BlblwiKVxuICAkKFwiLlNpdGUtY29udGFpbmVyXCIpLnRvZ2dsZUNsYXNzKFwibG9ja2VkXCIpXG4gICQoXCIuTWVudS1yb3ctbWVudS0tanNcIikudG9nZ2xlQ2xhc3MoXCJCdXJnZXItLW9wZW5cIik7XG5cbiAgaWYobWVudVRleHQudGV4dCgpID09IFwibWVueVwiKSB7XG4gICAgICBtZW51VGV4dC50ZXh0KFwic3TDpG5nIG1lbnlcIilcbiAgfSBlbHNlIHtcbiAgICBtZW51VGV4dC50ZXh0KFwibWVueVwiKVxuICB9XG59XG4iLCJcbiQoXCIuQ29ycmVjdC1sb3R0ZXJ5LWJ0bi0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuTG9naW4taGVhZGVyLS1qc1wiKS5odG1sKFwiTG9nZ2EgaW4gZsO2ciBhdHQgcsOkdHRhIGRpbiBsb3R0XCIpXG4gICQoXCIuTG9naW4tb3ZlcmxheS1jb250YWluZXJcIikuZmFkZUluKFwiZmFzdFwiKTtcbiAgaWYoJChcIi5NZW51LWNvbnRhaW5lclwiKS5oYXNDbGFzcyhcIk1lbnUtLW9wZW5cIikpIHtcbiAgICAgIHRvZ2dsZU1lbnUoKTtcbiAgfVxufSlcblxuJChcIi5NZW51LXJvdy1wcm9maWxlLS1qcywgLk9wZW4tbG9naW4tLWpzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKFwiLkxvZ2luLWhlYWRlci0tanNcIikuaHRtbChcIkxvZ2dhIGluIHDDpSBNaW4gU2lkYVwiKVxuICAgICQoXCIuTG9naW4tb3ZlcmxheS1jb250YWluZXJcIikuZmFkZUluKFwiZmFzdFwiKTtcbiAgICBpZigkKFwiLk1lbnUtY29udGFpbmVyXCIpLmhhc0NsYXNzKFwiTWVudS0tb3BlblwiKSkge1xuICAgICAgICB0b2dnbGVNZW51KCk7XG4gICAgfVxufSlcbiJdfQ==
