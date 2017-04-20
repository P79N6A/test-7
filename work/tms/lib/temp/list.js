var dataList = [
	{
		"title":"空白模板",
		"tplId": ''
	},
    //{
    //    "title":"每日10件",
    //    "tplId": '54fe4d88d63bf12d7a0c556e',
    //    "demo": 'http://a.taojae.com/m/ten0311.html'
    //},
    // {
    //     'title': '瀑布流',
    //     'tplId': '552ddefb184a4a552202d552',
    //     'demo': 'http://a.taojae.com/m/hdltest8.html'
    // },
	// {
	// 	"title":"商品专场",
	// 	"tplId":'54f024372b8fd44369bd3a94',
    //     "demo": 'http://a.taojae.com/m/qinsha.html'
	// },
	//{
	//	"title":"图文工厂",
	//	"tplId": '54d8713cb6e62c171cf3ac6b',
     //   "demo": 'http://a.taojae.com/m/ketang14.html'
	//},
//			{
//				'title': '商品专场',
//				'tplId': '552dd517fecf0ebf21599121',
//				'demo': 'http://act.ve.cn/m/qinsha.html'
//			},
//			{
//				'title': 'top榜',
//				'tplId': '552dd6d875f4b90d22b57729',
//				'demo': 'http://act.ve.cn/m/topzdtq.html'
//			},
	// {
	// 	'title': '搭配指南',
	// 	'tplId': '552dde8b1676642122876e84',
	// 	'demo': 'http://act.ve.cn/m/dprj018.html'
	// },
	//{
	//	'title': '营销文章列表',
	//	'tplId': '552ddf651278595722071f55',
	//	'demo': 'http://act.ve.cn/m/ketanglist.html'
	//},
    //{
    //    'title':'横向滑动',
    //    'tplId':'5537728a5377e53d6a0267db',
    //    'demo':'http://a.taojae.com/m/hunli.html'
    //}
];

var listTemp = function(req, res){
	res.render('temp/list', {
		header: req.systemHeaderInfo,
		listData: dataList
	});
}

var listTempApi = function(req, res){
	res.jsonp({
		code: 10000,
		msg: 'success',
		data: {
			header: req.systemHeaderInfo,
			listData: dataList
		}
	});
}
module.exports.render = listTemp;
module.exports.list = listTempApi;
