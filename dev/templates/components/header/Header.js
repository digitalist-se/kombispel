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
