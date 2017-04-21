/*const koa = require('koa');
const app = new koa();

app.use(function *() {
	this.body = 'Hello World';
});

app.listen(9000);*/

var koa = require('koa');
var app = new koa();

/*app.use(function* responseTime(next) {
	var start = new Date;
	yield next;
	var ms = new Date - start;
	this.set('X-Response-Time', ms + 'ms');
});

app.use(function* logger(next) {
	var start = new Date;
	yield next;

	var used = new Date - start;
	console.log('%s %s %s %sms', this.method, this.originalUrl, this.status, used);
});

app.use(function* contentLength(next) {
	yield next;
	if(!this.body) return;
	this.set('Content-Length', this.body.length);
});

app.use(function* body(next) {
	yield next;
	if(this.path != '/') return;
	this.body = 'Hello Koa!';
});*/

app.use(async function (ctx, next) {
  console.log('>> one');
  await next();
  console.log('<< one');
});

app.use(async function (ctx, next) {
  console.log('>> two');
  ctx.body = 'two';
  await next();
  console.log('<< two');
});

app.use(async function (ctx, next) {
  console.log('>> three');
  await next();
  console.log('<< three');
});

/*const fs = require('fs-promise');

app.use(async (ctx, next) => {
	const paths = await fs.readdir('../tms/doc');
	const files = await Promise.all(paths.map(path => fs.readFile(`../tms/doc/${path}`, 'utf8')));
	ctx.body = files.join('');
});*/



app.listen(9000);