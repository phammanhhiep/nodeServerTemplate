var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users');
var passport = require('passport');

//////// Users
router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

// the callback after google has authenticated the user
router.get('/auth/google/callback',
    passport.authenticate('google', {
            successRedirect : '/',
            failureRedirect : '/login'
    }));

router.get('/', ctrlUsers.readHomePage);

router.get('/login', ctrlUsers.readLoginPage);

module.exports = router;