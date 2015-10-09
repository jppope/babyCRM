var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'babyCRM' });
});


/* GET info get the info. */
router.get('/datainfo', function(req, res) {
  res.render('datainfo', { title: 'datainfo' });
});

/* GET opportunity page */
router.get('/opp', function(req, res) {
	res.render('opp', {
		title: 'Customer Information',
		"sources": ["Google Adwords", "Website", "Yelp", "Referral", "other"],
		"manufacturer":["Apple","Samsung","Other"],
		"kind":["iphone4 or 4s", "iphone5 or 5s", "iphone6","iphone 6+","Galaxy S3","Galaxy S4","Galaxy S5","Galaxy S6","Galaxy Note", "Galaxy Note2","Galaxy Note3", "other"],
		"company":["Verizon","At&t","Sprint","tMobile","other"],
		"problem":["Cracked Screen", "Water Damage","Headphone Jack", "Buttons", "Other"]

	});
});

router.get('/custydata', function(req, res) {
	res.render('custydata', {
		title: 'Current Customers',
	});
});



module.exports = router;
