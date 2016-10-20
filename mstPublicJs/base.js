'use strict';

/**
 * 2016-05-03 增加组件按需加载模式， wiki：http://wiki.corp.vipshop.com/pages/viewpage.action?pageId=124972582
 */


$(function() {// domready 才执行

    var $ = jQuery,
        win = window,
        doc = document,
        VIP,
        mstHost = 'http://mst.vip.com';

    VIP = win.VIP = win.VIP || {};

    win.mstRequire = win.mstRequire || {
        path : {// 外部js的路径
            hercule : mstHost + '/demo/js/hercules.js',
            brand : mstHost + '/demo/js/modules/brand.js',
            product : mstHost + '/demo/js/modules/product.js'
        }
    };

    $.extend(win.mstRequire , {// 扩展 各个外部js加载后的回调方法，load方法加载js
        hercule : {
            callbackList : []
        },
        brand : {
            // loading : true,
            callbackList : []
        },
        product : {
            // loading : true,
            callbackList : []
        },
        load : function (params, type, callback) {
            // mstRequire: { path: {hercule:..., brand:...}, hercule: {callbackList: [], loaded: false, loading: false}, ..}
            var self = this,
                subType = type.toLowerCase(),
                module = self[subType]; // eg: mstRequire.brand

            if(self.path[subType] != ''){// eg: mstRequiere.path.brand

                // 登录完直接用
                if(module.loaded) {// brand:  {loaded, callbackList}
                    callback && callback(params);
                }else{
                    module.callbackList.push(params); // [opts1, opts2, ...]

                    if(!module.loading){
                        module.loading = true;

                        $.ajax({// 用script标签加载对应js
                            url : self.path[subType],
                            dataType : 'script',
                            cache : true
                        })
                        .success(function() {
                            module.loaded = true;

                            // console.log('调用brand.js， 成功');
                            $.each(module.callbackList, function(index, val) {
                                callback && callback(val);
                            });

                            module.callbackList = [];
                            module.loaded = true;
                        })
                        .fail(function(e) {
                            console.log(subType + ".js 调用失败！", 'status: ' + e.status);
                        });
                    }
                }
            }
        }
    });


    var container = $('#specialContent');

    function Renderer() {}

    $.extend(Renderer.prototype, {
        isInited: false,

        nextReloadTime: 0,

        // 加载组件的高度
        pluginHeight : 0,

        pluginIndex : 0,

        // 组件的dom列表
        pluginList : [],

        threshold : 1000,

        userScroll : false,

        // 预加载的高度
        preloadHeight : (document.documentElement.clientHeight * 1.5),

        init: function(opts) {
            var that = this;

            this.config = opts.config;
            this.container = container;

            this.render();
            this.bind();
            this.setMars();
            this.initEasterEggs();

            // 100毫秒后执行预加载
            setTimeout(function() {
                that.preload();
            }, 100);
            // this.initReload();
        },

        initReload: function(){// 检测当前时间 是否跨时段，是则刷新页面
            var morning = new Date,
                evening = new Date,
                tomorrow = new Date,
                now = +new Date,
                threshold = Math.round(Math.random()*300000),
                nextReloadTime;

            morning.setMinutes(0);
            morning.setHours(10);
            morning = +morning;
            evening.setMinutes(0);
            evening.setHours(20);
            evening = +evening;
            tomorrow.setMinutes(0);
            tomorrow.setHours(10);
            tomorrow = +tomorrow + 24*60*60*1000;

            if(now < morning){
                nextReloadTime = morning + threshold;
            } else if(now > evening){
                nextReloadTime = tomorrow + threshold;
            } else{
                nextReloadTime = evening + threshold;
            }

            var interval = setInterval(function(){
                var now = +new Date;

                if(now > nextReloadTime){
                    location.reload();
                }

            }, 1000)
        },

        render: function() {
            var that = this,
                // 获取moduleList  config为module 则为[this.config], 做仅有1个组件的页面对待
                list = this.config.module_type_id ? [this.config] : this.config.data.moduleList,
                lastModule,
                isFirstHead = true,
                except = ['custom_config', 'share'], // 自定义组件 或 分享组件
                $headGroup = $('<div></div>').addClass('plugin-head-group'); // 头图组容器

            if(VIP.getQueryString('inChannel') === '1'){
                $('body').addClass('mst-ipad-channel');
            }

            // 直接输出CSS  #specialcontent 插入 window.config.data.cssList的内容
            that.appendCss();
            // 检测最后一个分页的组件
            for (var i = list.length - 1; i >= 0; i--) {//::标记每屏 最后的组件 isLast
                if(that.checkLastModule(list[i])){ // 根据 module.extend.page.isPaging 为true, 设置 module.isLast = true;
                    break;
                }
            }

            $.each(list, function(key, value) {// 遍历 moduleList
                var layout,
                    width,
                    height,
                    percent,
                    relaWidth = isFirstHead || document.documentElement.clientWidth <= 540 ? (document.documentElement.clientWidth > 632 ? 632 : document.documentElement.clientWidth) : 540,
                    $dom = $('<div></div>').addClass('plugin'), // 组件容器div
                    canHoldHeight = except.indexOf(value.module_type_id) == -1, //组件是否能占高度
                    grade = value.module_type_id == 'share' ? '1' : ((value.extend && value.extend.grade) || '3'); // 样式优先级
                // oRender.pluginList -> [$pluginEle1, $pluginEle2, ..]
                that.pluginList.push($dom.attr('data-index', key));

                // 检测组件的生存时间
                if(!that.checkLiveTime(value)){//:: 活动结束的组件 不渲染
                    return true;
                }

                // 获取组件实际高度
                layout = value.extend ? (value.extend.layout || {}) : {};
                percent = relaWidth / (layout.width || 0),
                height = parseInt((layout.height || 0) * percent) || 0;

                // 渲染结构
                switch(value.module_type_id){
                    case 'head'://::头图组件
                        if(isFirstHead){
                            height && $headGroup.height(height);
                            isFirstHead = false;

                            $headGroup.appendTo(that.container).append($dom);
                        }else{
                            if(canHoldHeight){
                                height && $dom.height(height);
                            }

                            $dom.appendTo(that.container);// 组件容器 append到 #specialcontent
                        }

                        break;
                    default://::其他组件
                        if(canHoldHeight){
                            height && $dom.height(height);
                        }

                        $dom.appendTo(that.container);
                        break;
                }

                // 加载一屏半的组件
                if(that.pluginHeight <= that.preloadHeight) {
                    if(canHoldHeight){
                        that.pluginHeight += height;
                    }

                    that.pluginIndex++;

                    that.createModule(value,key);

                    // that.clearDomHeight($headGroup,3000);

                    that.clearDomHeight($dom);
                }

                // 除了首屏以外，等级为1的都需要优先加载
                if(grade == '1'){
                    that.createModule(value,key);
                    that.clearDomHeight($dom);
                }
            });

            that.handleLast();// $body.append($tipsDiv)
        },

        handleLast : function (isLast) {
            var that = this,
                tipsHtml = '<div id="J_notify_tips" class="notify-tips"></div>';

            $('body').append(tipsHtml);
        },

        checkLastModule : function (config) {// module: {extend:{page: {isPaging: true}}} => module.isLast = true
            if(config.extend && config.extend.page && config.extend.page.isPaging == 'true'){
                config.isLast = true;
                return true;
            }

            return false;
        },

        createModule: function(config, index) {
            // 这里的config为module 有别与window.config
            if(config.isLoaded) return;

            var that = this,
                $dom = this.pluginList[index],
                moreHtml = '<div class="u-loading u-more-btn J_pager_more"></div>',
                css = config.css,

                // config.template为空串 则表明应该从 window.config.data.htmlList提取
                template = (config.template == '' && config.style_id) ? window.config.data.htmlList[config.style_id] : config.template,
                // config.js 同上
                js = (config.js == '' && config.style_id) ? window.config.data.jsList[config.style_id] : config.js;

            // 组件容器div标记loaded 插入html
            $dom.attr('data-loaded', 'true').append(template);

            // 兼容就情况
            if(css != '') {
                css = VIP.modelX(css);   //TODO

                // config.css不为空 则需修正 rem大小 用<style>标签插入到容器div内
                $dom.append(this.getCssString(css));
            }

            if(config.isLast){// config.isLast 则提示加载更多
                $dom.append(moreHtml);
            }

            config.isLoaded = true;

            // 插入dom元素后，执行js
            try{ // eval config.js的内容 转换为函数 并执行
                eval('(function(){return function(dom, config, index){' + js + '}})()').call($dom, $dom, config, index);
            }catch(e){
                console.log(e.message);
                VIP.defaultParam.log.push(e.message);
            }

            /**
             * 设置 lazy-load
             * 设置50毫秒延迟是，保证执行成功
             */
            setTimeout(function() {// 设置图片懒加载
                $dom.find("img.mst-lazy").lazyload({
                    threshold : that.threshold,
                    // effect : "fadeIn",
                    load : function () {
                        this.removeAttribute('height');
                    }
                });
            }, 50);
            // 初始化埋点
            this.initMars($dom, config, index);
        },

        getCssString: function(css) {// 拼接style标签
            return "<style>" + css + "</style>";
        },

        checkToReload: function(){

        },
        // oRender.config.data.cssList
        appendCss : function() {// window.config.data.cssList 内容插入 #specialcontent
            var that = this,
                cssList = that.config.data.cssList || [],
                css = '';

            // console.log(cssList);

            if(cssList){
                $.each(cssList, function(key, value) {
                    // css += value;
                    css += '\n'+VIP.modelX(value);   //TODO  根据@model-base ....,  rem单位大小调整
                });

                that.container.append(that.getCssString(css)); 
            }
        },

        bind : function () {// touchstart scroll时 预加载
            var that = this;

            $(win).bind('touchstart touchmove scroll', function (e) {
                that.preload();
            });
        },
        // 若组件即将出现在视口中 则加载
        preload : function () {
            var that = this,
                st = doc.body.scrollTop;

            that.userScroll = true;

            that.container.find('.plugin').each(function(key, value) {
                if(this.getAttribute('data-loaded')){
                    return
                }
                // 对于没有标记loaded的容器div
                var $this = $(this),
                    index = $this.attr('data-index');
                // 若即将出现在视口中 则加载
                if((st + doc.documentElement.clientHeight + that.threshold) >= $this.offset().top){
                    that.createModule(config.data.moduleList[index], index); // 从window.config.data.moduleList中取对应的module
                    that.clearDomHeight(that.pluginList[index]);
                }
            })
        },

        clearDomHeight : function($dom, time) {// div.plugin height: auto
            var that = this,
                time = time || 1000;

            setTimeout(function () {
                $dom.css({height : 'auto'}).addClass('plugin-loaded');
            }, time);
        },

        setMars : function() {// 已加载组件的图片全部加载完的时间 作为埋点数据发送
            if(typeof window.mstDomStartTime == 'undefined'){
                return
            }

            var that = this,
                $imgs = that.container.find('img'),
                lazyImgs = [],
                len = $imgs.length,
                cnt = 0,
                time,
                mstDomStartTime = window.mstDomStartTime || 0,
                responseTime = performance ? (performance.timing.responseEnd - performance.timing.navigationStart) : 0;

            $imgs.each(function(key, value) {
                var $this = $(this),
                    $img = $(new Image());

                lazyImgs.push($img);

                // alert($this.attr('data-original') || $this.attr('src'));

                $img.attr('src', $this.attr('data-original') || $this.attr('src'));

                $img.bind('load',function () {
                    cnt++;

                    // alert(cnt);

                    // console.log(cnt,this.src);
                    // alert(this.src)

                    if(cnt == len) {
                        time = new Date().getTime() - (window.mstDomStartTime || 0) + responseTime;
                        Mar.Seed.request("mst","click",'mst_firstScreen_time', time);
                        // alert('time : ' + time + ', len : ' + len);
                        // console.log('time : ' + time + ', len : ' + len);
                    }
                })
            });
        },
        checkLiveTime : function (config) {
            // module 是否在时间范围内 window.config.extend.server_time [module.model.live.sart_time, module.modle.live.end_time]
            if(!window.config || !window.config.extend) return true;

            var serverTime = window.config.extend.server_time ? parseInt(window.config.extend.server_time) : false;

            if(serverTime && config.model && config.model.live){
                var startDate = config.model.live.start_time ? VIP.stringToDate(config.model.live.start_time) : false,
                    endDate = config.model.live.end_time ? VIP.stringToDate(config.model.live.end_time) : false,
                    startTime = startDate ? startDate.getTime() / 1000 : false,
                    endTime = endDate ? endDate.getTime()/1000 : false;

                if(startTime && serverTime < startTime || endTime && serverTime > endTime){
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        },
        // 自动化埋点初始化  
        initMars : function ($dom, config, index) {
            // 组件容器div下的 [mst-mars], 绑定点击 发送埋点数据(来自属性节点 和 url参数 和 组件类型)
            var winConfig = window.config,
                that = this;

            if(!winConfig) {
                return
            }

            VIP.Mars.set(index);

            ++index;

            // 设置点击埋点
            $dom.on('click','[mst-mars]', {}, function (e) {
                var $this = $(this),
                    $target = $(e.target),
                    $mars = $dom.find('[mst-mars]'), // .plugin [mst-mars]
                    $curMars = typeof $this.attr("mst-mars") == "undefined" ? $target.parents('[mst-mars]:eq(0)') : $this,
                    seq = +$mars.index($curMars) + 1,
                    rank = +index + '_' + seq,
                    mars = VIP.Mars.get($curMars.attr('mst-mars'),rank), // <element mst-mars="" mst-tag="">..
                    tag = $curMars.attr('mst-tag'),
                    urlTag = VIP.getQueryString('extra_tag') ? VIP.getQueryString('extra_tag') + ',' : '',
                    curTag = urlTag + tag,
                    other = {
                        "module" : index + "",
                        "seq" : seq + "",
                        "tag" : curTag
                    },
                    seed = 'mst_' + config.module_type_id + '_click'; // mst_brand_click

                mars = $.extend(mars, other);
                // console.log($target[0].tagName.toLowerCase(),seed,JSON.stringify(mars));

                Mar.Seed.request($target[0].tagName.toLowerCase(),"click", seed , JSON.stringify(mars));
            })
        },

        //彩蛋初始化
        initEasterEggs: function(){
            if (VIP.easterEggs) {
                VIP.easterEggs.info.log.data = VIP.defaultParam.log;
                VIP.easterEggs.info.brands.data = $.map(config.data.moduleList, function(v, i) {// 遍历moduleList
                    if (v.module_type_id == 'brand' || v.module_type_id == 'brand_with_product') {// 若为档期
                        v.data = $.map(v.data, function(data, i) {// module.data
                            if (!data.hide) return data; // item.hide
                        })
                        return v.extend.page && v.extend.page.isPaging == 'true' ? v.data.length + '(第一页)' : v.data.length;
                    }
                });
                VIP.easterEggs.info.products.data = $.map(config.data.moduleList, function(v, i) {
                    if (v.module_type_id == 'product' || v.module_type_id == 'pg_product' || v.module_type_id == 'pg_product_pc') {
                        v.data = $.map(v.data, function(data, i) {
                            if (!data.hide) return data;
                        })
                        return v.extend.page && v.extend.page.isPaging == 'true' ? v.data.length + '(第一页)' : v.data.length;
                    }
                });

                $('body').on('touchstart', function(e) {
                    if (e.originalEvent.touches.length == 3) {
                        VIP.easterEggs.timedCount();
                    }
                }).on('touchend', function() {
                    VIP.easterEggs.resetTime();
                }).on('scroll', function(e) {
                    e.stopPropagation();
                }).on('click', '.mst-layer-btn-cancel', function(e) {
                    $('.mst-layer').animate({
                            opacity: 0
                        }, 100,
                        function() {
                            $(this).remove();
                        }
                    );
                    $('html').removeClass('scroll-fix');
                });
            }
        }
    })

    /**
     * model-x 模块像素编译器
     *
     * @param  {String}  css                需转换的css字符串
     * @param  {String}  options.modelBase  css所使用的基准值，优先获取css首行的@model-base规则的值，缺省值为100/640
     * @param  {String}  options.rootBase   页面最终使用的基准值，缺省值为75/750
     * @param  {Boolean} options.headerUsed 是否对转换后的css自动添加规则头，缺省值为true
     * @return {String}                     转换后的css字符串
     *
     * *model-base规则可能的值
     * @model-base 640;                 正常版，等同于@model-base 100/640;
     * @model-base 100/640;             完整版，表示当前css编写时所使用的基准值
     * @model-base 75/750 from 100/640; 编译版，from参数代表转换前的基准值
     *
     * *关于基准
     * 模块开发时，参考的设计稿为750，并定义1rem = 100px = 100mx，则基准为100/750
     *
     */
    ;(function(){
        /**
         * @model-base 75/750 from 100/640;
         * @type {RegExp}
         */
        var _at_rule = /@model-base\s*((\d+\/)?\d+)\s*(from\s*(\d+\/)?\d+\s*)?;/i;

        /**
         * rem或mx单位的数字
         * @type {RegExp}
         */
        var _number  = /[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?(rem|mx)/ig;

        /**
         * 全局缺省的基准
         * @type {String}
         */
        var _rootBase_default  = '75/750';

        /**
         * 模块缺省的基准
         * @type {String}
         */
        var _modelBase_default = '100/640';

        /**
         * 基准校验
         * @param  {String}
         * @return {String}
         */
        var _baseCheck = function(base){
            switch(true){
                //分母为0的情况
                case /^(\d+\/)?0$/.test(base):
                return null;

                //'100/640'的情况
                case /^\d+\/\d+$/.test(base):
                return base;

                //'640'的情况
                case /^\d+$/.test(base):
                return '100/' + base;
            }
            return null;
        }

        /**
         * 获取模块基准信息
         * @param  {String} 模块的基准
         * @param  {String} 全局的基准
         * @return {Object}
         */
        var _getModelInfo = function(modelBase, rootBase){
            modelBase = _baseCheck(modelBase) || _modelBase_default;
            rootBase  = _baseCheck(rootBase)  || _rootBase_default;

            return {
                rule  : '@model-base ' + rootBase + ' from ' + modelBase + ';',
                ratio : eval('('+modelBase+')/('+rootBase+')')
            }
        }

        var _modelX = function(css, options){
            options = options || {};
            if(typeof css !== 'string') return '';
            if(typeof options.headerUsed === 'undefined') options.headerUsed = true; // 默认为true

            return css.split(/(?=@model-base)/i).map(function(css){
                var rule = css.match(_at_rule)   || [];
                var info = _getModelInfo(rule[1] || options.modelBase, options.rootBase);

                //单位数值比率换算
                var unit = {
                    rem : info.ratio,
                    mx  : info.ratio/100
                }

                //比率相同（比如模块基准等于页面基准），而且是被编译过的(有from关键字)，或者是空白符(空格、换行)，则不处理
                if(info.ratio===1 && /from/.test(rule[0]) || /^\s+$/.test(css)) return css;

                return  (options.headerUsed ? info.rule : '')
                        + css
                        .replace(_at_rule, '')
                        .replace(_number, function(){
                            return parseFloat(arguments[0])*unit[arguments[3]] + 'rem';
                        })
            }).join('');

        }

        if(typeof VIP !== 'undefined'){
            VIP.modelX = _modelX;
        }

    })();

    VIP.getBrandUrl = function(brandId) {
        // var is_wap = VIP.defaultParam.client === 'wap';
        // return is_wap ? 'http://m.vip.com/brand-' + brandId + '-0-0-0-1-0-1-20.html' : 'vipshop://shBrandProducts?brandId='+ brandId +'&brandName=';
        return "http://m.vip.com/brand-" + brandId + "-0-0-0-1-0-1-20.html?m=brand&brand_id=" + brandId;
    }

    VIP.getProductUrl = function(brand_id, product_id) {
        // var wapUrl = 'http://m.vip.com/product-' + brand_id + '-' + product_id + '.html';
        // return VIP.getReplaceHref(wapUrl);
        return "http://m.vip.com/product-" + brand_id + "-" + product_id + ".html?m=product&brand_id=" + brand_id + "&product_id=" + product_id;
    }

    VIP.getQueryString = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    VIP.loadScript = function(url, callback) {
        var script = document.createElement("script");

        script.type = "text/javascript";
        script.onload = function() {
            callback();
        };
        script.src = url;
        document.body.appendChild(script);
    }

    VIP.cookie = function(name, value, options) {
        if (typeof value != 'undefined') { // name and value given, set cookie
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
            }
            var path = options.path ? '; path=' + options.path : '';
            var domain = options.domain ? '; domain=' + options.domain : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else { // only name given, get cookie
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    }

    /**
     * 根据key 来获取config的value
     *
     */
    VIP.getConfigValueByKey = function () {
        if(!window.config) return '';

        var result = window.config;

        $.each(arguments, function (key, val) {
            result = result[val] ? result[val] : '';
        })

        return result;
    }

    /**
     * 设置专题的默认值
     * @return {[type]} [description]
     */
    VIP.initDefaulParam = function() {
        // 默认参数
        var date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            datestr = year + "" + month + "" + day,
            verstr = Math.ceil(new Date().getTime() / 1000 / 300),
            verstr = datestr + "" + verstr,
            width = this.getQueryString("width"),
            height = this.getQueryString("height"),
            client = this.getQueryString("client"),
            app_version = this.getQueryString("app_version"),
            app_name = this.getQueryString("app_name"),
            warehouse = this.getQueryString("warehouse") || VIP.getConfigValueByKey('data','page_data','warehouse') || 'VIP_NH',
            area_id = this.getQueryString("area_id"),
            net = this.getQueryString("net"),
            mars_cid = this.getQueryString("mars_cid"),
            is_preload = this.getQueryString("is_preload"),
            newcustomer = this.getQueryString("newcustomer"),
            wap_consumer = this.getQueryString("wap_consumer"),
            m_special = this.getQueryString("m"),
            referer_currurl = location.href.replace(/&/g, "%@^_"),
            wapurlpos = referer_currurl.indexOf("m.vip.com"),
            item_id = 3,
            source = "app",
            user_id = this.getQueryString("user_id"),
            clients = ['iphone','android','ipad','androidpad','windowsphone','windowspad'],
            isApp = clients.indexOf(client) > -1,
            isIphone = client == 'iphone',
            isAndroid = client == 'android',
            isIpad = client == 'ipad',
            isWindowsphone = client == 'windowsphone',
            isWindowspad = client == 'windowspad',
            isWeixin = /micromessenger/i.test(navigator.userAgent.toLowerCase()),
            mstTag = this.getQueryString("extra_tag"),
            wapId = this.getQueryString("wapid") || ('mst_' + VIP.getConfigValueByKey('data','id')),
            pageId = VIP.getConfigValueByKey('data','id'),
            specialId = VIP.getConfigValueByKey('data','build_id'),
            pageShowType = VIP.getConfigValueByKey('data','page_data','page_show_type');

        client = /^(phone|pad)$/.test(client) ? 'wap' : client;

        // ! client = wap, 判断逻辑是否存问题, modified by lexus
        // if(!window.location.search || client == "wap"){
        if (!window.location.search || m_special == "special" || parseInt(wapurlpos) > 1 || !client) {
            source = "wap";
            width = "640";
            height = "460";
            client = "wap";
            app_version = "4.0";
            app_name = "wap";
            warehouse = this.cookie('warehouse');
            area_id = this.cookie('m_vip_province');
            net = "WIFI";
            mars_cid = this.cookie('mars_cid');
            is_preload = "1";
            newcustomer = 0;
            wap_consumer = this.cookie('wap_consumer');
            user_id = "";
        }

        area_id = area_id ? area_id : 0;
        net = net ? net : "WIFI";

        this.defaultParam = {
            verstr: verstr,
            source: source,
            width: width,
            height: height,
            client: client,
            app_version: app_version,
            app_name: app_name,
            warehouse: warehouse,
            area_id: area_id,
            net: net,
            mars_cid: mars_cid,
            is_preload: is_preload,
            newcustomer: newcustomer,
            wap_consumer: wap_consumer,
            m_special: m_special,
            item_id: item_id,
            referer_currurl: referer_currurl,
            wapurlpos: wapurlpos,
            is_app : isApp,
            is_wap : client == 'wap',
            is_iphone : isIphone,
            is_android : isAndroid,
            is_ipad : isIpad,
            is_windowsphone : isWindowsphone,
            is_windowspad : isWindowspad,
            is_weixin : isWeixin,
            mst_mars : mstTag,
            wap_id : wapId,
            page_id : pageId,
            special_id : specialId,
            page_show_type : pageShowType,
            log : []
        }
    }

    VIP.notify_tips = function(message, time) {
        //默认时间处理
        var _time = time || 1000,
            $tips = $('#J_notify_tips'),
            isShowed = $tips.attr('isShowed');

        $tips.attr('isShowed', 'true').show().html(message);

        if(isShowed) {
            window.clearTimeout(window.timer);
        }

        window.timer = setTimeout(function() {
            $tips.removeAttr('isShowed').hide();
        }, _time);
    }

    VIP.getClientImageSrc = function(url,type) {
        if(url == '' || !url){
            return url
        }

        var type = type || 'brand',
            schedule = {
                "iphone": {
                    "2g": "604x290_50",
                    "3g": "604x290_50",
                    "2g/3g": "604x290_50",
                    "4g": "604x290_80",
                    "wifi": "604x290_80"
                },
                "windows": {
                    "2g": "604x290_50",
                    "3g": "604x290_50",
                    "2g/3g": "604x290_50",
                    "4g": "604x290_80",
                    "wifi": "604x290_80"
                },
                "ipad": {
                    "2g": "604x290_80",
                    "3g": "604x290_80",
                    "2g/3g": "604x290_80",
                    "4g": "604x290_80",
                    "wifi": "604x290_80"
                },
                "android": {
                    "2g": [{
                        "exp": "gl:eq:",
                        "condition": "1080",
                        "return": "604x290_50"
                    }, {
                        "exp": "gt:",
                        "condition": "1080",
                        "return": "456x576_50"
                    }],
                    "3g": [{
                            "exp": "gl:eq:",
                            "condition": "1080",
                            "return": "604x290_50"
                        },

                        {
                            "exp": "gt:",
                            "condition": "1080",
                            "return": "456x576_50"
                        }
                    ],
                    "2g/3g": [{
                            "exp": "gl:eq:",
                            "condition": "1080",
                            "return": "604x290_50"
                        },

                        {
                            "exp": "gt:",
                            "condition": "1080",
                            "return": "456x576_50"
                        }
                    ],
                    "4g": [{
                            "exp": "gl:eq:",
                            "condition": "1080",
                            "return": "604x290_80"
                        },

                        {
                            "exp": "gt:",
                            "condition": "1080",
                            "return": "456x576_80"
                        }
                    ],
                    "wifi": [{
                            "exp": "gl:eq:",
                            "condition": "1080",
                            "return": "604x290_80"
                        },

                        {
                            "exp": "gt:",
                            "condition": "1080",
                            "return": "456x576_80"
                        }
                    ]
                },
                "wap": {
                    "2g": "604x290_50",
                    "3g": "604x290_50",
                    "2g/3g": "604x290_50",
                    "4g": "604x290_80",
                    "wifi": "604x290_80"
                }
            },
            isProduct = url.indexOf('upload/merchandise') > -1 || type == 'product';

        if(isProduct){
            schedule = {
                "iphone": {
                    "2g": "304x384_50",
                    "3g": "304x384_50",
                    "2g/3g": "304x384_50",
                    "4g": "304x384_80",
                    "wifi": "304x384_80"
                },
                "windows": {
                    "2g": "304x384_50",
                    "3g": "304x384_50",
                    "2g/3g": "304x384_50",
                    "4g": "304x384_80",
                    "wifi": "304x384_80"
                },
                "ipad": {
                    "2g": "304x384_80",
                    "3g": "304x384_80",
                    "2g/3g": "304x384_80",
                    "4g": "304x384_80",
                    "wifi": "304x384_80"
                },
                "android": {
                    "2g": [{
                        "exp": "gl:eq:",
                        "condition": "1080",
                        "return": "304x384_50"
                    }, {
                        "exp": "gt:",
                        "condition": "1080",
                        "return": "456x576_50"
                    }],
                    "3g": [{
                            "exp": "gl:eq:",
                            "condition": "1080",
                            "return": "304x384_50"
                        },

                        {
                            "exp": "gt:",
                            "condition": "1080",
                            "return": "456x576_50"
                        }
                    ],
                    "2g/3g": [{
                            "exp": "gl:eq:",
                            "condition": "1080",
                            "return": "304x384_50"
                        },

                        {
                            "exp": "gt:",
                            "condition": "1080",
                            "return": "456x576_50"
                        }
                    ],
                    "4g": [{
                            "exp": "gl:eq:",
                            "condition": "1080",
                            "return": "304x384_80"
                        },

                        {
                            "exp": "gt:",
                            "condition": "1080",
                            "return": "456x576_80"
                        }
                    ],
                    "wifi": [{
                            "exp": "gl:eq:",
                            "condition": "1080",
                            "return": "304x384_80"
                        },

                        {
                            "exp": "gt:",
                            "condition": "1080",
                            "return": "456x576_80"
                        }
                    ]
                },
                "wap": {
                    "2g": "304x384_50",
                    "3g": "304x384_50",
                    "2g/3g": "304x384_50",
                    "4g": "304x384_80",
                    "wifi": "304x384_80"
                }
            }
        }

        var defaultParam = VIP.defaultParam,
            res = schedule[defaultParam.client.toLowerCase()][defaultParam.net.toLowerCase()],
            width = defaultParam.width,
            reg = /([\w\-\/\:\.]+)(\.(?:png|jpg|gif|bmp))$/i,
            match = url.match(reg),
            suffix, cur;

        // 设置默认裁剪
        if(isProduct){
            res = res || '304x384_50';
        }else{
            res = res || '604x290_50';
        }

        // 处理android 相关的裁剪
        if (!Array.isArray(res)) {
            suffix = res;
        } else {
            for (var i = 0; i < res.length; i++) {
                cur = res[i];

                switch (cur.exp) {
                    case "gl:eq:":
                        if (width <= cur.condition) {
                            suffix = cur.return;
                        }
                        break;
                    case "gl:":
                        if (width < cur.condition) {
                            suffix = cur.return;
                        }
                        break;
                    case "gt:":
                        if (width > cur.condition) {
                            suffix = cur.return;
                        }
                        break;
                }
            };
        }
        url = match[1] + '_' + suffix + match[2];

        return url;
    }

    VIP.isInSale = function(startTime) {
        var time = new Date().getTime(),
            startTime = new Date(startTime).getTime();

        if (time < startTime) {
            return false;
        }

        return true
    }

    VIP.getReplaceHref = function(wapUrl) {
        var is_wap = VIP.defaultParam.client === 'wap',
            match = wapUrl.match(/(\d+)-(\d+)/i),
            brandId = match[1],
            productId = match[2];

        // return is_wap ? "http://m.vip.com/product-"+ brandId +"-"+ productId + ".html" :
        //     "vipshop://showGoodsDetail?brandId="+ brandId +"&goodsId="+ productId +"&goodsType=&goodsTitle=";
        return "http://m.vip.com/product-" + brandId + "-" + productId + ".html?m=product&brand_id=" + brandId + "&product_id=" + productId;
    }

    VIP.getToSpecialTopicUrl = function(url) {
        if(url == '' || !url){
            return url
        }

        var defaults = VIP.defaultParam;
        if (url) {
            var suffix = "width=" + defaults.width + "&height=" + defaults.height + "&client=" + defaults.client + "&source=" + defaults.source + "&warehouse=" + defaults.warehouse + "&area_id=" + defaults.area_id + "&net=" + defaults.net + "&mars_cid=" + defaults.mars_cid + "&is_preload=" + defaults.is_preload + "&newcustomer=" + defaults.newcustomer + "&wap_consumer=" + defaults.wap_consumer + "&app_version=" + defaults.app_version;

            var separator = url.indexOf("?");
            if (separator > 0) {
                url = url + "&" + suffix;
            } else {
                url = url + "?" + suffix;
            }

            if (defaults.client == "wap") {
                //2014.05.30
                var validate_url_info = ["http://ap.vip.com/", "http://mzt.vip.com/", "http://upload.devcmstopic.com/", "http://mzt.vip.com/"];
                var goto_special_topic_url = "http://ap.vip.com/";
                for (var $i = 0; $i < validate_url_info.length; $i++) {
                    var validate_url = validate_url_info[$i];
                    var validate_url_pos = url.indexOf(validate_url);
                    if (validate_url_pos != "-1") {
                        goto_special_topic_url = validate_url;
                    } //end if
                } //end for
                var pos1 = url.indexOf(goto_special_topic_url);
                var pos2 = url.indexOf("exclusive_subject/te/");
                var wap_specialurl = "http://m.vip.com/index.php?m=special&p=";
                var p = "";
                if (pos1 >= 0 && pos2 > 0) {
                    var wap_exclusive_subject = goto_special_topic_url + "uploadfiles/exclusive_subject";
                    var len = wap_exclusive_subject.length;
                    p = url.substr(len);
                    var wap_pos = p.indexOf("?");
                    if (wap_pos > 0) {
                        p = p.substr(0, wap_pos);
                    }
                    if (p != "") {
                        url = wap_specialurl + p;
                    }
                    return url;
                } else {
                    return url;
                }
            } else {
                return url;
            }
        }
    }

    //通用链接模块
    //通用链接模块
    VIP.link = (function() {
        var _e = {},
            _p = {};

        //链接格式
        _e.SPECIAL = "http://msp.appvipshop.com/uploadfiles/exclusive_subject/te/v1/s{sid}_{wh}_index.php?wapid=mzt_{sid}&wh={VIP_WH}&title=唯品会";
        _e.SPECIAL_BLANK = "http://msp.appvipshop.com/uploadfiles/exclusive_subject/te/v1/s{sid}_{wh}_index.php?wapid=mzt_{sid}&wh={VIP_WH}&m=webview&title=唯品会";
        _e.PRODUCT = "vipshop://showGoodsDetail?brandId={brand}&goodsId={product}&goodsType=0&goodsTitle={title}&w={VIP_WH}";
        _e.BRAND = "vipshop://showBrandProducts?brandId={brand}&brandName={title}";

        _e.go = function(type, para, target, title, preData) {
            var defaultParam = VIP.defaultParam,
                isWeixin = /micromessenger/i.test(navigator.userAgent),
                isIphoneIpod = /iphone|ipod/i.test(navigator.userAgent),
                isIpad = /ipad/i.test(navigator.userAgent),
                isApp = /android/i.test(navigator.userAgent),
                vis_path, url;

            title = encodeURIComponent(title);

            _e.VIS = VIP.getToSpecialTopicUrl(para + '&m=webview&title={title}');

            // 获取VIS的路径地址，用于拼接m站和微信域的地址
            function getVisPathByUrl(url){
                var x = url.match(/.+(\/vis\/pages(\/x\/(\d{1,2})\/(\d{1,2})){0,1}\/(\d+)\/([1|2])\.html)(.*)/)
                if(x && x.length > 1){
                    return x[1];
                }
                return false;
            }

            vis_path = getVisPathByUrl(_e.VIS);

            //app跳转，
            //添加
            //mtms_component_id: 专题组件id
            //new_cat_id：运营填的
            //mtms_id：专题 id
            if( preData && preData.pre_type!=='0' ){
                _e.BRAND = "vipshop://showBrandProducts?brandId={brand}&brandName={title}&top_type=1&mtms_component_id=" + (preData.mtms_component_id||'') +'&mtms_id='+(window.config.data.build_id||'');
            }

            // 处理wap跳转
            if (defaultParam.client == "wap") {
                _e.SPECIAL = _e.SPECIAL.replace("msp.appvipshop.com", "mzt.vip.com");
                _e.SPECIAL_BLANK = _e.SPECIAL_BLANK.replace("msp.appvipshop.com", "mzt.vip.com");
                _e.PRODUCT = "http://m.vip.com/product-{brand}-{product}.html?m=product&brand_id={brand}&product_id={product}&title={title}";
                _e.BRAND = "http://m.vip.com/brand-{brand}-0-0-0-1-0-1-40.html?m=brand&brand_id={brand}&title={title}";
                _e.VIS = vis_path ? "http://m.vip.com/index.php?m=special&p="+ vis_path +"&h=mzt.vip.com&_src=vis&title={title}" : _e.VIS;
            }

            // 跳微信域
            if (isWeixin) {
                _e.BRAND = 'http://weixin.vip.com/?#productList?brandId={brand}';
                _e.PRODUCT = 'http://weixin.vip.com/#productDetail?productId={product}';
                _e.VIS = vis_path ? "http://weixin.vip.com/purchase/special?m=special&p="+ vis_path +"&h=mzt.vip.com&_src=vis&title={title}" : _e.VIS;
            }


            var wh = "all";
            var value = para;
            if (para && typeof para === "object") {
                wh = defaultParam.warehouse || "nh";
                value = para[wh];
            }

            var appCategoryValue = null;
            var appSubChannnelPara = null;
            if (para && typeof para === "string" && para.indexOf("|") >= 0 && typeof para != null ) {
                appCategoryValue = para;
                appSubChannnelPara = para;
            }

            //case "app-category" //全新专题系统--专题支持跳转到原生品类页
            function initAppCategoryUrl (parentCategoryId,categoryId,categoryName){
                var defaultParam = VIP.defaultParam,
                    isWeixin = /micromessenger/i.test(navigator.userAgent),
                    parentCategoryId = parentCategoryId,
                    categoryId = categoryId,
                    categoryName = categoryName,
                    wapurl = "http://m.vip.com/classify-category-"+ parentCategoryId +"-"+ categoryId +"-0-0-0-0-20.html",
                    appurl = "vipshop://categoryGoodsList?parentCategoryId="+parentCategoryId+"&categoryId="+categoryId+"&categoryName="+ encodeURIComponent(categoryName);
                //比较--过滤后的版本字符大小
                function to_version(version,version_str2){
                    //6.0 以上版本处理
                    if ( version.split(".")[0] >= 6 ) {
                        return true;
                    //5.11--- 6.0 之间版本处理
                    }else if ( version.split(".")[0] >= 5 && version.split(".")[1] >= version_str2 ) {
                        return true;
                    }else{
                        return false;
                    }
                }
                //过滤版本字符 返回： 5.10
                function filter_version_str(version_str){
                    return version_str.split(".")[0]+"." + version_str.split(".")[1];
                }
                // 跳微信域
                if (isWeixin) {
                    VIP.notify_tips("微信网页版暂不支持查看分类，请下载手机app端查看体验更佳哦",3000);
                }else if ( defaultParam.client == "wap" ) {
                    window.location.href = wapurl;
                }else{
                    if (typeof defaultParam.app_version != "undefined" ) {
                        if (defaultParam.client == "ipad") {
                            // console.log("ipad:"+ defaultParam.app_version  );
                            VIP.notify_tips("本分类商品暂只支持在手机app端查看，请到手机端下载唯品会查看",3000);
                        }else{
                            // console.log("phone:"+ defaultParam.app_version  );
                            var __app_version = defaultParam.app_version;
                            if ( defaultParam.app_version.indexOf("8.") == 0 ) {
                                __app_version = __app_version.substring(2);

                                if( to_version( filter_version_str( __app_version),14 ) ){
                                    window.location.href = appurl;
                                }else{
                                    VIP.notify_tips("您当前app版本暂不支持查看本分类商品，建议升级app版本或到搜索->分类中查找",3000);
                                }
                            }else{

                                if( to_version( filter_version_str( __app_version ),14 ) ){
                                    window.location.href = appurl;
                                }else{
                                    VIP.notify_tips("您当前app版本暂不支持查看本分类商品，建议升级app版本或到搜索->分类中查找",3000);
                                }
                            }
                        }
                    }
                }
            }


            // 全新专题系统--支持跳原生子频道页
            var goSubChannel = function(){

                var defaultParam = VIP.defaultParam,
                    isWeixin = /micromessenger/i.test(navigator.userAgent),
                    channelID = channelID,
                    channelMenu = channelMenu,
                    // 协议格式
                    androidUrl = "vipshop://showChannel?f=dx&channelID={channelID}&channelMenu={channelMenu}",
                    iphoneUrl = "vipshop://showChannel?channelID={channelID}&channelMenu={channelMenu}";

                // 版本过滤
                var checkAppVersion = function(version, subVersion){

                    // 线下版本8.x预先处理处理
                    if (version.split(".")[0] == 8) {
                        version = version.split(".")[1] + "." + version.split(".")[2];
                    } else {
                        version = version.split(".")[0] + "." + version.split(".")[1];
                    }

                    // 5.subVersion 及以上版本支持协议
                    if (version.split(".")[0] >= 5 && version.split(".")[1] >= subVersion) {
                        return true;
                    }else{
                        return false;
                    }
                };

                // main func
                /**
                 * @param  {string} android {android channelID}
                 * @param  {string} iphone {iphone channelID}
                 * @param  {string} channelMenu {展现位置}
                 */
                var init = function(android, iphone, channelMenu){
                    // 不支持跳微信域
                    if (isWeixin) {
                        VIP.notify_tips("微信网页版暂不支持查看分类，请下载手机app端查看体验更佳哦",3000);
                    }else if (defaultParam.client == "wap") {
                        // 不支持wap跳转
                        VIP.notify_tips("网页版暂不支持查看分类频道，请下载手机app端查看体验更佳哦",3000);
                    }else if (typeof defaultParam.app_version != "undefined") {
                        var appVersion = defaultParam.app_version;
                        // 筛选客户端跳转
                        switch (defaultParam.client) {
                            case "android":
                                if (this.checkAppVersion(appVersion, 7)) {
                                    // 版本过滤通过
                                    if (android != " " && channelMenu != " "){
                                        androidUrl = androidUrl.replace(/{channelID}/g, android).replace(/{channelMenu}/g, channelMenu);
                                        window.location.href = androidUrl;
                                    }
                                }else {
                                    // 版本不支持
                                    VIP.notify_tips("您当前app版本暂不支持查看本分类频道，建议升级app新版本体验",3000);
                                }
                                break;
                            case "iphone":
                                if (this.checkAppVersion(appVersion, 15)) {
                                    // 版本过滤通过
                                    if (iphone != " " && channelMenu != " "){
                                        iphoneUrl = iphoneUrl.replace(/{channelID}/g, iphone).replace(/{channelMenu}/g, channelMenu);
                                        window.location.href = iphoneUrl;
                                    }
                                }else {
                                    // 版本不支持
                                    VIP.notify_tips("您当前app版本暂不支持查看本分类频道，建议升级app新版本体验",3000);
                                }
                                break;
                            case "ipad":
                                // 不支持ipad
                                VIP.notify_tips("ipad版唯品会暂不支持查看该分类频道",3000);
                                break;
                            default:
                                // 其他未定义版本客户端
                                VIP.notify_tips("本分类商品暂只支持在手机app端查看，请到手机端下载唯品会查看",3000);
                                break;
                        }

                    }else {
                        // 版本不支持
                         VIP.notify_tips("您当前app版本暂不支持查看本分类频道，建议升级app新版本体验",3000);
                    }
                };

                return {
                    checkAppVersion : checkAppVersion,
                    init : init
        　　　　};
            }();


            switch (type) {
                //专题
                case "special":
                    if (target == "_blank") {
                        value = _e.SPECIAL_BLANK.replace(/{sid}/g, value).replace(/{wh}/g, wh).replace(/{VIP_WH}/g, "VIP_" + wh.toUpperCase());
                    } else {
                        value = _e.SPECIAL.replace(/{sid}/g, value).replace(/{wh}/g, wh).replace(/{VIP_WH}/g, "VIP_" + wh.toUpperCase());
                    }
                    try {
                        goToSpecialTopicUrl(value)
                    } catch (e) {
                        console.log("%c没有goToSpecialTopicUrl,请线上预览", "color:blue", value)
                    }
                    break;

                    //专题-自动
                case "special-auto":
                    value = parseInt(value);
                    _e.go("special", {
                        nh: value,
                        sh: value + 1,
                        cd: value + 2,
                        bj: value + 3,
                        hz: value + 4
                    }, target);
                    break;

                    //专题-乱序的自动
                case "special-auto-ran":
                    value = value.match(/(\d+).*(nh|sh|cd|bj|hz)/);
                    var numWH = 5;
                    var delta = numWH - {
                        nh: 0,
                        sh: 1,
                        cd: 2,
                        bj: 3,
                        hz: 4
                    }[value[2]];
                    value = parseInt(value[1]);
                    _e.go("special", {
                        nh: value + (delta + 0) % numWH,
                        sh: value + (delta + 1) % numWH,
                        cd: value + (delta + 2) % numWH,
                        bj: value + (delta + 3) % numWH,
                        hz: value + (delta + 4) % numWH
                    }, target);
                    break;

                    //专场
                case "brand":
                    location.href = _e.BRAND.replace(/{brand}/g, value).replace(/{title}/g, title);
                    break;

                    //单品
                case "product":
                    var bid = value.match(/(\d*)-(\d*)/)[1];
                    var pid = value.match(/(\d*)-(\d*)/)[2];
                    location.href = _e.PRODUCT.replace(/{brand}/g, bid).replace(/{product}/g, pid).replace(/{title}/g, title).replace(/{VIP_WH}/g, "VIP_" + wh.toUpperCase());
                    break;

                case "vis":
                    var url = _e.VIS;

                    if(typeof value == 'string' && !/http:\/\/mst.vip.com/.test(url)){
                        url = _e.VIS.replace(/{brand}/g, para.match(/brand_id=(\d*)/)[1]);
                    }

                    location.href = url.replace(/{title}/g, title);

                    break;

                //全新专题系统--专题支持跳转到原生品类页
                case "app-category":
                    //http://wiki.corp.vipshop.com/pages/viewpage.action?pageId=58764752
                    if ( typeof appCategoryValue.split("|")[0] != undefined && typeof appCategoryValue.split("|")[1] != undefined ) {
                        initAppCategoryUrl(appCategoryValue.split("|")[0],appCategoryValue.split("|")[1],appCategoryValue.split("|")[2]);
                    }


                    break;
                //首页
                case "index":
                    // ios 5.1 以下用旧协议 vipshop://showMenuItem?typeID=0&typeValue=0

                    if(isWeixin){
                        url = 'http://weixin.vip.com';
                    }else{
                        if(defaultParam.client != "wap"){
                            //ipad 一直用协议 同比iphone会晚一些
                            if (isIpad) {
                                url = "vipshop://showMenuItem?typeID=0&typeValue=0";
                            } else{
                            //非ipad  处理iphone 安卓等
                                if(isIphoneIpod && !VIP.compareVersion(defaultParam.app_version, '5.1')){
                                    url = "vipshop://showMenuItem?typeID=0&typeValue=0";
                                }else{
                                    url = "http://m.vip.com?m=home";
                                }
                            }
                        }else{
                            //wap环境
                            url = "http://m.vip.com";
                        }

                    }

                    location.href = url;
                    break;


                // 全新专题系统--支持跳原生子频道页 http://wiki.corp.vipshop.com/pages/viewpage.action?pageId=108659935
                case "subchannel":
                    if (typeof appSubChannnelPara.split("|")[0] != undefined && typeof appSubChannnelPara.split("|")[1] != undefined && typeof appSubChannnelPara.split("|")[2] != undefined) {
                        // goSubChannel.init() 传参顺序：androidID iphoneID channelMenu
                        goSubChannel.init(appSubChannnelPara.split("|")[0],appSubChannnelPara.split("|")[1],appSubChannnelPara.split("|")[2]);
                    }
                    break;

                    //美妆频道
                case "makeup":
                    _e.go("special", $(window).width() < 1024 ? 3561 : 3562);
                    break;

                    //亲子频道
                case "kids":
                    _e.go("special", $(window).width() < 1024 ? 3563 : 3564);
                    break;

                    //居家频道
                case "home":
                    _e.go("special", $(window).width() < 1024 ? 3565 : 3566);
                    break;
            }
        }
        return _e;
    }());

    VIP.initDefaulParam();

    VIP.tmpl = {
        size : '<div class="mst-size" id="J-size">\
                    <div class="mst-size-mask" onclick="VIP.Sizing.displayPannel(0)"></div>\
                    <div class="mst-size-wrap">\
                        <div class="mst-size-head">\
                            <div class="mst-size-pro">\
                                <img alt="" src="${small_image}" />\
                                <div class="mst-size-info">\
                                    <p class="mst-size-title">${product_name}</p>\
                                    <div class="mst-size-price">\
                                        <i class="mst-size-price-now">￥${vipshop_price}</i>\
                                        <i> <strike>￥${market_price}</strike> \
                                        <em>${vip_discount}</em></i>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="mst-size-content">\
                            <p class="mst-size-tips">\
                                尺码\
                            </p>\
                            <p class="mst-size-yardage {{if skuList.length <= 2}}mst-size-yardage-big{{/if}}">\
                                {{each(key,value) skuList}}\
                                    <span data-size-id="${value.id}" {{if type == 1 || type == -1}}class="unactive"{{/if}}>${value.name} <em></em></span>\
                                {{/each}}\
                            </p>\
                        </div>\
                        <div class="mst-size-btns">\
                            <a class="mst-size-btn">确 认</a>\
                        </div>\
                        <span class="mst-size-close" onclick="VIP.Sizing.displayPannel(0)">×</span>\
                    </div>\
                </div>',

        loading : '<div class="mst-global-loading" id="J-mst-global-loading">\
                      <div class="mst-gl-mask"></div>\
                      <div class="mst-gl-body">\
                           <svg class="mst-loading-svg" viewBox="0 0 150 150"> <g class="circle"> <circle cx="75" cy="75" r="72"></circle> <circle cx="75" cy="75" r="72" class="rotation"></circle> </g> <g class="logo-idle"> <path d="M32 62 L47 100 L62 62 M77 49 A0.1 0.1, 0 1 1, 80 52 A0.1 0.1, 0 1 1, 77 49 Z M78 62 L78 100 M95 113 L95 62 L95 85 A15 15, 0 1 1, 130 78 A15 15, 0 1 1, 95 85 Z"></path> </g> </svg> </div>\
                 </div>'

    }

    /**
     * 加入购物车
     * @type {Object}
     */
    VIP.Sizing = {
        // size : {},
        customCallBack : null,
        dealTmpl : function (data) {
            var tmpl = VIP.tmpl.size,
                id = 'J-size',
                that = this;

            $('#' + id).remove();

            $.tmpl(tmpl, data).appendTo($('body'));

            this.dom = $('#' + id);

            this.dom.on('click', '.mst-size-btn', function () {
                if(data.sizeChosecallback) {
                    if(!that.sizeId) {
                        VIP.notify_tips('请选择尺码',2000);
                        return;
                    }

                    var size =  that.getSizeById(data.skuList,that.sizeId);

                    data.sizeChosecallback(size);
                    that.displayPannel(0);
                }else{
                    that.pullToApp(data.addType, '', '' + data.brand_id, '' + data.product_id);
                }
            })
        },
        showPannel : function (data) {
            var that = this,
                type = data.addType;

            if(data.skuList) {
                delete data.dom;

                var sizeIds = [];

                that.dealTmpl(data);

                var actClass = 'active',
                    unactClass = 'unactive';

                that.productId = data.product_id;

                that.displayPannel(1);

                that.dom.find('.mst-size-yardage span').bind('click',function () {
                    var $this = $(this),
                        $prevActive = that.dom.find('.mst-size-yardage .active');

                    // 缺货返回
                    if($this.hasClass(unactClass) || $prevActive.is($this)){
                        return false;
                    }

                    // 去掉选中状态
                    $prevActive.removeClass(actClass);
                    $this.addClass(actClass);

                    that.sizeId = $this.attr('data-size-id');
                })
            }
        },
        displayPannel : function (type) {
            var $size = this.dom,
                $wrap = $size.find('.mst-size-wrap'),
                height = 0,
                duration = 500;

            delete this.sizeId;

            if(type === 0){
                height = $wrap.height();

                $size.fadeOut(duration);
                $wrap.animate({'bottom' : - height}, duration, function () {
                    VIP.Sizing.displayFloatUI(1);
                });
            }else{
                $size.show();
                height = $wrap.height();
                $size.hide();

                VIP.Sizing.displayFloatUI(0);

                $size.fadeIn(duration);
                $wrap.css('bottom',- 300)
                    .animate({'bottom' : 0}, duration);
            }
        },
        pullToApp : function (type, sizeId, brandId, productId, callback) {
            var e = event ? event : window.event,
                productId = this.productId || productId,
                $product = $('[data-product-id='+ productId +']'),
                brandId = brandId || $product.data('brandId'),
                sizeIds = sizeId ? sizeId.split(',') : [],
                left = document.body.scrollLeft,
                top = document.body.scrollTop,
                sizeId = sizeId || this.sizeId,
                protocol,
                callbackName = "";

            sizeIds = sizeIds.length > 1 ? sizeIds : [sizeIds];

            if(!sizeId){
                VIP.notify_tips('请选择尺码',2000);
                return;
            }

            if(callback) {
                this.customCallBack = callback;
            }

            switch(type){
                case 'collect':
                    callbackName = !callback ? 'VIP.Sizing.pullToCollectCallback' : 'VIP.Sizing.customCallBack';
                    protocol = 'vipshop://addFavourite?sku='+ sizeId +'&goodsId='+ productId +'&brandId='+ brandId +'&isHeat=1&jsFunction='+ callbackName;
                    break;
                case 'unCollect':
                    callbackName = !callback ? 'VIP.Sizing.pullToCollectCallback' : 'VIP.Sizing.customCallBack';
                    protocol = 'vipshop://delFavourite?sku='+ sizeId +'&jsFunction='+ callbackName;
                    break;
                case 'addCart':
                    callbackName = !callback ? 'VIP.Sizing.pullToCartCallback' : 'VIP.Sizing.customCallBack';
                    protocol = 'vipshop://addCart?sizeId='+ sizeId +'&brandId='+ brandId +'&productId='+ productId +'&sizeNum=1&jsFunction='+ callbackName;
                    // VIP.hercules({
                    //     type : 'cart',
                    //     name : 'addCart',
                    //     param : {
                    //         sizeId: sizeId,
                    //         brandId: brandId,
                    //         productId: productId,
                    //         sizeNum: 1
                    //     },
                    //     succ : function (res) {
                    //         alert(res);
                    //         if(callback) {
                    //             callback();
                    //         }else{
                    //             VIP.Sizing.pullToCartCallback();
                    //         }
                    //     },
                    //     fail : function () {

                    //     }
                    // });
                    break;
            }

            if(type == 'collect' || type == 'unCollect'){
                if(!location.hash){
                    location.hash += 'position=' + left + ',' + top + '&action=VIP.Sizing.pullToApp' + '&type=' + type + '&sizeId=' + sizeId + '&productId=' + productId;
                }
            }

            this.params = {
                type : type,
                productId : productId
            }

            location.href = protocol;
        },
        pullToCollectCallback : function (code) {
            // VIP.notify_tips(code,5000);
            var productId = this.params.productId;

            if(code == 200){
                if(this.params.type == 'unCollect'){
                    $('[data-product-id='+ productId +']').attr('data-type','collect');
                }else{
                    // alert(productId);
                    $('[data-product-id='+ productId +']').attr('data-type','unCollect');
                }
            }else if(code == 0){

            }

            this.afterCallback();
        },
        pullToCartCallback : function (code) {
            // VIP.notify_tips(code,5000);
            if(code == 200){

            }else if(code == 0){

            }

            this.afterCallback();
        },
        afterCallback : function () {
            this.displayPannel(0);
            // location.hash = '#clear';
        },
        init : function (param) {
            if(VIP.getConfigValueByKey('extend','switch', 'is_addCart') === '1'){
                // 显示加入app的左下角浮动按钮
                VIP.Sizing.displayFloatUI(1);
            }
        },
        afterInit : function (params) {
            if(params.position){
                window.scrollTo(params.position.split(',')[0] , params.position.split(',')[1]);
            }

            if(params.action && params.action != ''){
                // console.log(JSON.parse(params.action));
                eval(params.action + '("'+ params.type +'","'+ params.sizeId +'","'+ params.productId +'")');
            }
        },
        getSkuByMid : function (param, callback) {
            var data = {
                    product_id : param.product_id,
                    client : VIP.defaultParam.client,
                    app_version : VIP.defaultParam.app_version
                };

            $.ajax({
                url: 'http://mst.vip.com/product/getSkuByMid',
                data: data,
                dataType: 'jsonp',
                showLoading : true,
                success: function(res) {
                    if(callback) {
                        callback(res)
                    }else{
                        var data = res.data[0],
                            skuDetail = data.skuDetail,
                            sku = skuDetail[0];

                        if(skuDetail.length == 1 && sku.type == 0){
                            if(VIP.defaultParam.is_app) {
                                //一个尺码 且 可购买
                                VIP.Sizing.pullToApp("addCart",'' + sku.id ,'' + param.brand_id,'' + param.product_id);
                            }else{
                                VIP.router(param.dom[0],"product", param.brand_id + '-' + param.product_id , '唯品会');
                            }
                        }else if(skuDetail.length > 1){
                            param.skuList = skuDetail;

                            var hasStock = false;

                            $.each(skuDetail, function (key, val) {
                                if(val.stock != 0) {
                                    hasStock = true;
                                    return false;
                                }
                            })

                            if(VIP.defaultParam.is_app && hasStock) {
                                VIP.Sizing.showPannel(param);
                            }else{
                                VIP.router(param.dom[0],"product", param.brand_id + '-' + param.product_id , '唯品会');
                            }
                        }else{
                            VIP.router(param.dom[0],"product", param.brand_id + '-' + param.product_id, '唯品会');
                        }
                    }
                }
            })
        },
        getSizeById : function (list,id) {
            var result = false;

            $.each(list, function (key, val) {
                if(val.id == id) {
                    result = val;
                }
            })

            return result;
        },
        displayFloatUI : function (code) {
            VIP.hercules({
                type : 'ui',
                name : 'showFloatView',
                param : {
                    flag : code
                }
            });
        },
        userSelectSizeCallback : function (sizeId, callback) {
            if(callback && typeof(callback) === 'function'){
                callback(sizeId);
            }
        }
    }

    /**
     * 收藏功能 Collection
     * notify_tips 提示信息
     * getCollectionList 获取用户收藏的品牌
     * setCollection 收藏/取消收藏功能
     * setCollectionHtml 收藏后改变Html结构
     */
    VIP.Collection = {
        getCollectionList: function(page_id, callback) {
            var _this = this;

            var oData = null;
            if( typeof page_id === 'string' ){
                oData = { page_id : page_id, mars_cid: VIP.defaultParam.mars_cid };
            }else{
                oData = page_id;
                // channel = VIP.defaultParam.client,
                // mobile_platform = VIP.defaultParam.client == 'wap' ? 2 : 3,
                // mobile_channel = VIP.getQueryString('mobile_channel'),
                // user_token = VIP.getQueryString('user_token'),
                // warehouse =  VIP.defaultParam.warehouse || config.page_data.warehouse || 'VIP_NH',
                // app_version = VIP.defaultParam.app_version,
                // mars_cid = VIP.defaultParam.mars_cid
            }

            $.ajax({
                url: 'http://mst.vip.com/Special/getFavouriteServiceList',
                data : oData,
                dataType: 'jsonp',
                success: function(data) {

                    if( typeof callback === 'function' ){
                        callback(data);
                        return;
                    }

                    var brand = data.data;

                    if(data.result){
                        $.each(brand, function(key, value) {
                            _this.setCollectionHtml(value.brand_id, value.brand_store_sn, 'add');
                        })
                    }
                }
            });
        },
        setCollection: function(type, brand_id, brand_sn,callback) {
            window.event && window.event.preventDefault();

            var _this = this,
                client = VIP.defaultParam.client,
                source = client == 'wap' ? 2 : 3;

            $.ajax({
                url: 'http://mst.vip.com/Special/favouriteService?',
                data : {
                    act : type ,
                    client : VIP.defaultParam.client ,
                    brand_sn : brand_sn ,
                    brand_id : brand_id ,
                    source : source,
                    mars_cid: VIP.defaultParam.mars_cid
                },
                dataType: 'jsonp',
                success: function(data) {
                    var res = data.data,
                        msg,mars_sead,mars;

                    if(callback){
                        callback(data);
                    }else{
                        if (data.result) {
                            if (data.code == 1) {
                                if (res.pms_msg) {
                                    msg = res.pms_msg;
                                } else {
                                    msg = res.type == 'add' ? '取消收藏成功！' : '收藏成功！';
                                }

                                // 加入收藏埋点
                                mars = res.type == 'add' ? VIP.Mars.get('blike|'+ res.brand_id) : VIP.Mars.get('cblike|'+ res.brand_id);

                                Mar.Seed.request("mst","click",'mst_brand_click', JSON.stringify(mars));
                            } else {
                                msg = '收藏失败!请稍后再试。';
                            }

                            VIP.notify_tips(msg, 2000);
                            _this.setCollectionHtml(res.brand_id, res.brand_sn, type);
                        } else {
                            if (data.code == 99 && res._redirect != '') {
                                VIP.Login.go();

                                return false;
                            } else {
                                msg = res.type === 'add' ? '取消' : '';
                                VIP.notify_tips(msg + '收藏失败！请稍后再试。', 2000);
                            }
                        }
                    }
                }
            });
        },
        setCollectionHtml: function(id, sn, type) {
            var $fav = $('[data-favorite-status-brand-ids=' + id + ']');

            if (type == 'add') {
                $fav.attr('data-favorite-status-brand-action-type', 'cancel');
                $fav.find('span').addClass('off');
            } else if (type == 'cancel') {
                $fav.attr('data-favorite-status-brand-action-type', 'add');
                $fav.find('span').removeClass('off');
            }
        },
        getCouponStatus: function(brand_ids) {
            $.ajax({
                url: 'http://mst.vip.com/Special/getCouponNum',
                data : {
                    brand_ids : brand_ids,
                    mars_cid : VIP.defaultParam.mars_cid,
                    wap_consumer : VIP.defaultParam.wap_consumer
                },
                dataType: 'jsonp',
                success: function(data) {
                    $.each(data.data, function(key, value) {
                        $('#L_coupon_' + value).show();
                    })
                }
            });
        },
        getCouponInfo: function(data,fn) {
            $.ajax({
                url: 'http://mst.vip.com/Special/getCouponInfo',
                data : data,
                dataType: 'jsonp',
                success: function(res) {
                    if(fn){
                        fn(res);
                    }else{
                        if(res.result){
                            $.each(res.data, function(key, value) {
                                // console.log($('#L_coupon_' + value.brand_id));
                                if(value.coupon_type == 2){
                                    $('#L_coupon_' + value.brand_id).show().html('<em></em>' + value.coupon_fav);
                                }
                            })
                        }
                    }
                }
            });
        }
    };

    VIP.compareVersion = function (current,version) {
        if(!current){
            return 0
        }

        var current = current.replace(/^8./,'').split('.'),
            version = version.split('.'),
            flag = 0,
            cur , ver;

        for (var i = 0; i < current.length; i++) {
            cur = parseInt(current[i],10);
            ver = parseInt(version[i],10);

            cur = !cur ? 0 : cur;
            ver = !ver ? 0 : ver;

            if(cur > ver) {
                flag = 1;
                break;
            }else if(cur < ver){
                flag = 0;
                break;
            }else {
                flag = 1;
            }
        };

        return flag
    }


    VIP.adaption = function() {
        var proto = {},
            t = {};
        t.win = $(window);
        proto.psdWidth = 640;
        proto.update = function() {
            try {
                proto.setRootFontSize()
            } catch (t) {

            }
        };
        proto.setRootFontSize = function() {
            var a = t.win.width(),
                i = 320,
                n = proto.psdWidth;

            i > a && (a = i),
                a > n && (a = n),

                $("html").css("font-size", 100 * a / n + "px")
        };
        window.addEventListener("resize", proto.update, !1);
        proto.update();
        return proto;
    };


    /**
     * 分享
     * filterVersion 过滤渠道版本
     * canShare 当前app版本是否支持分享
     * getId 获取分享id
     * getPurchaseType 获取品购类型
     */
    VIP.share = {
        filterVersion : function (version) {
            return version.replace(/^8./,'');
        },
        canShare : function () {
            var defaultParam = VIP.defaultParam,
                version = defaultParam.app_version;

            /**
             * 1. ipad、wap、weixin不显示分享按钮
               2. iphone 5.1版本不encode分享链接
               3. 只有5.1及5.1以上的版本才显示分享按钮
               4. 预装app，一些特殊版本8.2.5诸如此类的8.*.*版本号是旧版本，需屏蔽分享按钮
             */
            if(defaultParam.is_ipad && VIP.compareVersion(version ,'5.6')){
                return true;
            }else if((defaultParam.is_iphone || defaultParam.is_android) && VIP.compareVersion(version ,'5.1')){
                return true;
            }

            return false;
        },
        getId : function () {
            var id = 0;

            if(window.config){
                $.each(window.config.data.moduleList, function (key, value) {
                    if(value.module_type_id == 'share' && value.model) {
                        id = value.model.plugin_id;
                        return false;
                    }
                });
            }

            return id;
        },
        autoshare : function () {
            window.location.href = 'vipshop://autoShare?type=1';
        },
        appShare : function (id, shareUrl) {
            window.location.href = 'vipshop://shareSpecial?shareId='+ id +'&specialUrl='+ shareUrl +'&callbackId=2';
        },
        getPurchaseType : function () {
            return VIP.getConfigValueByKey('data','page_data','purchase_type');
        }
    }

    /**
     * 获取PMS信息，显示在对应接口上
     * @param  {array} ids 档期的id
     */
    VIP.getPmsMsg = function (data,callback) {
        $.ajax({
            url : 'http://mst.vip.com/Special/getPMS',
            data : data,
            dataType : 'jsonp',
            success : function (res) {
                if(callback){
                    callback(res);
                }else{
                    var datas = res.data,
                        $span, data;

                    if(res.result){
                        for (var i = 0; i < datas.length; i++) {
                            data = datas[i];

                            if(data.pms_msg){
                                $span = $('<span class="s_info_desc">'+ data.pms_msg +'</span>');
                                $('div[data-brand-id='+ data.id +'] .tpl_pic').append($span);
                            }
                        };
                    }else {
                        console.log('PMS接口返回错误');
                    }
                }
            },
            error : function () {
                console.log('PMS接口返回错误');
            }
        })
    }

    /**
     * 获取用户是否已售完
     * @param  {[type]}   data     {product_ids : ',分隔ID', mars_cid : ''}
     * @param  {Function} callback 外部的回调函数
     * @return {[type]}            [description]
     */
    VIP.getSoldOutList = function (data,callback) {
        $.ajax({
            url: 'http://mst.vip.com/Special/getProductSkuStockStatus',
            data: data,
            dataType: 'jsonp',
            success: function(res) {
                if(callback){
                    callback(res);
                }else{
                    if (res.result) {
                        $.each(res.data, function(key, value) {
                            if (value) {
                                $('[data-soldout-productid=' + value + ']').show();
                            }
                        })
                    }else{
                        console.log('商品库存接口返回错误！');
                    }
                }

            },
            error: function() {
                console.log('商品库存接口返回错误！');
            }
        })
    }

    /**
     * 获取用户是否已售完
     * @param  {[type]}   data     {product_ids : ',分隔ID', mars_cid : '', is_mobile=1}
     * @param  {Function} callback 外部的回调函数
     * @return {[type]}            [description]
     */
    VIP.getSoldOutListNew = function (data,callback) {
        $.ajax({
            url: 'http://mst.vip.com/Stock/checkStock',
            data: data,
            dataType: 'jsonp',
            success: function(res) {
                if(callback){
                    callback(res);
                }else{
                    if (res.result) {
                        $.each(res.data, function(key, value) {
                            if (value) {
                                $('[data-soldout-productid=' + value + ']').show();
                            }
                        })
                    }else{
                        console.log('商品库存接口返回错误！');
                    }
                }

            },
            error: function() {
                console.log('商品库存接口返回错误！');
            }
        })
    }

    // 处理iphone无法转换时间的bug
    VIP.stringToDate = function(DateStr) {
        if (typeof DateStr == "undefined") return new Date();
        if (typeof DateStr == "date") return DateStr;
        var converted = Date.parse(DateStr);
        var myDate = new Date(converted);
        if (isNaN(myDate)) {
            DateStr = DateStr.replace(/:/g, "-");
            DateStr = DateStr.replace(" ", "-");
            DateStr = DateStr.replace(".", "-");
            var arys = DateStr.split('-');
            switch (arys.length) {
                case 7:
                    myDate = new Date(arys[0], --arys[1], arys[2], arys[3], arys[4], arys[5], arys[6]);
                    break;
                case 6:
                    myDate = new Date(arys[0], --arys[1], arys[2], arys[3], arys[4], arys[5]);
                    break;
                default:
                    myDate = new Date(arys[0], --arys[1], arys[2]);
                    break;
            };
        };
        return myDate;
    }

    // 过滤
    VIP.handleUrlParam = function(url,target) {
        if(!url || url == ''){
            return url;
        }

        var defaultParam = VIP.defaultParam,
            sep = url.indexOf('?') > -1,
            params = ['width','height','client','source','warehouse','area_id','net','mars_cid','is_preload','newcustomer','wap_consumer','app_version', 'extra_tag'],
            suffix = '',
            target = target || 'blank';

        url += sep ? '&' : '?';
        url += defaultParam.is_app && target == 'blank' ? 'm=webview&' : '';

        $.each(params, function (key, val) {
            if(defaultParam[val]){
                suffix += val + '=' + defaultParam[val] + '&';
            }
        })

        url += suffix.replace(/\&$/,'');

        return url
    }

    /**
     * [router description]
     * @param  {[type]} el     onclick="VIP.router(this,)"
     * @param  {[type]} type   [description]
     * @param  {[type]} val    [description]
     * @param  {[type]} title  [description]
     * @param  {[type]} extend [description]
     * @return {[type]}        [description]
     *
     * example: <a hre="javascript:" onclick="VIP.router(this,'brand', '728958', '意大利Fissan婴幼儿洗护专场', {'channel' : 'sub'})">
     */
    VIP.router = function (el, type, val, title, extend) {
        var link = {},
            defaultParam = VIP.defaultParam,
            jumpWeixin = VIP.getConfigValueByKey('extend','switch','jump_weixin'),
            client = defaultParam.is_app ? 'app' : (jumpWeixin === "0" ? 'wap' : (defaultParam.is_weixin ? 'weixin' : 'wap')),
            tag = el ? el.getAttribute('mst-tag') : '',
            urlTag = VIP.getQueryString('extra_tag') ? VIP.getQueryString('extra_tag') + ',' : '',
            sourceTag = tag ? ('source_tag=' + urlTag + tag) : '',
            curTag = urlTag ? urlTag : tag,
            warehouse = 'all',
            isVis = window.config ? window.config.data.page_data.purchase_type : false;

        title = encodeURIComponent(title);

        link = {
            brand : {
                wap : "http://m.vip.com/brand-{brand}-0-0-0-1-0-1-40.html?m=brand&brand_id={brand}&title={title}&" + sourceTag,
                app : "vipshop://showBrandProducts?brandId={brand}&brandName={title}&" + sourceTag,
                weixin : "http://weixin.vip.com/?#productList?brandId={brand}&" + sourceTag,
            },
            product : {
                wap : "http://m.vip.com/product-{brand}-{product}.html?m=product&brand_id={brand}&product_id={product}&title={title}&" + sourceTag,
                app : "vipshop://showGoodsDetail?brandId={brand}&goodsId={product}&goodsType=0&goodsTitle={title}&w={VIP_WH}"+ (isVis == 0 || isVis == 1 ? '&isFromVis=true' : '') + "&" + sourceTag,
                weixin : "http://weixin.vip.com/#productDetail?productId={product}&" + sourceTag,

            },
            vis : {
                wap : "http://m.vip.com/index.php?m=special&p={path}&h=mzt.vip.com&_src=vis&title={title}&" + sourceTag,
                app : type == 'vis' ? VIP.handleUrlParam(val) : '',
                weixin : "http://weixin.vip.com/purchase/special?m=special&p={path}&h=mzt.vip.com&_src=vis&title={title}&" + sourceTag,
            },
            subchannel : {
                app : "vipshop://showChannel?channelID={channelID}&channelMenu={channelMenu}",
            },
            appCategory : {
                wap : "http://m.vip.com/classify-category-{parendId}-{categoryId}-0-0-0-0-20.html?" + sourceTag,
                app : "vipshop://categoryGoodsList?parentCategoryId={parentId}&categoryId={categoryId}&categoryName={categoryName}&" + sourceTag,
                weixin : "http://m.vip.com/classify-category-{parendId}-{categoryId}-0-0-0-0-20.html?" + sourceTag,
            },
            index : {
                wap : "http://m.vip.com",
                app : "http://m.vip.com?m=home",
                weixin : "http://weixin.vip.com",
            },
            virtual : {
                wap : "http://h5.vip.com/virtual/product-detail.html?product_id={product}",
                app : "vipshop://goH5?url={url}",
                weixin : "http://h5.vip.com/virtual/product-detail.html?product_id={product}",
            }
        }


        function getVisPathByUrl(url){
            var x = url.match(/.+(\/vis\/pages(\/x\/(\d{1,2})\/(\d{1,2})){0,1}\/(\d+)\/([1|2])\.html)(.*)/)
            if(x && x.length > 1){
                return x[1];
            }
            return false;
        }

        switch(type){
            // 档期
            case 'brand':
                if(val){
                    location.href = link.brand[client].replace(/{brand}/g, val).replace(/{title}/g, title);
                }

                break;
            // 商品
            case 'product':
                var val = val.split('-'),
                    brand = val[0],
                    product = val[1];

                if(brand && product){
                    location.href = link.product[client].replace(/{brand}/g, brand).replace(/{product}/g, product).replace(/{title}/g, title).replace(/{VIP_WH}/g, "VIP_" + warehouse.toUpperCase());
                }

                break;
            // VIS
            case 'vis':
                var path = '';

                if(/http:\/\/mst.vip.com/.test(val)){
                    location.href = VIP.handleUrlParam(val);
                }else{
                    path = getVisPathByUrl(val);
                    location.href = link.vis[client].replace(/{path}/g, path).replace(/{title}/g, title);
                }

                break;

            // 子频道，http://wiki.corp.vipshop.com/pages/viewpage.action?pageId=108659935
            case 'subchannel':
                var canJump = false,
                    val = val.split('|'),
                    channelId = defaultParam.is_iphone ? val[0] : val[1],
                    channelMenu = val[2];

                if(channelId && channelMenu){
                    if(defaultParam.is_app) {
                        // iphone 补参
                        link.subchannel.app += defaultParam.is_android ? '&f=dx' : '';

                        if((defaultParam.is_iphone && VIP.compareVersion(defaultParam.app_version, '5.15')) || (defaultParam.is_android && VIP.compareVersion(defaultParam.app_version, '5.7'))){
                            canJump = true;
                            location.href = link.subchannel.app.replace(/{channelID}/g, channelId).replace(/{channelMenu}/g, channelMenu);
                        }
                    }

                    if(!canJump){
                        VIP.notify_tips("您当前app版本暂不支持查看本分类频道，建议升级app新版本体验",3000);
                    }
                }

                break;

            // 分类结果页
            case 'app-category':
                var canJump = false,
                    val = val.split('|'),
                    parentId = val[0],
                    categoryId = val[1],
                    categoryName = $.trim(val[2]);

                if(parentId && categoryId && categoryName){
                    if((defaultParam.is_iphone || defaultParam.is_android) && VIP.compareVersion(defaultParam.app_version, '5.14')){
                        canJump = true;
                    }else if(defaultParam.isWap) {
                        canJump = true;

                    }

                    if(canJump) {
                        location.href = link.appCategory[client].replace(/{parentId}/g, parentId).replace(/{categoryId}/g, categoryId).replace(/{categoryName}/g, categoryName);
                    }
                }

                if(!canJump){
                    VIP.notify_tips("您当前app版本暂不支持查看本分类频道，建议升级app新版本体验",3000);
                }

                break;
            // 首页
            case 'index' :
                if(defaultParam.is_ipad || (defaultParam.is_iphone && !VIP.compareVersion(defaultParam.app_version, '5.1'))){
                    link.index.app = 'vipshop://showMenuItem?typeID=0&typeValue=0';
                }

                location.href = link.index[client];

                break;
            // url
            case 'url' :
                if(val) {
                    if(curTag && curTag != '') {
                        VIP.defaultParam.extra_tag = curTag.replace(',','');
                    }
                    location.href = VIP.handleUrlParam(val, extend);

                }

                break;
            // 虚拟商品，http://wiki.corp.vipshop.com/pages/viewpage.action?pageId=66858920
            case 'virtual' :
                var val = val.split('|'),
                    product = $.trim(val[0]),
                    type = val[1],
                    url = "";

                if(product) {

                    switch(+type){
                        case 2:
                            url = 'http://trip.vip.com/mobile/product-detail.html?product_id=' + product;
                            break;
                        default :
                            url = link.virtual.wap.replace(/{product}/g, product);
                            break;
                    }

                    if(url) {
                        if((defaultParam.is_iphone || defaultParam.is_android) && VIP.compareVersion(defaultParam.app_version, '5.11')){
                            location.href= link.virtual.app.replace(/{url}/g, encodeURIComponent(url));
                        }else if(defaultParam.is_wap || defaultParam.is_weixin){
                            location.href= url;
                        }else{
                            VIP.notify_tips("您当前app版本暂不支持本类型商品购买，建议到个人中心->设置 升级app",4000);
                        }
                    }
                }

                break;
        }
    }

    /**
     * 获取具体的mars_seed，根据url来匹配。
     * @param  {[type]} url   链接
     * @param  {[type]} key   链接所在循环的序列
     * @param  {[type]} index 组件ID
     * @return {[type]}       返回对应mars_sead
     */
    VIP.getIdByUrl = function(url,key,index){
        if(!url || url == '') {
            return 0
        }

        var regUrlFileName = /(.*\/){0,}([^.]+).*/ig,
            reg,
            id = 0;

        if(url.indexOf('msp.appvipshop.com') > -1){
            if(url.indexOf('/cmstopic/') > -1){
                id = url.replace(regUrlFileName,"$2");
            }else if(url.indexOf('/vis/') > -1){
                reg = /\/pages\/(\d+)\//;
                id = url.match(reg)[1];
            }else if(url.indexOf('wapid=mzt') > -1){
                id = getQueryStringByUrl(url, 'wapid');
            }
        }else if(url.indexOf('mst.vip.com') > -1){
            id = 'mst_' + url.replace(regUrlFileName,"$2");
        }else if(url.indexOf('ma.vip.com') > -1){
            id = getQueryStringByUrl(url, 'wapid');
        }else if(url.indexOf('viva.vip.com') > -1){
            id = getQueryStringByUrl(url, 'wapid');
        }else if(url.indexOf('mzt.vip.com') > -1){
            id = getQueryStringByUrl(url, 'wapid');
        }

        id = id == '' ? 0 : id;

        function getQueryStringByUrl(url, name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = url.split('?')[1].match(reg);
            if (r != null) return unescape(r[2]);
            return '';
        }

        return id;
    }

    VIP.Mars = {
        get : function (data,rank) {
            var mars = {
                    "page" : encodeURIComponent(document.title),
                    "wap_id" : VIP.defaultParam.wap_id,
                    "special_id" : VIP.defaultParam.special_id,
                    // "brand_id" : "档期ID",
                    // "goods_id" : "商品ID",
                    // "brand_rank" : "档期所在坑位ID",
                    // "brandtyp" : "档期类型0-档期；1-商品；2-品购",
                    // "target_type" : "目标类型",
                    // "target_id": "根据目标类型，填对应目标id",
                    // "module" : "组件序号",
                    // "seq" : "当前坑位序号",
                    // "tag" : "销售归因tag"
                },
                data = data.split('|');


            if(data.length == 0) {
                return mars
            }

            switch(data[0]){
                case 'brand':
                    mars.target_type = data[0];
                    mars.target_id = data[1];
                    mars.brand_id = data[1];
                    mars.brand_rank = rank;
                    mars.brandtyp = '0';
                    break;

                case 'product':
                    mars.target_type = data[0];
                    mars.target_id = data[2];
                    mars.brand_id = data[1];
                    mars.goods_id = data[2];
                    mars.brand_rank = rank;
                    mars.brandtyp = '1';
                    break;
                case 'url':
                    data[0] && (mars.target_type = data[0]);
                    data[1] && (mars.target_id = VIP.getIdByUrl(data[1]));
                    break;

                default:
                    data[0] && (mars.target_type = data[0]);
                    data[1] && (mars.target_id = data[1]);
                    break;
            }

            return mars;
        },
        set : function (index) {
            var $dom = win.renderer.pluginList[index];

            if(!$dom){
                return
            }

            ++index;

            // 设置曝光埋点
            $dom.find('[mst-mars]').each(function (key, value) {
                var $this = $(this),
                    mars = $this.attr('mst-mars') && $this.attr('mst-mars').split('|'),
                    target = mars[0],
                    rank = index + '_' + (key + 1),
                    specialId = window.config ? window.config.data.id : '',
                    tag = '',
                    timeStamp = new Date().getTime(),
                    pre = specialId + '_' + rank + '_' + timeStamp;

                $this.attr('mst-rank', rank);

                switch(target){
                    case 'brand':
                        if(mars[1]){
                            $this.attr('mars_exposure_sead', 'special_slide_expose')
                                 .attr('mars_exposure_module', 'mst|brands|'+ mars[1] +'|'+ rank + '|0');
                        }

                        tag = pre + '_' + mars[1];

                        break;
                    case 'product':
                        if(mars[1] && mars[2]){
                            $this.attr('mars_exposure_sead', 'special_slide_expose')
                                 .attr('mars_exposure_module', 'mst|products|'+ mars[1] +'|'+ rank + '|1|'+ mars[2]);
                        }

                        tag = pre + '_' + mars[2];

                        break;
                    case 'url':
                        tag = pre + '_' + VIP.getIdByUrl(mars[1]);

                        break;
                    case 'vis':
                        tag = pre + '_' + VIP.getIdByUrl(mars[1]);

                        break;
                    default :
                        tag = pre + '_0';
                        break;
                }

                $this.attr('mst-tag', tag);
            })
        },
        send : function (name, data, rank) {
            var mars = VIP.Mars.get(data,rank);

            Mar.Seed.request("mst","click",name, JSON.stringify(mars));
        }
    }

    /**
     * APP前端与Web前端进行数据交互的bridge
     * @type {Object}
     * @type {Nunber}       callbackId      Web前端调用App前端协议的时候会传递callbackId作为回调的标识，App原样返回就好了
     * @type {Nunction}     getCallbackId   获取回调的callbackId
     * @type {Object}       callbackList    回调函数的池，每个callbackId对应一个回调函数
     * @type {Object}       fnList          App前端触发的事件
     * @type {Function}     callH5          App前端调用前端的方法
     * @type {Function}     callNative      Web前端调用App的协议
     * @type {Function}     onCallback      Web前端调用App的协议后的回调方法
     */

    win.JSBridge = {
        callbackId: 1,
        getCallbackId : function () {
            return this.callbackId++;
        },
        callbackList:{
            // '1': {
            //     callback: function(data){
            //         alert('从页面按钮分享 '+ (data.type == 1?'成功':'失败')+' ，type=' + data.type);
            //     }
            // }
        },
        fnList: {
            onWebviewChange: function(data){
                //data.type  0：后退，1：前进
                // alert('成功调用onWebviewChange，type=' + data.type);//app 给的数据
            },
            onShareClick: function(data){
                // data.position  分享按钮位置，header:头部，bottom:底部
                // alert('调用onShareClick成功，position=' + data.position);
            },
            permitVideo : function (data) {
                // alert('app 调用了 test-permitVideo');
                // alert("data.code:" + data.code);
                // code : 1 //1 可播，0 不可播
                // window.JSBridge.isPermitVideo = data.code;
            }

        },
        callH5: function(method, data){
            var fn = this.fnList[method];
            if(fn){
                fn(data);
            } else {
                // alert('callH5-不存在该方法');
            }
        },
        callNative : function (method,params,callback,isSetTimeout) {
            var cid = this.getCallbackId();
            var cid_data = {
                method : method,
                params : params
            };

            if (callback) {
                this.callbackList[cid] = $.extend({}, {
                    "callback": callback
                // },this.callbackList[cid]);
                },cid_data);
            }else{
                this.callbackList[cid] = cid_data;
            }
            //isSetTimeout 判断调用协议是否延迟处理
            if ( isSetTimeout && isSetTimeout == true ) {
                setTimeout(function () {
                    location.href = 'vipshop://' + method + "?" + $.param(params) + '&callbackId=' + cid;
                }, cid * 200);
            }else{
                location.href = 'vipshop://' + method + "?" + $.param(params) + '&callbackId=' + cid;
            }

        },
        onCallback: function(callbackId, data){
            //app这边调用下 onCallback 函数 传入 callbackId, data
            // alert('触发 oncallback..');
            if (callbackId) {
                var fn = this.callbackList[callbackId]['callback'];
                if(fn){
                    fn(data);
                    delete this.callbackList[callbackId];
                } else {
                    // alert('onCallback-不存在该回调');
                }
            }
        }
    };

    /**
     * 虚拟档期构建方法，实际调用 http://mst.vip.com/demo/js/modules/brand.js
     */
    VIP.Brand = function (params) {
        // console.log(mstRequire);
        mstRequire.load(params, 'Brand', function (params) {
            new VIP.Brand(params);
        });
    }

    /**
     * 虚拟商品构建方法，实际调用 http://mst.vip.com/demo/js/modules/product.js
     */
    VIP.Product = function (params) {
        // console.log(mstRequire);
        mstRequire.load(params, 'Product',function (params) {
            new VIP.Product(params);
        });
    }

    /**
     * hercules : http://wiki.corp.vipshop.com/pages/viewpage.action?pageId=91001767
     * 协议调用
     * VIP.hercules({
     *     type : '',
     *     name : '',
     *     param : '',  // 可选
     *     succ : function (res) {

           },
           fail : function (res) {

           }
     * })
     */
    VIP.hercules = function (params) {
        if(!VIP.defaultParam.is_app) {
            return
        }

        mstRequire.load(params, 'hercule',function (params) {
            if(params.type && params.name) {
                var func = VH[params.type][params.name];

                if(params.param) {
                    func(params.param, params.succ, params.fail);
                }else{
                    func(params.succ, params.fail);
                }
            }else{
                console.log('hercules 缺少参数：type 或者 name！');
            }

        });
    }

    // 爆款数据接口
    VIP.getResysData = function (reqData){
        var data = $.extend(reqData.reqData, reqData.page);

        $.ajax({
            url: reqData.url,
            dataType: 'jsonp',
            data: data
        })
        .done(function(res) {
            if(res.code == 200) {
                reqData.callback && reqData.callback(res);
            }else{
                console.log('爆款推荐获取接口失败, code : ' + res.code);
            }
        })
        .fail(function(e) {
            console.log("爆款推荐获取接口失败");
        })

    }

    // 统一处理图片转换
    VIP.fixImg = function (src,type) {
        var url = src;

        if(!src || src == '' || !/(\.jpg|\.png|\.gif)$/.test(src)) {
            return '';
        }else if (url.indexOf('http://') > -1) {
            if(type == 'brand' || type == 'logo'){
                src = src.replace(/c.vpimg(\d).com/,'a$1.vimage1.com/upload/brand').replace(/[av].vpimg(\d).com/,'a$1.vimage1.com');
            }else{
                src = src.replace(/[a-cv].vpimg(\d).com/,'a$1.vimage1.com');
            }
            // console.log(src);
        }else{
            src = 'http://a.appsimg.com/upload/brand/' + src;
        }

        if(type == 'brand' || type == 'product') {
            src = VIP.getClientImageSrc(src,type);
        }

        return src;
    }

    /**
     * 新收藏方法，全部接口改为中转
     * getFavedList 获取用户收藏列表
     * doFavCoupon 收藏并领取红包
     * doFav 收藏
     * render 处理收藏后数据变化
     */
    VIP.Favorite = {
        getFavedList : function (param, callback) {
            var data = {
                    // page_id: config.page_data.page_id,
                    channel: VIP.defaultParam.is_app ? 'app' : 'wap',
                    mobile_platform: VIP.defaultParam.is_app ? 3 : 2,
                    mobile_channel: VIP.getQueryString('mobile_channel'),
                    user_token: VIP.getQueryString('user_token'),
                    warehouse: VIP.defaultParam.warehouse || window.config.data.page_data.warehouse || 'VIP_NH',
                    app_version: VIP.defaultParam.app_version,
                    sale_platform: VIP.getQueryString('sale_platform'),
                    mars_cid: VIP.defaultParam.mars_cid
                };

            $.extend(data, param);

            if(data.page_id) {
                $.ajax({
                    url: 'http://mst.vip.com/Special/getFavouriteServiceList',
                    data : data,
                    dataType: 'jsonp',
                    success: function(res) {
                        callback && callback(res);
                    }
                });
            }
        },
        doFavCoupon : function (param, callback) {
            var data = {
                    // act: type,
                    // brand_sn: sn, //'10010639'
                    // brand_id: id, //'14582829'
                    source : VIP.defaultParam.is_app ? 3 : 2,
                    client : VIP.defaultParam.client,
                    channel : VIP.defaultParam.is_app ? 'app' : 'wap',
                    mobile_platform: VIP.defaultParam.is_app ? 3 : 2,
                    mobile_channel : VIP.getQueryString('mobile_channel'),
                    user_token : VIP.getQueryString('user_token'),
                    warehouse : VIP.defaultParam.warehouse || window.config.data.page_data.warehouse || 'VIP_NH',
                    app_version : VIP.defaultParam.app_version,
                    sale_platform : VIP.getQueryString('sale_platform'),
                    mars_cid : VIP.defaultParam.mars_cid
                };

            $.extend(data, param);

            if(data.act && data.brand_sn && data.brand_id) {
                $.ajax({
                    url: 'http://mst.vip.com/Special/favouriteServiceNew',
                    data: data,
                    dataType: 'jsonp',
                    showLoading: true,
                    success: function(res) {
                        callback && callback(res);
                    }
                });
            }
        },
        getFavBtn : function (params, id) {
            return params.dom.find('.' + params.favClass + '['+ params.attrPre + '-fav-id' +'='+ id +']');
        },
        doFav : function (param, callback) {
            var data = {
                    // act: type,
                    // brand_sn: sn, //'10010639'
                    // brand_id: id, //'14582829'
                    source : VIP.defaultParam.is_app ? 3 : 2,
                    client : VIP.defaultParam.client,
                    channel : VIP.defaultParam.is_app ? 'app' : 'wap',
                    mobile_platform: VIP.defaultParam.is_app ? 3 : 2,
                    mobile_channel : VIP.getQueryString('mobile_channel'),
                    user_token : VIP.getQueryString('user_token'),
                    warehouse : VIP.defaultParam.warehouse || window.config.data.page_data.warehouse || 'VIP_NH',
                    app_version : VIP.defaultParam.app_version,
                    sale_platform : VIP.getQueryString('sale_platform'),
                    mars_cid : VIP.defaultParam.mars_cid
                };

            $.extend(data, param);

            if(data.act && data.brand_sn && data.brand_id) {
                $.ajax({
                    url: 'http://mst.vip.com/Brand/changeFavState',
                    data: data,
                    dataType: 'jsonp',
                    showLoading: true,
                    success: function(res) {
                        callback && callback(res);
                    }
                });
            }
        },
        render : function (params, id, type) {
            var $favBtn = VIP.Favorite.getFavBtn(params, id);

            if (type == 'add') {
                $favBtn.attr(params.attrPre + '-fav-type', 'cancel')
                    .addClass(params.favClass +'-off');
            } else if (type == 'cancel') {
                $favBtn.attr(params.attrPre + '-fav-type', 'add')
                    .removeClass(params.favClass +'-off');
            }
        },
        handleDoFav : function (res, params, id) {
            var data = res.data ? (res.data[id] || res.data) : res.data,
                msg = '',
                couponMsg = '',
                mars = {},
                pmsData = data.pms_data,
                $favBtn = VIP.Favorite.getFavBtn(params, id),
                type = $favBtn.attr(params.attrPre + '-fav-type'),
                hasCoupon = parseInt($favBtn.attr(params.attrPre + '-fav-coupon'));

            // console.log(res,data,pmsData);

            if (res.result) {
                //收藏成功·
                if (res.code) {
                    //有红包且收藏时才出弹层
                    if (data.type == 'cancel') {
                        msg = '收藏成功！';
                        if (!hasCoupon) {
                        } else {
                            couponMsg = VIP.Coupon.handleDoCoupon(pmsData, '', res.brand_id);
                            msg = couponMsg !== false ? msg + couponMsg : msg;
                        }
                    } else {
                        msg = '取消收藏成功';
                    }
                    // 加入收藏埋点
                    mars = data.type == 'cancel' ? VIP.Mars.get('blike|'+ res.brand_id) : VIP.Mars.get('cblike|'+ res.brand_id);
                    Mar.Seed.request("mst","click",'mst_brand_click', JSON.stringify(mars));
                } else {
                    msg = '收藏失败!请稍后再试。';
                }

                if (!!msg) {
                    VIP.notify_tips(msg, 2000);
                }

                VIP.Favorite.render(params, data.brand_id, type);
            } else {
                // 未登录处理
                if (res.code == 99 && data._redirect != '') {
                    VIP.Login.go();

                    return false;
                } else {
                    msg = data.type === 'add' ? '取消' : '';
                    VIP.notify_tips(msg + '收藏失败！请稍微再试。', 2000);
                }
            }
        }
    }

    /**
     * 红包
     * @type {Object}
     */
    VIP.Coupon = {
        getList : function (param, callback) {
            var data = {
                    // brand_ids: brands.join(','),
                    mars_cid: VIP.defaultParam.mars_cid,
                    wap_consumer: VIP.defaultParam.wap_consumer,
                    app_version: VIP.defaultParam.app_version
                };

            $.extend(data, param);

            $.ajax({
                url: 'http://mst.vip.com/Special/getCouponInfo',
                data : data,
                dataType: 'jsonp',
                success: function(res) {
                    callback && callback(res);
                }
            });
        },
        doCoupon : function (param, callback) {
            var data = {
                    // brand_id: id, //'14582829'
                };

            $.extend(data, param);

            if(data.brand_id) {
                $.ajax({
                    url: 'http://mst.vip.com/Brand/bindCoupon',
                    data: data,
                    dataType: 'jsonp',
                    success: function(res) {
                        callback && callback(res);
                    }
                });
            }
        },
        handleDoCoupon : function (res, name, id) {
            var msg = '',
                title = '',
                ctn = '',
                data = res.data;

            if (res.code == 1) {
                // var brandName = $target.parents('.tpl_brand').find('.tpl_brand_name').html() + '可用';

                //只有一张券
                if (res.num == 1) {
                    msg = '已获得' + data[0].fav + '元优惠券，滿' + data[0].buy + '元可用。';
                } else{
                    title = '领取成功';

                    if(data){
                        $.each(data, function(index, val) {
                            ctn += '<p>【￥' + val.fav + '】满' + val.buy + '可用；</p>';
                        });
                    }

                    //部分领取成功
                    if (data && res.num != data.length) {
                        ctn = '<p>已领取' + '(部分券已被抢光):</p>' + ctn;

                    //全部领取成功
                    } else {

                        ctn = '<p>已领取' + res.num + '张券' + ':</p>' + ctn;

                    }

                    //显示弹层
                    VIP.dialog({
                        title: title,
                        ctn: ctn
                    });

                    return false;
                }

            //领券失败
            } else if(res.code == 13332){
                console.log('领券失败！code:' + res.code);
                return false;
            } else {
                msg = res.msg;
                console.log('领券失败！code:' + res.code);
            }

            return msg;
        }
    }


    //弹窗
    VIP.dialog = (function() {
        var $dom = $('#specialContent'),
            template = '<div class="mst-dialog"> \
                <div class="mask"></div> \
                <div class="mst-dialog-content"> \
                    <div class="mst-dialog-head">${title}</div> \
                    <div class="mst-dialog-body">{{html ctn}}</div> \
                    <div class="mst-dialog-btn">确定</div> \
                </div> \
            </div>',

            $tmpl = $.tmpl();

        $dom.on('click', '.mst-dialog .mask,.mst-dialog-btn', function() {
            $('.mst-dialog').animate({opacity : 0},
                100, function() {
                $(this).remove();
            });
        })

        return function(opts) {
            var $tmpl = $.tmpl(template,opts);

            $dom.append($tmpl);
            $tmpl.fadeIn(300).show();
        }
    })();

    /**
     * 前台暴露接口列表
     */
    VIP.interface = {
        Favorite : VIP.Favorite
    }

    //全屏浮层
    VIP.floatLayer = (function() {
        var $dom = $('#specialContent'),
            template = '<div class="mst-layer"> \
                <div class="mst-layer-content"> \
                    <div class="mst-layer-title u-border-b">${title}</div> \
                    <div class="mst-layer-body">{{html ctn}}</div> \
                    <div class="mst-layer-footer">\
                        <button class="mst-layer-btn mst-layer-btn-cancel">关闭</button>\
                    </div> \
                </div> \
            </div>',
            $tmpl = $.tmpl();

        $dom.on('click', '.mst-layer .mst-layer-btn-cancel', function() {
            $('.mst-layer').animate({opacity : 0},
                100, function() {
                $(this).remove();
            });
        })

        return function(opts) {
            var $tmpl = $.tmpl(template,opts);
            $dom.append($tmpl);
            $tmpl.fadeIn(300).show();
        }
    })();

    /**
     * 专题调试信息
     * @param  {String} ){                     var template [description]
     * @return {[type]}     [description]
     */
    // VIP.log = (function(){
    //     var template = '<div class="mst-log">\
    //             <div class="mst-log-wrap">\
    //                 <div class="mst-console">\
    //                     <p class="mst-log-title">组件调试信息</p>\
    //                 </div>\
    //             </div>\
    //         </div>',
    //         $log = $(template);

    //     $log.appendTo($('body'));

    //     // 重写console
    //     console.log = (function(oriLogFunc){
    //         return function(str) {
    //             oriLogFunc.apply(console, arguments);
    //             $log.find('.mst-console').append('<p class="mst-console-p">'+ Array.prototype.slice.call(arguments).join(',') +'</p>');
    //         }
    //     })(console.log);
    // })();

    /**
     * 登陆
     * @type {Object}
     */
    VIP.Login = {
        check : function (param,callback) {
            $.ajax({
                url: 'http://mst.vip.com/Special/checkLoginStatus',
                dataType: 'jsonp',
                data : param
            })
            .done(function(res) {
                if(callback) {
                    callback(res);
                }else{
                    // 没有登陆跳转登陆
                    if(!res.result) {
                        VIP.Login.go();
                    }

                    return res.result;
                }
            })
            .fail(function() {
                console.log("检查用户接口失败！");
            })
        },
        popup : function () {
            if(typeof loginDeal != 'undefined') {
                VIP.Login.showPopup();
            }else{
                $.getScript('https://mlogin.vip.com/asserts/js/login-deal.min.js',function () {
                    $("<link>")
                        .attr({ rel: "stylesheet",
                            type: "text/css",
                            href: "https://mlogin.vip.com/asserts/css/login.css"
                        })
                        .appendTo("head");

                    VIP.Login.showPopup();
                })
            }
        },
        showPopup : function () {
            loginDeal.go({
                usePop : true,
                needReg : false,//是否需要注册
                isWeixinLogin: true,//微信端是否展示一键登录
                isviva : false,//是否是活动页面
                backUrl : encodeURIComponent(location.href),//登陆之后跳转到的url
                onWinLogin : function() {

                },//弹窗登录回调
                onBeforeJumpLogin : function() {

                }//跳转式登录
            });
            VIP.Loading.hide();
        },
        go : function () {
            // 是否使用弹窗登陆
            var isPopUpLogin = VIP.getConfigValueByKey('extend','switch','is_popup_login');

            if (VIP.defaultParam.is_app) {
                window.location.href = 'vipshop://login';
            } else {
                if(isPopUpLogin === "1") {
                    VIP.Login.popup();
                    // $.getScript('https://mlogin.vip.com/asserts/js/login-deal.min.js',function () {

                }else{
                    window.location.href = 'https://mlogin.vip.com/user-login.html?&back_act=' + encodeURIComponent(location.href);
                }
            }
        }
    }

    /**
     * 全局登录
     *
     */
    VIP.Loading = (function () {
        $('body').append(VIP.tmpl.loading);

        return {
            dom : $('#J-mst-global-loading'),
            show : function () {
                this.dom.fadeIn(200);
            },
            hide : function () {
                this.dom.fadeOut(200);
            }
        }
    })();

    /**
     * 初始化设置
     *
     */
    VIP.init = (function(){
        // console.log($.ajaxSetup);
        // 全局设置ajax
        $.ajaxSetup({
            beforeSend : function (func, param) {
                if(param.showLoading) {
                     VIP.Loading.show();
                }
            },
            complete : function () {
                VIP.Loading.hide();
            }
        })

        return function () {

        }
    })();

    /**
     * 750方案
     */
    // 强制设成1.0,动态设置scale,没有用rem的组件会被缩小
    VIP.Rem = {
        adaption : function () {
            var win = window;
            var lib = window['mst_lib'] || (window['mst_lib'] = {});

            var doc = win.document;
            var docEl = doc.documentElement;
            var metaEl = doc.querySelector('meta[name="viewport"]');
            var flexibleEl = doc.querySelector('meta[name="flexible"]');
            var dpr = 0;
            var scale = 0;
            var tid;
            var flexible = lib.flexible || (lib.flexible = {});

            if (metaEl) {
                console.warn('将根据已有的meta标签来设置缩放比例');
                var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
                if (match) {
                    scale = parseFloat(match[1]);
                    dpr = parseInt(1 / scale);
                }
            } else if (flexibleEl) {
                var content = flexibleEl.getAttribute('content');
                if (content) {
                    var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
                    var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
                    if (initialDpr) {
                        dpr = parseFloat(initialDpr[1]);
                        scale = parseFloat((1 / dpr).toFixed(2));
                    }
                    if (maximumDpr) {
                        dpr = parseFloat(maximumDpr[1]);
                        scale = parseFloat((1 / dpr).toFixed(2));
                    }
                }
            }

            if (!dpr && !scale) {
                var isAndroid = win.navigator.appVersion.match(/android/gi);
                var isIPhone = win.navigator.appVersion.match(/iphone/gi);
                var devicePixelRatio = win.devicePixelRatio;
                if (isIPhone) {
                    // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
                    if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                        dpr = 3;
                    } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
                        dpr = 2;
                    } else {
                        dpr = 1;
                    }
                } else {
                    // 其他设备下，仍旧使用1倍的方案
                    dpr = 1;
                }
                scale = 1 / dpr;
            }

            docEl.setAttribute('data-dpr', dpr);
            if (!metaEl) {
                metaEl = doc.createElement('meta');
                metaEl.setAttribute('name', 'viewport');
                metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
                if (docEl.firstElementChild) {
                    docEl.firstElementChild.appendChild(metaEl);
                } else {
                    var wrap = doc.createElement('div');
                    wrap.appendChild(metaEl);
                    doc.write(wrap.innerHTML);
                }
            }

            function refreshRem(){
                var width = docEl.getBoundingClientRect().width;
                if (width / dpr > 540) {
                    width = 540 * dpr;
                }
                var rem = width / 10;
                // debugger
                docEl.style.fontSize = rem + 'px';
                flexible.rem = win.rem = rem;
            }

            win.addEventListener('resize', function() {
                clearTimeout(tid);
                tid = setTimeout(refreshRem, 300);
            }, false);
            win.addEventListener('pageshow', function(e) {
                if (e.persisted) {
                    clearTimeout(tid);
                    tid = setTimeout(refreshRem, 300);
                }
            }, false);

            if (doc.readyState === 'complete') {
                doc.body.style.fontSize = 12 * dpr + 'px';
            } else {
                doc.addEventListener('DOMContentLoaded', function(e) {
                    doc.body.style.fontSize = 12 * dpr + 'px';
                }, false);
            }


            refreshRem();

            flexible.dpr = win.dpr = dpr;
            flexible.refreshRem = refreshRem;
            flexible.rem2px = function(d) {
                var val = parseFloat(d) * this.rem;
                if (typeof d === 'string' && d.match(/rem$/)) {
                    val += 'px';
                }
                return val;
            }
            flexible.px2rem = function(d) {
                var val = parseFloat(d) / this.rem;
                if (typeof d === 'string' && d.match(/px$/)) {
                    val += 'rem';
                }
                return val;
            }
        },
        fixViewPort : function () {
            var width = VIP.getQueryString('ipadWidth') ? VIP.getQueryString('ipadWidth') : 'device-width';

            if(!$('meta[name=viewport]').length){
                $('head').append('<meta name="viewport" content="width='+ width +', initial-scale=1.0, minimum-scale=1.0 , maximum-scale=1.0, user-scalable=no">');
            }else{
                $('meta[name=viewport]').attr('content', 'width='+ width +', initial-scale=1.0, minimum-scale=1.0 , maximum-scale=1.0, user-scalable=no');
            }

            //调用m站新方案
            typeof window._set_font_size_750 === 'function' && window._set_font_size_750();
            // 750方案 end
        },
        init : function () {
            this.fixViewPort();
            this.adaption();
        }
    }

    VIP.Rem.init();

    //专题彩蛋
    if (win.config && win.config.data) {
        VIP.easterEggs = {
            count: 0,
            timing: 0,
            info: {
                page_id: {label:'专题id', data:config.data.id},
                special_name: {label:'专题名称', data:$('title').text()},
                start_time: {label:'开始时间', data:config.data.page_data.start_time},
                end_time: {label:'结束时间', data:config.data.page_data.end_time},

                warehouse: {label:'分仓', data:VIP.defaultParam.warehouse},
                user_type: {label:'用户类型', data:config.extend.user_type.user_type},
                cdi_type: {label:'用户群体', data:config.extend.cdi_type.join(',')},
                net: {label:'网络环境', data:VIP.defaultParam.net},
                client: {label:'客户端', data:VIP.defaultParam.client},
                app_name: {label:'App名称', data:VIP.defaultParam.app_name},
                app_version: {label:'App版本', data:VIP.defaultParam.app_version},

                brands: {label: '页面档期数', data: [] },
                products: {label: '页面商品数', data: [] },
                log: {label:'组件报错信息', data:[]}
            },
            timedCount: function(){
                if (this.count < 9) {
                    this.count += 1;
                    console.log(this.count)
                    this.timing = setTimeout(function() {
                        VIP.easterEggs.timedCount();
                    }, 1000);
                } else if (this.count == 9) {
                    this.showInfo(this.info);
                    this.resetTime();
                } else {
                    this.resetTime();
                }
            },
            resetTime: function(){
                this.count = 0;
                clearTimeout(VIP.easterEggs.timing);
            },
            showInfo: function(info){
                var template = '<li class="u-border-b">${label}: ${data}</li>',
                    $ul = $('<ul></ul>'),
                    html = '';
                $.each(info, function(k, v) {
                    if (v.data && v.data.length) {
                        html = $.tmpl(template, v);
                        $ul.append(html);
                    }
                });
                VIP.floatLayer({
                    title: '彩蛋信息',
                    ctn: $ul[0].outerHTML
                });
                $('html').addClass('scroll-fix');
            },
            show: function(){
                this.showInfo(this.info);
            }
        }
    }

    win.renderer = new Renderer;

    if (win.config) {
        win.renderer.init({
            config: win.config
        });
    }

})
