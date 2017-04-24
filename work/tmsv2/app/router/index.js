const Router = require('koa-router');
const upload = require('../middlewares/multer');
const WS = require('../helper');
const config = require('../config');

const router = new Router();

router.get('/', async(ctx, next) => {
    ctx.type = 'html';
    ctx.body = '<h1>Welcome to TMS2.0</h1>';
});

router.get('/home', async(ctx, next) => {
    const data = await ctx.mongo.collection('TmsPages').findOne();
    delete data._id;
    await ctx.render('home', {type: 'test-type', engine: 'jade', data: JSON.stringify(data)});
});

router.get('/save/test', async(ctx, next) => {
    const data = await ctx.mongo.collection('TmsPages').findOne();
    delete data._id;
    const page_id = data.page_id;
    
    const n = Math.floor(1000 * Math.random());
    data.count = n;

    const res = await ctx.mongo.collection('TmsPages').replaceOne({page_id}, data);
    ctx.body = res.result;
});

// query
router.get('/pages/list', async(ctx, next) => {
    data = {list: [{p1: 'page1'}, {p2: 'page2'}]};
    ctx.body = WS.resJson(true, data);
});

// find one
router.get('/pages/find', async(ctx, next) => {
    const pageId = ctx.query.id;
    WS.assert.notEqual(pageId, null, '参数缺少id');
    
    // data = await ctx.mongo.db('tms').collection('TmsPages').findOne();
    data = await ctx.mongo.collection('TmsPages').findOne();
    ctx.body = WS.resJson(true, data);
});

// create
router.post('/pages/create', async(ctx, next) => {
    data = ctx.request.body || {};
    // insert to db
    ctx.body = WS.resJson(true, {result: 'save ok', id: 22});
});

// update: update some fields of doc
router.post('/pages/update', async(ctx, next) => {
    // const pageId = ctx.query.id;
    const pageId = 'P101';
    // ctx.mongo.db
});


// save: replace the doc
router.post('/pages/save', async(ctx, next) => {
    const id = ctx.query.id;
    WS.assert.notEqual(id, null, '参数缺少id');
    const pageId = 'P101';
    const res = await ctx.mongo.collection('TmsPages').replaceOne({page_id: pageId}, ctx.request.body);
    ctx.body = res.result;
});

// upload
router.post('/upload', upload.single('upfile'), async(ctx, next) => {
    // WS.log('req.body', ctx.req.body);
    // WS.log('req.file:', ctx.req.file);

    ctx.body = {
        code: 1,
        status: 'success',
        data: {
            url: WS.path2url(ctx.req.file.path, ctx)
        }
    };
});

module.exports = router;