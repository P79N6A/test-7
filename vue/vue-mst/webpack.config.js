var path              = require('path');
var webpack           = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var env               = require('./config/env');
var currentEnv        = env.active;
var envConf           = env[currentEnv];
var version           = require('./package.json').version;


var banner = '/*!\n'+
              '* Vmst version ' + version + ' build at ' + (new Date).toString() + '\n' +
              '*/';

var webpackConf = {
	entry: {
		app: './src/main'
	},
	output: {
		path         : __dirname + '/dist',
		filename     : 'js/[name].js?v=[hash:5]',
		chunkFilename: 'js/[id].chunk.js?v=[hash:5]'
		/*,publicPath   : './'*/
	},
	resolve: {
		extensions: ['', '.vue', '.js', '.es', '.json','.scss','.less','.css'],
		alias: {
			'services'  : __dirname + '/src/services',
			'extends'   : __dirname + '/src/extends',
			'css'       : __dirname + '/src/assets/css',
			'img'       : __dirname + '/src/assets/images',
			'components': __dirname + '/src/components',
			'views'     : __dirname + '/src/views',
			'appVuex'   : __dirname + '/src/vuex',
			'test'      : __dirname + '/test',
			'config'    : __dirname + '/config',
			'vcom'      : __dirname + '/vcui',
			'vtui'      : __dirname + '/src/vtui'
		}
	},
	module: {
		loaders: [{
			test   : /\.json$/,
			loader : 'json'
		}, {
			test   : /\.(css|less)$/,
			exclude: /bootstrap\.css/,
			loader : ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
		},{
			test   : /\.tcss$/,
			loader : "css"
		}, {
			test   : /\.(es|js)$/,
			exclude: /node_modules/,
			loader : "babel"
		}, {
			test   : /\.js$/,
			include: /vuex/, //logger.js devtool.js 用的es6
			loader : "babel"
		}, {
			test   : /\.vue$/,
			loader : "vue"
		}, {
			test   : /\.(png|jpg|gif)($|\?.*)/,
			loader : "url?limit=8192&name=images/[name].[ext]?v=[hash:5]" //小于8k 转换为dataURL
		}, {
			test   : /\.(eot|woff2?|ttf|svg)/,
			loader : "url?limit=200&name=fonts/[name].[ext]"
		}]
	},
	plugins: [
		new webpack.BannerPlugin(banner, {
			raw: true, 
			entryOnly: true
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: process.env.NODE_ENV == 'production' ? '"production"' : '"develop"'
			}
		}),
		new HtmlWebpackPlugin({
			template     : 'index.ejs',
			title        : 'Vmst',
			env          : process.env.NODE_ENV == 'production' ? 'product' : 'dev' //把当前'环境'变量传入模板
		}),
		/*new webpack.optimize.CommonsChunkPlugin({
			names        : ['app'],
			children     : true,
			minChunks    : 3
		}),
		new webpack.optimize.AggressiveMergingPlugin({
			minSizeReduce: 1.5,
			movetoParents: true
		}),*/
		new webpack.ProvidePlugin({
			$  :'jquery',
			Vue:'vue',
			VIP: 'services/public'
		}),
		new ExtractTextPlugin('css/public.css', {
				allChunks: true
			}
		)
	],
	vue: {
		/*loaders: {
			html: 'vue-html?root=~'
		}*/
	},
	babel: {
		presets : ['es2015', 'stage-2'],
		plugins : ['transform-runtime'],
		comments: false
	},
	externals: [
		{'vue'       : 'Vue'},
		{'vue-router': 'VueRouter'},
		{'jquery'    : 'jQuery'},
		{'vue-strap' : 'VueStrap'},
		{'mockjs'    :'Mock'}
	]
};


if (currentEnv === 'dev') {
	webpackConf.devtool = '#source-map';
}

if (process.env.NODE_ENV === 'production') {
	delete webpackConf.externals;

	//压缩js
	/*webpackConf.plugins.push(new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	}));*/
}

module.exports = webpackConf;