// User base
var S = require("kissy").KISSY,
	UtilTools = require('../tools/utils'),
	userDB = require('../db/user');
	

var initUser = function(req, res){

	userDB.refresh(function(){
		userDB.findBy({}, null, function(data){
			res.json({
				success: true,
				data: data
			});
		});
	}, function(){
		res.json({
			success: false
		});
	});

};

var initAdmin = function (req, res) {
	var data = {
		dn: '',
		uid: 'admin',
		name: '超级管理员',
		email: '',
		password: 'tms1234',
		favPage: [],
		favMod: [],
		permission: null
	};

	userDB.findBy({'uid': 'admin'}, null, function(_data){

		if(_data && _data.length > 0){
			// 用户存在
			res.json({
				success: false,
				msg: '用户已存在'
			});
		}else{
			userDB.addSingleUser(data, function (uData) {
				// 跳转至主页
				res.json({
					success: true
				})
			})
		}
	});
};

var addUser = function (req, res) {
	var uid = req.body['name'];
	var name = req.body['nickname'];
	var password = req.body['password'];
	var email = req.body['email'] || '';
	var headerInfo = req.systemHeaderInfo;

	var data = {
		dn: '',
		uid: uid,
		name: name,
		email: email,
		password: password,
		favPage: [],
		favMod: [],
		permission: null
	};

	if (uid) { // 添加操作
		userDB.findBy({'uid': uid}, null, function(_data){

			if(_data && _data.length > 0){
				// 用户存在
				//res.json({
				//	success: false,
				//	msg: '用户已存在'
				//});
				//res.send('添加失败：用户已存在');

				res.render('user/add', {
					header: headerInfo,
					status: 'fail',
					msg: '添加失败：' + uid + '已存在'
				});

			}else{

				userDB.addSingleUser(data, function (uData) {
					// 跳转至主页
					//res.json({
					//	success: true
					//})

					res.render('user/add', {
						header: headerInfo,
						status: 'success',
						msg: '添加：' + uid + '成功'
					});
				})
			}
		});
	} else { // 添加页
		res.render('user/add', {
			header: headerInfo
		});
	}
}

module.exports.init = initUser;
module.exports.initAdmin = initAdmin;
module.exports.add = addUser;
