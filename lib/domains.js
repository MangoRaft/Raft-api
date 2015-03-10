var util = require('util'),
    request = require('request'),
    client = require('./client');

var Domains = exports.Domains = function(options) {
	client.Client.call(this, options);
};
util.inherits(Domains, client.Client);

Domains.prototype.get = function(name, url, callback) {

	var path = '/apps/' + name + '/domain';
	if ( typeof url == 'function') {
		callback = url;
	} else {
		path = path + '/' + url;
	}

	this._request({
		method : 'GET',
		path : path
	}, callback, function(res, result) {
		callback(null, result);
	});
};
Domains.prototype.create = function(name, url, callback) {
	this._request({
		method : 'POST',
		path : '/apps/' + name + '/domain',
		body : {
			url : url
		}
	}, callback, function(res, result) {
		callback(null, result);
	});
};
Domains.prototype.remove = function(name, url, callback) {
	this._request({
		method : 'DELETE',
		path : '/apps/' + name + '/domain/' + url,
		body : {
			url : url
		}
	}, callback, function(res, result) {
		callback(null, result);
	});
};
