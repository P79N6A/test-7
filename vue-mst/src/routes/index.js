module.exports = {
	'/index': {
		component: require('views/index')
	},
	'/demo': {
		component: function (resolve, reject) {
			require(['views/demo'], resolve);
		}
	},
	'/special': {
		component: function (resolve) {
			require(['views/special'], resolve);
		}
	},
	'/component': {
		component: {
			template: '<h3>{{$route.path}}</h3>'
		}
	},
	'/config': {
		component: {
			template: '<h3>{{$route.path}}</h3>'
		}
	},
	'/customer': {
		component: {
			template: '<h3>{{$route.path}}</h3>'
		}
	},
	'/usergroup': {
		component: {
			template: '<h3>{{$route.path}}</h3>'
		}
	},
	'/log': {
		component: {
			template: '<h3>{{$route.path}}</h3>'
		}
	},
	'/whitelist': {
		component: {
			template: '<h3>{{$route.path}}</h3>'
		}
	}

	,
	'/special/new': {
		component: function(resolve){
			require(['views/special/add'], resolve);
		}
	},
	'/special/types': {
		component: {
			template: '<h3>{{$route.path}}</h3>'
		}
	},
	'/special/exportUrl': {
		component: {
			template: '<h3>{{$route.path}}</h3>'
		}
	},
	'/component/new': {
		component: {
			template: '<h3>{{$route.path}}</h3>'
		}
	},
	'/component/style': {
		component: {
			template: '<h3>{{$route.path}}</h3>'
		}
	},
	'/component/style/types': {
		component: {
			template: '<h3>{{$route.path}}</h3>'
		}
	},
	'/config/new': {
		component: {
			template: '<h3>{{$route.path}}</h3>'
		}
	},
	'/customer/new': {
		component: {
			template: '<h3>{{$route.path}}</h3>'
		}
	},
	'/customer/types': {
		component: {
			template: '<h3>{{$route.path}}</h3>'
		}
	},
	'/customer/client': {
		component: {
			template: '<h3>{{$route.path}}</h3>'
		}
	},
	'/customer/client/edition': {
		component: {
			template: '<h3>{{$route.path}}</h3>'
		}
	},
	'/usergroup/new': {
		component: {
			template: '<h3>{{$route.path}}</h3>'
		}
	},
	'/log/export': {
		component: {
			template: '<h3>{{$route.path}}</h3>'
		}
	},
	'/whitelist/export': {
		component: {
			template: '<h3>{{$route.path}}</h3>'
		}
	}
};

