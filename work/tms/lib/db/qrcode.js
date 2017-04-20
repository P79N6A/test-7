//  活码表
var S = require('kissy').KISSY,
    Util = require('util'),
    UtilTool = require('../tools/utils'),
    BaseDB = require('./base');

var config = UtilTool.getJSONSync("config.json");

/*
 字段：
 key        生成的活码标示
 content    跳转的内容
 url        二维码图片地址
 type       码的内容类别  默认为0
 owner      生成人
 createDate 生成时间
 */
function DynQrDB(config){
    var _self = this;
    _self.config = S.merge(DynQrDB.config, config);
    DynQrDB.super_.call(_self, _self.config);
}

Util.inherits(DynQrDB, BaseDB);
DynQrDB.config = {
    db: config.db.name,
    col: 'dynqrcode'
};

S.mix(DynQrDB.prototype, {
    typeMap: {
        'normal': '普通二维码',
        'dynamic': '活码'
    },
    _init: function(){},

    add: function(data, callback){
        var _self = this;
        data = S.merge({
            key: data.key,
            content: data.content,
            name: data.name,
            url: data.url,
            type: data.type || 0,
            owner: data.owner
        }, _self.getBaseData());
        _self._add(data, callback);
    }

});

module.exports = new DynQrDB();
