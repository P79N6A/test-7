'use strict';

var multer = require('koa-multer');
var path = require('path');
var WS = require('../helper');
var config = require('../config');

var storage = multer.diskStorage({
    destination: function destination(req, file, cb) {
        cb(null, config.uploadDir);
    },
    filename: function filename(req, file, cb) {
        var ext = path.extname(file.originalname);
        var fname = file.originalname.replace(new RegExp('\\' + ext + '$', 'i'), '');
        // WS.info('--------> in filename fn..', fname + '_' + Date.now() + ext);
        cb(null, fname + '_' + Date.now() + ext);
    }
});
var upload = multer({
    storage: storage,
    fileFilter: function fileFilter(req, file, cb) {
        if (file.mimetype.match(/^image\/*/)) {
            // image
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