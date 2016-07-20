var VIP = require('services/public');

// /city/query?name=xxx
Mock.mock(/\/city\/query/, function(options){
	var params = VIP.queryParse(options.url);

	var cityname = params.name;
	var cities = Mock.mock({'data|50':['@city']});
	cities.data = cities.data.filter(function(city){
		return city.indexOf(cityname)>=0;
	});
	
	return cities;
});