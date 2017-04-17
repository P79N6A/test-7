// 运营位页面的公共方法

import Vue from 'vue';

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
    pairs.push(encodeURI(`${key}=${JSON.stringify(val).replace(/['"]/g, '')}`));
  });
  return pairs.join('&');
}
