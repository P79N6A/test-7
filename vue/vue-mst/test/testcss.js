var css;
css = require('css-loader?minimize&root=img!less-loader!./example.mcss');

console.info('[css]:', css);

for(var i = 0; i< css.length; i++){
	if(Array.isArray(css[i])){
		console.info(css[i][1]);
	}
}


require('style-loader?insertAt=top!css-loader?root=img!less-loader!./example.mcss'); //css直接嵌入html
// require('style/url!file!css-loader?root=img!less-loader!./example.mcss'); //link css

var jpg  = require('url?limit=80&name=[path][name].[ext]&context='+__dirname+'!img/4.jpg');
console.info('[mm]', jpg);


// html-loader
// ---------------------------
// var html = require('vue-html?root=img&interpolate!./example.mhtml');
var html = require('vue-html?root=~&interpolate!./example.mhtml'); //  /img/avatar.jpg  -> require(img/avatar.jpg)
console.info('[html]:', html);


// es6 default value, destruct , spread/rest
// -----------------
function hello(name='sindy'){
	console.info(`[es6]: hello ${name}!`);
}

hello();

function sum(arr){
	let [a,b] = arr;
	console.info('[es6]:', a+b);
	return a+b;
}

sum([100,33]);

function add(...args){
	console.info('[es6]:', args);
}

add('foo','bar');

export default css;