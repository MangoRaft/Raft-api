var util = require('util'),
    request = require('request'),
    client = require('./client');

var Apps = exports.Apps = function(options) {
	client.Client.call(this, options);
};
util.inherits(Apps, client.Client);

Apps.prototype.get = function(name, callback) {

	var path = '/apps';
	if ( typeof name == 'function') {
		callback = name;
	} else {
		path = path + '/' + name;
	}

	this._request({
		method : 'GET',
		path : path
	}, callback, function(res, result) {
		callback(null, result);
	});
};
Apps.prototype.create = function(options, callback) {
	this._request({
		method : 'POST',
		path : '/apps',
		body : options
	}, callback, function(res, result) {
		callback(null, result);
	});
};
