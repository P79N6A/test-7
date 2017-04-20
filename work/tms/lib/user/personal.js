var S = require("kissy").KISSY,
	UtilTools = require('../tools/utils');
	userDB = require('../db/user');


var personalTemp = function(req, res){
	console.log(req.systemHeaderInfo.uid);
	var seesionToken = UtilTools.token.make(req.systemHeaderInfo.uid);
	res.render('user/personal', {
		header: req.systemHeaderInfo,
		token: seesionToken
	});
}
var updateUsers = function(req, res){
	var uid = req.body['uid'],
		password = req.body['password'],
		//token = req.body['token'],
		repassword = req.body['repassword'],
		seesionToken = UtilTools.token.make(req.systemHeaderInfo.uid);

	if (uid !== req.systemHeaderInfo.uid) {
		res.send('对不起，您无权进行该操作~');
		return;
	}

	if((password!='undefined' && S.trim(password)) && (password == repassword)){
		userDB.updateUsers(uid, password, function(){
			res.render('user/personal',{
				header: req.systemHeaderInfo,
				token: seesionToken,
				succMsg : '恭喜您，更改密码成功！'
			});
		});
	}else{
		res.render('user/personal',{
			header: req.systemHeaderInfo,
			token: seesionToken,
			errMsg : '更改密码失败！'
		});
	}
};
module.exports.render = personalTemp;
module.exports.updateUsers = updateUsers;