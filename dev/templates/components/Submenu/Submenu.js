 if ($.contains(document, $("#SubmenuAnchor")[0]) && ($(window).width() < 768)) {
     setTimeout(function() {
       $('html, body').animate({
         scrollTop: $("#SubmenuAnchor").offset().top
       }, 500);
     },300)
 }
