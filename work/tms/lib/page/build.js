var S = require("kissy").KISSY,
	UtilTools = require('../tools/utils'),
	piwikDB = require('../db/piwik'),
	modBase = require('../mod/base'),
	pageDB = require('../db/page'),
	userDB = require('../db/user'),
	modRender = require('../mod/render'),
	Promise = require('promise');

var config = UtilTools.getJSONSync("config.json");

// 页面构建
var buildPage = function(req, res){
	var pageId = req.params['id'],
		header = req.systemHeaderInfo,
		uId = header.uid,
		userId = req.session.user_id;
		
	if (!pageId.match(/^[0-9a-z]+$/)) {
		// 页面不存在展示
		res.send('找不到页面！');
	}

	// todo 有些难理解，/open || /tplopen
	if (pageId == 'open' || pageId == 'tplopen') {
		// todo 做些修正：原有的逻辑，是可以通过多步骤实现页面的配置编辑
		// todo 现在是只有页面编辑页
		// todo 暂时采用跳转的逻辑，兼容上面的逻辑
		// todo 老版本无法编辑页面标题等
		var queryStrArr = [];
		for (var k in req.query) {
			if (!req.query.hasOwnProperty(k)) {
				continue;
			}

			// 对于 '/page/tplopen/?id=' + id
			//  id 替换成 page_id
			if (k == 'id' && pageId == 'tplopen') {
				queryStrArr.push('page_id=' + req.query[k]);
			} else {
				queryStrArr.push(k + '=' + req.query[k]);
			}
		}
		// 302 跳转
		var queryStr = queryStrArr.length > 0 ? '?' + queryStrArr.join('&') : '';
		res.redirect('/page/createPage' + queryStr);

		//var renderData = {emptyData: '1'};
		//if (pageId == 'tplopen') {
		//	renderData.type = 'copy';
		//}
		//res.render('page/open', renderData);
		//return;
	}

	// 查询
	pageDB.findById(pageId, function(data){
		if(data && data.curStatus.id !== 'removed'){
			getDetail(data, userId, uId, function(){
				var renderData = {
					header: req.systemHeaderInfo,
					pageData: data,
					statusMap: pageDB.statusMap,
					onlineDomain: config['customDomain'][uId] || config['onlineDomain']
				};

				if(data.buildType === 'code' && data.pageType === 'data'){
					console.log('--------------> go here?');
					// 代码构建
					_render(req, res, data.pageType, renderData);
				}else if (data.buildType === 'visual'){
					// 可视化构建: 如果 pageType 是 data，则只有 data 模块
					// 否则除 data 之后的其他模块
					// 可以配置：表现在模板的使用，只需要指定的几个模块
					// 获取全部模块列表
					// todo 可视化构建，存在模块列表，展示模块列表
					// todo 还有模块组成数据
					// todo 选择性给出模块
					modBase.getList(function(moduleData){
						var srcModTagList = S.clone(config.moduleTagMap);
						var modTagList = {};

						var tags = data.tags || [];
						var omitTags = data.omitTags || [];
						if (data.pageType == 'data') {
							tags = ['data'];
						} else {
							omitTags.push('data');
						}

						// 营销类模块，只有在管理后台里面，暂时在 U店 中打开
						// if (uId != 'ushop') {
						// 	omitTags.push('market');
						// }

						if (tags.length) {
							for (var key in srcModTagList) {
								if (S.inArray(key, tags)) {
									modTagList[key] = srcModTagList[key];
								}
							}
						} else {
							modTagList = srcModTagList
							if (omitTags.length) {
								omitTags.forEach(function (tag) {
									try {
										delete modTagList[tag];
									} catch (e) {

									}
								})
							}
						}

						renderData = S.merge(renderData, {
							moduleData: moduleData,
							modTagList: modTagList
						});
						console.log('--------------> go here? <-----');
						_render(req, res, data.pageType, renderData);
					});
				}else {
					// 类型不支持
					res.send('当前页面类型不支持！');
				}
			});
		}else{
			// 页面不存在展示
			res.send('找不到页面！');
		}
	});

};

var _render = function(req, res, pageType, renderData){
	var moduleData = renderData.moduleData;
	if (moduleData) {
		var modules = {};
		moduleData.forEach(function (mod, index) {
			var tags = mod.tag;
			tags.forEach(function (tag) {
				if (!modules[tag]) {
					modules[tag] = [];
				}
				modules[tag].push(mod);
			});
		});
		renderData.moduleData = modules;

		// todo 暂时性支持首页预览
		// 1. type data
		// 2. path index 结尾
		var pageType = renderData.pageData.pageType;
		var pagePath = renderData.pageData.path;
		var pathReg = /(.+)index$/;

		if (pageType == 'data' && pathReg.test(pagePath)) {
			var bizMatch = pagePath.match(pathReg);
			var biz = bizMatch[1];

			renderData.pageData.previewUrl = '/preview_index.html?biz=' + biz;
		}

		var labeledMods = {};
		var modTagList = renderData.modTagList;
		for (var k2 in modTagList) {
			labeledMods[modTagList[k2]] = modules[k2];
		}
		renderData.labeledMods = labeledMods;

		// 支持json输出
		if (req.query.json== '1') {
			res.json(renderData);
		} else {
			renderData.onlyReadStatus = req.readWritePermission == 700;
			res.render('page/open', renderData);

			//if (req.params['type'] == 'open') {
			//	renderData.onlyReadStatus = req.readWritePermission == 700;
			//	res.render('page/open', renderData);
			//} else {
			//	res.render('page/edit', renderData);
			//}
		}
	}else if(pageType === 'pc'){
		res.render('page/buildpc', renderData);
	}else if(pageType === 'rgn'){
		res.render('page/buildrgn', renderData);
	}else{
		res.render('page/builddata', renderData);
	}
};

// 获取页面详情
var getDetail = function(data, userId, uId, callback){
	// 日期
	data.createDate = UtilTools.formatDate(data.createDate);
	data.curStatus.date = UtilTools.formatDate(data.curStatus.date);
	// 权限
	if(uId && ((data.owner && data.owner.uid) === uId || (data.whiteList && S.inArray(uId, data.whiteList)))){
		data.hasKey = true;
	}else{
		data.hasKey = false;
	}
	// 统计数据: 依赖piwik数据，so 暂时关闭
	//_getPiwikInfo(data, function(){
		// 收藏
		_getFavInfo(data, userId, function(){
			callback && callback(data);
		});
	//});
};

// 获取昨日数据
var _getPiwikInfo = function(data, callback){
	var day = UtilTools.formatDate(new Date().getTime() - 1000*3600*24, 'yyyy-MM-dd');
	//var day = '2015-01-22';
	if((data.curStatus.id === 'published' || data.curStatus.id === 'editing') && (data.pageType === 'm' || data.pageType === 'pc')){
		piwikDB.getDay(data._id.toString(), day, function(d){
			data.piwik = {
				date: day,
				data: d,
				transUrl: _getTransUrl(data, day),
				evUrl: _getEvUrl(data, day)
			};
			callback && callback(data);
		});
	}else{
		callback && callback(data);
	}
};

var _getPiwikBaseUrl = function(date, search){
	var base = 'http://163.177.19.175/piwik/index.php?module=Widgetize&action=iframe&widget=1&moduleToWidgetize=Actions&actionToWidgetize=getPageUrls&idSite=1&filter_limit=5&period=day&date=';
	base = base + date;
	if(search){
		base = base + '&filter_pattern_recursive=' + search;
	}
	return base;
};

var _getPiwikPageUrl = function(data, noHost){
	var pageUrl = '',
		//path = data.path.replace('-test', '');
		path = data.path;
	if(data.pageType === 'm'){
		/*if(noHost){
			pageUrl = '/tms.php?f=' + path;
		}else{
			pageUrl = 'http://h5.ve.cn/tms.php?f=' + path;
		}*/
		if(noHost){
			pageUrl = '/m/' + path + '.html';
		}else{
			pageUrl = 'http://act.ve.cn/m/' + path + '.html';
		}
	}else{
		if(noHost){
			pageUrl = '/pc/' + path + '.html';
		}else{
			pageUrl = 'http://act.ve.cn/pc/' + path + '.html';
		}
	}
	return encodeURIComponent(pageUrl).replace(/%/g, '$');
};
var _getTransUrl = function(data, day){
	return _getPiwikBaseUrl(day, data.path) + '#popover=RowAction$3ATransitions$3Aurl$3A' + _getPiwikPageUrl(data);
};

var _getEvUrl = function(data, day){
	return _getPiwikBaseUrl(day, data.path) + '#popover=RowAction$3ARowEvolution$3AActions.getPageUrls$3A$7B$7D$3A$40' + _getPiwikPageUrl(data, true);
};

var _getFavInfo = function(data, userId, callback){
	if(userId){
		userDB.isFavPage(userId, data._id, function(isFav){
			data.isFav = isFav;
			callback && callback(data);
		});
	}else{
		callback && callback(data);
	}
}

// 更新页面上的所有模块的模板数据
var updateMod = function(req, res){
	var pageId = req.params['id'],
		promiseList = [];
	pageDB.findById(pageId, function(data){
		if(data && data.curStatus.id !== 'removed'){
			S.each(data.modList, function(mod){
				promiseList.push(new Promise(function(resolve, reject){
					_updateMod(mod, function(_mod){
						resolve(_mod);
					});
				}));
			});
			Promise.all(promiseList).then(function(r){
				pageDB.updateModuleList(pageId, data.modList, function(){
					res.json({
						success: true
					});
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

var _updateMod = function(mod, callback){
	modBase.getData(mod._id, function(data){
		mod.name = data.name;
		mod.fields = data.fields;
		mod.assets = data.assets;
		mod.code = data.code;
		mod.render = modRender.renderWithoutTemp(modRender.dataAdap(mod));
		callback(mod);
	});
};

// 更新商品数据
var updateProduct = function(req, res){
	var pageId = req.params['id'],
		promiseList = [];
	pageDB.findById(pageId, function(data){
		if(data && data.curStatus.id !== 'removed'){
			S.each(data.modList, function(mod){
				promiseList.push(new Promise(function(resolve, reject){
					_updateProduct(mod, function(_mod){
						resolve(_mod);
					});
				}));
			});
			Promise.all(promiseList).then(function(r){
				pageDB.updateModuleList(pageId, data.modList, function(){
					res.json({
						success: true
					});
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
var _updateProduct = function(mod, callback){
	modRender.getProductData(mod, mod.data, function(){
		callback(mod);
	});
};


module.exports.render = buildPage;
module.exports.getDetail = getDetail;
module.exports.updateMod = updateMod;
module.exports.updateProduct = updateProduct;
