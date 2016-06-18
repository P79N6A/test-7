/**
 * @ 注册器
 */
import Vue from 'vue';
import VIP from '../services/util';

import components from './components';
import directives from './directives';

function regCmps () {
	VIP.eachKey(components, function (options, cmpName) {
		Vue.component(cmpName, options);
	});
}

function regDirs(){
	VIP.eachKey(directives, function(options, dirName){
		Vue.directive(dirName, options);
	});
}

export default function register(){
	regCmps();
	regDirs();
}