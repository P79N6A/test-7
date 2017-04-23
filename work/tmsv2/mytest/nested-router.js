const Koa = require('koa');
const app = new Koa();

const Router = require('koa-router');

var forums = new Router();
var posts = new Router();

posts.get('/', function (ctx, next) {
    ctx.body ='list page';
});
posts.get('/:pid', function (ctx, next) {
    ctx.body = 'detail page';
});

forums.use('/forums/:fid/posts', posts.routes(), posts.allowedMethods());

// responds to "/forums/123/posts" and "/forums/123/posts/123"
app.use(forums.routes());


app.listen(3000);
console.log('run at 3000');