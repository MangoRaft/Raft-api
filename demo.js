var eyes = require('eyes'),
    raft = require('./lib');

// Create a new client for communicating with the haibu server
var name = 'noxious-train-1419'
var client = raft.createClient({
	host : 'localhost',
	port : 8081,
	token : '54f7d78e27e566031f72393c|vY0ZRKFs2bLMypQeGd4N7rn'
});
function user() {
	console.log('user()');
	client.user.get(function(err, result) {
		if (err)
			throw err
		eyes.inspect(result);
		apps();
	});
}

function apps() {
	console.log('apps()');

	client.apps.get(function(err, result) {
		if (err)
			throw err;
		eyes.inspect(result);
		client.apps.get(name, function(err, result) {
			if (err)
				throw err;
			eyes.inspect(result);
			client.apps.create({
				name : name,
				region : 'us',
				environment : 'production'
			}, function(err, result) {
				if (err)
					eyes.inspect(err);
				eyes.inspect(result);
				env();
			});
		});
	});
}

function env() {
	console.log('env()');

	client.env.get(name, function(err, result) {
		if (err)
			eyes.inspect(err);
		eyes.inspect(result);
		client.env.update(name, {
			a : 'dsfsdf'
		}, function(err, result) {
			if (err)
				eyes.inspect(err);
			eyes.inspect(result);
			client.env.update(name, {
				a : null
			}, function(err, result) {
				if (err)
					eyes.inspect(err);
				eyes.inspect(result);
				build();
			});
		});
	});
}

function build() {
	console.log('build()')
	client.build.get(name, function(err, result) {
		if (err)
			eyes.inspect(err);
		eyes.inspect(result);

		var build_id = result.builds[0].id;
		client.build.get(name, build_id, function(err, result) {
			if (err)
				eyes.inspect(err);
			eyes.inspect(result);
			commit()
		});
	});
}

function commit() {
	console.log('commit()')
	client.commit.get(name, function(err, result) {
		if (err)
			eyes.inspect(err);
		eyes.inspect(result);

		var commit_id = result.commits[0].id;
		client.commit.get(name, commit_id, function(err, result) {
			if (err)
				eyes.inspect(err);
			eyes.inspect(result);
			container()
		});
	});
}

function container() {
	console.log('container()')
	client.container.get(name, function(err, result) {
		if (err)
			eyes.inspect(err);
		eyes.inspect(result);

		var container_id = result.containers[0].id;
		console.log(container_id)
		client.container.get(name, container_id, function(err, result) {
			if (err)
				eyes.inspect(err);
			eyes.inspect(result);
			client.container.state(name, 'running', function(err, result) {
				if (err)
					eyes.inspect(err);
				eyes.inspect(result);
				client.container.type(name, 'web', function(err, result) {
					if (err)
						eyes.inspect(err);
					eyes.inspect(result);
					actions()
				});
			});
		});
	});
}

function actions() {
	console.log('actions()')
	client.actions.restart(name, function(err, result) {
		if (err)
			eyes.inspect(err);
		eyes.inspect(result);

		client.actions.stop(name, function(err, result) {
			if (err)
				eyes.inspect(err);
			eyes.inspect(result);
			scale()
		});
	});
}

function scale() {
	console.log('scale()');

	var options = {
		web : 1,
		web1 : {
			quantity : 0,
			size : '3X'
		}
	};

	client.scale.scale(name, options, function(err, result) {
		if (err)
			eyes.inspect(err);
		eyes.inspect(result);
		addons()
	});
}

function addons() {
	console.log('addons()');

	client.addons.create(name, 'redis', '1X', function(err, result) {
		if (err)
			eyes.inspect(err);
		eyes.inspect(result);
		client.addons.remove(name, 'redis', function(err, result) {
			if (err)
				eyes.inspect(err);
			eyes.inspect(result);
			domains()
		});
	});
}

function domains() {
	console.log('domains()');

	client.domains.get(name, function(err, result) {
		if (err)
			eyes.inspect(err);
		eyes.inspect(result);
		client.domains.create(name, 'sadasd.asdd.com', function(err, result) {
			if (err)
				eyes.inspect(err);
			eyes.inspect(result);
			client.domains.get(name, function(err, result) {
				if (err)
					eyes.inspect(err);
				eyes.inspect(result);
				client.domains.remove(name, 'sadasd.asdd.com', function(err, result) {
					if (err)
						eyes.inspect(err);
					eyes.inspect(result);
					client.domains.get(name, function(err, result) {
						if (err)
							eyes.inspect(err);
						eyes.inspect(result);
					});
				});
			});
		});
	});
}

user();
