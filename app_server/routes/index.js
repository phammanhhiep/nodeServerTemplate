var express = require("express");
var router = express.Router();
var passport = require('passport');
var jwt = require ('express-jwt');

var auth = jwt ({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload', // NOTICE
});

router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
router.get('/auth/google/callback', 
	passport.authenticate(
		'google', 
		{
			successRedirect : '/',
			failureRedirect : '/login'
		}
	)
);

// router.get('/', auth, othersCtrl.angularApp); // TEST local authen
router.get('/', othersCtrl.angularApp);


//Login page
router.get('/login', othersCtrl.login);
router.get('/register', othersCtrl.register);


module.exports = router;