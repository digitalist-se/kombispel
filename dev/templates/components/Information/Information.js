$(".js-Information-toggle-mail").click(function() {
  $(".js-Information-help-box--mail").slideToggle()
})
$(".js-Information-toggle-phone").click(function() {
  $(".js-Information-help-box--phone").slideToggle()
})
$(".js-Information-toggle-mobile").click(function() {
  $(".js-Information-help-box--mobile").slideToggle()
})
/////////////////////////////////////////////
// On input & select
/////////////////////////////////////////////
var $informationInput = $(".js-Information-input");
var $informationSelect = $(".js-Information-select");
var $initInfo = []
var $initSelect = []
var $infoRegretBtn = $(".js-Information-regret-btn");
var $infoSaveContainer = $(".js-Information-save-container");
$informationInput.each(function() {
  $initInfo.push($(this).val())
})
$informationSelect.each(function() {
  $initSelect.push($(this).val())
})

function toggleSaveContainer() {
  if($infoSaveContainer.hasClass("js-Information-save-container--visible") == false) {
    $infoSaveContainer.addClass("js-Information-save-container--visible")
  }
}
$informationInput.on('input', function() {
  toggleSaveContainer();
})
$informationSelect.on('change', function() {
  toggleSaveContainer();
})
$infoRegretBtn.click(function() {
  $informationInput.each(function(i) {
    $informationInput[i].value = $initInfo[i]
  })
  $informationSelect.each(function(i) {
    $informationSelect[i].value = $initSelect[i]
  })
  $infoSaveContainer.removeClass("js-Information-save-container--visible")
})

////////////////////////////////////////////////
// Om fält är tomt vid spara-klick scrolla dit
///////////////////////////////////////////////
var $saveButton = $(".js-Information-save-btn");
var $infoForm = $(".js-Information-form");

$saveButton.click(function(e) {
  $infoForm[0].checkValidity();
  $informationInput.each(function(i) {
    if($(this).val()=="" && $(this).attr("type")==="email") {
      $("html, body").animate({ scrollTop: $(this).offset().top - 200 }, 600);
      return false
    }
  })
})
