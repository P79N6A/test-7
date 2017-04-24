const send = require('koa-send');
const path = require('path');

function favicon() {
    return async function(ctx, next) {
        if (ctx.path.match(/^\/favicon/)) {
            await send(ctx, ctx.path, {
                root: path.join(__dirname, '../../')
            });
        } else {
            await next();
        }

    }
}

module.exports = favicon;