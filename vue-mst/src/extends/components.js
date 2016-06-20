/**
 * @ 全局扩展自定义组件
 */
//import VueStrap from 'vue-strap';
var VueStrap = require('vue-strap');var VIP = require('../services/util');


var myComponents = {
	Loading: require('components/Loading.vue'),
	Breadcrumb: require('components/Breadcrumb.vue'),
	Pager: require('components/Pager.vue'),
	Modal: require('components/Modal.vue'),
	Dropdown: require('components/Dropdown.vue'),
	Vtable: require('components/Vtable.vue')
};

var VueStrapPicked = {};

VIP.extendKeys(VueStrapPicked, VueStrap, ['alert','panel', 'accordion', 'datepicker','checkboxGroup', 'checkboxBtn', 'radioGroup', 'radioBtn']);

var components = VIP.extend({}, VueStrapPicked, myComponents);

module.exports = components;