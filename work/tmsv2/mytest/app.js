const compose = require('koa-compose');

const Koa = require('koa');
const app = new Koa();

/*app.use(async function firstmw(ctx, next) {
    await next();
    ctx.body = 'Hello World';
});

app.use(async function lastmw(ctx, next) {
    await next();
    console.log('last wwwsays..')
});
*/

//-- test koa-compose
const mw1 = async function(ctx, next) {
    try {
        await next();
    } catch(err) {
        console.error('got error in mw1 ---------------->', err.message);
        // console.error('got error in mw1 ----------------> err =>', err);
    }

    ctx.body = 'compose is ok';
};

const mw2 = async function(ctx, next) {
    await next();
    /*try {
        await next();
    }catch(err) {
        console.error('caught err in mw2: ', err);
    }*/
    console.log('last mw here.. is ok');
};

const mw3 = async function(ctx, next) {
    console.log('---------------------->start\n\n');
    console.warn('==> app.context:', (app.context.isPrototypeOf(ctx)));
    console.log('====> app:', Object.keys(app));
    console.log('---------------------->end\n\n');

    console.log('before throw');
    throw new Error('test err catch..');
    console.log('after throw');

}

const allmw = compose([mw1, mw2, mw3]);

app.on('error', (err) => {
    console.log('got err on listener.., ', err);
})

app.use(allmw);


// settings
console.log('\n\n')
console.log('app.env = %s', app.env);
console.log('app.subdomainOffset = %s', app.submoduleOffset);
console.log('app.proxy = %s', app.proxy);
console.log('\n\n')

app.listen(3000);
console.log('server running at port 3000');
