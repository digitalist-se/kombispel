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
