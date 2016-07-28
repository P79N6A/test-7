export function lastCrumb(state) {
	return state.breadCrumbs[state.breadCrumbs.length -1];
}

export function crumbs(state) {
	return state.breadCrumbs;
}
/*
export function asideLinks (state){//路由改变，重新执行该getter, 更新左侧导航
	
	return state.asideLinkMap['/'+ state.route.path.slice(1).split('/').shift()];
}*/