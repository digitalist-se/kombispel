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
// On input & select
/////////////////////////////////////////////
var $informationInput = $(".js-Information-input");
var $informationSelect = $(".js-Information-select");
var $initInfo = []
var $initSelect = []
var $infoRegretBtn = $(".js-Information-regret-btn");
var $infoSaveContainer = $(".js-Information-save-container");
$informationInput.each(function() {
  $initInfo.push($(this).val())
})
$informationSelect.each(function() {
  $initSelect.push($(this).val())
})

function toggleSaveContainer() {
  if($infoSaveContainer.hasClass("is-visible") == false) {
    $infoSaveContainer.addClass("is-visible")
  }
}
$informationInput.on('input', function() {
  toggleSaveContainer();
})
$informationSelect.on('change', function() {
  toggleSaveContainer();
})
$infoRegretBtn.click(function() {
  $informationInput.each(function(i) {
    $informationInput[i].value = $initInfo[i]
  })
  $informationSelect.each(function(i) {
    $informationSelect[i].value = $initSelect[i]
  })
  $infoSaveContainer.removeClass("is-visible")
})

////////////////////////////////////////////////
// Om fält är tomt vid spara-klick scrolla dit
///////////////////////////////////////////////
var $saveButton = $(".js-Information-save-btn");
var $infoForm = $(".js-Information-form");
var $infoFieldRequired = $(".js-Information-field-required");
var mailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

$infoFieldRequired.click(function() {
  $(this).toggleClass("is-visible");
})
var formValid;

$saveButton.click(function(e) {
 formValid = true;
  e.preventDefault();
  $informationInput.each(function(i) {
    if(mailRegex.test($(this).val()) === false && $(this).attr("type")==="email") {
      formValid = false;
      $("html, body").animate({ scrollTop: $(this).offset().top - 125 }, 600);
      $(this).focus()
      $(this).next().addClass("is-visible");
      return false
    }
  })
  if(formValid) {
    $infoForm.submit();
  }
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
$(".js-Header-profile, .js-Open-login, .js-Campaign-form-login").click(function() {
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

$(".js-Campaign-open-terms").click(function() {
  $(".js-Campaign-terms-container").fadeIn("fast");
  $(".js-Site-container").toggleClass("locked");
})


$(".js-Campaign-hero-products-img").click(function() {
  $(".js-Campaign-overlay-container").fadeIn("fast");
  $(".js-Site-container").toggleClass("locked");
});

$(".js-Campaign-clickarea, .js-Campaign-close-form").click(function() {
  $(".js-Campaign-overlay-container").fadeOut("fast");
  $(".js-Campaign-terms-container").fadeOut("fast");
  $(".js-Site-container").toggleClass("locked");
})

function mobileScroll(distance,delay) {
    setTimeout(function(){
      $('html, body').animate({
        scrollTop: distance
      }, 400);
 }, delay);
}
 if ($.contains(document, $("#SubmenuAnchor")[0]) && $.contains(document, $("#anchor")[0]) === false && ($(window).width() < 768)) {
   mobileScroll($("#SubmenuAnchor").offset().top,800)
 } else if ($.contains(document, $("#SubmenuAnchor")[0]) && $.contains(document, $("#anchor")[0]) && ($(window).width() < 768)) {
   mobileScroll($("#SubmenuAnchor").offset().top + $("#SubmenuAnchor").height(),800)
 }

});
// End jQuery

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlN0YXJ0LmpzIiwiTXlQYWdlcy5qcyIsIkxvZ2luLmpzIiwiUHJvbW8uanMiLCJDb29raWVzLmpzIiwiQ2hvaWNlcy5qcyIsIkJyb3dzZXIuanMiLCJNZW51LmpzIiwiSW5mb3JtYXRpb24uanMiLCJIZWFkZXIuanMiLCJGb3Jtcy5qcyIsIlByaWNlcy5qcyIsIkNhbXBhaWduLmpzIiwiU3VibWVudS5qcyIsIkVuZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFNUQVJUIGpRdWVyeVxyXG5cInVzZSBzdHJpY3RcIjtcclxuJCggZG9jdW1lbnQgKS5yZWFkeShmdW5jdGlvbigpIHtcclxuIiwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8vIENoYW5nZSBQYXNzd29yZCBNb2RhbFxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuJChcIi5qcy1NeVBhZ2VzLXBhc3N3b3JkLWJ0blwiKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAkKFwiLmpzLVNpdGUtY29udGFpbmVyXCIpLnRvZ2dsZUNsYXNzKFwibG9ja2VkXCIpO1xyXG4gICQoXCIuanMtTXlQYWdlcy1wc3dyZC1vdmVybGF5LWNvbnRhaW5lclwiKS5mYWRlSW4oXCJmYXN0XCIpO1xyXG59KVxyXG4kKFwiLmpzLU15UGFnZXMtY2xvc2UtZm9ybSwgLmpzLU15UGFnZXMtcHN3cmQtY2xpY2thcmVhXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICQoXCIuanMtU2l0ZS1jb250YWluZXJcIikudG9nZ2xlQ2xhc3MoXCJsb2NrZWRcIik7XHJcbiAgJChcIi5qcy1NeVBhZ2VzLXBzd3JkLW92ZXJsYXktY29udGFpbmVyXCIpLmZhZGVPdXQoXCJmYXN0XCIpO1xyXG59KVxyXG52YXIgJG5ld1Bhc3N3b3JkID0gJChcIi5qcy1NeVBhZ2VzLW5ldy1wc3dyZFwiKTtcclxudmFyICRyZXBlYXRQYXNzd29yZCA9ICQoXCIuanMtTXlQYWdlcy1yZXBlYXQtcHN3cmRcIik7XHJcbnZhciAkbmV3UGFzc3dvcmRTdGF0dXMgPSAkKFwiLmpzLU15UGFnZXMtbmV3LXBzd3JkLXN0YXR1c1wiKTtcclxudmFyICRuZXdQYXNzd29yZE1hdGNoID0gJChcIi5qcy1NeVBhZ2VzLW5ldy1wc3dyZC1tYXRjaFwiKTtcclxudmFyIHBhc3N3b3JkU3RhdGUgPSB7XHJcbiAgbGVuZ3RoOiBmYWxzZSxcclxuICBwYXNzd29yZDogXCJcIixcclxuICByZXBlYXRQYXNzd29yZDogXCJcIlxyXG59XHJcbi8vIENoZWNrIGlmIHBhc3N3b3JkIGlzIHN1ZmZpY2llbnRcclxuJG5ld1Bhc3N3b3JkLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xyXG4gcGFzc3dvcmRTdGF0ZS5wYXNzd29yZCA9ICQodGhpcykudmFsKCk7XHJcbiBwYXNzd29yZFN0YXRlLnJlcGVhdFBhc3N3b3JkID0gJHJlcGVhdFBhc3N3b3JkLnZhbCgpO1xyXG5pZihwYXNzd29yZFN0YXRlLnBhc3N3b3JkLmxlbmd0aCA+PSA2KSB7XHJcbiAgcGFzc3dvcmRTdGF0ZS5sZW5ndGggPSB0cnVlO1xyXG59IGVsc2Uge1xyXG4gIHBhc3N3b3JkU3RhdGUubGVuZ3RoID0gZmFsc2U7XHJcbn1cclxuY2hlY2tQYXNzd29yZCgpXHJcbn0pO1xyXG4kcmVwZWF0UGFzc3dvcmQub24oJ2lucHV0JywgZnVuY3Rpb24oKSB7XHJcbiAgcGFzc3dvcmRTdGF0ZS5wYXNzd29yZCA9ICRuZXdQYXNzd29yZC52YWwoKTtcclxuICBwYXNzd29yZFN0YXRlLnJlcGVhdFBhc3N3b3JkID0gJCh0aGlzKS52YWwoKTtcclxuY2hlY2tQYXNzd29yZCgpXHJcbn0pO1xyXG5mdW5jdGlvbiBjaGVja1Bhc3N3b3JkKCkge1xyXG4gIGlmKHBhc3N3b3JkU3RhdGUubGVuZ3RoKSB7XHJcbiAgICAkbmV3UGFzc3dvcmRTdGF0dXMuaHRtbChcIkzDtnNlbm9yZCDDpHIgb2tcIilcclxuICAgICRuZXdQYXNzd29yZFN0YXR1cy5hZGRDbGFzcyhcInUtZ3JlZW5cIilcclxuICAgICRuZXdQYXNzd29yZFN0YXR1cy5yZW1vdmVDbGFzcyhcInUtcmVkXCIpXHJcbiAgfSBlbHNlIHtcclxuICAgICRuZXdQYXNzd29yZFN0YXR1cy5odG1sKFwiTMO2c2Vub3JkIGbDtnIga29ydFwiKVxyXG4gICAgJG5ld1Bhc3N3b3JkU3RhdHVzLnJlbW92ZUNsYXNzKFwidS1ncmVlblwiKVxyXG4gICAgJG5ld1Bhc3N3b3JkU3RhdHVzLmFkZENsYXNzKFwidS1yZWRcIilcclxuICB9XHJcbiAgaWYocGFzc3dvcmRTdGF0ZS5wYXNzd29yZCA9PT0gcGFzc3dvcmRTdGF0ZS5yZXBlYXRQYXNzd29yZCAmJiBwYXNzd29yZFN0YXRlLmxlbmd0aCkge1xyXG4gICAgJG5ld1Bhc3N3b3JkTWF0Y2guaHRtbChcIkzDtnNlbm9yZGVuIMO2dmVyZW5zdMOkbW1lclwiKVxyXG4gICAgJG5ld1Bhc3N3b3JkTWF0Y2guYWRkQ2xhc3MoXCJ1LWdyZWVuXCIpXHJcbiAgICAkbmV3UGFzc3dvcmRNYXRjaC5yZW1vdmVDbGFzcyhcInUtcmVkXCIpXHJcbiAgfSBlbHNlIGlmKHBhc3N3b3JkU3RhdGUucGFzc3dvcmQgPT09IHBhc3N3b3JkU3RhdGUucmVwZWF0UGFzc3dvcmQgJiYgcGFzc3dvcmRTdGF0ZS5sZW5ndGggPT09IGZhbHNlKSB7XHJcbiAgICAkbmV3UGFzc3dvcmRNYXRjaC5odG1sKFwiTMO2c2Vub3JkZW4gw7Z2ZXJlbnN0w6RtbWVyIG1lbiDDpHIgZsO2ciBrb3J0YVwiKVxyXG4gICAgJG5ld1Bhc3N3b3JkTWF0Y2gucmVtb3ZlQ2xhc3MoXCJ1LWdyZWVuXCIpXHJcbiAgICAkbmV3UGFzc3dvcmRNYXRjaC5hZGRDbGFzcyhcInUtcmVkXCIpXHJcbiAgfSBlbHNlIHtcclxuICAgICRuZXdQYXNzd29yZE1hdGNoLmh0bWwoXCJMw7ZzZW5vcmRlbiDDtnZlcmVuc3TDpG1tZXIgaW50ZVwiKVxyXG4gICAgJG5ld1Bhc3N3b3JkTWF0Y2gucmVtb3ZlQ2xhc3MoXCJ1LWdyZWVuXCIpXHJcbiAgICAkbmV3UGFzc3dvcmRNYXRjaC5hZGRDbGFzcyhcInUtcmVkXCIpXHJcbiAgfVxyXG59XHJcbiIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gLy8gQ0xPU0UgTU9EQUxcclxuIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiQoXCIuanMtTG9naW4tY2xpY2thcmVhLCAuanMtTG9naW4tY2xvc2UtZm9ybVwiKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAkKFwiLmpzLUxvZ2luLW92ZXJsYXktY29udGFpbmVyXCIpLmZhZGVPdXQoXCJmYXN0XCIpXHJcbiAgJChcIi5qcy1TaXRlLWNvbnRhaW5lclwiKS50b2dnbGVDbGFzcyhcImxvY2tlZFwiKTtcclxufSlcclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAvLyBTTElERVRPR0dMRSBUSEUgSEVMUEJPWEVTXHJcbiAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4kKFwiLmpzLUxvZ2luLXVzZXJuYW1lLXRvZ2dsZVwiKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAkKFwiLmpzLUxvZ2luLXVzZXJuYW1lLWhlbHAtYm94XCIpLnNsaWRlVG9nZ2xlKCk7XHJcbn0pO1xyXG5cclxuJChcIi5qcy1Mb2dpbi1wYXNzd29yZC10b2dnbGUsIC5qcy1Mb2dpbi1mb3Jnb3QtcGFzc3dvcmRcIikuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgJChcIi5qcy1Mb2dpbi1wYXNzd29yZC1oZWxwLWJveFwiKS5zbGlkZVRvZ2dsZSgpO1xyXG59KTtcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vLyBTVEFURSBPRiBUSEUgRk9STVxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxudmFyIHN0YXRlID0ge1xyXG4gIHVzZXJOYW1lOiBmYWxzZSwgLy8gSVMgQ1VTVE9NRVJOVU1CRVIgT1IgRU1BSUwgT0tcclxuICBwYXNzV29yZDogZmFsc2UsXHJcbiAgZW1haWxSZWc6IGZhbHNlLFxyXG4gIG51bWJlclJlZzogZmFsc2VcclxufVxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8gVVNFUk5BTUUgQ0hFQ0tcclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgLy8gUkVHRVggbWFpbC5cclxudmFyIGVtYWlsUmVnID0gbmV3IFJlZ0V4cCgvXigoXCJbXFx3LVxcc10rXCIpfChbXFx3LV0rKD86XFwuW1xcdy1dKykqKXwoXCJbXFx3LVxcc10rXCIpKFtcXHctXSsoPzpcXC5bXFx3LV0rKSopKShAKCg/OltcXHctXStcXC4pKlxcd1tcXHctXXswLDY2fSlcXC4oW2Etel17Miw2fSg/OlxcLlthLXpdezJ9KT8pJCl8KEBcXFs/KCgyNVswLTVdXFwufDJbMC00XVswLTldXFwufDFbMC05XXsyfVxcLnxbMC05XXsxLDJ9XFwuKSkoKDI1WzAtNV18MlswLTRdWzAtOV18MVswLTldezJ9fFswLTldezEsMn0pXFwuKXsyfSgyNVswLTVdfDJbMC00XVswLTldfDFbMC05XXsyfXxbMC05XXsxLDJ9KVxcXT8kKS9pKTtcclxuICAvLyBSRUdFWCB1c2VyIG51bWJlci5cclxudmFyIHVzZXJOdW1iZXJSZWcgPSBuZXcgUmVnRXhwKCdeW2EtekEtWl17Mn1bMC05XXs2fSQnKTtcclxudmFyIHZhbGlkVXNlcjtcclxudmFyIHVzZXJOYW1lTWVzc2FnZSA9IFwiRHUgaGFyIGludGUgYW5naXZldCBldHQga29ycmVrdCBrdW5kbnVtbWVyIGVsbGVyIGUtcG9zdGFkcmVzcy5cIjtcclxudmFyIHBhc3N3b3JkTWVzc2FnZSA9IFwiRmVsYWt0aWd0IGzDtnNlbm9yZC5cIjtcclxuXHJcbi8vIElOUFVUIEZJRUxEIENIQU5HRVxyXG4kKCcuanMtTG9naW4taW5wdXQtdXNlcm5hbWUnKS5vbignaW5wdXQnLCBmdW5jdGlvbigpIHtcclxuICAgIGlmKGVtYWlsUmVnLnRlc3QoJCh0aGlzKS52YWwoKSkgKSB7XHJcbiAgICAgIHN0YXRlLmVtYWlsUmVnID0gdHJ1ZTtcclxuICAgICAgc3RhdGUubnVtYmVyUmVnID0gZmFsc2U7XHJcbiAgICB9IGVsc2UgaWYodXNlck51bWJlclJlZy50ZXN0KCQodGhpcykudmFsKCkgKSkge1xyXG4gICAgICBzdGF0ZS5udW1iZXJSZWcgPSB0cnVlO1xyXG4gICAgICBzdGF0ZS5lbWFpbFJlZyA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3RhdGUubnVtYmVyUmVnID0gZmFsc2U7XHJcbiAgICAgIHN0YXRlLmVtYWlsUmVnID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB2YWxpZFVzZXIgPSBzdGF0ZS5udW1iZXJSZWcgfHwgc3RhdGUuZW1haWxSZWc7XHJcbiAgICAgIGlmICh2YWxpZFVzZXIpIHtcclxuICAgICAgICBzdGF0ZS51c2VyTmFtZSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgc3RhdGUudXNlck5hbWUgPSBmYWxzZTtcclxuICAgICAgfVxyXG59KTtcclxuXHJcbi8vIFdIRU4gSU5QVVQgSVMgRE9ORSBXSVRIIFRIRSBGSUVMRFxyXG4kKCcuanMtTG9naW4taW5wdXQtdXNlcm5hbWUnKS5mb2N1c291dChmdW5jdGlvbigpIHtcclxuICAvLyBjb25zb2xlLmxvZyhcIklOUFVUIE5PVCBJTiBGT0NVUyBBTlkgTU9SRVwiKTtcclxuICBpZihzdGF0ZS51c2VyTmFtZSA9PSBmYWxzZSkge1xyXG4gICAgJChcIi5qcy1Mb2dpbi11c2VybmFtZS10b2dnbGVcIikucmVtb3ZlQ2xhc3MoXCJqcy1Mb2dpbi1xdWVzdGlvbi1pY29uXCIpLnJlbW92ZUNsYXNzKFwianMtTG9naW4tY2hlY2staWNvblwiKS5hZGRDbGFzcyhcImpzLUxvZ2luLWVycm9yLWljb25cIilcclxuICAgICQodGhpcykuYWRkQ2xhc3MoXCJqcy1Mb2dpbi1pbnB1dC1lcnJvclwiKVxyXG4gICAgJChcIi5qcy1Mb2dpbi11c2VybmFtZS1tZXNzYWdlXCIpLnNob3coKS5odG1sKHVzZXJOYW1lTWVzc2FnZSlcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgICQoXCIuanMtTG9naW4tdXNlcm5hbWUtdG9nZ2xlXCIpLmFkZENsYXNzKFwianMtTG9naW4tcXVlc3Rpb24taWNvblwiKS5yZW1vdmVDbGFzcyhcImpzLUxvZ2luLWVycm9yLWljb25cIik7XHJcbiAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwianMtTG9naW4taW5wdXQtZXJyb3JcIilcclxuICAgICQoXCIuanMtTG9naW4tdXNlcm5hbWUtbWVzc2FnZVwiKS5oaWRlKCkuaHRtbChcIlwiKVxyXG4gIH1cclxuXHJcbiAgLy8gV0hJQ0ggQk9YIFNIT1VMRCBTSE9XXHJcbiAgaWYoc3RhdGUuZW1haWxSZWcpIHtcclxuICAgIHBhc3N3b3JkQm94KFwicmVzZXRcIilcclxuICAgICQoXCIuanMtTG9naW4tcmVzZXQtZW1haWxcIikuaHRtbCgkKCcuanMtTG9naW4taW5wdXQtdXNlcm5hbWUnKS52YWwoKSkgLy8gU0VUIFRIRSBFTUFJTCBJTiBUSEUgTUVTU0FHRSBUTyBXSEFURVZFUiBJVCBJUyBJTiBUSEUgSU5QVVQgSUYgSVQgSVMgVkFMSURcclxuICB9IGVsc2Uge1xyXG4gICAgcGFzc3dvcmRCb3goXCJkZWZhdWx0XCIpXHJcbiAgfVxyXG59KVxyXG5cclxuJChcIi5qcy1Mb2dpbi1yZXNldC1wYXNzd29yZC1idG5cIikuY2xpY2soZnVuY3Rpb24oZSkge1xyXG4gIHBhc3N3b3JkQm94KFwic2VudFwiKVxyXG59KVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8vIFBBU1NXT1JEIEhFTFAgQk9YXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5mdW5jdGlvbiBwYXNzd29yZEJveChib3gpIHtcclxuICBpZihib3ggPT0gXCJyZXNldFwiKSB7XHJcbiAgICAkKFwiLmpzLUxvZ2luLXBhc3N3b3JkLXJlc2V0LWJveFwiKS5zaG93KCk7XHJcbiAgICAkKFwiLmpzLUxvZ2luLXBhc3N3b3JkLXNlbnQtYm94LCAuanMtTG9naW4tcGFzc3dvcmQtZGVmYXVsdC1ib3hcIikuaGlkZSgpO1xyXG4gIH0gZWxzZSBpZihib3ggPT0gXCJzZW50XCIpIHtcclxuICAgICQoXCIuanMtTG9naW4tcGFzc3dvcmQtcmVzZXQtYm94LCAuanMtTG9naW4tcGFzc3dvcmQtZGVmYXVsdC1ib3hcIikuaGlkZSgpO1xyXG4gICAgJChcIi5qcy1Mb2dpbi1wYXNzd29yZC1zZW50LWJveFwiKS5zaG93KCk7XHJcbiAgfSBlbHNlIGlmKGJveCA9PSBcImRlZmF1bHRcIikge1xyXG4gICAgJChcIi5qcy1Mb2dpbi1wYXNzd29yZC1zZW50LWJveCwgLmpzLUxvZ2luLXBhc3N3b3JkLXJlc2V0LWJveFwiKS5oaWRlKCk7XHJcbiAgICAkKFwiLmpzLUxvZ2luLXBhc3N3b3JkLWRlZmF1bHQtYm94XCIpLnNob3coKTtcclxuICB9XHJcbn1cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vLyBQQVNTV09SRCBJTlBVVCBGSUVMRFxyXG4vLyAqKiogUkVNT1ZFIElOIFBST0Qgb3IgYXRsZWFzdCBjb25maWd1cmUgYWZ0ZXIgQVBJXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuJChcIi5qcy1Mb2dpbi1pbnB1dC1wYXNzd29yZFwiKS5vbignaW5wdXQnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgdmFyIHBhc3NXb3JkID0gJCh0aGlzKS52YWwoKTtcclxuXHJcbiAgaWYocGFzc1dvcmQgPT0gXCJrb21iaVwiIHx8IHBhc3NXb3JkPT0gXCJsb3R0ZXJcIiB8fCBwYXNzV29yZCA9PSBcInNwZWxcIikge1xyXG4gICAgc3RhdGUucGFzc1dvcmQgPSB0cnVlXHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwibG9jYWxob3N0OjMwMDAvdGlja2V0cy5odG1sXCI7XHJcbiAgfSBlbHNlIHtcclxuICAgIHN0YXRlLnBhc3NXb3JkID0gZmFsc2VcclxuICB9XHJcbiAgICBpZihzdGF0ZS5wYXNzV29yZCAhPSB0cnVlKSB7XHJcbiAgICAgICQoXCIuanMtTG9naW4tcGFzc3dvcmQtbWVzc2FnZVwiKS5oaWRlKCk7XHJcbiAgICB9XHJcbiAgICBpZigkKHRoaXMpLmhhc0NsYXNzKFwianMtTG9naW4taW5wdXQtZXJyb3JcIikpIHtcclxuICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcImpzLUxvZ2luLWlucHV0LWVycm9yXCIpXHJcbiAgICAgICQoXCIuanMtTG9naW4tcGFzc3dvcmQtdG9nZ2xlXCIpLnJlbW92ZUNsYXNzKFwianMtTG9naW4tZXJyb3ItaWNvblwiKS5hZGRDbGFzcyhcImpzLUxvZ2luLXF1ZXN0aW9uLWljb25cIilcclxuICAgIH1cclxuIH0pO1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vLyBDSEVDSyBJRiBMT0dJTiBQQVNTRUQgKEpVU1QgRk9SIFBST1RPVFlQRSBURVNUSU5HKVxyXG4vLyAqKiogIFJFTU9WRSBJTiBQUk9EXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4kKFwiLmpzLUxvZ2luLWZvcm0tc3VibWl0LWJ0blwiKS5jbGljayhmdW5jdGlvbihlKSB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdChlKVxyXG4gIGlmKHZhbGlkVXNlciAmJiBzdGF0ZS5wYXNzV29yZCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoXCJ0aWNrZXRzLmh0bWxcIik7XHJcbiAgfVxyXG4gIGVsc2UgaWYodmFsaWRVc2VyID09IHRydWUgJiYgc3RhdGUucGFzc1dvcmQgIT0gdHJ1ZSkge1xyXG4gICAgJChcIi5qcy1Mb2dpbi1wYXNzd29yZC10b2dnbGVcIikucmVtb3ZlQ2xhc3MoXCJqcy1Mb2dpbi1xdWVzdGlvbi1pY29uXCIpLmFkZENsYXNzKFwianMtTG9naW4tZXJyb3ItaWNvblwiKVxyXG4gICAgJChcIi5qcy1Mb2dpbi1oZWFkZXJcIikuYWRkQ2xhc3MoXCJMb2dpbi1oZWFkZXItLWVycm9yXCIpLmh0bWwoXCJJbmxvZ2duaW5nZW4gbWlzc2x5Y2thZGVzXCIpXHJcbiAgICAkKFwiLmpzLUxvZ2luLWlucHV0LXBhc3N3b3JkXCIpLmFkZENsYXNzKFwianMtTG9naW4taW5wdXQtZXJyb3JcIilcclxuICAgICQoXCIuanMtTG9naW4tcGFzc3dvcmQtbWVzc2FnZVwiKS5zaG93KCkuaHRtbChwYXNzd29yZE1lc3NhZ2UpXHJcbiAgfVxyXG4gIGVsc2Uge1xyXG4gICAgJChcIi5qcy1Mb2dpbi1oZWFkZXJcIikuYWRkQ2xhc3MoXCJMb2dpbi1oZWFkZXItLWVycm9yXCIpLmh0bWwoXCJJbmxvZ2duaW5nZW4gbWlzc2x5Y2thZGVzXCIpXHJcbiAgICAkKFwiLmpzLUxvZ2luLWlucHV0LXBhc3N3b3JkXCIpLmFkZENsYXNzKFwianMtTG9naW4taW5wdXQtZXJyb3JcIilcclxuICAgICQoXCIuanMtTG9naW4tdXNlcm5hbWUtdG9nZ2xlXCIpLnJlbW92ZUNsYXNzKFwianMtTG9naW4tcXVlc3Rpb24taWNvblwiKS5yZW1vdmVDbGFzcyhcImpzLUxvZ2luLWNoZWNrLWljb25cIikuYWRkQ2xhc3MoXCJqcy1Mb2dpbi1lcnJvci1pY29uXCIpXHJcbiAgICAkKFwiLmpzLUxvZ2luLXBhc3N3b3JkLXRvZ2dsZVwiKS5yZW1vdmVDbGFzcyhcImpzLUxvZ2luLXF1ZXN0aW9uLWljb25cIikuYWRkQ2xhc3MoXCJqcy1Mb2dpbi1lcnJvci1pY29uXCIpXHJcbiAgICAkKFwiLmpzLUxvZ2luLXVzZXJuYW1lLW1lc3NhZ2VcIikuc2hvdygpLmh0bWwodXNlck5hbWVNZXNzYWdlKVxyXG4gICAgJChcIi5qcy1Mb2dpbi1wYXNzd29yZC1tZXNzYWdlXCIpLnNob3coKS5odG1sKHBhc3N3b3JkTWVzc2FnZSlcclxuICB9XHJcbn0pO1xyXG4iLCJ2YXIgJGxvZ2luQ29va2llID0gXCJUamVuYSB0amFiYmEhXCI7IC8vIEVyc8OkdHQgbWVkIHZhZCBpbmxvZ2duaW5nc2tha2FuIG51IGhldGVyXHJcbiQoXCIuanMtUHJvbW8tY29ycmVjdC10aWNrZXQtYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuICBpZiAoZG9jdW1lbnQuY29va2llLmluZGV4T2YoJGxvZ2luQ29va2llKSA9PSAtMSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgJChcIi5qcy1Mb2dpbi1oZWFkZXJcIikuaHRtbChcIkxvZ2dhIGluIGbDtnIgYXR0IHLDpHR0YSBkaW4gbG90dFwiKVxyXG4gICAgJChcIi5qcy1TaXRlLWNvbnRhaW5lclwiKS50b2dnbGVDbGFzcyhcImxvY2tlZFwiKTtcclxuICAgICQoXCIuanMtTG9naW4tb3ZlcmxheS1jb250YWluZXJcIikuZmFkZUluKFwiZmFzdFwiKTtcclxuICB9XHJcbn0pXHJcbiIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vLyBDaGVjayBpZiBDb29raWUgaXMgc2V0XHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5pZiAoZG9jdW1lbnQuY29va2llLmluZGV4T2YoXCJfZ2FcIikgPT0gLTEpIHtcclxuICAgJChcIi5qcy1Db29raWUtY29udGFpbmVyXCIpLnNob3coKVxyXG59XHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vLyBBcHByb3ZlIGhpZGUgY29va2llIGluZm9cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiQoXCIuanMtQ29va2llcy1hcHByb3ZlLWJ0blwiKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgJChcIi5qcy1Db29raWUtY29udGFpbmVyXCIpLmZhZGVPdXQoXCJmYXN0XCIpO1xyXG59KVxyXG4iLCIkKFwiLmpzLUNob2ljZXMtb3RoZXJzLXJlYWRtb3JlXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICQodGhpcykubmV4dCgpLnNsaWRlVG9nZ2xlKCk7XHJcbn0pXHJcbiIsIiIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vLyBUT0dHTEUgTUVOVSBPUEVOXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4kKFwiLmpzLU1lbnUtbGV2ZWwtb25lLWhlYWRlclwiKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAkKHRoaXMpLm5leHQoKS5zbGlkZVRvZ2dsZSgpO1xyXG4gICQodGhpcykudG9nZ2xlQ2xhc3MoXCJjaGlsZHJlbi1vcGVuXCIpO1xyXG59KVxyXG4iLCIkKFwiLmpzLUluZm9ybWF0aW9uLXRvZ2dsZS1tYWlsXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICQoXCIuanMtSW5mb3JtYXRpb24taGVscC1ib3gtLW1haWxcIikuc2xpZGVUb2dnbGUoKVxyXG59KVxyXG4kKFwiLmpzLUluZm9ybWF0aW9uLXRvZ2dsZS1waG9uZVwiKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAkKFwiLmpzLUluZm9ybWF0aW9uLWhlbHAtYm94LS1waG9uZVwiKS5zbGlkZVRvZ2dsZSgpXHJcbn0pXHJcbiQoXCIuanMtSW5mb3JtYXRpb24tdG9nZ2xlLW1vYmlsZVwiKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAkKFwiLmpzLUluZm9ybWF0aW9uLWhlbHAtYm94LS1tb2JpbGVcIikuc2xpZGVUb2dnbGUoKVxyXG59KVxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8gT24gaW5wdXQgJiBzZWxlY3RcclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbnZhciAkaW5mb3JtYXRpb25JbnB1dCA9ICQoXCIuanMtSW5mb3JtYXRpb24taW5wdXRcIik7XHJcbnZhciAkaW5mb3JtYXRpb25TZWxlY3QgPSAkKFwiLmpzLUluZm9ybWF0aW9uLXNlbGVjdFwiKTtcclxudmFyICRpbml0SW5mbyA9IFtdXHJcbnZhciAkaW5pdFNlbGVjdCA9IFtdXHJcbnZhciAkaW5mb1JlZ3JldEJ0biA9ICQoXCIuanMtSW5mb3JtYXRpb24tcmVncmV0LWJ0blwiKTtcclxudmFyICRpbmZvU2F2ZUNvbnRhaW5lciA9ICQoXCIuanMtSW5mb3JtYXRpb24tc2F2ZS1jb250YWluZXJcIik7XHJcbiRpbmZvcm1hdGlvbklucHV0LmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgJGluaXRJbmZvLnB1c2goJCh0aGlzKS52YWwoKSlcclxufSlcclxuJGluZm9ybWF0aW9uU2VsZWN0LmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgJGluaXRTZWxlY3QucHVzaCgkKHRoaXMpLnZhbCgpKVxyXG59KVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlU2F2ZUNvbnRhaW5lcigpIHtcclxuICBpZigkaW5mb1NhdmVDb250YWluZXIuaGFzQ2xhc3MoXCJpcy12aXNpYmxlXCIpID09IGZhbHNlKSB7XHJcbiAgICAkaW5mb1NhdmVDb250YWluZXIuYWRkQ2xhc3MoXCJpcy12aXNpYmxlXCIpXHJcbiAgfVxyXG59XHJcbiRpbmZvcm1hdGlvbklucHV0Lm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xyXG4gIHRvZ2dsZVNhdmVDb250YWluZXIoKTtcclxufSlcclxuJGluZm9ybWF0aW9uU2VsZWN0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICB0b2dnbGVTYXZlQ29udGFpbmVyKCk7XHJcbn0pXHJcbiRpbmZvUmVncmV0QnRuLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICRpbmZvcm1hdGlvbklucHV0LmVhY2goZnVuY3Rpb24oaSkge1xyXG4gICAgJGluZm9ybWF0aW9uSW5wdXRbaV0udmFsdWUgPSAkaW5pdEluZm9baV1cclxuICB9KVxyXG4gICRpbmZvcm1hdGlvblNlbGVjdC5lYWNoKGZ1bmN0aW9uKGkpIHtcclxuICAgICRpbmZvcm1hdGlvblNlbGVjdFtpXS52YWx1ZSA9ICRpbml0U2VsZWN0W2ldXHJcbiAgfSlcclxuICAkaW5mb1NhdmVDb250YWluZXIucmVtb3ZlQ2xhc3MoXCJpcy12aXNpYmxlXCIpXHJcbn0pXHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8gT20gZsOkbHQgw6RyIHRvbXQgdmlkIHNwYXJhLWtsaWNrIHNjcm9sbGEgZGl0XHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbnZhciAkc2F2ZUJ1dHRvbiA9ICQoXCIuanMtSW5mb3JtYXRpb24tc2F2ZS1idG5cIik7XHJcbnZhciAkaW5mb0Zvcm0gPSAkKFwiLmpzLUluZm9ybWF0aW9uLWZvcm1cIik7XHJcbnZhciAkaW5mb0ZpZWxkUmVxdWlyZWQgPSAkKFwiLmpzLUluZm9ybWF0aW9uLWZpZWxkLXJlcXVpcmVkXCIpO1xyXG52YXIgbWFpbFJlZ2V4ID0gL15bYS16QS1aMC05LiEjJCUm4oCZKisvPT9eX2B7fH1+LV0rQFthLXpBLVowLTktXSsoPzpcXC5bYS16QS1aMC05LV0rKSokLztcclxuXHJcbiRpbmZvRmllbGRSZXF1aXJlZC5jbGljayhmdW5jdGlvbigpIHtcclxuICAkKHRoaXMpLnRvZ2dsZUNsYXNzKFwiaXMtdmlzaWJsZVwiKTtcclxufSlcclxudmFyIGZvcm1WYWxpZDtcclxuXHJcbiRzYXZlQnV0dG9uLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuIGZvcm1WYWxpZCA9IHRydWU7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICRpbmZvcm1hdGlvbklucHV0LmVhY2goZnVuY3Rpb24oaSkge1xyXG4gICAgaWYobWFpbFJlZ2V4LnRlc3QoJCh0aGlzKS52YWwoKSkgPT09IGZhbHNlICYmICQodGhpcykuYXR0cihcInR5cGVcIik9PT1cImVtYWlsXCIpIHtcclxuICAgICAgZm9ybVZhbGlkID0gZmFsc2U7XHJcbiAgICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoeyBzY3JvbGxUb3A6ICQodGhpcykub2Zmc2V0KCkudG9wIC0gMTI1IH0sIDYwMCk7XHJcbiAgICAgICQodGhpcykuZm9jdXMoKVxyXG4gICAgICAkKHRoaXMpLm5leHQoKS5hZGRDbGFzcyhcImlzLXZpc2libGVcIik7XHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG4gIH0pXHJcbiAgaWYoZm9ybVZhbGlkKSB7XHJcbiAgICAkaW5mb0Zvcm0uc3VibWl0KCk7XHJcbiAgfVxyXG59KVxyXG4iLCIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8gSEVBREVSIFNMSURFIERPV05cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbnZhciBwcmV2aW91c1RvcCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxudmFyIGhlYWRlckNvbnRhaW5lciA9ICQoXCIuanMtSGVhZGVyLWNvbnRhaW5lclwiKTtcclxudmFyIGhlYWRlclNsaWRlRG93biA9IGZ1bmN0aW9uKCkge1xyXG4gIC8vIGNvbnNvbGUubG9nKFwia2FsbGFzIHDDpSFcIik7XHJcbiAgLy8gY29uc29sZS5sb2cod2luZG93LnBhZ2VZT2Zmc2V0KTtcclxuICAvLyBjb25zb2xlLmxvZyh3aW5kb3cucGFnZVlPZmZzZXQpO1xyXG4gIGlmKHdpbmRvdy5wYWdlWU9mZnNldCA+IDApIHsgLy8gPC0tIE1hbiDDpHIgaW50ZSBow7Znc3QgdXBwIHDDpSBzaWRhblxyXG4gICAgdmFyIGN1cnJlbnRPZmZUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgICBpZihjdXJyZW50T2ZmVG9wID4gcHJldmlvdXNUb3AgJiYgd2luZG93LnBhZ2VZT2Zmc2V0ID4gMTMwKSB7XHJcbiAgICAgICAgaGVhZGVyQ29udGFpbmVyLmFkZENsYXNzKFwiaXMtaGlkZGVuXCIpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBoZWFkZXJDb250YWluZXIucmVtb3ZlQ2xhc3MoXCJpcy1oaWRkZW5cIilcclxuICAgIH1cclxuICAgIHByZXZpb3VzVG9wID0gY3VycmVudE9mZlRvcDtcclxuICB9IGVsc2Uge1xyXG4gICAgaGVhZGVyQ29udGFpbmVyLnJlbW92ZUNsYXNzKFwiaXMtaGlkZGVuXCIpXHJcbiAgfVxyXG59XHJcbiQod2luZG93KS5vbignc2Nyb2xsJyxfLnRocm90dGxlKGhlYWRlclNsaWRlRG93biwgMTAwKSk7XHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vLyBBTEwgVEhFIE9USEVSIFNUVUZGXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4kKFwiLmpzLUhlYWRlci1jb3JyZWN0LWJ0blwiKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAkKFwiLmpzLUxvZ2luLWhlYWRlclwiKS5odG1sKFwiTG9nZ2EgaW4gZsO2ciBhdHQgcsOkdHRhIGRpbiBsb3R0XCIpXHJcbiAgJChcIi5qcy1TaXRlLWNvbnRhaW5lclwiKS50b2dnbGVDbGFzcyhcImxvY2tlZFwiKTtcclxuICAkKFwiLmpzLUxvZ2luLW92ZXJsYXktY29udGFpbmVyXCIpLmZhZGVJbihcImZhc3RcIik7XHJcbiAgaWYoJChcIi5qcy1NZW51LWNvbnRhaW5lclwiKS5oYXNDbGFzcyhcIk1lbnUtLW9wZW5cIikpIHtcclxuICAgICAgdG9nZ2xlTWVudSgpO1xyXG4gIH1cclxufSlcclxuLy9cclxuJChcIi5qcy1IZWFkZXItcHJvZmlsZSwgLmpzLU9wZW4tbG9naW4sIC5qcy1DYW1wYWlnbi1mb3JtLWxvZ2luXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICQoXCIuanMtTG9naW4taGVhZGVyXCIpLmh0bWwoXCJMb2dnYSBpbiBww6UgTWluIFNpZGFcIilcclxuICAkKFwiLmpzLVNpdGUtY29udGFpbmVyXCIpLnRvZ2dsZUNsYXNzKFwibG9ja2VkXCIpO1xyXG4gICQoXCIuanMtTG9naW4tb3ZlcmxheS1jb250YWluZXJcIikuZmFkZUluKFwiZmFzdFwiKTtcclxuICAgIGlmKCQoXCIuanMtTWVudS1jb250YWluZXJcIikuaGFzQ2xhc3MoXCJNZW51LS1vcGVuXCIpKSB7XHJcbiAgICAgICAgdG9nZ2xlTWVudSgpO1xyXG4gICAgfVxyXG59KVxyXG5cclxuJChcIi5qcy1IZWFkZXItbWVudS1jb250YWluZXJcIikuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgdG9nZ2xlTWVudSgpXHJcbn0pO1xyXG5cclxuXHJcbiQoXCIuanMtTWVudS1vdmVybGF5XCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gIHRvZ2dsZU1lbnUoKVxyXG59KVxyXG5cclxudmFyIG1lbnVUZXh0ID0gJChcIi5qcy1IZWFkZXItdGl0bGUtLW1lbnVcIik7XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVNZW51KCkge1xyXG4gICQoXCIuanMtTWVudS1jb250YWluZXJcIikudG9nZ2xlQ2xhc3MoXCJNZW51LS1vcGVuXCIpXHJcbiAgJChcIi5qcy1TaXRlLWNvbnRhaW5lclwiKS50b2dnbGVDbGFzcyhcImxvY2tlZFwiKVxyXG4gICQoXCIuanMtSGVhZGVyLW1lbnUtY29udGFpbmVyXCIpLnRvZ2dsZUNsYXNzKFwiQnVyZ2VyLS1vcGVuXCIpO1xyXG5cclxuICBpZihtZW51VGV4dC50ZXh0KCkgPT0gXCJNZW55XCIpIHtcclxuICAgICAgbWVudVRleHQudGV4dChcIlN0w6RuZ1wiKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBtZW51VGV4dC50ZXh0KFwiTWVueVwiKVxyXG4gIH1cclxufVxyXG4iLCIvLyB2YXIgJHBuID0gJChcIi5wZXJzb24tbnVtYmVyXCIpO1xyXG4vLyB2YXIgJHBuSW5wdXQ7XHJcbi8vXHJcbi8vICRwbi5mb2N1cyhmdW5jdGlvbihlKSB7XHJcbi8vICAgdmFyICRwbklucHV0ID0gJCgnW2RhdGEtaWQ9XCJwZXJzb24tbnVtYmVyXCJdJylbMF07XHJcbi8vICAgLy8gJHBuSW5wdXQuZm9jdXMoKTtcclxuLy8gICAkcG5JbnB1dC5zZXRTZWxlY3Rpb25SYW5nZSgwLDEpO1xyXG4vLyAgICRwbklucHV0Lm9uQ2hhbmdlKGZ1bmN0aW9uKCkge1xyXG4vLyAgICAgY29uc29sZS5sb2coXCJoZWpzYW5cIik7XHJcbi8vICAgfSlcclxuLy9cclxuLy9cclxuLy8gfSlcclxuIiwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8vIFNtb290aCBTY3JvbGxpbmdcclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiQoZnVuY3Rpb24oKSB7XHJcbiAgJCgnYVtocmVmKj1cIiNcIl06bm90KFtocmVmPVwiI1wiXSknKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgIGlmIChsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgPT0gdGhpcy5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgJiYgbG9jYXRpb24uaG9zdG5hbWUgPT0gdGhpcy5ob3N0bmFtZSkge1xyXG4gICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzLmhhc2gpO1xyXG4gICAgICB0YXJnZXQgPSB0YXJnZXQubGVuZ3RoID8gdGFyZ2V0IDogJCgnW25hbWU9JyArIHRoaXMuaGFzaC5zbGljZSgxKSArJ10nKTtcclxuICAgICAgaWYgKHRhcmdldC5sZW5ndGgpIHtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICBzY3JvbGxUb3A6IHRhcmdldC5vZmZzZXQoKS50b3AgLSAxNjVcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pOyBcclxufSk7XHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vLyBMw4RTIE1FUiBPTSBWSU5TVEVSXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4kKFwiLmpzLVByaWNlcy1yZWFkbW9yZVwiKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAkKHRoaXMpLm5leHQoKS5zbGlkZVRvZ2dsZSgpO1xyXG59KVxyXG4iLCIkKFwiLmpzLUNhbXBhaWduLW9wZW4tdGVybXNcIikuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgJChcIi5qcy1DYW1wYWlnbi10ZXJtcy1jb250YWluZXJcIikuZmFkZUluKFwiZmFzdFwiKTtcclxuICAkKFwiLmpzLVNpdGUtY29udGFpbmVyXCIpLnRvZ2dsZUNsYXNzKFwibG9ja2VkXCIpO1xyXG59KVxyXG5cclxuXHJcbiQoXCIuanMtQ2FtcGFpZ24taGVyby1wcm9kdWN0cy1pbWdcIikuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgJChcIi5qcy1DYW1wYWlnbi1vdmVybGF5LWNvbnRhaW5lclwiKS5mYWRlSW4oXCJmYXN0XCIpO1xyXG4gICQoXCIuanMtU2l0ZS1jb250YWluZXJcIikudG9nZ2xlQ2xhc3MoXCJsb2NrZWRcIik7XHJcbn0pO1xyXG5cclxuJChcIi5qcy1DYW1wYWlnbi1jbGlja2FyZWEsIC5qcy1DYW1wYWlnbi1jbG9zZS1mb3JtXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICQoXCIuanMtQ2FtcGFpZ24tb3ZlcmxheS1jb250YWluZXJcIikuZmFkZU91dChcImZhc3RcIik7XHJcbiAgJChcIi5qcy1DYW1wYWlnbi10ZXJtcy1jb250YWluZXJcIikuZmFkZU91dChcImZhc3RcIik7XHJcbiAgJChcIi5qcy1TaXRlLWNvbnRhaW5lclwiKS50b2dnbGVDbGFzcyhcImxvY2tlZFwiKTtcclxufSlcclxuIiwiZnVuY3Rpb24gbW9iaWxlU2Nyb2xsKGRpc3RhbmNlLGRlbGF5KSB7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgICBzY3JvbGxUb3A6IGRpc3RhbmNlXHJcbiAgICAgIH0sIDQwMCk7XHJcbiB9LCBkZWxheSk7XHJcbn1cclxuIGlmICgkLmNvbnRhaW5zKGRvY3VtZW50LCAkKFwiI1N1Ym1lbnVBbmNob3JcIilbMF0pICYmICQuY29udGFpbnMoZG9jdW1lbnQsICQoXCIjYW5jaG9yXCIpWzBdKSA9PT0gZmFsc2UgJiYgKCQod2luZG93KS53aWR0aCgpIDwgNzY4KSkge1xyXG4gICBtb2JpbGVTY3JvbGwoJChcIiNTdWJtZW51QW5jaG9yXCIpLm9mZnNldCgpLnRvcCw4MDApXHJcbiB9IGVsc2UgaWYgKCQuY29udGFpbnMoZG9jdW1lbnQsICQoXCIjU3VibWVudUFuY2hvclwiKVswXSkgJiYgJC5jb250YWlucyhkb2N1bWVudCwgJChcIiNhbmNob3JcIilbMF0pICYmICgkKHdpbmRvdykud2lkdGgoKSA8IDc2OCkpIHtcclxuICAgbW9iaWxlU2Nyb2xsKCQoXCIjU3VibWVudUFuY2hvclwiKS5vZmZzZXQoKS50b3AgKyAkKFwiI1N1Ym1lbnVBbmNob3JcIikuaGVpZ2h0KCksODAwKVxyXG4gfVxyXG4iLCJ9KTtcclxuLy8gRW5kIGpRdWVyeVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
