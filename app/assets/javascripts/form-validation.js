/* global $ */

$('#fsa-radio-button-form').submit(function (e) {

  var inputs = $('[type="radio"]');

  var showErrorSummary = true;

  $.map(inputs, function (el, index) {
    if (el.checked === true) {
      showErrorSummary = false;
    }
  });

  if (showErrorSummary === true) {
    e.preventDefault();

    $(".error-summary").removeClass("no-display");
    $(".error-message").removeClass("no-display");
    $(".form-group").first().addClass('form-group-error');
  }
});

$('#fsa-radio-button-form-final-page').submit(function (e) {
  var inputs = $('[type="radio"]');

  var showErrorSummary = true;

  $.map(inputs, function (el, index) {
    if (el.checked === true) {
      showErrorSummary = false;
    }
  });

  if (showErrorSummary === true) {
    e.preventDefault();

    $(".error-summary").removeClass("no-display");
    $(".error-message").removeClass("no-display");
    $(".form-group").parent().children().eq(1).addClass('form-group-error');
  }
});

$('#fsa-checkbox-form').submit(function (e) {
  var inputs = $('[type="checkbox"]');

  var showErrorSummary = true;

  $.map(inputs, function (el, index) {
    if (el.checked === true) {
      showErrorSummary = false;
    }
  });

  if (showErrorSummary === true) {
    e.preventDefault();

    $(".error-summary").removeClass("no-display");
    $(".error-message").removeClass("no-display");
    $(".form-group").first().addClass('form-group-error');
  }
});

$('#opening-date-form').submit(function (e) {
  console.log('Opening date past form submitted');

  var inputs = $('.form-control');

  var twoDigitValidation = /[0-9]{2}/
  var fourDigitValidation = /[0-9]{4}/

  var dayInput = $('#dob-day');
  var monthInput = $('#dob-month');
  var yearInput = $('#dob-year');

  if (!(RegExp(twoDigitValidation).test(dayInput.val()) && RegExp(twoDigitValidation).test(monthInput.val()) && RegExp(fourDigitValidation).test(yearInput.val()))) {
    e.preventDefault();
    $('#opening-date-form-group-container').addClass('form-group-error');
    $(".error-message").removeClass("no-display");
    $(".error-summary").removeClass("no-display");
  } else {
    $('#opening-date-form-group-container').removeClass('form-group-error');
    $(".error-message").addClass("no-display");
    $(".error-summary").addClass("no-display");
  }
});

$("#find-address-button").click(function (e) {
  var postcodeElement = $("#postcode")[0];

  var postcodeRegex = "(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))";

  var validRegex = RegExp(postcodeRegex).test(postcodeElement.value);

  if (validRegex) {
    $(e.currentTarget).parent().append("<div class='big-gap'></div><div class='form-group'><select class='form-control'><option value='58 Petty France'>58 Petty France, London, SW1H 9EX</option><option value='70 Petty France'>70 Petty France, London, SW1H 9EX</option><option value='72 Petty France'>72 Petty France, London, SW1H 9EX</option></select></div>");
    $(postcodeElement).parent().removeClass('form-group-error')
  } else {
    $(".error-summary").removeClass("no-display");
    $(".error-message").removeClass("no-display");
    $(postcodeElement).parent().addClass('form-group-error')
  }
});

$('#establishment-address-form').submit(function(e) {

  var postcode = $('#postcode');

  var radioButtons = $('[type="radio"]');

  var radioButtonChecked = false;

  $.each(radioButtons, function (i, el) {
    console.log('el.checked', el.checked);
    if (el.checked) {
      radioButtonChecked = true;
    }
  });

  var postcodeRegex = "(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))";

  if (postcode.val().length === 0 && radioButtonChecked === false || postcode.length > 1 && RegExp(postcodeRegex).test(postcode.val()) === false) {
    e.preventDefault();

    $(".error-summary").removeClass("no-display");
    $(".error-message").removeClass("no-display");
    $(postcode[0]).parent().addClass('form-group-error');
  }

});

$('#establishment-address-details-form').submit(function(e) {
  var inputs = $('[type="radio"]');

  var radioButtons = [];

  var radioMappingToClass = {
    "typeOfPremise": {
      "id": "type-of-premise-form",
      "checked": false
    },
    "establishmentInGovFacility":{
      "id": "establishment-in-gov-facility-form",
      "checked": false
    }
  };

  $.each(inputs, function(i, el) {
    if (el.checked === true) {
      radioMappingToClass[el.name].checked = true;
    }
    // if($.inArray(el.name, radioButtons) === -1) radioButtons.push(el.name);
  });

  Object.keys(radioMappingToClass).forEach(function (mapping) {
    // console.log('radioMappingToClass[mapping]', radioMappingToClass[mapping]);
    var formGroup = $('#' + radioMappingToClass[mapping].id);
    if (radioMappingToClass[mapping].checked === false) {

      formGroup.addClass('form-group-error');
      $(".error-summary").removeClass("no-display");

    // $(".error-summary").removeClass("no-display");
    // $(".error-message").removeClass("no-display");
    // $(postcode[0]).parent().addClass('form-group-error');
    } else {
      formGroup.removeClass('form-group-error');
    }
  });

  if (radioMappingToClass.typeOfPremise.checked === false || radioMappingToClass.establishmentInGovFacility.checked === false) {
    e.preventDefault();
  }
});

  $('#ltdcompany-name-form,#operator-contact-form,#establishment-name-form,#establishment-contact-form,#soletrader-name-form,#operator-address-form').submit(function (e) {

  // On form submit, add hidden inputs for checkboxes so the server knows if
  // they've been unchecked. This means we can automatically store and update
  // all form data on the server, including checkboxes that are checked, then
  // later unchecked

  console.log('Any form submitted');

  var validationRules = {
    "number": /^[0-9]+$/,
    "telephone": /^[0-9]+$/,
    "email": /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  };

  var inputs = $('.form-control');

  var showErrorSummary;
  // if ($('.'))

  var radioButton = $('[type="radio"]');

  console.log('radioButton', radioButton);
  console.log('radioButton', radioButton);

  if (radioButton.length === 0 || radioButton[0].checked === false) {

    $.map(inputs, function (el, index) {

      var optionalField = el.hasAttribute('fsa-optional')
      // var validationType = el.getAttribute('fsa-type') ? el.getAttribute('fsa-type') : $('#' + el.getAttribute('id') + ' option:selected').attr('fsa-type');
      var validationType = el.getAttribute('fsa-type') ? el.getAttribute('fsa-type') : $('#' + el.getAttribute('id') + ' option:selected').attr('fsa-type');

      console.log(el);
      console.log('el.getAttribute("fsa-type")', el.getAttribute('fsa-type'));
      // console.log("$('#' + el.getAttribute('id') + ' option:selected').attr('fsa-type')", $('#' + el.prev().getAttribute('id') + ' option:selected').attr('fsa-type'));
      console.log("validationType", validationType);

      if (el.getAttribute('id') === 'contact-type') {
        validationType = $('#' + $(el).prev()[0].getAttribute('id') + ' option:selected').attr('fsa-type');
      }

      var rule = validationRules[validationType];

      if ($(el).is("select")) {
        return;
      }
      // console.log('el.name', el.name);

      // if (el.name === 'reuseOperatorContactDetails') {

      // }

      console.log('validationType:', validationType, ',!RegExp(rule).test(el.value)', !RegExp(rule).test(el.value), ',validationType && !RegExp(rule).test(el.value)', validationType && !RegExp(rule).test(el.value))
      if (validationType === 'number' || validationType === 'telephone') {
        el.value = el.value.replace(/ /g,'');
      }

      if (!($(el).is("select")) && el.value.length === 0 && !optionalField && !validationType || (validationType && !RegExp(rule).test(el.value))) {
        e.preventDefault();

        console.log('In here');

        showErrorSummary = true;
        $(el).siblings(".error-message").removeClass("no-display");
        $(el).parent().addClass('form-group-error');
      } else {
        $(el).parent().removeClass('form-group-error');
        $(".error-summary").first().addClass("no-display");
      }
    });

  }

  if (showErrorSummary === true) {
    $(".error-summary").first().removeClass("no-display");
  } else {
    $(".error-summary").first().addClass("no-display");
  }

  //MAKE SURE YOU DELETE THIS LINE!
  // e.preventDefault();
  console.log('\n\n')
});

$('#opening-days-form').submit(function(e) {

  var radioButtons = $('[type="radio"]');
  var checkBoxes = $('[type="checkbox"]');

  var buttonChecked;

  $.each(radioButtons, function (i, el) {
    console.log('el.checked', el.checked);
    if (el.checked && $('#irregular-description').val() !== "") {
      buttonChecked = true;
    }
  });

  $.each(checkBoxes, function (i, el) {
    console.log('el.checked', el.checked);
    if (el.checked) {
      buttonChecked = true;
    }
  });

  if(buttonChecked !== true) {
    e.preventDefault();

    $(".error-summary").removeClass("no-display");
    $(".error-message").removeClass("no-display");
    $("#opening-days-form-group-1").addClass('form-group-error');
    $("#opening-days-form-group-2").addClass('form-group-error');
  }
});

$('#irregular-hours').change(function(e) {
  // remove all ticks from the checkboxes
  var checkBoxes = $('[type="checkbox"]');
  $.each(checkBoxes, function (i, el) {
    el.checked = false;
  });

  // display the additional text box
  $('#irregular-description-container').removeClass("no-display");
});

$('[type="checkbox"]').change(function(e) {
  // remove all ticks from the radio buttons
  var radioButtons = $('[type="radio"]');
  $.each(radioButtons, function (i, el) {
    el.checked = false;
  });

  // hide the additional text box
  $('#irregular-description-container').addClass("no-display");
});

$('.custom-timepicker input').keyup(function(e) {
  var stringLength = e.target.value.length;
  if(stringLength === 2) {
    $(this).nextAll('input').first().focus();
  }
  else if(stringLength > 2) {
    e.target.value = e.target.value.slice(0, 2);
    $(this).nextAll('input').first().focus();
  }
});

$('#opening-hours-router-form').submit(function(e) {

  var radioButtons = $('[type="radio"]');

  var buttonChecked;

  $.each(radioButtons, function (i, el) {
    console.log('el.checked', el.checked);
    if (el.checked) {
      buttonChecked = true;
    }
  });

  if(buttonChecked !== true) {
    e.preventDefault();

    $(".error-summary").removeClass("no-display");
    $(".error-message").removeClass("no-display");
    $("#opening-hours-router-form-group").addClass('form-group-error');
  }
});

$('#opening-hours-same-time-form').submit(function(e) {
  if(checkIfTimeFormat().inputEmpty === true || checkIfTimeFormat().notTimeFormat === true) {
    e.preventDefault();

    $(".error-summary").removeClass("no-display");
    $(".error-message").removeClass("no-display");
    $("#opening-hours-same-time-form-group").addClass('form-group-error');
  }
});

$('#opening-hours-individual-form').submit(function(e) {
  if(checkIfTimeFormat().inputEmpty === true || checkIfTimeFormat().notTimeFormat === true) {
    e.preventDefault();

    $(".error-summary").removeClass("no-display");
    $(".error-message").removeClass("no-display");
    $("#opening-hours-individual-form-group").addClass('form-group-error');
  }
});

function checkIfTimeFormat() {
  var inputFields = $('.custom-timepicker input');
  var hourInputs = $('.hourInput');
  var minuteInputs = $('.minuteInput');

  var inputEmpty = false;
  var notTimeFormat = false;

  $.each(inputFields, function (i, el) {
    if (el.value === '') {
      inputEmpty = true;
    }
  });

  $.each(hourInputs, function (i, el) {
    if (Number(el.value) >= 24 || isNaN(el.value)) {
      notTimeFormat = true;
    }
  });

  $.each(minuteInputs, function (i, el) {
    if (Number(el.value) >= 60 || isNaN(el.value)) {
      notTimeFormat = true;
    }
  });
  return {inputEmpty, notTimeFormat};
}