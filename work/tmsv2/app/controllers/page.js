const path = require('path');
const fs = require('fs');
const WS = require('../helper');
const config = require('../config');

const Controller = require('./controller');


class PageCtrl extends Controller {
    constructor(...args) {
        super(...args);
    }

    async publish(ctx, next) { // 发布
        
        const id = ctx.query.id;
        WS.assert.notEqual(id, null, '缺少必要参数:id');


        const data = await this.model.init(ctx).findById(id);
        WS.assert.notEqual(data, null, `没有数据id=${id}`);

        const fileName = (data.page_name || 'unknown') + '.json';
        const fpath = path.join(config.publishedPath, fileName);

        const handleData = data => {
            delete data._id;
            delete data.publish;

            // data = { layout_main: [{dist: {}}, ..]} -> data = { layout_main: [ dist, ..]}
            if (data.layout_main) {
                data.layout_main = data.layout_main.map(layout => {
                    return layout.dist || layout
                });
            }

            return data;
        };

        const dumpJson = async() => {

            const err = fs.writeFileSync(fpath, JSON.stringify(data, null, 4), 'utf8');
            if (err) {
                WS.error(' write file error :', err);
            } else {
                // 标记发布成功  {$set: {publish: {ok: true}}}
                const result = await this.model.init(ctx).updateById(id, {$set: {publish: {ok: true } } });
                ctx.body = WS.resJson(true, {id, result});
            }

        }

        handleData(data);

        const done = await WS.ensurePath(fpath, dumpJson);
        if (done) {
            await dumpJson();
        } else {
            ctx.body = WS.resJson(false, {reason: '创建路径的文件夹失败..'});
            
        }
        
    }
}

module.exports = new PageCtrl('page');