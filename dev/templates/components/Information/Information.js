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
  if($infoSaveContainer.hasClass("is-visible") == false) {
    $infoSaveContainer.addClass("is-visible")
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
  $infoSaveContainer.removeClass("is-visible")
})

////////////////////////////////////////////////
// Om fält är tomt vid spara-klick scrolla dit
///////////////////////////////////////////////
var $saveButton = $(".js-Information-save-btn");
var $infoForm = $(".js-Information-form");
var $infoFieldRequired = $(".js-Information-field-required");
var mailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

$infoFieldRequired.click(function() {
  $(this).toggleClass("is-visible");
})
var formValid;

$saveButton.click(function(e) {
 formValid = true;
  e.preventDefault();
  $informationInput.each(function(i) {
    if(mailRegex.test($(this).val()) === false && $(this).attr("type")==="email") {
      formValid = false;
      $("html, body").animate({ scrollTop: $(this).offset().top - 125 }, 600);
      $(this).focus()
      $(this).next().addClass("is-visible");
      return false
    }
  })
  if(formValid) {
    $infoForm.submit();
  }
})
