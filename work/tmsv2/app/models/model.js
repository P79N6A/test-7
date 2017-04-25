// 基类 Model

class Model {
    constructor(ctx, col, pk = 'id') {
        this.col = col;
        this.pk = pk;
        this.init(ctx);
    }

    async init(ctx) {
        this.collection = await ctx.mongo.collection(this.col);
    }

    async total(condtion = {}) {
        const total = await this.collection.count(condition);
        return total;
    }

    query() {
        
    }

    save() {

    }
    

    update() {

    }
    updateOne() {

    }

    create() {

    }

    get() {

    }

    getOne() {

    }

}