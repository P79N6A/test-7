const Model = require('./model');

class PageModel extends Model {
    constructor(...args) {
        super(...args);
    }
}

module.exports = new PageModel('TmsPages', 'page_id');