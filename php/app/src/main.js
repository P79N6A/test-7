/* eslint-disable */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

import axios from 'axios';


const headers = {
    // 'Access-Control-Allow-Origin': 'http://localhost:8080',
    // 'Access-Control-Allow-Method': 'POST'
};

function test () {
    axios
    .post('http://localhost/testphp/cors.php', {foo: 'foolisth', age: 20}, {headers})
    .then(res => {
        console.log(res);
    }).catch(e => {
        console.log('e--->', e);
    });
}

test();


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
