import * as types from "../mutation-types";

export default {
	updateTips({dispatch}, type, text){
		dispatch(types.TIPS_UPDATE, type, text);
	},
	addLoading({dispatch}, inc){
		dispatch(inc ? types.LOADING_INCREMENT : types.LOADING_DECREMENT);
	},
	
	setBreadCrumbs({dispatch}, link){
		dispatch(types.BREADCRUMBS_SET, link);
	}
};