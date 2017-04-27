var request = require ('request');

// Purpose: interact with api
module.exports = new function () {
	// send a request to a server, receive data and send back to client
	this.callApi = function (req, res, apiUrl, method, returnJson, view, qs, body, dataFilter, send, otherAction, cb) {
		var reqOptions = {
			url: apiUrl,
			method: method,
			json: returnJson,
		};

		if (Object.keys(body).length) {
			reqOptions.body = body;
		};

		if (Object.keys(qs).length) {
			reqOptions.qs = qs;
		};
		try{
			request (reqOptions, function(err, response, body){
				var data = dataFilter ? dataFilter (body.data) : body.data;

				// for other actions like logging
				// pass many params, but author of otherAction can choose some to use
				if (otherAction){
					otherAction (body, err, response, req, res, reqOptions);
				}

				res.status (response.statusCode);

				if (response.statusCode != 200 && response.statusCode != 201){
					var error = {
						user:{

						},
						stack: body.message,
						status: response.statusCode,
						look:{
							title: 'Error ',
							css:[],
							js:[]
						}
					}

					res.render ('error', {error: error});
				}

				send (req, res, view, data, cb);
			});
		}
		catch (err){
			this.sendJsonRes (res, 500, {message: err})
		}
	}

	this.readApi = function (req, res, apiUrl, view, qs, dataFilter, send, otherAction, cb) {
		var method = 'GET';
		var returnJson = true;
		var body = {};
		qs = qs ? qs : req.query;
		send = send ? send : function (req, res, view, data, cb){res.render (view, data, cb)};
		this.callApi (req, res, apiUrl, method, returnJson, view, qs, body, dataFilter, send, otherAction, cb);
	}

	this.postApi = function (req, res, apiUrl, view, body, dataFilter, send, otherAction, cb) {
		var method = 'POST';
		var returnJson = true;
		var qs = {};
		body = body ? body : req.body;
		send = send ? send : function (req, res, view, data, cb){res.render (view, data, cb)};
		this.callApi (req, res, apiUrl, method, returnJson, view, qs, body, dataFilter, send, otherAction, cb);
	}

	this.sendJsonRes = function (res, status, content){
		res.status(status);
		res.json(content);
	};

	this.stdExec = function (res, query) {
		var thisObj = this;
		try {
			query.exec(function (err, data) {

				if (err){
					console.log (err);
					thisObj.sendJsonRes(res, 400, {message: err});
					return
				}
				else if (!data) {
					console.log ('empty results');
					thisObj.sendJsonRes(res, 400, {
						message: 'empty results'
					});
					return
				}

				else {
					thisObj.sendJsonRes (res, 200, {message: 'success', data: data});
					return
				}
				
			});
		}
		catch (err) {
			console.log (err);
			this.sendJsonRes(res, 500, {
				message: err,
			});
		}				
	};

}();
