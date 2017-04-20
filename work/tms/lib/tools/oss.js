/**
 * Oss 上传
 */

'use strict';

var ALY = require('aliyun-sdk'),
    fs = require('fs'),
    Utils = require("./utils"),
    pathModule = require('path');

// 随机字符串生成器
var randomStr = function (len) {
    var len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var pwd = '';

    for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }

    return pwd;
};

var getTimestampFilePath = function () {
    var oDate = new Date();
    var year = oDate.getFullYear();
    var month = oDate.getMonth() + 1;
    var date = oDate.getDate();

    return 'tms/' + year + '/' + month + '/' + date;
};

var config = Utils.getJSONSync("config.json");

var Oss = {},
    imgBaseUrl = config.oss.domain;

var ossStream = require('./aliyun-oss-upload-stream')(new ALY.OSS({
    accessKeyId: config.oss.accessKeyId,
    secretAccessKey: config.oss.secretAccessKey,
    endpoint: config.oss.endpoint,
    apiVersion: '2013-10-15'
    //region : "oss-cn-shanghai"
}));

Oss.uploadImg = function(filePath, imgType, dir, callback, errback){
    var dir = dir || getTimestampFilePath();
    var fileName = filePath.split(/[/|\\]+/);
    fileName = fileName[fileName.length-1];
    console.log("fileName = " + fileName);
       // fileName = filePath.slice(filePath.lastIndexOf('/|\\') + 1),
    var remotePath = dir +  '/' + fileName,
        url = imgBaseUrl + '/' + remotePath;



    // 源地址转换绝对路径
    var tempDir = pathModule.join(__dirname, '..', '..', '..');
    console.log(__dirname);
    console.log(tempDir);
    if (filePath.indexOf(tempDir) == -1) {
        filePath = pathModule.join(__dirname, '..', '..', filePath);
    }

    console.log("filePath = " + filePath);
    console.log("key = " + remotePath);
    console.log("bucket = " + config.oss.bucket);

    // 上传
    var upload = ossStream.upload({
        Bucket: config.oss.bucket,
        Key: remotePath
    });

    upload.on('error', function (error) {
        errback && errback(error);
    });

    upload.on('part', function (part) {
        //console.log('part:', part);
    });

    upload.on('uploaded', function (details) {
        callback(url);
    });

    var read = fs.createReadStream(filePath);
    read.pipe(upload);
};

module.exports = Oss;

