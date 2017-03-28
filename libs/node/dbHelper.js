// interact with database: mongodb
var mongoose = require('mongoose');
var request = require('request');
require('../../app_api/models/db');
var UserModel = mongoose.model('users');
var requestHelper = require('./requestHelper');

module.exports = new function (){
	//insert new User
	this.insertOne = function (req, res, Model) {
		try{
			var query = new Model (req.body);
			query.save (function (err, data){
				if (err){
					console.log(err)
					requestHelper.sendJsonRes(res, 404, err);
					return
				}
				requestHelper.sendJsonRes (res, 201, {status: 'success', data: data});			
			});	
		}
		catch(ex){
			console.log(ex)
			requestHelper.sendJsonRes (res, 500, {status: 'failure', message: ex});
		}
	};

	this.insertSome = function (req, res, Model) {	
		try {
			Model.collection.insert(req.body, {}, function (err, data){
				if (err){
					console.log(err)
					requestHelper.sendJsonRes(res, 404, err);
					return
				}

				requestHelper.sendJsonRes (res, 201, {status: 'success', data: data.insertedCount + ' documents being inserted'});			
			});
		}
		catch (ex){
			console.log(ex)
			requestHelper.sendJsonRes (res, 500, {status: 'failure', message: ex});		
		}
	};

	this.updateOneById = function (req, res, Model, idName){
		try {
			if (req.params && req.params[idName]){
				var idValue = req.params[idName];
				var update = req.body;	
				var query = Model
					.findByIdAndUpdate (mongoose.Types.ObjectId(idValue), {$set: update}, {runValidators: true});
				requestHelper.stdExec (res, query);
			}
			else{
				requestHelper.sendJsonRes(res, 404, {
					message: 'no passed params'			
				});
			}
		} 
		catch (ex){
			console.log(ex)
			requestHelper.sendJsonRes(res, 500, {
				message: 'internal error'		
			});		
		}
	};

	this.findOneById = function(req, res, Model, idName) {
		if (req.params && req.params[idName]){
			var idValue = req.params[idName];
			var attrs = req.query.attrs;		
			var query = Model
				.findById(idValue)
				.select(attrs);
			requestHelper.stdExec (res, query);
		}
		else{
			requestHelper.sendJsonRes(res, 404, {
				message: 'no passed params'			
			});
		}	 	 
	};

	this.findSome = function(req, res, Model, paramFunc) {
		try{
			var queryParams = paramFunc (req.query);
			var query = Model.find(queryParams.conditions, queryParams.projection, queryParams.opts);
			requestHelper.stdExec (res, query);
		}
		catch(ex){
			console.log(ex)
			requestHelper.sendJsonRes (res, 500, {status: 'failure', message: ex});
		}
	};
}();
