// 图片上传
var S = require("kissy").KISSY,
	Oss = require("../tools/oss"),
	pathModule = require("path"),
	pageBase = require('../page/base'),
	imgDB = require('../db/img'),
	UtilTools = require('../tools/utils'),
	imgSize = require('image-size');

var renderPage = function(req, res){
	res.render('img/upload', {
		header: req.systemHeaderInfo,
		iframe: !!req.query.iframe
	});
};

var saveImg = function(req, res){
	var fileObj = req.files && req.files['file'],
		owner = pageBase.getUser(req);
	if(S.isArray(fileObj)){
		fileObj = fileObj[0];
	}
	if(fileObj){
		// 检测图片大小
		var result = maxSize(fileObj);
		// 打开限制
		// todo: 改成强制上传
		if(result.success || true){
			// 上传
			_upload(fileObj, function(url){
				// 数据库存储
				imgDB.add({
					url: url,
					name: fileObj.name,
					type: 'img',
					owner: owner
				}, function(){
					_render(req, res, {
						success: true,
						url: url
					}, fileObj);
				});
			}, function(err){
				console.log(err);
				_render(req, res, {
					success: false,
					error: err
				}, fileObj);
			});
		}else{
			_render(req, res, {
				success: false,
				error: result.max ? '图片过大，不能超过' + (result.max/1024).toFixed(1) + 'KB，上传失败~' : '图片损坏，上传失败~',
				max: result.max
			}, fileObj);
		}
	}else{
		_render(req, res, {
			success: false,
			error: '上传失败，请重试~'
		});
	}
};

var _render = function(req, res, result, fileObj){
	if(fileObj && fileObj.path){
		// 删除本地文件
		UtilTools.deletePathSync(fileObj.path);
	}
	res.json(result);
};

var maxSize = function(fileObj){
	var fileSize = fileObj.size,
		size,
		max;
		
	try{ 
		size = imgSize(fileObj.path)
	}catch(e){
		return {
			success: false,
			error: e.message
		}
	}
	max = (size.width * size.height * 0.4/1024 + 2) * 1024;
	if(fileSize > max){
		return {
			success: false,
			max: max
		};
	}else{
		return {
			success: true
		};
	}
};

var _upload = function(fileObj, callback, errback){
	var descPath = fileObj.path,
		imgType = fileObj.type;
	Oss.uploadImg(descPath, imgType, '', callback, errback);
};

module.exports.render = renderPage;
module.exports.save = saveImg;
