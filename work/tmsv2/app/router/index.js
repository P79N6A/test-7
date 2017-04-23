const Router = require('koa-router');
const upload = require('../middlewares/multer');
const WS = require('../helper');
const config = require('../config');

const router = new Router();

router.get('/fruit/:name', async (ctx, next) => {
    WS.log('--->', ctx.params);
    ctx.body =  `${ctx.params.name} so cool ..` + ctx.url;
});

// upload
router.post('/upload', upload.single('upfile'), async(ctx, next) => {
    // WS.log('req.body', ctx.req.body);
    // WS.log('req.file:', ctx.req.file);

    ctx.body = {code: 1, status: 'success', data: {url: WS.path2url(ctx.req.file.path, ctx)}};
});

module.exports = router;