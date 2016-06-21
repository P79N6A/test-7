import Vue from 'vue';
import VueRouter from 'vue-router';
// import VueResource from 'vue-resource';
import VueAsyncData from 'vue-async-data';
import routes from './routes';
import register from './extends';
import setupAjax from './services/ajax';
import env  from 'config/env';

import { sync } from 'vuex-router-sync';
import store from 'appVuex/store';

import App from 'components/App.vue'; //布局组件(相当于主页面)

let router;//路由器实例

//test
//---------------------------
// require('./services/public');


//注册全局自定义组件 指令等..
//---------------------------
register(Vue); 

//开发环境 则配置Vue, mock data
//---------------------------
if (env.active === 'dev') {
	Vue.config.debug = true;
	Vue.config.devTools = true;
	require('./mock');

	Vue.mixin({//组件vm设为全局 便于调试
		created(){
			if(this.$options.name){
				let key = 'vm' + (this.$options.name).toLowerCase();
				if (window[key]) {
					window[key] = [window[key]];
					window[key].push(this);
				} else {
					window[key] = this;
				}
			}
		}
	});
}

//Vue插件
//---------------------------
Vue.use(VueRouter);
Vue.use(VueAsyncData);

//配置路由
//---------------------------
router = new VueRouter({
	hasbang: true,
	history: false,
	linkActiveClass: 'active'
});

router.beforeEach(function({to, next}){
	to.router.app.effect = Math.floor(Math.random()*2)>0? 'aniSlide': 'aniBounceDown';
	console.warn('args:', arguments, to.router.app.effect);

	window.scrollTo(0, 0);
	next();
});

router.map(routes);
router.redirect({
	'*': '/index'
});

//设置ajax
//---------------------------
setupAjax(Vue, router);

//使用插件 vuex-router-sync
//---------------------------
sync(store, router);

//启动路由
//---------------------------
router.start(App, '#app');

