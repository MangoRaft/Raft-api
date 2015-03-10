var util = require('util'),
    request = require('request'),
    client = require('./client');

var Container = exports.Container = function(options) {
	client.Client.call(this, options);
};
util.inherits(Container, client.Client);

Container.prototype.get = function(name, container_id, callback) {

	var path = '/apps/' + name + '/container';
	if ( typeof container_id == 'function') {
		callback = container_id;
	} else {
		path = path + '/' + container_id;
	}

	this._request({
		method : 'GET',
		path : path
	}, callback, function(res, result) {
		callback(null, result);
	});
};
Container.prototype.state = function(name, state, callback) {

	var path = '/apps/' + name + '/container/state/' + state;
	
	this._request({
		method : 'GET',
		path : path
	}, callback, function(res, result) {
		callback(null, result);
	});
};
Container.prototype.type = function(name, type, callback) {

	var path = '/apps/' + name + '/container/type/' + type;

	this._request({
		method : 'GET',
		path : path
	}, callback, function(res, result) {
		callback(null, result);
	});
};
