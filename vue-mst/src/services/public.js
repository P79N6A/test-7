/* ----------------------------
 * @ 业务相关的公共函数
 * 如：showPop, redirectTo
 * ----------------------------
 */

var VIP = require('./util');


function redirectTo (url) {
	//codes	
}



var publicFns = {
	redirectTo: redirectTo
};

VIP.extend(VIP, publicFns, {_fns:{"public": publicFns}});

module.exports = VIP;