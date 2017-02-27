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

if ($.contains(document, $(".Page-two-col")[0])) {
  console.log("Det finns två kolumnare");
  $(".Page-two-col").each(function(i) {
    if(i % 2 === 0) {
      $(this).addClass("Page-two-col--left")
    } else {
      $(this).addClass("Page-two-col--right")
    }
  })
}
