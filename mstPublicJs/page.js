(function(win,doc){
    // 翻页控制器
    function Pager (options){
        // this.config(options);
    }

    $.extend(Pager.prototype, {
        page : {
            offset : 0,
            limit : 10
        },

        // usePageByNum : {
        //     pageNo : 'pg',
        //     pageSize : 'ps',
        // },

        originalOffset : 10,

        txtNoMoreData : '<div class="more_btn loading"></div>', //^_^，亲，没有更多了

        txtGetMoreData : '<div class="more_btn loading"></div>', //查看更多在售品牌..

        txtNetErrorData : '<div class="more_btn loading"></div>', //网络延时，请重试..

        txtLoading : '<div class="more_btn loading"><img src="http://m.vip.com/view/touch/images/common/loading-big.gif" alt="loading" />加载中</div>',

        // 距离more元素1000px开始加载
        threshold : 1000,

        // more元素 是否加载的决定性参照物
        more : $('.J_pager_more'),

        config : function(options){
            $.extend(this, options);

            if(!this.usePageByNum) {
                this.page.offset = this.getOffset();
            }
            
            this.imageClassName = this.el.data('img-class');
            this.isInitialized = true;
            this.sendMars();
            this.init();
        },

        getOffset : function(){
            var offset, remainder, limit = parseInt(this.page.limit,10), originalOffset = this.originalOffset;

            // 如果初始offset大于limit，则从offset - remainder开始取值
            if(originalOffset >= limit){
                remainder = originalOffset % limit;
                offset = originalOffset - remainder;
            // 否则从0开始取值
            } else {
                offset = 0;
            }

            return offset;
        },

        // 发送埋点
        sendMars : function(){
            if(!this.mars) return false;
            Mar.Seed.request("link", "click", this.mars, this.page.offset);
        },

        load : function(e, data){
            // console.log(!this.isInitialized, this.isLoading , this.isDone , !this.isInView());
            if(!this.isInitialized || this.isLoading || this.isDone || !this.isInView()) return false;

            this._beforePage();
            this.getData();
        },

        // 通过threshold more $(win).height() $(win).scrollTop()判断是否进去可加载视窗
        isInView : function(){
            var more = this.more;
            if(!more.length) return false;
            if(more.offset().top - $(win).scrollTop() - $(win).height() < this.threshold) return true;
        },

        getData : function(){
            var reqData;

            reqData = $.extend(this.reqData, this.page);

            $.ajax({
                url : this.url,
                data : this.reqData,
                dataType : 'jsonp',
                success : $.proxy(this.handleSuccess, this),
                error : $.proxy(this.handleError, this)
            });

            // console.log('request: ' + this.url);
            // console.log('data: ', this.reqData);
        },

        filterData : function(data){
            var offset = this.page.offset, originalOffset = this.originalOffset;

            // 如果第一次请求数据返回，过滤重复数据
            if(offset < originalOffset){
                data = data.slice(originalOffset - offset);
            }

            return data
        },

        handleSuccess : function(res){
            // console.log('response: ', res);

            if(res && (res.result || res.code == 200)){
                // 返回成功，且有数据
                if(res.data.length > 0) {
                    this.render(res.data, res);
                // 返回成功，但无数据，如最后一页
                } else {
                    this.isDone = true;
                }
            // 返回服务器错误
            } else {
                this.handleError();
            }

            this._afterPage();

        },

        handleError : function(){
            this.error();
            this.isLoading = false;
            // console.log('----- pager get data error -----');
        },

        error : function(){
            this.more.html(this.txtNetErrorData);
        },

        beforePage : function(){
            this.more.html(this.txtLoading);
        },

        afterPage : function(){
            // 如果已经加载完
            if(this.isDone) {
                this.more.html(this.txtNoMoreData);
            // 还没加载完
            } else {
                // $('.' + this.imageClassName).slice(this.page.offset).lazyload({
                //     effect: "fadeIn",
                //     effect_speed: 100,
                //     threshold: 1000
                // });

                this.more.html(this.txtGetMoreData);
            }
        },

        _beforePage : function(){
            this.beforePage();
            this.isLoading = true;
            // console.log('----- Pager get data begin -----');
        },

        _afterPage : function(){
            this.afterPage();
            this.isLoading = false;
            // 索引起始位置增加一个limit，不能以res的数量为准，因为有可能取10条数据只返回9条，之后再取就有重复数据出现
            // 还需要重新定义php的page参数
            // console.log(parseInt(this.page.offset,10) + parseInt(this.page.limit,10));
            
            if(!this.usePageByNum) {
                this.setPage({
                    offset : parseInt(this.page.offset,10) + parseInt(this.page.limit,10),
                    limit : this.page.limit
                })
            }else{
                this.page[this.usePageByNum.pageNo]++;
            }
            

            this.sendMars();
            // console.log('----- pager get data end -----');
        },

        setPage : function(opts){
            $.extend(this.page, opts);
        },

        render : $.noop,

        init : $.noop,

        isLoading : false,

        isDone : false,

        isInitialized : false
    })

    VIP.pager = new Pager;

    var bodyEvent = [
        // 返回上一页
        {
            ev : 'click',
            selector : '.J_backToPrev',
            callback : function(){
                var a = window.location.href;
                if (/#top/.test(a)) {
                    win.history.go(-2);
                } else {
                    win.history.go(-1);
                }
            }
        },

        {
            ev : 'click',
            selector : '.J_loadMore',
            callback : function(){
                VIP.pager.isDone = false;
                VIP.pager.load();
            }
        }
    ]
    // 绑定
    $.each(bodyEvent, function(k, v){
        $('body').delegate(v.selector, v.ev, v.callback);
    });

    var windowEvent = [
        {
            ev : 'loadMore',
            selector : '',
            callback : function(e, data){
                // console.log();
                VIP.pager.load(e, data);
            }
        },
        // 将滚动事件统一处理，减少事件遍历的消耗
        {
            ev : 'scroll',
            selector : '',
            callback : function(){
                var scrollTop = $(this).scrollTop();

                $(this).trigger('loadMore');
                $(this).trigger('processTip', {sTop : scrollTop});
                $(this).trigger('fixingTitle', {sTop : scrollTop});
            }
        }
    ]
    // 绑定
    $.each(windowEvent, function(k, v){
        $(win).delegate(v.selector, v.ev, v.callback);
    });
})(window, document)
