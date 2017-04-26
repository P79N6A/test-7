const Router = require('koa-router');
const upload = require('../middlewares/multer');
const WS = require('../helper');
const config = require('../config');

const pageCtrl = require('../controllers/page');

const router = new Router();

router.get('/', async(ctx, next) => {
    ctx.type = 'html';
    ctx.body = '<h1>Welcome to TMS2.0</h1>';
});

router.get('/my/savedata', async(ctx, next) => {
    const id = ctx.query.id || '';
    const cond = id ? {page_id: id} : {};
    const data = await ctx.mongo.collection('TmsPages').findOne(cond);
    delete data._id;
    await ctx.render('savedata', {engine: 'jade', data: JSON.stringify(data), id});
});

router.get('/save/test', async(ctx, next) => {
    const data = await ctx.mongo.collection('TmsPages').findOne();
    const page_id = data.page_id;
    delete data._id;
    
    const n = Math.floor(1000 * Math.random());
    data.count = n;

    const res = await ctx.mongo.collection('TmsPages').replaceOne({page_id}, data);
    ctx.body = res.result;
});

//-- pages


router.get('/pages/query', pageCtrl.query.bind(pageCtrl));

router.get('/pages/get', pageCtrl.getById.bind(pageCtrl));

router.post('/pages/create', pageCtrl.create.bind(pageCtrl));

router.post('/pages/update', pageCtrl.replaceById.bind(pageCtrl));

router.get('/pages/publish', pageCtrl.publish.bind(pageCtrl));




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