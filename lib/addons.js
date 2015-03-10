var util = require('util'),
    request = require('request'),
    client = require('./client');

var Addons = exports.Addons = function(options) {
	client.Client.call(this, options);
};
util.inherits(Addons, client.Client);

Addons.prototype.get = function(name, callback) {

	this._request({
		method : 'GET',
		path : '/apps/' + name + '/addon'
	}, callback, function(res, result) {
		callback(null, result);
	});
};
Addons.prototype.create = function(name, type, size, callback) {
	this._request({
		method : 'POST',
		path : '/apps/' + name + '/addon',
		body : {
			type : type,
			size : size
		}
	}, callback, function(res, result) {
		callback(null, result);
	});
};
Addons.prototype.remove = function(name, type, callback) {
	this._request({
		method : 'DELETE',
		path : '/apps/' + name + '/addon/' + type
	}, callback, function(res, result) {
		callback(null, result);
	});
};
