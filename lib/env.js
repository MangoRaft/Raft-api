var util = require('util'),
    request = require('request'),
    client = require('./client');

var Env = exports.Env = function(options) {
	client.Client.call(this, options);
};
util.inherits(Env, client.Client);

Env.prototype.get = function(name, callback) {

	this._request({
		method : 'GET',
		path : '/apps/' + name + '/env'
	}, callback, function(res, result) {
		callback(null, result);
	});
};
Env.prototype.update = function(name, values, callback) {
	this._request({
		method : 'POST',
		path : '/apps/' + name + '/env',
		body : {
			values : values
		}
	}, callback, function(res, result) {
		callback(null, result);
	});
};
