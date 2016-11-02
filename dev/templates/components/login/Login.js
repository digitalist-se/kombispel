
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