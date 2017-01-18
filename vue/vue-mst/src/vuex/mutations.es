import * as types from './mutation-types';
import {eachKey} from 'services/public';

function getNavLinks (state) {
	if(getNavLinks.result){ return getNavLinks.result; }
	var navLinks = state.topLinks.slice(0);
	eachKey(state.asideLinkMap, function(links){
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

//显隐左侧导航
function toggleSidebar (state, show) {
	state.sidebarShown = show==null ? !state.sidebarShown : show;
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
	//ajax计数器
	[types.LOADING_INCREMENT](state) {
		state.loadingCount++;
	},
	[types.LOADING_DECREMENT](state) {
		state.loadingCount--;

	},
	//全局提示
	[types.TIPS_UPDATE](state, type, text) {
		state.tips = {'type': type, 'text': text};
	},
	//左侧导航重置高亮态
	[types.RESET_PREV_ASIDE_LINKS](state, key){
		state.asideLinkMap[key].forEach(link=>link.active=false);
	},
	//左侧导航折叠
	[types.TOGGLE_SIDEBAR]: toggleSidebar,
	// 左侧导航链接
	[types.GET_ASIDE_LINKS](state, path){
		let key = path.replace(/^(\/\w+).*/, '$1');

		let hasLinks = state.asideLinks.length > 0;
		state.asideLinks = state.asideLinkMap[key];
		let newHasLinks = state.asideLinks.length > 0;
		
		if (hasLinks != newHasLinks || !state.route.path) {//首次打开 route.path = ''
			toggleSidebar(state, newHasLinks);
		}
	}
};

