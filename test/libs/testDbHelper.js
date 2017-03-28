var assert = require("assert"); // node.js core module
var mongoose = require('mongoose');
var request = require('request');
var dbHelper = require('../dbHelper');

describe('Database test', function() {
	describe('Create one new user', function() {
		it('should create one new user', function(done) {
			request({
				method:'POST',
				url:'http://localhost:3000/users/user',
				body: {
					name:'cuong'
				},
				json: true
			}, function(err, res, body){
				assert.equal(res.statusCode, 200);
				done();
			})
		});
	});

	describe('Create some new users', function() {
		it('should create some new users', function(done) {
			request({
				method:'POST',
				url:'http://localhost:3000/users/someUsers',
				body:[
						{name:'cun'},
						{name:'trung'},
						{name:'haha'}
					],
				json: true
			}, function(err, res, body){
				assert.equal(res.statusCode, 201);
				done();
			})
		});
	});

	describe('Update one by ID', function() {
		it('should update one user by ID', function(done) {
			request({
				method:'POST',
				url:'http://localhost:3000/users/user/58d8ebf120042d4228f2daa5',
				body:{name:'change the name'},
				json: true
			}, function(err, res, body){
				assert.equal(res.statusCode, 200);
				done();
			})
		});
	});

	describe('Search one by ID', function() {
		it('should search one user by ID', function(done) {
			request({
				method:'POST',
				url:'http://localhost:3000/users/user/search/58d8ebf120042d4228f2daa5',
				body:{},
				json: true
			}, function(err, res, body){
				assert.equal(res.statusCode, 200);
				done();
			})
		});
	});

	describe('Search some users', function() {
		it('should search some users', function(done) {
			request({
				method:'POST',
				url:'http://localhost:3000/users/user/find/some',
				body:{},
				json: true
			}, function(err, res, body){
				assert.equal(res.statusCode, 200);
				done();
			})
		});
	});
});