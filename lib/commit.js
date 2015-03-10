var util = require('util'),
    request = require('request'),
    client = require('./client');

var Commit = exports.Commit = function(options) {
	client.Client.call(this, options);
};
util.inherits(Commit, client.Client);

Commit.prototype.get = function(name, commit_id, callback) {

	var path = '/apps/' + name + '/commit';
	if ( typeof commit_id == 'function') {
		callback = commit_id;
	} else {
		path = path + '/' + commit_id;
	}

	this._request({
		method : 'GET',
		path : path
	}, callback, function(res, result) {
		callback(null, result);
	});
};
