function linkStylesheets(urls) {
    function appendLink(url) {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url;

        document.head.appendChild(link);
    }

    urls = urls instanceof Array ? urls : [urls];
    urls.forEach(appendLink);
}


function appMount(options) {
    options = options || {};

    window.vm = new Vue(options);
    window.vm.$mount('#app');
}



function loadSolutionA() {
    // 因为 element-ui 不支持 seajs的 cmd 模块定义，所以..
    define('/libs', ['vue'], function (require, exports) {
        require.async('element', function () {
            appMount(window.options||{});
        });
        return {
            libs: true
        };
    });

    define('main', ['/libs'], function (require, exports) {
        var libs = require('/libs');
    });
    seajs.use('main');

}


var styleUrls = ['//cdn.bootcss.com/element-ui/1.1.6/theme-default/index.css', 'demos.css'];
linkStylesheets(styleUrls);

seajs.config({
    alias: {
        vue: '//cdn.bootcss.com/vue/2.1.10/vue',
        element: '//cdn.bootcss.com/element-ui/1.1.6/index'
    }
});

loadSolutionA(); // ok

