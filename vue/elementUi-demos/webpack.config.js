var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel'
            },
            {
                test: /\.css/,
                loader: 'style!css'
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)(?\S*)?$/,
                loader: 'file'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(?\S*)?$/
                loader: 'file',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.vue', '.css', '.es', '.html'],
        alias: {

        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    devTool: '#eval-source-map'
};


if (process.env.NODE_ENV === 'production') {
    module.devTool = '#source-map';

    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.definePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warning: false
            }
        })
    ]);

}