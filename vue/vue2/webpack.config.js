var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './main.js',
    output: {
        path: '.',
        filename: 'main.bundle.js'
    },
    resolve: {
        extensions: ['', '.vue', '.js', '.html'],
        alias: {
            vue$: 'vue/dist/vue.common.js'
        }
    },
    module: {
        loaders: [
            {
                test: /\.(es|js)$/,
                loader: 'babel'
            }
        ]
    }
};