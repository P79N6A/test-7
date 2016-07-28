var VIP = require('services/public');
var Mock = require('mockjs');

Mock.mock(/\/special\/get/, {
	'special': '@name'
});

Mock.mock(/\/special\/query/, function (options) {
	
	var params = VIP.queryParse(options.url);
	
	var opt = {};
	// opt['specials'] = [];
	opt['specials|'+params.pageSize] = [{'id|+1':params.pageSize*(params.page-1)+1, title: '@csentence', mdate:'@datetime', 'open|1-2': false}];
	opt.pageSize = params.pageSize - 0;
	opt.page = params.page - 0;
	opt['totalRecords'] = 325;
	return Mock.mock(opt);
});

Mock.mock(/\/special\/del/,  {
	msg: 'del ok'
});