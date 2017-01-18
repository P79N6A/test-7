/**
 * @ 注册器
 */
import env  from 'config/env';

import Vue from 'vue';
import {eachKey} from '../services/util';

import components from './components';
import directives from './directives';
import transitions from './transitions';
import filters from './filters';

import Vcom from 'vcom';
console.info('[Vcom]:', Vcom);
eachKey(Vcom, (definition, key) => {
	let name = 'Ui'+VIP.camelize(VIP.capitalize(key));
	Vue.component(name, definition);
});

//开发环境 设置全局mixin
//---------------------------
if (env.active === 'dev') {
	
	Vue.mixin({//组件vm设为全局 便于调试
		created(){
			if(this.$options.name){
				let key = 'vm' + (this.$options.name).toLowerCase();
				if (window[key]) {
					!VIP.isArray(window[key]) && (window[key] = [window[key]]);
					window[key].push(this);
				} else {
					window[key] = this;
				}
			}
		}
	});
}

// 注册全局资源
// -----------------
function registry (method, map) {
	eachKey(map, function (options, name) {
		Vue[method](name, options);
	});
}

function extendVue(){
	eachKey({directives, transitions, filters,  components}, function(map, key){
		var method = key.replace(/s$/,'');
		registry(method, map);
	});
}


//注册全局自定义组件 指令等..
//---------------------------
extendVue();

export default extendVue;
