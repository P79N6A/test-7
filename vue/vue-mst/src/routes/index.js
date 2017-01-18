module.exports = {
	'/demos': {
		component:require('views/demo/index'),
	},
	'/demos/alert':{
		component: require('views/demo/alertDemo')
	},
	'/demos/accordion':{
		component: require('views/demo/accordionDemo')
	},
	'/demos/affix':{
		component: require('views/demo/affixDemo')
	},
	'/demos/checkboxGroup':{
		component: require('views/demo/checkboxGroupDemo')
	},
	'/demos/datePicker':{
		component: require('views/demo/datePickerDemo')
	},
	'/demos/panel':{
		component: require('views/demo/panelDemo')
	},
	'/demos/radioGroup':{
		component: require('views/demo/radioGroupDemo')
	},
	'/demos/modal':{
		component: require('views/demo/modalDemo')
	},
	'/demos/dropdown':{
		component: require('views/demo/dropdownDemo')
	},
	'/demos/tab':{
		component: require('views/demo/tabDemo')
	},
	'/demos/vnav':{
		component: require('views/demo/vnavDemo')
	},
	'/demos/vselect':{
		component: require('views/demo/vselectDemo')
	},
	'/demos/popover':{
		component: require('views/demo/popoverDemo')
	},
	'/demos/tooltip':{
		component: require('views/demo/tooltipDemo')
	},
	'/demos/typeahead':{
		component: require('views/demo/typeaheadDemo')
	},
	'/demos/aside':{
		component: require('views/demo/asideDemo')
	},
	'/demos/btn':{
		component: require('views/demo/btnDemo')
	},
	'/demos/btnGroup':{
		component: require('views/demo/btnGroupDemo')
	},
	'/demos/thumbnail':{
		component: require('views/demo/thumbnailDemo')
	},
	'/demos/inputGroup':{
		component: require('views/demo/inputGroupDemo')
	},
	'/demos/vform':{
		component: require('views/demo/vformDemo')
	},
	'/demos/formGroup':{
		component: require('views/demo/formGroupDemo')
	},
	'/demos/pager':{
		component: require('views/demo/pagerDemo')
	},
	'/demos/vtable':{
		component: require('views/demo/vtableDemo')
	},


	//system modules..
	'/index': {
		component: require('views/index')
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
	},

	//special module..
	'/special/new': {
		component: function(resolve){
			require(['views/special/add/index'], resolve);
		}
	},
	'/special/types': {
		component: function(resolve) {
			require(['views/special/types/index'], resolve);
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

