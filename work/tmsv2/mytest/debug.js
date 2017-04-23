const debug = require('debug')('http');
const debug2 = require('debug')('foo');
const http = require('http');
const name = 'myapp';

debug('botting %s', name);
debug2('foo %d', 100);
http.createServer(function (req, res) {
    debug(req.method + ' ' + req.url);
    debug2('so cool...');
    res.end('hello world');
}).listen(3000);
console.log('run at 3000');