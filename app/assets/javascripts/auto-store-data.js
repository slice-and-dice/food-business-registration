/* global $ */
$('body').on('submit', 'form', function (e) {
  // on form submit, create invisible checkboxes for each element with the 'data-riskid' attribute
  // those that have been selected are checked, and those that aren't are left unchecked
  // this data is then sent to the session and processed at the end to be sent for risk calculation

  var $riskEls = $(this).find('[data-riskid]').toArray().map((element) => {
    return {id: element.dataset.riskid, checked: element.checked};
  });

  var $invisibleRiskIdElements = [];
  $riskEls.forEach((el) => {
    var $riskInputEl = document.createElement('input');
    $riskInputEl.setAttribute('style', 'display: none;');
    $riskInputEl.setAttribute('type', 'checkbox');
    $riskInputEl.setAttribute('name', 'risk-' + el.id);
    $riskInputEl.setAttribute('value', el.id);
    if(el.checked === true) {
      $riskInputEl.checked = true;
    }
    $invisibleRiskIdElements.push($riskInputEl);
  });

  $(this).prepend($invisibleRiskIdElements);

  
  // On form submit, add hidden inputs for checkboxes so the server knows if
  // they've been unchecked. This means we can automatically store and update
  // all form data on the server, including checkboxes that are checked, then
  // later unchecked

  var $checkboxes = $(this).find('input:checkbox')

  var $inputs = []
  var names = {}

  $checkboxes.each(function () {
    var $this = $(this)

    if (!names[$this.attr('name')]) {
      names[$this.attr('name')] = true
      var $input = $('<input type="hidden">')
      $input.attr('name', $this.attr('name'))
      $input.attr('value', '_unchecked')
      $inputs.push($input)
    }
  })

  $(this).prepend($inputs)
});
