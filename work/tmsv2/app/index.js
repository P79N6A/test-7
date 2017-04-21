const path = require('path');

const serve = require('koa-static');
const logger = require('koa-logger');

const Koa = require('koa');
const app = new Koa();


app.use(serve(path.join(__dirname, '../www/static'))); //静态文件
app.use(logger());

function main() {
	app.use(ctx => {
		ctx.set('content-type', 'text/html');
		ctx.body = 'Hello Koa <img src="/images/1.jpg" />';
	});

	app.listen(3000);
	console.log('Server is listening on port: %s', 3000);
}

exports.run = main;