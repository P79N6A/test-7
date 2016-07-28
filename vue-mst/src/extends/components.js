/**
 * @ 全局扩展自定义组件
 */
//import VueStrap from 'vue-strap';
let VueStrap = require('vue-strap');
let {extendKeys, extend} = require('../services/util');


let myComponents = {
	Loading       : require('components/Loading.vue'),
	Breadcrumb    : require('components/Breadcrumb.vue'),
	Modal         : require('components/Modal.vue'),
	Dropdown      : require('components/Dropdown.vue'),
	Tab           : require('components/Tab.vue'),
	TabPane       : require('components/TabPane.vue'),
	Vnav          : require('components/Vnav.vue'),
	Vselect       : require('components/Vselect.vue'),
	Voption       : require('components/Voption.vue'),
	Popover       : require('components/Popover.vue'),
	Tooltip       : require('components/Tooltip.vue'),
	Typeahead     : require('components/Typeahead.vue'),
	Aside         : require('components/Aside.vue'),
	Btn           : require('components/Btn.vue'),
	BtnGroup      : require('components/BtnGroup.vue'),
	Thumbnail     : require('components/Thumbnail.vue'),
	InputGroup    : require('components/InputGroup.vue'),
	Vform         : require('components/Vform.vue'),
	FormGroup     : require('components/FormGroup.vue'),
	FormCheckbox  : require('components/FormCheckbox.vue'),
	FormCheckboxes: require('components/FormCheckboxes.vue'),
	Pager         : require('components/Pager.vue'),
	Datepicker    : require('components/Datepicker.vue'),
	Vtable        : require('components/Vtable.vue')
};

let VueStrapPicked = {};

extendKeys(VueStrapPicked, VueStrap, ['alert','panel', 'accordion','checkboxGroup', 'checkboxBtn', 'radioGroup', 'radioBtn', 'affix']);

let components = extend({}, VueStrapPicked, myComponents);

export default components;