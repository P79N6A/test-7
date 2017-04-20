/**
 * 路由总入口
 */

var express = require('express'),
    Utils = require('../tools/utils');

var serviceRouter = function(app){

    var router = express.Router();

    router.get('/json', require('../service/json').sendFile);

    app.use('/service', router);
};

module.exports.r = serviceRouter;
