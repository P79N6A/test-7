// 系统级路由
var express = require('express'),
	Utils = require('../tools/utils'),
	GitTools = require('../tools/git'),
	adminPage = require('../user/admin'),
	login = require('../user/login');

var config = Utils.getJSONSync("config.json");

var systemRouter = function(app){
	
	var router = express.Router();
	// 更新tms
	router.all('/update', function(req, res){
		var ref = req.body['ref'];
		// 只接受master的推送
		if(ref && ref.indexOf('heads/master') > -1){
			Utils.exec('git pull', function(){
				res.json({success: true});
			});
		}else{
			res.json({success: false});
		}
	});
	// 更新页面模板
	router.all('/update/pagetemp', function(req, res){
		GitTools.pull(config.pagePath, function(){
			res.json({success: true});
		});
	});
	// 同步用户
	router.all('/update/user', require('../user/base').init);
	router.all('/init', require('../user/base').initAdmin);
	router.all('/add/user', login.login, Utils.headerInfo, login.permission('admin'), require('../user/base').add);


	// 管理员
	router.get('/admin', login.login, Utils.headerInfo, login.permission('admin'), adminPage.render);
	router.post('/admin/pms/update/:pms', login.login, Utils.headerInfo, login.permission('admin'), adminPage.updatePms);
	router.post('/admin/pms/remove', login.login, Utils.headerInfo, login.permission('admin'), adminPage.removePms);
	router.get('/updatepwd', login.login, Utils.headerInfo, login.permission('admin'), adminPage.updatePW);
		
	app.use('/s', router);
	
};

module.exports.r = systemRouter;
