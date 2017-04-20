// 页面构建路由
var express = require('express'),
	Utils = require('../tools/utils'),
	login = require('../user/login'),
	tempList = require('../temp/list')

var tempRouter = function(app){
	
	var router = express.Router();

	router.get('/', login.login, Utils.headerInfo, tempList.render);
	
	app.use('/temp', router);
	
};

module.exports.r = tempRouter;
