/////////////////////////////////////////////
// Change Password Modal
/////////////////////////////////////////////
$(".js-MyPages-password-btn").click(function() {
  $(".js-Site-container").toggleClass("locked");
  $(".js-MyPages-pswrd-overlay-container").fadeIn("fast");
})
$(".js-MyPages-close-form, .js-MyPages-pswrd-clickarea").click(function() {
  $(".js-Site-container").toggleClass("locked");
  $(".js-MyPages-pswrd-overlay-container").fadeOut("fast");
})
var $newPassword = $(".js-MyPages-new-pswrd");
var $repeatPassword = $(".js-MyPages-repeat-pswrd");
var $newPasswordStatus = $(".js-MyPages-new-pswrd-status");
var $newPasswordMatch = $(".js-MyPages-new-pswrd-match");
var passwordState = {
  length: false,
  password: "",
  repeatPassword: ""
}
// Check if password is sufficient
$newPassword.on('input', function() {
 passwordState.password = $(this).val();
 passwordState.repeatPassword = $repeatPassword.val();
if(passwordState.password.length >= 6) {
  passwordState.length = true;
} else {
  passwordState.length = false;
}
checkPassword()
});
$repeatPassword.on('input', function() {
  passwordState.password = $newPassword.val();
  passwordState.repeatPassword = $(this).val();
checkPassword()
});
function checkPassword() {
  if(passwordState.length) {
    $newPasswordStatus.html("Lösenord är ok")
    $newPasswordStatus.addClass("u-green")
    $newPasswordStatus.removeClass("u-red")
  } else {
    $newPasswordStatus.html("Lösenord för kort")
    $newPasswordStatus.removeClass("u-green")
    $newPasswordStatus.addClass("u-red")
  }
  if(passwordState.password === passwordState.repeatPassword && passwordState.length) {
    $newPasswordMatch.html("Lösenorden överenstämmer")
    $newPasswordMatch.addClass("u-green")
    $newPasswordMatch.removeClass("u-red")
  } else if(passwordState.password === passwordState.repeatPassword && passwordState.length === false) {
    $newPasswordMatch.html("Lösenorden överenstämmer men är för korta")
    $newPasswordMatch.removeClass("u-green")
    $newPasswordMatch.addClass("u-red")
  } else {
    $newPasswordMatch.html("Lösenorden överenstämmer inte")
    $newPasswordMatch.removeClass("u-green")
    $newPasswordMatch.addClass("u-red")
  }
}

/////////////////////////////////////////////
 // CLOSE MODAL
 ////////////////////////////////////////////
$(".js-Login-clickarea, .js-Login-close-form").click(function() {
  $(".js-Login-overlay-container").fadeOut("fast")
  $(".js-Site-container").toggleClass("locked");
})
/////////////////////////////////////////////
 // SLIDETOGGLE THE HELPBOXES
 ////////////////////////////////////////////
$(".js-Login-username-toggle").click(function() {
  $(".js-Login-username-help-box").slideToggle();
});

$(".js-Login-password-toggle, .js-Login-forgot-password").click(function() {
  $(".js-Login-password-help-box").slideToggle();
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
$('.js-Login-input-username').on('input', function() {
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
$('.js-Login-input-username').focusout(function() {
  // console.log("INPUT NOT IN FOCUS ANY MORE");
  if(state.userName == false) {
    $(".js-Login-username-toggle").removeClass("js-Login-question-icon").removeClass("js-Login-check-icon").addClass("js-Login-error-icon")
    $(this).addClass("js-Login-input-error")
    $(".js-Login-username-message").show().html(userNameMessage)

  } else {
    // $(".js-Login-username-toggle").removeClass("js-Login-question-icon").removeClass("js-Login-error-icon").addClass("js-Login-check-icon")
    $(".js-Login-username-toggle").addClass("js-Login-question-icon").removeClass("js-Login-error-icon");
    $(this).removeClass("js-Login-input-error")
    $(".js-Login-username-message").hide().html("")
  }

  // WHICH BOX SHOULD SHOW
  if(state.emailReg) {
    passwordBox("reset")
    $(".js-Login-reset-email").html($('.js-Login-input-username').val()) // SET THE EMAIL IN THE MESSAGE TO WHATEVER IT IS IN THE INPUT IF IT IS VALID
  } else {
    passwordBox("default")
  }
})

$(".js-Login-reset-password-btn").click(function(e) {
   e.preventDefault();
  passwordBox("sent")
})

/////////////////////////////////////////////
// PASSWORD HELP BOX
/////////////////////////////////////////////
function passwordBox(box) {
  if(box == "reset") {
    $(".js-Login-password-reset-box").show();
    $(".js-Login-password-sent-box, .js-Login-password-default-box").hide();
  } else if(box == "sent") {
    $(".js-Login-password-reset-box, .js-Login-password-default-box").hide();
    $(".js-Login-password-sent-box").show();
  } else if(box == "default") {
    $(".js-Login-password-sent-box, .js-Login-password-reset-box").hide();
    $(".js-Login-password-default-box").show();
  }
}

/////////////////////////////////////////////
// PASSWORD INPUT FIELD
/////////////////////////////////////////////

$(".js-Login-input-password").on('input', function() {

  var passWord = $(this).val();

  if(passWord == "kombi" || passWord== "lotter" || passWord == "spel") {
    state.passWord = true
  } else {
    state.passWord = false
  }
    if(state.passWord != true) {
      $(".js-Login-password-message").hide();
    }
    if($(this).hasClass("js-Login-input-error")) {
      $(this).removeClass("js-Login-input-error")
      $(".js-Login-password-toggle").removeClass("js-Login-error-icon").addClass("js-Login-question-icon")
    }
 });

///////////////////////////////////////////////////////
// CHECK IF LOGIN PASSED (JUST FOR PROTOTYPE TESTING)
//////////////////////////////////////////////////////
$(".js-Login-form-submit-btn").click(function(e) {
  e.preventDefault(e)
  if(validUser && state.passWord) {
    window.location.replace("tickets.html");
  }
  else if(validUser == true && state.passWord != true) {
    $(".js-Login-password-toggle").removeClass("js-Login-question-icon").addClass("js-Login-error-icon")
    $(".js-Login-header").addClass("Login-header--error").html("Inloggningen misslyckades")
    $(".js-Login-input-password").addClass("js-Login-input-error")
    $(".js-Login-password-message").show().html(passwordMessage)
  }
  else {
    $(".js-Login-header").addClass("Login-header--error").html("Inloggningen misslyckades")
    $(".js-Login-input-password").addClass("js-Login-input-error")
    $(".js-Login-username-toggle").removeClass("js-Login-question-icon").removeClass("js-Login-check-icon").addClass("js-Login-error-icon")
    $(".js-Login-password-toggle").removeClass("js-Login-question-icon").addClass("js-Login-error-icon")
    $(".js-Login-username-message").show().html(userNameMessage)
    $(".js-Login-password-message").show().html(passwordMessage)
  }
});

var cookies = document.cookie.split(';');
var $cookieName = "KS-Approvedcookies";
var cookieSet = false;
/////////////////////////////////////////////
// Check if Cookie is set
/////////////////////////////////////////////
if(cookies.length > 0) {
 cookies.map(function(cookie) {
 if(cookie.indexOf($cookieName) != -1 ) {
   cookieSet = true;
 }
 });
}
if(cookieSet != true) {
  $(".Cookie-container").show()
}
/////////////////////////////////////////////
// Approve and set cookie on click
/////////////////////////////////////////////
$(".js-Cookies-approve-btn").click(function() {
   var d = new Date();
   d.setTime(d.getTime() + (365*24*60*60*1000)); // Valid for a year
   var expires = "expires="+ d.toUTCString();
   document.cookie =$cookieName+"=true;"+expires;
   $(".Cookie-container").fadeOut("fast");
})

$(".js-Choices-others-readmore").click(function() {
  $(this).next().slideToggle();
})


/////////////////////////////////////////////
// TOGGLE MENU OPEN
/////////////////////////////////////////////
$(".js-Menu-level-one-header").click(function() {
  $(this).next().slideToggle();
  $(this).toggleClass("children-open");
})

$(".js-Information-toggle-mail").click(function() {
  $(".js-Information-help-box--mail").slideToggle()
})
$(".js-Information-toggle-phone").click(function() {
  $(".js-Information-help-box--phone").slideToggle()
})
/////////////////////////////////////////////
// On input
/////////////////////////////////////////////
var $informationInput = $(".js-Information-input");
var $initInfo = [];
var $infoRegretBtn = $(".js-Information-regret-btn");
var $infoSaveContainer = $(".js-Information-save-container");

$informationInput.each(function() {
  $initInfo.push($(this).val())
})
$informationInput.on('input', function() {
if($infoSaveContainer.hasClass("js-Information-save-container--visible") == false) {
  $infoSaveContainer.addClass("js-Information-save-container--visible")
}
})
$infoRegretBtn.click(function() {
  $informationInput.each(function(i) {
    $informationInput[i].value = $initInfo[i]
  })
  $infoSaveContainer.removeClass("js-Information-save-container--visible")
})

/////////////////////////////////////////////
// Debounce for header. Courtesy of David Walsh
/////////////////////////////////////////////
// var $headerContainer = $(".Header-container");
// function debounce(func, wait, immediate) {
// 	var timeout;
// 	return function() {
// 		var context = this, args = arguments;
// 		var later = function() {
// 			timeout = null;
// 			if (!immediate) func.apply(context, args);
// 		};
// 		var callNow = immediate && !timeout;
// 		clearTimeout(timeout);
// 		timeout = setTimeout(later, wait);
// 		if (callNow) func.apply(context, args);
// 	};
// };
//
// var $tightHeader = debounce(function() {
//   // console.log($siteContainer.offset().top);
//   if(document.body.scrollTop > 0) {
//     $headerContainer.addClass("Header-container--tight")
//   } else {
//     $headerContainer.removeClass("Header-container--tight")
//   }
// }, 250);
//
// $(window).on('scroll', function() {
// $tightHeader()
//  })







$(".js-Header-correct-btn").click(function() {
  $(".js-Login-header").html("Logga in för att rätta din lott")
  $(".js-Site-container").toggleClass("locked");
  $(".js-Login-overlay-container").fadeIn("fast");
  if($(".js-Menu-container").hasClass("Menu--open")) {
      toggleMenu();
  }
})
//
$(".js-Header-profile, .js-Open-login").click(function() {
  $(".js-Login-header").html("Logga in på Min Sida")
  $(".js-Site-container").toggleClass("locked");
  $(".js-Login-overlay-container").fadeIn("fast");
    if($(".js-Menu-container").hasClass("Menu--open")) {
        toggleMenu();
    }
})

$(".js-Header-menu-container").click(function() {
  toggleMenu()
});


$(".js-Menu-overlay").click(function() {
  toggleMenu()
})

var menuText = $(".js-Header-title--menu");

function toggleMenu() {
  $(".js-Menu-container").toggleClass("Menu--open")
  $(".js-Site-container").toggleClass("locked")
  $(".js-Header-menu-container").toggleClass("Burger--open");

  if(menuText.text() == "meny") {
      menuText.text("stäng")
  } else {
    menuText.text("meny")
  }
}

// var $pn = $(".person-number");
// var $pnInput;
//
// $pn.focus(function(e) {
//   var $pnInput = $('[data-id="person-number"]')[0];
//   // $pnInput.focus();
//   $pnInput.setSelectionRange(0,1);
//   $pnInput.onChange(function() {
//     console.log("hejsan");
//   })
//
//
// })

/////////////////////////////////////////////
// Smooth Scrolling
/////////////////////////////////////////////
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 500);
        return false;
      }
    }
  });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk15UGFnZXMuanMiLCJMb2dpbi5qcyIsIkNvb2tpZXMuanMiLCJDaG9pY2VzLmpzIiwiQnJvd3Nlci5qcyIsIk1lbnUuanMiLCJJbmZvcm1hdGlvbi5qcyIsIkhlYWRlci5qcyIsIkZvcm1zLmpzIiwiUHJpY2VzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUNIQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gQ2hhbmdlIFBhc3N3b3JkIE1vZGFsXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiQoXCIuanMtTXlQYWdlcy1wYXNzd29yZC1idG5cIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuanMtU2l0ZS1jb250YWluZXJcIikudG9nZ2xlQ2xhc3MoXCJsb2NrZWRcIik7XG4gICQoXCIuanMtTXlQYWdlcy1wc3dyZC1vdmVybGF5LWNvbnRhaW5lclwiKS5mYWRlSW4oXCJmYXN0XCIpO1xufSlcbiQoXCIuanMtTXlQYWdlcy1jbG9zZS1mb3JtLCAuanMtTXlQYWdlcy1wc3dyZC1jbGlja2FyZWFcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuanMtU2l0ZS1jb250YWluZXJcIikudG9nZ2xlQ2xhc3MoXCJsb2NrZWRcIik7XG4gICQoXCIuanMtTXlQYWdlcy1wc3dyZC1vdmVybGF5LWNvbnRhaW5lclwiKS5mYWRlT3V0KFwiZmFzdFwiKTtcbn0pXG52YXIgJG5ld1Bhc3N3b3JkID0gJChcIi5qcy1NeVBhZ2VzLW5ldy1wc3dyZFwiKTtcbnZhciAkcmVwZWF0UGFzc3dvcmQgPSAkKFwiLmpzLU15UGFnZXMtcmVwZWF0LXBzd3JkXCIpO1xudmFyICRuZXdQYXNzd29yZFN0YXR1cyA9ICQoXCIuanMtTXlQYWdlcy1uZXctcHN3cmQtc3RhdHVzXCIpO1xudmFyICRuZXdQYXNzd29yZE1hdGNoID0gJChcIi5qcy1NeVBhZ2VzLW5ldy1wc3dyZC1tYXRjaFwiKTtcbnZhciBwYXNzd29yZFN0YXRlID0ge1xuICBsZW5ndGg6IGZhbHNlLFxuICBwYXNzd29yZDogXCJcIixcbiAgcmVwZWF0UGFzc3dvcmQ6IFwiXCJcbn1cbi8vIENoZWNrIGlmIHBhc3N3b3JkIGlzIHN1ZmZpY2llbnRcbiRuZXdQYXNzd29yZC5vbignaW5wdXQnLCBmdW5jdGlvbigpIHtcbiBwYXNzd29yZFN0YXRlLnBhc3N3b3JkID0gJCh0aGlzKS52YWwoKTtcbiBwYXNzd29yZFN0YXRlLnJlcGVhdFBhc3N3b3JkID0gJHJlcGVhdFBhc3N3b3JkLnZhbCgpO1xuaWYocGFzc3dvcmRTdGF0ZS5wYXNzd29yZC5sZW5ndGggPj0gNikge1xuICBwYXNzd29yZFN0YXRlLmxlbmd0aCA9IHRydWU7XG59IGVsc2Uge1xuICBwYXNzd29yZFN0YXRlLmxlbmd0aCA9IGZhbHNlO1xufVxuY2hlY2tQYXNzd29yZCgpXG59KTtcbiRyZXBlYXRQYXNzd29yZC5vbignaW5wdXQnLCBmdW5jdGlvbigpIHtcbiAgcGFzc3dvcmRTdGF0ZS5wYXNzd29yZCA9ICRuZXdQYXNzd29yZC52YWwoKTtcbiAgcGFzc3dvcmRTdGF0ZS5yZXBlYXRQYXNzd29yZCA9ICQodGhpcykudmFsKCk7XG5jaGVja1Bhc3N3b3JkKClcbn0pO1xuZnVuY3Rpb24gY2hlY2tQYXNzd29yZCgpIHtcbiAgaWYocGFzc3dvcmRTdGF0ZS5sZW5ndGgpIHtcbiAgICAkbmV3UGFzc3dvcmRTdGF0dXMuaHRtbChcIkzDtnNlbm9yZCDDpHIgb2tcIilcbiAgICAkbmV3UGFzc3dvcmRTdGF0dXMuYWRkQ2xhc3MoXCJ1LWdyZWVuXCIpXG4gICAgJG5ld1Bhc3N3b3JkU3RhdHVzLnJlbW92ZUNsYXNzKFwidS1yZWRcIilcbiAgfSBlbHNlIHtcbiAgICAkbmV3UGFzc3dvcmRTdGF0dXMuaHRtbChcIkzDtnNlbm9yZCBmw7ZyIGtvcnRcIilcbiAgICAkbmV3UGFzc3dvcmRTdGF0dXMucmVtb3ZlQ2xhc3MoXCJ1LWdyZWVuXCIpXG4gICAgJG5ld1Bhc3N3b3JkU3RhdHVzLmFkZENsYXNzKFwidS1yZWRcIilcbiAgfVxuICBpZihwYXNzd29yZFN0YXRlLnBhc3N3b3JkID09PSBwYXNzd29yZFN0YXRlLnJlcGVhdFBhc3N3b3JkICYmIHBhc3N3b3JkU3RhdGUubGVuZ3RoKSB7XG4gICAgJG5ld1Bhc3N3b3JkTWF0Y2guaHRtbChcIkzDtnNlbm9yZGVuIMO2dmVyZW5zdMOkbW1lclwiKVxuICAgICRuZXdQYXNzd29yZE1hdGNoLmFkZENsYXNzKFwidS1ncmVlblwiKVxuICAgICRuZXdQYXNzd29yZE1hdGNoLnJlbW92ZUNsYXNzKFwidS1yZWRcIilcbiAgfSBlbHNlIGlmKHBhc3N3b3JkU3RhdGUucGFzc3dvcmQgPT09IHBhc3N3b3JkU3RhdGUucmVwZWF0UGFzc3dvcmQgJiYgcGFzc3dvcmRTdGF0ZS5sZW5ndGggPT09IGZhbHNlKSB7XG4gICAgJG5ld1Bhc3N3b3JkTWF0Y2guaHRtbChcIkzDtnNlbm9yZGVuIMO2dmVyZW5zdMOkbW1lciBtZW4gw6RyIGbDtnIga29ydGFcIilcbiAgICAkbmV3UGFzc3dvcmRNYXRjaC5yZW1vdmVDbGFzcyhcInUtZ3JlZW5cIilcbiAgICAkbmV3UGFzc3dvcmRNYXRjaC5hZGRDbGFzcyhcInUtcmVkXCIpXG4gIH0gZWxzZSB7XG4gICAgJG5ld1Bhc3N3b3JkTWF0Y2guaHRtbChcIkzDtnNlbm9yZGVuIMO2dmVyZW5zdMOkbW1lciBpbnRlXCIpXG4gICAgJG5ld1Bhc3N3b3JkTWF0Y2gucmVtb3ZlQ2xhc3MoXCJ1LWdyZWVuXCIpXG4gICAgJG5ld1Bhc3N3b3JkTWF0Y2guYWRkQ2xhc3MoXCJ1LXJlZFwiKVxuICB9XG59XG4iLCIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAvLyBDTE9TRSBNT0RBTFxuIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4kKFwiLmpzLUxvZ2luLWNsaWNrYXJlYSwgLmpzLUxvZ2luLWNsb3NlLWZvcm1cIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuanMtTG9naW4tb3ZlcmxheS1jb250YWluZXJcIikuZmFkZU91dChcImZhc3RcIilcbiAgJChcIi5qcy1TaXRlLWNvbnRhaW5lclwiKS50b2dnbGVDbGFzcyhcImxvY2tlZFwiKTtcbn0pXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAvLyBTTElERVRPR0dMRSBUSEUgSEVMUEJPWEVTXG4gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiQoXCIuanMtTG9naW4tdXNlcm5hbWUtdG9nZ2xlXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKFwiLmpzLUxvZ2luLXVzZXJuYW1lLWhlbHAtYm94XCIpLnNsaWRlVG9nZ2xlKCk7XG59KTtcblxuJChcIi5qcy1Mb2dpbi1wYXNzd29yZC10b2dnbGUsIC5qcy1Mb2dpbi1mb3Jnb3QtcGFzc3dvcmRcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuanMtTG9naW4tcGFzc3dvcmQtaGVscC1ib3hcIikuc2xpZGVUb2dnbGUoKTtcbn0pO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFNUQVRFIE9GIFRIRSBGT1JNXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnZhciBzdGF0ZSA9IHtcbiAgdXNlck5hbWU6IGZhbHNlLCAvLyBJUyBDVVNUT01FUk5VTUJFUiBPUiBFTUFJTCBPS1xuICBwYXNzV29yZDogZmFsc2UsXG4gIGVtYWlsUmVnOiBmYWxzZSxcbiAgbnVtYmVyUmVnOiBmYWxzZVxufVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBVU0VSTkFNRSBDSEVDS1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIC8vIFJFR0VYIG1haWwuXG52YXIgZW1haWxSZWcgPSBuZXcgUmVnRXhwKC9eKChcIltcXHctXFxzXStcIil8KFtcXHctXSsoPzpcXC5bXFx3LV0rKSopfChcIltcXHctXFxzXStcIikoW1xcdy1dKyg/OlxcLltcXHctXSspKikpKEAoKD86W1xcdy1dK1xcLikqXFx3W1xcdy1dezAsNjZ9KVxcLihbYS16XXsyLDZ9KD86XFwuW2Etel17Mn0pPykkKXwoQFxcWz8oKDI1WzAtNV1cXC58MlswLTRdWzAtOV1cXC58MVswLTldezJ9XFwufFswLTldezEsMn1cXC4pKSgoMjVbMC01XXwyWzAtNF1bMC05XXwxWzAtOV17Mn18WzAtOV17MSwyfSlcXC4pezJ9KDI1WzAtNV18MlswLTRdWzAtOV18MVswLTldezJ9fFswLTldezEsMn0pXFxdPyQpL2kpO1xuICAvLyBSRUdFWCB1c2VyIG51bWJlci5cbnZhciB1c2VyTnVtYmVyUmVnID0gbmV3IFJlZ0V4cCgnXlthLXpBLVpdezJ9WzAtOV17Nn0kJyk7XG52YXIgdmFsaWRVc2VyO1xudmFyIHVzZXJOYW1lTWVzc2FnZSA9IFwiRHUgaGFyIGludGUgYW5naXZldCBldHQga29ycmVrdCBrdW5kbnVtbWVyIGVsbGVyIGUtcG9zdGFkcmVzcy5cIjtcbnZhciBwYXNzd29yZE1lc3NhZ2UgPSBcIkZlbGFrdGlndCBsw7ZzZW5vcmQuXCI7XG5cbi8vIElOUFVUIEZJRUxEIENIQU5HRVxuJCgnLmpzLUxvZ2luLWlucHV0LXVzZXJuYW1lJykub24oJ2lucHV0JywgZnVuY3Rpb24oKSB7XG4gICAgaWYoZW1haWxSZWcudGVzdCgkKHRoaXMpLnZhbCgpKSApIHtcbiAgICAgIHN0YXRlLmVtYWlsUmVnID0gdHJ1ZTtcbiAgICAgIHN0YXRlLm51bWJlclJlZyA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZih1c2VyTnVtYmVyUmVnLnRlc3QoJCh0aGlzKS52YWwoKSApKSB7XG4gICAgICBzdGF0ZS5udW1iZXJSZWcgPSB0cnVlO1xuICAgICAgc3RhdGUuZW1haWxSZWcgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUubnVtYmVyUmVnID0gZmFsc2U7XG4gICAgICBzdGF0ZS5lbWFpbFJlZyA9IGZhbHNlO1xuICAgIH1cbiAgICB2YWxpZFVzZXIgPSBzdGF0ZS5udW1iZXJSZWcgfHwgc3RhdGUuZW1haWxSZWc7XG4gICAgICBpZiAodmFsaWRVc2VyKSB7XG4gICAgICAgIHN0YXRlLnVzZXJOYW1lID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzdGF0ZS51c2VyTmFtZSA9IGZhbHNlO1xuICAgICAgfVxufSk7XG5cbi8vIFdIRU4gSU5QVVQgSVMgRE9ORSBXSVRIIFRIRSBGSUVMRFxuJCgnLmpzLUxvZ2luLWlucHV0LXVzZXJuYW1lJykuZm9jdXNvdXQoZnVuY3Rpb24oKSB7XG4gIC8vIGNvbnNvbGUubG9nKFwiSU5QVVQgTk9UIElOIEZPQ1VTIEFOWSBNT1JFXCIpO1xuICBpZihzdGF0ZS51c2VyTmFtZSA9PSBmYWxzZSkge1xuICAgICQoXCIuanMtTG9naW4tdXNlcm5hbWUtdG9nZ2xlXCIpLnJlbW92ZUNsYXNzKFwianMtTG9naW4tcXVlc3Rpb24taWNvblwiKS5yZW1vdmVDbGFzcyhcImpzLUxvZ2luLWNoZWNrLWljb25cIikuYWRkQ2xhc3MoXCJqcy1Mb2dpbi1lcnJvci1pY29uXCIpXG4gICAgJCh0aGlzKS5hZGRDbGFzcyhcImpzLUxvZ2luLWlucHV0LWVycm9yXCIpXG4gICAgJChcIi5qcy1Mb2dpbi11c2VybmFtZS1tZXNzYWdlXCIpLnNob3coKS5odG1sKHVzZXJOYW1lTWVzc2FnZSlcblxuICB9IGVsc2Uge1xuICAgIC8vICQoXCIuanMtTG9naW4tdXNlcm5hbWUtdG9nZ2xlXCIpLnJlbW92ZUNsYXNzKFwianMtTG9naW4tcXVlc3Rpb24taWNvblwiKS5yZW1vdmVDbGFzcyhcImpzLUxvZ2luLWVycm9yLWljb25cIikuYWRkQ2xhc3MoXCJqcy1Mb2dpbi1jaGVjay1pY29uXCIpXG4gICAgJChcIi5qcy1Mb2dpbi11c2VybmFtZS10b2dnbGVcIikuYWRkQ2xhc3MoXCJqcy1Mb2dpbi1xdWVzdGlvbi1pY29uXCIpLnJlbW92ZUNsYXNzKFwianMtTG9naW4tZXJyb3ItaWNvblwiKTtcbiAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwianMtTG9naW4taW5wdXQtZXJyb3JcIilcbiAgICAkKFwiLmpzLUxvZ2luLXVzZXJuYW1lLW1lc3NhZ2VcIikuaGlkZSgpLmh0bWwoXCJcIilcbiAgfVxuXG4gIC8vIFdISUNIIEJPWCBTSE9VTEQgU0hPV1xuICBpZihzdGF0ZS5lbWFpbFJlZykge1xuICAgIHBhc3N3b3JkQm94KFwicmVzZXRcIilcbiAgICAkKFwiLmpzLUxvZ2luLXJlc2V0LWVtYWlsXCIpLmh0bWwoJCgnLmpzLUxvZ2luLWlucHV0LXVzZXJuYW1lJykudmFsKCkpIC8vIFNFVCBUSEUgRU1BSUwgSU4gVEhFIE1FU1NBR0UgVE8gV0hBVEVWRVIgSVQgSVMgSU4gVEhFIElOUFVUIElGIElUIElTIFZBTElEXG4gIH0gZWxzZSB7XG4gICAgcGFzc3dvcmRCb3goXCJkZWZhdWx0XCIpXG4gIH1cbn0pXG5cbiQoXCIuanMtTG9naW4tcmVzZXQtcGFzc3dvcmQtYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgcGFzc3dvcmRCb3goXCJzZW50XCIpXG59KVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFBBU1NXT1JEIEhFTFAgQk9YXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmZ1bmN0aW9uIHBhc3N3b3JkQm94KGJveCkge1xuICBpZihib3ggPT0gXCJyZXNldFwiKSB7XG4gICAgJChcIi5qcy1Mb2dpbi1wYXNzd29yZC1yZXNldC1ib3hcIikuc2hvdygpO1xuICAgICQoXCIuanMtTG9naW4tcGFzc3dvcmQtc2VudC1ib3gsIC5qcy1Mb2dpbi1wYXNzd29yZC1kZWZhdWx0LWJveFwiKS5oaWRlKCk7XG4gIH0gZWxzZSBpZihib3ggPT0gXCJzZW50XCIpIHtcbiAgICAkKFwiLmpzLUxvZ2luLXBhc3N3b3JkLXJlc2V0LWJveCwgLmpzLUxvZ2luLXBhc3N3b3JkLWRlZmF1bHQtYm94XCIpLmhpZGUoKTtcbiAgICAkKFwiLmpzLUxvZ2luLXBhc3N3b3JkLXNlbnQtYm94XCIpLnNob3coKTtcbiAgfSBlbHNlIGlmKGJveCA9PSBcImRlZmF1bHRcIikge1xuICAgICQoXCIuanMtTG9naW4tcGFzc3dvcmQtc2VudC1ib3gsIC5qcy1Mb2dpbi1wYXNzd29yZC1yZXNldC1ib3hcIikuaGlkZSgpO1xuICAgICQoXCIuanMtTG9naW4tcGFzc3dvcmQtZGVmYXVsdC1ib3hcIikuc2hvdygpO1xuICB9XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gUEFTU1dPUkQgSU5QVVQgRklFTERcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4kKFwiLmpzLUxvZ2luLWlucHV0LXBhc3N3b3JkXCIpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuXG4gIHZhciBwYXNzV29yZCA9ICQodGhpcykudmFsKCk7XG5cbiAgaWYocGFzc1dvcmQgPT0gXCJrb21iaVwiIHx8IHBhc3NXb3JkPT0gXCJsb3R0ZXJcIiB8fCBwYXNzV29yZCA9PSBcInNwZWxcIikge1xuICAgIHN0YXRlLnBhc3NXb3JkID0gdHJ1ZVxuICB9IGVsc2Uge1xuICAgIHN0YXRlLnBhc3NXb3JkID0gZmFsc2VcbiAgfVxuICAgIGlmKHN0YXRlLnBhc3NXb3JkICE9IHRydWUpIHtcbiAgICAgICQoXCIuanMtTG9naW4tcGFzc3dvcmQtbWVzc2FnZVwiKS5oaWRlKCk7XG4gICAgfVxuICAgIGlmKCQodGhpcykuaGFzQ2xhc3MoXCJqcy1Mb2dpbi1pbnB1dC1lcnJvclwiKSkge1xuICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcImpzLUxvZ2luLWlucHV0LWVycm9yXCIpXG4gICAgICAkKFwiLmpzLUxvZ2luLXBhc3N3b3JkLXRvZ2dsZVwiKS5yZW1vdmVDbGFzcyhcImpzLUxvZ2luLWVycm9yLWljb25cIikuYWRkQ2xhc3MoXCJqcy1Mb2dpbi1xdWVzdGlvbi1pY29uXCIpXG4gICAgfVxuIH0pO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBDSEVDSyBJRiBMT0dJTiBQQVNTRUQgKEpVU1QgRk9SIFBST1RPVFlQRSBURVNUSU5HKVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4kKFwiLmpzLUxvZ2luLWZvcm0tc3VibWl0LWJ0blwiKS5jbGljayhmdW5jdGlvbihlKSB7XG4gIGUucHJldmVudERlZmF1bHQoZSlcbiAgaWYodmFsaWRVc2VyICYmIHN0YXRlLnBhc3NXb3JkKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoXCJ0aWNrZXRzLmh0bWxcIik7XG4gIH1cbiAgZWxzZSBpZih2YWxpZFVzZXIgPT0gdHJ1ZSAmJiBzdGF0ZS5wYXNzV29yZCAhPSB0cnVlKSB7XG4gICAgJChcIi5qcy1Mb2dpbi1wYXNzd29yZC10b2dnbGVcIikucmVtb3ZlQ2xhc3MoXCJqcy1Mb2dpbi1xdWVzdGlvbi1pY29uXCIpLmFkZENsYXNzKFwianMtTG9naW4tZXJyb3ItaWNvblwiKVxuICAgICQoXCIuanMtTG9naW4taGVhZGVyXCIpLmFkZENsYXNzKFwiTG9naW4taGVhZGVyLS1lcnJvclwiKS5odG1sKFwiSW5sb2dnbmluZ2VuIG1pc3NseWNrYWRlc1wiKVxuICAgICQoXCIuanMtTG9naW4taW5wdXQtcGFzc3dvcmRcIikuYWRkQ2xhc3MoXCJqcy1Mb2dpbi1pbnB1dC1lcnJvclwiKVxuICAgICQoXCIuanMtTG9naW4tcGFzc3dvcmQtbWVzc2FnZVwiKS5zaG93KCkuaHRtbChwYXNzd29yZE1lc3NhZ2UpXG4gIH1cbiAgZWxzZSB7XG4gICAgJChcIi5qcy1Mb2dpbi1oZWFkZXJcIikuYWRkQ2xhc3MoXCJMb2dpbi1oZWFkZXItLWVycm9yXCIpLmh0bWwoXCJJbmxvZ2duaW5nZW4gbWlzc2x5Y2thZGVzXCIpXG4gICAgJChcIi5qcy1Mb2dpbi1pbnB1dC1wYXNzd29yZFwiKS5hZGRDbGFzcyhcImpzLUxvZ2luLWlucHV0LWVycm9yXCIpXG4gICAgJChcIi5qcy1Mb2dpbi11c2VybmFtZS10b2dnbGVcIikucmVtb3ZlQ2xhc3MoXCJqcy1Mb2dpbi1xdWVzdGlvbi1pY29uXCIpLnJlbW92ZUNsYXNzKFwianMtTG9naW4tY2hlY2staWNvblwiKS5hZGRDbGFzcyhcImpzLUxvZ2luLWVycm9yLWljb25cIilcbiAgICAkKFwiLmpzLUxvZ2luLXBhc3N3b3JkLXRvZ2dsZVwiKS5yZW1vdmVDbGFzcyhcImpzLUxvZ2luLXF1ZXN0aW9uLWljb25cIikuYWRkQ2xhc3MoXCJqcy1Mb2dpbi1lcnJvci1pY29uXCIpXG4gICAgJChcIi5qcy1Mb2dpbi11c2VybmFtZS1tZXNzYWdlXCIpLnNob3coKS5odG1sKHVzZXJOYW1lTWVzc2FnZSlcbiAgICAkKFwiLmpzLUxvZ2luLXBhc3N3b3JkLW1lc3NhZ2VcIikuc2hvdygpLmh0bWwocGFzc3dvcmRNZXNzYWdlKVxuICB9XG59KTtcbiIsInZhciBjb29raWVzID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7Jyk7XG52YXIgJGNvb2tpZU5hbWUgPSBcIktTLUFwcHJvdmVkY29va2llc1wiO1xudmFyIGNvb2tpZVNldCA9IGZhbHNlO1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBDaGVjayBpZiBDb29raWUgaXMgc2V0XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmlmKGNvb2tpZXMubGVuZ3RoID4gMCkge1xuIGNvb2tpZXMubWFwKGZ1bmN0aW9uKGNvb2tpZSkge1xuIGlmKGNvb2tpZS5pbmRleE9mKCRjb29raWVOYW1lKSAhPSAtMSApIHtcbiAgIGNvb2tpZVNldCA9IHRydWU7XG4gfVxuIH0pO1xufVxuaWYoY29va2llU2V0ICE9IHRydWUpIHtcbiAgJChcIi5Db29raWUtY29udGFpbmVyXCIpLnNob3coKVxufVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBBcHByb3ZlIGFuZCBzZXQgY29va2llIG9uIGNsaWNrXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiQoXCIuanMtQ29va2llcy1hcHByb3ZlLWJ0blwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgIHZhciBkID0gbmV3IERhdGUoKTtcbiAgIGQuc2V0VGltZShkLmdldFRpbWUoKSArICgzNjUqMjQqNjAqNjAqMTAwMCkpOyAvLyBWYWxpZCBmb3IgYSB5ZWFyXG4gICB2YXIgZXhwaXJlcyA9IFwiZXhwaXJlcz1cIisgZC50b1VUQ1N0cmluZygpO1xuICAgZG9jdW1lbnQuY29va2llID0kY29va2llTmFtZStcIj10cnVlO1wiK2V4cGlyZXM7XG4gICAkKFwiLkNvb2tpZS1jb250YWluZXJcIikuZmFkZU91dChcImZhc3RcIik7XG59KVxuIiwiJChcIi5qcy1DaG9pY2VzLW90aGVycy1yZWFkbW9yZVwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJCh0aGlzKS5uZXh0KCkuc2xpZGVUb2dnbGUoKTtcbn0pXG4iLCIiLCIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFRPR0dMRSBNRU5VIE9QRU5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuJChcIi5qcy1NZW51LWxldmVsLW9uZS1oZWFkZXJcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQodGhpcykubmV4dCgpLnNsaWRlVG9nZ2xlKCk7XG4gICQodGhpcykudG9nZ2xlQ2xhc3MoXCJjaGlsZHJlbi1vcGVuXCIpO1xufSlcbiIsIiQoXCIuanMtSW5mb3JtYXRpb24tdG9nZ2xlLW1haWxcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuanMtSW5mb3JtYXRpb24taGVscC1ib3gtLW1haWxcIikuc2xpZGVUb2dnbGUoKVxufSlcbiQoXCIuanMtSW5mb3JtYXRpb24tdG9nZ2xlLXBob25lXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKFwiLmpzLUluZm9ybWF0aW9uLWhlbHAtYm94LS1waG9uZVwiKS5zbGlkZVRvZ2dsZSgpXG59KVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBPbiBpbnB1dFxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgJGluZm9ybWF0aW9uSW5wdXQgPSAkKFwiLmpzLUluZm9ybWF0aW9uLWlucHV0XCIpO1xudmFyICRpbml0SW5mbyA9IFtdO1xudmFyICRpbmZvUmVncmV0QnRuID0gJChcIi5qcy1JbmZvcm1hdGlvbi1yZWdyZXQtYnRuXCIpO1xudmFyICRpbmZvU2F2ZUNvbnRhaW5lciA9ICQoXCIuanMtSW5mb3JtYXRpb24tc2F2ZS1jb250YWluZXJcIik7XG5cbiRpbmZvcm1hdGlvbklucHV0LmVhY2goZnVuY3Rpb24oKSB7XG4gICRpbml0SW5mby5wdXNoKCQodGhpcykudmFsKCkpXG59KVxuJGluZm9ybWF0aW9uSW5wdXQub24oJ2lucHV0JywgZnVuY3Rpb24oKSB7XG5pZigkaW5mb1NhdmVDb250YWluZXIuaGFzQ2xhc3MoXCJqcy1JbmZvcm1hdGlvbi1zYXZlLWNvbnRhaW5lci0tdmlzaWJsZVwiKSA9PSBmYWxzZSkge1xuICAkaW5mb1NhdmVDb250YWluZXIuYWRkQ2xhc3MoXCJqcy1JbmZvcm1hdGlvbi1zYXZlLWNvbnRhaW5lci0tdmlzaWJsZVwiKVxufVxufSlcbiRpbmZvUmVncmV0QnRuLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkaW5mb3JtYXRpb25JbnB1dC5lYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAkaW5mb3JtYXRpb25JbnB1dFtpXS52YWx1ZSA9ICRpbml0SW5mb1tpXVxuICB9KVxuICAkaW5mb1NhdmVDb250YWluZXIucmVtb3ZlQ2xhc3MoXCJqcy1JbmZvcm1hdGlvbi1zYXZlLWNvbnRhaW5lci0tdmlzaWJsZVwiKVxufSlcbiIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gRGVib3VuY2UgZm9yIGhlYWRlci4gQ291cnRlc3kgb2YgRGF2aWQgV2Fsc2hcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gdmFyICRoZWFkZXJDb250YWluZXIgPSAkKFwiLkhlYWRlci1jb250YWluZXJcIik7XG4vLyBmdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbi8vIFx0dmFyIHRpbWVvdXQ7XG4vLyBcdHJldHVybiBmdW5jdGlvbigpIHtcbi8vIFx0XHR2YXIgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XG4vLyBcdFx0dmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4vLyBcdFx0XHR0aW1lb3V0ID0gbnVsbDtcbi8vIFx0XHRcdGlmICghaW1tZWRpYXRlKSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuLy8gXHRcdH07XG4vLyBcdFx0dmFyIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG4vLyBcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuLy8gXHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbi8vIFx0XHRpZiAoY2FsbE5vdykgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbi8vIFx0fTtcbi8vIH07XG4vL1xuLy8gdmFyICR0aWdodEhlYWRlciA9IGRlYm91bmNlKGZ1bmN0aW9uKCkge1xuLy8gICAvLyBjb25zb2xlLmxvZygkc2l0ZUNvbnRhaW5lci5vZmZzZXQoKS50b3ApO1xuLy8gICBpZihkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA+IDApIHtcbi8vICAgICAkaGVhZGVyQ29udGFpbmVyLmFkZENsYXNzKFwiSGVhZGVyLWNvbnRhaW5lci0tdGlnaHRcIilcbi8vICAgfSBlbHNlIHtcbi8vICAgICAkaGVhZGVyQ29udGFpbmVyLnJlbW92ZUNsYXNzKFwiSGVhZGVyLWNvbnRhaW5lci0tdGlnaHRcIilcbi8vICAgfVxuLy8gfSwgMjUwKTtcbi8vXG4vLyAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xuLy8gJHRpZ2h0SGVhZGVyKClcbi8vICB9KVxuXG5cblxuXG5cblxuXG4kKFwiLmpzLUhlYWRlci1jb3JyZWN0LWJ0blwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5qcy1Mb2dpbi1oZWFkZXJcIikuaHRtbChcIkxvZ2dhIGluIGbDtnIgYXR0IHLDpHR0YSBkaW4gbG90dFwiKVxuICAkKFwiLmpzLVNpdGUtY29udGFpbmVyXCIpLnRvZ2dsZUNsYXNzKFwibG9ja2VkXCIpO1xuICAkKFwiLmpzLUxvZ2luLW92ZXJsYXktY29udGFpbmVyXCIpLmZhZGVJbihcImZhc3RcIik7XG4gIGlmKCQoXCIuanMtTWVudS1jb250YWluZXJcIikuaGFzQ2xhc3MoXCJNZW51LS1vcGVuXCIpKSB7XG4gICAgICB0b2dnbGVNZW51KCk7XG4gIH1cbn0pXG4vL1xuJChcIi5qcy1IZWFkZXItcHJvZmlsZSwgLmpzLU9wZW4tbG9naW5cIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuanMtTG9naW4taGVhZGVyXCIpLmh0bWwoXCJMb2dnYSBpbiBww6UgTWluIFNpZGFcIilcbiAgJChcIi5qcy1TaXRlLWNvbnRhaW5lclwiKS50b2dnbGVDbGFzcyhcImxvY2tlZFwiKTtcbiAgJChcIi5qcy1Mb2dpbi1vdmVybGF5LWNvbnRhaW5lclwiKS5mYWRlSW4oXCJmYXN0XCIpO1xuICAgIGlmKCQoXCIuanMtTWVudS1jb250YWluZXJcIikuaGFzQ2xhc3MoXCJNZW51LS1vcGVuXCIpKSB7XG4gICAgICAgIHRvZ2dsZU1lbnUoKTtcbiAgICB9XG59KVxuXG4kKFwiLmpzLUhlYWRlci1tZW51LWNvbnRhaW5lclwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgdG9nZ2xlTWVudSgpXG59KTtcblxuXG4kKFwiLmpzLU1lbnUtb3ZlcmxheVwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgdG9nZ2xlTWVudSgpXG59KVxuXG52YXIgbWVudVRleHQgPSAkKFwiLmpzLUhlYWRlci10aXRsZS0tbWVudVwiKTtcblxuZnVuY3Rpb24gdG9nZ2xlTWVudSgpIHtcbiAgJChcIi5qcy1NZW51LWNvbnRhaW5lclwiKS50b2dnbGVDbGFzcyhcIk1lbnUtLW9wZW5cIilcbiAgJChcIi5qcy1TaXRlLWNvbnRhaW5lclwiKS50b2dnbGVDbGFzcyhcImxvY2tlZFwiKVxuICAkKFwiLmpzLUhlYWRlci1tZW51LWNvbnRhaW5lclwiKS50b2dnbGVDbGFzcyhcIkJ1cmdlci0tb3BlblwiKTtcblxuICBpZihtZW51VGV4dC50ZXh0KCkgPT0gXCJtZW55XCIpIHtcbiAgICAgIG1lbnVUZXh0LnRleHQoXCJzdMOkbmdcIilcbiAgfSBlbHNlIHtcbiAgICBtZW51VGV4dC50ZXh0KFwibWVueVwiKVxuICB9XG59XG4iLCIvLyB2YXIgJHBuID0gJChcIi5wZXJzb24tbnVtYmVyXCIpO1xuLy8gdmFyICRwbklucHV0O1xuLy9cbi8vICRwbi5mb2N1cyhmdW5jdGlvbihlKSB7XG4vLyAgIHZhciAkcG5JbnB1dCA9ICQoJ1tkYXRhLWlkPVwicGVyc29uLW51bWJlclwiXScpWzBdO1xuLy8gICAvLyAkcG5JbnB1dC5mb2N1cygpO1xuLy8gICAkcG5JbnB1dC5zZXRTZWxlY3Rpb25SYW5nZSgwLDEpO1xuLy8gICAkcG5JbnB1dC5vbkNoYW5nZShmdW5jdGlvbigpIHtcbi8vICAgICBjb25zb2xlLmxvZyhcImhlanNhblwiKTtcbi8vICAgfSlcbi8vXG4vL1xuLy8gfSlcbiIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gU21vb3RoIFNjcm9sbGluZ1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4kKGZ1bmN0aW9uKCkge1xuICAkKCdhW2hyZWYqPVwiI1wiXTpub3QoW2hyZWY9XCIjXCJdKScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIGlmIChsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgPT0gdGhpcy5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgJiYgbG9jYXRpb24uaG9zdG5hbWUgPT0gdGhpcy5ob3N0bmFtZSkge1xuICAgICAgdmFyIHRhcmdldCA9ICQodGhpcy5oYXNoKTtcbiAgICAgIHRhcmdldCA9IHRhcmdldC5sZW5ndGggPyB0YXJnZXQgOiAkKCdbbmFtZT0nICsgdGhpcy5oYXNoLnNsaWNlKDEpICsnXScpO1xuICAgICAgaWYgKHRhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogdGFyZ2V0Lm9mZnNldCgpLnRvcFxuICAgICAgICB9LCA1MDApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn0pO1xuIl19
