const WS = require('../helper');

function listen() {
    return async function(ctx, next) {
        try {
            await next();
        } catch (err) {
            WS.error('app caught error,  err = %o', err);
            ctx.body = WS.resJson(false, {reason: err.message || 'none', type: err.constructor.name});
        }
    }
}

module.exports = listen;