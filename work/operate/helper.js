// 运营位页面的公共方法

import Vue from 'vue';

export const bus = new Vue();

export function successHandler(callback, tips) {
  return function(res) {
    var result = res.data;
    var data = result.data.data;
    if (result.code - 0 === 10000) {
      callback(data, result);
      tips && Vue.prototype.$message.success(tips === true ? result.msg : tips);
    } else {
      Vue.prototype.$message.error('请求失败:' + result.msg);
    }
  };
};

export function eachKey(obj, fn) {
  Object.keys(obj).forEach(key => {
    fn(obj[key], key, obj);
  });
}

export function queryStringify(obj) {
  var pairs = [];
  eachKey(obj, (val, key) => {
    if (typeof val === 'object') {// obj or array
      pairs.push(`${key}=${JSON.stringify(val)}`);
    } else {// string or number
      pairs.push(`${key}=${val}`);
    }
  });
  return encodeURI(pairs.join('&'));
}


export function getApi(url) {
  return url;
}


export function loadTableFn(url) {
  return function(curPage) {
    curPage && (this.currentPage = curPage);
    var data = Object.assign({}, this.pagingData || {}, this.search || {});
    this.axios.post(getApi(url), queryStringify(data)).then(successHandler((data, res) => {
      this.tableData = data;
      this.total = res.data.total_count - 0;
    }));
  }
}