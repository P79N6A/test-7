var webpack = require('webpack');
var version = require('./package.json').version;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


var banner = '/*!\n' + 
			  '* Wui version ' + version + '\n' +
			  '* by Idle \n' +
			  '*/';

module.exports = {
	entry: __dirname + '/src/main.js',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js',
		library: 'vtui',
		libraryTarget: 'umd'
	},
	resolve: {
		extensions: ['', '.js', '.vue', '.es', '.json', '.scss', '.less', '.css'],
		alias: {
			utils: __dirname + '/src/utils',
			css: __dirname + '/src/assets/css',
			images: __dirname + '/src/assets/images',
			components: __dirname + '/src/components'
		}
	},
	module: {
		loaders: [{
			test: /\.json$/,
			loader: 'json'
		}, {
			test: /\.(css|less)$/,
			loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
		}, {
			test: /\.tcss$/,
			loader: "css"
		}, {
			test: /\.(es|js)$/,
			exclude: /node_modules/,
			loader: "babel"
		}, {
			test: /\.js$/,
			include: /vuex/, //logger.js devtool.js 用的es6
			loader: "babel"
		}, {
			test: /\.vue$/,
			loader: "vue"
		}, {
			test: /\.(png|jpg|gif)$/,
			loader: "url?limit=3000&name=./images/[name]-[hash:3].[ext]" //小于8k 转换为dataURL
		}]
	},
	plugins: [
		new ExtractTextPlugin('bundle.css', {
			allChunks: true
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.BannerPlugin(banner, {
			raw: true,
			entryOnly: true
		})
	],
	babel: {
		presets: ['es2015', 'stage-2'],
		plugins: ['transform-runtime'],
		comments: false
	},
	vue: {
		/*html:{
			root: '~'
		},
		css: {
			singleton: true //don't work
		}*/
		loaders: {
			html: 'vue-html-loader?root=~',
			css: ExtractTextPlugin.extract('css'),
			less: ExtractTextPlugin.extract('css!less')
		}
	},
	devtool: '#source-map'
};