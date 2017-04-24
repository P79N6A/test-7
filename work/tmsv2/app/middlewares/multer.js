const multer = require('koa-multer');
const path = require('path');
const WS = require('../helper');
const config = require('../config');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, config.uploadDir);
    },
    filename(req, file, cb) {
        const ext = path.extname(file.originalname);
        const fname = file.originalname.replace(new RegExp(`\\${ext}$`, 'i'), '');
        // WS.info('--------> in filename fn..', fname + '_' + Date.now() + ext);
        cb(null, fname + '_' + Date.now() + ext);
    }
});
const upload = multer({
    storage,
    fileFilter(req, file, cb) {
        if (file.mimetype.match(/^image\/*/)) { // image
            cb(null, true);
        } else {
            WS.error('fail: upload file is not image..');
            cb(null, false);
        }
    },
    limits: {
        fileSize: 3 * 1024 * 1024 // 3M
    }
});

module.exports = upload;