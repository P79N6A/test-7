import Vue from 'vue';
import VueRouter from 'vue-router';
// import VueResource from 'vue-resource';
import VueAsyncData from 'vue-async-data';

import extendVue from './extends';

import routes from './routes'; 
//注意: routes中同步require(/components/Sub.vue, Sub.vue又继承Base.vue(如:Vtable.vue -> VtableSpecial.vue), 此时 Sub = Base.extend({..}) 此时下面的register(Vue)还没执行，导致全局资源(如指令 在Base.vue Sub.vue中都不可用)
//同时: import语句总是优先执行的，即使放在最后一条语句后面, 所以改为在 extends/index.js里完成全局资源的注册和扩展.
//语句 import register from './extends' 放在 语句 import routes from routes 前面


import setupAjax from './services/ajax';
import env  from 'config/env';

import { sync } from 'vuex-router-sync';
import store from 'appVuex/store';

import App from 'components/App.vue'; //布局组件(相当于主页面)

console.log('[VIP]:', VIP);


let router;//路由器实例

//Vue插件
//---------------------------
Vue.use(VueRouter);
Vue.use(VueAsyncData);

//开发环境相关设置
//---------------------------
if (env.active === 'dev') {
	Vue.config.debug = true;
	Vue.config.devtools = true;
	require('./mock');
}

//配置路由
//---------------------------
router = new VueRouter({
	hasbang: true,
	history: false,
	linkActiveClass: 'active'
});


//路由切换转场动画
//---------------------------
router.beforeEach(function({to, next}){
	var ridx = VIP.randomInt(VIP.aniNames.length - 1);
	var app = to.router.app;

	app.getAsideLinks(to.path);//更新左侧导航
	app.effect = VIP.aniNames[ridx];

	console.log('[animation]:', arguments, app.effect);

	window.scrollTo(0, 0);

	// next();
	app.$nextTick(next);
});

router.afterEach(function({from, to}){

	var app = router.app;
	app.setBreadCrumbs({url: to.path});
	
	if (to.path && to.path.match(/^\/\w+$/)) {//路由到顶级菜单 重置之前的左侧导航高亮
		from.path && app.resetPrevAsideLinks( VIP.segments(from.path, 1, true) );
	}

	if(to.path.match(/\/demo|\/index/)){//demo页 隐藏左侧导航
		app.toggleSidebar(false);
	}else{
		app.toggleSidebar(true);
	}

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

