var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users');

//////// Users
router.post('/users/user', ctrlUsers.createUser);

module.exports = router;