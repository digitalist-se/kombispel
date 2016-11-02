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


// Title text for the different state.
$.DefaultTitle = 'Logga in på min sida';
$.ErrorTitle = 'Inloggningen misslyckades!';

// Value for help text state.
$.DefaultHelp = '<div class="Login-help-box-top-text--js">' +
    '<p>Du hittar information om ditt lösenord i ditt bekräftelsemail från oss.</p>' +
    '</div>';

$.ForgotHelp = '<div class="Login-help-box-top-text--js">' +
    '<h2>Glömt ditt lösenord?</h2>' +
    '<p>Klicka på återställ så skickar vi ett nytt lösernord till:</p>';

$(".Login-toggle--js").click(function() {
  $(this).next().slideToggle();
});


$(".Login-clickarea--js, .Login-close-form--js").click(function() {
  $(".Login-overlay-container").fadeOut("fast");
});

// Set the input state for error.
jQuery.fn.extend({
  setLoginError: function () {
    $('.Login-header').text($.ErrorTitle );
    $(this).addClass('Login-input-error--js');
    $(this).removeClass('Login-input-help--js');

    $(this).parent().find('.Login-toggle--js').addClass('Login-toggle-error--js');
    $(this).parent().find('.Login-toggle--js').removeClass('Login-toggle-help--js');
    $(this).parent().find('.Login-toggle--js').removeClass('Login-toggle-valid--js');
  }
});

// Set the input state for valid.
jQuery.fn.extend({
  setLoginValid: function () {
    $(this).removeClass('Login-input-error--js');

    $(this).parent().find('.Login-toggle--js').addClass('Login-toggle-valid--js');
    $(this).parent().find('.Login-toggle--js').removeClass('Login-toggle-help--js');
    $(this).parent().find('.Login-toggle--js').removeClass('Login-toggle-error--js');
  }
});

// Set the input state for help (default).
jQuery.fn.extend({
  setLoginHelp: function () {
    $(this).removeClass('Login-input-error--js');
    $(this).addClass('Login-input-help--js');

    $(this).parent().find('.Login-toggle--js').addClass('Login-toggle-help--js');
    $(this).parent().find('.Login-toggle--js').removeClass('Login-toggle-valid--js');
    $(this).parent().find('.Login-toggle--js').removeClass('Login-toggle-error--js');
  }
});

// Set the help text for forgotten password.
jQuery.fn.extend({
  setLoginForgotText: function(email) {
    $(this).html($.ForgotHelp +
        '<span class="Login-user-email">' + email + '</span>' +
        '<div class="Login-forgot-button-wrapper"><button class="Login-forgot-button">återställ</button></div>' +
        '</div>'
    );
  }
});

// Pre-Validation function for the form.
$(function() {
  $('form[name="Login-form"]').submit(function(e) {
    var username = $('input[name="username"]').val();
    var password = $('input[name="password"]').val();
    // Empty username.
    if ( username == '') {
      e.preventDefault();
      $('input[name="username"]').setLoginError();
      $('.Error-username--js').text('*Please enter a username*');
    }
    // Empty password.
    if ( password == '') {
      e.preventDefault();
      $('input[name="password"]').setLoginError();
      $('.Error-password--js').text('*Please enter a password*');
    }
  });
});

// Pre-check input value on the fly.
$('input[name="username"]').on('input', function(e)  {
  // REGEX mail.
  var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  // REGEX user number.
  var userNumberReg = new RegExp('^[a-zA-Z][a-zA-Z][0-9]{6}');

  // If any of the regex is true set input state to valid.
  var valid = emailReg.test($(this).val()) | userNumberReg.test($(this).val());
  if (valid) {
    $(this).setLoginValid();
  }
  // If not reset it to help text display.
  else {
    $(this).setLoginHelp();
  }

  // If its a valid email we change the help text.
  if (emailReg.test($(this).val())) {
    $('.Login-help-box-top-text--js').setLoginForgotText($(this).val());
  }
  // Reset the help text.
  else {
    $('.Login-help-box-top-text--js').html($.DefaultHelp);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvdHRlcnkuanMiLCJMb2dpbi5qcyIsIk1lbnUuanMiLCJNZW51LXJvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAvLy8vLy8vLyBTVEFSVCBqUXVlcnlcbiAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuLy8gVGhlIGN1c3RvbWVycyBsb3R0ZXJ5dGlja2V0XG5cbnZhciB1c2VyTnVtYmVycyA9IFs5LDUsMiw1LDNdXG4vLyBBbGwgdGhlIGNvcnJlY3QgbnVtYmVyc1xuXG52YXIgd2lubmluZ051bWJlcnMgPSB7XG5maXJzdDogW1xuICBbNiw1LDQsNSw3XVxuXSxcbnNlY29uZDogW1xuICBbNCw1LDIsOCw0XSxcbiAgWzYsNSw0LDUsN10sXG4gIFs5LDMsOCw4LDZdLFxuICBbMSw1LDMsMyw0XVxuXSxcbnRoaXJkOiBbXG4gIFszLDQsNSwzLDRdLFxuICBbMSwzLDQsOSwyXSxcbiAgWzMsMyw2LDcsOF0sXG4gIFswLDUsMiw4LDRdLFxuICBbNiw1LDQsNSw3XSxcbiAgWzMsMyw2LDgsNl0sXG4gIFszLDMsOCw3LDRdXG5dXG59XG5cbnZhciBjb3JyZWN0TnVtYmVycyA9IFtcbiAgWzMsNCw1LDMsNF0sIC8vIDEgcsOkdHRcbiAgWzEsMyw0LDksMl0sIC8vIDEgcsOkdHRcbiAgWzMsMyw2LDcsOF0sIC8vIEFsbGEgcsOkdHRcbiAgWzAsNSwyLDgsNF0sIC8vIEFsbGEgRmVsXG4gIFsxLDEsNiw1LDNdLCAvLyBBbGxhIEZlbFxuICBbMywzLDYsOCw2XSwgLy8gMCwgMSwgMiByw6R0dFxuICBbMywzLDgsNyw0XSAgLy8gMCwgMSwgMyByw6R0dFxuXVxuLy8gQ2hlY2sgaG93IGNvcnJlY3QgZWFjaCBhcnJheSBpcyBpbiBudW1iZXIuIEVnXG4vLyBJZiBhbiBhcnJheSBtYXRjaGVzIGJ5IHR3byBkaWdpdHMgdGhlIHZhbHVlIHdpbGwgYmUgdHdvXG52YXIgY29ycmVjdEFtb3VudCA9IFtdO1xudmFyIHdpbm5pbmcgPSBmYWxzZTtcblxudmFyIGNvcnJlY3RBbW91bnQyID0ge1xuICBmaXJzdDogW10sXG4gIHNlY29uZDogW10sXG4gIHRoaXJkOiBbXVxufTtcblxuZm9yICh2YXIga2V5IGluIHdpbm5pbmdOdW1iZXJzKSB7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB3aW5uaW5nTnVtYmVyc1trZXldLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGNvcnJlY3QgPSAwO1xuICAgIC8vIGNvbnNvbGUubG9nKHdpbm5pbmdOdW1iZXJzW2tleV1baV0pO1xuICAgIGZvciAodmFyICBqPSAwOyBqIDwgd2lubmluZ051bWJlcnNba2V5XVtpXS5sZW5ndGg7IGorKykge1xuICAgICAgLy8gY29uc29sZS5sb2cod2lubmluZ051bWJlcnNba2V5XVtpXVtqXSk7XG4gICAgICBpZih3aW5uaW5nTnVtYmVyc1trZXldW2ldW2pdID09PSB1c2VyTnVtYmVyc1tqXSlcbiAgICAgIHtcbiAgICAgICAgICBjb3JyZWN0Kys7XG4gICAgICB9XG4gICAgfVxuICAgIGNvcnJlY3RBbW91bnQyW2tleV0ucHVzaChjb3JyZWN0KTtcbiAgfVxufVxuXG5jb25zb2xlLmxvZyhjb3JyZWN0QW1vdW50Mik7XG5cblxuXG5cbi8vIEZ1bmN0aW9uIHRvIHB1c2ggdGhlIHZhbHVlIHRvIHRoZSBhcnJheVxuY2hlY2tBcnJheSA9ICh4KSA9PiB7XG4gIGxldCBjb3JyZWN0ID0gMDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3JyZWN0TnVtYmVyc1t4XS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYoY29ycmVjdE51bWJlcnNbeF1baV0gPT09IHVzZXJOdW1iZXJzW2ldKSB7XG4gICAgICBjb3JyZWN0Kys7XG4gICAgICB9XG4gICAgfVxuICAgIGNvcnJlY3RBbW91bnQucHVzaChjb3JyZWN0KTtcbn1cblxuXG5cbi8vIENhbGwgdGhlIGZ1bmN0aW9uXG5mb3IgKHZhciBpID0gMDsgaSA8IGNvcnJlY3ROdW1iZXJzLmxlbmd0aDsgaSsrKSB7XG5jaGVja0FycmF5KGkpO1xufVxuLy8gY29uc29sZS5sb2coY29ycmVjdEFtb3VudCk7XG4vLyBjb25zb2xlLmxvZyhjb3JyZWN0QW1vdW50KTtcblxuXG4vLyBDaGVjayB3aGljaCBudW1iZXIgaXMgdGhlIGhpZ2hlc3QgaW4gdGhlIGFycmF5XG5nZXRNYXhPZkFycmF5ID0gKG51bUFycmF5KSA9PiAgTWF0aC5tYXguYXBwbHkobnVsbCwgbnVtQXJyYXkpO1xuXG4vLyBHZXQgdGhlIG51bWJlclxudmFyIGhpZ2hlc3ROdW1iZXIgPSBnZXRNYXhPZkFycmF5KGNvcnJlY3RBbW91bnQpO1xuaWYoaGlnaGVzdE51bWJlciA9PT0gdXNlck51bWJlcnMubGVuZ3RoKSB7XG4gIHdpbm5pbmcgPSB0cnVlO1xufVxuLy8gVGhlIGFycmF5IHRoYXQgd2UgYXJlIGdvbm5hIHVzZSBpbiB0aGUgYW5pbWF0aW9uIGFuZCBjb21wYXJlIHdpdGhcbnZhciBkcmF3QXJyYXkgPSBjb3JyZWN0TnVtYmVyc1tjb3JyZWN0QW1vdW50LmluZGV4T2YoaGlnaGVzdE51bWJlcildO1xuXG5cbi8vIGNvbnNvbGUubG9nKGRyYXdBcnJheSk7XG5cbi8vIGNvbnNvbGUubG9nKGRyYXdBcnJheStcIiDDpHIgZGVuIG7DpHJtYXN0ZSBvY2ggZGVuIHZpIGtvbW1lciB1dGfDpSBmcsOlblwiKTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyAqXG4vLyBMT1RURVJZIEFOSU1BVElPTlxuLy8gKlxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgbG90dGVyeU51bWJlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdMb3R0ZXJ5LW51bWJlcicpO1xuXG52YXIgc3Bpbm5JbnRlcnZhbCA9IDIwMDsgLy8gSW50ZXJ2YWwgZm9yIHNwaW5uIHN0YXJ0IGZvciBlYWNoIG51bWJlclxuXG5mb3IgKHZhciBpID0gMDsgaSA8IHVzZXJOdW1iZXJzLmxlbmd0aDsgaSsrKSB7XG4gIGZvciAodmFyIGogPSAwOyBqIDwgMTA7IGorKykge1xuICB2YXIgbnVtYmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgaWYoaiA9PSB1c2VyTnVtYmVyc1tpXSkge1xuICBudW1iZXIuaW5uZXJIVE1MID0gajtcbiAgLy8gbnVtYmVyLmNsYXNzTmFtZSA9IFwiXCI7XG4gIH0gZWxzZSB7XG4gIC8vIG51bWJlci5jbGFzc05hbWUgPSBcIlwiO1xuICBudW1iZXIuaW5uZXJIVE1MID0gajtcbiAgfVxuICBsb3R0ZXJ5TnVtYmVyc1tpXS5hcHBlbmRDaGlsZChudW1iZXIpXG4gIH1cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBTVEFSVCBST0xMSU5HIFRIRSBOVU1CRVJTXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnZhciBjb3VudGVyID0gMDtcblxudmFyIHN0YXJ0SW50ZXJ2YWwgPSB0cnVlOyAvLyBTZXQgdG8gdHJ1ZSBpZiB0aGUgc3Bpbm5lciBzaG91bGQgc3RhcnQgYXQgdGhlIHNhbWUgdGltZVxuXG5mdW5jdGlvbiByb2xsTnVtYmVycygpIHtcblxuaWYoc3RhcnRJbnRlcnZhbCkge1xuXG4gICAgaWYoY291bnRlcjxsb3R0ZXJ5TnVtYmVycy5sZW5ndGgpXG4gICAgICB7XG4gICAgICAgIGxvdHRlcnlOdW1iZXJzW2NvdW50ZXJdLmNsYXNzTmFtZSA9IFwiTG90dGVyeS1udW1iZXIgTG90dGVyeS1udW1iZXItLXNwaW5uaW5nXCI7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgcm9sbE51bWJlcnMoKVxuICAgICAgICB9LCBzcGlubkludGVydmFsXG4gICAgICApO1xuICAgICAgICAgY291bnRlcisrO1xuICAgICAgfVxufSBlbHNlIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsb3R0ZXJ5TnVtYmVycy5sZW5ndGg7IGkrKykge1xuICAgIGxvdHRlcnlOdW1iZXJzW2ldLmNsYXNzTmFtZSA9IFwiTG90dGVyeS1udW1iZXIgTG90dGVyeS1udW1iZXItLXNwaW5uaW5nXCI7XG4gIH1cbn1cbn1cblxuXG52YXIgeSA9IDA7XG52YXIgc3Bpbm5UaW1lID0gMjUwMDsgLy8gSE9XIExPTkcgRE9FUyBUSEUgQU5JTUFUSU9OLCBTWU5DIFdJVEggQ1NTIEZJTEVcbnZhciByYXRpbyA9IHNwaW5uVGltZSAqICggdXNlck51bWJlcnNbMF0gLyAxMCk7XG5cbmZ1bmN0aW9uIGNvcnJlY3QoKSB7XG5cbiAgdmFyIHN0b3AgPSA0MDAwOyAvLyBJTklUSUFMIFZBTFVFIChLaW5kYSBwb2ludGxlc3MpXG4gIHZhciBkaWZmID0gMDtcblxuICBpZih5IDwgdXNlck51bWJlcnMubGVuZ3RoKVxuICAgIHtcbiAgICAgIGlmKHVzZXJOdW1iZXJzW3krMV0gPiB1c2VyTnVtYmVyc1t5XSkge1xuICAgICAgICBkaWZmID0gdXNlck51bWJlcnNbeSsxXSAtIHVzZXJOdW1iZXJzW3ldO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGRpZmYgPSAxMCAtICh1c2VyTnVtYmVyc1t5XSAtIHVzZXJOdW1iZXJzW3krMV0pO1xuICAgICAgfVxuXG4gICAgICBzdGFydEludGVydmFsID8gc3RvcCA9IHNwaW5uSW50ZXJ2YWwgKyAoKCBkaWZmICogc3Bpbm5UaW1lICkvMTApIDogc3RvcCA9ICAoKCBkaWZmICogc3Bpbm5UaW1lICkvMTApO1xuXG4gICAgICBsb3R0ZXJ5TnVtYmVyc1t5XS5jbGFzc05hbWUgPSBcIkxvdHRlcnktbnVtYmVyXCI7XG5cbiAgICAgIGlmKHVzZXJOdW1iZXJzW3ldID09PSBkcmF3QXJyYXlbeV0pIHtcbiAgICAgICAgbG90dGVyeU51bWJlcnNbeV0uaW5uZXJIVE1MID0gXCI8ZGl2IGNsYXNzPSdMb3R0ZXJ5LWNvcnJlY3QnPlwiK3VzZXJOdW1iZXJzW3ldK1wiPC9kaXY+XCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb3R0ZXJ5TnVtYmVyc1t5XS5pbm5lckhUTUwgPSBcIjxkaXYgY2xhc3M9J0xvdHRlcnktd3JvbmcnPlwiK3VzZXJOdW1iZXJzW3ldK1wiPC9kaXY+XCI7XG4gICAgICB9XG5cbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKVxuICAgICAge1xuICAgICAgICBjb3JyZWN0KClcbiAgICAgIH0sXG4gICAgICBzdG9wXG4gICAgKTtcbiAgICAgICB5Kys7XG4gICAgfVxufVxuXG5cbnZhciBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJTdGFydC1sb3R0ZXJ5LS1qc1wiKVswXTtcblxuc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24oKSB7XG4gIHJvbGxOdW1iZXJzKCk7XG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgY29ycmVjdCgpOyB9LCBzcGlublRpbWUrcmF0aW8pO1xufSlcblxuXG5cblxuXG5cblxuXG5cbn0pO1xuIiwiXG4vLyBUaXRsZSB0ZXh0IGZvciB0aGUgZGlmZmVyZW50IHN0YXRlLlxuJC5EZWZhdWx0VGl0bGUgPSAnTG9nZ2EgaW4gcMOlIG1pbiBzaWRhJztcbiQuRXJyb3JUaXRsZSA9ICdJbmxvZ2duaW5nZW4gbWlzc2x5Y2thZGVzISc7XG5cbi8vIFZhbHVlIGZvciBoZWxwIHRleHQgc3RhdGUuXG4kLkRlZmF1bHRIZWxwID0gJzxkaXYgY2xhc3M9XCJMb2dpbi1oZWxwLWJveC10b3AtdGV4dC0tanNcIj4nICtcbiAgICAnPHA+RHUgaGl0dGFyIGluZm9ybWF0aW9uIG9tIGRpdHQgbMO2c2Vub3JkIGkgZGl0dCBiZWtyw6RmdGVsc2VtYWlsIGZyw6VuIG9zcy48L3A+JyArXG4gICAgJzwvZGl2Pic7XG5cbiQuRm9yZ290SGVscCA9ICc8ZGl2IGNsYXNzPVwiTG9naW4taGVscC1ib3gtdG9wLXRleHQtLWpzXCI+JyArXG4gICAgJzxoMj5HbMO2bXQgZGl0dCBsw7ZzZW5vcmQ/PC9oMj4nICtcbiAgICAnPHA+S2xpY2thIHDDpSDDpXRlcnN0w6RsbCBzw6Ugc2tpY2thciB2aSBldHQgbnl0dCBsw7ZzZXJub3JkIHRpbGw6PC9wPic7XG5cbiQoXCIuTG9naW4tdG9nZ2xlLS1qc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJCh0aGlzKS5uZXh0KCkuc2xpZGVUb2dnbGUoKTtcbn0pO1xuXG5cbiQoXCIuTG9naW4tY2xpY2thcmVhLS1qcywgLkxvZ2luLWNsb3NlLWZvcm0tLWpzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKFwiLkxvZ2luLW92ZXJsYXktY29udGFpbmVyXCIpLmZhZGVPdXQoXCJmYXN0XCIpO1xufSk7XG5cbi8vIFNldCB0aGUgaW5wdXQgc3RhdGUgZm9yIGVycm9yLlxualF1ZXJ5LmZuLmV4dGVuZCh7XG4gIHNldExvZ2luRXJyb3I6IGZ1bmN0aW9uICgpIHtcbiAgICAkKCcuTG9naW4taGVhZGVyJykudGV4dCgkLkVycm9yVGl0bGUgKTtcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdMb2dpbi1pbnB1dC1lcnJvci0tanMnKTtcbiAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdMb2dpbi1pbnB1dC1oZWxwLS1qcycpO1xuXG4gICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcuTG9naW4tdG9nZ2xlLS1qcycpLmFkZENsYXNzKCdMb2dpbi10b2dnbGUtZXJyb3ItLWpzJyk7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcuTG9naW4tdG9nZ2xlLS1qcycpLnJlbW92ZUNsYXNzKCdMb2dpbi10b2dnbGUtaGVscC0tanMnKTtcbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy5Mb2dpbi10b2dnbGUtLWpzJykucmVtb3ZlQ2xhc3MoJ0xvZ2luLXRvZ2dsZS12YWxpZC0tanMnKTtcbiAgfVxufSk7XG5cbi8vIFNldCB0aGUgaW5wdXQgc3RhdGUgZm9yIHZhbGlkLlxualF1ZXJ5LmZuLmV4dGVuZCh7XG4gIHNldExvZ2luVmFsaWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdMb2dpbi1pbnB1dC1lcnJvci0tanMnKTtcblxuICAgICQodGhpcykucGFyZW50KCkuZmluZCgnLkxvZ2luLXRvZ2dsZS0tanMnKS5hZGRDbGFzcygnTG9naW4tdG9nZ2xlLXZhbGlkLS1qcycpO1xuICAgICQodGhpcykucGFyZW50KCkuZmluZCgnLkxvZ2luLXRvZ2dsZS0tanMnKS5yZW1vdmVDbGFzcygnTG9naW4tdG9nZ2xlLWhlbHAtLWpzJyk7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcuTG9naW4tdG9nZ2xlLS1qcycpLnJlbW92ZUNsYXNzKCdMb2dpbi10b2dnbGUtZXJyb3ItLWpzJyk7XG4gIH1cbn0pO1xuXG4vLyBTZXQgdGhlIGlucHV0IHN0YXRlIGZvciBoZWxwIChkZWZhdWx0KS5cbmpRdWVyeS5mbi5leHRlbmQoe1xuICBzZXRMb2dpbkhlbHA6IGZ1bmN0aW9uICgpIHtcbiAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdMb2dpbi1pbnB1dC1lcnJvci0tanMnKTtcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdMb2dpbi1pbnB1dC1oZWxwLS1qcycpO1xuXG4gICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcuTG9naW4tdG9nZ2xlLS1qcycpLmFkZENsYXNzKCdMb2dpbi10b2dnbGUtaGVscC0tanMnKTtcbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy5Mb2dpbi10b2dnbGUtLWpzJykucmVtb3ZlQ2xhc3MoJ0xvZ2luLXRvZ2dsZS12YWxpZC0tanMnKTtcbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy5Mb2dpbi10b2dnbGUtLWpzJykucmVtb3ZlQ2xhc3MoJ0xvZ2luLXRvZ2dsZS1lcnJvci0tanMnKTtcbiAgfVxufSk7XG5cbi8vIFNldCB0aGUgaGVscCB0ZXh0IGZvciBmb3Jnb3R0ZW4gcGFzc3dvcmQuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcbiAgc2V0TG9naW5Gb3Jnb3RUZXh0OiBmdW5jdGlvbihlbWFpbCkge1xuICAgICQodGhpcykuaHRtbCgkLkZvcmdvdEhlbHAgK1xuICAgICAgICAnPHNwYW4gY2xhc3M9XCJMb2dpbi11c2VyLWVtYWlsXCI+JyArIGVtYWlsICsgJzwvc3Bhbj4nICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJMb2dpbi1mb3Jnb3QtYnV0dG9uLXdyYXBwZXJcIj48YnV0dG9uIGNsYXNzPVwiTG9naW4tZm9yZ290LWJ1dHRvblwiPsOldGVyc3TDpGxsPC9idXR0b24+PC9kaXY+JyArXG4gICAgICAgICc8L2Rpdj4nXG4gICAgKTtcbiAgfVxufSk7XG5cbi8vIFByZS1WYWxpZGF0aW9uIGZ1bmN0aW9uIGZvciB0aGUgZm9ybS5cbiQoZnVuY3Rpb24oKSB7XG4gICQoJ2Zvcm1bbmFtZT1cIkxvZ2luLWZvcm1cIl0nKS5zdWJtaXQoZnVuY3Rpb24oZSkge1xuICAgIHZhciB1c2VybmFtZSA9ICQoJ2lucHV0W25hbWU9XCJ1c2VybmFtZVwiXScpLnZhbCgpO1xuICAgIHZhciBwYXNzd29yZCA9ICQoJ2lucHV0W25hbWU9XCJwYXNzd29yZFwiXScpLnZhbCgpO1xuICAgIC8vIEVtcHR5IHVzZXJuYW1lLlxuICAgIGlmICggdXNlcm5hbWUgPT0gJycpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICQoJ2lucHV0W25hbWU9XCJ1c2VybmFtZVwiXScpLnNldExvZ2luRXJyb3IoKTtcbiAgICAgICQoJy5FcnJvci11c2VybmFtZS0tanMnKS50ZXh0KCcqUGxlYXNlIGVudGVyIGEgdXNlcm5hbWUqJyk7XG4gICAgfVxuICAgIC8vIEVtcHR5IHBhc3N3b3JkLlxuICAgIGlmICggcGFzc3dvcmQgPT0gJycpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICQoJ2lucHV0W25hbWU9XCJwYXNzd29yZFwiXScpLnNldExvZ2luRXJyb3IoKTtcbiAgICAgICQoJy5FcnJvci1wYXNzd29yZC0tanMnKS50ZXh0KCcqUGxlYXNlIGVudGVyIGEgcGFzc3dvcmQqJyk7XG4gICAgfVxuICB9KTtcbn0pO1xuXG4vLyBQcmUtY2hlY2sgaW5wdXQgdmFsdWUgb24gdGhlIGZseS5cbiQoJ2lucHV0W25hbWU9XCJ1c2VybmFtZVwiXScpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKGUpICB7XG4gIC8vIFJFR0VYIG1haWwuXG4gIHZhciBlbWFpbFJlZyA9IG5ldyBSZWdFeHAoL14oKFwiW1xcdy1cXHNdK1wiKXwoW1xcdy1dKyg/OlxcLltcXHctXSspKil8KFwiW1xcdy1cXHNdK1wiKShbXFx3LV0rKD86XFwuW1xcdy1dKykqKSkoQCgoPzpbXFx3LV0rXFwuKSpcXHdbXFx3LV17MCw2Nn0pXFwuKFthLXpdezIsNn0oPzpcXC5bYS16XXsyfSk/KSQpfChAXFxbPygoMjVbMC01XVxcLnwyWzAtNF1bMC05XVxcLnwxWzAtOV17Mn1cXC58WzAtOV17MSwyfVxcLikpKCgyNVswLTVdfDJbMC00XVswLTldfDFbMC05XXsyfXxbMC05XXsxLDJ9KVxcLil7Mn0oMjVbMC01XXwyWzAtNF1bMC05XXwxWzAtOV17Mn18WzAtOV17MSwyfSlcXF0/JCkvaSk7XG4gIC8vIFJFR0VYIHVzZXIgbnVtYmVyLlxuICB2YXIgdXNlck51bWJlclJlZyA9IG5ldyBSZWdFeHAoJ15bYS16QS1aXVthLXpBLVpdWzAtOV17Nn0nKTtcblxuICAvLyBJZiBhbnkgb2YgdGhlIHJlZ2V4IGlzIHRydWUgc2V0IGlucHV0IHN0YXRlIHRvIHZhbGlkLlxuICB2YXIgdmFsaWQgPSBlbWFpbFJlZy50ZXN0KCQodGhpcykudmFsKCkpIHwgdXNlck51bWJlclJlZy50ZXN0KCQodGhpcykudmFsKCkpO1xuICBpZiAodmFsaWQpIHtcbiAgICAkKHRoaXMpLnNldExvZ2luVmFsaWQoKTtcbiAgfVxuICAvLyBJZiBub3QgcmVzZXQgaXQgdG8gaGVscCB0ZXh0IGRpc3BsYXkuXG4gIGVsc2Uge1xuICAgICQodGhpcykuc2V0TG9naW5IZWxwKCk7XG4gIH1cblxuICAvLyBJZiBpdHMgYSB2YWxpZCBlbWFpbCB3ZSBjaGFuZ2UgdGhlIGhlbHAgdGV4dC5cbiAgaWYgKGVtYWlsUmVnLnRlc3QoJCh0aGlzKS52YWwoKSkpIHtcbiAgICAkKCcuTG9naW4taGVscC1ib3gtdG9wLXRleHQtLWpzJykuc2V0TG9naW5Gb3Jnb3RUZXh0KCQodGhpcykudmFsKCkpO1xuICB9XG4gIC8vIFJlc2V0IHRoZSBoZWxwIHRleHQuXG4gIGVsc2Uge1xuICAgICQoJy5Mb2dpbi1oZWxwLWJveC10b3AtdGV4dC0tanMnKS5odG1sKCQuRGVmYXVsdEhlbHApO1xuICB9XG59KTsiLCIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFRPR0dMRSBNRU5VIE9QRU5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG52YXIgbWVudVRleHQgPSAkKFwiLk1lbnUtcm93LXRpdGxlLXRpdGxlXCIpO1xuXG4kKFwiLk1lbnUtcm93LW1lbnUtLWpzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICB0b2dnbGVNZW51KCk7XG59KVxuXG4kKFwiLk1lbnUtbGV2ZWwtb25lLWhlYWRlci0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQodGhpcykubmV4dCgpLnNsaWRlVG9nZ2xlKCk7XG4gICQodGhpcykudG9nZ2xlQ2xhc3MoXCJjaGlsZHJlbi1vcGVuXCIpO1xufSlcblxuXG5mdW5jdGlvbiB0b2dnbGVNZW51KCkge1xuICAkKFwiLk1lbnUtY29udGFpbmVyXCIpLnRvZ2dsZUNsYXNzKFwiTWVudS0tb3BlblwiKVxuICAkKFwiLlNpdGUtY29udGFpbmVyXCIpLnRvZ2dsZUNsYXNzKFwibG9ja2VkXCIpXG4gICQoXCIuTWVudS1yb3ctbWVudS0tanNcIikudG9nZ2xlQ2xhc3MoXCJCdXJnZXItLW9wZW5cIik7XG5cbiAgaWYobWVudVRleHQudGV4dCgpID09IFwibWVueVwiKSB7XG4gICAgICBtZW51VGV4dC50ZXh0KFwic3TDpG5nIG1lbnlcIilcbiAgfSBlbHNlIHtcbiAgICBtZW51VGV4dC50ZXh0KFwibWVueVwiKVxuICB9XG59XG4iLCIkKFwiLk1lbnUtcm93LXByb2ZpbGUtLWpzLCAuQ29ycmVjdC1sb3R0ZXJ5LWJ0bi0tanMsIC5PcGVuLWxvZ2luLS1qc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAkKFwiLkxvZ2luLW92ZXJsYXktY29udGFpbmVyXCIpLmZhZGVJbihcImZhc3RcIik7XG5cbiAgICBpZigkKFwiLk1lbnUtY29udGFpbmVyXCIpLmhhc0NsYXNzKFwiTWVudS0tb3BlblwiKSkge1xuICAgICAgICB0b2dnbGVNZW51KCk7XG4gICAgfVxufSlcbiJdfQ==
