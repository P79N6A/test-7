//  用户表
var S = require('kissy').KISSY,
	Util = require('util'),
	UtilTool = require('../tools/utils'),
	LDAP = require('../tools/ldap'),
	BaseDB = require('./base');

var config = UtilTool.getJSONSync("config.json");

/*
字段：
dn ldap
uid 工号
name 名字
email email
password 密码
permission 权限 - admin
*/	
function UserDB(config){
	var _self = this;
	_self.config = S.merge(UserDB.config, config);
	UserDB.super_.call(_self, _self.config);
}

Util.inherits(UserDB, BaseDB);
UserDB.config = {
	db: config.db.name,
	col: 'user'
};

S.mix(UserDB.prototype, {
	permissionMap: {
		'admin': '管理员',
		'coder': '程序员'
	},
	
	_init: function(){},
	
	add: function(data, callback){
		var _self = this;
		data = S.merge({
			dn: data.dn,
			uid: data.uid,
			name: data.name,
			email: data.email,
			password: UtilTool.md5(data.password),
			favPage: [],
			favMod: [],
			permission: null
		}, _self.getBaseData());
		_self._add(data, callback);
	},
	
	refresh: function(callback, errback){
		var _self = this;
		// 清空数据库
		//_self.removeBy({}, function(){
			// 查询LDAP
			LDAP.search('ou=People,dc=ve,dc=cn', function(data){
				if(data.uid){
					var uData = {
						dn: data.dn,
						uid: data.uid,
						name: data.cn,
						email: data.mail,
						password: data.userPassword,
					};
					// 查询用户是否存在
					_self.findBy({'uid': uData.uid}, null, function(_data){// 保存用户信息(新增或更新)
						if(_data && _data.length > 0){
							//console.log('更新：' + uData.name)
							// 更新用户
							uData.password = UtilTool.md5(uData.password);
							_self.updateById(_data[0]._id, {
								'$set': uData
							});
						}else{
							//console.log('新增：' + uData.name)
							// 添加用户
							_self.add(uData);
						}
					});
				}
			}, callback, errback);
		//}, errback);
	},

	updateDefaultPasswd: function () {
		var _self = this;
		var uData = {};
		_self.findBy({}, null, function(_data){
			if(_data && _data.length > 0){
				//console.log(_data.length);

				_data.forEach(function (d) {
					//console.log(d.uid);
					if (d.uid != 'manman' && d.uid != 'luolipaopao' && d.uid != 'yangdongxi') {
						// 更新
						uData.password = UtilTool.md5('hzmkmkhz6');
						_self.updateById(d._id, {
							'$set': uData
						});
					}
				});
			}
		});
	},

	addSingleUser: function (data, callback) {
		var _self = this;

		if(data.uid){
			var uData = data;
			// 查询用户是否存在
			_self.findBy({'uid': uData.uid}, null, function(_data){
				if(_data && _data.length > 0){
					//console.log('更新：' + uData.name)
					// 更新用户
					uData.password = UtilTool.md5(uData.password);
					_self.updateById(_data[0]._id, {
						'$set': uData
					}, callback);
				}else{
					//console.log('新增：' + uData.name)
					// 添加用户
					_self.add(uData, callback);
				}
			});
		}
	},
	
	addPageFav: function(id, pageId, callback, errback){
		var _self = this;
		_self.updateById(id, {
			'$addToSet': {
				'favPage': pageId
			}
		}, callback, errback);
	},
	removePageFav: function(id, pageId, callback, errback){
		var _self = this;
		_self.updateById(id, {
			'$pull': {
				'favPage': pageId
			}
		}, callback, errback);
	},
	isFavPage: function(id, pageId, callback){
		var _self = this;
		pageId = pageId.toString();
		if(id && pageId){
			_self.findById(id, function(data){
				if(data && S.inArray(pageId, data.favPage || [])){
					callback(true);
				}else{
					callback(false);
				}
			});
		}else{
			callback(false);
		}
	},

	addModFav: function(id, modId, callback, errback){
		var _self = this;
		_self.updateById(id, {
			'$addToSet': {
				'favMod': modId
			}
		}, callback, errback);
	},
	removeModFav: function(id, modId, callback, errback){
		var _self = this;
		_self.updateById(id, {
			'$pull': {
				'favMod': modId
			}
		}, callback, errback);
	},
	isFavMod: function(id, modId, callback){
		var _self = this;
		modId = modId.toString();
		if(id && modId){
			_self.findById(id, function(data){
				if(data && S.inArray(modId, data.favMod || [])){
					callback(true);
				}else{
					callback(false);
				}
			});
		}else{
			callback(false);
		}
	},
	// 变更权限
	updatePms: function(uid, p, callback){
		var _self = this;
		_self.updateBy({'uid': uid}, {
			'$set': {
				'permission': p
			}
		}, callback);
	},
    // 用户信息更新
    updateUsers: function(uid, password, callback){
        var _self = this;
        _self.updateBy({'uid': uid},{
            '$set': {
                'password': UtilTool.md5(password)
            }
        }, callback)
    }
});

module.exports = new UserDB();
