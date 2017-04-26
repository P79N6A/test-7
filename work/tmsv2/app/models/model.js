const WS = require('../helper');

/**
 * 基类 Model
 */
class Model {
    constructor(col, pk = 'id') {
        this.col = col; // collection name, eg: TmsPages
        this.pk = pk; // primary key , eg: page_id
    }

    init(ctx) {
        this.collection = ctx.mongo.collection(this.col);
        return this;
    }

    async count() {
        const count = await this.collection.count();
        return count;
    }

    newId() {
        const ts = 'TMS' + Date.now();
        return WS.md5(ts);
    }

    async find(cond = {}, project = {}) {
        const docs = await this.collection.find(cond, project).toArray();
        return docs;
    }

    async findOne(cond = {}, project = {}) {
        const doc = await this.collection.findOne(cond, project);
        return doc;
    }

    async findById(id, project = {}) {
        const cond = {}
        cond[this.pk] = id;

        const doc = await this.findOne(cond, project);
        return doc;
    }

    async insert(data) {
        const count = await this.count();
        data = data instanceof Array ? data : [data];

        data.forEach((item, i) => {// page_id: 'P001'
            item[this.pk] = this.newId();
        });

        const result = await this.collection.insertMany(data);
        return result;
    }

    async update(cond, data) {
        const result = await this.collection.updateMany(cond, data);
        return result;
    }

    async updateOne(cond, data) {
        const result = await this.collection.updateOne(cond, data);
        return result;
    }

    async updateById(id, data) {
        const cond = {};
        cond[this.pk] = id;

        const result = await this.updateOne(cond, data);
        return result;
    }

    async replace(cond, data) {
        const result = await this.collection.replaceMany(cond, data);
        return result;
    }

    async replaceOne(cond, data) {
        const result = await this.collection.replaceOne(cond, data);
        return result;
    }

    async replaceById(id, data) {
        const cond = {};
        cond[this.pk] = id;

        const result = await this.replaceOne(cond, data);
        return result;
    }

    async remove(cond) {
        const result = await this.collection.removeMany(cond);
        return result;
    }

    async removeOne(cond) {
        const result = await this.collection.removeOne(cond);
        return result;
    }

}

module.exports = Model;