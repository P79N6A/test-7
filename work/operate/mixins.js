// 运营位内容页公共的方法和Vue资源

export default {
  filters: {
    typeText(i) {
      var types = ['', '图片', '商品', '专题'];
      return types[i] || '';
    },
    statusText(i) {
      var statuses = ['未激活', '激活'];
      return statuses[i] || '';
    }
  }
};