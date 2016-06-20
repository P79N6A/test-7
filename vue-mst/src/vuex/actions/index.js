import * as types from "../mutation-types";

export function updateTips({ dispatch }, type, text) {
    dispatch(types.TIPS_UPDATE, type, text);
}

export function addLoading({ dispatch }, inc) {
    dispatch(inc ? types.LOADING_INCREMENT : types.LOADING_DECREMENT);
}

export function setBreadCrumbs({ dispatch }, link) {
    dispatch(types.BREADCRUMBS_SET, link);
}
