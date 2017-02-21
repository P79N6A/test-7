import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index';
import App from './App';


/*
 安装 babel-plugin-component 后，可以只引入部分组件
 import {Button, Select} from 'element-ui';
 Vue.compoent(Button.name, Button);
 Vue.component(Select.name, Select);

 // or

 Vue.use(Button);
 Vue.use(Select);
 
 */


Vue.use(ElementUI);

new Vue({
    el: '#app',
    render: h => h(App)
});

