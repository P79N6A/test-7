var pathModule = require("path"),
    S = require("kissy").KISSY,
    UtilTools = require('../tools/utils'),
    pageBase = require('./base'),
    modRender = require('../mod/render'),
    pageDB = require('../db/page');

// 页面渲染
var render = function (req, res) {
    var pageId = req.params['id'];

    // 查询
    pageDB.findById(pageId, function (data) {
        if (data && data.curStatus.id !== 'removed') {
            var html = renderPage(data),
                pagePath = pageBase.getPagePath(data);
            console.log("pagePath "  + pagePath);
            console.log("renderHtml = " + html);
            console.log("data.pageType" + data.pageType);
            // 数据模块
            if (data.pageType === 'data') {
                var json = {};
                // 过滤掉所有注释代码
                html = filterHtml(html);
                console.log("filter " + html)
                try {
                    json = JSON.parse(html);
                } catch (e) {
                    console.log("parse error");
                    console.log(e);
                    res.send('json格式不正确! ' + html);
                    return;
                }

                console.log("write to path " + pagePath);

                UtilTools.writeJsonFile(pagePath, json, false, function () {
                    res.send('<pre>' + JSON.stringify(json, null, 4) + '</pre>');
                });
                // 页面展示
            } else {
                UtilTools.writeFile(pagePath, html, function () {
                    res.send(html);
                });
            }
        } else {
            res.send('页面不存在！');
        }
    });

};

var renderCode = function (req, res) {
    var pageId = req.params['id'];
    var pageName = req.params['name'] || '';
    var dbid = req.params['dbid']||'';
    console.log(req);
    // 查询
    pageDB.findById(pageId, function (data) {
        console.log(data);

        if (data && data.curStatus.id !== 'removed') {
            var renderData = getRenderData(data);
            var code = modRender.renderPageWithoutTemplate(renderData, true);

            var separator = '@Published-Template'
            if (code.indexOf(separator) > -1) {
                splitOfCode = code.split(separator);
                var codeBef = splitOfCode[0];
                var codeAft = splitOfCode[1];
                if (codeBef.indexOf(separator) >= 0 || codeAft.indexOf(separator) >= 0) {
                    console.log('codeBef=' + codeBef);
                    console.log('codeAft=' + codeAft);
                    res.send('模板信息包含冲突内容');
                }
                res.jsonp({
                    success: 1,
                    'pageId': pageId,
                    'dbid': dbid,
                    'codeBef': codeBef,
                    'codeAft': codeAft,
                    'pageName': pageName
                })
            } else {
                res.send('商品详情区域占位符似乎不见了');
            }
        } else {
            res.send('页面不存在！');
        }
    });
};
var renderCodeNew = function (req, res) {
    var pageId = req.params['id'];
    var pageName = req.params['name'] || '';

    pageDB.findById(pageId, function (data) {
        if (data && data.curStatus.id !== 'removed') {
            var pagePath = pathModule.join(__dirname, '..', '..', pageBase.getPagePath(data)),
                userInfo = pageBase.getUser(req),
                publishedPath, subDir;
            var pageType = data.pageType;
            publishedPath = pathModule.join(__dirname, '..', '..', pageBase.getPublishedPath(data, subDir));
            _copy(pagePath, publishedPath);
            var renderData = getRenderData(data);
            var code = modRender.renderPageWithoutTemplate(renderData, true);

            var separator = '@Published-Template'
            if (code.indexOf(separator) >= -1) {
                splitOfCode = code.split(separator);
                var codeBef = splitOfCode[0];
                var codeAft = splitOfCode[1];
                if (codeBef.indexOf(separator) >= 0 || codeAft.indexOf(separator) >= 0) {
                    console.log('codeBef=' + codeBef);
                    console.log('codeAft=' + codeAft);
                    res.send('模板信息包含冲突内容');
                } else {
                    pageDB.updateStatus(data._id, 'published', userInfo, function () {
                        var pageUrl = pageBase.getUrl(data);
                        res.json({
                            success: true,
                            'codeBef': codeBef,
                            'codeAft': codeAft,
                            'pageName': pageName
                        });
                    });
                }
            } else {
                res.send('商品详情区域占位符似乎不见了');
            }
        } else {
            res.json({
                success: false,
                errorMsg: '页面不存在！'
            });
        }

    });
};

var renderPage = function (data) {
    var pageTempPath = pageBase.getTempPath(data),
        renderData;
    if (data.buildType === 'code') {
        // 代码构建
        renderData = modRender.dataAdap(data.code);
    } else {
        // 模块构建
        renderData = getRenderData(data);
    }
    if (data.pageType === 'rgn' || (data.pageType === 'data' && data.buildType != 'visual')) {
        //if(data.pageType === 'rgn'){
        // 构建区块
        return modRender.renderWithoutTemp(renderData);
    } else {
        // 构建带模板: json 数据
        return modRender.renderWithTemp(renderData, data.title, pageTempPath);
    }
};

var getRenderData = function (data) {
    var renderData = {
            html: [],
            css: [],
            js: [],
            jsCombo: [],
            cssCombo: []
        },
        result = {},
        modIdList = [];
    // 模块构建
    S.each(data.modList, function (mod) {
        if (!mod) return;
        renderData.html.push(modRender.renderHtml(mod.code.html, mod.data));
        // 防止重复加载模块资源，模块可以使用多次
        if (!S.inArray(mod._id, modIdList)) {
            if (mod.code.js) {
                renderData.js.push(mod.code.js);
            }
            if (mod.code.css) {
                renderData.css.push(mod.code.css);
            }
            if (mod.assets.js) {
                renderData.jsCombo.push(mod.assets.js);
            }
            if (mod.assets.css) {
                renderData.cssCombo.push(mod.assets.css);
            }
        }
        modIdList.push(mod._id);
    });

    var split = data.pageType == 'data' ? ',' : '';
    result.html = renderData.html.join(split);
    // 代码
    if (renderData.css.length > 0) {
        result.css = renderData.css.join('');
    }
    if (renderData.js.length > 0) {
        result.js = renderData.js.join('');
    }
    // combo资源
    if (renderData.jsCombo.length > 0) {
        result.jsCombo = renderData.jsCombo.join(',');
    }
    if (renderData.cssCombo.length > 0) {
        result.cssCombo = renderData.cssCombo.join(',');
    }

    return result;
};

// 过滤掉注释代码
var filterHtml = function (html) {
    var startStr = '<!--',
        endStr = '-->';
    var _filterHtml = function (_html) {
        var startIndex = _html.indexOf(startStr),
            endIndex = _html.indexOf(endStr),
            list = [];
        list.push(_html.slice(0, startIndex));
        list.push(_html.slice(endIndex + endStr.length));
        return list.join('');
    };
    while (html.indexOf(startStr) > -1) {
        html = _filterHtml(html);
    }
    return html;
};

module.exports.render = render;
module.exports.renderCode = renderCode;
module.exports.renderPage = renderPage;
