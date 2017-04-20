/**
 * 登录
 */

var userDB = require('../db/user'),
	thirdloginDB = require('../db/thirdlogin.js'),
	logout = require('./logout'),
	Utils = require('../tools/utils'),
	pageDB = require('../db/page'),
	Promise = require('promise'),
	S = require('kissy').KISSY;

var config = Utils.getJSONSync("config.json");

var loginPage = function(req, res){
	var	sessionUserId = req.session.user_id,
		loginData = null,
		redirectUrl = req.query['redirect'] || null;

	// 检查登录状态
	if(sessionUserId){
		// 如果是登录状态，则跳转到相应角色的工作台首页
		res.redirect(redirectUrl);
	}else{
		if(req.body['userName']){
			loginData = {
				name: req.body['userName'],
				password: Utils.md5(req.body['userPassword'])
			}
		}

		if(!loginData && !req.body['openId']){
			// 先执行退出，清空登录态
			logout.clean(req, res);
			// 展示登录页面
			res.render('home', {
				'header': req.systemHeaderInfo,
				'page': {}
			});
		}else{
			loginData = loginData || {};

			var callback = function(r, thirdLogin){
				if(r.success){
					// 登录成功跳转
					loginStatus(req, r);
					if (!thirdLogin) {
						res.redirect(redirectUrl || '/');
					} else {
						res.json({
							success: 1
						})
					}
				}else{
					// 登录失败回显
					res.render('home', {
						'header': req.systemHeaderInfo,
						'page': loginData,
						'errMsg': r.msg
					});
				}
			};


			var openId = req.body['openId'];

			if (openId) {
				loginData.openId = openId;
				loginData.nickName = req.body['nickName'] || loginData.name || '';
				loginData.password = req.body['userPassword'] || '';

				thirdLogin(loginData, function (r) {
					callback(r);
				});
			} else {
				// 有用户名则去登录: 普通登录
				login(loginData, function (r) {
					callback(r);
				});
			}
		}
	}
};

// 统一登录
var login = function(data, callback){
	var loginBy = {
		'uid': data.name
	};

	userDB.findBy(loginBy, null, function(uData){
		if(uData && uData.length > 0){
			if(uData[0].password === data.password){
				callback({success: true, id: uData[0]._id.toString(), uid: uData[0].uid});
			}else{
				callback({success: false, msg: '密码不正确！'});
			}
		}else{
			callback({success: false, msg: '找不到用户！'});
		}
	});
};

// 第三方登录
var thirdLogin = function (data, callback) {

	var openid = data.openId;

	// todo 验证是否登录过
	thirdloginDB.query({
		openid: openid
	}, function (d) {
		if (d) {
			callback({success: true, id: d});
		} else {
			// 新增用户
			var srcData = {
				dn: '',
				uid: data.name,
				name: data.name,
				email: '',
				password: data.password || 'hzmk123456',
				favPage: [],
				favMod: [],
				permission: null
			};

			userDB.addSingleUser(srcData, function () {
				var loginBy = {
					'uid': data.name
				};

				userDB.findBy(loginBy, null, function(uData){
					if(uData && uData.length > 0){
						var id = uData[0]._id.toString();

						thirdloginDB.add({
							openid: openid,
							uid: id
						}, function () {
							callback({success: true, id: id, uid: uData[0].uid});
						});
					}
				});
			})
		}
	})
};

// 登录成功，设置登录状态
var loginStatus = function(req, r){// sesssion记录 user_id
	req.session.user_id = r.id;
};
// 获取用户登录信息
var getUserInfo = function(req, callback){
	var info;
	if(req.session.user_id){
		info = {
			isLogin: true,
			id: req.session.user_id
		};

		userDB.findById(info.id, function(uData){
			if(uData){
				info = S.merge(info, {
					uid: uData.uid,
					name: uData.name,
					email: uData.email,
					permission: uData.permission
				});
			}
			callback(info);
		});

	}else{
		info = {
			isLogin: false
		};
		callback(info);
	}
};

// 登录控制
var loginFilter = function(req, res, next){
	Promise.all([new Promise(function(resolve, reject){
		// 增加第三方应用使用权限
		checkThirdApp(req, res, function () {
			resolve();
		});
	})]).then(function(){
		console.log('loginFilter')
		if(!req.session.user_id) {
			// 先执行退出，清空登录态
			logout.clean(req, res);
			res.redirect('/login?redirect=' + req.originalUrl);
		} else {
			next && next();
		}
	});
};
// 权限控制
var permission = function(type){
	return function(req, res, next){
		var header = req.systemHeaderInfo,
			uId = header.uid;
		// console.log(header.permission)
		if(header.permission === 'admin' || (header.permission === 'coder' && type !== 'admin')){
			// console.log(1)
			next && next();
		}else{
			// 其他用户
			if(type === 'admin' || type === 'coder'){
				// console.log(2)
				res.send('对不起，您无权访问该页面~');
			}else if(type === 'white'){
				// console.log('white')
				var pageId = req.params['id'];
				if (!pageId || pageId.length != 24) {
					next && next();
					return;
				}
				pageDB.findById(pageId, function(data){
					// cache page data
					req.pageData = data;
					// console.log(data)
					// console.log('uId=' + uId + 'data.owner.uid=' + data.owner.uid)
					if(uId && (data.owner.uid === uId || (data.whiteList && S.inArray(uId, data.whiteList)))){
						// header.uid === page.owner.uid 或者 header.uid在page的白名单里的时候 
						next && next();
					}else{
						res.send('对不起，您无权访问该页面~');
					}
				});
			}else{
				next && next();
			}
		}
	}
};
var readWritePermission = function (req, res, next) {
	if(req.readWritePermission === '700'){
		if (req.isApiMark) {
			res.jsonp({
				code: 304,
				msg: '对不起，您无权进行该操作~'
			});
		} else {
			res.json({
				success: false,
				errorMsg: '当前为demo版本，无法进行此操作，请联系我们商务 0571-89971337'
			});
		}
	}else{
		next && next();
	}
};

var checkThirdApp = function (req, res, callback) {

	// 优先参数
	if (req.query['from_url']) {// 有 req.query.from_url则 写cookie
		var srcData = req.query;

		console.log('*********** srcData=' + srcData);

		// 写入cookie: 后面操作可以使用
		res.cookie('from_url', srcData['from_url']);
		res.cookie('user_id', srcData['user_id']);
		res.cookie('biz_code', srcData['biz_code']);
		res.cookie('nb', srcData['nb']);
	} else {// 无 req.query.from_url 则读cookies
		var srcData = req.cookies;
	}

	// todo 增加验证有效性
	var fromUrl = srcData['from_url'];
	var userId = srcData['user_id'];
	var bizCode = srcData['biz_code'];
	var nb = srcData['nb'];

	// 所有的参数都是依赖的
	if (!fromUrl || !userId || !bizCode) {// fromUrl userId bizCode任意一个为空，则 立即回调
		callback();
		return;
	}

	// todo 设置域名白名单
	var userName = 'hanshu';
	var isSoleUser = true;

	if (userName) {
		// 清空原有的登录信息
		logout.clean(req, res);

		var loginBy = {
			'uid': userName
		};

		userDB.findBy(loginBy, null, function(uData){
			if(uData && uData.length > 0){
				// 增加 userId & bizCode 透传: 页面操作中可以增加
				if (!isSoleUser) {
					req.thirdAppInfo = {
						appUserId: userId,
						appBizCode: bizCode,
						appFromUrl: fromUrl
					};

					// todo 统一控制
					if (fromUrl == 'demo.boss.mockuai.com' && (nb != '9c59153d22d9f7cc021b17b425cc31c5')) {
						req.readWritePermission = '700';
					} else {
						req.readWritePermission = '777';
					}
				}

				loginStatus(req, {success: true, id: uData[0]._id.toString(), uid: uData[0].uid});
			}
			callback();
			return;
		});
	} else {
		callback();
	}
};

var checkThirdAppPermission = function (req, res, next) {
	var thirdAppInfo = req.thirdAppInfo;
	if (!thirdAppInfo) {
		next && next();
		return;
	}

	var pageData = req.pageData;
	var verify = function () {
		//if (!(pageData.appUserId == thirdAppInfo.appUserId) || !(pageData.appBizCode == thirdAppInfo.appBizCode)) {
		console.log('checkThirdAppPermission error')
		if (!(pageData.appBizCode == thirdAppInfo.appBizCode)) {
			res.send('对不起，您无权访问该页面~');
		} else {
			next && next();
		}
	};

	if (pageData) {
		verify();
	} else {
		var pageId = req.params['id'];
		if (!pageId || pageId.length != 24) {
			next && next();
			return;
		}
		pageDB.findById(pageId, function(data){
			pageData = data;
			verify();
		});
	}
};

module.exports.render = loginPage;
module.exports.getInfo = getUserInfo;
module.exports.login = loginFilter;
module.exports.permission = permission;
module.exports.readWritePermission = readWritePermission;
module.exports.checkThirdAppPermission = checkThirdAppPermission;
