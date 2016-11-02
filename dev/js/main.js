
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
        '<div class="Login-forgot-button">återställ</div>' +
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
  console.log('dgdfg');
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
$(".Menu-row-menu--js").click(function() {
  $(".Menu-row-burger").toggleClass("Burger--open")
})

$(".Menu-row-profile--js, .Correct-lottery-btn--js").click(function() {
    $(".Login-overlay-container").fadeIn("fast");
})

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvZ2luLmpzIiwiTWVudS1yb3cuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLy8gVGl0bGUgdGV4dCBmb3IgdGhlIGRpZmZlcmVudCBzdGF0ZS5cbiQuRGVmYXVsdFRpdGxlID0gJ0xvZ2dhIGluIHDDpSBtaW4gc2lkYSc7XG4kLkVycm9yVGl0bGUgPSAnSW5sb2dnbmluZ2VuIG1pc3NseWNrYWRlcyEnO1xuXG4vLyBWYWx1ZSBmb3IgaGVscCB0ZXh0IHN0YXRlLlxuJC5EZWZhdWx0SGVscCA9ICc8ZGl2IGNsYXNzPVwiTG9naW4taGVscC1ib3gtdG9wLXRleHQtLWpzXCI+JyArXG4gICAgJzxwPkR1IGhpdHRhciBpbmZvcm1hdGlvbiBvbSBkaXR0IGzDtnNlbm9yZCBpIGRpdHQgYmVrcsOkZnRlbHNlbWFpbCBmcsOlbiBvc3MuPC9wPicgK1xuICAgICc8L2Rpdj4nO1xuXG4kLkZvcmdvdEhlbHAgPSAnPGRpdiBjbGFzcz1cIkxvZ2luLWhlbHAtYm94LXRvcC10ZXh0LS1qc1wiPicgK1xuICAgICc8aDI+R2zDtm10IGRpdHQgbMO2c2Vub3JkPzwvaDI+JyArXG4gICAgJzxwPktsaWNrYSBww6Ugw6V0ZXJzdMOkbGwgc8OlIHNraWNrYXIgdmkgZXR0IG55dHQgbMO2c2Vybm9yZCB0aWxsOjwvcD4nO1xuXG4kKFwiLkxvZ2luLXRvZ2dsZS0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQodGhpcykubmV4dCgpLnNsaWRlVG9nZ2xlKCk7XG59KTtcblxuXG4kKFwiLkxvZ2luLWNsaWNrYXJlYS0tanMsIC5Mb2dpbi1jbG9zZS1mb3JtLS1qc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5Mb2dpbi1vdmVybGF5LWNvbnRhaW5lclwiKS5mYWRlT3V0KFwiZmFzdFwiKTtcbn0pO1xuXG4vLyBTZXQgdGhlIGlucHV0IHN0YXRlIGZvciBlcnJvci5cbmpRdWVyeS5mbi5leHRlbmQoe1xuICBzZXRMb2dpbkVycm9yOiBmdW5jdGlvbiAoKSB7XG4gICAgJCgnLkxvZ2luLWhlYWRlcicpLnRleHQoJC5FcnJvclRpdGxlICk7XG4gICAgJCh0aGlzKS5hZGRDbGFzcygnTG9naW4taW5wdXQtZXJyb3ItLWpzJyk7XG4gICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnTG9naW4taW5wdXQtaGVscC0tanMnKTtcblxuICAgICQodGhpcykucGFyZW50KCkuZmluZCgnLkxvZ2luLXRvZ2dsZS0tanMnKS5hZGRDbGFzcygnTG9naW4tdG9nZ2xlLWVycm9yLS1qcycpO1xuICAgICQodGhpcykucGFyZW50KCkuZmluZCgnLkxvZ2luLXRvZ2dsZS0tanMnKS5yZW1vdmVDbGFzcygnTG9naW4tdG9nZ2xlLWhlbHAtLWpzJyk7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcuTG9naW4tdG9nZ2xlLS1qcycpLnJlbW92ZUNsYXNzKCdMb2dpbi10b2dnbGUtdmFsaWQtLWpzJyk7XG4gIH1cbn0pO1xuXG4vLyBTZXQgdGhlIGlucHV0IHN0YXRlIGZvciB2YWxpZC5cbmpRdWVyeS5mbi5leHRlbmQoe1xuICBzZXRMb2dpblZhbGlkOiBmdW5jdGlvbiAoKSB7XG4gICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnTG9naW4taW5wdXQtZXJyb3ItLWpzJyk7XG5cbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy5Mb2dpbi10b2dnbGUtLWpzJykuYWRkQ2xhc3MoJ0xvZ2luLXRvZ2dsZS12YWxpZC0tanMnKTtcbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy5Mb2dpbi10b2dnbGUtLWpzJykucmVtb3ZlQ2xhc3MoJ0xvZ2luLXRvZ2dsZS1oZWxwLS1qcycpO1xuICAgICQodGhpcykucGFyZW50KCkuZmluZCgnLkxvZ2luLXRvZ2dsZS0tanMnKS5yZW1vdmVDbGFzcygnTG9naW4tdG9nZ2xlLWVycm9yLS1qcycpO1xuICB9XG59KTtcblxuLy8gU2V0IHRoZSBpbnB1dCBzdGF0ZSBmb3IgaGVscCAoZGVmYXVsdCkuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcbiAgc2V0TG9naW5IZWxwOiBmdW5jdGlvbiAoKSB7XG4gICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnTG9naW4taW5wdXQtZXJyb3ItLWpzJyk7XG4gICAgJCh0aGlzKS5hZGRDbGFzcygnTG9naW4taW5wdXQtaGVscC0tanMnKTtcblxuICAgICQodGhpcykucGFyZW50KCkuZmluZCgnLkxvZ2luLXRvZ2dsZS0tanMnKS5hZGRDbGFzcygnTG9naW4tdG9nZ2xlLWhlbHAtLWpzJyk7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcuTG9naW4tdG9nZ2xlLS1qcycpLnJlbW92ZUNsYXNzKCdMb2dpbi10b2dnbGUtdmFsaWQtLWpzJyk7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcuTG9naW4tdG9nZ2xlLS1qcycpLnJlbW92ZUNsYXNzKCdMb2dpbi10b2dnbGUtZXJyb3ItLWpzJyk7XG4gIH1cbn0pO1xuXG4vLyBTZXQgdGhlIGhlbHAgdGV4dCBmb3IgZm9yZ290dGVuIHBhc3N3b3JkLlxualF1ZXJ5LmZuLmV4dGVuZCh7XG4gIHNldExvZ2luRm9yZ290VGV4dDogZnVuY3Rpb24oZW1haWwpIHtcbiAgICAkKHRoaXMpLmh0bWwoJC5Gb3Jnb3RIZWxwICtcbiAgICAgICAgJzxzcGFuIGNsYXNzPVwiTG9naW4tdXNlci1lbWFpbFwiPicgKyBlbWFpbCArICc8L3NwYW4+JyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiTG9naW4tZm9yZ290LWJ1dHRvblwiPsOldGVyc3TDpGxsPC9kaXY+JyArXG4gICAgICAgICc8L2Rpdj4nXG4gICAgKTtcbiAgfVxufSk7XG5cbi8vIFByZS1WYWxpZGF0aW9uIGZ1bmN0aW9uIGZvciB0aGUgZm9ybS5cbiQoZnVuY3Rpb24oKSB7XG4gICQoJ2Zvcm1bbmFtZT1cIkxvZ2luLWZvcm1cIl0nKS5zdWJtaXQoZnVuY3Rpb24oZSkge1xuICAgIHZhciB1c2VybmFtZSA9ICQoJ2lucHV0W25hbWU9XCJ1c2VybmFtZVwiXScpLnZhbCgpO1xuICAgIHZhciBwYXNzd29yZCA9ICQoJ2lucHV0W25hbWU9XCJwYXNzd29yZFwiXScpLnZhbCgpO1xuICAgIC8vIEVtcHR5IHVzZXJuYW1lLlxuICAgIGlmICggdXNlcm5hbWUgPT0gJycpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICQoJ2lucHV0W25hbWU9XCJ1c2VybmFtZVwiXScpLnNldExvZ2luRXJyb3IoKTtcbiAgICAgICQoJy5FcnJvci11c2VybmFtZS0tanMnKS50ZXh0KCcqUGxlYXNlIGVudGVyIGEgdXNlcm5hbWUqJyk7XG4gICAgfVxuICAgIC8vIEVtcHR5IHBhc3N3b3JkLlxuICAgIGlmICggcGFzc3dvcmQgPT0gJycpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICQoJ2lucHV0W25hbWU9XCJwYXNzd29yZFwiXScpLnNldExvZ2luRXJyb3IoKTtcbiAgICAgICQoJy5FcnJvci1wYXNzd29yZC0tanMnKS50ZXh0KCcqUGxlYXNlIGVudGVyIGEgcGFzc3dvcmQqJyk7XG4gICAgfVxuICB9KTtcbn0pO1xuXG4vLyBQcmUtY2hlY2sgaW5wdXQgdmFsdWUgb24gdGhlIGZseS5cbiQoJ2lucHV0W25hbWU9XCJ1c2VybmFtZVwiXScpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKGUpICB7XG4gIGNvbnNvbGUubG9nKCdkZ2RmZycpO1xuICAvLyBSRUdFWCBtYWlsLlxuICB2YXIgZW1haWxSZWcgPSBuZXcgUmVnRXhwKC9eKChcIltcXHctXFxzXStcIil8KFtcXHctXSsoPzpcXC5bXFx3LV0rKSopfChcIltcXHctXFxzXStcIikoW1xcdy1dKyg/OlxcLltcXHctXSspKikpKEAoKD86W1xcdy1dK1xcLikqXFx3W1xcdy1dezAsNjZ9KVxcLihbYS16XXsyLDZ9KD86XFwuW2Etel17Mn0pPykkKXwoQFxcWz8oKDI1WzAtNV1cXC58MlswLTRdWzAtOV1cXC58MVswLTldezJ9XFwufFswLTldezEsMn1cXC4pKSgoMjVbMC01XXwyWzAtNF1bMC05XXwxWzAtOV17Mn18WzAtOV17MSwyfSlcXC4pezJ9KDI1WzAtNV18MlswLTRdWzAtOV18MVswLTldezJ9fFswLTldezEsMn0pXFxdPyQpL2kpO1xuICAvLyBSRUdFWCB1c2VyIG51bWJlci5cbiAgdmFyIHVzZXJOdW1iZXJSZWcgPSBuZXcgUmVnRXhwKCdeW2EtekEtWl1bYS16QS1aXVswLTldezZ9Jyk7XG5cbiAgLy8gSWYgYW55IG9mIHRoZSByZWdleCBpcyB0cnVlIHNldCBpbnB1dCBzdGF0ZSB0byB2YWxpZC5cbiAgdmFyIHZhbGlkID0gZW1haWxSZWcudGVzdCgkKHRoaXMpLnZhbCgpKSB8IHVzZXJOdW1iZXJSZWcudGVzdCgkKHRoaXMpLnZhbCgpKTtcbiAgaWYgKHZhbGlkKSB7XG4gICAgJCh0aGlzKS5zZXRMb2dpblZhbGlkKCk7XG4gIH1cbiAgLy8gSWYgbm90IHJlc2V0IGl0IHRvIGhlbHAgdGV4dCBkaXNwbGF5LlxuICBlbHNlIHtcbiAgICAkKHRoaXMpLnNldExvZ2luSGVscCgpO1xuICB9XG5cbiAgLy8gSWYgaXRzIGEgdmFsaWQgZW1haWwgd2UgY2hhbmdlIHRoZSBoZWxwIHRleHQuXG4gIGlmIChlbWFpbFJlZy50ZXN0KCQodGhpcykudmFsKCkpKSB7XG4gICAgJCgnLkxvZ2luLWhlbHAtYm94LXRvcC10ZXh0LS1qcycpLnNldExvZ2luRm9yZ290VGV4dCgkKHRoaXMpLnZhbCgpKTtcbiAgfVxuICAvLyBSZXNldCB0aGUgaGVscCB0ZXh0LlxuICBlbHNlIHtcbiAgICAkKCcuTG9naW4taGVscC1ib3gtdG9wLXRleHQtLWpzJykuaHRtbCgkLkRlZmF1bHRIZWxwKTtcbiAgfVxufSk7IiwiJChcIi5NZW51LXJvdy1tZW51LS1qc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5NZW51LXJvdy1idXJnZXJcIikudG9nZ2xlQ2xhc3MoXCJCdXJnZXItLW9wZW5cIilcbn0pXG5cbiQoXCIuTWVudS1yb3ctcHJvZmlsZS0tanMsIC5Db3JyZWN0LWxvdHRlcnktYnRuLS1qc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAkKFwiLkxvZ2luLW92ZXJsYXktY29udGFpbmVyXCIpLmZhZGVJbihcImZhc3RcIik7XG59KVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
