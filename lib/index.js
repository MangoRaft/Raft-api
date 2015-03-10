exports.User = require('./user').User;
exports.Apps = require('./apps').Apps;
exports.Env = require('./env').Env;
exports.Build = require('./build').Build;
exports.Commit = require('./commit').Commit;
exports.Container = require('./container').Container;
exports.Actions = require('./actions').Actions;
exports.Scale = require('./scale').Scale;
exports.Addons = require('./addons').Addons;
exports.Domains = require('./domains').Domains;

exports.createClient = function(options) {
	return {
		user : new exports.User(options),
		apps : new exports.Apps(options),
		env : new exports.Env(options),
		build : new exports.Build(options),
		commit : new exports.Commit(options),
		container : new exports.Container(options),
		actions : new exports.Actions(options),
		scale : new exports.Scale(options),
		addons : new exports.Addons(options),
		domains : new exports.Domains(options)
	};
};
