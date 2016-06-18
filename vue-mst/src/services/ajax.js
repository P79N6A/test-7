var VIP = require('services/public');
var API = require('config/api');

function addInterceptor(Vue, router) {
	//拦截器中 this指向vm
	Vue.http.interceptors.push({
		request: function (request) {
			// console.info('[interceptor req]: this=', this, ', app=', router.app);
			return request;
		},
		response: function (response) {
			console.info('[response]: data: %o , url: %s, res: %o', response.data, response.request.url, response);
			// router.app.loadingCount--; //ajax counter 隐藏loading
			router.app.addLoading(false);
			
			if(!response.ok){//接口调用异常
				// router.app.tips = 'URL:'+response.request.url + ', MSG:'+ response.data;
				// router.app.error = true;
				router.app.updateTips('error', 'URL:'+response.request.url + ', MSG:'+ response.data);
			}
			return response;
		}
	});
}

function setAjaxOptions(Vue, router) {
	var myOpts = {
		jsonp: 'jsonpCallback',
		timeout: 10000,
		emulateJSON: true,
		emulateHTTP: true,
		beforeSend: function (request) {//beforeSend其实也是interceptor ，this指向vm

			// console.info('[beforeSend]:this=', this, ', app=', router.app);
			// router.app.loadingCount++; //ajax counter 显示loading
			router.app.addLoading(true);

			request.url = API.get(request.url); //转换为正确的api
			/** 取消动态require(expr)
			if (request.url.match(/\.(js|json)$/)) { //mock
				require('../mock/' + request.url);
			}*/
			
			return request;
		},
		error: function(data){
			console.log('[Error]:', data);
		}
	};

	VIP.extend(Vue.http.options, myOpts);
}

module.exports = function setupAjax(Vue, router) {
	if (!Vue.http) return;

	//设置ajax选项
	setAjaxOptions.apply(null, arguments);

	//添加http拦截器
	addInterceptor.apply(null, arguments);

};