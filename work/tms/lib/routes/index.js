/**
 * 路由总入口
 */

var express = require('express'),
	Utils = require('../tools/utils'),
	login = require('../user/login'),
	UAParser = require('ua-parser-js');

var bindRoutes = function(app){
	
	rootRouter(app);
	require('./temp').r(app);
	require('./personal').r(app);
	require('./page').r(app);
	require('./mod').r(app);
	require('./img').r(app);
	require('./qrcode').r(app);
	require('./s').r(app);
	require('./service').r(app);
	require('./api').r(app);

};

var rootRouter = function(app){
	var router = express.Router();
	// 登录后首页
	router.get('/', login.login, Utils.headerInfo,  require('../temp/list').render);
	// 首页
	router.get('/home', function (req, res) {
		res.render('home');
	});
	// 登录
	router.all('/login', Utils.headerInfo, require('../user/login').render);
	// 登出
	router.get('/logout', require('../user/logout').render);
	// 文档
	//router.get('/doc/:file', login.login, Utils.headerInfo, require('../root/doc').render);

	router.get('/outman', function (req, res) {
		res.render('outman');
	});

	// 代理接口
	router.get('/proxy.html', require('../proxy/index').render);

	// 预览页面
	router.get('/preview_index.html', require('../preview/index').sendHtml);

	app.use('/', router);
};

module.exports.bind = bindRoutes;
