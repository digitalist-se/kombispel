function mobileScroll(distance,delay) {
    setTimeout(function(){
      $('html, body').animate({
        scrollTop: distance
      }, 400);
 }, delay);
}
 if ($.contains(document, $("#SubmenuAnchor")[0]) && $.contains(document, $("#anchor")[0]) === false && ($(window).width() < 768)) {
   mobileScroll($("#SubmenuAnchor").offset().top,800)
 } else if ($.contains(document, $("#SubmenuAnchor")[0]) && $.contains(document, $("#anchor")[0]) && ($(window).width() < 768)) {
   mobileScroll($("#SubmenuAnchor").offset().top + $("#SubmenuAnchor").height(),800)
 }
