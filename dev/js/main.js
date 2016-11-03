
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvZ2luLmpzIiwiTWVudS5qcyIsIk1lbnUtcm93LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vLyBUaXRsZSB0ZXh0IGZvciB0aGUgZGlmZmVyZW50IHN0YXRlLlxuJC5EZWZhdWx0VGl0bGUgPSAnTG9nZ2EgaW4gcMOlIG1pbiBzaWRhJztcbiQuRXJyb3JUaXRsZSA9ICdJbmxvZ2duaW5nZW4gbWlzc2x5Y2thZGVzISc7XG5cbi8vIFZhbHVlIGZvciBoZWxwIHRleHQgc3RhdGUuXG4kLkRlZmF1bHRIZWxwID0gJzxkaXYgY2xhc3M9XCJMb2dpbi1oZWxwLWJveC10b3AtdGV4dC0tanNcIj4nICtcbiAgICAnPHA+RHUgaGl0dGFyIGluZm9ybWF0aW9uIG9tIGRpdHQgbMO2c2Vub3JkIGkgZGl0dCBiZWtyw6RmdGVsc2VtYWlsIGZyw6VuIG9zcy48L3A+JyArXG4gICAgJzwvZGl2Pic7XG5cbiQuRm9yZ290SGVscCA9ICc8ZGl2IGNsYXNzPVwiTG9naW4taGVscC1ib3gtdG9wLXRleHQtLWpzXCI+JyArXG4gICAgJzxoMj5HbMO2bXQgZGl0dCBsw7ZzZW5vcmQ/PC9oMj4nICtcbiAgICAnPHA+S2xpY2thIHDDpSDDpXRlcnN0w6RsbCBzw6Ugc2tpY2thciB2aSBldHQgbnl0dCBsw7ZzZXJub3JkIHRpbGw6PC9wPic7XG5cbiQoXCIuTG9naW4tdG9nZ2xlLS1qc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJCh0aGlzKS5uZXh0KCkuc2xpZGVUb2dnbGUoKTtcbn0pO1xuXG5cbiQoXCIuTG9naW4tY2xpY2thcmVhLS1qcywgLkxvZ2luLWNsb3NlLWZvcm0tLWpzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKFwiLkxvZ2luLW92ZXJsYXktY29udGFpbmVyXCIpLmZhZGVPdXQoXCJmYXN0XCIpO1xufSk7XG5cbi8vIFNldCB0aGUgaW5wdXQgc3RhdGUgZm9yIGVycm9yLlxualF1ZXJ5LmZuLmV4dGVuZCh7XG4gIHNldExvZ2luRXJyb3I6IGZ1bmN0aW9uICgpIHtcbiAgICAkKCcuTG9naW4taGVhZGVyJykudGV4dCgkLkVycm9yVGl0bGUgKTtcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdMb2dpbi1pbnB1dC1lcnJvci0tanMnKTtcbiAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdMb2dpbi1pbnB1dC1oZWxwLS1qcycpO1xuXG4gICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcuTG9naW4tdG9nZ2xlLS1qcycpLmFkZENsYXNzKCdMb2dpbi10b2dnbGUtZXJyb3ItLWpzJyk7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcuTG9naW4tdG9nZ2xlLS1qcycpLnJlbW92ZUNsYXNzKCdMb2dpbi10b2dnbGUtaGVscC0tanMnKTtcbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy5Mb2dpbi10b2dnbGUtLWpzJykucmVtb3ZlQ2xhc3MoJ0xvZ2luLXRvZ2dsZS12YWxpZC0tanMnKTtcbiAgfVxufSk7XG5cbi8vIFNldCB0aGUgaW5wdXQgc3RhdGUgZm9yIHZhbGlkLlxualF1ZXJ5LmZuLmV4dGVuZCh7XG4gIHNldExvZ2luVmFsaWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdMb2dpbi1pbnB1dC1lcnJvci0tanMnKTtcblxuICAgICQodGhpcykucGFyZW50KCkuZmluZCgnLkxvZ2luLXRvZ2dsZS0tanMnKS5hZGRDbGFzcygnTG9naW4tdG9nZ2xlLXZhbGlkLS1qcycpO1xuICAgICQodGhpcykucGFyZW50KCkuZmluZCgnLkxvZ2luLXRvZ2dsZS0tanMnKS5yZW1vdmVDbGFzcygnTG9naW4tdG9nZ2xlLWhlbHAtLWpzJyk7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcuTG9naW4tdG9nZ2xlLS1qcycpLnJlbW92ZUNsYXNzKCdMb2dpbi10b2dnbGUtZXJyb3ItLWpzJyk7XG4gIH1cbn0pO1xuXG4vLyBTZXQgdGhlIGlucHV0IHN0YXRlIGZvciBoZWxwIChkZWZhdWx0KS5cbmpRdWVyeS5mbi5leHRlbmQoe1xuICBzZXRMb2dpbkhlbHA6IGZ1bmN0aW9uICgpIHtcbiAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdMb2dpbi1pbnB1dC1lcnJvci0tanMnKTtcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdMb2dpbi1pbnB1dC1oZWxwLS1qcycpO1xuXG4gICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcuTG9naW4tdG9nZ2xlLS1qcycpLmFkZENsYXNzKCdMb2dpbi10b2dnbGUtaGVscC0tanMnKTtcbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy5Mb2dpbi10b2dnbGUtLWpzJykucmVtb3ZlQ2xhc3MoJ0xvZ2luLXRvZ2dsZS12YWxpZC0tanMnKTtcbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy5Mb2dpbi10b2dnbGUtLWpzJykucmVtb3ZlQ2xhc3MoJ0xvZ2luLXRvZ2dsZS1lcnJvci0tanMnKTtcbiAgfVxufSk7XG5cbi8vIFNldCB0aGUgaGVscCB0ZXh0IGZvciBmb3Jnb3R0ZW4gcGFzc3dvcmQuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcbiAgc2V0TG9naW5Gb3Jnb3RUZXh0OiBmdW5jdGlvbihlbWFpbCkge1xuICAgICQodGhpcykuaHRtbCgkLkZvcmdvdEhlbHAgK1xuICAgICAgICAnPHNwYW4gY2xhc3M9XCJMb2dpbi11c2VyLWVtYWlsXCI+JyArIGVtYWlsICsgJzwvc3Bhbj4nICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJMb2dpbi1mb3Jnb3QtYnV0dG9uLXdyYXBwZXJcIj48YnV0dG9uIGNsYXNzPVwiTG9naW4tZm9yZ290LWJ1dHRvblwiPsOldGVyc3TDpGxsPC9idXR0b24+PC9kaXY+JyArXG4gICAgICAgICc8L2Rpdj4nXG4gICAgKTtcbiAgfVxufSk7XG5cbi8vIFByZS1WYWxpZGF0aW9uIGZ1bmN0aW9uIGZvciB0aGUgZm9ybS5cbiQoZnVuY3Rpb24oKSB7XG4gICQoJ2Zvcm1bbmFtZT1cIkxvZ2luLWZvcm1cIl0nKS5zdWJtaXQoZnVuY3Rpb24oZSkge1xuICAgIHZhciB1c2VybmFtZSA9ICQoJ2lucHV0W25hbWU9XCJ1c2VybmFtZVwiXScpLnZhbCgpO1xuICAgIHZhciBwYXNzd29yZCA9ICQoJ2lucHV0W25hbWU9XCJwYXNzd29yZFwiXScpLnZhbCgpO1xuICAgIC8vIEVtcHR5IHVzZXJuYW1lLlxuICAgIGlmICggdXNlcm5hbWUgPT0gJycpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICQoJ2lucHV0W25hbWU9XCJ1c2VybmFtZVwiXScpLnNldExvZ2luRXJyb3IoKTtcbiAgICAgICQoJy5FcnJvci11c2VybmFtZS0tanMnKS50ZXh0KCcqUGxlYXNlIGVudGVyIGEgdXNlcm5hbWUqJyk7XG4gICAgfVxuICAgIC8vIEVtcHR5IHBhc3N3b3JkLlxuICAgIGlmICggcGFzc3dvcmQgPT0gJycpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICQoJ2lucHV0W25hbWU9XCJwYXNzd29yZFwiXScpLnNldExvZ2luRXJyb3IoKTtcbiAgICAgICQoJy5FcnJvci1wYXNzd29yZC0tanMnKS50ZXh0KCcqUGxlYXNlIGVudGVyIGEgcGFzc3dvcmQqJyk7XG4gICAgfVxuICB9KTtcbn0pO1xuXG4vLyBQcmUtY2hlY2sgaW5wdXQgdmFsdWUgb24gdGhlIGZseS5cbiQoJ2lucHV0W25hbWU9XCJ1c2VybmFtZVwiXScpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKGUpICB7XG4gIC8vIFJFR0VYIG1haWwuXG4gIHZhciBlbWFpbFJlZyA9IG5ldyBSZWdFeHAoL14oKFwiW1xcdy1cXHNdK1wiKXwoW1xcdy1dKyg/OlxcLltcXHctXSspKil8KFwiW1xcdy1cXHNdK1wiKShbXFx3LV0rKD86XFwuW1xcdy1dKykqKSkoQCgoPzpbXFx3LV0rXFwuKSpcXHdbXFx3LV17MCw2Nn0pXFwuKFthLXpdezIsNn0oPzpcXC5bYS16XXsyfSk/KSQpfChAXFxbPygoMjVbMC01XVxcLnwyWzAtNF1bMC05XVxcLnwxWzAtOV17Mn1cXC58WzAtOV17MSwyfVxcLikpKCgyNVswLTVdfDJbMC00XVswLTldfDFbMC05XXsyfXxbMC05XXsxLDJ9KVxcLil7Mn0oMjVbMC01XXwyWzAtNF1bMC05XXwxWzAtOV17Mn18WzAtOV17MSwyfSlcXF0/JCkvaSk7XG4gIC8vIFJFR0VYIHVzZXIgbnVtYmVyLlxuICB2YXIgdXNlck51bWJlclJlZyA9IG5ldyBSZWdFeHAoJ15bYS16QS1aXVthLXpBLVpdWzAtOV17Nn0nKTtcblxuICAvLyBJZiBhbnkgb2YgdGhlIHJlZ2V4IGlzIHRydWUgc2V0IGlucHV0IHN0YXRlIHRvIHZhbGlkLlxuICB2YXIgdmFsaWQgPSBlbWFpbFJlZy50ZXN0KCQodGhpcykudmFsKCkpIHwgdXNlck51bWJlclJlZy50ZXN0KCQodGhpcykudmFsKCkpO1xuICBpZiAodmFsaWQpIHtcbiAgICAkKHRoaXMpLnNldExvZ2luVmFsaWQoKTtcbiAgfVxuICAvLyBJZiBub3QgcmVzZXQgaXQgdG8gaGVscCB0ZXh0IGRpc3BsYXkuXG4gIGVsc2Uge1xuICAgICQodGhpcykuc2V0TG9naW5IZWxwKCk7XG4gIH1cblxuICAvLyBJZiBpdHMgYSB2YWxpZCBlbWFpbCB3ZSBjaGFuZ2UgdGhlIGhlbHAgdGV4dC5cbiAgaWYgKGVtYWlsUmVnLnRlc3QoJCh0aGlzKS52YWwoKSkpIHtcbiAgICAkKCcuTG9naW4taGVscC1ib3gtdG9wLXRleHQtLWpzJykuc2V0TG9naW5Gb3Jnb3RUZXh0KCQodGhpcykudmFsKCkpO1xuICB9XG4gIC8vIFJlc2V0IHRoZSBoZWxwIHRleHQuXG4gIGVsc2Uge1xuICAgICQoJy5Mb2dpbi1oZWxwLWJveC10b3AtdGV4dC0tanMnKS5odG1sKCQuRGVmYXVsdEhlbHApO1xuICB9XG59KTsiLCIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFRPR0dMRSBNRU5VIE9QRU5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG52YXIgbWVudVRleHQgPSAkKFwiLk1lbnUtcm93LXRpdGxlLXRpdGxlXCIpO1xuXG4kKFwiLk1lbnUtcm93LW1lbnUtLWpzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICB0b2dnbGVNZW51KCk7XG59KVxuXG4kKFwiLk1lbnUtbGV2ZWwtb25lLWhlYWRlci0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQodGhpcykubmV4dCgpLnNsaWRlVG9nZ2xlKCk7XG4gICQodGhpcykudG9nZ2xlQ2xhc3MoXCJjaGlsZHJlbi1vcGVuXCIpO1xufSlcblxuXG5mdW5jdGlvbiB0b2dnbGVNZW51KCkge1xuICAkKFwiLk1lbnUtY29udGFpbmVyXCIpLnRvZ2dsZUNsYXNzKFwiTWVudS0tb3BlblwiKVxuICAkKFwiLlNpdGUtY29udGFpbmVyXCIpLnRvZ2dsZUNsYXNzKFwibG9ja2VkXCIpXG4gICQoXCIuTWVudS1yb3ctbWVudS0tanNcIikudG9nZ2xlQ2xhc3MoXCJCdXJnZXItLW9wZW5cIik7XG5cbiAgaWYobWVudVRleHQudGV4dCgpID09IFwibWVueVwiKSB7XG4gICAgICBtZW51VGV4dC50ZXh0KFwic3TDpG5nIG1lbnlcIilcbiAgfSBlbHNlIHtcbiAgICBtZW51VGV4dC50ZXh0KFwibWVueVwiKVxuICB9XG59XG4iLCIkKFwiLk1lbnUtcm93LXByb2ZpbGUtLWpzLCAuQ29ycmVjdC1sb3R0ZXJ5LWJ0bi0tanMsIC5PcGVuLWxvZ2luLS1qc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAkKFwiLkxvZ2luLW92ZXJsYXktY29udGFpbmVyXCIpLmZhZGVJbihcImZhc3RcIik7XG5cbiAgICBpZigkKFwiLk1lbnUtY29udGFpbmVyXCIpLmhhc0NsYXNzKFwiTWVudS0tb3BlblwiKSkge1xuICAgICAgICB0b2dnbGVNZW51KCk7XG4gICAgfVxufSlcbiJdfQ==
