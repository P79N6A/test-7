import alert from 'components/alert';
import badge from 'components/badge';

var Vue = require('vue');
window.Vue = Vue;

//启动Vue应用
var vm = new Vue({
	el: '#app',
	components: {
		'alert': alert
	}
});

//test require('xxx.html')
var html = require('vue-html?root=~!components/alert.html');
console.info('[html]', html);

export {
	alert,
	badge
};