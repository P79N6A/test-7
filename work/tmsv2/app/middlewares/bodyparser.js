const bodyParser = require('koa-bodyparser');

const parser = bodyParser({
    formLimit: '1mb',
    onerror: (err, ctx) => ctx.throw('body parse error', 422)
})

module.exports = () => parser.bind(null);