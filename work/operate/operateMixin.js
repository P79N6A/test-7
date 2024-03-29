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
    },
    appTypeText(i) {
      var types = ['', '用户', 'BA'];
      return types[i];
    },
    statusBtnText(i) {
        const btnTextes = ['激活', '取消激活'];
        return btnTextes[i] || '';
    }
  }
};