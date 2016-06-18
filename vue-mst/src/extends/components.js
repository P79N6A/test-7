/**
 * @ 全局扩展自定义组件
 */
//import VueStrap from 'vue-strap';
var VueStrap = require('vue-strap');
var VIP = require('../services/util');


var myComponents = {
	Loading: require('components/Loading.vue'),
	Breadcrumb: require('components/Breadcrumb.vue'),
	Pager: require('components/Pager.vue'),
	Vtable: require('components/Vtable.vue')
};

var VueStrapPicked = {};

VIP.extendKeys(VueStrapPicked, VueStrap, ['alert']);

var components = VIP.extend({}, VueStrap, myComponents);

module.exports = components;