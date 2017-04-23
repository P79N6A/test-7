const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const path = require('path');


const root = path.join(__dirname, '../app/views');
console.log('-->root:', root);
app.use(views(root, {
    extension: 'foo',
    map: {
        foo: 'lodash'
    }
    //engineSource: {
    //    foo: function(a,b,c) {
    //        console.log('args->', a,b,c);
    //        return Promise.resolve('hellwe');
    //    }
    //}
}));

app.use(async (ctx, next) => {
    if(ctx.path === '/users') {
        await ctx.render('users');
    }else {
        ctx.body = 'normal con..';
    }
});

app.listen(3000);

console.log('sd at 3000');