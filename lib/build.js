var util = require('util'),
    request = require('request'),
    client = require('./client');

var Build = exports.Build = function(options) {
	client.Client.call(this, options);
};
util.inherits(Build, client.Client);

Build.prototype.get = function(name, build_id, callback) {

	var path = '/apps/' + name + '/build';
	if ( typeof build_id == 'function') {
		callback = build_id;
	} else {
		path = path + '/' + build_id;
	}

	this._request({
		method : 'GET',
		path : path
	}, callback, function(res, result) {
		callback(null, result);
	});
};
