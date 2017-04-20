/**
 * 代理接口返回
 */

var Utils = require('../tools/utils'),
    request = require('request'),
    S = require('kissy').KISSY;

var Proxy = function(req, res){
    var api = req.query.api ? decodeURIComponent(req.query.api) : null;
    if (!api) {
        res.send('no api defined');
        return;
    }

    request(api, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.jsonp(body);
        }
    })
};

module.exports.render = Proxy;
