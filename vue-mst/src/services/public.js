/* ----------------------------
 * @ 业务相关的公共函数
 * 如：showPop, redirectTo
 * ----------------------------
 */
var Vue = require('vue');

var VIP = require('./util');


function redirectTo(url) {
	//codes	
}

// 打印vue实例的数据
function vlog(obj) {
	if (obj instanceof Vue) {
		console.warn('sorry, 不能打印vue的实例, 请打印实例内部数据');
	} else {
		return JSON.parse(JSON.stringify(obj));
	}
}

//派生子组件
function createSubComponent(superOpts, subOpts) {
	var Super = Vue.extend(superOpts);
	return Super.extend(subOpts);
}


// 获取添加/删除backdrop的transition定义
function getTransWithBackdrop(type) {//type: aside, modal
	var klass = type + '-backdrop';
	var selector = '.' + klass;

	var tansitionHooks = {
		beforeEnter: function(el) {
			$(el).show(); //显示元素 添加backdrop
			this.backdrop && $('<div class="'+klass+' fade"></div>').appendTo('body');
		},
		enter: function(el) {
			$(el).addClass('in');
			this.backdrop && $(selector).addClass('in');
		},
		leave: function(el) {
			$(el).removeClass('in');
		},
		afterLeave: function(el) {
			this.backdrop && $(selector).remove();
		}
	};

	return tansitionHooks;
}


var publicFns = {
	redirectTo: redirectTo,
	createSubComponent: createSubComponent,
	getTransWithBackdrop: getTransWithBackdrop,
	vlog: vlog
};


VIP.extend(VIP, publicFns, {
	_fns: {
		"public": publicFns
	}
});

module.exports = VIP;