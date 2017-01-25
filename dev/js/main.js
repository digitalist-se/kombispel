// START jQuery
"use strict";
$( document ).ready(function() {

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
// *** REMOVE IN PROD or atleast configure after API
/////////////////////////////////////////////

$(".js-Login-input-password").on('input', function() {

  var passWord = $(this).val();

  if(passWord == "kombi" || passWord== "lotter" || passWord == "spel") {
    state.passWord = true
    window.location.href = "localhost:3000/tickets.html";
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
// ***  REMOVE IN PROD
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

var $loginCookie = "Tjena tjabba!"; // Ersätt med vad inloggningskakan nu heter
$(".js-Promo-correct-ticket-btn").click(function(e) {
  if (document.cookie.indexOf($loginCookie) == -1) {
    e.preventDefault();
    $(".js-Login-header").html("Logga in för att rätta din lott")
    $(".js-Site-container").toggleClass("locked");
    $(".js-Login-overlay-container").fadeIn("fast");
  }
})

/////////////////////////////////////////////
// Check if Cookie is set
/////////////////////////////////////////////
if (document.cookie.indexOf("_ga") == -1) {
   $(".js-Cookie-container").show()
}
/////////////////////////////////////////////
// Approve hide cookie info
/////////////////////////////////////////////
$(".js-Cookies-approve-btn").click(function() {
   $(".js-Cookie-container").fadeOut("fast");
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
$(".js-Information-toggle-mobile").click(function() {
  $(".js-Information-help-box--mobile").slideToggle()
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
// HEADER SLIDE DOWN
/////////////////////////////////////////////
var previousTop = window.pageYOffset;
var headerContainer = $(".js-Header-container");
var headerSlideDown = function() {
  // console.log("kallas på!");
  // console.log(window.pageYOffset);
  // console.log(window.pageYOffset);
  if(window.pageYOffset > 0) { // <-- Man är inte högst upp på sidan
    var currentOffTop = window.pageYOffset;
    if(currentOffTop > previousTop && window.pageYOffset > 130) {
        headerContainer.addClass("is-hidden")
    } else {
      headerContainer.removeClass("is-hidden")
    }
    previousTop = currentOffTop;
  } else {
    headerContainer.removeClass("is-hidden")
  }
}
$(window).on('scroll',_.throttle(headerSlideDown, 100));
/////////////////////////////////////////////
// ALL THE OTHER STUFF
/////////////////////////////////////////////
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

  if(menuText.text() == "Meny") {
      menuText.text("Stäng")
  } else {
    menuText.text("Meny")
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
          scrollTop: target.offset().top - 165
        }, 500);
        return false;
      }
    }
  });
});
/////////////////////////////////////////////
// LÄS MER OM VINSTER
/////////////////////////////////////////////
$(".js-Prices-readmore").click(function() {
  $(this).next().slideToggle();
})

$(".js-Campaign-hero-products-img").click(function() {
  $(".js-Campaign-overlay-container").fadeIn("fast");
  $(".js-Site-container").toggleClass("locked");
});

$(".js-Campaign-clickarea, .js-Campaign-close-form").click(function() {
  $(".js-Campaign-overlay-container").fadeOut("fast");
  $(".js-Site-container").toggleClass("locked");
})

});
// End jQuery

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlN0YXJ0LmpzIiwiTXlQYWdlcy5qcyIsIkxvZ2luLmpzIiwiUHJvbW8uanMiLCJDb29raWVzLmpzIiwiQ2hvaWNlcy5qcyIsIkJyb3dzZXIuanMiLCJNZW51LmpzIiwiSW5mb3JtYXRpb24uanMiLCJIZWFkZXIuanMiLCJGb3Jtcy5qcyIsIlByaWNlcy5qcyIsIkNhbXBhaWduLmpzIiwiRW5kLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU1RBUlQgalF1ZXJ5XG5cInVzZSBzdHJpY3RcIjtcbiQoIGRvY3VtZW50ICkucmVhZHkoZnVuY3Rpb24oKSB7XG4iLCIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIENoYW5nZSBQYXNzd29yZCBNb2RhbFxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4kKFwiLmpzLU15UGFnZXMtcGFzc3dvcmQtYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKFwiLmpzLVNpdGUtY29udGFpbmVyXCIpLnRvZ2dsZUNsYXNzKFwibG9ja2VkXCIpO1xuICAkKFwiLmpzLU15UGFnZXMtcHN3cmQtb3ZlcmxheS1jb250YWluZXJcIikuZmFkZUluKFwiZmFzdFwiKTtcbn0pXG4kKFwiLmpzLU15UGFnZXMtY2xvc2UtZm9ybSwgLmpzLU15UGFnZXMtcHN3cmQtY2xpY2thcmVhXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKFwiLmpzLVNpdGUtY29udGFpbmVyXCIpLnRvZ2dsZUNsYXNzKFwibG9ja2VkXCIpO1xuICAkKFwiLmpzLU15UGFnZXMtcHN3cmQtb3ZlcmxheS1jb250YWluZXJcIikuZmFkZU91dChcImZhc3RcIik7XG59KVxudmFyICRuZXdQYXNzd29yZCA9ICQoXCIuanMtTXlQYWdlcy1uZXctcHN3cmRcIik7XG52YXIgJHJlcGVhdFBhc3N3b3JkID0gJChcIi5qcy1NeVBhZ2VzLXJlcGVhdC1wc3dyZFwiKTtcbnZhciAkbmV3UGFzc3dvcmRTdGF0dXMgPSAkKFwiLmpzLU15UGFnZXMtbmV3LXBzd3JkLXN0YXR1c1wiKTtcbnZhciAkbmV3UGFzc3dvcmRNYXRjaCA9ICQoXCIuanMtTXlQYWdlcy1uZXctcHN3cmQtbWF0Y2hcIik7XG52YXIgcGFzc3dvcmRTdGF0ZSA9IHtcbiAgbGVuZ3RoOiBmYWxzZSxcbiAgcGFzc3dvcmQ6IFwiXCIsXG4gIHJlcGVhdFBhc3N3b3JkOiBcIlwiXG59XG4vLyBDaGVjayBpZiBwYXNzd29yZCBpcyBzdWZmaWNpZW50XG4kbmV3UGFzc3dvcmQub24oJ2lucHV0JywgZnVuY3Rpb24oKSB7XG4gcGFzc3dvcmRTdGF0ZS5wYXNzd29yZCA9ICQodGhpcykudmFsKCk7XG4gcGFzc3dvcmRTdGF0ZS5yZXBlYXRQYXNzd29yZCA9ICRyZXBlYXRQYXNzd29yZC52YWwoKTtcbmlmKHBhc3N3b3JkU3RhdGUucGFzc3dvcmQubGVuZ3RoID49IDYpIHtcbiAgcGFzc3dvcmRTdGF0ZS5sZW5ndGggPSB0cnVlO1xufSBlbHNlIHtcbiAgcGFzc3dvcmRTdGF0ZS5sZW5ndGggPSBmYWxzZTtcbn1cbmNoZWNrUGFzc3dvcmQoKVxufSk7XG4kcmVwZWF0UGFzc3dvcmQub24oJ2lucHV0JywgZnVuY3Rpb24oKSB7XG4gIHBhc3N3b3JkU3RhdGUucGFzc3dvcmQgPSAkbmV3UGFzc3dvcmQudmFsKCk7XG4gIHBhc3N3b3JkU3RhdGUucmVwZWF0UGFzc3dvcmQgPSAkKHRoaXMpLnZhbCgpO1xuY2hlY2tQYXNzd29yZCgpXG59KTtcbmZ1bmN0aW9uIGNoZWNrUGFzc3dvcmQoKSB7XG4gIGlmKHBhc3N3b3JkU3RhdGUubGVuZ3RoKSB7XG4gICAgJG5ld1Bhc3N3b3JkU3RhdHVzLmh0bWwoXCJMw7ZzZW5vcmQgw6RyIG9rXCIpXG4gICAgJG5ld1Bhc3N3b3JkU3RhdHVzLmFkZENsYXNzKFwidS1ncmVlblwiKVxuICAgICRuZXdQYXNzd29yZFN0YXR1cy5yZW1vdmVDbGFzcyhcInUtcmVkXCIpXG4gIH0gZWxzZSB7XG4gICAgJG5ld1Bhc3N3b3JkU3RhdHVzLmh0bWwoXCJMw7ZzZW5vcmQgZsO2ciBrb3J0XCIpXG4gICAgJG5ld1Bhc3N3b3JkU3RhdHVzLnJlbW92ZUNsYXNzKFwidS1ncmVlblwiKVxuICAgICRuZXdQYXNzd29yZFN0YXR1cy5hZGRDbGFzcyhcInUtcmVkXCIpXG4gIH1cbiAgaWYocGFzc3dvcmRTdGF0ZS5wYXNzd29yZCA9PT0gcGFzc3dvcmRTdGF0ZS5yZXBlYXRQYXNzd29yZCAmJiBwYXNzd29yZFN0YXRlLmxlbmd0aCkge1xuICAgICRuZXdQYXNzd29yZE1hdGNoLmh0bWwoXCJMw7ZzZW5vcmRlbiDDtnZlcmVuc3TDpG1tZXJcIilcbiAgICAkbmV3UGFzc3dvcmRNYXRjaC5hZGRDbGFzcyhcInUtZ3JlZW5cIilcbiAgICAkbmV3UGFzc3dvcmRNYXRjaC5yZW1vdmVDbGFzcyhcInUtcmVkXCIpXG4gIH0gZWxzZSBpZihwYXNzd29yZFN0YXRlLnBhc3N3b3JkID09PSBwYXNzd29yZFN0YXRlLnJlcGVhdFBhc3N3b3JkICYmIHBhc3N3b3JkU3RhdGUubGVuZ3RoID09PSBmYWxzZSkge1xuICAgICRuZXdQYXNzd29yZE1hdGNoLmh0bWwoXCJMw7ZzZW5vcmRlbiDDtnZlcmVuc3TDpG1tZXIgbWVuIMOkciBmw7ZyIGtvcnRhXCIpXG4gICAgJG5ld1Bhc3N3b3JkTWF0Y2gucmVtb3ZlQ2xhc3MoXCJ1LWdyZWVuXCIpXG4gICAgJG5ld1Bhc3N3b3JkTWF0Y2guYWRkQ2xhc3MoXCJ1LXJlZFwiKVxuICB9IGVsc2Uge1xuICAgICRuZXdQYXNzd29yZE1hdGNoLmh0bWwoXCJMw7ZzZW5vcmRlbiDDtnZlcmVuc3TDpG1tZXIgaW50ZVwiKVxuICAgICRuZXdQYXNzd29yZE1hdGNoLnJlbW92ZUNsYXNzKFwidS1ncmVlblwiKVxuICAgICRuZXdQYXNzd29yZE1hdGNoLmFkZENsYXNzKFwidS1yZWRcIilcbiAgfVxufVxuIiwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gLy8gQ0xPU0UgTU9EQUxcbiAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuJChcIi5qcy1Mb2dpbi1jbGlja2FyZWEsIC5qcy1Mb2dpbi1jbG9zZS1mb3JtXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKFwiLmpzLUxvZ2luLW92ZXJsYXktY29udGFpbmVyXCIpLmZhZGVPdXQoXCJmYXN0XCIpXG4gICQoXCIuanMtU2l0ZS1jb250YWluZXJcIikudG9nZ2xlQ2xhc3MoXCJsb2NrZWRcIik7XG59KVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gLy8gU0xJREVUT0dHTEUgVEhFIEhFTFBCT1hFU1xuIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4kKFwiLmpzLUxvZ2luLXVzZXJuYW1lLXRvZ2dsZVwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5qcy1Mb2dpbi11c2VybmFtZS1oZWxwLWJveFwiKS5zbGlkZVRvZ2dsZSgpO1xufSk7XG5cbiQoXCIuanMtTG9naW4tcGFzc3dvcmQtdG9nZ2xlLCAuanMtTG9naW4tZm9yZ290LXBhc3N3b3JkXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKFwiLmpzLUxvZ2luLXBhc3N3b3JkLWhlbHAtYm94XCIpLnNsaWRlVG9nZ2xlKCk7XG59KTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBTVEFURSBPRiBUSEUgRk9STVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgc3RhdGUgPSB7XG4gIHVzZXJOYW1lOiBmYWxzZSwgLy8gSVMgQ1VTVE9NRVJOVU1CRVIgT1IgRU1BSUwgT0tcbiAgcGFzc1dvcmQ6IGZhbHNlLFxuICBlbWFpbFJlZzogZmFsc2UsXG4gIG51bWJlclJlZzogZmFsc2Vcbn1cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gVVNFUk5BTUUgQ0hFQ0tcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAvLyBSRUdFWCBtYWlsLlxudmFyIGVtYWlsUmVnID0gbmV3IFJlZ0V4cCgvXigoXCJbXFx3LVxcc10rXCIpfChbXFx3LV0rKD86XFwuW1xcdy1dKykqKXwoXCJbXFx3LVxcc10rXCIpKFtcXHctXSsoPzpcXC5bXFx3LV0rKSopKShAKCg/OltcXHctXStcXC4pKlxcd1tcXHctXXswLDY2fSlcXC4oW2Etel17Miw2fSg/OlxcLlthLXpdezJ9KT8pJCl8KEBcXFs/KCgyNVswLTVdXFwufDJbMC00XVswLTldXFwufDFbMC05XXsyfVxcLnxbMC05XXsxLDJ9XFwuKSkoKDI1WzAtNV18MlswLTRdWzAtOV18MVswLTldezJ9fFswLTldezEsMn0pXFwuKXsyfSgyNVswLTVdfDJbMC00XVswLTldfDFbMC05XXsyfXxbMC05XXsxLDJ9KVxcXT8kKS9pKTtcbiAgLy8gUkVHRVggdXNlciBudW1iZXIuXG52YXIgdXNlck51bWJlclJlZyA9IG5ldyBSZWdFeHAoJ15bYS16QS1aXXsyfVswLTldezZ9JCcpO1xudmFyIHZhbGlkVXNlcjtcbnZhciB1c2VyTmFtZU1lc3NhZ2UgPSBcIkR1IGhhciBpbnRlIGFuZ2l2ZXQgZXR0IGtvcnJla3Qga3VuZG51bW1lciBlbGxlciBlLXBvc3RhZHJlc3MuXCI7XG52YXIgcGFzc3dvcmRNZXNzYWdlID0gXCJGZWxha3RpZ3QgbMO2c2Vub3JkLlwiO1xuXG4vLyBJTlBVVCBGSUVMRCBDSEFOR0VcbiQoJy5qcy1Mb2dpbi1pbnB1dC11c2VybmFtZScpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuICAgIGlmKGVtYWlsUmVnLnRlc3QoJCh0aGlzKS52YWwoKSkgKSB7XG4gICAgICBzdGF0ZS5lbWFpbFJlZyA9IHRydWU7XG4gICAgICBzdGF0ZS5udW1iZXJSZWcgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYodXNlck51bWJlclJlZy50ZXN0KCQodGhpcykudmFsKCkgKSkge1xuICAgICAgc3RhdGUubnVtYmVyUmVnID0gdHJ1ZTtcbiAgICAgIHN0YXRlLmVtYWlsUmVnID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlLm51bWJlclJlZyA9IGZhbHNlO1xuICAgICAgc3RhdGUuZW1haWxSZWcgPSBmYWxzZTtcbiAgICB9XG4gICAgdmFsaWRVc2VyID0gc3RhdGUubnVtYmVyUmVnIHx8IHN0YXRlLmVtYWlsUmVnO1xuICAgICAgaWYgKHZhbGlkVXNlcikge1xuICAgICAgICBzdGF0ZS51c2VyTmFtZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc3RhdGUudXNlck5hbWUgPSBmYWxzZTtcbiAgICAgIH1cbn0pO1xuXG4vLyBXSEVOIElOUFVUIElTIERPTkUgV0lUSCBUSEUgRklFTERcbiQoJy5qcy1Mb2dpbi1pbnB1dC11c2VybmFtZScpLmZvY3Vzb3V0KGZ1bmN0aW9uKCkge1xuICAvLyBjb25zb2xlLmxvZyhcIklOUFVUIE5PVCBJTiBGT0NVUyBBTlkgTU9SRVwiKTtcbiAgaWYoc3RhdGUudXNlck5hbWUgPT0gZmFsc2UpIHtcbiAgICAkKFwiLmpzLUxvZ2luLXVzZXJuYW1lLXRvZ2dsZVwiKS5yZW1vdmVDbGFzcyhcImpzLUxvZ2luLXF1ZXN0aW9uLWljb25cIikucmVtb3ZlQ2xhc3MoXCJqcy1Mb2dpbi1jaGVjay1pY29uXCIpLmFkZENsYXNzKFwianMtTG9naW4tZXJyb3ItaWNvblwiKVxuICAgICQodGhpcykuYWRkQ2xhc3MoXCJqcy1Mb2dpbi1pbnB1dC1lcnJvclwiKVxuICAgICQoXCIuanMtTG9naW4tdXNlcm5hbWUtbWVzc2FnZVwiKS5zaG93KCkuaHRtbCh1c2VyTmFtZU1lc3NhZ2UpXG5cbiAgfSBlbHNlIHtcbiAgICAkKFwiLmpzLUxvZ2luLXVzZXJuYW1lLXRvZ2dsZVwiKS5hZGRDbGFzcyhcImpzLUxvZ2luLXF1ZXN0aW9uLWljb25cIikucmVtb3ZlQ2xhc3MoXCJqcy1Mb2dpbi1lcnJvci1pY29uXCIpO1xuICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJqcy1Mb2dpbi1pbnB1dC1lcnJvclwiKVxuICAgICQoXCIuanMtTG9naW4tdXNlcm5hbWUtbWVzc2FnZVwiKS5oaWRlKCkuaHRtbChcIlwiKVxuICB9XG5cbiAgLy8gV0hJQ0ggQk9YIFNIT1VMRCBTSE9XXG4gIGlmKHN0YXRlLmVtYWlsUmVnKSB7XG4gICAgcGFzc3dvcmRCb3goXCJyZXNldFwiKVxuICAgICQoXCIuanMtTG9naW4tcmVzZXQtZW1haWxcIikuaHRtbCgkKCcuanMtTG9naW4taW5wdXQtdXNlcm5hbWUnKS52YWwoKSkgLy8gU0VUIFRIRSBFTUFJTCBJTiBUSEUgTUVTU0FHRSBUTyBXSEFURVZFUiBJVCBJUyBJTiBUSEUgSU5QVVQgSUYgSVQgSVMgVkFMSURcbiAgfSBlbHNlIHtcbiAgICBwYXNzd29yZEJveChcImRlZmF1bHRcIilcbiAgfVxufSlcblxuJChcIi5qcy1Mb2dpbi1yZXNldC1wYXNzd29yZC1idG5cIikuY2xpY2soZnVuY3Rpb24oZSkge1xuICBwYXNzd29yZEJveChcInNlbnRcIilcbn0pXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gUEFTU1dPUkQgSEVMUCBCT1hcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZnVuY3Rpb24gcGFzc3dvcmRCb3goYm94KSB7XG4gIGlmKGJveCA9PSBcInJlc2V0XCIpIHtcbiAgICAkKFwiLmpzLUxvZ2luLXBhc3N3b3JkLXJlc2V0LWJveFwiKS5zaG93KCk7XG4gICAgJChcIi5qcy1Mb2dpbi1wYXNzd29yZC1zZW50LWJveCwgLmpzLUxvZ2luLXBhc3N3b3JkLWRlZmF1bHQtYm94XCIpLmhpZGUoKTtcbiAgfSBlbHNlIGlmKGJveCA9PSBcInNlbnRcIikge1xuICAgICQoXCIuanMtTG9naW4tcGFzc3dvcmQtcmVzZXQtYm94LCAuanMtTG9naW4tcGFzc3dvcmQtZGVmYXVsdC1ib3hcIikuaGlkZSgpO1xuICAgICQoXCIuanMtTG9naW4tcGFzc3dvcmQtc2VudC1ib3hcIikuc2hvdygpO1xuICB9IGVsc2UgaWYoYm94ID09IFwiZGVmYXVsdFwiKSB7XG4gICAgJChcIi5qcy1Mb2dpbi1wYXNzd29yZC1zZW50LWJveCwgLmpzLUxvZ2luLXBhc3N3b3JkLXJlc2V0LWJveFwiKS5oaWRlKCk7XG4gICAgJChcIi5qcy1Mb2dpbi1wYXNzd29yZC1kZWZhdWx0LWJveFwiKS5zaG93KCk7XG4gIH1cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBQQVNTV09SRCBJTlBVVCBGSUVMRFxuLy8gKioqIFJFTU9WRSBJTiBQUk9EIG9yIGF0bGVhc3QgY29uZmlndXJlIGFmdGVyIEFQSVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiQoXCIuanMtTG9naW4taW5wdXQtcGFzc3dvcmRcIikub24oJ2lucHV0JywgZnVuY3Rpb24oKSB7XG5cbiAgdmFyIHBhc3NXb3JkID0gJCh0aGlzKS52YWwoKTtcblxuICBpZihwYXNzV29yZCA9PSBcImtvbWJpXCIgfHwgcGFzc1dvcmQ9PSBcImxvdHRlclwiIHx8IHBhc3NXb3JkID09IFwic3BlbFwiKSB7XG4gICAgc3RhdGUucGFzc1dvcmQgPSB0cnVlXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcImxvY2FsaG9zdDozMDAwL3RpY2tldHMuaHRtbFwiO1xuICB9IGVsc2Uge1xuICAgIHN0YXRlLnBhc3NXb3JkID0gZmFsc2VcbiAgfVxuICAgIGlmKHN0YXRlLnBhc3NXb3JkICE9IHRydWUpIHtcbiAgICAgICQoXCIuanMtTG9naW4tcGFzc3dvcmQtbWVzc2FnZVwiKS5oaWRlKCk7XG4gICAgfVxuICAgIGlmKCQodGhpcykuaGFzQ2xhc3MoXCJqcy1Mb2dpbi1pbnB1dC1lcnJvclwiKSkge1xuICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcImpzLUxvZ2luLWlucHV0LWVycm9yXCIpXG4gICAgICAkKFwiLmpzLUxvZ2luLXBhc3N3b3JkLXRvZ2dsZVwiKS5yZW1vdmVDbGFzcyhcImpzLUxvZ2luLWVycm9yLWljb25cIikuYWRkQ2xhc3MoXCJqcy1Mb2dpbi1xdWVzdGlvbi1pY29uXCIpXG4gICAgfVxuIH0pO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBDSEVDSyBJRiBMT0dJTiBQQVNTRUQgKEpVU1QgRk9SIFBST1RPVFlQRSBURVNUSU5HKVxuLy8gKioqICBSRU1PVkUgSU4gUFJPRFxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4kKFwiLmpzLUxvZ2luLWZvcm0tc3VibWl0LWJ0blwiKS5jbGljayhmdW5jdGlvbihlKSB7XG4gIGUucHJldmVudERlZmF1bHQoZSlcbiAgaWYodmFsaWRVc2VyICYmIHN0YXRlLnBhc3NXb3JkKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoXCJ0aWNrZXRzLmh0bWxcIik7XG4gIH1cbiAgZWxzZSBpZih2YWxpZFVzZXIgPT0gdHJ1ZSAmJiBzdGF0ZS5wYXNzV29yZCAhPSB0cnVlKSB7XG4gICAgJChcIi5qcy1Mb2dpbi1wYXNzd29yZC10b2dnbGVcIikucmVtb3ZlQ2xhc3MoXCJqcy1Mb2dpbi1xdWVzdGlvbi1pY29uXCIpLmFkZENsYXNzKFwianMtTG9naW4tZXJyb3ItaWNvblwiKVxuICAgICQoXCIuanMtTG9naW4taGVhZGVyXCIpLmFkZENsYXNzKFwiTG9naW4taGVhZGVyLS1lcnJvclwiKS5odG1sKFwiSW5sb2dnbmluZ2VuIG1pc3NseWNrYWRlc1wiKVxuICAgICQoXCIuanMtTG9naW4taW5wdXQtcGFzc3dvcmRcIikuYWRkQ2xhc3MoXCJqcy1Mb2dpbi1pbnB1dC1lcnJvclwiKVxuICAgICQoXCIuanMtTG9naW4tcGFzc3dvcmQtbWVzc2FnZVwiKS5zaG93KCkuaHRtbChwYXNzd29yZE1lc3NhZ2UpXG4gIH1cbiAgZWxzZSB7XG4gICAgJChcIi5qcy1Mb2dpbi1oZWFkZXJcIikuYWRkQ2xhc3MoXCJMb2dpbi1oZWFkZXItLWVycm9yXCIpLmh0bWwoXCJJbmxvZ2duaW5nZW4gbWlzc2x5Y2thZGVzXCIpXG4gICAgJChcIi5qcy1Mb2dpbi1pbnB1dC1wYXNzd29yZFwiKS5hZGRDbGFzcyhcImpzLUxvZ2luLWlucHV0LWVycm9yXCIpXG4gICAgJChcIi5qcy1Mb2dpbi11c2VybmFtZS10b2dnbGVcIikucmVtb3ZlQ2xhc3MoXCJqcy1Mb2dpbi1xdWVzdGlvbi1pY29uXCIpLnJlbW92ZUNsYXNzKFwianMtTG9naW4tY2hlY2staWNvblwiKS5hZGRDbGFzcyhcImpzLUxvZ2luLWVycm9yLWljb25cIilcbiAgICAkKFwiLmpzLUxvZ2luLXBhc3N3b3JkLXRvZ2dsZVwiKS5yZW1vdmVDbGFzcyhcImpzLUxvZ2luLXF1ZXN0aW9uLWljb25cIikuYWRkQ2xhc3MoXCJqcy1Mb2dpbi1lcnJvci1pY29uXCIpXG4gICAgJChcIi5qcy1Mb2dpbi11c2VybmFtZS1tZXNzYWdlXCIpLnNob3coKS5odG1sKHVzZXJOYW1lTWVzc2FnZSlcbiAgICAkKFwiLmpzLUxvZ2luLXBhc3N3b3JkLW1lc3NhZ2VcIikuc2hvdygpLmh0bWwocGFzc3dvcmRNZXNzYWdlKVxuICB9XG59KTtcbiIsInZhciAkbG9naW5Db29raWUgPSBcIlRqZW5hIHRqYWJiYSFcIjsgLy8gRXJzw6R0dCBtZWQgdmFkIGlubG9nZ25pbmdza2FrYW4gbnUgaGV0ZXJcbiQoXCIuanMtUHJvbW8tY29ycmVjdC10aWNrZXQtYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgaWYgKGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKCRsb2dpbkNvb2tpZSkgPT0gLTEpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgJChcIi5qcy1Mb2dpbi1oZWFkZXJcIikuaHRtbChcIkxvZ2dhIGluIGbDtnIgYXR0IHLDpHR0YSBkaW4gbG90dFwiKVxuICAgICQoXCIuanMtU2l0ZS1jb250YWluZXJcIikudG9nZ2xlQ2xhc3MoXCJsb2NrZWRcIik7XG4gICAgJChcIi5qcy1Mb2dpbi1vdmVybGF5LWNvbnRhaW5lclwiKS5mYWRlSW4oXCJmYXN0XCIpO1xuICB9XG59KVxuIiwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBDaGVjayBpZiBDb29raWUgaXMgc2V0XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmlmIChkb2N1bWVudC5jb29raWUuaW5kZXhPZihcIl9nYVwiKSA9PSAtMSkge1xuICAgJChcIi5qcy1Db29raWUtY29udGFpbmVyXCIpLnNob3coKVxufVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBBcHByb3ZlIGhpZGUgY29va2llIGluZm9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuJChcIi5qcy1Db29raWVzLWFwcHJvdmUtYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgJChcIi5qcy1Db29raWUtY29udGFpbmVyXCIpLmZhZGVPdXQoXCJmYXN0XCIpO1xufSlcbiIsIiQoXCIuanMtQ2hvaWNlcy1vdGhlcnMtcmVhZG1vcmVcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQodGhpcykubmV4dCgpLnNsaWRlVG9nZ2xlKCk7XG59KVxuIiwiIiwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBUT0dHTEUgTUVOVSBPUEVOXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiQoXCIuanMtTWVudS1sZXZlbC1vbmUtaGVhZGVyXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKHRoaXMpLm5leHQoKS5zbGlkZVRvZ2dsZSgpO1xuICAkKHRoaXMpLnRvZ2dsZUNsYXNzKFwiY2hpbGRyZW4tb3BlblwiKTtcbn0pXG4iLCIkKFwiLmpzLUluZm9ybWF0aW9uLXRvZ2dsZS1tYWlsXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKFwiLmpzLUluZm9ybWF0aW9uLWhlbHAtYm94LS1tYWlsXCIpLnNsaWRlVG9nZ2xlKClcbn0pXG4kKFwiLmpzLUluZm9ybWF0aW9uLXRvZ2dsZS1waG9uZVwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5qcy1JbmZvcm1hdGlvbi1oZWxwLWJveC0tcGhvbmVcIikuc2xpZGVUb2dnbGUoKVxufSlcbiQoXCIuanMtSW5mb3JtYXRpb24tdG9nZ2xlLW1vYmlsZVwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5qcy1JbmZvcm1hdGlvbi1oZWxwLWJveC0tbW9iaWxlXCIpLnNsaWRlVG9nZ2xlKClcbn0pXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIE9uIGlucHV0XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnZhciAkaW5mb3JtYXRpb25JbnB1dCA9ICQoXCIuanMtSW5mb3JtYXRpb24taW5wdXRcIik7XG52YXIgJGluaXRJbmZvID0gW107XG52YXIgJGluZm9SZWdyZXRCdG4gPSAkKFwiLmpzLUluZm9ybWF0aW9uLXJlZ3JldC1idG5cIik7XG52YXIgJGluZm9TYXZlQ29udGFpbmVyID0gJChcIi5qcy1JbmZvcm1hdGlvbi1zYXZlLWNvbnRhaW5lclwiKTtcblxuJGluZm9ybWF0aW9uSW5wdXQuZWFjaChmdW5jdGlvbigpIHtcbiAgJGluaXRJbmZvLnB1c2goJCh0aGlzKS52YWwoKSlcbn0pXG4kaW5mb3JtYXRpb25JbnB1dC5vbignaW5wdXQnLCBmdW5jdGlvbigpIHtcbmlmKCRpbmZvU2F2ZUNvbnRhaW5lci5oYXNDbGFzcyhcImpzLUluZm9ybWF0aW9uLXNhdmUtY29udGFpbmVyLS12aXNpYmxlXCIpID09IGZhbHNlKSB7XG4gICRpbmZvU2F2ZUNvbnRhaW5lci5hZGRDbGFzcyhcImpzLUluZm9ybWF0aW9uLXNhdmUtY29udGFpbmVyLS12aXNpYmxlXCIpXG59XG59KVxuJGluZm9SZWdyZXRCdG4uY2xpY2soZnVuY3Rpb24oKSB7XG4gICRpbmZvcm1hdGlvbklucHV0LmVhY2goZnVuY3Rpb24oaSkge1xuICAgICRpbmZvcm1hdGlvbklucHV0W2ldLnZhbHVlID0gJGluaXRJbmZvW2ldXG4gIH0pXG4gICRpbmZvU2F2ZUNvbnRhaW5lci5yZW1vdmVDbGFzcyhcImpzLUluZm9ybWF0aW9uLXNhdmUtY29udGFpbmVyLS12aXNpYmxlXCIpXG59KVxuIiwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBIRUFERVIgU0xJREUgRE9XTlxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgcHJldmlvdXNUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG52YXIgaGVhZGVyQ29udGFpbmVyID0gJChcIi5qcy1IZWFkZXItY29udGFpbmVyXCIpO1xudmFyIGhlYWRlclNsaWRlRG93biA9IGZ1bmN0aW9uKCkge1xuICAvLyBjb25zb2xlLmxvZyhcImthbGxhcyBww6UhXCIpO1xuICAvLyBjb25zb2xlLmxvZyh3aW5kb3cucGFnZVlPZmZzZXQpO1xuICAvLyBjb25zb2xlLmxvZyh3aW5kb3cucGFnZVlPZmZzZXQpO1xuICBpZih3aW5kb3cucGFnZVlPZmZzZXQgPiAwKSB7IC8vIDwtLSBNYW4gw6RyIGludGUgaMO2Z3N0IHVwcCBww6Ugc2lkYW5cbiAgICB2YXIgY3VycmVudE9mZlRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICBpZihjdXJyZW50T2ZmVG9wID4gcHJldmlvdXNUb3AgJiYgd2luZG93LnBhZ2VZT2Zmc2V0ID4gMTMwKSB7XG4gICAgICAgIGhlYWRlckNvbnRhaW5lci5hZGRDbGFzcyhcImlzLWhpZGRlblwiKVxuICAgIH0gZWxzZSB7XG4gICAgICBoZWFkZXJDb250YWluZXIucmVtb3ZlQ2xhc3MoXCJpcy1oaWRkZW5cIilcbiAgICB9XG4gICAgcHJldmlvdXNUb3AgPSBjdXJyZW50T2ZmVG9wO1xuICB9IGVsc2Uge1xuICAgIGhlYWRlckNvbnRhaW5lci5yZW1vdmVDbGFzcyhcImlzLWhpZGRlblwiKVxuICB9XG59XG4kKHdpbmRvdykub24oJ3Njcm9sbCcsXy50aHJvdHRsZShoZWFkZXJTbGlkZURvd24sIDEwMCkpO1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBBTEwgVEhFIE9USEVSIFNUVUZGXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiQoXCIuanMtSGVhZGVyLWNvcnJlY3QtYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKFwiLmpzLUxvZ2luLWhlYWRlclwiKS5odG1sKFwiTG9nZ2EgaW4gZsO2ciBhdHQgcsOkdHRhIGRpbiBsb3R0XCIpXG4gICQoXCIuanMtU2l0ZS1jb250YWluZXJcIikudG9nZ2xlQ2xhc3MoXCJsb2NrZWRcIik7XG4gICQoXCIuanMtTG9naW4tb3ZlcmxheS1jb250YWluZXJcIikuZmFkZUluKFwiZmFzdFwiKTtcbiAgaWYoJChcIi5qcy1NZW51LWNvbnRhaW5lclwiKS5oYXNDbGFzcyhcIk1lbnUtLW9wZW5cIikpIHtcbiAgICAgIHRvZ2dsZU1lbnUoKTtcbiAgfVxufSlcbi8vXG4kKFwiLmpzLUhlYWRlci1wcm9maWxlLCAuanMtT3Blbi1sb2dpblwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5qcy1Mb2dpbi1oZWFkZXJcIikuaHRtbChcIkxvZ2dhIGluIHDDpSBNaW4gU2lkYVwiKVxuICAkKFwiLmpzLVNpdGUtY29udGFpbmVyXCIpLnRvZ2dsZUNsYXNzKFwibG9ja2VkXCIpO1xuICAkKFwiLmpzLUxvZ2luLW92ZXJsYXktY29udGFpbmVyXCIpLmZhZGVJbihcImZhc3RcIik7XG4gICAgaWYoJChcIi5qcy1NZW51LWNvbnRhaW5lclwiKS5oYXNDbGFzcyhcIk1lbnUtLW9wZW5cIikpIHtcbiAgICAgICAgdG9nZ2xlTWVudSgpO1xuICAgIH1cbn0pXG5cbiQoXCIuanMtSGVhZGVyLW1lbnUtY29udGFpbmVyXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICB0b2dnbGVNZW51KClcbn0pO1xuXG5cbiQoXCIuanMtTWVudS1vdmVybGF5XCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICB0b2dnbGVNZW51KClcbn0pXG5cbnZhciBtZW51VGV4dCA9ICQoXCIuanMtSGVhZGVyLXRpdGxlLS1tZW51XCIpO1xuXG5mdW5jdGlvbiB0b2dnbGVNZW51KCkge1xuICAkKFwiLmpzLU1lbnUtY29udGFpbmVyXCIpLnRvZ2dsZUNsYXNzKFwiTWVudS0tb3BlblwiKVxuICAkKFwiLmpzLVNpdGUtY29udGFpbmVyXCIpLnRvZ2dsZUNsYXNzKFwibG9ja2VkXCIpXG4gICQoXCIuanMtSGVhZGVyLW1lbnUtY29udGFpbmVyXCIpLnRvZ2dsZUNsYXNzKFwiQnVyZ2VyLS1vcGVuXCIpO1xuXG4gIGlmKG1lbnVUZXh0LnRleHQoKSA9PSBcIk1lbnlcIikge1xuICAgICAgbWVudVRleHQudGV4dChcIlN0w6RuZ1wiKVxuICB9IGVsc2Uge1xuICAgIG1lbnVUZXh0LnRleHQoXCJNZW55XCIpXG4gIH1cbn1cbiIsIi8vIHZhciAkcG4gPSAkKFwiLnBlcnNvbi1udW1iZXJcIik7XG4vLyB2YXIgJHBuSW5wdXQ7XG4vL1xuLy8gJHBuLmZvY3VzKGZ1bmN0aW9uKGUpIHtcbi8vICAgdmFyICRwbklucHV0ID0gJCgnW2RhdGEtaWQ9XCJwZXJzb24tbnVtYmVyXCJdJylbMF07XG4vLyAgIC8vICRwbklucHV0LmZvY3VzKCk7XG4vLyAgICRwbklucHV0LnNldFNlbGVjdGlvblJhbmdlKDAsMSk7XG4vLyAgICRwbklucHV0Lm9uQ2hhbmdlKGZ1bmN0aW9uKCkge1xuLy8gICAgIGNvbnNvbGUubG9nKFwiaGVqc2FuXCIpO1xuLy8gICB9KVxuLy9cbi8vXG4vLyB9KVxuIiwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBTbW9vdGggU2Nyb2xsaW5nXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiQoZnVuY3Rpb24oKSB7XG4gICQoJ2FbaHJlZio9XCIjXCJdOm5vdChbaHJlZj1cIiNcIl0pJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSA9PSB0aGlzLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSAmJiBsb2NhdGlvbi5ob3N0bmFtZSA9PSB0aGlzLmhvc3RuYW1lKSB7XG4gICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzLmhhc2gpO1xuICAgICAgdGFyZ2V0ID0gdGFyZ2V0Lmxlbmd0aCA/IHRhcmdldCA6ICQoJ1tuYW1lPScgKyB0aGlzLmhhc2guc2xpY2UoMSkgKyddJyk7XG4gICAgICBpZiAodGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wIC0gMTY1XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufSk7XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIEzDhFMgTUVSIE9NIFZJTlNURVJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuJChcIi5qcy1QcmljZXMtcmVhZG1vcmVcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQodGhpcykubmV4dCgpLnNsaWRlVG9nZ2xlKCk7XG59KVxuIiwiJChcIi5qcy1DYW1wYWlnbi1oZXJvLXByb2R1Y3RzLWltZ1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5qcy1DYW1wYWlnbi1vdmVybGF5LWNvbnRhaW5lclwiKS5mYWRlSW4oXCJmYXN0XCIpO1xuICAkKFwiLmpzLVNpdGUtY29udGFpbmVyXCIpLnRvZ2dsZUNsYXNzKFwibG9ja2VkXCIpO1xufSk7XG5cbiQoXCIuanMtQ2FtcGFpZ24tY2xpY2thcmVhLCAuanMtQ2FtcGFpZ24tY2xvc2UtZm9ybVwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5qcy1DYW1wYWlnbi1vdmVybGF5LWNvbnRhaW5lclwiKS5mYWRlT3V0KFwiZmFzdFwiKTtcbiAgJChcIi5qcy1TaXRlLWNvbnRhaW5lclwiKS50b2dnbGVDbGFzcyhcImxvY2tlZFwiKTtcbn0pXG4iLCJ9KTtcbi8vIEVuZCBqUXVlcnlcbiJdfQ==
