var S = require("kissy").KISSY,
	UtilTools = require('../tools/utils'),
	pageDB = require('../db/page'),
	pageBase = require('./base');

var config = UtilTools.getJSONSync("config.json");

// 页面构建
var addPage = function(req, res){
	res.render('page/add', {
		// 来自前一个 handler: Utils.headerInfo
		header: req.systemHeaderInfo,
		onlineDomain: config['customDomain'][req.systemHeaderInfo.uid] || config['onlineDomain']
	});
}

// 创建首页
// 如果已经有了，则直接返回；如果没有，则拷贝一份出来，来自魔筷通用的
var createIndex = function (req, res) {
	var buildData = {
			title: '首页数据',
			name: '商城首页配置'
		};
	var seachParts = [];
	for (var searchText in req.query) {
		seachParts.push(searchText + '=' + req.query[searchText]);
	}
	var searchText = seachParts.join('&') ? '?' + seachParts.join('&') : '';

	// 新增第三方应用数据
	var thirdAppInfo = req.thirdAppInfo || {};
	if (thirdAppInfo) {
		buildData.thirdAppInfo = thirdAppInfo;
	}

	var bizCode = thirdAppInfo['appBizCode'] || req.query['biz_code'];
	if (!bizCode) {
		res.send('biz code can not be empty!');
		return;
	}

	var path = bizCode + 'index';
	// 特殊情况处理
	if (bizCode === 'yangdongxi') {
		path = 'ydxindex';
	}
	buildData.path = path;

	// 检验是否路径重复
	pageDB.findBy({
		'path': buildData.path,
		'curStatus.id': {'$ne': 'removed'}
	}, null, function(data){
		if(data && data.length > 0){
			res.redirect('/page/open/' + data[0]._id.toString() + searchText);
		}else{
			// 加入作者信息
			buildData.owner = pageBase.getUser(req);

			// 复制页面: 魔筷通用首页数据配置
			var pageId = '55e5159d1cd78c0b672e4203';
			pageDB.copy(pageId, buildData, function(newPage){
				res.redirect('/page/open/' + newPage._id.toString() + searchText );
			});
		}
	});
};

/**
 * ray.liu 2016.12.24 qq234715628
 * 创建拼团首页
 * 如果已经有了，则直接返回；如果没有，则拷贝一份出来，来自魔筷通用的
 */
var createGroupIndex = function (req, res) {
	var buildData = {
			title: '拼团首页数据',
			name: '拼团首页配置'
		};
	var seachParts = [];
	for (var searchText in req.query) {
		seachParts.push(searchText + '=' + req.query[searchText]);
	}
	var searchText = seachParts.join('&') ? '?' + seachParts.join('&') : '';

	// 新增第三方应用数据
	var thirdAppInfo = req.thirdAppInfo || {};
	if (thirdAppInfo) {
		buildData.thirdAppInfo = thirdAppInfo;
	}

	var bizCode = thirdAppInfo['appBizCode'] || req.query['biz_code'];
	if (!bizCode) {
		res.send('biz code can not be empty!');
		return;
	}

	var path = bizCode + 'index'; //期望 "groupindex"

	// // 特殊情况处理
	// if (bizCode === 'yangdongxi') {
	// 	path = 'ydxindex';
	// }
	// buildData.path = path;

	// 检验是否路径重复
	pageDB.findBy({
		'path': buildData.path,
		'curStatus.id': {'$ne': 'removed'} // 条件: curStatus_id 不等于 removed （not equal）
	}, null, function(data){
		if(data && data.length > 0){
			res.redirect('/page/open/' + data[0]._id.toString() + searchText);
		}else{
			// 加入作者信息
			buildData.owner = pageBase.getUser(req);

			// 复制页面: 魔筷通用首页数据配置
			var pageId = '55e5159d1cd78c0b672e4203';
			pageDB.copy(pageId, buildData, function(newPage){
				res.redirect('/page/open/' + newPage._id.toString() + searchText );
			});
		}
	});
};

/**
 * ray.liu 2016.12.24 qq234715628
 * 创建拼团首页
 * 如果已经有了，则直接返回；如果没有，则拷贝一份出来，来自魔筷通用的
 */
var createHotsellIndex = function (req, res) {
	var buildData = {
			title: '热卖首页数据',
			name: '热卖首页配置'
		};
	var seachParts = [];
	for (var searchText in req.query) {
		seachParts.push(searchText + '=' + req.query[searchText]);
	}
	var searchText = seachParts.join('&') ? '?' + seachParts.join('&') : '';

	// 新增第三方应用数据
	var thirdAppInfo = req.thirdAppInfo || {};
	if (thirdAppInfo) {
		buildData.thirdAppInfo = thirdAppInfo;
	}

	var bizCode = thirdAppInfo['appBizCode'] || req.query['biz_code'];
	if (!bizCode) {
		res.send('biz code can not be empty!');
		return;
	}

	var path = bizCode + 'index'; //期望 "hotsellindex"

	// // 特殊情况处理
	// if (bizCode === 'yangdongxi') {
	// 	path = 'ydxindex';
	// }
	// buildData.path = path;

	// 检验是否路径重复
	pageDB.findBy({
		'path': buildData.path,
		'curStatus.id': {'$ne': 'removed'} // 条件: curStatus_id 不等于 removed （not equal）
	}, null, function(data){
		if(data && data.length > 0){
			res.redirect('/page/open/' + data[0]._id.toString() + searchText);
		}else{
			// 加入作者信息
			buildData.owner = pageBase.getUser(req);

			// 复制页面: 魔筷通用首页数据配置
			var pageId = '55e5159d1cd78c0b672e4203';
			pageDB.copy(pageId, buildData, function(newPage){
				res.redirect('/page/open/' + newPage._id.toString() + searchText );
			});
		}
	});
};

// 创建模板页：专场页
// 如果已经有了，则直接返回；如果没有，则拷贝一份出来，来自魔筷通用的
// biz_code 商城标示
// page_id 模板id
// page_type 模板类型
// page_title 文章标题
// page_name 页面名称
var createPage = function (req, res) {
	var seachParts = [], buildData = {};

	var time = new Date().getTime();
	var autoPath = UtilTools.md5(time.toString());

	for (var searchText in req.query) {
		seachParts.push(searchText + '=' + req.query[searchText]);
	}
	var searchText = seachParts.join('&') ? '?' + seachParts.join('&') : '';

	// 新增第三方应用数据
	var thirdAppInfo = req.thirdAppInfo || {};
	if (thirdAppInfo) {
		buildData.thirdAppInfo = thirdAppInfo;
	}

	var bizCode = thirdAppInfo['appBizCode'] || req.query['biz_code'] || '';
	var pageTypeName = req.query['page_type'] || '';
	var pageId = req.query['page_id'] || '576bab9efb9543457c06ac32';

	var path;
	if (bizCode && pageTypeName) {
		path = bizCode + pageTypeName;
	}
 	buildData.path = path || autoPath;

	buildData.title = req.query['page_title'] || '空标题';
	buildData.name = req.query['page_name'] || '空白模板创建的页面';

	// 检验是否路径重复
	pageDB.findBy({
		'path': buildData.path,
		'curStatus.id': {'$ne': 'removed'}
	}, null, function(data){
		if(data && data.length > 0){
			res.redirect('/page/open/' + data[0]._id.toString() + searchText);
		}else{
			// 加入作者信息
			buildData.owner = pageBase.getUser(req);

			// 复制页面
			pageDB.copy(pageId, buildData, function(newPage){
				res.redirect('/page/open/' + newPage._id.toString() + searchText );
			});
		}
	});
};

// 保存构建信息，开始构建
var saveAddPage = function(req, res){
	var time = new Date().getTime();
	var autoPath = UtilTools.md5(time.toString());

	// todo
	var buildData = {
			title: UtilTools.formatInput(req.body['title']),
			name: UtilTools.formatInput(req.body['name']),
			path: UtilTools.formatInput(req.body['path']) || autoPath,
			tags: UtilTools.formatInput(req.body['tags']).split(','),
			pageType: UtilTools.formatInput(req.body['pageType']) || 'm',
			buildType: UtilTools.formatInput(req.body['buildType']) || 'visual'
		},
		headerInfo = req.systemHeaderInfo;

	// 新增第三方应用数据
	var thirdAppInfo = req.thirdAppInfo || {};
	if (thirdAppInfo) {
		buildData.thirdAppInfo = thirdAppInfo;
	}

	// 检验是否路径重复
	pageDB.findBy({
		'path': buildData.path,
		'curStatus.id': {'$ne': 'removed'} // ？？？
	}, null, function(data){
		if(data && data.length > 0){
			// 路径存在
			checkApi(req, function(){
				res.json({
					code: 20001,
					msg: '线上地址路径已存在，请重新填写~',
					data: {
						header: headerInfo,
						buildData: buildData
					}
				});
			}, function(){
				res.render('page/add', {
					header: headerInfo,
					buildData: buildData, // 粘性
					errorMsg: '线上地址路径已存在，请重新填写~'
				});
			});
		}else{
			// 加入作者信息
			buildData.owner = pageBase.getUser(req);
			// 添加页面
			pageDB.add(buildData, function(newPage){
				checkApi(req, function(){
					res.json({
						code: 10000,
						msg: 'success',
						data:{
							page_id: newPage._id
						}
					});
				}, function(){
					res.redirect('/page/' + newPage._id.toString());
				});
			});
		}
	});
};

var copyPage = function(req, res){
	var pageId = req.params['id'];
	pageDB.findById(pageId, function(data){
		if(data && data.curStatus.id !== 'removed'){
			checkApi(req, function(){
				res.jsonp({
					code: 10000,
					msg:"success",
					data:{
						header: req.systemHeaderInfo,
						pageData: data,
						typeMap: pageDB.typeMap,
						buildMap: pageDB.buildMap,
						onlineDomain: config['customDomain'][req.systemHeaderInfo.uid] || config['onlineDomain']
					}
				});
			}, function(){
				res.render('page/add', {
					header: req.systemHeaderInfo,
					pageData: data,
					typeMap: pageDB.typeMap,
					buildMap: pageDB.buildMap,
					onlineDomain: config['customDomain'][req.systemHeaderInfo.uid] || config['onlineDomain']
				});
			});
		}else{
			checkApi(req, function(){
				res.jsonp({code:20000,msg:'页面不存在！'});
			}, function(){
				res.send('页面不存在！');
			});
		}
	});
};

var saveCopyPage = function(req, res){
	var time = new Date().getTime();
	var autoPath = UtilTools.md5(time.toString());

	var pageId = req.params['id'],
		buildData = {
			title: UtilTools.formatInput(req.body['title']),
			name: UtilTools.formatInput(req.body['name']),
			path: UtilTools.formatInput(req.body['path']) || autoPath,
			tags: UtilTools.formatInput(req.body['tags']).split(','),
			pageType: UtilTools.formatInput(req.body['pageType']) || 'm',
			buildType: UtilTools.formatInput(req.body['buildType']) || 'visual'
		},
		headerInfo = req.systemHeaderInfo;

	// 新增第三方应用数据
	var thirdAppInfo = req.thirdAppInfo || {};
	if (thirdAppInfo) {
		buildData.thirdAppInfo = thirdAppInfo;
	}

	pageDB.findById(pageId, function(pageData){
		if(pageData && pageData.curStatus.id !== 'removed'){
			// 检验是否路径重复
			pageDB.findBy({
				'path': buildData.path,
				'curStatus.id': {'$ne': 'removed'}
			}, null, function(data){
				if(data && data.length > 0){
					// 路径存在
					checkApi(req, function(){
						res.jsonp({
							code:20000,
							msg:"线上地址路径已存在，请重新填写~",
							data:{
								header: headerInfo,
								buildData: buildData,
								pageData: pageData,
								typeMap: pageDB.typeMap,
								buildMap: pageDB.buildMap
							}
						});
					}, function(){
						res.render('page/add', {
							header: headerInfo,
							buildData: buildData,
							pageData: pageData,
							typeMap: pageDB.typeMap,
							buildMap: pageDB.buildMap,
							errorMsg: '线上地址路径已存在，请重新填写~'
						});
					});
				}else{
					// 加入作者信息
					buildData.owner = pageBase.getUser(req);
					// 复制页面
					pageDB.copy(pageId, buildData, function(newPage){
						checkApi(req, function(){
							res.jsonp({
								code:10000,
								msg:"success",
								data:{
									page_id:newPage._id
								}
							});
						}, function(){
							res.redirect('/page/edit/' + newPage._id.toString());
						});
					});
				}
			});

		}else{
			res.send('页面不存在！');
		}
	});

};

var checkApi = function(req, succCallback, failCallback){
	if(req.isApiMark){
		succCallback && succCallback();
	}else{
		failCallback && failCallback();
	}
};

var addApiMark = function(req, res, next){
	req.isApiMark = true;
	next && next();
};

module.exports.render = addPage;
module.exports.save = saveAddPage;
module.exports.copyRender = copyPage;
module.exports.copySave = saveCopyPage;
module.exports.createIndex = createIndex;
module.exports.createPage = createPage;
module.exports.createGroupIndex = createGroupIndex; // 新增拼团首页
module.exports.createHotsellIndex = createHotsellIndex; // 新增热卖首页
module.exports.addApiMark = addApiMark;
