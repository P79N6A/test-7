const _ = require('lodash');

function logfactory(type) {

    function log(...args) {
        if (_.isString(args[0])) {
            args[0] = `[${type}]: ${args[0]}`;
        } else {
            args = [`[${type}]: `, ...args];
        }
        return console[type].apply(console, args);
    }

    return log;
}

// 以dash line 的格式，输出信息
function lineLog(...args) {
    const len = args.reduce((result, item) => {
        return result + (_.isObject(item) ? 0 : String(item).toString().length);
    }, 0);

    const line = Array(len + 1).join('-');
    
    console.log(`\n${line}`);
    console.log(...args);
    console.log(`${line}\n`);
}

const logFnNames = ['log', 'warn', 'error', 'info'];
const logFns = _.zipObject(logFnNames, logFnNames.map(logfactory));

module.exports = Object.assign({}, logFns, {lineLog});