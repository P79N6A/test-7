/* ----------------------------
 * @ 业务相关的公共函数
 * 如：showPop, redirectTo
 * ----------------------------
 */

var VIP = require('./util');


function redirectTo (url) {
	//codes	
}

function vlog(obj){
	if(obj instanceof Vue){
		console.warn('sorry, 不能打印vue的实例, 请打印实例内部数据');
	}else{
		return JSON.parse(JSON.stringify(obj));
	}
}



var publicFns = {
	redirectTo: redirectTo,
	vlog: vlog
};

VIP.extend(VIP, publicFns, {_fns:{"public": publicFns}});

module.exports = VIP;