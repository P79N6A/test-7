/**
 * @ 全局扩展自定义过滤器
 */

var filters = {};

 filters.random = function(arr) {
 	var r = arr[VIP.randomInt(arr.length - 1)];
 	return r;
 };

 export default filters;