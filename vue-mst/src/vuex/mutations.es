import * as types from './mutation-types';
import VIP from 'services/public';

function getNavLinks (state) {
	if(getNavLinks.result){ return getNavLinks.result; }
	var navLinks = state.topLinks.slice(0);
	VIP.eachKey(state.asideLinkMap, function(links){
		navLinks = navLinks.concat(links);
	});
	
	getNavLinks.result = navLinks;
	return navLinks;
}

//解析出面包屑路径数组 /foo/bar/zoo -> ['/foo', '/foo/bar', '/foo/bar/zoo'];
function parsePath (path) {
	function concatStr (str1, str2) {
		return str1 + str2;
	}
	var parts = [];
	path.replace(/\/\w+/g, function(m){
		parts.push(m);
	});
	return parts.map(function(part, i){
		if(i){
			return parts.slice(0, i+1).reduce(concatStr);
		}else{
			return part;
		}
	});
}

export default  {
	//重置面包屑
	[types.BREADCRUMBS_RESET](state, crumbs) {
		state.breadCrumbs = crumbs;
	},
	//更新面包屑
	[types.BREADCRUMBS_SET](state, link) {
		var len = state.breadCrumbs.length;
		var navLinks = getNavLinks(state);
		var paths = parsePath(link.url);
		var links = paths.map(function(path) {
			return navLinks.filter(function(link){ return link.url === path; })[0];
		});
		if (links) {
			state.breadCrumbs = state.breadCrumbs.slice(0,1).concat(links);
		}
		if(link.url === '/index'){
			state.breadCrumbs = state.breadCrumbs.slice(0,1);
		}
		// state.breadCrumbs.splice(link.level, len-link.level, link);
	},

	[types.LOADING_INCREMENT](state) {
		state.loadingCount++;
	},
	[types.LOADING_DECREMENT](state) {
		state.loadingCount--;
	},

	[types.TIPS_UPDATE](state, type, text) {
		state.tips.type = type;
		state.tips.text = text;
	}


};

