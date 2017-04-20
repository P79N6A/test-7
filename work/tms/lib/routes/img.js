/**
 * 路由总入口
 */

var express = require('express'),
	Utils = require('../tools/utils'),
	login = require('../user/login'),
	imgList = require('../img/list');
	imgUpload = require('../img/upload');

var imgRouter = function(app){
	
	var router = express.Router();
	
	router.get('/', login.login, Utils.headerInfo, require('../img/upload').render);
	router.get('/list', login.login, Utils.headerInfo, imgList.render);
	router.post('/upload', login.login, Utils.headerInfo, imgUpload.save);

	app.use('/img', router);
	
};

module.exports.r = imgRouter;
