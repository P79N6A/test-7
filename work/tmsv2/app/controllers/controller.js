/**
 * 基类 Controller
 */
const path = require('path');
const WS = require('../helper');
const config = require('../config');


class Controller {
    constructor(mod) {
        this.mod = mod;
        this.init(mod);
    }

    init(mod) {
        const modPath = path.join(__dirname, `../models/${mod}`);
        try {
            this.model = require(modPath);
        } catch (err) {
            WS.error(`获取模块(${modPath})错误: %o`, err);
        }
    }

    async query(ctx, next) { // more
        const data = await this.model.init(ctx).find();
        this.afterFetch(data);
        
        ctx.body = WS.resJson(true, data);
    }

    async getById(ctx, next) { // one, get by id
        const id = ctx.query.id;
        WS.assert.notEqual(id, null, '缺少必要参数:id');

        const data = await this.model.init(ctx).findById(id);
        this.afterFetch(data);

        ctx.body = WS.resJson(true, data);
    }

    async get(ctx, next) { // one
        const cond = ctx.query;
        const data = await this.model.init(ctx).findOne(cond);

        this.afterFetch(data);

        ctx.body = WS.resJson(data);
    }

    beforeSave(data, cond) { // 更新或添加前数据处理
        delete data._id; // 删除主键
        return data;
    }

    afterFetch(data) {// 查询数据后，返回给接口前处理
        delete data._id; 
        return data;
    }

    async create(ctx, next) {
        let data = ctx.request.body || {};
        WS.assert.notEqual(Object.keys(data).length, 0, '数据不能为空');

        data = this.beforeSave(data);
        const result = await this.model.init(ctx).insert(data);
        ctx.body = WS.resJson(true, result);
    }

    async update(ctx, next) {
        const cond = ctx.query;
        let data = ctx.request.body;

        data = this.beforeSave(data, cond);
        const result = await this.model.init(ctx).update(cond, data);
        ctx.body = WS.resJson(true, result);
    }

    async replaceById(ctx, next) {
        const id = ctx.query.id;
        WS.assert.notEqual(id, null, '缺少必要参数:id');
        let data = ctx.request.body;

        data = this.beforeSave(data);
        const result = await this.model.init(ctx).replaceById(id, data);
        ctx.body = WS.resJson(true, result);
    }

}

module.exports = Controller;