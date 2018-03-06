// import { read } from 'fs';

const express = require('express');
const router = express.Router();
const request = require('request');


// Route index page
router.get('/', function (req, res) {
  // res.render('index');
  res.redirect('/reg-pages/start');
});

router.get('/start-submit-redirect', function (req, res) {
  // var detail = req.query.businessDetail;
  var detail = req.query.startUserRegisteringBusiness;

  switch(detail) {
    case 'New food business':
      res.redirect('/reg-pages/registration-type')
      break;
    case 'Updating existing business':
      res.redirect('/reg-pages/updating-details-existing-food-business')
      break;
    case 'Closure of a food business':
      res.redirect('/reg-pages/closure-existing-registered-food-business')
      break;
    default:
      res.render('index.html')
  }

});

router.get('/opening-hours-redirect', function (req, res) {
  var detail = req.query.openCloseSameTimes;

  switch(detail) {
    case 'Yes':
      res.redirect('/reg-pages/opening-hours-same-time')
      break;
    case 'No':
      res.redirect('/reg-pages/opening-hours-individual')
      break;
    default:
      res.render('index.html')
  }

});

router.get('/opening-days-redirect', function (req, res) {
  var detail = req.query.openingDaysIrregular;

  switch(detail) {
    case 'Irregular opening hours':
      res.redirect('/reg-pages/business-importexport')
      break;
    default:
      res.redirect('/reg-pages/opening-hours-router')
  }

});

router.get('/registration-type-redirect', function (req, res) {
  var detail = req.query.registrationTypeOperatorDetail;

  switch(detail) {
    case 'I operate this food business':
      res.redirect('/reg-pages/soletrader-name')
      break;
    case 'I operate this business in a partnership':
      res.redirect('/reg-pages/soletrader-name')
      break;
    case 'I represent a person, charity or company which operates this business':
      res.redirect('/reg-pages/operator-type')
      break;
    default:
      res.render('index.html')
  }

});

router.get('/operator-type-redirect', function (req, res) {
  var detail = req.query.operatorBusinessDetail;

  switch(detail) {
    case 'personOperatesBusiness':
      res.redirect('/reg-pages/soletrader-name')
      break;
    case 'companyOperatesBusiness':
      res.redirect('/reg-pages/ltdcompany-name')
      break;
    case 'charityOperatesBusiness':
      res.redirect('/reg-pages/charity-name')
      break;
    default:
      res.render('index.html')
  }

});

router.get('/opening-date-redirect', function (req, res) {
  var detail = req.query.openingStatus;

  switch(detail) {
    case 'alreadyTrading':
      res.redirect('/reg-pages/opening-date-past')
      break;
    case 'notTradingYet':
      res.redirect('/reg-pages/opening-date-future')
      break;
    default:
      res.render('index.html')
  }
});

router.get('/business-customers-redirect', function (req, res) {
  var detail = req.query.businessCustomersSupply;

  switch(detail) {
    case 'Other businesses':
      res.redirect('/reg-pages/business-b2b')
      break;
    case 'End consumers':
      res.redirect('/reg-pages/business-consumerfacing')
      break;
    default:
      res.render('index.html')
  }
});

router.get('/summary-declaration-redirect', function (req, res) {
  // console.log("req.session.data['businessCustomersSupply']", req.session.data['businessCustomersSupply']);
  if (req.session.data['businessCustomersSupply'] && req.session.data['businessCustomersSupply'].length === 1 && req.session.data['businessCustomersSupply'][0] === 'Other businesses') {
    req.session.data.businessCustomersSupplyLabel = 'Supplies';
  } else {
    req.session.data.businessCustomersSupplyLabel = 'Serves to';
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

  if (req.session.data['reuseOperatorContactDetails'] && req.session.data['reuseOperatorContactDetails'] === 'yes' && req.session.data['establishmentContactTelephone'] && req.session.data['establishmentContactTelephone'].length === 0 && req.session.data['establishmentContactEmail'] && req.session.data['establishmentContactEmail'].length === 0) {
    req.session.data['establishmentContactTelephone'] = req.session.data['operatorContactTelephone'];
    req.session.data['establishmentContactEmail'] = req.session.data['operatorContactEmail'];
  }

  if (req.session.data['establishmentAddressDoNotKnow'] && req.session.data['establishmentAddressDoNotKnow'].length > 0) {
    req.session.data['establishmentAddressLine1'] = '';
    req.session.data['establishmentAddressLine2'] = '';
    req.session.data['establishmentAddressPostcode'] = '';
  } else {
    req.session.data['establishmentAddressLine1'] = 'Petty France';
    req.session.data['establishmentAddressLine2'] = 'London';
    req.session.data['establishmentAddressDoNotKnow'] = '';
  }

  res.redirect('/reg-pages/summary-declaration');
});

router.get('/confirmation-redirect', function (req, res) {
  let riskEnginePostObject = { "answerIds": [] };
  console.log(riskEnginePostObject);
  Object.keys(req.session.data).forEach((sessionEntry) => {
    if(sessionEntry.indexOf('risk-') > -1) {
      let newRiskIDs = req.session.data[sessionEntry];
      riskEnginePostObject.answerIds.push(...newRiskIDs);
    }
  });

  console.log(riskEnginePostObject);

  let riskEnginePostConfig = {
    url:'https://risk-engine.cloudapps.digital/calculate',
    json: true,
    body: riskEnginePostObject
  }

  request.post(
    riskEnginePostConfig,
    (err, httpResponse, body) => {
      if (err) { return console.error('upload failed:', err); }
      console.log('Risk engine responded: ', body);
    }
  );

  res.redirect('/reg-pages/confirmation');
});

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

module.exports = router
