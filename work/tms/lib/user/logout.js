/**
 * 退出登录
 */
var	Utils = require('../tools/utils');

var logoutPage = function(req, res){//kk: 清除cookie session 跳转到登录页
	res.cookie('access_token', '');
	// delete 3rd login info
	res.cookie('from_url', '');
	res.cookie('user_id', '');
	res.cookie('biz_code', '');

	cleanSession(req);

    res.redirect('/login');
};

var cleanSession = function(req, res){// 清除session中的user_id, 
	req.session.user_id = null;
	// 更新头部登录信息
	Utils.headerInfo(req, res);
};

module.exports.render = logoutPage;
module.exports.clean = cleanSession;
