"use strict";

/**
 * 大部分的源代码 详见base.js
 */

$(function () {// domready 才执行
        function Renderer() {}
        var $ = jQuery,
            win = window,
            doc = document,
            VIP, mstHost = "http://mst.vip.com";
        VIP = win.VIP = win.VIP || {}, win.mstRequire = win.mstRequire || {
            path: {// 外部js的路径
                hercule: mstHost + "/demo/js/hercules.js",
                brand: mstHost + "/demo/js/modules/brand.js",
                product: mstHost + "/demo/js/modules/product.js"
            }
        }, $.extend(win.mstRequire, {// 扩展 各个外部js加载后的回调方法，load方法加载js
            hercule: {
                callbackList: []
            },
            brand: {
                callbackList: []
            },
            product: {
                callbackList: []
            },
            load: function (e, t, a) {// mstRequire.load = function( args, scriptName, callback)
                var i = this,
                    n = t.toLowerCase(),
                    o = i[n];// mstRequire: { path: {hercule:..., brand:...}, hercule: {callbackList: [], loaded: false, loading: false}, ..}
                // $.ajax({url: scriptPath, dataType: "script"}).success(cb)
                "" != i.path[n] && (o.loaded ? a && a(e) : (o.callbackList.push(e), o.loading || (o.loading = !0, $.ajax({
                    url: i.path[n],
                    dataType: "script",
                    cache: !0
                }).success(function () {
                    o.loaded = !0, $.each(o.callbackList, function (e, t) {
                        a && a(t)
                    }), o.callbackList = [], o.loaded = !0
                }).fail(function (e) {
                    console.log(n + ".js 调用失败！", "status: " + e.status)
                }))))
            }
        });
        var container = $("#specialContent");
        $.extend(Renderer.prototype, {
                isInited: !1,
                nextReloadTime: 0,
                pluginHeight: 0,
                pluginIndex: 0,
                pluginList: [],
                threshold: 1e3,
                userScroll: !1,
                preloadHeight: 1.5 * document.documentElement.clientHeight,
                init: function (e) {
                    var t = this;
                    this.config = e.config,
                    this.container = container,
                    this.render(), // 渲染页面
                    this.bind(),
                    this.setMars(),
                    this.initEasterEggs(),
                    setTimeout(function () {
                        t.preload()
                    }, 100)
                },
                initReload: function () {
                    var e, t = new Date,
                        a = new Date,
                        i = new Date,
                        n = +new Date,
                        o = Math.round(3e5 * Math.random());
                    t.setMinutes(0), t.setHours(10), t = +t, a.setMinutes(0), a.setHours(20), a = +a, i.setMinutes(0), i.setHours(10), i = +i + 864e5, e = n < t ? t + o : n > a ? i + o : a + o;
                    setInterval(function () {// 检测到当前时间为早10 晚8 时段之外，则 重载
                        var t = +new Date;
                        t > e && location.reload()
                    }, 1e3)
                },
                render: function () {
                    var e = this,
                        // 获取moduleList  config为module 则为[this.config], 做仅有1个组件的页面对待
                        t = this.config.module_type_id ? [this.config] : this.config.data.moduleList,
                        a = !0,
                        i = ["custom_config", "share"], // 自定义组件 或 分享组件
                        n = $("<div></div>").addClass("plugin-head-group");
                    "1" === VIP.getQueryString("inChannel") && $("body").addClass("mst-ipad-channel"),
                    e.appendCss();
                    for (var o = t.length - 1; o >= 0 && !e.checkLastModule(t[o]); o--); // 根据 module.extend.page.isPaging 为true, 设置 module.isLast = true;
                    $.each(t, function (t, o) {// 遍历 moduleList
                        var r, s, d, c = a || document.documentElement.clientWidth <= 540 ? document.documentElement.clientWidth > 632 ? 632 : document.documentElement.clientWidth : 540, // [540, 632]之间
                            l = $("<div></div>").addClass("plugin"), // 组件容器div
                            p = i.indexOf(o.module_type_id) == -1, // 不为 自定义 或 分享组件
                            u = "share" == o.module_type_id ? "1" : o.extend && o.extend.grade || "3"; // 样式优先级
                            // oRender.pluginList -> [$pluginEle1, $pluginEle2, ..]
                        if (e.pluginList.push(l.attr("data-index", t)), !e.checkLiveTime(o)) return !0;
                        switch (r = o.extend ? o.extend.layout || {} : {}, d = c / (r.width || 0), s = parseInt((r.height || 0) * d) || 0, o.module_type_id) {
                        case "head":// 若为 头图组件
                            a ? (s && n.height(s), a = !1, n.appendTo(e.container).append(l)) : (p && s && l.height(s), l.appendTo(e.container));
                            break;
                        default:
                            // s -> module.extend.layout.height  oRender.container -> #specialcontent
                            p && s && l.height(s), l.appendTo(e.container)
                        }
                        // oRender.pluginHeight 累计组件的高度  oRender.pluginIndex oRender.createModule() oRender.clearDomHeight()
                        // oRender.handleLast(.)
                        e.pluginHeight <= e.preloadHeight && (p && (e.pluginHeight += s), e.pluginIndex++, e.createModule(o, t), e.clearDomHeight(l)), "1" == u && (e.createModule(o, t), e.clearDomHeight(l))
                    }), e.handleLast()
                },
                handleLast: function (e) {// $body.append($tipDiv)
                    var t = '<div id="J_notify_tips" class="notify-tips"></div>';
                    $("body").append(t)
                },
                checkLastModule: function (e) {// module: {extend:{page: {isPaging: true}}} => module.isLast = true
                    return !(!e.extend || !e.extend.page || "true" != e.extend.page.isPaging) && (e.isLast = !0, !0)
                },
                createModule: function (config, index) {// config -> module 
                    // 这里的config为module 有别与window.config
                    if (!config.isLoaded) {
                        var that = this,
                            $dom = this.pluginList[index],
                            moreHtml = '<div class="u-loading u-more-btn J_pager_more"></div>',
                            css = config.css,
                            // config.template为空串 则表明应该从 window.config.data.htmlList提取
                            template = "" == config.template && config.style_id ? window.config.data.htmlList[config.style_id] : config.template,
                            // config.js 同上
                            js = "" == config.js && config.style_id ? window.config.data.jsList[config.style_id] : config.js;
                        // 组件容器div标记loaded 插入html
                        $dom.attr("data-loaded", "true").append(template), 
                        // config.css不为空 则需修正 rem大小 用<style>标签插入到容器div内
                        "" != css && (css = VIP.modelX(css), $dom.append(this.getCssString(css))), 
                        // config.isLast 则提示加载更多
                        config.isLast && $dom.append(moreHtml), config.isLoaded = !0;

                        // eval config.js的内容 转换为函数 并执行
                        try {
                            eval("(function(){return function(dom, config, index){" + js + "}})()").call($dom, $dom, config, index)
                        } catch (e) {
                            console.log(e.message), VIP.defaultParam.log.push(e.message)
                        }
                        // 设置图片懒加载
                        setTimeout(function () {
                            $dom.find("img.mst-lazy").lazyload({
                                threshold: that.threshold,
                                load: function () {
                                    this.removeAttribute("height")
                                }
                            })
                        }, 50), 
                        // 初始化埋点
                        this.initMars($dom, config, index)
                    }
                },
                getCssString: function (e) {// 拼接style标签
                    return "<style>" + e + "</style>"
                },
                checkToReload: function () {},
                appendCss: function () {// oRender.config.data.cssList
                    var e = this,
                        t = e.config.data.cssList || [], // cssList
                        a = "";
                    t && ($.each(t, function (e, t) {
                        a += "\n" + VIP.modelX(t)
                    }), 
                    e.container.append(e.getCssString(a))); // 修正后的css内容 append到 oRender.container中.
                },
                bind: function () {// touchstart scroll时 预加载
                    var e = this;
                    $(win).bind("touchstart touchmove scroll", function (t) {
                        e.preload()
                    })
                },
                preload: function () {
                    var e = this,
                        t = doc.body.scrollTop;
                    e.userScroll = !0, e.container.find(".plugin").each(function (a, i) {
                        if (!this.getAttribute("data-loaded")) {// 对于没有标记loaded的容器div
                            var n = $(this),
                                o = n.attr("data-index");
                            t + doc.documentElement.clientHeight + e.threshold >= n.offset().top && (
                                e.createModule(config.data.moduleList[o], o), // 从window.config.data.moduleList中取对应的module
                                e.clearDomHeight(e.pluginList[o]) // 容器div height:auto
                            )
                        }
                    })
                },
                clearDomHeight: function (e, t) {// div.plugin height: auto
                    var t = t || 1e3;
                    setTimeout(function () {
                        e.css({
                            height: "auto"
                        }).addClass("plugin-loaded")
                    }, t)
                },
                setMars: function () {// 已加载组件的图片全部加载完的时间 作为埋点数据发送
                    if ("undefined" != typeof window.mstDomStartTime) {
                        var e, t = this,
                            a = t.container.find("img"), // #specialcontent下的img
                            i = [],
                            n = a.length,
                            o = 0,
                            r = (window.mstDomStartTime || 0, performance ? performance.timing.responseEnd - performance.timing.navigationStart : 0);
                        a.each(function (t, a) {
                            var s = $(this), // $img
                                d = $(new Image); // newImage
                            i.push(d), 
                            d.attr("src", s.attr("data-original") || s.attr("src")), 
                            d.bind("load", function () {
                                o++, o == n && (e = (new Date).getTime() - (window.mstDomStartTime || 0) + r, Mar.Seed.request("mst", "click", "mst_firstScreen_time", e))
                            })
                        })
                    }
                },
                checkLiveTime: function (e) {// module 是否在时间范围内 window.config.extend.server_time [module.model.live.sart_time, module.modle.live.end_time]
                    if (!window.config || !window.config.extend) return !0;
                    var t = !!window.config.extend.server_time && parseInt(window.config.extend.server_time);
                    if (t && e.model && e.model.live) {
                        var a = !!e.model.live.start_time && VIP.stringToDate(e.model.live.start_time),
                            i = !!e.model.live.end_time && VIP.stringToDate(e.model.live.end_time),
                            n = !!a && a.getTime() / 1e3,
                            o = !!i && i.getTime() / 1e3;
                        return !(n && t < n || o && t > o)
                    }
                    return !0
                },
                initMars: function (e, t, a) {
                    var i = window.config;
                    i && (VIP.Mars.set(a), ++a, e.on("click", "[mst-mars]", {}, function (i) {
                        var n = $(this),
                            o = $(i.target),
                            r = e.find("[mst-mars]"),
                            s = "undefined" == typeof n.attr("mst-mars") ? o.parents("[mst-mars]:eq(0)") : n,
                            d = +r.index(s) + 1,
                            c = +a + "_" + d,
                            l = VIP.Mars.get(s.attr("mst-mars"), c),
                            p = s.attr("mst-tag"),
                            u = VIP.getQueryString("extra_tag") ? VIP.getQueryString("extra_tag") + "," : "",
                            m = u + p,
                            f = {
                                module: a + "",
                                seq: d + "",
                                tag: m
                            },
                            g = "mst_" + t.module_type_id + "_click";
                        l = $.extend(l, f), Mar.Seed.request(o[0].tagName.toLowerCase(), "click", g, JSON.stringify(l))
                    }))
                },
                initEasterEggs: function () {// 初始化彩蛋信息
                    VIP.easterEggs && (VIP.easterEggs.info.log.data = VIP.defaultParam.log, VIP.easterEggs.info.brands.data = $.map(config.data.moduleList, function (e, t) {
                        if ("brand" == e.module_type_id || "brand_with_product" == e.module_type_id) return e.data = $.map(e.data, function (e, t) {
                            if (!e.hide) return e
                        }), e.extend.page && "true" == e.extend.page.isPaging ? e.data.length + "(第一页)" : e.data.length
                    }), VIP.easterEggs.info.products.data = $.map(config.data.moduleList, function (e, t) {
                        if ("product" == e.module_type_id || "pg_product" == e.module_type_id || "pg_product_pc" == e.module_type_id) return e.data = $.map(e.data, function (e, t) {
                            if (!e.hide) return e
                        }), e.extend.page && "true" == e.extend.page.isPaging ? e.data.length + "(第一页)" : e.data.length
                    }), $("body").on("touchstart", function (e) {
                        3 == e.originalEvent.touches.length && VIP.easterEggs.timedCount()
                    }).on("touchend", function () {
                        VIP.easterEggs.resetTime()
                    }).on("scroll", function (e) {
                        e.stopPropagation()
                    }).on("click", ".mst-layer-btn-cancel", function (e) {
                        $(".mst-layer").animate({
                            opacity: 0
                        }, 100, function () {
                            $(this).remove()
                        }), $("html").removeClass("scroll-fix")
                    }))
                }
            }),
            function () {
                var _at_rule = /@model-base\s*((\d+\/)?\d+)\s*(from\s*(\d+\/)?\d+\s*)?;/i,
                    _number = /[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?(rem|mx)/gi,
                    _rootBase_default = "75/750",
                    _modelBase_default = "100/640",
                    _baseCheck = function (e) {
                        switch (!0) {
                        case /^(\d+\/)?0$/.test(e):
                            return null;
                        case /^\d+\/\d+$/.test(e):
                            return e;
                        case /^\d+$/.test(e):
                            return "100/" + e
                        }
                        return null
                    },
                    _getModelInfo = function (modelBase, rootBase) {
                        return modelBase = _baseCheck(modelBase) || _modelBase_default, rootBase = _baseCheck(rootBase) || _rootBase_default, {
                            rule: "@model-base " + rootBase + " from " + modelBase + ";",
                            ratio: eval("(" + modelBase + ")/(" + rootBase + ")")
                        }
                    },
                    _modelX = function (e, t) {
                        return t = t || {}, "string" != typeof e ? "" : ("undefined" == typeof t.headerUsed && (t.headerUsed = !0), e.split(/(?=@model-base)/i).map(function (e) {
                            var a = e.match(_at_rule) || [],
                                i = _getModelInfo(a[1] || t.modelBase, t.rootBase),
                                n = {
                                    rem: i.ratio,
                                    mx: i.ratio / 100
                                };
                            return 1 === i.ratio && /from/.test(a[0]) || /^\s+$/.test(e) ? e : (t.headerUsed ? i.rule : "") + e.replace(_at_rule, "").replace(_number, function () {
                                return parseFloat(arguments[0]) * n[arguments[3]] + "rem"
                            })
                        }).join(""))
                    };
                "undefined" != typeof VIP && (VIP.modelX = _modelX)
            }(), VIP.getBrandUrl = function (e) {
                return "http://m.vip.com/brand-" + e + "-0-0-0-1-0-1-20.html?m=brand&brand_id=" + e
            }, VIP.getProductUrl = function (e, t) {
                return "http://m.vip.com/product-" + e + "-" + t + ".html?m=product&brand_id=" + e + "&product_id=" + t
            }, VIP.getQueryString = function (e) {
                var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"),
                    a = window.location.search.substr(1).match(t);
                return null != a ? unescape(a[2]) : null
            }, VIP.loadScript = function (e, t) {
                var a = document.createElement("script");
                a.type = "text/javascript", a.onload = function () {
                    t()
                }, a.src = e, document.body.appendChild(a)
            }, VIP.cookie = function (e, t, a) {
                if ("undefined" == typeof t) {
                    var i = null;
                    if (document.cookie && "" != document.cookie)
                        for (var n = document.cookie.split(";"), o = 0; o < n.length; o++) {
                            var r = jQuery.trim(n[o]);
                            if (r.substring(0, e.length + 1) == e + "=") {
                                i = decodeURIComponent(r.substring(e.length + 1));
                                break
                            }
                        }
                    return i
                }
                a = a || {}, null === t && (t = "", a.expires = -1);
                var s = "";
                if (a.expires && ("number" == typeof a.expires || a.expires.toUTCString)) {
                    var d;
                    "number" == typeof a.expires ? (d = new Date, d.setTime(d.getTime() + 24 * a.expires * 60 * 60 * 1e3)) : d = a.expires, s = "; expires=" + d.toUTCString()
                }
                var c = a.path ? "; path=" + a.path : "",
                    l = a.domain ? "; domain=" + a.domain : "",
                    p = a.secure ? "; secure" : "";
                document.cookie = [e, "=", encodeURIComponent(t), s, c, l, p].join("")
            }, VIP.getConfigValueByKey = function () {
                if (!window.config) return "";
                var e = window.config;
                return $.each(arguments, function (t, a) {
                    e = e[a] ? e[a] : ""
                }), e
            }, VIP.initDefaulParam = function () {
                var e = new Date,
                    t = e.getFullYear(),
                    a = e.getMonth() + 1,
                    i = e.getDate(),
                    n = t + "" + a + i,
                    o = Math.ceil((new Date).getTime() / 1e3 / 300),
                    o = n + "" + o,
                    r = this.getQueryString("width"),
                    s = this.getQueryString("height"),
                    d = this.getQueryString("client"),
                    c = this.getQueryString("app_version"),
                    l = this.getQueryString("app_name"),
                    p = this.getQueryString("warehouse") || VIP.getConfigValueByKey("data", "page_data", "warehouse") || "VIP_NH",
                    u = this.getQueryString("area_id"),
                    m = this.getQueryString("net"),
                    f = this.getQueryString("mars_cid"),
                    g = this.getQueryString("is_preload"),
                    h = this.getQueryString("newcustomer"),
                    _ = this.getQueryString("wap_consumer"),
                    v = this.getQueryString("m"),
                    w = location.href.replace(/&/g, "%@^_"),
                    I = w.indexOf("m.vip.com"),
                    P = 3,
                    b = "app",
                    y = this.getQueryString("user_id"),
                    V = ["iphone", "android", "ipad", "androidpad", "windowsphone", "windowspad"],
                    x = V.indexOf(d) > -1,
                    k = "iphone" == d,
                    S = "android" == d,
                    $ = "ipad" == d,
                    C = "windowsphone" == d,
                    L = "windowspad" == d,
                    T = /micromessenger/i.test(navigator.userAgent.toLowerCase()),
                    z = this.getQueryString("extra_tag"),
                    j = this.getQueryString("wapid") || "mst_" + VIP.getConfigValueByKey("data", "id"),
                    D = VIP.getConfigValueByKey("data", "id"),
                    B = VIP.getConfigValueByKey("data", "build_id"),
                    M = VIP.getConfigValueByKey("data", "page_data", "page_show_type");
                d = /^(phone|pad)$/.test(d) ? "wap" : d, (!window.location.search || "special" == v || parseInt(I) > 1 || !d) && (b = "wap", r = "640", s = "460", d = "wap", c = "4.0", l = "wap", p = this.cookie("warehouse"), u = this.cookie("m_vip_province"), m = "WIFI", f = this.cookie("mars_cid"), g = "1", h = 0, _ = this.cookie("wap_consumer"), y = ""), u = u ? u : 0, m = m ? m : "WIFI", this.defaultParam = {
                    verstr: o,
                    source: b,
                    width: r,
                    height: s,
                    client: d,
                    app_version: c,
                    app_name: l,
                    warehouse: p,
                    area_id: u,
                    net: m,
                    mars_cid: f,
                    is_preload: g,
                    newcustomer: h,
                    wap_consumer: _,
                    m_special: v,
                    item_id: P,
                    referer_currurl: w,
                    wapurlpos: I,
                    is_app: x,
                    is_wap: "wap" == d,
                    is_iphone: k,
                    is_android: S,
                    is_ipad: $,
                    is_windowsphone: C,
                    is_windowspad: L,
                    is_weixin: T,
                    mst_mars: z,
                    wap_id: j,
                    page_id: D,
                    special_id: B,
                    page_show_type: M,
                    log: []
                }
            }, VIP.notify_tips = function (e, t) {
                var a = t || 1e3,
                    i = $("#J_notify_tips"),
                    n = i.attr("isShowed");
                i.attr("isShowed", "true").show().html(e), n && window.clearTimeout(window.timer), window.timer = setTimeout(function () {
                    i.removeAttr("isShowed").hide()
                }, a)
            }, VIP.getClientImageSrc = function (e, t) {
                if ("" == e || !e) return e;
                var t = t || "brand",
                    a = {
                        iphone: {
                            "2g": "604x290_50",
                            "3g": "604x290_50",
                            "2g/3g": "604x290_50",
                            "4g": "604x290_80",
                            wifi: "604x290_80"
                        },
                        windows: {
                            "2g": "604x290_50",
                            "3g": "604x290_50",
                            "2g/3g": "604x290_50",
                            "4g": "604x290_80",
                            wifi: "604x290_80"
                        },
                        ipad: {
                            "2g": "604x290_80",
                            "3g": "604x290_80",
                            "2g/3g": "604x290_80",
                            "4g": "604x290_80",
                            wifi: "604x290_80"
                        },
                        android: {
                            "2g": [{
                                exp: "gl:eq:",
                                condition: "1080",
                                "return": "604x290_50"
                            }, {
                                exp: "gt:",
                                condition: "1080",
                                "return": "456x576_50"
                            }],
                            "3g": [{
                                exp: "gl:eq:",
                                condition: "1080",
                                "return": "604x290_50"
                            }, {
                                exp: "gt:",
                                condition: "1080",
                                "return": "456x576_50"
                            }],
                            "2g/3g": [{
                                exp: "gl:eq:",
                                condition: "1080",
                                "return": "604x290_50"
                            }, {
                                exp: "gt:",
                                condition: "1080",
                                "return": "456x576_50"
                            }],
                            "4g": [{
                                exp: "gl:eq:",
                                condition: "1080",
                                "return": "604x290_80"
                            }, {
                                exp: "gt:",
                                condition: "1080",
                                "return": "456x576_80"
                            }],
                            wifi: [{
                                exp: "gl:eq:",
                                condition: "1080",
                                "return": "604x290_80"
                            }, {
                                exp: "gt:",
                                condition: "1080",
                                "return": "456x576_80"
                            }]
                        },
                        wap: {
                            "2g": "604x290_50",
                            "3g": "604x290_50",
                            "2g/3g": "604x290_50",
                            "4g": "604x290_80",
                            wifi: "604x290_80"
                        }
                    },
                    i = e.indexOf("upload/merchandise") > -1 || "product" == t;
                i && (a = {
                    iphone: {
                        "2g": "304x384_50",
                        "3g": "304x384_50",
                        "2g/3g": "304x384_50",
                        "4g": "304x384_80",
                        wifi: "304x384_80"
                    },
                    windows: {
                        "2g": "304x384_50",
                        "3g": "304x384_50",
                        "2g/3g": "304x384_50",
                        "4g": "304x384_80",
                        wifi: "304x384_80"
                    },
                    ipad: {
                        "2g": "304x384_80",
                        "3g": "304x384_80",
                        "2g/3g": "304x384_80",
                        "4g": "304x384_80",
                        wifi: "304x384_80"
                    },
                    android: {
                        "2g": [{
                            exp: "gl:eq:",
                            condition: "1080",
                            "return": "304x384_50"
                        }, {
                            exp: "gt:",
                            condition: "1080",
                            "return": "456x576_50"
                        }],
                        "3g": [{
                            exp: "gl:eq:",
                            condition: "1080",
                            "return": "304x384_50"
                        }, {
                            exp: "gt:",
                            condition: "1080",
                            "return": "456x576_50"
                        }],
                        "2g/3g": [{
                            exp: "gl:eq:",
                            condition: "1080",
                            "return": "304x384_50"
                        }, {
                            exp: "gt:",
                            condition: "1080",
                            "return": "456x576_50"
                        }],
                        "4g": [{
                            exp: "gl:eq:",
                            condition: "1080",
                            "return": "304x384_80"
                        }, {
                            exp: "gt:",
                            condition: "1080",
                            "return": "456x576_80"
                        }],
                        wifi: [{
                            exp: "gl:eq:",
                            condition: "1080",
                            "return": "304x384_80"
                        }, {
                            exp: "gt:",
                            condition: "1080",
                            "return": "456x576_80"
                        }]
                    },
                    wap: {
                        "2g": "304x384_50",
                        "3g": "304x384_50",
                        "2g/3g": "304x384_50",
                        "4g": "304x384_80",
                        wifi: "304x384_80"
                    }
                });
                var n, o, r = VIP.defaultParam,
                    s = a[r.client.toLowerCase()][r.net.toLowerCase()],
                    d = r.width,
                    c = /([\w\-\/\:\.]+)(\.(?:png|jpg|gif|bmp))$/i,
                    l = e.match(c);
                if (s = i ? s || "304x384_50" : s || "604x290_50", Array.isArray(s))
                    for (var p = 0; p < s.length; p++) switch (o = s[p], o.exp) {
                    case "gl:eq:":
                        d <= o.condition && (n = o["return"]);
                        break;
                    case "gl:":
                        d < o.condition && (n = o["return"]);
                        break;
                    case "gt:":
                        d > o.condition && (n = o["return"])
                    } else n = s;
                return e = l[1] + "_" + n + l[2]
            }, VIP.isInSale = function (e) {
                var t = (new Date).getTime(),
                    e = new Date(e).getTime();
                return !(t < e)
            }, VIP.getReplaceHref = function (e) {
                var t = ("wap" === VIP.defaultParam.client, e.match(/(\d+)-(\d+)/i)),
                    a = t[1],
                    i = t[2];
                return "http://m.vip.com/product-" + a + "-" + i + ".html?m=product&brand_id=" + a + "&product_id=" + i
            }, VIP.getToSpecialTopicUrl = function (e) {
                if ("" == e || !e) return e;
                var t = VIP.defaultParam;
                if (e) {
                    var a = "width=" + t.width + "&height=" + t.height + "&client=" + t.client + "&source=" + t.source + "&warehouse=" + t.warehouse + "&area_id=" + t.area_id + "&net=" + t.net + "&mars_cid=" + t.mars_cid + "&is_preload=" + t.is_preload + "&newcustomer=" + t.newcustomer + "&wap_consumer=" + t.wap_consumer + "&app_version=" + t.app_version,
                        i = e.indexOf("?");
                    if (e = i > 0 ? e + "&" + a : e + "?" + a, "wap" == t.client) {
                        for (var n = ["http://ap.vip.com/", "http://mzt.vip.com/", "http://upload.devcmstopic.com/", "http://mzt.vip.com/"], o = "http://ap.vip.com/", r = 0; r < n.length; r++) {
                            var s = n[r],
                                d = e.indexOf(s);
                            "-1" != d && (o = s)
                        }
                        var c = e.indexOf(o),
                            l = e.indexOf("exclusive_subject/te/"),
                            p = "http://m.vip.com/index.php?m=special&p=",
                            u = "";
                        if (c >= 0 && l > 0) {
                            var m = o + "uploadfiles/exclusive_subject",
                                f = m.length;
                            u = e.substr(f);
                            var g = u.indexOf("?");
                            return g > 0 && (u = u.substr(0, g)), "" != u && (e = p + u), e
                        }
                        return e
                    }
                    return e
                }
            }, VIP.link = function () {
                var e = {};
                return e.SPECIAL = "http://msp.appvipshop.com/uploadfiles/exclusive_subject/te/v1/s{sid}_{wh}_index.php?wapid=mzt_{sid}&wh={VIP_WH}&title=唯品会", e.SPECIAL_BLANK = "http://msp.appvipshop.com/uploadfiles/exclusive_subject/te/v1/s{sid}_{wh}_index.php?wapid=mzt_{sid}&wh={VIP_WH}&m=webview&title=唯品会", e.PRODUCT = "vipshop://showGoodsDetail?brandId={brand}&goodsId={product}&goodsType=0&goodsTitle={title}&w={VIP_WH}", e.BRAND = "vipshop://showBrandProducts?brandId={brand}&brandName={title}", e.go = function (t, a, i, n, o) {
                    function r(e) {
                        var t = e.match(/.+(\/vis\/pages(\/x\/(\d{1,2})\/(\d{1,2})){0,1}\/(\d+)\/([1|2])\.html)(.*)/);
                        return !!(t && t.length > 1) && t[1]
                    }

                    function s(e, t, a) {
                        function i(e, t) {
                            return e.split(".")[0] >= 6 || e.split(".")[0] >= 5 && e.split(".")[1] >= t
                        }

                        function n(e) {
                            return e.split(".")[0] + "." + e.split(".")[1]
                        }
                        var o = VIP.defaultParam,
                            r = /micromessenger/i.test(navigator.userAgent),
                            e = e,
                            t = t,
                            a = a,
                            s = "http://m.vip.com/classify-category-" + e + "-" + t + "-0-0-0-0-20.html",
                            d = "vipshop://categoryGoodsList?parentCategoryId=" + e + "&categoryId=" + t + "&categoryName=" + encodeURIComponent(a);
                        if (r) VIP.notify_tips("微信网页版暂不支持查看分类，请下载手机app端查看体验更佳哦", 3e3);
                        else if ("wap" == o.client) window.location.href = s;
                        else if ("undefined" != typeof o.app_version)
                            if ("ipad" == o.client) VIP.notify_tips("本分类商品暂只支持在手机app端查看，请到手机端下载唯品会查看", 3e3);
                            else {
                                var c = o.app_version;
                                0 == o.app_version.indexOf("8.") ? (c = c.substring(2), i(n(c), 14) ? window.location.href = d : VIP.notify_tips("您当前app版本暂不支持查看本分类商品，建议升级app版本或到搜索->分类中查找", 3e3)) : i(n(c), 14) ? window.location.href = d : VIP.notify_tips("您当前app版本暂不支持查看本分类商品，建议升级app版本或到搜索->分类中查找", 3e3)
                            }
                    }
                    var d, c, l = VIP.defaultParam,
                        p = /micromessenger/i.test(navigator.userAgent),
                        u = /iphone|ipod/i.test(navigator.userAgent),
                        m = /ipad/i.test(navigator.userAgent);
                    /android/i.test(navigator.userAgent);
                    n = encodeURIComponent(n), e.VIS = VIP.getToSpecialTopicUrl(a + "&m=webview&title={title}"), d = r(e.VIS), o && "0" !== o.pre_type && (e.BRAND = "vipshop://showBrandProducts?brandId={brand}&brandName={title}&top_type=1&mtms_component_id=" + (o.mtms_component_id || "") + "&mtms_id=" + (window.config.data.build_id || "")), "wap" == l.client && (e.SPECIAL = e.SPECIAL.replace("msp.appvipshop.com", "mzt.vip.com"), e.SPECIAL_BLANK = e.SPECIAL_BLANK.replace("msp.appvipshop.com", "mzt.vip.com"), e.PRODUCT = "http://m.vip.com/product-{brand}-{product}.html?m=product&brand_id={brand}&product_id={product}&title={title}", e.BRAND = "http://m.vip.com/brand-{brand}-0-0-0-1-0-1-40.html?m=brand&brand_id={brand}&title={title}", e.VIS = d ? "http://m.vip.com/index.php?m=special&p=" + d + "&h=mzt.vip.com&_src=vis&title={title}" : e.VIS), p && (e.BRAND = "http://weixin.vip.com/?#productList?brandId={brand}", e.PRODUCT = "http://weixin.vip.com/#productDetail?productId={product}", e.VIS = d ? "http://weixin.vip.com/purchase/special?m=special&p=" + d + "&h=mzt.vip.com&_src=vis&title={title}" : e.VIS);
                    var f = "all",
                        g = a;
                    a && "object" == typeof a && (f = l.warehouse || "nh", g = a[f]);
                    var h = null,
                        _ = null;
                    a && "string" == typeof a && a.indexOf("|") >= 0 && null != typeof a && (h = a, _ = a);
                    var v = function () {
                        var e = VIP.defaultParam,
                            t = /micromessenger/i.test(navigator.userAgent),
                            a = a,
                            i = "vipshop://showChannel?f=dx&channelID={channelID}&channelMenu={channelMenu}",
                            n = "vipshop://showChannel?channelID={channelID}&channelMenu={channelMenu}",
                            o = function (e, t) {
                                return e = 8 == e.split(".")[0] ? e.split(".")[1] + "." + e.split(".")[2] : e.split(".")[0] + "." + e.split(".")[1], e.split(".")[0] >= 5 && e.split(".")[1] >= t
                            },
                            r = function (a, o, r) {
                                if (t) VIP.notify_tips("微信网页版暂不支持查看分类，请下载手机app端查看体验更佳哦", 3e3);
                                else if ("wap" == e.client) VIP.notify_tips("网页版暂不支持查看分类频道，请下载手机app端查看体验更佳哦", 3e3);
                                else if ("undefined" != typeof e.app_version) {
                                    var s = e.app_version;
                                    switch (e.client) {
                                    case "android":
                                        this.checkAppVersion(s, 7) ? " " != a && " " != r && (i = i.replace(/{channelID}/g, a).replace(/{channelMenu}/g, r), window.location.href = i) : VIP.notify_tips("您当前app版本暂不支持查看本分类频道，建议升级app新版本体验", 3e3);
                                        break;
                                    case "iphone":
                                        this.checkAppVersion(s, 15) ? " " != o && " " != r && (n = n.replace(/{channelID}/g, o).replace(/{channelMenu}/g, r), window.location.href = n) : VIP.notify_tips("您当前app版本暂不支持查看本分类频道，建议升级app新版本体验", 3e3);
                                        break;
                                    case "ipad":
                                        VIP.notify_tips("ipad版唯品会暂不支持查看该分类频道", 3e3);
                                        break;
                                    default:
                                        VIP.notify_tips("本分类商品暂只支持在手机app端查看，请到手机端下载唯品会查看", 3e3)
                                    }
                                } else VIP.notify_tips("您当前app版本暂不支持查看本分类频道，建议升级app新版本体验", 3e3)
                            };
                        return {
                            checkAppVersion: o,
                            init: r
                        }
                    }();
                    switch (t) {
                    case "special":
                        g = "_blank" == i ? e.SPECIAL_BLANK.replace(/{sid}/g, g).replace(/{wh}/g, f).replace(/{VIP_WH}/g, "VIP_" + f.toUpperCase()) : e.SPECIAL.replace(/{sid}/g, g).replace(/{wh}/g, f).replace(/{VIP_WH}/g, "VIP_" + f.toUpperCase());
                        try {
                            goToSpecialTopicUrl(g)
                        } catch (w) {
                            console.log("%c没有goToSpecialTopicUrl,请线上预览", "color:blue", g)
                        }
                        break;
                    case "special-auto":
                        g = parseInt(g), e.go("special", {
                            nh: g,
                            sh: g + 1,
                            cd: g + 2,
                            bj: g + 3,
                            hz: g + 4
                        }, i);
                        break;
                    case "special-auto-ran":
                        g = g.match(/(\d+).*(nh|sh|cd|bj|hz)/);
                        var I = 5,
                            P = I - {
                                nh: 0,
                                sh: 1,
                                cd: 2,
                                bj: 3,
                                hz: 4
                            }[g[2]];
                        g = parseInt(g[1]), e.go("special", {
                            nh: g + (P + 0) % I,
                            sh: g + (P + 1) % I,
                            cd: g + (P + 2) % I,
                            bj: g + (P + 3) % I,
                            hz: g + (P + 4) % I
                        }, i);
                        break;
                    case "brand":
                        location.href = e.BRAND.replace(/{brand}/g, g).replace(/{title}/g, n);
                        break;
                    case "product":
                        var b = g.match(/(\d*)-(\d*)/)[1],
                            y = g.match(/(\d*)-(\d*)/)[2];
                        location.href = e.PRODUCT.replace(/{brand}/g, b).replace(/{product}/g, y).replace(/{title}/g, n).replace(/{VIP_WH}/g, "VIP_" + f.toUpperCase());
                        break;
                    case "vis":
                        var c = e.VIS;
                        "string" != typeof g || /http:\/\/mst.vip.com/.test(c) || (c = e.VIS.replace(/{brand}/g, a.match(/brand_id=(\d*)/)[1])), location.href = c.replace(/{title}/g, n);
                        break;
                    case "app-category":
                        void 0 != typeof h.split("|")[0] && void 0 != typeof h.split("|")[1] && s(h.split("|")[0], h.split("|")[1], h.split("|")[2]);
                        break;
                    case "index":
                        c = p ? "http://weixin.vip.com" : "wap" != l.client ? m ? "vipshop://showMenuItem?typeID=0&typeValue=0" : u && !VIP.compareVersion(l.app_version, "5.1") ? "vipshop://showMenuItem?typeID=0&typeValue=0" : "http://m.vip.com?m=home" : "http://m.vip.com", location.href = c;
                        break;
                    case "subchannel":
                        void 0 != typeof _.split("|")[0] && void 0 != typeof _.split("|")[1] && void 0 != typeof _.split("|")[2] && v.init(_.split("|")[0], _.split("|")[1], _.split("|")[2]);
                        break;
                    case "makeup":
                        e.go("special", $(window).width() < 1024 ? 3561 : 3562);
                        break;
                    case "kids":
                        e.go("special", $(window).width() < 1024 ? 3563 : 3564);
                        break;
                    case "home":
                        e.go("special", $(window).width() < 1024 ? 3565 : 3566)
                    }
                }, e
            }(), VIP.initDefaulParam(), VIP.tmpl = {
                size: '<div class="mst-size" id="J-size">                    <div class="mst-size-mask" onclick="VIP.Sizing.displayPannel(0)"></div>                    <div class="mst-size-wrap">                        <div class="mst-size-head">                            <div class="mst-size-pro">                                <img alt="" src="${small_image}" />                                <div class="mst-size-info">                                    <p class="mst-size-title">${product_name}</p>                                    <div class="mst-size-price">                                        <i class="mst-size-price-now">￥${vipshop_price}</i>                                        <i> <strike>￥${market_price}</strike>                                         <em>${vip_discount}</em></i>                                    </div>                                </div>                            </div>                        </div>                        <div class="mst-size-content">                            <p class="mst-size-tips">                                尺码                            </p>                            <p class="mst-size-yardage {{if skuList.length <= 2}}mst-size-yardage-big{{/if}}">                                {{each(key,value) skuList}}                                    <span data-size-id="${value.id}" {{if type == 1 || type == -1}}class="unactive"{{/if}}>${value.name} <em></em></span>                                {{/each}}                            </p>                        </div>                        <div class="mst-size-btns">                            <a class="mst-size-btn">确 认</a>                        </div>                        <span class="mst-size-close" onclick="VIP.Sizing.displayPannel(0)">×</span>                    </div>                </div>',
                loading: '<div class="mst-global-loading" id="J-mst-global-loading">                      <div class="mst-gl-mask"></div>                      <div class="mst-gl-body">                           <svg class="mst-loading-svg" viewBox="0 0 150 150"> <g class="circle"> <circle cx="75" cy="75" r="72"></circle> <circle cx="75" cy="75" r="72" class="rotation"></circle> </g> <g class="logo-idle"> <path d="M32 62 L47 100 L62 62 M77 49 A0.1 0.1, 0 1 1, 80 52 A0.1 0.1, 0 1 1, 77 49 Z M78 62 L78 100 M95 113 L95 62 L95 85 A15 15, 0 1 1, 130 78 A15 15, 0 1 1, 95 85 Z"></path> </g> </svg> </div>                 </div>'
            }, VIP.Sizing = {
                customCallBack: null,
                dealTmpl: function (e) {
                    var t = VIP.tmpl.size,
                        a = "J-size",
                        i = this;
                    $("#" + a).remove(), $.tmpl(t, e).appendTo($("body")), this.dom = $("#" + a), this.dom.on("click", ".mst-size-btn", function () {
                        if (e.sizeChosecallback) {
                            if (!i.sizeId) return void VIP.notify_tips("请选择尺码", 2e3);
                            var t = i.getSizeById(e.skuList, i.sizeId);
                            e.sizeChosecallback(t), i.displayPannel(0)
                        } else i.pullToApp(e.addType, "", "" + e.brand_id, "" + e.product_id)
                    })
                },
                showPannel: function (e) {
                    var t = this;
                    e.addType;
                    if (e.skuList) {
                        delete e.dom;
                        t.dealTmpl(e);
                        var a = "active",
                            i = "unactive";
                        t.productId = e.product_id, t.displayPannel(1), t.dom.find(".mst-size-yardage span").bind("click", function () {
                            var e = $(this),
                                n = t.dom.find(".mst-size-yardage .active");
                            return !e.hasClass(i) && !n.is(e) && (n.removeClass(a), e.addClass(a), void(t.sizeId = e.attr("data-size-id")))
                        })
                    }
                },
                displayPannel: function (e) {
                    var t = this.dom,
                        a = t.find(".mst-size-wrap"),
                        i = 0,
                        n = 500;
                    delete this.sizeId, 0 === e ? (i = a.height(), t.fadeOut(n), a.animate({
                        bottom: -i
                    }, n, function () {
                        VIP.Sizing.displayFloatUI(1)
                    })) : (t.show(), i = a.height(), t.hide(), VIP.Sizing.displayFloatUI(0), t.fadeIn(n), a.css("bottom", -300).animate({
                        bottom: 0
                    }, n))
                },
                pullToApp: function (e, t, a, i, n) {
                    var o, i = (event ? event : window.event, this.productId || i),
                        r = $("[data-product-id=" + i + "]"),
                        a = a || r.data("brandId"),
                        s = t ? t.split(",") : [],
                        d = document.body.scrollLeft,
                        c = document.body.scrollTop,
                        t = t || this.sizeId,
                        l = "";
                    if (s = s.length > 1 ? s : [s], !t) return void VIP.notify_tips("请选择尺码", 2e3);
                    switch (n && (this.customCallBack = n), e) {
                    case "collect":
                        l = n ? "VIP.Sizing.customCallBack" : "VIP.Sizing.pullToCollectCallback", o = "vipshop://addFavourite?sku=" + t + "&goodsId=" + i + "&brandId=" + a + "&isHeat=1&jsFunction=" + l;
                        break;
                    case "unCollect":
                        l = n ? "VIP.Sizing.customCallBack" : "VIP.Sizing.pullToCollectCallback", o = "vipshop://delFavourite?sku=" + t + "&jsFunction=" + l;
                        break;
                    case "addCart":
                        l = n ? "VIP.Sizing.customCallBack" : "VIP.Sizing.pullToCartCallback", o = "vipshop://addCart?sizeId=" + t + "&brandId=" + a + "&productId=" + i + "&sizeNum=1&jsFunction=" + l
                    }
                    "collect" != e && "unCollect" != e || location.hash || (location.hash += "position=" + d + "," + c + "&action=VIP.Sizing.pullToApp&type=" + e + "&sizeId=" + t + "&productId=" + i), this.params = {
                        type: e,
                        productId: i
                    }, location.href = o
                },
                pullToCollectCallback: function (e) {
                    var t = this.params.productId;
                    200 == e && ("unCollect" == this.params.type ? $("[data-product-id=" + t + "]").attr("data-type", "collect") : $("[data-product-id=" + t + "]").attr("data-type", "unCollect")), this.afterCallback()
                },
                pullToCartCallback: function (e) {
                    this.afterCallback()
                },
                afterCallback: function () {
                    this.displayPannel(0)
                },
                init: function (e) {
                    "1" === VIP.getConfigValueByKey("extend", "switch", "is_addCart") && VIP.Sizing.displayFloatUI(1)
                },
                afterInit: function (params) {
                    params.position && window.scrollTo(params.position.split(",")[0], params.position.split(",")[1]), params.action && "" != params.action && eval(params.action + '("' + params.type + '","' + params.sizeId + '","' + params.productId + '")')
                },
                getSkuByMid: function (e, t) {
                    var a = {
                        product_id: e.product_id,
                        client: VIP.defaultParam.client,
                        app_version: VIP.defaultParam.app_version
                    };
                    $.ajax({
                        url: "http://mst.vip.com/product/getSkuByMid",
                        data: a,
                        dataType: "jsonp",
                        showLoading: !0,
                        success: function (a) {
                            if (t) t(a);
                            else {
                                var i = a.data[0],
                                    n = i.skuDetail,
                                    o = n[0];
                                if (1 == n.length && 0 == o.type) VIP.defaultParam.is_app ? VIP.Sizing.pullToApp("addCart", "" + o.id, "" + e.brand_id, "" + e.product_id) : VIP.router(e.dom[0], "product", e.brand_id + "-" + e.product_id, "唯品会");
                                else if (n.length > 1) {
                                    e.skuList = n;
                                    var r = !1;
                                    $.each(n, function (e, t) {
                                        if (0 != t.stock) return r = !0, !1
                                    }), VIP.defaultParam.is_app && r ? VIP.Sizing.showPannel(e) : VIP.router(e.dom[0], "product", e.brand_id + "-" + e.product_id, "唯品会")
                                } else VIP.router(e.dom[0], "product", e.brand_id + "-" + e.product_id, "唯品会")
                            }
                        }
                    })
                },
                getSizeById: function (e, t) {
                    var a = !1;
                    return $.each(e, function (e, i) {
                        i.id == t && (a = i)
                    }), a
                },
                displayFloatUI: function (e) {
                    VIP.hercules({
                        type: "ui",
                        name: "showFloatView",
                        param: {
                            flag: e
                        }
                    })
                },
                userSelectSizeCallback: function (e, t) {
                    t && "function" == typeof t && t(e)
                }
            }, VIP.Collection = {
                getCollectionList: function (e, t) {
                    var a = this,
                        i = null;
                    i = "string" == typeof e ? {
                        page_id: e,
                        mars_cid: VIP.defaultParam.mars_cid
                    } : e, $.ajax({
                        url: "http://mst.vip.com/Special/getFavouriteServiceList",
                        data: i,
                        dataType: "jsonp",
                        success: function (e) {
                            if ("function" == typeof t) return void t(e);
                            var i = e.data;
                            e.result && $.each(i, function (e, t) {
                                a.setCollectionHtml(t.brand_id, t.brand_store_sn, "add")
                            })
                        }
                    })
                },
                setCollection: function (e, t, a, i) {
                    window.event && window.event.preventDefault();
                    var n = this,
                        o = VIP.defaultParam.client,
                        r = "wap" == o ? 2 : 3;
                    $.ajax({
                        url: "http://mst.vip.com/Special/favouriteService?",
                        data: {
                            act: e,
                            client: VIP.defaultParam.client,
                            brand_sn: a,
                            brand_id: t,
                            source: r,
                            mars_cid: VIP.defaultParam.mars_cid
                        },
                        dataType: "jsonp",
                        success: function (t) {
                            var a, o, r = t.data;
                            if (i) i(t);
                            else if (t.result) 1 == t.code ? (a = r.pms_msg ? r.pms_msg : "add" == r.type ? "取消收藏成功！" : "收藏成功！", o = "add" == r.type ? VIP.Mars.get("blike|" + r.brand_id) : VIP.Mars.get("cblike|" + r.brand_id), Mar.Seed.request("mst", "click", "mst_brand_click", JSON.stringify(o))) : a = "收藏失败!请稍后再试。", VIP.notify_tips(a, 2e3), n.setCollectionHtml(r.brand_id, r.brand_sn, e);
                            else {
                                if (99 == t.code && "" != r._redirect) return VIP.Login.go(), !1;
                                a = "add" === r.type ? "取消" : "", VIP.notify_tips(a + "收藏失败！请稍后再试。", 2e3)
                            }
                        }
                    })
                },
                setCollectionHtml: function (e, t, a) {
                    var i = $("[data-favorite-status-brand-ids=" + e + "]");
                    "add" == a ? (i.attr("data-favorite-status-brand-action-type", "cancel"), i.find("span").addClass("off")) : "cancel" == a && (i.attr("data-favorite-status-brand-action-type", "add"), i.find("span").removeClass("off"))
                },
                getCouponStatus: function (e) {
                    $.ajax({
                        url: "http://mst.vip.com/Special/getCouponNum",
                        data: {
                            brand_ids: e,
                            mars_cid: VIP.defaultParam.mars_cid,
                            wap_consumer: VIP.defaultParam.wap_consumer
                        },
                        dataType: "jsonp",
                        success: function (e) {
                            $.each(e.data, function (e, t) {
                                $("#L_coupon_" + t).show()
                            })
                        }
                    })
                },
                getCouponInfo: function (e, t) {
                    $.ajax({
                        url: "http://mst.vip.com/Special/getCouponInfo",
                        data: e,
                        dataType: "jsonp",
                        success: function (e) {
                            t ? t(e) : e.result && $.each(e.data, function (e, t) {
                                2 == t.coupon_type && $("#L_coupon_" + t.brand_id).show().html("<em></em>" + t.coupon_fav)
                            })
                        }
                    })
                }
            }, VIP.compareVersion = function (e, t) {
                if (!e) return 0;
                for (var a, i, e = e.replace(/^8./, "").split("."), t = t.split("."), n = 0, o = 0; o < e.length; o++) {
                    if (a = parseInt(e[o], 10), i = parseInt(t[o], 10), a = a ? a : 0, i = i ? i : 0, a > i) {
                        n = 1;
                        break
                    }
                    if (a < i) {
                        n = 0;
                        break
                    }
                    n = 1
                }
                return n
            }, VIP.adaption = function () {
                var e = {},
                    t = {};
                return t.win = $(window), e.psdWidth = 640, e.update = function () {
                    try {
                        e.setRootFontSize()
                    } catch (t) {}
                }, e.setRootFontSize = function () {
                    var a = t.win.width(),
                        i = 320,
                        n = e.psdWidth;
                    i > a && (a = i), a > n && (a = n), $("html").css("font-size", 100 * a / n + "px")
                }, window.addEventListener("resize", e.update, !1), e.update(), e
            }, VIP.share = {
                filterVersion: function (e) {
                    return e.replace(/^8./, "")
                },
                canShare: function () {
                    var e = VIP.defaultParam,
                        t = e.app_version;
                    return !(!e.is_ipad || !VIP.compareVersion(t, "5.6")) || !(!e.is_iphone && !e.is_android || !VIP.compareVersion(t, "5.1"))
                },
                getId: function () {
                    var e = 0;
                    return window.config && $.each(window.config.data.moduleList, function (t, a) {
                        if ("share" == a.module_type_id && a.model) return e = a.model.plugin_id, !1
                    }), e
                },
                autoshare: function () {
                    window.location.href = "vipshop://autoShare?type=1"
                },
                appShare: function (e, t) {
                    window.location.href = "vipshop://shareSpecial?shareId=" + e + "&specialUrl=" + t + "&callbackId=2"
                },
                getPurchaseType: function () {
                    return VIP.getConfigValueByKey("data", "page_data", "purchase_type")
                }
            }, VIP.getPmsMsg = function (e, t) {
                $.ajax({
                    url: "http://mst.vip.com/Special/getPMS",
                    data: e,
                    dataType: "jsonp",
                    success: function (e) {
                        if (t) t(e);
                        else {
                            var a, i, n = e.data;
                            if (e.result)
                                for (var o = 0; o < n.length; o++) i = n[o], i.pms_msg && (a = $('<span class="s_info_desc">' + i.pms_msg + "</span>"), $("div[data-brand-id=" + i.id + "] .tpl_pic").append(a));
                            else console.log("PMS接口返回错误")
                        }
                    },
                    error: function () {
                        console.log("PMS接口返回错误")
                    }
                })
            }, VIP.getSoldOutList = function (e, t) {
                $.ajax({
                    url: "http://mst.vip.com/Special/getProductSkuStockStatus",
                    data: e,
                    dataType: "jsonp",
                    success: function (e) {
                        t ? t(e) : e.result ? $.each(e.data, function (e, t) {
                            t && $("[data-soldout-productid=" + t + "]").show()
                        }) : console.log("商品库存接口返回错误！")
                    },
                    error: function () {
                        console.log("商品库存接口返回错误！")
                    }
                })
            }, VIP.getSoldOutListNew = function (e, t) {
                $.ajax({
                    url: "http://mst.vip.com/Stock/checkStock",
                    data: e,
                    dataType: "jsonp",
                    success: function (e) {
                        t ? t(e) : e.result ? $.each(e.data, function (e, t) {
                            t && $("[data-soldout-productid=" + t + "]").show()
                        }) : console.log("商品库存接口返回错误！")
                    },
                    error: function () {
                        console.log("商品库存接口返回错误！")
                    }
                })
            }, VIP.stringToDate = function (e) {
                if ("undefined" == typeof e) return new Date;
                if ("date" == typeof e) return e;
                var t = Date.parse(e),
                    a = new Date(t);
                if (isNaN(a)) {
                    e = e.replace(/:/g, "-"), e = e.replace(" ", "-"), e = e.replace(".", "-");
                    var i = e.split("-");
                    switch (i.length) {
                    case 7:
                        a = new Date(i[0], (--i[1]), i[2], i[3], i[4], i[5], i[6]);
                        break;
                    case 6:
                        a = new Date(i[0], (--i[1]), i[2], i[3], i[4], i[5]);
                        break;
                    default:
                        a = new Date(i[0], (--i[1]), i[2])
                    }
                }
                return a
            }, VIP.handleUrlParam = function (e, t) {
                if (!e || "" == e) return e;
                var a = VIP.defaultParam,
                    i = e.indexOf("?") > -1,
                    n = ["width", "height", "client", "source", "warehouse", "area_id", "net", "mars_cid", "is_preload", "newcustomer", "wap_consumer", "app_version", "extra_tag"],
                    o = "",
                    t = t || "blank";
                return e += i ? "&" : "?", e += a.is_app && "blank" == t ? "m=webview&" : "", $.each(n, function (e, t) {
                    a[t] && (o += t + "=" + a[t] + "&")
                }), e += o.replace(/\&$/, "")
            }, VIP.router = function (e, t, a, i, n) {
                function o(e) {
                    var t = e.match(/.+(\/vis\/pages(\/x\/(\d{1,2})\/(\d{1,2})){0,1}\/(\d+)\/([1|2])\.html)(.*)/);
                    return !!(t && t.length > 1) && t[1]
                }
                var r = {},
                    s = VIP.defaultParam,
                    d = VIP.getConfigValueByKey("extend", "switch", "jump_weixin"),
                    c = s.is_app ? "app" : "0" === d ? "wap" : s.is_weixin ? "weixin" : "wap",
                    l = e ? e.getAttribute("mst-tag") : "",
                    p = VIP.getQueryString("extra_tag") ? VIP.getQueryString("extra_tag") + "," : "",
                    u = l ? "source_tag=" + p + l : "",
                    m = p ? p : l,
                    f = "all",
                    g = !!window.config && window.config.data.page_data.purchase_type;
                switch (i = encodeURIComponent(i), r = {
                    brand: {
                        wap: "http://m.vip.com/brand-{brand}-0-0-0-1-0-1-40.html?m=brand&brand_id={brand}&title={title}&" + u,
                        app: "vipshop://showBrandProducts?brandId={brand}&brandName={title}&" + u,
                        weixin: "http://weixin.vip.com/?#productList?brandId={brand}&" + u
                    },
                    product: {
                        wap: "http://m.vip.com/product-{brand}-{product}.html?m=product&brand_id={brand}&product_id={product}&title={title}&" + u,
                        app: "vipshop://showGoodsDetail?brandId={brand}&goodsId={product}&goodsType=0&goodsTitle={title}&w={VIP_WH}" + (0 == g || 1 == g ? "&isFromVis=true" : "") + "&" + u,
                        weixin: "http://weixin.vip.com/#productDetail?productId={product}&" + u
                    },
                    vis: {
                        wap: "http://m.vip.com/index.php?m=special&p={path}&h=mzt.vip.com&_src=vis&title={title}&" + u,
                        app: "vis" == t ? VIP.handleUrlParam(a) : "",
                        weixin: "http://weixin.vip.com/purchase/special?m=special&p={path}&h=mzt.vip.com&_src=vis&title={title}&" + u
                    },
                    subchannel: {
                        app: "vipshop://showChannel?channelID={channelID}&channelMenu={channelMenu}"
                    },
                    appCategory: {
                        wap: "http://m.vip.com/classify-category-{parendId}-{categoryId}-0-0-0-0-20.html?" + u,
                        app: "vipshop://categoryGoodsList?parentCategoryId={parentId}&categoryId={categoryId}&categoryName={categoryName}&" + u,
                        weixin: "http://m.vip.com/classify-category-{parendId}-{categoryId}-0-0-0-0-20.html?" + u
                    },
                    index: {
                        wap: "http://m.vip.com",
                        app: "http://m.vip.com?m=home",
                        weixin: "http://weixin.vip.com"
                    },
                    virtual: {
                        wap: "http://h5.vip.com/virtual/product-detail.html?product_id={product}",
                        app: "vipshop://goH5?url={url}",
                        weixin: "http://h5.vip.com/virtual/product-detail.html?product_id={product}"
                    }
                }, t) {
                case "brand":
                    a && (location.href = r.brand[c].replace(/{brand}/g, a).replace(/{title}/g, i));
                    break;
                case "product":
                    var a = a.split("-"),
                        h = a[0],
                        _ = a[1];
                    h && _ && (location.href = r.product[c].replace(/{brand}/g, h).replace(/{product}/g, _).replace(/{title}/g, i).replace(/{VIP_WH}/g, "VIP_" + f.toUpperCase()));
                    break;
                case "vis":
                    var v = "";
                    /http:\/\/mst.vip.com/.test(a) ? location.href = VIP.handleUrlParam(a) : (v = o(a), location.href = r.vis[c].replace(/{path}/g, v).replace(/{title}/g, i));
                    break;
                case "subchannel":
                    var w = !1,
                        a = a.split("|"),
                        I = s.is_iphone ? a[0] : a[1],
                        P = a[2];
                    I && P && (s.is_app && (r.subchannel.app += s.is_android ? "&f=dx" : "", (s.is_iphone && VIP.compareVersion(s.app_version, "5.15") || s.is_android && VIP.compareVersion(s.app_version, "5.7")) && (w = !0, location.href = r.subchannel.app.replace(/{channelID}/g, I).replace(/{channelMenu}/g, P))), w || VIP.notify_tips("您当前app版本暂不支持查看本分类频道，建议升级app新版本体验", 3e3));
                    break;
                case "app-category":
                    var w = !1,
                        a = a.split("|"),
                        b = a[0],
                        y = a[1],
                        V = $.trim(a[2]);
                    b && y && V && ((s.is_iphone || s.is_android) && VIP.compareVersion(s.app_version, "5.14") ? w = !0 : s.isWap && (w = !0), w && (location.href = r.appCategory[c].replace(/{parentId}/g, b).replace(/{categoryId}/g, y).replace(/{categoryName}/g, V))), w || VIP.notify_tips("您当前app版本暂不支持查看本分类频道，建议升级app新版本体验", 3e3);
                    break;
                case "index":
                    (s.is_ipad || s.is_iphone && !VIP.compareVersion(s.app_version, "5.1")) && (r.index.app = "vipshop://showMenuItem?typeID=0&typeValue=0"), location.href = r.index[c];
                    break;
                case "url":
                    a && (m && "" != m && (VIP.defaultParam.extra_tag = m.replace(",", "")), location.href = VIP.handleUrlParam(a, n));
                    break;
                case "virtual":
                    var a = a.split("|"),
                        _ = $.trim(a[0]),
                        t = a[1],
                        x = "";
                    if (_) {
                        switch (+t) {
                        case 2:
                            x = "http://trip.vip.com/mobile/product-detail.html?product_id=" + _;
                            break;
                        default:
                            x = r.virtual.wap.replace(/{product}/g, _)
                        }
                        x && ((s.is_iphone || s.is_android) && VIP.compareVersion(s.app_version, "5.11") ? location.href = r.virtual.app.replace(/{url}/g, encodeURIComponent(x)) : s.is_wap || s.is_weixin ? location.href = x : VIP.notify_tips("您当前app版本暂不支持本类型商品购买，建议到个人中心->设置 升级app", 4e3))
                    }
                }
            }, VIP.getIdByUrl = function (e, t, a) {
                function i(e, t) {
                    var a = new RegExp("(^|&)" + t + "=([^&]*)(&|$)"),
                        i = e.split("?")[1].match(a);
                    return null != i ? unescape(i[2]) : ""
                }
                if (!e || "" == e) return 0;
                var n, o = /(.*\/){0,}([^.]+).*/gi,
                    r = 0;
                return e.indexOf("msp.appvipshop.com") > -1 ? e.indexOf("/cmstopic/") > -1 ? r = e.replace(o, "$2") : e.indexOf("/vis/") > -1 ? (n = /\/pages\/(\d+)\//, r = e.match(n)[1]) : e.indexOf("wapid=mzt") > -1 && (r = i(e, "wapid")) : e.indexOf("mst.vip.com") > -1 ? r = "mst_" + e.replace(o, "$2") : e.indexOf("ma.vip.com") > -1 ? r = i(e, "wapid") : e.indexOf("viva.vip.com") > -1 ? r = i(e, "wapid") : e.indexOf("mzt.vip.com") > -1 && (r = i(e, "wapid")), r = "" == r ? 0 : r
            }, VIP.Mars = {
                get: function (e, t) {
                    var a = {
                            page: encodeURIComponent(document.title),
                            wap_id: VIP.defaultParam.wap_id,
                            special_id: VIP.defaultParam.special_id
                        },
                        e = e.split("|");
                    if (0 == e.length) return a;
                    switch (e[0]) {
                    case "brand":
                        a.target_type = e[0], a.target_id = e[1], a.brand_id = e[1], a.brand_rank = t, a.brandtyp = "0";
                        break;
                    case "product":
                        a.target_type = e[0], a.target_id = e[2], a.brand_id = e[1], a.goods_id = e[2], a.brand_rank = t, a.brandtyp = "1";
                        break;
                    case "url":
                        e[0] && (a.target_type = e[0]), e[1] && (a.target_id = VIP.getIdByUrl(e[1]));
                        break;
                    default:
                        e[0] && (a.target_type = e[0]), e[1] && (a.target_id = e[1])
                    }
                    return a
                },
                set: function (e) {
                    var t = win.renderer.pluginList[e];
                    t && (++e, t.find("[mst-mars]").each(function (t, a) {
                        var i = $(this),
                            n = i.attr("mst-mars") && i.attr("mst-mars").split("|"),
                            o = n[0],
                            r = e + "_" + (t + 1),
                            s = window.config ? window.config.data.id : "",
                            d = "",
                            c = (new Date).getTime(),
                            l = s + "_" + r + "_" + c;
                        switch (i.attr("mst-rank", r), o) {
                        case "brand":
                            n[1] && i.attr("mars_exposure_sead", "special_slide_expose").attr("mars_exposure_module", "mst|brands|" + n[1] + "|" + r + "|0"), d = l + "_" + n[1];
                            break;
                        case "product":
                            n[1] && n[2] && i.attr("mars_exposure_sead", "special_slide_expose").attr("mars_exposure_module", "mst|products|" + n[1] + "|" + r + "|1|" + n[2]), d = l + "_" + n[2];
                            break;
                        case "url":
                            d = l + "_" + VIP.getIdByUrl(n[1]);
                            break;
                        case "vis":
                            d = l + "_" + VIP.getIdByUrl(n[1]);
                            break;
                        default:
                            d = l + "_0"
                        }
                        i.attr("mst-tag", d)
                    }))
                },
                send: function (e, t, a) {
                    var i = VIP.Mars.get(t, a);
                    Mar.Seed.request("mst", "click", e, JSON.stringify(i))
                }
            }, win.JSBridge = {
                callbackId: 1,
                getCallbackId: function () {
                    return this.callbackId++
                },
                callbackList: {},
                fnList: {
                    onWebviewChange: function (e) {},
                    onShareClick: function (e) {},
                    permitVideo: function (e) {}
                },
                callH5: function (e, t) {
                    var a = this.fnList[e];
                    a && a(t)
                },
                callNative: function (e, t, a, i) {
                    var n = this.getCallbackId(),
                        o = {
                            method: e,
                            params: t
                        };
                    a ? this.callbackList[n] = $.extend({}, {
                        callback: a
                    }, o) : this.callbackList[n] = o, i && 1 == i ? setTimeout(function () {
                        location.href = "vipshop://" + e + "?" + $.param(t) + "&callbackId=" + n
                    }, 200 * n) : location.href = "vipshop://" + e + "?" + $.param(t) + "&callbackId=" + n
                },
                onCallback: function (e, t) {
                    if (e) {
                        var a = this.callbackList[e].callback;
                        a && (a(t), delete this.callbackList[e])
                    }
                }
            }, VIP.Brand = function (e) {
                mstRequire.load(e, "Brand", function (e) {
                    new VIP.Brand(e)
                })
            }, VIP.Product = function (e) {
                mstRequire.load(e, "Product", function (e) {
                    new VIP.Product(e)
                })
            }, VIP.hercules = function (e) {
                VIP.defaultParam.is_app && mstRequire.load(e, "hercule", function (e) {
                    if (e.type && e.name) {
                        var t = VH[e.type][e.name];
                        e.param ? t(e.param, e.succ, e.fail) : t(e.succ, e.fail)
                    } else console.log("hercules 缺少参数：type 或者 name！")
                })
            }, VIP.getResysData = function (e) {
                var t = $.extend(e.reqData, e.page);
                $.ajax({
                    url: e.url,
                    dataType: "jsonp",
                    data: t
                }).done(function (t) {
                    200 == t.code ? e.callback && e.callback(t) : console.log("爆款推荐获取接口失败, code : " + t.code)
                }).fail(function (e) {
                    console.log("爆款推荐获取接口失败")
                })
            }, VIP.fixImg = function (e, t) {
                var a = e;
                return e && "" != e && /(\.jpg|\.png|\.gif)$/.test(e) ? (e = a.indexOf("http://") > -1 ? "brand" == t || "logo" == t ? e.replace(/c.vpimg(\d).com/, "a$1.vimage1.com/upload/brand").replace(/[av].vpimg(\d).com/, "a$1.vimage1.com") : e.replace(/[a-cv].vpimg(\d).com/, "a$1.vimage1.com") : "http://a.appsimg.com/upload/brand/" + e, "brand" != t && "product" != t || (e = VIP.getClientImageSrc(e, t)), e) : ""
            }, VIP.Favorite = {
                getFavedList: function (e, t) {
                    var a = {
                        channel: VIP.defaultParam.is_app ? "app" : "wap",
                        mobile_platform: VIP.defaultParam.is_app ? 3 : 2,
                        mobile_channel: VIP.getQueryString("mobile_channel"),
                        user_token: VIP.getQueryString("user_token"),
                        warehouse: VIP.defaultParam.warehouse || window.config.data.page_data.warehouse || "VIP_NH",
                        app_version: VIP.defaultParam.app_version,
                        sale_platform: VIP.getQueryString("sale_platform"),
                        mars_cid: VIP.defaultParam.mars_cid
                    };
                    $.extend(a, e), a.page_id && $.ajax({
                        url: "http://mst.vip.com/Special/getFavouriteServiceList",
                        data: a,
                        dataType: "jsonp",
                        success: function (e) {
                            t && t(e)
                        }
                    })
                },
                doFavCoupon: function (e, t) {
                    var a = {
                        source: VIP.defaultParam.is_app ? 3 : 2,
                        client: VIP.defaultParam.client,
                        channel: VIP.defaultParam.is_app ? "app" : "wap",
                        mobile_platform: VIP.defaultParam.is_app ? 3 : 2,
                        mobile_channel: VIP.getQueryString("mobile_channel"),
                        user_token: VIP.getQueryString("user_token"),
                        warehouse: VIP.defaultParam.warehouse || window.config.data.page_data.warehouse || "VIP_NH",
                        app_version: VIP.defaultParam.app_version,
                        sale_platform: VIP.getQueryString("sale_platform"),
                        mars_cid: VIP.defaultParam.mars_cid
                    };
                    $.extend(a, e), a.act && a.brand_sn && a.brand_id && $.ajax({
                        url: "http://mst.vip.com/Special/favouriteServiceNew",
                        data: a,
                        dataType: "jsonp",
                        showLoading: !0,
                        success: function (e) {
                            t && t(e)
                        }
                    })
                },
                getFavBtn: function (e, t) {
                    return e.dom.find("." + e.favClass + "[" + e.attrPre + "-fav-id=" + t + "]")
                },
                doFav: function (e, t) {
                    var a = {
                        source: VIP.defaultParam.is_app ? 3 : 2,
                        client: VIP.defaultParam.client,
                        channel: VIP.defaultParam.is_app ? "app" : "wap",
                        mobile_platform: VIP.defaultParam.is_app ? 3 : 2,
                        mobile_channel: VIP.getQueryString("mobile_channel"),
                        user_token: VIP.getQueryString("user_token"),
                        warehouse: VIP.defaultParam.warehouse || window.config.data.page_data.warehouse || "VIP_NH",
                        app_version: VIP.defaultParam.app_version,
                        sale_platform: VIP.getQueryString("sale_platform"),
                        mars_cid: VIP.defaultParam.mars_cid
                    };
                    $.extend(a, e), a.act && a.brand_sn && a.brand_id && $.ajax({
                        url: "http://mst.vip.com/Brand/changeFavState",
                        data: a,
                        dataType: "jsonp",
                        showLoading: !0,
                        success: function (e) {
                            t && t(e)
                        }
                    })
                },
                render: function (e, t, a) {
                    var i = VIP.Favorite.getFavBtn(e, t);
                    "add" == a ? i.attr(e.attrPre + "-fav-type", "cancel").addClass(e.favClass + "-off") : "cancel" == a && i.attr(e.attrPre + "-fav-type", "add").removeClass(e.favClass + "-off")
                },
                handleDoFav: function (e, t, a) {
                    var i = e.data ? e.data[a] || e.data : e.data,
                        n = "",
                        o = "",
                        r = {},
                        s = i.pms_data,
                        d = VIP.Favorite.getFavBtn(t, a),
                        c = d.attr(t.attrPre + "-fav-type"),
                        l = parseInt(d.attr(t.attrPre + "-fav-coupon"));
                    if (e.result) e.code ? ("cancel" == i.type ? (n = "收藏成功！", l && (o = VIP.Coupon.handleDoCoupon(s, "", e.brand_id), n = o !== !1 ? n + o : n)) : n = "取消收藏成功", r = "cancel" == i.type ? VIP.Mars.get("blike|" + e.brand_id) : VIP.Mars.get("cblike|" + e.brand_id), Mar.Seed.request("mst", "click", "mst_brand_click", JSON.stringify(r))) : n = "收藏失败!请稍后再试。", n && VIP.notify_tips(n, 2e3), VIP.Favorite.render(t, i.brand_id, c);
                    else {
                        if (99 == e.code && "" != i._redirect) return VIP.Login.go(), !1;
                        n = "add" === i.type ? "取消" : "", VIP.notify_tips(n + "收藏失败！请稍微再试。", 2e3)
                    }
                }
            }, VIP.Coupon = {
                getList: function (e, t) {
                    var a = {
                        mars_cid: VIP.defaultParam.mars_cid,
                        wap_consumer: VIP.defaultParam.wap_consumer,
                        app_version: VIP.defaultParam.app_version
                    };
                    $.extend(a, e), $.ajax({
                        url: "http://mst.vip.com/Special/getCouponInfo",
                        data: a,
                        dataType: "jsonp",
                        success: function (e) {
                            t && t(e)
                        }
                    })
                },
                doCoupon: function (e, t) {
                    var a = {};
                    $.extend(a, e), a.brand_id && $.ajax({
                        url: "http://mst.vip.com/Brand/bindCoupon",
                        data: a,
                        dataType: "jsonp",
                        success: function (e) {
                            t && t(e)
                        }
                    })
                },
                handleDoCoupon: function (e, t, a) {
                    var i = "",
                        n = "",
                        o = "",
                        r = e.data;
                    if (1 == e.code) {
                        if (1 != e.num) return n = "领取成功", r && $.each(r, function (e, t) {
                            o += "<p>【￥" + t.fav + "】满" + t.buy + "可用；</p>"
                        }), o = r && e.num != r.length ? "<p>已领取(部分券已被抢光):</p>" + o : "<p>已领取" + e.num + "张券:</p>" + o, VIP.dialog({
                            title: n,
                            ctn: o
                        }), !1;
                        i = "已获得" + r[0].fav + "元优惠券，滿" + r[0].buy + "元可用。"
                    } else {
                        if (13332 == e.code) return console.log("领券失败！code:" + e.code), !1;
                        i = e.msg, console.log("领券失败！code:" + e.code)
                    }
                    return i
                }
            }, VIP.dialog = function () {
                var e = $("#specialContent"),
                    t = '<div class="mst-dialog">                 <div class="mask"></div>                 <div class="mst-dialog-content">                     <div class="mst-dialog-head">${title}</div>                     <div class="mst-dialog-body">{{html ctn}}</div>                     <div class="mst-dialog-btn">确定</div>                 </div>             </div>';
                $.tmpl();
                return e.on("click", ".mst-dialog .mask,.mst-dialog-btn", function () {
                        $(".mst-dialog").animate({
                            opacity: 0
                        }, 100, function () {
                            $(this).remove()
                        })
                    }),
                    function (a) {
                        var i = $.tmpl(t, a);
                        e.append(i), i.fadeIn(300).show()
                    }
            }(), VIP["interface"] = {
                Favorite: VIP.Favorite
            }, VIP.floatLayer = function () {
                var e = $("#specialContent"),
                    t = '<div class="mst-layer">                 <div class="mst-layer-content">                     <div class="mst-layer-title u-border-b">${title}</div>                     <div class="mst-layer-body">{{html ctn}}</div>                     <div class="mst-layer-footer">                        <button class="mst-layer-btn mst-layer-btn-cancel">关闭</button>                    </div>                 </div>             </div>';
                $.tmpl();
                return e.on("click", ".mst-layer .mst-layer-btn-cancel", function () {
                        $(".mst-layer").animate({
                            opacity: 0
                        }, 100, function () {
                            $(this).remove()
                        })
                    }),
                    function (a) {
                        var i = $.tmpl(t, a);
                        e.append(i), i.fadeIn(300).show()
                    }
            }(), VIP.Login = {
                check: function (e, t) {
                    $.ajax({
                        url: "http://mst.vip.com/Special/checkLoginStatus",
                        dataType: "jsonp",
                        data: e
                    }).done(function (e) {
                        return t ? void t(e) : (e.result || VIP.Login.go(), e.result)
                    }).fail(function () {
                        console.log("检查用户接口失败！")
                    })
                },
                popup: function () {
                    "undefined" != typeof loginDeal ? VIP.Login.showPopup() : $.getScript("https://mlogin.vip.com/asserts/js/login-deal.min.js", function () {
                        $("<link>").attr({
                            rel: "stylesheet",
                            type: "text/css",
                            href: "https://mlogin.vip.com/asserts/css/login.css"
                        }).appendTo("head"), VIP.Login.showPopup()
                    })
                },
                showPopup: function () {
                    loginDeal.go({
                        usePop: !0,
                        needReg: !1,
                        isWeixinLogin: !0,
                        isviva: !1,
                        backUrl: encodeURIComponent(location.href),
                        onWinLogin: function () {},
                        onBeforeJumpLogin: function () {}
                    }), VIP.Loading.hide()
                },
                go: function () {
                    var e = VIP.getConfigValueByKey("extend", "switch", "is_popup_login");
                    VIP.defaultParam.is_app ? window.location.href = "vipshop://login" : "1" === e ? VIP.Login.popup() : window.location.href = "https://mlogin.vip.com/user-login.html?&back_act=" + encodeURIComponent(location.href)
                }
            }, VIP.Loading = function () {
                return $("body").append(VIP.tmpl.loading), {
                    dom: $("#J-mst-global-loading"),
                    show: function () {
                        this.dom.fadeIn(200)
                    },
                    hide: function () {
                        this.dom.fadeOut(200)
                    }
                }
            }(), VIP.init = function () {
                return $.ajaxSetup({
                        beforeSend: function (e, t) {
                            t.showLoading && VIP.Loading.show()
                        },
                        complete: function () {
                            VIP.Loading.hide()
                        }
                    }),
                    function () {}
            }(), VIP.Rem = {
                adaption: function () {
                    function e() {
                        var e = o.getBoundingClientRect().width;
                        e / d > 540 && (e = 540 * d);
                        var t = e / 10;
                        o.style.fontSize = t + "px", l.rem = a.rem = t
                    }
                    var t, a = window,
                        i = window.mst_lib || (window.mst_lib = {}),
                        n = a.document,
                        o = n.documentElement,
                        r = n.querySelector('meta[name="viewport"]'),
                        s = n.querySelector('meta[name="flexible"]'),
                        d = 0,
                        c = 0,
                        l = i.flexible || (i.flexible = {});
                    if (r) {
                        console.warn("将根据已有的meta标签来设置缩放比例");
                        var p = r.getAttribute("content").match(/initial\-scale=([\d\.]+)/);
                        p && (c = parseFloat(p[1]), d = parseInt(1 / c))
                    } else if (s) {
                        var u = s.getAttribute("content");
                        if (u) {
                            var m = u.match(/initial\-dpr=([\d\.]+)/),
                                f = u.match(/maximum\-dpr=([\d\.]+)/);
                            m && (d = parseFloat(m[1]), c = parseFloat((1 / d).toFixed(2))), f && (d = parseFloat(f[1]), c = parseFloat((1 / d).toFixed(2)))
                        }
                    }
                    if (!d && !c) {
                        var g = (a.navigator.appVersion.match(/android/gi), a.navigator.appVersion.match(/iphone/gi)),
                            h = a.devicePixelRatio;
                        d = g ? h >= 3 && (!d || d >= 3) ? 3 : h >= 2 && (!d || d >= 2) ? 2 : 1 : 1, c = 1 / d
                    }
                    if (o.setAttribute("data-dpr", d), !r)
                        if (r = n.createElement("meta"), r.setAttribute("name", "viewport"), r.setAttribute("content", "initial-scale=" + c + ", maximum-scale=" + c + ", minimum-scale=" + c + ", user-scalable=no"), o.firstElementChild) o.firstElementChild.appendChild(r);
                        else {
                            var _ = n.createElement("div");
                            _.appendChild(r), n.write(_.innerHTML)
                        }
                    a.addEventListener("resize", function () {
                        clearTimeout(t), t = setTimeout(e, 300)
                    }, !1), a.addEventListener("pageshow", function (a) {
                        a.persisted && (clearTimeout(t), t = setTimeout(e, 300))
                    }, !1), "complete" === n.readyState ? n.body.style.fontSize = 12 * d + "px" : n.addEventListener("DOMContentLoaded", function (e) {
                        n.body.style.fontSize = 12 * d + "px"
                    }, !1), e(), l.dpr = a.dpr = d, l.refreshRem = e, l.rem2px = function (e) {
                        var t = parseFloat(e) * this.rem;
                        return "string" == typeof e && e.match(/rem$/) && (t += "px"), t
                    }, l.px2rem = function (e) {
                        var t = parseFloat(e) / this.rem;
                        return "string" == typeof e && e.match(/px$/) && (t += "rem"), t
                    }
                },
                fixViewPort: function () {
                    var e = VIP.getQueryString("ipadWidth") ? VIP.getQueryString("ipadWidth") : "device-width";
                    $("meta[name=viewport]").length ? $("meta[name=viewport]").attr("content", "width=" + e + ", initial-scale=1.0, minimum-scale=1.0 , maximum-scale=1.0, user-scalable=no") : $("head").append('<meta name="viewport" content="width=' + e + ', initial-scale=1.0, minimum-scale=1.0 , maximum-scale=1.0, user-scalable=no">'), "function" == typeof window._set_font_size_750 && window._set_font_size_750()
                },
                init: function () {
                    this.fixViewPort(), this.adaption()
                }
            }, VIP.Rem.init(), win.config && win.config.data && (VIP.easterEggs = {
                count: 0,
                timing: 0,
                info: {
                    page_id: {
                        label: "专题id",
                        data: config.data.id
                    },
                    special_name: {
                        label: "专题名称",
                        data: $("title").text()
                    },
                    start_time: {
                        label: "开始时间",
                        data: config.data.page_data.start_time
                    },
                    end_time: {
                        label: "结束时间",
                        data: config.data.page_data.end_time
                    },
                    warehouse: {
                        label: "分仓",
                        data: VIP.defaultParam.warehouse
                    },
                    user_type: {
                        label: "用户类型",
                        data: config.extend.user_type.user_type
                    },
                    cdi_type: {
                        label: "用户群体",
                        data: config.extend.cdi_type.join(",")
                    },
                    net: {
                        label: "网络环境",
                        data: VIP.defaultParam.net
                    },
                    client: {
                        label: "客户端",
                        data: VIP.defaultParam.client
                    },
                    app_name: {
                        label: "App名称",
                        data: VIP.defaultParam.app_name
                    },
                    app_version: {
                        label: "App版本",
                        data: VIP.defaultParam.app_version
                    },
                    brands: {
                        label: "页面档期数",
                        data: []
                    },
                    products: {
                        label: "页面商品数",
                        data: []
                    },
                    log: {
                        label: "组件报错信息",
                        data: []
                    }
                },
                timedCount: function () {
                    this.count < 9 ? (this.count += 1, console.log(this.count), this.timing = setTimeout(function () {
                        VIP.easterEggs.timedCount()
                    }, 1e3)) : 9 == this.count ? (this.showInfo(this.info), this.resetTime()) : this.resetTime()
                },
                resetTime: function () {
                    this.count = 0, clearTimeout(VIP.easterEggs.timing)
                },
                showInfo: function (e) {
                    var t = '<li class="u-border-b">${label}: ${data}</li>',
                        a = $("<ul></ul>"),
                        i = "";
                    $.each(e, function (e, n) {
                        n.data && n.data.length && (i = $.tmpl(t, n), a.append(i))
                    }), VIP.floatLayer({
                        title: "彩蛋信息",
                        ctn: a[0].outerHTML
                    }), $("html").addClass("scroll-fix")
                },
                show: function () {
                    this.showInfo(this.info)
                }
            }), win.renderer = new Renderer, win.config && win.renderer.init({
                config: win.config
            })
    }),
    function (e, t, a, i) {
        var n = e(t);
        e.fn.lazyload = function (o) {
            function r() {
                var t = 0;
                d.each(function () {
                    var a = e(this);
                    if (!c.skip_invisible || a.is(":visible"))
                        if (e.abovethetop(this, c) || e.leftofbegin(this, c));
                        else if (e.belowthefold(this, c) || e.rightoffold(this, c)) {
                        if (++t > c.failure_limit) return !1
                    } else a.trigger("appear"), t = 0
                })
            }
            var s, d = this,
                c = {
                    threshold: 0,
                    failure_limit: 0,
                    event: "scroll",
                    effect: "show",
                    container: t,
                    data_attribute: "original",
                    skip_invisible: !1,
                    appear: null,
                    load: null,
                    placeholder: "http://mst.vip.com/demo/image/placeholder.png"
                };
            return o && (i !== o.failurelimit && (o.failure_limit = o.failurelimit, delete o.failurelimit), i !== o.effectspeed && (o.effect_speed = o.effectspeed, delete o.effectspeed), e.extend(c, o)), s = c.container === i || c.container === t ? n : e(c.container), 0 === c.event.indexOf("scroll") && s.bind(c.event, function () {
                return r()
            }), this.each(function () {
                var t = this,
                    a = e(t);
                t.loaded = !1, a.attr("src") !== i && a.attr("src") !== !1 || a.is("img") && a.attr("src", c.placeholder), a.one("appear", function () {
                    if (!this.loaded) {
                        if (c.appear) {
                            var i = d.length;
                            c.appear.call(t, i, c)
                        }
                        e("<img />").bind("load", function () {
                            var i = a.attr("data-" + c.data_attribute);
                            a.hide(), a.is("img") ? a.attr("src", i) : a.css("background-image", "url('" + i + "')"), a[c.effect](c.effect_speed), t.loaded = !0;
                            var n = e.grep(d, function (e) {
                                return !e.loaded
                            });
                            if (d = e(n), c.load) {
                                var o = d.length;
                                c.load.call(t, o, c)
                            }
                        }).attr("src", a.attr("data-" + c.data_attribute))
                    }
                }), 0 !== c.event.indexOf("scroll") && a.bind(c.event, function () {
                    t.loaded || a.trigger("appear")
                })
            }), n.bind("resize", function () {
                r()
            }), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && n.bind("pageshow", function (t) {
                t.originalEvent && t.originalEvent.persisted && d.each(function () {
                    e(this).trigger("appear")
                })
            }), /(?:iphone|ipod|ipad).*os 8/gi.test(navigator.appVersion) ? r() : e(a).ready(function () {
                r()
            }), this
        }, e.belowthefold = function (a, o) {
            var r;
            return r = o.container === i || o.container === t ? (t.innerHeight ? t.innerHeight : n.height()) + n.scrollTop() : e(o.container).offset().top + e(o.container).height(), r <= e(a).offset().top - o.threshold
        }, e.rightoffold = function (a, o) {
            var r;
            return r = o.container === i || o.container === t ? n.width() + n.scrollLeft() : e(o.container).offset().left + e(o.container).width(), r <= e(a).offset().left - o.threshold
        }, e.abovethetop = function (a, o) {
            var r;
            return r = o.container === i || o.container === t ? n.scrollTop() : e(o.container).offset().top, r >= e(a).offset().top + o.threshold + e(a).height()
        }, e.leftofbegin = function (a, o) {
            var r;
            return r = o.container === i || o.container === t ? n.scrollLeft() : e(o.container).offset().left, r >= e(a).offset().left + o.threshold + e(a).width()
        }, e.inviewport = function (t, a) {
            return !(e.rightoffold(t, a) || e.leftofbegin(t, a) || e.belowthefold(t, a) || e.abovethetop(t, a))
        }, e.extend(e.expr[":"], {
            "below-the-fold": function (t) {
                return e.belowthefold(t, {
                    threshold: 0
                })
            },
            "above-the-top": function (t) {
                return !e.belowthefold(t, {
                    threshold: 0
                })
            },
            "right-of-screen": function (t) {
                return e.rightoffold(t, {
                    threshold: 0
                })
            },
            "left-of-screen": function (t) {
                return !e.rightoffold(t, {
                    threshold: 0
                })
            },
            "in-viewport": function (t) {
                return e.inviewport(t, {
                    threshold: 0
                })
            },
            "above-the-fold": function (t) {
                return !e.belowthefold(t, {
                    threshold: 0
                })
            },
            "right-of-fold": function (t) {
                return e.rightoffold(t, {
                    threshold: 0
                })
            },
            "left-of-fold": function (t) {
                return !e.rightoffold(t, {
                    threshold: 0
                })
            }
        })
    }(jQuery, window, document);