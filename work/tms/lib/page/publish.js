var pathModule = require("path"),
    S = require("kissy").KISSY,
    UtilTools = require('../tools/utils'),
    pageBase = require('./base'),
    pageDB = require('../db/page');
fs = require( 'fs' ),
    stat = fs.stat;

var config = UtilTools.getJSONSync("config.json");

// 页面刷新
var refreshPage = function(req, res){
    var pageId = req.params['id'];

    pageDB.findById(pageId, function(data){
        if(data && data.curStatus.id !== 'removed'){
            var pageUrl = pageBase.getUrl(data);
            // 刷新缓存
            UpyunTools.purge(pageUrl, function(){
                res.json({
                    success: true,
                    url: pageUrl
                });
            }, function(err){
                res.json({
                    success: false,
                    errorMsg: err
                });
            });
        }else{
            res.json({
                success: false,
                errorMsg: '页面不存在！'
            });
        }

    });

};

// 同一台服务器，做copy操作
var publishLocal = function (req, res) {
    var pageId = req.params['id'];

    pageDB.findById(pageId, function(data){

        if(data && data.curStatus.id !== 'removed'){
            var pagePath = pathModule.join(__dirname, '..', '..', pageBase.getPagePath(data)),
                userInfo = pageBase.getUser(req),
                publishedPath, subDir;

            // 个性化域名实现
            // todo 代码编辑先去掉域名支持
            // todo 管理员查看支持个性化域名的页面，404
            var pageType = data.pageType;
            if (pageType != 'data') {
                if (config['customDomain'][userInfo.uid]) {
                    subDir = userInfo.uid;
                }
            }
            publishedPath = pathModule.join(__dirname, '..', '..', pageBase.getPublishedPath(data, subDir));

            // copy 操作
            console.log(pagePath);
            console.log(publishedPath);
            _copy(pagePath, publishedPath);

            // 更改页面状态
            pageDB.updateStatus(data._id, 'published', userInfo, function(){
                var pageUrl = pageBase.getUrl(data);
                res.json({
                    success: true,
                    url: pageUrl
                });
            });
        }else{
            res.json({
                success: false,
                errorMsg: '页面不存在！'
            });
        }

    });
};

var _exists = function( dst, callback ){
    fs.exists( dst, function( exists ){
        // 已存在
        if( exists ){
            callback();
        }
        // 不存在
        else{
            fs.mkdir( dst, function(){
                callback();
            });
        }
    });
};

var _copy = function( srcFile, dstFile ){
    var readable,
        writable;

    stat( srcFile, function( err, st ){
        if( err ){
            throw err;
        }
        // 判断是否为文件
        if( st.isFile() ){
            // 创建读取流
            readable = fs.createReadStream( srcFile );
            // 创建写入流
            writable = fs.createWriteStream( dstFile );
            // 通过管道来传输流
            readable.pipe( writable );
        }
    });
};


module.exports.render = publishLocal;
module.exports.refresh = refreshPage;
