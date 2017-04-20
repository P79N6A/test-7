// 页面构建路由
var express = require('express'),
	Utils = require('../tools/utils'),
	login = require('../user/login'),
	pageList = require('../page/list'),
	pageAdd = require('../page/add'),
	tempList = require('../temp/list');

var apiRouter = function(app){

	//设置跨域访问
	app.all('*', function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
		// res.header("Content-Type", "application/json;charset=utf-8");
		next();
	});

	var router = express.Router();
	//页面查询
	router.get('/page', login.login, Utils.headerInfo, login.checkThirdAppPermission, pageList.addApiMark, pageList.render);

	//添加页面
	router.post('/page/add', login.login, Utils.headerInfo, login.checkThirdAppPermission, pageList.addApiMark, login.readWritePermission, pageAdd.save);

	//页面删除
	router.get('/page/remove/:id', login.login, Utils.headerInfo, login.checkThirdAppPermission, login.permission('white'), pageList.addApiMark, login.readWritePermission, pageList.remove);

	//页面复制
	router.get('/page/copy/info/:id', login.login, Utils.headerInfo, login.checkThirdAppPermission, pageAdd.addApiMark, login.readWritePermission,  pageAdd.copyRender);
	router.post('/page/copy/:id', login.login, Utils.headerInfo, login.checkThirdAppPermission, pageAdd.addApiMark, login.readWritePermission,  pageAdd.copySave);

	//页面收藏
	router.post('/page/fav/add/:id', login.login, Utils.headerInfo, login.checkThirdAppPermission, login.permission('white'), pageList.addApiMark, login.readWritePermission, pageList.addFav);
	router.post('/page/fav/remove/:id', login.login, Utils.headerInfo, login.checkThirdAppPermission, login.permission('white'), pageList.addApiMark, login.readWritePermission, pageList.removeFav);
	
	//模板列表
	router.get('/temp', login.login, Utils.headerInfo, tempList.list);

	app.use('/api', router);
};

module.exports.r = apiRouter;
