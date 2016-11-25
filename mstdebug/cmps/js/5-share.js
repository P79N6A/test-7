if (!config.model || Array.isArray(config.model) || config.model === false) {
    return
}

var share = $('<div class="share-abs" mars_sead="mst_share_btn_"'+ index +'></div>'),
    defaultParam = VIP.defaultParam,
    model = config.model,
    wrap,
    url = '',
    shareUrl = location.href.split('?')[0] + '?mst_page_type=share',
    version = VIP.defaultParam.app_version;

wrap = dom.find('.plugin-share');

// iphone 5.1 版本不encode url
if(defaultParam.client == 'iphone' && version == '5.1'){
    // href = href;
}else{
    shareUrl = encodeURIComponent(shareUrl);
}

// APP前端调用的方法
if (window.JSBridge) {
    $.extend(true, window.JSBridge, {
        fnList: {
            onWebviewChange: function(data){
                //data.type  0：后退，1：前进
                // alert('成功调用onWebviewChange，type=' + data.type);//app 给的数据
                VIP.share.autoshare();
            },
            onShareClick: function(data){
                // data.position  分享按钮位置，header:头部，bottom:底部
                // alert('调用onShareClick成功，position=' + data.position);
                VIP.share.appShare(model.plugin_id, shareUrl)
            }
        }
    });
}


VIP.share.autoshare = function (argument) {
    window.location.href = 'vipshop://autoShare?type=1';
}

VIP.share.appShare = function (url) {
    window.location.href = 'vipshop://shareSpecial?shareId='+ model.plugin_id +'&specialUrl='+ shareUrl +'&callbackId=2';
}

/**
 * wiki : http://wiki.corp.vipshop.com/pages/viewpage.action?pageId=33076705
 * 正式环境
 * app版本大于5.9需要调用vipshop://autoShare?type=1 来显示分享icon
 */
if(config.page_data.page_show_type != 'frontend' || VIP.share.canShare()){
    if(model.is_tab == 'false' && ((defaultParam.is_iphone || defaultParam.is_android) && VIP.compareVersion(version, '5.9'))
        || (defaultParam.is_ipad && VIP.compareVersion(version, '5.21') && VIP.getQueryString('inChannel') !== '1')){
        VIP.share.autoshare();
    }else{
        wrap.append(share);

        if(model.bg && model.bg != ''){
            share.css("background-image" , 'url(' + model.bg + ')');
        }

        share.bind('click',function () {
            url = "vipshop://shareSpecial?shareId="+ model.plugin_id + "&specialUrl=" + shareUrl;
            window.location.href = url;
        });
    }
}

if (config.page_data.page_show_type == 'edit') {
    var $editContent = $('<div class="mst-share-content"><img><p></p></div>');

    // 获取分享数据
    $.ajax({
        url : 'http://mcp.vip.com/share/get_app_share',
        data : {
            id : model.plugin_id,
            plat_type: 'wap',
            share_type: 'subject'
        },
        dataType : 'jsonp',
        jsonpCallback : 'callbackcomshare',
        success : function (res) {
            if(res.code == 1){
                var data = res.data,
                    appshare = VIP.getQueryString('appshare'),
                    rtObj,content;

                rtObj = getShareData(data,'weixin');
                content = rtObj.share_content[0] || rtObj.share_title;

                $editContent.appendTo(wrap);
                $editContent.find('img').attr('src',rtObj.share_image);
                $editContent.find('p').html('标题：' + rtObj.share_title + '<br/> 内容：' + content);
            }

            function getShareData(data,type){
                for (var i = 0, rt; i < data.share_channels.length; i++) {
                    if(data.share_channels[i].channel == type){
                        rt = data.share_channels[i];
                    }
                };

                return rt;
            }
        }
    })

    // 编辑时高度占位
    $('body').css({
        "min-height" : 200
    })
}


// m站调起app逻辑
var probability = Math.random() >= 0.5,
    angent = navigator.userAgent,
    isAndroid = angent.indexOf('Android') > -1 || angent.indexOf('Adr') > -1,
    isIos9 = angent.match(/OS (9|[1-9]\d+)_\d[_\d]* like Mac OS X/i),
    ruid = VIP.cookie('m_vipruid'),
    isOdd = ruid ? ruid % 2 : 0;

if((VIP.defaultParam.is_wap && isIos9) && (!ruid || isOdd === 1)){
    var tempUrl = 'http://mst.vip.com/uploadfiles/exclusive_subject/te/v1/'+ VIP.getConfigValueByKey('data','id') +'.php?mst_source_from=wap',
        jumpLink = 'http://mst.vip.com/deeplink/showWebview?url=' + encodeURIComponent(tempUrl);

    var $container = dom.find('.plugin-app-caller'),
        $wrap = dom.find('.mst-caller-bar'),
        $hodler = $('<div></div>'),
        $cart = $('#J-cart-cmp'),
        wrapHeight;

    $container.show();
    $container.find('.mst-caller-link').attr({
        'href' : jumpLink,
        'mst-mars' : 'deeplink'
    });
}