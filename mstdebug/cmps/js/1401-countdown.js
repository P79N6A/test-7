/*倒计时 JS开始*/

    //没有数据处理
    if (config.model == null || Array.isArray(config.model) || config.model === false) {
        return
    }

    var model = config.model,
        html = '<div class="countdown-wrap"><p class="txt"><em>'+ (model.text ? model.text : '距离抢购结束还剩')  +'</em></p><div class="counter"></div></div>',
        intfPre = typeof intfHost == 'undefined' ? '' : intfHost,
        data = config.data,
        client = VIP.getQueryString('client') ? VIP.getQueryString('client') : 'wap',
        // 修复startTime.getTime is not a function
        startTime = model.start_time ? VIP.stringToDate(model.start_time).getTime() : 0,
        curTime = window.config ? window.config.extend.server_time * 1000 : new Date().getTime(),
        endTime = model.end_time ? VIP.stringToDate(model.end_time) : 0,
        flag = false,
        wrap = dom.find('.plugin-countdown'),
        width = wrap.width(),
        curCountdown = false,
        isEditPage = config.page_data.page_show_type == 'edit';

    init();

    function init(){
        checkTime();
        if(curCountdown){
            setBackground();
            wrap.append(html);
            handleFloat();
            showCountdown();
        }

    }

    function checkTime(){
        if(isEditPage){
            curCountdown = model;
        } else {
            // 修复startTime.getTime is not a function
            if (curTime > startTime && curTime < endTime.getTime()) {
                curCountdown = model;
            } else if(model.time_list && model.time_list.length){
                $.each(model.time_list, function(key, value){
                    if(curTime > VIP.stringToDate(value.start_time).getTime() && curTime < VIP.stringToDate(value.end_time).getTime()){
                        curCountdown = value;
                        return false;
                    }
                });
            }
        }
        if(curCountdown === false){
            wrap.css('height', 'auto')
        }
        console.log(curCountdown)
    }

    function setBackground(){
        switch(curCountdown.bgtype){
            case '1':
                //普通白色背景
                break;

            case '2':
                //普通黑色背景
                wrap.addClass('bg-black');
                wrap.css({"background-color" : '#000000'});
                break;

            case '3':
                //自定义背景色
                if(curCountdown.bgcolor){
                    wrap.css({"background-color" : '#' + curCountdown.bgcolor});
                }
                break;

            case '4':
                //自定义背景图
                if(curCountdown.phone_pic_src || curCountdown.pad_pic_src){
                    var imgSrc = client.indexOf('pad') > -1  ? ($.trim(curCountdown.pad_pic_src) ? curCountdown.pad_pic_src : curCountdown.phone_pic_src)  : curCountdown.phone_pic_src;
                    if(imgSrc){
                        wrap.css({"background" : 'url(' + imgSrc + ')'+'no-repeat top center'});
                        wrap.css({"background-size" : '100%'});
                    }
                }
                break;

            default:
                break;
        }
    }

    function setStyle(){
        if (curCountdown.textcolor) {
            wrap.find('.txt').css({"color" : '#' + curCountdown.textcolor});
        }
        if(curCountdown.color == '2'){
            wrap.addClass('bg-black');
        }
        if (curCountdown.text) {
            wrap.find('.txt>em').text(curCountdown.text);
        } else {
            wrap.find('.txt>em').text('距离抢购结束还剩');
        }
        if(wrap.width() > 540){
            wrap.css('height',wrap.width()*135/750+'px');
        }

    }

    function handleFloat(){
        if (curCountdown.is_float === 'true' && curCountdown.float_pos && !isEditPage) {
                wrap.addClass('countdonw-float');

            if (curCountdown.float_pos == 'top') {
                wrap.css({
                    "top": 0,
                    "margin-left": -(width / 2)
                })
            } else if (curCountdown.float_pos == 'bottom') {
                wrap.css({
                    "bottom": 0,
                    "margin-left": -(width / 2)
                })
            }

            $(window).bind('load scroll resize', function(e) {
                var top = $(window).scrollTop(),
                    parent = wrap.parent(),
                    defaultTop = parent.offset().top,
                    defaultHeight = wrap.height(),
                    _width = wrap.width();

                if (e.type == 'load') {
                    flag = true;
                    parent.height(defaultHeight);
                }

                if (flag) {
                    if (curCountdown.float_pos == 'top') {
                        if (top >= defaultTop) {
                            wrap.addClass('countdonw-float').css({
                                "top": 0,
                                "margin-left": -(_width / 2)
                            });
                        } else {
                            wrap.removeClass('countdonw-float').css('margin-left', 'auto');
                        }
                    }

                    if (curCountdown.float_pos == 'bottom') {
                        if (top >= (defaultTop + defaultHeight)) {
                            wrap.addClass('countdonw-float').css({
                                "bottom": 0,
                                "margin-left": -(_width / 2)
                            });
                        } else {
                            wrap.removeClass('countdonw-float').css('margin-left', 'auto');
                        }
                    }
                }
            });
        }

    }

    function showCountdown(){
        $.ajax({
            url: 'http://mst.vipstatic.com/demo/js/countdown.js',
            dataType: 'script',
            cache : true
        })
        .done(function() {
            new Countdown({
                container : dom.find('.counter:eq(0)'),
                endTime : curCountdown.end_time,
                msecDigit : 1,
                oncomplete : function () {
                }
            });

            // 当页面为编辑状态时，设置最小宽度
            if(isEditPage){
                $('body').css({
                    "min-height" : wrap.height()
                })
            }
            //设置样式
            setStyle();
        })
        .fail(function() {
            console.log("获取countdow.js 失败！");
        })
    }

    /*JS结束*/