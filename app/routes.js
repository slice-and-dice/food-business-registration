const express = require('express')
const router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index');
});

router.get('/start-submit-redirect', function (req, res) {
  var detail = req.query.businessDetail;

  switch(detail) {
    case 'newBusinessRegistration':
      res.redirect('/reg-pages/registration-type')
      break;
    case 'updatingBusinessDetails':
      res.redirect('/reg-pages/updating-details-existing-food-business')
      break;
    case 'closureOfBusiness':
      res.redirect('/reg-pages/closure-existing-registered-food-business')
      break;
    default:
      res.render('index.html')
  }

});

router.get('/registration-type-redirect', function (req, res) {
  var detail = req.query.operatorDetail;

  switch(detail) {
    case 'operateBusinessSolely':
      res.redirect('/reg-pages/soletrader-name')
      break;
    case 'operateBusinessInPartnership':
      res.redirect('/reg-pages/soletrader-name')
      break;
    case 'representPersonCharityCompanyOperator':
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
  var detail = req.query.businessSupplyCustomer;

  switch(detail) {
    case 'supplyFoodToBusiness':
      res.redirect('/reg-pages/business-b2b')
      break;
    case 'supplyFoodToConsumer':
      res.redirect('/reg-pages/business-consumerfacing')
      break;
    default:
      res.render('index.html')
  }
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
