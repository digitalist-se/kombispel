$(".Login-toggle-help--js").click(function() {
  $(this).next().slideToggle();
});


$(".Login-clickarea--js, .Login-close-form--js").click(function() {
  $(".Login-overlay-container").fadeOut("fast");
});

// Set the input state for error.
jQuery.fn.extend({
  setLoginError: function () {
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
$('form[name="Login-form"] input[name="username"]').on('input', function()  {
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
});


$(".Menu-row-menu--js").click(function() {
  $(".Menu-row-burger").toggleClass("Burger--open")
})

$(".Menu-row-profile--js, .Correct-lottery-btn--js").click(function() {
    $(".Login-overlay-container").fadeIn("fast");
})

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvZ2luLmpzIiwiTWVudS1yb3cuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKFwiLkxvZ2luLXRvZ2dsZS1oZWxwLS1qc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJCh0aGlzKS5uZXh0KCkuc2xpZGVUb2dnbGUoKTtcbn0pO1xuXG5cbiQoXCIuTG9naW4tY2xpY2thcmVhLS1qcywgLkxvZ2luLWNsb3NlLWZvcm0tLWpzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKFwiLkxvZ2luLW92ZXJsYXktY29udGFpbmVyXCIpLmZhZGVPdXQoXCJmYXN0XCIpO1xufSk7XG5cbi8vIFNldCB0aGUgaW5wdXQgc3RhdGUgZm9yIGVycm9yLlxualF1ZXJ5LmZuLmV4dGVuZCh7XG4gIHNldExvZ2luRXJyb3I6IGZ1bmN0aW9uICgpIHtcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdMb2dpbi1pbnB1dC1lcnJvci0tanMnKTtcbiAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdMb2dpbi1pbnB1dC1oZWxwLS1qcycpO1xuXG4gICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcuTG9naW4tdG9nZ2xlLS1qcycpLmFkZENsYXNzKCdMb2dpbi10b2dnbGUtZXJyb3ItLWpzJyk7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcuTG9naW4tdG9nZ2xlLS1qcycpLnJlbW92ZUNsYXNzKCdMb2dpbi10b2dnbGUtaGVscC0tanMnKTtcbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy5Mb2dpbi10b2dnbGUtLWpzJykucmVtb3ZlQ2xhc3MoJ0xvZ2luLXRvZ2dsZS12YWxpZC0tanMnKTtcbiAgfVxufSk7XG5cbi8vIFNldCB0aGUgaW5wdXQgc3RhdGUgZm9yIHZhbGlkLlxualF1ZXJ5LmZuLmV4dGVuZCh7XG4gIHNldExvZ2luVmFsaWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdMb2dpbi1pbnB1dC1lcnJvci0tanMnKTtcblxuICAgICQodGhpcykucGFyZW50KCkuZmluZCgnLkxvZ2luLXRvZ2dsZS0tanMnKS5hZGRDbGFzcygnTG9naW4tdG9nZ2xlLXZhbGlkLS1qcycpO1xuICAgICQodGhpcykucGFyZW50KCkuZmluZCgnLkxvZ2luLXRvZ2dsZS0tanMnKS5yZW1vdmVDbGFzcygnTG9naW4tdG9nZ2xlLWhlbHAtLWpzJyk7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcuTG9naW4tdG9nZ2xlLS1qcycpLnJlbW92ZUNsYXNzKCdMb2dpbi10b2dnbGUtZXJyb3ItLWpzJyk7XG4gIH1cbn0pO1xuXG4vLyBTZXQgdGhlIGlucHV0IHN0YXRlIGZvciBoZWxwIChkZWZhdWx0KS5cbmpRdWVyeS5mbi5leHRlbmQoe1xuICBzZXRMb2dpbkhlbHA6IGZ1bmN0aW9uICgpIHtcbiAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdMb2dpbi1pbnB1dC1lcnJvci0tanMnKTtcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdMb2dpbi1pbnB1dC1oZWxwLS1qcycpO1xuXG4gICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcuTG9naW4tdG9nZ2xlLS1qcycpLmFkZENsYXNzKCdMb2dpbi10b2dnbGUtaGVscC0tanMnKTtcbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy5Mb2dpbi10b2dnbGUtLWpzJykucmVtb3ZlQ2xhc3MoJ0xvZ2luLXRvZ2dsZS12YWxpZC0tanMnKTtcbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy5Mb2dpbi10b2dnbGUtLWpzJykucmVtb3ZlQ2xhc3MoJ0xvZ2luLXRvZ2dsZS1lcnJvci0tanMnKTtcbiAgfVxufSk7XG5cbi8vIFByZS1WYWxpZGF0aW9uIGZ1bmN0aW9uIGZvciB0aGUgZm9ybS5cbiQoZnVuY3Rpb24oKSB7XG4gICQoJ2Zvcm1bbmFtZT1cIkxvZ2luLWZvcm1cIl0nKS5zdWJtaXQoZnVuY3Rpb24oZSkge1xuICAgIHZhciB1c2VybmFtZSA9ICQoJ2lucHV0W25hbWU9XCJ1c2VybmFtZVwiXScpLnZhbCgpO1xuICAgIHZhciBwYXNzd29yZCA9ICQoJ2lucHV0W25hbWU9XCJwYXNzd29yZFwiXScpLnZhbCgpO1xuICAgIC8vIEVtcHR5IHVzZXJuYW1lLlxuICAgIGlmICggdXNlcm5hbWUgPT0gJycpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICQoJ2lucHV0W25hbWU9XCJ1c2VybmFtZVwiXScpLnNldExvZ2luRXJyb3IoKTtcbiAgICAgICQoJy5FcnJvci11c2VybmFtZS0tanMnKS50ZXh0KCcqUGxlYXNlIGVudGVyIGEgdXNlcm5hbWUqJyk7XG4gICAgfVxuICAgIC8vIEVtcHR5IHBhc3N3b3JkLlxuICAgIGlmICggcGFzc3dvcmQgPT0gJycpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICQoJ2lucHV0W25hbWU9XCJwYXNzd29yZFwiXScpLnNldExvZ2luRXJyb3IoKTtcbiAgICAgICQoJy5FcnJvci1wYXNzd29yZC0tanMnKS50ZXh0KCcqUGxlYXNlIGVudGVyIGEgcGFzc3dvcmQqJyk7XG4gICAgfVxuICB9KTtcbn0pO1xuXG4vLyBQcmUtY2hlY2sgaW5wdXQgdmFsdWUgb24gdGhlIGZseS5cbiQoJ2Zvcm1bbmFtZT1cIkxvZ2luLWZvcm1cIl0gaW5wdXRbbmFtZT1cInVzZXJuYW1lXCJdJykub24oJ2lucHV0JywgZnVuY3Rpb24oKSAge1xuICAvLyBSRUdFWCBtYWlsLlxuICB2YXIgZW1haWxSZWcgPSBuZXcgUmVnRXhwKC9eKChcIltcXHctXFxzXStcIil8KFtcXHctXSsoPzpcXC5bXFx3LV0rKSopfChcIltcXHctXFxzXStcIikoW1xcdy1dKyg/OlxcLltcXHctXSspKikpKEAoKD86W1xcdy1dK1xcLikqXFx3W1xcdy1dezAsNjZ9KVxcLihbYS16XXsyLDZ9KD86XFwuW2Etel17Mn0pPykkKXwoQFxcWz8oKDI1WzAtNV1cXC58MlswLTRdWzAtOV1cXC58MVswLTldezJ9XFwufFswLTldezEsMn1cXC4pKSgoMjVbMC01XXwyWzAtNF1bMC05XXwxWzAtOV17Mn18WzAtOV17MSwyfSlcXC4pezJ9KDI1WzAtNV18MlswLTRdWzAtOV18MVswLTldezJ9fFswLTldezEsMn0pXFxdPyQpL2kpO1xuICAvLyBSRUdFWCB1c2VyIG51bWJlci5cbiAgdmFyIHVzZXJOdW1iZXJSZWcgPSBuZXcgUmVnRXhwKCdeW2EtekEtWl1bYS16QS1aXVswLTldezZ9Jyk7XG5cbiAgLy8gSWYgYW55IG9mIHRoZSByZWdleCBpcyB0cnVlIHNldCBpbnB1dCBzdGF0ZSB0byB2YWxpZC5cbiAgdmFyIHZhbGlkID0gZW1haWxSZWcudGVzdCgkKHRoaXMpLnZhbCgpKSB8IHVzZXJOdW1iZXJSZWcudGVzdCgkKHRoaXMpLnZhbCgpKTtcbiAgaWYgKHZhbGlkKSB7XG4gICAgJCh0aGlzKS5zZXRMb2dpblZhbGlkKCk7XG4gIH1cbiAgLy8gSWYgbm90IHJlc2V0IGl0IHRvIGhlbHAgdGV4dCBkaXNwbGF5LlxuICBlbHNlIHtcbiAgICAkKHRoaXMpLnNldExvZ2luSGVscCgpO1xuICB9XG59KTtcblxuIiwiJChcIi5NZW51LXJvdy1tZW51LS1qc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5NZW51LXJvdy1idXJnZXJcIikudG9nZ2xlQ2xhc3MoXCJCdXJnZXItLW9wZW5cIilcbn0pXG5cbiQoXCIuTWVudS1yb3ctcHJvZmlsZS0tanMsIC5Db3JyZWN0LWxvdHRlcnktYnRuLS1qc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAkKFwiLkxvZ2luLW92ZXJsYXktY29udGFpbmVyXCIpLmZhZGVJbihcImZhc3RcIik7XG59KVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
