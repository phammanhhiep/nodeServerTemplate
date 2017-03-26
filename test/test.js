var assert = require("assert"); // node.js core module
var mongoose = require('mongoose');
var request = require('request');
// var UserModel = require('../app_api/models/users');
//mongoose.model('users');


describe('HTTP request', function() {
  describe('get /', function() {
    it('should render the homepage', function(done) {
      request({
      	method:'GET',
      	url:'http://localhost:3000'
      }, function(err, res, body){
      	assert.equal(res.statusCode,200);
      	done();
      })
    });
  });
});