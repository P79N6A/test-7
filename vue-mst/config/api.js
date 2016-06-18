/**
 * @ api表和相关方法
 */
var env = require('./env');
var currentEnv = env.active;
var envConf = env[currentEnv];
var apis;


apis = {
	dev: {
		queryUser: '/user/query',
		getUser: '/user/get',
		saveUser: '/user/save',
		updateUser: '/user/update',
		delUser: '/user/del',

		querySpecial: '/special/query',
		getSpecial: '/special/get',
		saveSpecial: '/special/save',
		updateSpecial: '/special/update',
		delSpecial: '/special/del'
	},
	product: {
		queryUser: 'admin.php/user/query',
		getUser: 'admin.php/user/get',
		saveUser: 'admin.php/user/save',
		updateUser: 'admin.php/user/update',
		delUser: 'admin.php/user/del',

		querySpecial: 'admin.php/special/query',
		getSpecial: 'admin.php/special/get',
		saveSpecial: 'admin.php/special/save',
		updateSpecial: 'admin.php/special/update',
		delSpecial: 'admin.php/special/del'

	}
};

module.exports = {
	data: apis,
	get: function (apiKey, env) {
		var api;

		env = env || currentEnv;
		env = ['dev', 'product'].indexOf(env) === -1 ? 'dev' : env;
		api = apis[env][apiKey];
		
		if (api) {
			return envConf.apiBaseUrl + api;
		}else{
			console.error('[api.get]:没有对应的api,请检查参数..');
			return apiKey;
			// return false;
		}
	}
};
