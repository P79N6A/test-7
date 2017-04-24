const fs = require('fs');
const path = require('path');

const WS = require('./helper');
const config = require('./config');

const serve = require('koa-static');
const logger = require('koa-logger');
const cors = require('kcors');
const cookie = require('koa-cookie').default;
const session = require('koa-session');
const views = require('koa-views');
const bodyparser = require('./middlewares/bodyparser');
const mongo = require('./middlewares/mongo');
const errorListen = require('./middlewares/errorListen');
const favicon = require('./middlewares/favicon');

const Koa = require('koa');
const app = new Koa();
const router = require('./router');


// signed cookie keys
app.keys = ['this is a secret key', 'hello world'];

//-- third part middlewares
app.use(serve(config.staticDir)); //静态文件 
app.use(logger());
app.use(bodyparser());
app.use(cors({
    credentials: true,
    keepHeadersOnError: true
}));
app.use(cookie());
app.use(session(app));
app.use(views(path.join(__dirname, 'views'), {
    extension: 'jade'
}));
app.use(mongo());

//-- custom middlewares
app.use(errorListen());
app.use(favicon());

// routes
app.use(router.routes()).use(router.allowedMethods());

// 404
app.use(async(ctx, next) => {
    await next();
    ctx.throw(404);
});

function listen() {

    app.listen(config.port);
    WS.lineLog('Server is listening on port: %s', config.port);

}

exports.run = listen;