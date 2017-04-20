var S = require("kissy").KISSY,
	UtilTools = require('../tools/utils'),
	DBTools = require('../tools/db'),
	pageBase = require('./base'),
	pageBuild = require('./build'),
	pageDB = require('../db/page'),
	userDB = require('../db/user'),
	Promise = require('promise');


var pageSize = 20;
var config = UtilTools.getJSONSync("config.json");
var thirdAppInfo;

// 页面列表
var listPage = function(req, res){
	var userId = req.session.user_id,
		header = req.systemHeaderInfo,  // 当前用户的相关信息
		uId = header.uid,
		searchObj = {
			title: req.query['q'],
			sType: req.query['type'] || 'all',
			curPage: req.query['page'] || 1
		};

    pageSize = req.query['pageSize'] || 20;
	// add 第三方登录信息
	thirdAppInfo = req.thirdAppInfo || null;

	// promise: 获取当前用户收藏记录
    var promiseGetFavPages = new Promise (function (resolve, reject) {
        userDB.findById(userId, function(data){
            var favPages = S.clone(data.favPage);
            resolve(favPages);
        });
    });
    // promise：搜索
    var promiseSearch = new Promise (function (resolve, reject) {
        search(header, searchObj, userId, uId, function(data, count){
            resolve({
                data: data,
                count: count
            });
        });
    });

    Promise.all([promiseGetFavPages, promiseSearch]).then(function (values) {
        // 加工数据
        var favPages = values[0] || [],
            searchResult = values[1],
            itemList = searchResult.data || [],
            count = searchResult.count,
            pageObj = {
                statusMap: pageDB.statusMap,
                typeMap: pageDB.typeMap,
                totalPage: Math.ceil(count/pageSize),
                count: count
            };
        S.each(itemList, function(item){
            // 日期
            item.createDate = UtilTools.formatDate(item.createDate);
            item.curStatus.date = UtilTools.formatDate(item.curStatus.date);

            // 是否收藏
            item.isFav = S.inArray(item._id.toString(), favPages);
        });

        checkApi(req,function(){
            res.jsonp({
                code:10000,
                msg:"success",
                data:{
                    listData: itemList,
                    page: pageObj,
                    search: searchObj,
                    header: header,
                    curPage: searchObj.curPage,
                    totalPage: pageObj.totalPage,
                    onlineDomain: config['customDomain'][req.systemHeaderInfo.uid] || config['onlineDomain']
                }
            });
        },function(){
            _render(req, res, itemList, pageObj, searchObj);
        });
    });
};

var _render = function(req, res, data, page, search){
	res.render('page/list', {
		header: req.systemHeaderInfo,
		listData: data || [],
		page: page,
		search: search,
        host: config['host'],
		onlineDomain: config['customDomain'][req.systemHeaderInfo.uid] || config['onlineDomain']
	});
};

var search = function(header, sObj, userId, uId, callback){
	var by = {
			'curStatus.id': {'$ne': 'removed'}
		},
		// 查询方式
		opt = {
			skip: (sObj.curPage - 1) * pageSize,
			limit: pageSize,
			sort: {'createDate': -1}
		};

	var isCoder = header.permission == 'admin' || header.permission == 'coder';

	// 对于第三方应用，增加 user_id & biz_code 的限制
	if (thirdAppInfo) {

		for (var key in thirdAppInfo) {
			// todo 临时先把 from_url 限制去掉
			if (key == 'appFromUrl') {
				continue;
			}
			by[key] = thirdAppInfo[key];
		}

		// 过滤数据类型的页面
		by['pageType'] = {'$ne': 'data'};
	}
	if(sObj.sType === 'fav' && userId){
		var idList = [];
		userDB.findById(userId, function(uData){
			idList = uData.favPage;
			S.each(idList, function(id, i){
				idList[i] = DBTools.getId(id);
			});
			
			by['_id'] = {'$in': idList};
			
			pageDB.findBy(by, opt, function(data, c){
				callback(data, c);
			});
		});
	}else{
		if(sObj.title){
			if(isCoder){
				by['$or'] = [{
					'title': new RegExp(sObj.title)
				}, {
					'name': new RegExp(sObj.title)
				}, {
					'path': new RegExp(sObj.title)
				}, {
					'owner.name': new RegExp(sObj.title)
				}];
			}else{
				by['$and']=[{
					'$or':[{
						'title': new RegExp(sObj.title)
					}, {
						'name': new RegExp(sObj.title)
					}, {
						'path': new RegExp(sObj.title)
					}, {
						'owner.name': new RegExp(sObj.title)
					}],
					'owner.id':userId
				}]
			}
		}else if(sObj.sType === 'mine' && userId){
			by['owner.id'] = userId;
		}else if(sObj.sType === 'published'){
			by['curStatus.id'] = sObj.sType;

			if(!isCoder){
				by['$or'] = [{
					'owner.id': userId
				}, {
					'whiteList': uId
				}];
			}

		}else if(sObj.sType === 'unpublished'){
			by['curStatus.id'] = {
				'$in': ['new', 'editing']
			};

			if(!isCoder){
				by['$or'] = [{
					'owner.id': userId
				}, {
					'whiteList': uId
				}];
			}
		}else if(sObj.sType === 'key' && uId && userId){
			by['$or'] = [{
				'owner.id': userId
			}, {
				'whiteList': uId
			}];
		}else if(sObj.sType && sObj.sType !== 'all'){
			// todo 权限控制
			by['pageType'] = sObj.sType;
		} else {
			if (!isCoder) {
				by['$or'] = [{
					'owner.id': userId
				}, {
					'whiteList': uId
				}];
			}
		}

		// 控制字段返回， 剔除 modList
		// 速度提升 (1050-845)/1050*100% = 19.52%
		var project;
		project = {
			createDate: 1,
			curStatus: 1,
			owner: 1,
			pageType: 1,
			path: 1,
			name: 1,
            title: 1,
			whiteList: 1
		};
		pageDB.findBy(by, opt, function(data, c){
			callback(data, c);
		}, project);
	}
	
};

// 删除页面
// todo 增加用户间权限隔离
var removePage = function(req, res){
	var pageId = req.params['id'];
	// 检测页面状态，只有新页面能删除
	pageDB.findById(pageId, function(data){
		if(data && data.curStatus.id !== 'removed'){
			// 删除已经构建的页面
			UtilTools.deletePathSync(pageBase.getPagePath(data));
			// 删除页面数据
			pageDB.removeSoft(pageId, pageBase.getUser(req), function(){
				checkApi(req,function(){
					res.jsonp({
						code:10000,
						msg: "success"
					});
				}, function(){
					res.json({
						success: true
					});
				});
			});
		}else{
			checkApi(req, function(){
				res.jsonp({
					code: 30001,
					msg: '页面不存在！'
				});
			}, function(){
				res.json({
					success: false,
					errorMsg: '页面不存在！'
				});
			});
		}
	});
};

// 基本信息修改
var modifyInfo = function(req, res){
	var pageId = req.params['id'],
		operator = pageBase.getUser(req),
		updateInfo = {
			title: req.body['title'],
			name: req.body['name'],
			whiteList: req.body['white']
		};
	if(pageId && updateInfo.title){
		pageDB.findById(pageId, function(data){
			if(data){
				// 如果没有owner, 就确定当前操作人为owner
				if(!data.owner || !data.owner.uid){
					updateInfo.owner = operator;
				}
				// 修改页面基本信息
				pageDB.updateInfo(pageId, updateInfo, function(){
					res.json({
						success: true
					});
				});
			}else{
				res.json({
					success: false,
					errorMsg: '找不到页面~'
				});
			}
		});
	}else{
		res.json({
			success: false,
			errorMsg: '提交数据有误~'
		});
	}
	
};

// 收藏
var addFav = function(req, res){
	var pageId = req.params['id'],
		userId = req.session.user_id;
	if(pageId && userId){
		userDB.addPageFav(userId, pageId, function(){
			checkApi(req, function(){
				res.jsonp({
					code: 10000,
					msg: "success"
				});
			}, function(){
				res.json({
					success: true
				});
			});
			
		}, function(err){
			checkApi(req, function(){
				res.jsonp({
					code: 30000,
					msg: err.err
				});
			}, function(){
				res.json({
					success: false,
					errorMsg: err.err
				});
			});
		});
	}else{
		checkApi(req, function(){
			res.jsonp({
				code: 20000,
				msg: '参数不正确~'
			});
		}, function(){
			res.json({
				success: false,
				errorMsg: '参数不正确~'
			});
		});
	}	
};
var removeFav = function(req, res){
	var pageId = req.params['id'],
		userId = req.session.user_id;	
	if(pageId && userId){
		userDB.removePageFav(userId, pageId, function(){
			checkApi(req, function(){
				res.jsonp({
					code: 10000,
					msg: "success"
				});
			}, function(){
				res.json({
					success: true
				});
			});
			
		}, function(err){
			checkApi(req, function(){
				res.jsonp({
					code: 30000,
					msg: err.err
				});
			}, function(){
				res.json({
					success: false,
					errorMsg: err.err
				});
			});
		});
	}else{
		checkApi(req, function(){
			res.jsonp({
				code: 20000,
				msg: '参数不正确~'
			});
		}, function(){
			res.json({
				success: false,
				errorMsg: '参数不正确~'
			});
		});
	}
};

var checkApi = function(req, succCallback, failCallback){
	if(req.isApiMark){
		succCallback && succCallback();
	}else{
		failCallback && failCallback();
	}
};

var addApiMark = function(req, res, next){
	req.isApiMark = true;//是否是接口服务访问
	next && next();
};

module.exports.remove = removePage;
module.exports.render = listPage;
module.exports.modify = modifyInfo;
module.exports.addFav = addFav;
module.exports.removeFav = removeFav;
module.exports.addApiMark = addApiMark;
