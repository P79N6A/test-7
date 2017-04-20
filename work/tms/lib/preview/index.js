var sendHtml = function(req, res){
    var biz = req.query['biz'];
    if (biz) {
        var path = './html/index/index.html';
    } else {
        var path = './html/empty.html';
    }

    res.sendfile(path);
};

module.exports.sendHtml = sendHtml;