/**
 * @ 全局扩展自定义组件
 */
//import VueStrap from 'vue-strap';
let VueStrap = require('vue-strap');
let {extendKeys, extend} = require('../services/util');


let myComponents = {
	Loading: require('components/Loading.vue'),
	Breadcrumb: require('components/Breadcrumb.vue'),
	Pager: require('components/Pager.vue'),
	Modal: require('components/Modal.vue'),
	Dropdown: require('components/Dropdown.vue'),
	Tab: require('components/Tab.vue'),
	Vnav: require('components/Vnav.vue'),
	TabPane: require('components/TabPane.vue'),
	Vtable: require('components/Vtable.vue')
};

let VueStrapPicked = {};

extendKeys(VueStrapPicked, VueStrap, ['alert','panel', 'accordion', 'datepicker','checkboxGroup', 'checkboxBtn', 'radioGroup', 'radioBtn']);

let components = extend({}, VueStrapPicked, myComponents);

export default components;