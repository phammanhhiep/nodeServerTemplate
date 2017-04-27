var express = require("express");

var router = express.Router();

var authCtrl = require ('../controllers/authentication');
var usersCtrl = require('../controllers/users');


router.post ('/register', authCtrl.register);
router.post ('/login', authCtrl.login);

router.get('/users', usersCtrl.readSomeUsers);
router.get('/users/user/:uId', usersCtrl.readOneUserById);
router.post('/users/create', usersCtrl.createOneUser);
router.post('/users/user/:uId/edit', usersCtrl.updateOneUserById);

module.exports = router;