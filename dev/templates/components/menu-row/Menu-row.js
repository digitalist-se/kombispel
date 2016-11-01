$(".Menu-row-menu--js").click(function() {
  $(".Menu-row-burger").toggleClass("Burger--open")
})

$(".Menu-row-profile--js, .Correct-lottery-btn--js").click(function() {
    $(".Login-overlay-container").fadeIn("fast");
})
