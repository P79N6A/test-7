var path = require('path');
var webpack           = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var env        = require('./config/env');
var currentEnv = env.active;
var envConf    = env[currentEnv];


var webpackConf = {
	entry: {
		app: './src/main'
	},
	output: {
		path         : __dirname + '/dist',
		filename     : '[name].js',
		chunkFilename: '[id].chunk.js'
		/*,publicPath   : './'*/
	},
	resolveLoader:{
		root: [
			path.resolve('D:\\mydev\\trunk\\js\\vue\\vue-demo\\node_modules'),
			path.resolve('D:\\mydev\\trunk\\node_modules')
		]
	},
	resolve: {
		root: [
			path.resolve('D:\\mydev\\trunk\\js\\vue\\vue-demo\\node_modules'),
			path.resolve('D:\\mydev\\trunk\\node_modules')
		],
		extensions: ['', '.vue', '.js', '.es', '.json','.scss','.less','.css'],
		alias: {
			'services'  : __dirname + '/src/services',
			'extends'   : __dirname + '/src/extends',
			'css'       : __dirname + '/src/assets/css',
			'components': __dirname + '/src/components',
			'views'     : __dirname + '/src/views',
			'appVuex'   : __dirname + '/src/vuex',
			'config'    : __dirname + '/config'
		}
	},
	module: {
		loaders: [{
			test   : /\.json$/,
			loader : 'json'
		}, {
			test   : /\.css$/,
			loader : 'style!css!less'
		}, {
			test   : /\.es$/,
			exclude: /node_modules/,
			loader : "babel"
		}, {
			test   : /\.js$/,
			include: /vuex/, //logger.js devtool.js 用的es6
			loader : "babel"
		}, {
			test   : /\.less$/,
			loader : "style!css!less",
		}, {
			test   : /\.vue$/,
			loader : "babel!vue"
		}, {
			test   : /\.(png|jpg|gif)$/,
			loader : "url?limit=8192" //小于8k 转换为dataURL
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template     : 'index.html',
			title        : 'Vue-MST',
			env          : currentEnv //把当前'环境'变量传入模板
		}),
		new webpack.optimize.CommonsChunkPlugin({
			names        : ['app'],
			children     : true,
			minChunks    : 3
		}),
		new webpack.optimize.AggressiveMergingPlugin({
			minSizeReduce: 1.5,
			movetoParents: true
		})
	],
	babel: {
		presets: ['es2015'],
		plugins: ['transform-runtime']
	},
	externals: [{'vue': 'Vue'}, {'vue-router': 'VueRouter'}, {'jquery': 'jQuery'}, {'vue-strap': 'VueStrap'},{'mockjs':'Mock'}]
};


if (currentEnv === 'dev') {
	//webpackConf.devtool = '#source-map';
}

module.exports = webpackConf;