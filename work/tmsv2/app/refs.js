const fs = require('fs');
const path = require('path');

const WS = require('./helper');
const config = require('./config');

const serve = require('koa-static');
const logger = require('koa-logger');
const cors = require('kcors');
const bodyparser = require('./middlewares/bodyparser');
const cookie = require('koa-cookie').default;
const send = require('koa-send');
const session = require('koa-session');
const views = require('koa-views');

const Koa = require('koa');
const app = new Koa();
const router = require('./router');

// signed cookie keys
app.keys = ['this is a secret key', 'hello world'];

//-- third part middlewares
app.use(serve(config.staticDir)); //静态文件 
app.use(logger());
app.use(bodyparser());
app.use(cors({ credentials: true, keepHeadersOnError: true }));
app.use(cookie());
app.use(session(app));
app.use(views(path.join(__dirname, 'views'), {
    extension: 'jade'
}));

//-- custom middlewares
// error handler
app.on('error', err => {
    console.log('xxx==> in error cb...');
    WS.error('err = %o', err);
});
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.app.emit('error', err);
    }
});

// favicon
app.use(async (ctx, next) => {
    WS.log(ctx.path, '<--');
    if (ctx.path.match(/^\/favicon/)) {
        await send(ctx, ctx.path, {root: path.join(__dirname, '..')});
    } else {
        await next();
    }
});

// send
app.use(async (ctx, next) => {
    WS.log('in target mw..');
    if (ctx.path === '/fa') {
        // ctx.type = 'html';
        await send(ctx, '/uploads/fa.jpg', {root: path.join(__dirname, '../www')});
    } else {
        await next();
    }
});

// session
app.use(async (ctx, next) => {
    if (ctx.path === '/visits') {
        let n = ctx.session.visits || 0;
        ctx.session.visits = ++n;
        ctx.body = ctx.session.visits;
    } else {
        await next();
    }
});

// views
app.use(async (ctx, next) => {
    if (ctx.path === '/users') {
        ctx.state = {
            type: 'finallytest',
            title: 'app'
        };
        ctx.state.engine = 'jade';
        await ctx.render('users');

    } else {
        await next();
    }
});

// routes
app.use(router.routes()).use(router.allowedMethods());


// cookies
app.use(async(ctx, next) => {
    ctx.cookies.set('user', 'winry', { signed: true });
    ctx.cookies.set('role', 'admin');
    await next();
});

app.use(async(ctx, next) => {
    // ctx.cookies 原生属性
    const user = ctx.cookies.get('user', { signed: true });
    const role = ctx.cookies.get('role');
    WS.log('user=%s role=%s', user, role);
    await next();
});

// get ctx.query
app.use(async(ctx, next) => {
    if (Object.keys(ctx.query).length) {
        ctx.body = JSON.stringify(ctx.query);
    }
    await next();
});


app.use(async(ctx, next) => {
    //- static
    // ctx.set('content-type', 'text/html');
    ctx.type = 'html';
    ctx.body = 'Hello Koa <img src="/assets/images/1.jpg" /> <img src="/fa" />';
    ctx.body += '<h3>test append content..</h3>';

    /*ctx.type = 'html';
    ctx.body = (ctx.body || '') + '<h1>good</h1><img src="/images/1.jpg" />';*/

    //-- cors ajax
    // ctx.body = {name: 'winry', job: 'machine'};

    await next();

    //-- try throw
    // ctx.throw(400);
    // throw('test some err.............');

    //-- post data
    // ctx.body = { code: 1, data: ctx.request.body }
});

function listen() {

    app.listen(config.port);
    console.log('\n-----------------------------------')
    console.log('Server is listening on port: %s', config.port);
    console.log('-----------------------------------\n')
}

exports.run = listen;
