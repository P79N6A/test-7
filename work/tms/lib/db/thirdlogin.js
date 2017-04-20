//  用户表
var S = require('kissy').KISSY,
    Util = require('util'),
    UtilTool = require('../tools/utils'),
    BaseDB = require('./base');

var config = UtilTool.getJSONSync("config.json");

function DB(config){
    var _self = this;
    _self.config = S.merge(DB.config, config);
    DB.super_.call(_self, _self.config);
}

Util.inherits(DB, BaseDB);
DB.config = {
    db: config.db.name,
    col: 'thirdlogin'
};

S.mix(DB.prototype, {

    _init: function(){},

    add: function (data, callback) {
        var _self = this;

        var d = {
            openid: data.openid,
            uid: data.uid,
            createDate: new Date().getTime()
        };

        _self._add(d, callback);
    },

    query: function (data, callback) {
        var _self = this;

        // 查询用户是否绑定
        _self.findBy({'openid': data.openid}, null, function(_data){
            var uid = '';
            if(_data && _data.length > 0){
                uid = _data[0].uid;
            }
            callback(uid);
        });
    }
});

module.exports = new DB();
