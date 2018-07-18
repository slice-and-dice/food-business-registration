// import { constants } from 'zlib';

// import { read } from 'fs';

const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const Promise = require("bluebird");
const request = require("request");
const moment = require("moment");

// Route index page
router.get("/", function(req, res) {
  // res.render('index');
  res.redirect("/reg-pages/start");
});

router.get("/start-submit-redirect", function(req, res) {
  // var detail = req.query.businessDetail;
  var detail = req.query.registration_type;

  switch (detail) {
    case "New food business":
      res.redirect("/reg-pages/registration-type");
      break;
    case "Updating existing business":
      res.redirect("/reg-pages/updating-details-existing-food-business");
      break;
    case "Closure of a food business":
      res.redirect("/reg-pages/closure-existing-registered-food-business");
      break;
    default:
      res.render("index.html");
  }
});

router.get("/opening-hours-redirect", function(req, res) {
  var detail = req.query.openCloseSameTimes;

  switch (detail) {
    case "true":
      res.redirect("/reg-pages/opening-hours-same-time");
      break;
    case "false":
      res.redirect("/reg-pages/opening-hours-individual");
      break;
    default:
      res.render("index.html");
  }
});

router.get("/opening-days-redirect", function(req, res) {
  var detail = req.query.openingDaysIrregular;

  switch (detail) {
    case "Irregular opening hours":
      res.redirect("/reg-pages/business-importexport");
      break;
    default:
      res.redirect("/reg-pages/opening-hours-router");
  }
});

router.get("/registration-role-redirect", function(req, res) {
  var detail = req.query.registration_role;
  req.session.registration_role = req.query.registration_role;

  switch (detail) {
    case "I operate this food business":
      res.redirect("/reg-pages/soletrader-name");
      break;
    case "I operate this business in a partnership":
      res.redirect("/reg-pages/soletrader-name");
      break;
    case "I represent a person, charity or company which operates this business":
      res.redirect("/reg-pages/operator-type");
      break;
    default:
      res.render("index.html");
  }
});

router.get("/operator-type-redirect", function(req, res) {
  var detail = req.query.operator_type;

  switch (detail) {
    case "personOperatesBusiness":
      res.redirect("/reg-pages/soletrader-name");
      break;
    case "companyOperatesBusiness":
      res.redirect("/reg-pages/ltdcompany-name");
      break;
    case "charityOperatesBusiness":
      res.redirect("/reg-pages/charity-name");
      break;
    default:
      res.render("index.html");
  }
});
router.get("/operator-contact-redirect", function(req, res) {
  var detail = req.session.registration_role;

  switch (detail) {
    case "I operate this food business":
      res.redirect("/reg-pages/operator-contact");
      break;
    case "I operate this business in a partnership":
      res.redirect("/reg-pages/operator-contact");
      break;
    case "I represent a person, charity or company which operates this business":
      res.redirect("/reg-pages/representative-contact");
      break;
    default:
      res.redirect("/reg-pages/operator-contact");
  }
});

router.get("/business-highrisk-redirect", function(req, res) {
  var detail = req.query.high_risk_activities;

  switch (detail) {
    case "true":
      res.redirect("/reg-pages/business-restaurant-meatfish");
      break;
    case "false":
      res.redirect("/reg-pages/business-otherdetail");
      break;
    default:
      res.render("index.html");
  }
});

router.get("/opening-date-redirect", function(req, res) {
  var detail = req.query.opening_status;

  switch (detail) {
    case "alreadyTrading":
      res.redirect("/reg-pages/opening-date-past");
      break;
    case "notTradingYet":
      res.redirect("/reg-pages/opening-date-future");
      break;
    default:
      res.render("index.html");
  }
});

router.get("/business-customers-redirect", function(req, res) {
  var detail = req.query.supplies_to;

  switch (detail) {
    case "Other businesses":
      res.redirect("/reg-pages/business-b2b");
      break;
    case "End consumers":
      res.redirect("/reg-pages/business-consumerfacing");
      break;
    default:
      res.render("index.html");
  }
});

router.get("/summary-declaration-redirect", function(req, res) {
  // console.log("req.session.data");
  if (
    req.session.data["supplies_to"] &&
    req.session.data["supplies_to"].length === 1 &&
    req.session.data["supplies_to"][0] === "Other businesses"
  ) {
    req.session.data.supplies_toLabel = "Supplies";
  } else {
    req.session.data.supplies_toLabel = "Serves to";
  }

  // var monthMapping = {
  //   "01": "Jan",
  //   "1": "Jan",
  //   "02": "Feb",
  //   "2": "Feb",
  //   "03": "Mar",
  //   "3": "Mar",
  //   "04": "Apr",
  //   "4": "Apr",
  //   "05": "May",
  //   "5": "May",
  //   "06": "Jun",
  //   "6": "Jun",
  //   "07": "Jul",
  //   "7": "Jul",
  //   "08": "Aug",
  //   "8": "Aug",
  //   "09": "Sep",
  //   "9": "Sep",
  //   "10": "Oct",
  //   "10": "Oct",
  //   "11": "Nov",
  //   "11": "Nov",
  //   "12": "Dec",
  //   "12": "Dec"
  // };

  // var month = req.session.data['openingDateMonth'];

  // req.session.data['openingDateMonth'] = monthMapping[month];

  if (
    req.session.data["reuseOperatorContactDetails"] &&
    req.session.data["reuseOperatorContactDetails"] === "yes" &&
    req.session.data["establishment_contact_type"] &&
    req.session.data["establishment_contact_type"].length === 0 &&
    req.session.data["establishment_email"] &&
    req.session.data["establishment_email"].length === 0
  ) {
    req.session.data["establishment_contact_type"] =
      req.session.data["operator_contact_type"];
    req.session.data["establishment_email"] =
      req.session.data["operator_email"];
  }

  if (
    req.session.data["establishmentAddressDoNotKnow"] &&
    req.session.data["establishmentAddressDoNotKnow"].length > 0
  ) {
    req.session.data["establishmentAddressLine1"] = "";
    req.session.data["establishmentAddressLine2"] = "";
    req.session.data["establishment_postcode"] = "";
  } else {
    req.session.data["establishmentAddressLine1"] = "Petty France";
    req.session.data["establishmentAddressLine2"] = "London";
    req.session.data["establishmentAddressDoNotKnow"] = "";
  }

  if (
    req.session.data["openingDateDay"] &&
    req.session.data["openingDateMonth"] &&
    req.session.data["openingDateYear"]
  ) {
    var dateString = req.session.data.openingDateYear.concat(
      "-",
      req.session.data.openingDateMonth,
      "-",
      req.session.data.openingDateDay
    );

    req.session.data.trading_date = moment(dateString).format("D MMM YYYY");
  }

  if (req.session.data["openingHoursAll"]) {
    req.session.data.opening_hours = req.session.data.openingHoursAll.join(":");
  }

  if (req.session.data["closingHoursAll"]) {
    req.session.data.closing_hours = req.session.data.closingHoursAll.join(":");
  }

  if (req.session.data["openingHoursMonday"]) {
    req.session.data.opening_hours_monday = req.session.data.openingHoursMonday.join(
      ":"
    );
  }
  if (req.session.data["openingHoursTuesday"]) {
    req.session.data.opening_hours_tuesday = req.session.data.openingHoursTuesday.join(
      ":"
    );
  }
  if (req.session.data["openingHoursWednesday"]) {
    req.session.data.opening_hours_wednesday = req.session.data.openingHoursWednesday.join(
      ":"
    );
  }
  if (req.session.data["openingHoursThursday"]) {
    req.session.data.opening_hours_thursday = req.session.data.openingHoursThursday.join(
      ":"
    );
  }
  if (req.session.data["openingHoursFriday"]) {
    req.session.data.opening_hours_friday = req.session.data.openingHoursFriday.join(
      ":"
    );
  }
  if (req.session.data["openingHoursSaturday"]) {
    req.session.data.opening_hours_saturday = req.session.data.openingHoursSaturday.join(
      ":"
    );
  }
  if (req.session.data["openingHoursSunday"]) {
    req.session.data.opening_hours_sunday = req.session.data.openingHoursSunday.join(
      ":"
    );
  }

  if (req.session.data["closingHoursMonday"]) {
    req.session.data.closing_hours_monday = req.session.data.closingHoursMonday.join(
      ":"
    );
  }
  if (req.session.data["closingHoursTuesday"]) {
    req.session.data.closing_hours_tuesday = req.session.data.closingHoursTuesday.join(
      ":"
    );
  }
  if (req.session.data["closingHoursWednesday"]) {
    req.session.data.closing_hours_wednesday = req.session.data.closingHoursWednesday.join(
      ":"
    );
  }
  if (req.session.data["closingHoursThursday"]) {
    req.session.data.closing_hours_thursday = req.session.data.closingHoursThursday.join(
      ":"
    );
  }
  if (req.session.data["closingHoursFriday"]) {
    req.session.data.closing_hours_friday = req.session.data.closingHoursFriday.join(
      ":"
    );
  }
  if (req.session.data["closingHoursSaturday"]) {
    req.session.data.closing_hours_saturday = req.session.data.closingHoursSaturday.join(
      ":"
    );
  }
  if (req.session.data["closingHoursSunday"]) {
    req.session.data.closing_hours_sunday = req.session.data.closingHoursSunday.join(
      ":"
    );
  }

  if (req.session.data["reuseOperatorContactDetails"]) {
    req.session.data.establishment_contact_type =
      req.session.data.operator_contact_type;
    req.session.data.establishment_email = req.session.data.operator_email;
  }

  // console.log('req.session.data', req.session.data);

  res.redirect("/reg-pages/summary");
});

router.post("/reg-pages/confirmation", function(req, res, next) {
  // console.log("req.session.data", req.session.data);

  const localAuthorityConfig = {
    id: "4016",
    name: "Malvern Hills District Council"
  };

  const pipelineConfig = {
    modules: [
      {
        url: "https://fsa-rn.epimorphics.net/fsa-rn/1000/01",
        method: "GET"
      },
      {
        url: "https://risk-engine.cloudapps.digital/calculate",
        method: "POST"
      },
      {
        url: "https://registration-router.cloudapps.digital/newregistration",
        method: "POST"
      }
    ]
  };

  answerIds = [];

  Object.keys(req.session.data).forEach(function(sessionEntry) {
    if (sessionEntry.indexOf("risk-") > -1) {
      var newRiskIDs = req.session.data[sessionEntry];

      answerIds.push(newRiskIDs[0]);
    }
  });

  //Need to do something here to format the dates correctly..

  // if (req.session.data['openingDays'] && Array.isArray(req.session.data['openingDays'])) {
  //   //Using semicolon as delimiter
  //   req.session.data.opening_days = req.session.data.openingDays.join(';');
  // }

  // if (req.session.data['import_export'] && Array.isArray(req.session.data['import_export'])) {
  //   req.session.data.import_export = req.session.data.import_export.join(';');
  // }

  // if (req.session.data['food_activities'] && Array.isArray(req.session.data['food_activities'])) {
  //   req.session.data.food_activities = req.session.data.food_activities.join(';');
  // }

  // if (req.session.data['supplies_to'] && Array.isArray(req.session.data['supplies_to'])) {
  //   req.session.data.supplies_to = req.session.data.supplies_to.join(';');
  // }

  req.session.data.establishment_contact_type = Array.isArray(
    req.session.data.establishment_contact_type
  )
    ? req.session.data.establishment_contact_type
    : [req.session.data.establishment_contact_type];

  req.session.data.operator_contact_type = Array.isArray(
    req.session.data.operator_contact_type
  )
    ? req.session.data.operator_contact_type
    : [req.session.data.operator_contact_type];

  var data = processData(req.session.data);

  // console.log("data", data);

  const requestData = JSON.stringify(
    Object.assign({
      registrationData: data,
      localAuthority: localAuthorityConfig,
      pipelineConfig: pipelineConfig,
      answerIds: answerIds
    })
  );

  console.log(requestData);

  const url = process.env.REGISTRATION_SUBMISSION_URL;

  if (url) {
    const fetchOptions = {
      method: "POST",
      body: requestData,
      headers: { "Content-Type": "application/json" }
    };

    fetch(url, fetchOptions)
      .then(function(res) {
        return res.json();
      })
      .then(function(json) {
        console.log("json response", json);

        req.session.data["fsa-rn"] = json["fsa-rn"];
        next();
      })
      .catch(function(err) {
        return console.error("json err", err);
      });
  } else {
    next();
  }
});

processData = function(data) {
  var object = {};

  Object.keys(data).forEach(function(key) {
    if (data[key]) {
      object[key] = data[key];
    }
  });

  return object;
};

// Branching
// router.get('/establishment-details-redirect', function (req, res) {
//   // Get the answer from the query string (eg. ?over18=false)
//   // var over18 = req.query.over18

//   var detail = req.query.establishmentDetail

//   switch(detail) {
//     case 'newBusinessRegistration':
//       res.redirect('/new-food-business-details')
//       break;
//     case 'updatingBusinessDetails':
//       res.redirect('updating-details-existing-food-business')
//       break;
//     case 'closureOfBusiness':
//       res.redirect('closure-existing-registered-food-business')
//       break;
//     default:
//       res.render('index.html')
//   }
// })

// Add your routes here - above the module.exports line

module.exports = router;
