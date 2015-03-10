var util = require('util'),
    request = require('request'),
    client = require('./client');

var User = exports.User = function(options) {
	client.Client.call(this, options);
};
util.inherits(User, client.Client);

User.prototype.login = function(username, password, callback) {
	var self = this;
	this._request({
		method : 'POST',
		path : '/auth/login',
		body : {
			username : username,
			password : password
		}
	}, callback, function(res, result) {
		self.config.token = result.token;
		callback(null, result);
	});
};
User.prototype.get = function(callback) {
	this._request({
		method : 'GET',
		path : '/user'
	}, callback, function(res, result) {
		callback(null, result);
	});
};
