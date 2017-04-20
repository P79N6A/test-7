// 页面构建路由
var express = require('express'),
	Utils = require('../tools/utils'),
	login = require('../user/login'),
	pageList = require('../page/list'),
	pageAdd = require('../page/add'),
	pageCode = require('../page/code');

var pageRouter = function(app){
	
	var router = express.Router();

	router.get('/', login.login, Utils.headerInfo, pageList.render);
	
	router.get('/add', login.login, Utils.headerInfo, pageAdd.render);
	// 半异步，管理后台的嵌入是异步的
	router.post('/add', login.login, Utils.headerInfo, login.readWritePermission, pageAdd.save);
	
	router.get('/copy/:id', login.login, Utils.headerInfo, pageAdd.copyRender);
	// 异步
	router.post('/copy/:id', login.login, Utils.headerInfo, login.readWritePermission, pageAdd.copySave);
	
	router.get('/preview/:id', require('../page/render').render);
	router.get('/previewcode/:id/:name/:dbid', require('../page/render').renderCode);
	// 异步
	router.get('/publish/:id', login.login, Utils.headerInfo, login.permission('white'), login.checkThirdAppPermission, login.readWritePermission, require('../page/publish').render);
	router.get('/refresh/:id', login.login, Utils.headerInfo, login.permission('white'), login.checkThirdAppPermission, require('../page/publish').refresh);
	
	router.get('/remove/:id', login.login, Utils.headerInfo, login.permission('white'), login.checkThirdAppPermission, pageList.remove);
	// 异步
	router.post('/modify/:id', login.login, Utils.headerInfo, login.permission('white'), login.checkThirdAppPermission, login.readWritePermission, pageList.modify);

	// 异步
	router.get('/updatemod/:id', login.login, Utils.headerInfo, login.permission('white'), login.checkThirdAppPermission, require('../page/build').updateMod);
	router.get('/updateproduct/:id', login.login, Utils.headerInfo, login.permission('white'), login.checkThirdAppPermission, require('../page/build').updateProduct);
	
	router.get('/fav/add/:id', login.login, Utils.headerInfo, login.permission('white'), login.checkThirdAppPermission, pageList.addFav);
	router.get('/fav/remove/:id', login.login, Utils.headerInfo, login.permission('white'), login.checkThirdAppPermission, pageList.removeFav);

	// 创建数据首页
	router.get('/createIndex', login.login, Utils.headerInfo, pageAdd.createIndex);
	router.get('/createPage', login.login, Utils.headerInfo, pageAdd.createPage);
	router.get('/createGroupIndex', login.login, Utils.headerInfo, pageAdd.createGroupIndex);
	router.get('/createHotsellIndex', login.login, Utils.headerInfo, pageAdd.createHotsellIndex);

	router.get('/code/:id', login.login, Utils.headerInfo, login.permission('coder'), pageCode.render);
	router.post('/code/:id', login.login, Utils.headerInfo, login.permission('coder'), pageCode.save);

	router.get('/:id', login.login, Utils.headerInfo, login.permission('white'), login.checkThirdAppPermission, require('../page/build').render);
	router.get('/:type/:id?', login.login, Utils.headerInfo, login.permission('white'), login.checkThirdAppPermission, require('../page/build').render);

	app.use('/page', router);
	
};

module.exports.r = pageRouter;
