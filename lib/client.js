var request = require('request'),
    base64 = require('utile').base64;
var hyperquest = require('hyperquest');

var Client = exports.Client = function(options) {
	this.options = options || {};

	if ( typeof this.options.get !== 'function') {
		this.options.get = function(key) {
			return this[key];
		};
	}

	this.config = {
		host : options.host || 'localhost',
		port : options.port || 9002,
		token : options.token
	};
};

Client.prototype.failCodes = {
	400 : 'Bad Request',
	401 : 'Not Authorized',
	402 : 'Payment Required',
	403 : 'Forbidden',
	404 : 'Item not found',
	405 : 'Method not Allowed',
	409 : 'Conflict',
	500 : 'Internal Server Error',
	503 : 'Service Unavailable'
};

Client.prototype.successCodes = {
	200 : 'OK',
	201 : 'Created'
};

Client.prototype.__defineGetter__('remoteUri', function() {
	return 'http://' + this.config.host + ':' + this.config.port;
});

Client.prototype._request = function(options, callback, success) {
	var self = this;

	if ( typeof options === 'string') {
		options = {
			path : options
		};
	}

	options.method = options.method || 'GET';
	options.url = this.remoteUri + options.path;
	options.headers = options.headers || {};
	options.headers['content-type'] = options.headers['content-type'] || 'application/json';
	options.timeout = 8 * 60 * 1000;

	if (this.config.token) {
		options.headers['token'] = this.config.token;
	}

	if (options.headers['content-type'] === 'application/json' && options.body) {
		options.body = JSON.stringify(options.body);
	}

	return request(options, function(err, response, body) {
		if (err) {
			return callback(err);
		}

		var statusCode = response.statusCode.toString(),
		    result,
		    error;

		try {
			result = JSON.parse(body);
		} catch (ex) {
			// Ignore Errors
		}

		if (Object.keys(self.failCodes).indexOf(statusCode) !== -1) {
			error = new Error('raft Error (' + statusCode + '): ' + self.failCodes[statusCode]);
			error.result = result;
			error.status = statusCode;
			return callback(error);
		}

		success(response, result);
	});
};