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
    $(this).removeClass('Login-input-error--help');

    $(this).parent().find('.Login-toggle-help--js').addClass('Login-toggle-error--js');
    $(this).parent().find('.Login-toggle-help--js').removeClass('Login-toggle-help--js');
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



$(".Menu-row-menu--js").click(function() {
  $(".Menu-row-burger").toggleClass("Burger--open")
})

$(".Menu-row-profile--js, .Correct-lottery-btn--js").click(function() {
    $(".Login-overlay-container").fadeIn("fast");
})

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvZ2luLmpzIiwiTWVudS1yb3cuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoXCIuTG9naW4tdG9nZ2xlLWhlbHAtLWpzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKHRoaXMpLm5leHQoKS5zbGlkZVRvZ2dsZSgpO1xufSk7XG5cblxuJChcIi5Mb2dpbi1jbGlja2FyZWEtLWpzLCAuTG9naW4tY2xvc2UtZm9ybS0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuTG9naW4tb3ZlcmxheS1jb250YWluZXJcIikuZmFkZU91dChcImZhc3RcIik7XG59KTtcblxuLy8gU2V0IHRoZSBpbnB1dCBzdGF0ZSBmb3IgZXJyb3IuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcbiAgc2V0TG9naW5FcnJvcjogZnVuY3Rpb24gKCkge1xuICAgICQodGhpcykuYWRkQ2xhc3MoJ0xvZ2luLWlucHV0LWVycm9yLS1qcycpO1xuICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ0xvZ2luLWlucHV0LWVycm9yLS1oZWxwJyk7XG5cbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy5Mb2dpbi10b2dnbGUtaGVscC0tanMnKS5hZGRDbGFzcygnTG9naW4tdG9nZ2xlLWVycm9yLS1qcycpO1xuICAgICQodGhpcykucGFyZW50KCkuZmluZCgnLkxvZ2luLXRvZ2dsZS1oZWxwLS1qcycpLnJlbW92ZUNsYXNzKCdMb2dpbi10b2dnbGUtaGVscC0tanMnKTtcbiAgfVxufSk7XG5cbi8vIFByZS1WYWxpZGF0aW9uIGZ1bmN0aW9uIGZvciB0aGUgZm9ybS5cbiQoZnVuY3Rpb24oKSB7XG4gICQoJ2Zvcm1bbmFtZT1cIkxvZ2luLWZvcm1cIl0nKS5zdWJtaXQoZnVuY3Rpb24oZSkge1xuICAgIHZhciB1c2VybmFtZSA9ICQoJ2lucHV0W25hbWU9XCJ1c2VybmFtZVwiXScpLnZhbCgpO1xuICAgIHZhciBwYXNzd29yZCA9ICQoJ2lucHV0W25hbWU9XCJwYXNzd29yZFwiXScpLnZhbCgpO1xuICAgIC8vIEVtcHR5IHVzZXJuYW1lLlxuICAgIGlmICggdXNlcm5hbWUgPT0gJycpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICQoJ2lucHV0W25hbWU9XCJ1c2VybmFtZVwiXScpLnNldExvZ2luRXJyb3IoKTtcbiAgICAgICQoJy5FcnJvci11c2VybmFtZS0tanMnKS50ZXh0KCcqUGxlYXNlIGVudGVyIGEgdXNlcm5hbWUqJyk7XG4gICAgfVxuICAgIC8vIEVtcHR5IHBhc3N3b3JkLlxuICAgIGlmICggcGFzc3dvcmQgPT0gJycpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICQoJ2lucHV0W25hbWU9XCJwYXNzd29yZFwiXScpLnNldExvZ2luRXJyb3IoKTtcbiAgICAgICQoJy5FcnJvci1wYXNzd29yZC0tanMnKS50ZXh0KCcqUGxlYXNlIGVudGVyIGEgcGFzc3dvcmQqJyk7XG4gICAgfVxuICB9KTtcbn0pO1xuXG5cbiIsIiQoXCIuTWVudS1yb3ctbWVudS0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuTWVudS1yb3ctYnVyZ2VyXCIpLnRvZ2dsZUNsYXNzKFwiQnVyZ2VyLS1vcGVuXCIpXG59KVxuXG4kKFwiLk1lbnUtcm93LXByb2ZpbGUtLWpzLCAuQ29ycmVjdC1sb3R0ZXJ5LWJ0bi0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgJChcIi5Mb2dpbi1vdmVybGF5LWNvbnRhaW5lclwiKS5mYWRlSW4oXCJmYXN0XCIpO1xufSlcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
