$(".Site-container").click(function() {
  console.log("oirgin");
})


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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvZ2luLmpzIiwiTWVudS5qcyIsIk1lbnUtcm93LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKFwiLlNpdGUtY29udGFpbmVyXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICBjb25zb2xlLmxvZyhcIm9pcmdpblwiKTtcbn0pXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gLy8gQ0xPU0UgTU9EQUxcbiAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuJChcIi5Mb2dpbi1jbGlja2FyZWEtLWpzLCAuTG9naW4tY2xvc2UtZm9ybS0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuTG9naW4tb3ZlcmxheS1jb250YWluZXJcIikuZmFkZU91dChcImZhc3RcIilcbn0pXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuIC8vIFNMSURFVE9HR0xFIFRIRSBIRUxQQk9YRVNcbiAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuJChcIi5Mb2dpbi11c2VybmFtZS10b2dnbGUtLWpzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKFwiLkxvZ2luLXVzZXJuYW1lLWhlbHAtYm94LS1qc1wiKS5zbGlkZVRvZ2dsZSgpO1xufSk7XG5cbiQoXCIuTG9naW4tcGFzc3dvcmQtdG9nZ2xlLS1qc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5Mb2dpbi1wYXNzd29yZC1oZWxwLWJveC0tanNcIikuc2xpZGVUb2dnbGUoKTtcbn0pO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFNUQVRFIE9GIFRIRSBGT1JNXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnZhciBzdGF0ZSA9IHtcbiAgdXNlck5hbWU6IGZhbHNlLCAvLyBJUyBDVVNUT01FUk5VTUJFUiBPUiBFTUFJTCBPS1xuICBwYXNzV29yZDogZmFsc2UsXG4gIGVtYWlsUmVnOiBmYWxzZSxcbiAgbnVtYmVyUmVnOiBmYWxzZVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFVTRVJOQU1FIENIRUNLXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgLy8gUkVHRVggbWFpbC5cbnZhciBlbWFpbFJlZyA9IG5ldyBSZWdFeHAoL14oKFwiW1xcdy1cXHNdK1wiKXwoW1xcdy1dKyg/OlxcLltcXHctXSspKil8KFwiW1xcdy1cXHNdK1wiKShbXFx3LV0rKD86XFwuW1xcdy1dKykqKSkoQCgoPzpbXFx3LV0rXFwuKSpcXHdbXFx3LV17MCw2Nn0pXFwuKFthLXpdezIsNn0oPzpcXC5bYS16XXsyfSk/KSQpfChAXFxbPygoMjVbMC01XVxcLnwyWzAtNF1bMC05XVxcLnwxWzAtOV17Mn1cXC58WzAtOV17MSwyfVxcLikpKCgyNVswLTVdfDJbMC00XVswLTldfDFbMC05XXsyfXxbMC05XXsxLDJ9KVxcLil7Mn0oMjVbMC01XXwyWzAtNF1bMC05XXwxWzAtOV17Mn18WzAtOV17MSwyfSlcXF0/JCkvaSk7XG4gIC8vIFJFR0VYIHVzZXIgbnVtYmVyLlxudmFyIHVzZXJOdW1iZXJSZWcgPSBuZXcgUmVnRXhwKCdeW2EtekEtWl17Mn1bMC05XXs2fSQnKTtcbnZhciB2YWxpZFVzZXI7XG52YXIgdXNlck5hbWVNZXNzYWdlID0gXCJEdSBoYXIgaW50ZSBhbmdpdmV0IGV0dCBrb3JyZWt0IGt1bmRudW1tZXIgZWxsZXIgZS1wb3N0YWRyZXNzLlwiO1xudmFyIHBhc3N3b3JkTWVzc2FnZSA9IFwiRmVsYWt0aWd0IGzDtnNlbm9yZC5cIjtcblxuLy8gSU5QVVQgRklFTEQgQ0hBTkdFXG4kKCcuTG9naW4taW5wdXQtdXNlcm5hbWUtLWpzJykub24oJ2lucHV0JywgZnVuY3Rpb24oKSB7XG5cbiAgICBpZihlbWFpbFJlZy50ZXN0KCQodGhpcykudmFsKCkpICkge1xuICAgICAgc3RhdGUuZW1haWxSZWcgPSB0cnVlO1xuICAgICAgc3RhdGUubnVtYmVyUmVnID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmKHVzZXJOdW1iZXJSZWcudGVzdCgkKHRoaXMpLnZhbCgpICkpIHtcbiAgICAgIHN0YXRlLm51bWJlclJlZyA9IHRydWU7XG4gICAgICBzdGF0ZS5lbWFpbFJlZyA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5udW1iZXJSZWcgPSBmYWxzZTtcbiAgICAgIHN0YXRlLmVtYWlsUmVnID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFsaWRVc2VyID0gc3RhdGUubnVtYmVyUmVnIHx8IHN0YXRlLmVtYWlsUmVnO1xuICAgICAgaWYgKHZhbGlkVXNlcikge1xuICAgICAgICBzdGF0ZS51c2VyTmFtZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc3RhdGUudXNlck5hbWUgPSBmYWxzZTtcbiAgICAgIH1cbn0pO1xuXG4vLyBXSEVOIElOUFVUIElTIERPTkUgV0lUSCBUSEUgRklFTERcbiQoJy5Mb2dpbi1pbnB1dC11c2VybmFtZS0tanMnKS5mb2N1c291dChmdW5jdGlvbigpIHtcbiAgLy8gY29uc29sZS5sb2coXCJJTlBVVCBOT1QgSU4gRk9DVVMgQU5ZIE1PUkVcIik7XG4gIGlmKHN0YXRlLnVzZXJOYW1lID09IGZhbHNlKSB7XG4gICAgJChcIi5Mb2dpbi11c2VybmFtZS10b2dnbGUtLWpzXCIpLnJlbW92ZUNsYXNzKFwiTG9naW4tcXVlc3Rpb24taWNvbi0tanNcIikucmVtb3ZlQ2xhc3MoXCJMb2dpbi1jaGVjay1pY29uLS1qc1wiKS5hZGRDbGFzcyhcIkxvZ2luLWVycm9yLWljb24tLWpzXCIpXG4gICAgJCh0aGlzKS5hZGRDbGFzcyhcIkxvZ2luLWlucHV0LWVycm9yLS1qc1wiKVxuICAgICQoXCIuTG9naW4tdXNlcm5hbWUtbWVzc2FnZVwiKS5zaG93KCkuaHRtbCh1c2VyTmFtZU1lc3NhZ2UpXG5cbiAgfSBlbHNlIHtcbiAgICAkKFwiLkxvZ2luLXVzZXJuYW1lLXRvZ2dsZS0tanNcIikucmVtb3ZlQ2xhc3MoXCJMb2dpbi1xdWVzdGlvbi1pY29uLS1qc1wiKS5yZW1vdmVDbGFzcyhcIkxvZ2luLWVycm9yLWljb24tLWpzXCIpLmFkZENsYXNzKFwiTG9naW4tY2hlY2staWNvbi0tanNcIilcbiAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiTG9naW4taW5wdXQtZXJyb3ItLWpzXCIpXG4gICAgJChcIi5Mb2dpbi11c2VybmFtZS1tZXNzYWdlXCIpLmhpZGUoKS5odG1sKFwiXCIpXG4gIH1cblxuICAvLyBXSElDSCBCT1ggU0hPVUxEIFNIT1dcbiAgaWYoc3RhdGUuZW1haWxSZWcpIHtcbiAgICBwYXNzd29yZEJveChcInJlc2V0XCIpXG4gICAgJChcIi5Mb2dpbi1yZXNldC1lbWFpbC0tanNcIikuaHRtbCgkKCcuTG9naW4taW5wdXQtdXNlcm5hbWUtLWpzJykudmFsKCkpIC8vIFNFVCBUSEUgRU1BSUwgSU4gVEhFIE1FU1NBR0UgVE8gV0hBVEVWRVIgSVQgSVMgSU4gVEhFIElOUFVUIElGIElUIElTIFZBTElEXG4gIH0gZWxzZSB7XG4gICAgcGFzc3dvcmRCb3goXCJkZWZhdWx0XCIpXG4gIH1cbn0pXG5cbiQoXCIuTG9naW4tcmVzZXQtcGFzc3dvcmQtYnRuLS1qc1wiKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIHBhc3N3b3JkQm94KFwic2VudFwiKVxufSlcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBQQVNTV09SRCBIRUxQIEJPWFxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5mdW5jdGlvbiBwYXNzd29yZEJveChib3gpIHtcbiAgaWYoYm94ID09IFwicmVzZXRcIikge1xuICAgICQoXCIuTG9naW4tcGFzc3dvcmQtcmVzZXQtYm94LS1qc1wiKS5zaG93KCk7XG4gICAgJChcIi5Mb2dpbi1wYXNzd29yZC1zZW50LWJveC0tanMsIC5Mb2dpbi1wYXNzd29yZC1kZWZhdWx0LWJveC0tanNcIikuaGlkZSgpO1xuICB9IGVsc2UgaWYoYm94ID09IFwic2VudFwiKSB7XG4gICAgJChcIi5Mb2dpbi1wYXNzd29yZC1yZXNldC1ib3gtLWpzLCAuTG9naW4tcGFzc3dvcmQtZGVmYXVsdC1ib3gtLWpzXCIpLmhpZGUoKTtcbiAgICAkKFwiLkxvZ2luLXBhc3N3b3JkLXNlbnQtYm94LS1qc1wiKS5zaG93KCk7XG4gIH0gZWxzZSBpZihib3ggPT0gXCJkZWZhdWx0XCIpIHtcbiAgICAkKFwiLkxvZ2luLXBhc3N3b3JkLXNlbnQtYm94LS1qcywgLkxvZ2luLXBhc3N3b3JkLXJlc2V0LWJveC0tanNcIikuaGlkZSgpO1xuICAgICQoXCIuTG9naW4tcGFzc3dvcmQtZGVmYXVsdC1ib3gtLWpzXCIpLnNob3coKTtcbiAgfVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFBBU1NXT1JEIElOUFVUIEZJRUxEXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuJChcIi5Mb2dpbi1pbnB1dC1wYXNzd29yZC0tanNcIikub24oJ2lucHV0JywgZnVuY3Rpb24oKSB7XG4gIGlmKCQodGhpcykudmFsKCkgPT0gXCJrb21iaVwiKSB7XG4gICAgc3RhdGUucGFzc1dvcmQgPSB0cnVlXG4gIH0gZWxzZSB7XG4gICAgc3RhdGUucGFzc1dvcmQgPSBmYWxzZVxuICB9XG4gICAgaWYoc3RhdGUucGFzc1dvcmQgIT0gdHJ1ZSkge1xuICAgICAgJChcIi5Mb2dpbi1wYXNzd29yZC1tZXNzYWdlXCIpLmhpZGUoKTtcbiAgICB9XG4gICAgaWYoJCh0aGlzKS5oYXNDbGFzcyhcIkxvZ2luLWlucHV0LWVycm9yLS1qc1wiKSkge1xuICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcIkxvZ2luLWlucHV0LWVycm9yLS1qc1wiKVxuICAgICAgJChcIi5Mb2dpbi1wYXNzd29yZC10b2dnbGUtLWpzXCIpLnJlbW92ZUNsYXNzKFwiTG9naW4tZXJyb3ItaWNvbi0tanNcIikuYWRkQ2xhc3MoXCJMb2dpbi1xdWVzdGlvbi1pY29uLS1qc1wiKVxuICAgIH1cbiB9KTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gQ0hFQ0sgSUYgTE9HSU4gUEFTU0VEIChKVVNUIEZPUiBQUk9UT1RZUEUgVEVTVElORylcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuJChcIi5Mb2dpbi1mb3JtLXN1Ym1pdC1idG4tLWpzXCIpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdChlKVxuICBpZih2YWxpZFVzZXIgJiYgc3RhdGUucGFzc1dvcmQpIHtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShcImFjY291bnQuaHRtbFwiKTtcbiAgfVxuICBlbHNlIGlmKHZhbGlkVXNlciA9PSB0cnVlICYmIHN0YXRlLnBhc3NXb3JkICE9IHRydWUpIHtcbiAgICAkKFwiLkxvZ2luLXBhc3N3b3JkLXRvZ2dsZS0tanNcIikucmVtb3ZlQ2xhc3MoXCJMb2dpbi1xdWVzdGlvbi1pY29uLS1qc1wiKS5hZGRDbGFzcyhcIkxvZ2luLWVycm9yLWljb24tLWpzXCIpXG4gICAgJChcIi5Mb2dpbi1oZWFkZXItLWpzXCIpLmFkZENsYXNzKFwiTG9naW4taGVhZGVyLS1lcnJvclwiKS5odG1sKFwiSW5sb2dnbmluZ2VuIG1pc3NseWNrYWRlc1wiKVxuICAgICQoXCIuTG9naW4taW5wdXQtcGFzc3dvcmQtLWpzXCIpLmFkZENsYXNzKFwiTG9naW4taW5wdXQtZXJyb3ItLWpzXCIpXG4gICAgJChcIi5Mb2dpbi1wYXNzd29yZC1tZXNzYWdlXCIpLnNob3coKS5odG1sKHBhc3N3b3JkTWVzc2FnZSlcbiAgfVxuICBlbHNlIHtcbiAgICAkKFwiLkxvZ2luLWhlYWRlci0tanNcIikuYWRkQ2xhc3MoXCJMb2dpbi1oZWFkZXItLWVycm9yXCIpLmh0bWwoXCJJbmxvZ2duaW5nZW4gbWlzc2x5Y2thZGVzXCIpXG4gICAgJChcIi5Mb2dpbi1pbnB1dC1wYXNzd29yZC0tanNcIikuYWRkQ2xhc3MoXCJMb2dpbi1pbnB1dC1lcnJvci0tanNcIilcbiAgICAkKFwiLkxvZ2luLXVzZXJuYW1lLXRvZ2dsZS0tanNcIikucmVtb3ZlQ2xhc3MoXCJMb2dpbi1xdWVzdGlvbi1pY29uLS1qc1wiKS5yZW1vdmVDbGFzcyhcIkxvZ2luLWNoZWNrLWljb24tLWpzXCIpLmFkZENsYXNzKFwiTG9naW4tZXJyb3ItaWNvbi0tanNcIilcbiAgICAkKFwiLkxvZ2luLXBhc3N3b3JkLXRvZ2dsZS0tanNcIikucmVtb3ZlQ2xhc3MoXCJMb2dpbi1xdWVzdGlvbi1pY29uLS1qc1wiKS5hZGRDbGFzcyhcIkxvZ2luLWVycm9yLWljb24tLWpzXCIpXG4gICAgJChcIi5Mb2dpbi11c2VybmFtZS1tZXNzYWdlXCIpLnNob3coKS5odG1sKHVzZXJOYW1lTWVzc2FnZSlcbiAgICAkKFwiLkxvZ2luLXBhc3N3b3JkLW1lc3NhZ2VcIikuc2hvdygpLmh0bWwocGFzc3dvcmRNZXNzYWdlKVxuICB9XG59KTtcbiIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gVE9HR0xFIE1FTlUgT1BFTlxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbnZhciBtZW51VGV4dCA9ICQoXCIuTWVudS1yb3ctdGl0bGUtdGl0bGVcIik7XG5cbiQoXCIuTWVudS1yb3ctbWVudS0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gIHRvZ2dsZU1lbnUoKTtcbn0pXG5cbiQoXCIuTWVudS1sZXZlbC1vbmUtaGVhZGVyLS1qc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJCh0aGlzKS5uZXh0KCkuc2xpZGVUb2dnbGUoKTtcbiAgJCh0aGlzKS50b2dnbGVDbGFzcyhcImNoaWxkcmVuLW9wZW5cIik7XG59KVxuXG4kKFwiLk1lbnUtb3ZlcmxheS0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gIHRvZ2dsZU1lbnUoKVxufSlcblxuXG5cbmZ1bmN0aW9uIHRvZ2dsZU1lbnUoKSB7XG4gICQoXCIuTWVudS1jb250YWluZXJcIikudG9nZ2xlQ2xhc3MoXCJNZW51LS1vcGVuXCIpXG4gICQoXCIuU2l0ZS1jb250YWluZXJcIikudG9nZ2xlQ2xhc3MoXCJsb2NrZWRcIilcbiAgJChcIi5NZW51LXJvdy1tZW51LS1qc1wiKS50b2dnbGVDbGFzcyhcIkJ1cmdlci0tb3BlblwiKTtcblxuICBpZihtZW51VGV4dC50ZXh0KCkgPT0gXCJtZW55XCIpIHtcbiAgICAgIG1lbnVUZXh0LnRleHQoXCJzdMOkbmcgbWVueVwiKVxuICB9IGVsc2Uge1xuICAgIG1lbnVUZXh0LnRleHQoXCJtZW55XCIpXG4gIH1cbn1cbiIsIlxuJChcIi5Db3JyZWN0LWxvdHRlcnktYnRuLS1qc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5Mb2dpbi1oZWFkZXItLWpzXCIpLmh0bWwoXCJMb2dnYSBpbiBmw7ZyIGF0dCByw6R0dGEgZGluIGxvdHRcIilcbiAgJChcIi5Mb2dpbi1vdmVybGF5LWNvbnRhaW5lclwiKS5mYWRlSW4oXCJmYXN0XCIpO1xuICBpZigkKFwiLk1lbnUtY29udGFpbmVyXCIpLmhhc0NsYXNzKFwiTWVudS0tb3BlblwiKSkge1xuICAgICAgdG9nZ2xlTWVudSgpO1xuICB9XG59KVxuXG4kKFwiLk1lbnUtcm93LXByb2ZpbGUtLWpzLCAuT3Blbi1sb2dpbi0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuTG9naW4taGVhZGVyLS1qc1wiKS5odG1sKFwiTG9nZ2EgaW4gcMOlIE1pbiBTaWRhXCIpXG4gICAgJChcIi5Mb2dpbi1vdmVybGF5LWNvbnRhaW5lclwiKS5mYWRlSW4oXCJmYXN0XCIpO1xuICAgIGlmKCQoXCIuTWVudS1jb250YWluZXJcIikuaGFzQ2xhc3MoXCJNZW51LS1vcGVuXCIpKSB7XG4gICAgICAgIHRvZ2dsZU1lbnUoKTtcbiAgICB9XG59KVxuIl19
