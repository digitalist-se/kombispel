
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
$(".Menu-row-menu--js").click(function() {
  $(".Menu-row-burger").toggleClass("Burger--open")
})

$(".Menu-row-profile--js, .Correct-lottery-btn--js").click(function() {
    $(".Login-overlay-container").fadeIn("fast");
})

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvZ2luLmpzIiwiTWVudS1yb3cuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8vIFRpdGxlIHRleHQgZm9yIHRoZSBkaWZmZXJlbnQgc3RhdGUuXG4kLkRlZmF1bHRUaXRsZSA9ICdMb2dnYSBpbiBww6UgbWluIHNpZGEnO1xuJC5FcnJvclRpdGxlID0gJ0lubG9nZ25pbmdlbiBtaXNzbHlja2FkZXMhJztcblxuLy8gVmFsdWUgZm9yIGhlbHAgdGV4dCBzdGF0ZS5cbiQuRGVmYXVsdEhlbHAgPSAnPGRpdiBjbGFzcz1cIkxvZ2luLWhlbHAtYm94LXRvcC10ZXh0LS1qc1wiPicgK1xuICAgICc8cD5EdSBoaXR0YXIgaW5mb3JtYXRpb24gb20gZGl0dCBsw7ZzZW5vcmQgaSBkaXR0IGJla3LDpGZ0ZWxzZW1haWwgZnLDpW4gb3NzLjwvcD4nICtcbiAgICAnPC9kaXY+JztcblxuJC5Gb3Jnb3RIZWxwID0gJzxkaXYgY2xhc3M9XCJMb2dpbi1oZWxwLWJveC10b3AtdGV4dC0tanNcIj4nICtcbiAgICAnPGgyPkdsw7ZtdCBkaXR0IGzDtnNlbm9yZD88L2gyPicgK1xuICAgICc8cD5LbGlja2EgcMOlIMOldGVyc3TDpGxsIHPDpSBza2lja2FyIHZpIGV0dCBueXR0IGzDtnNlcm5vcmQgdGlsbDo8L3A+JztcblxuJChcIi5Mb2dpbi10b2dnbGUtLWpzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKHRoaXMpLm5leHQoKS5zbGlkZVRvZ2dsZSgpO1xufSk7XG5cblxuJChcIi5Mb2dpbi1jbGlja2FyZWEtLWpzLCAuTG9naW4tY2xvc2UtZm9ybS0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuTG9naW4tb3ZlcmxheS1jb250YWluZXJcIikuZmFkZU91dChcImZhc3RcIik7XG59KTtcblxuLy8gU2V0IHRoZSBpbnB1dCBzdGF0ZSBmb3IgZXJyb3IuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcbiAgc2V0TG9naW5FcnJvcjogZnVuY3Rpb24gKCkge1xuICAgICQoJy5Mb2dpbi1oZWFkZXInKS50ZXh0KCQuRXJyb3JUaXRsZSApO1xuICAgICQodGhpcykuYWRkQ2xhc3MoJ0xvZ2luLWlucHV0LWVycm9yLS1qcycpO1xuICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ0xvZ2luLWlucHV0LWhlbHAtLWpzJyk7XG5cbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy5Mb2dpbi10b2dnbGUtLWpzJykuYWRkQ2xhc3MoJ0xvZ2luLXRvZ2dsZS1lcnJvci0tanMnKTtcbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy5Mb2dpbi10b2dnbGUtLWpzJykucmVtb3ZlQ2xhc3MoJ0xvZ2luLXRvZ2dsZS1oZWxwLS1qcycpO1xuICAgICQodGhpcykucGFyZW50KCkuZmluZCgnLkxvZ2luLXRvZ2dsZS0tanMnKS5yZW1vdmVDbGFzcygnTG9naW4tdG9nZ2xlLXZhbGlkLS1qcycpO1xuICB9XG59KTtcblxuLy8gU2V0IHRoZSBpbnB1dCBzdGF0ZSBmb3IgdmFsaWQuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcbiAgc2V0TG9naW5WYWxpZDogZnVuY3Rpb24gKCkge1xuICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ0xvZ2luLWlucHV0LWVycm9yLS1qcycpO1xuXG4gICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcuTG9naW4tdG9nZ2xlLS1qcycpLmFkZENsYXNzKCdMb2dpbi10b2dnbGUtdmFsaWQtLWpzJyk7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcuTG9naW4tdG9nZ2xlLS1qcycpLnJlbW92ZUNsYXNzKCdMb2dpbi10b2dnbGUtaGVscC0tanMnKTtcbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy5Mb2dpbi10b2dnbGUtLWpzJykucmVtb3ZlQ2xhc3MoJ0xvZ2luLXRvZ2dsZS1lcnJvci0tanMnKTtcbiAgfVxufSk7XG5cbi8vIFNldCB0aGUgaW5wdXQgc3RhdGUgZm9yIGhlbHAgKGRlZmF1bHQpLlxualF1ZXJ5LmZuLmV4dGVuZCh7XG4gIHNldExvZ2luSGVscDogZnVuY3Rpb24gKCkge1xuICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ0xvZ2luLWlucHV0LWVycm9yLS1qcycpO1xuICAgICQodGhpcykuYWRkQ2xhc3MoJ0xvZ2luLWlucHV0LWhlbHAtLWpzJyk7XG5cbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy5Mb2dpbi10b2dnbGUtLWpzJykuYWRkQ2xhc3MoJ0xvZ2luLXRvZ2dsZS1oZWxwLS1qcycpO1xuICAgICQodGhpcykucGFyZW50KCkuZmluZCgnLkxvZ2luLXRvZ2dsZS0tanMnKS5yZW1vdmVDbGFzcygnTG9naW4tdG9nZ2xlLXZhbGlkLS1qcycpO1xuICAgICQodGhpcykucGFyZW50KCkuZmluZCgnLkxvZ2luLXRvZ2dsZS0tanMnKS5yZW1vdmVDbGFzcygnTG9naW4tdG9nZ2xlLWVycm9yLS1qcycpO1xuICB9XG59KTtcblxuLy8gU2V0IHRoZSBoZWxwIHRleHQgZm9yIGZvcmdvdHRlbiBwYXNzd29yZC5cbmpRdWVyeS5mbi5leHRlbmQoe1xuICBzZXRMb2dpbkZvcmdvdFRleHQ6IGZ1bmN0aW9uKGVtYWlsKSB7XG4gICAgJCh0aGlzKS5odG1sKCQuRm9yZ290SGVscCArXG4gICAgICAgICc8c3BhbiBjbGFzcz1cIkxvZ2luLXVzZXItZW1haWxcIj4nICsgZW1haWwgKyAnPC9zcGFuPicgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cIkxvZ2luLWZvcmdvdC1idXR0b24td3JhcHBlclwiPjxidXR0b24gY2xhc3M9XCJMb2dpbi1mb3Jnb3QtYnV0dG9uXCI+w6V0ZXJzdMOkbGw8L2J1dHRvbj48L2Rpdj4nICtcbiAgICAgICAgJzwvZGl2PidcbiAgICApO1xuICB9XG59KTtcblxuLy8gUHJlLVZhbGlkYXRpb24gZnVuY3Rpb24gZm9yIHRoZSBmb3JtLlxuJChmdW5jdGlvbigpIHtcbiAgJCgnZm9ybVtuYW1lPVwiTG9naW4tZm9ybVwiXScpLnN1Ym1pdChmdW5jdGlvbihlKSB7XG4gICAgdmFyIHVzZXJuYW1lID0gJCgnaW5wdXRbbmFtZT1cInVzZXJuYW1lXCJdJykudmFsKCk7XG4gICAgdmFyIHBhc3N3b3JkID0gJCgnaW5wdXRbbmFtZT1cInBhc3N3b3JkXCJdJykudmFsKCk7XG4gICAgLy8gRW1wdHkgdXNlcm5hbWUuXG4gICAgaWYgKCB1c2VybmFtZSA9PSAnJykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgJCgnaW5wdXRbbmFtZT1cInVzZXJuYW1lXCJdJykuc2V0TG9naW5FcnJvcigpO1xuICAgICAgJCgnLkVycm9yLXVzZXJuYW1lLS1qcycpLnRleHQoJypQbGVhc2UgZW50ZXIgYSB1c2VybmFtZSonKTtcbiAgICB9XG4gICAgLy8gRW1wdHkgcGFzc3dvcmQuXG4gICAgaWYgKCBwYXNzd29yZCA9PSAnJykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgJCgnaW5wdXRbbmFtZT1cInBhc3N3b3JkXCJdJykuc2V0TG9naW5FcnJvcigpO1xuICAgICAgJCgnLkVycm9yLXBhc3N3b3JkLS1qcycpLnRleHQoJypQbGVhc2UgZW50ZXIgYSBwYXNzd29yZConKTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbi8vIFByZS1jaGVjayBpbnB1dCB2YWx1ZSBvbiB0aGUgZmx5LlxuJCgnaW5wdXRbbmFtZT1cInVzZXJuYW1lXCJdJykub24oJ2lucHV0JywgZnVuY3Rpb24oZSkgIHtcbiAgLy8gUkVHRVggbWFpbC5cbiAgdmFyIGVtYWlsUmVnID0gbmV3IFJlZ0V4cCgvXigoXCJbXFx3LVxcc10rXCIpfChbXFx3LV0rKD86XFwuW1xcdy1dKykqKXwoXCJbXFx3LVxcc10rXCIpKFtcXHctXSsoPzpcXC5bXFx3LV0rKSopKShAKCg/OltcXHctXStcXC4pKlxcd1tcXHctXXswLDY2fSlcXC4oW2Etel17Miw2fSg/OlxcLlthLXpdezJ9KT8pJCl8KEBcXFs/KCgyNVswLTVdXFwufDJbMC00XVswLTldXFwufDFbMC05XXsyfVxcLnxbMC05XXsxLDJ9XFwuKSkoKDI1WzAtNV18MlswLTRdWzAtOV18MVswLTldezJ9fFswLTldezEsMn0pXFwuKXsyfSgyNVswLTVdfDJbMC00XVswLTldfDFbMC05XXsyfXxbMC05XXsxLDJ9KVxcXT8kKS9pKTtcbiAgLy8gUkVHRVggdXNlciBudW1iZXIuXG4gIHZhciB1c2VyTnVtYmVyUmVnID0gbmV3IFJlZ0V4cCgnXlthLXpBLVpdW2EtekEtWl1bMC05XXs2fScpO1xuXG4gIC8vIElmIGFueSBvZiB0aGUgcmVnZXggaXMgdHJ1ZSBzZXQgaW5wdXQgc3RhdGUgdG8gdmFsaWQuXG4gIHZhciB2YWxpZCA9IGVtYWlsUmVnLnRlc3QoJCh0aGlzKS52YWwoKSkgfCB1c2VyTnVtYmVyUmVnLnRlc3QoJCh0aGlzKS52YWwoKSk7XG4gIGlmICh2YWxpZCkge1xuICAgICQodGhpcykuc2V0TG9naW5WYWxpZCgpO1xuICB9XG4gIC8vIElmIG5vdCByZXNldCBpdCB0byBoZWxwIHRleHQgZGlzcGxheS5cbiAgZWxzZSB7XG4gICAgJCh0aGlzKS5zZXRMb2dpbkhlbHAoKTtcbiAgfVxuXG4gIC8vIElmIGl0cyBhIHZhbGlkIGVtYWlsIHdlIGNoYW5nZSB0aGUgaGVscCB0ZXh0LlxuICBpZiAoZW1haWxSZWcudGVzdCgkKHRoaXMpLnZhbCgpKSkge1xuICAgICQoJy5Mb2dpbi1oZWxwLWJveC10b3AtdGV4dC0tanMnKS5zZXRMb2dpbkZvcmdvdFRleHQoJCh0aGlzKS52YWwoKSk7XG4gIH1cbiAgLy8gUmVzZXQgdGhlIGhlbHAgdGV4dC5cbiAgZWxzZSB7XG4gICAgJCgnLkxvZ2luLWhlbHAtYm94LXRvcC10ZXh0LS1qcycpLmh0bWwoJC5EZWZhdWx0SGVscCk7XG4gIH1cbn0pOyIsIiQoXCIuTWVudS1yb3ctbWVudS0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuTWVudS1yb3ctYnVyZ2VyXCIpLnRvZ2dsZUNsYXNzKFwiQnVyZ2VyLS1vcGVuXCIpXG59KVxuXG4kKFwiLk1lbnUtcm93LXByb2ZpbGUtLWpzLCAuQ29ycmVjdC1sb3R0ZXJ5LWJ0bi0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgJChcIi5Mb2dpbi1vdmVybGF5LWNvbnRhaW5lclwiKS5mYWRlSW4oXCJmYXN0XCIpO1xufSlcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
