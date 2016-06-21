/**
 * @ 注册器
 */
import Vue from 'vue';
import {eachKey} from '../services/util';

import components from './components';
import directives from './directives';
import transitions from './transitions';


function doReg (method, map) {
	eachKey(map, function (options, name) {
		Vue[method](name, options);
	});
}

export default function register(){
	eachKey({components, directives, transitions}, function(map, key){
		var method = key.replace(/s$/,'');
		doReg(method, map);
	});
}