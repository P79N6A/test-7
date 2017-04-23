const WS = require('../helper');
const Router = require('koa-router');

const router = new Router();
const adminRouter = new Router({
    prefix: '/admin'
});

router.get('/food', async (ctx, next) => {
    ctx.body = ctx.url;
});

router.get('/fruit/:name', async (ctx, next) => {
    WS.log('--->', ctx.params);
    ctx.body =  `${ctx.params.name} so cool ..` + ctx.url;
});

// named route
router.get('user', '/user/:id', async (ctx, next) => {
    ctx.body = `user "${ctx.params.id}" home page`;
});
router.url('user', 3);
WS.log('-------------->before');
WS.log(router.url('user', 3));

// multiple middleware
router.get('/books/:name', async (ctx, next) => {
    const book = await new Promise(resolve => {
        setTimeout(() => {
            const bname = ctx.params.name || 'cities';
            ctx.state.book = bname;
            resolve(bname);
        }, 10);
    });
    next();

    WS.info('really got the book:', book);
}, async (ctx, next) => {
    ctx.body = 'multi mws test: ' + ctx.state.book;
});

// nested middlewares
/*const posts = new Router();
const forums = new Router();
posts.get('/', async (ctx, next) => {
    WS.log('in post list');
    ctx.body = 'posts list page';
});
posts.get('/:pid', async (ctx, next) => {
    WS.log('in post detail');
    ctx.body = `post # ${ctx.params.pid} detail page`;
});
forums.use('/forums/:fid/posts', posts.routes(), posts.allowedMethods());*/
// module.exports = forums;

adminRouter.get('/', async ctx => ctx.body = 'admin home');
adminRouter.get('/users', async ctx => ctx.body = 'admin users home');
router.use('blog', adminRouter.routes()); // /blog/admin  /blog/admin/users
router.use('', adminRouter.routes()); // /admin  /admin/users

module.exports = router;