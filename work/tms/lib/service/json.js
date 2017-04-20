var S = require("kissy").KISSY,
    pathModule = require("path"),
    fs = require("fs"),
    UtilTools = require('../tools/utils');

var config = UtilTools.getJSONSync("config.json");

var sendFile = function(req, res){
    var fileName = req.query['file'];
    var dataType = req.query['type'];
    var env = req.query['env'];
    dataType = (dataType == 'jsonp') ? 'jsonp' : 'json';

    var srcPath = (env === 'rc') ? config.buildPath : config.publishedPath;
    var path = pathModule.join(srcPath, 'data', fileName + '.json');
    var output = '';
    if(fs.existsSync(path)){
        output = fs.readFileSync(path, "utf8");
    }

    //console.log(dataType);

    res[dataType](output);
};

module.exports.sendFile = sendFile;