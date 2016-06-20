/**
 * @ 注册器
 */
import Vue from 'vue';
import {eachKey} from '../services/util';

import components from './components';
import directives from './directives';

function regCmps () {
	eachKey(components, function (options, cmpName) {
		Vue.component(cmpName, options);
	});
}

function regDirs(){
	eachKey(directives, function(options, dirName){
		Vue.directive(dirName, options);
	});
}

export default function register(){
	regCmps();
	regDirs();
}