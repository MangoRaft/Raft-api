var util = require('util'),
    request = require('request'),
    client = require('./client');

var Actions = exports.Actions = function(options) {
	client.Client.call(this, options);
};
util.inherits(Actions, client.Client);

Actions.prototype.stop = function(name, callback) {

	var path = '/apps/' + name + '/action';
	this._request({
		method : 'DELETE',
		path : path
	}, callback, function(res, result) {
		callback(null, result);
	});
};
Actions.prototype.restart = function(name, callback) {

	var path = '/apps/' + name + '/action';
	this._request({
		method : 'POST',
		path : path,
		body : {}
	}, callback, function(res, result) {
		callback(null, result);
	});
};
