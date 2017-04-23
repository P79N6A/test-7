const config = require('./index');

const dbConfig = {
    host: 'localhost',
    port: 27017,
    user: '',
    pass: '',
    db: 'tms',
    max: 100,
    min: 1,
    timeout: 30000,
    log: false,
    dev: {

    },
    product: {

    }
};

function updateDbConfig () {
    const env = config.isDev ? 'dev' : 'product';
    Object.assign(dbConfig, dbConfig[env]);
}

function mongoOpts () {
    const opts = Object.assign({}, dbConfig);
    delete opts.dev;
    delete opts.product;
    return opts;
}

updateDbConfig();

module.exports = mongoOpts();
