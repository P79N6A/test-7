
Mock.mock(/\/user\/get/, {
	'user': '@name'
});


Mock.mock(/\/user\/query/, {
	'name|5-20': [{name: '@name'}]
});