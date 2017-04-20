// 页面构建路由
var express = require('express'),
	Utils = require('../tools/utils'),
	login = require('../user/login'),
	personal = require('../user/personal')

var personalRouter = function(app){
	
	var router = express.Router();

	router.get('/', login.login, Utils.headerInfo, personal.render);
	router.post('/update', login.login, Utils.headerInfo, personal.updateUsers);
	
	app.use('/personal', router);
	
};

module.exports.r = personalRouter;