import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);

/**
 * @ resource的方式包装与后端交互的api
 * 如：user, special
 */
var VIP = require('services/public');
var resources = {};

/**
 * @url 默认会被覆盖 值任意
 * @params 无默认参数 调用resource方法时传入 如：User.get({userId:2})
 * @actions resource相关的方法 CURD and others
 * @options 为action指定 默认http选项
 */
// Vue.resource(url, params, actions, options);


function setResource(name, otherActions, params){
	name = VIP.capitalize(name);
	params = params || {};

	var defActions = {
		get: {
			url: 'get'+name //url为apiKey
		},query: {
			url: 'query'+name
		},save: {
			url: 'save'+name,
			method: 'POST'
		},update: {
			url: 'update'+name,
			method: 'POST'
		},remove: {
			url: 'del'+name
		}
	};
	var actions = VIP.extend({}, defActions, otherActions);

	// /UserApi
	var resource = Vue.resource('/'+name+'Api', params, actions, {method: 'GET'});
	resources[name] =  resource;
}

var resourceNames = ['user', 'special'];
resourceNames.forEach(setResource);

module.exports = resources;