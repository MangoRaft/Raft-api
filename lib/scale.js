var util = require('util'),
    request = require('request'),
    client = require('./client');

var Scale = exports.Scale = function(options) {
	client.Client.call(this, options);
};
util.inherits(Scale, client.Client);

Scale.prototype.scale = function(name, options, callback) {
	this._request({
		method : 'POST',
		path : '/apps/' + name + '/scale',
		body : options
	}, callback, function(res, result) {
		callback(null, result);
	});
};
