export function lastCrumb(state) {
	return state.breadCrumbs[state.breadCrumbs.length -1];
}

export function crumbs(state) {
	return state.breadCrumbs;
}

export function asideLinks (state){
	return state.asideLinkMap['/'+ state.route.path.slice(1).split('/').shift()];
}