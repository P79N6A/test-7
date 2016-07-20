import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/logger';
import mutations from './mutations';

import env from 'config/env';

var debug = env.active === 'dev';

var state = {
	//面包屑
	breadCrumbs: [
		{url: '/index', text: '首页', level:1}
	],
	// ajax计数器
	loadingCount: 0,
	// 全局提示
	tips: {
		type: 'error',
		text: ''
	},
	// 顶部导航
	topLinks:[
		{url:'/special', text:'专题管理', level:2, active: false},
		{url:'/component', text:'组件管理', level:2, active: false},
		{url:'/config', text:'配置管理', level:2, active: false},
		{url:'/customer', text:'客户管理', level:2, active: false},
		{url:'/usergroup', text:'用户群管理', level:2, active: false},
		{url:'/log', text:'日志管理', level:2, active: false},
		{url:'/whitelist', text:'白名单管理', level:2, active: false},
		{url:'/demos', text:'Demos', level:2, active: false}
	],
	// 侧栏导航
	asideLinkMap:{
		'/special': [
			{url:'/special/new', text:'新建专题', level:3, active: false},
			{url:'/special/types', text:'专题分类', level:3, active: false},
			{url:'/special/exportUrl', text:'导出URL', level:3, active: false}
		],
		'/component': [
			{url:'/component/new', text:'新建组件', level:3, active:false},
			{url:'/component/style', text:'样式管理', level:3, active:false},
			{url:'/component/style/types', text:'样式组分类', level:4, active:false}

		],
		'/config': [
			{url:'/config/new', text:'新建配置', level:3, active:false}
		],
		'/customer': [
			{url:'/customer/new', text:'新建客户', level:3, active:false},
			{url:'/customer/types', text:'客户类型', level:3, active:false},
			{url:'/customer/client', text:'客户端管理', level:3, active:false},
			{url:'/customer/client/edition', text:'客户端版本管理', level:4, active:false}
		],
		'/usergroup': [
			{url:'/usergroup/new', text:'新建用户群', level:3, active:false}
		],
		'/log': [
			{url:'/log/export', text:'导出日志', level:3, active:false}
		],
		'/whitelist': [
			{url:'/whitelist/export', text:'导出白名单', level:3, active:false}
		],
		'/index': [],
		'/demos': [
			{url:'/demos/alert', text:'Alert', level:3, active:false},
			{url:'/demos/accordion', text:'Accordion', level:3, active:false},
			{url:'/demos/affix', text:'Affix', level:3, active:false},
			{url:'/demos/checkboxGroup', text:'CheckboxGroup', level:3, active:false},
			{url:'/demos/datePicker', text:'DatePicker', level:3, active:false},
			{url:'/demos/panel', text:'Panel', level:3, active:false},
			{url:'/demos/radioGroup', text:'RadioGroup', level:3, active:false},
			{url:'/demos/modal', text:'Modal', level:3, active:false},
			{url:'/demos/dropdown', text:'Dropdown', level:3, active:false},
			{url:'/demos/tab', text:'Tab', level:3, active:false},
			{url:'/demos/vnav', text:'Vnav', level:3, active:false},
			{url:'/demos/vselect', text:'Vselect', level:3, active:false},
			{url:'/demos/popover', text:'Popover', level:3, active:false},
			{url:'/demos/tooltip', text:'Tooltip', level:3, active:false},
			{url:'/demos/typehead', text:'Typehead', level:3, active:false},
			{url:'/demos/aside', text:'Aside', level:3, active:false},
			{url:'/demos/btn', text:'Btn', level:3, active:false},
			{url:'/demos/btnGroup', text:'BtnGroup', level:3, active:false},
			{url:'/demos/thumbnail', text:'Thumbnail', level:3, active:false},
			{url:'/demos/typeahead', text:'Thumbnail', level:3, active:false},
			{url:'/demos/inputGroup', text:'InputGroup', level:3, active:false},
			{url:'/demos/vform', text:'Vform', level:3, active:false},
			{url:'/demos/formGroup', text:'FormGroup', level:3, active:false},
			{url:'/demos/pager', text:'Pager', level:3, active:false},
			{url:'/demos/vtable', text:'Vtable', level:3, active:false}
		]
	},
	asideLinks: [],
	//侧栏导航显隐
	sidebarShown: true
};

// Vue.use(Vuex);

export default new Vuex.Store({
	state,
	mutations,
	middlewares: debug ? [createLogger()] : []
});