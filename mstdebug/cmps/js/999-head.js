/*开始*/
if(config.model === null || Array.isArray(config.model) || config.model === false) return;
/*定时任务*/
if(checkTiming() === false) return;

var tmpl = '<a href="javascript:" class="link" style="position:absolute;left:${left};top:${top}; width:${width}; height:${height};" {{if click}}onclick="${click}"{{/if}} {{if mst_mars}}mst-mars="${mst_mars}"{{/if}}></a>',
    html = '',
    img = $('<img>'),
    list,
    pageData = config.page_data,
    anchor,url , imgSrc,
    client = VIP.getQueryString('client') ? VIP.getQueryString('client') : 'wap',
    $wrap;

$wrap = dom.find('.plugin-tupian');

function checkTiming(){
    if(!window.config || !window.config.extend) return;
    var server_time = window.config.extend.server_time ? parseInt(window.config.extend.server_time) : false;
    if(server_time && config.model.live){
         var start_date = config.model.live.start_time ? VIP.stringToDate(config.model.live.start_time) : false;
         var end_date = config.model.live.end_time ? VIP.stringToDate(config.model.live.end_time) : false;
         var start_time = start_date ? start_date.getTime()/1000 : false;
         var end_time = end_date ? end_date.getTime()/1000 : false;
         if(start_time && server_time < start_time || end_time && server_time > end_time){
             console.log('不在定时任务范围');
              return false;
         } else {
              return true;
         }
    } else {
          return true;
    }
}

function checkCdiType(imgSrc){
    if(!window.config || !window.config.extend) return imgSrc;
    var cdi_type = window.config.extend.cdi_type;
    var rules = config.model.rules;
    var rule_pic_src = config.model.rule_pic_src;
    if(rules && cdi_type && cdi_type.length && rules.length){
        for(var i = 0; i < cdi_type.length; i++){
            for(var j = 0; j < rules.length; j++){
                if(cdi_type[i] == rules[j].rule_id && JSON.parse(rules[j].checked) === true){
                    var phone_pic_src = rule_pic_src[rules[j].id].phone_pic_src,
                            pad_pic_src = rule_pic_src[rules[j].id].pad_pic_src;
                    console.log('匹配人群：'+ cdi_type[i]);
                    if(phone_pic_src){
                        imgSrc = client.indexOf('pad') > -1  ? (pad_pic_src ? pad_pic_src : phone_pic_src)  : phone_pic_src;
                        return imgSrc;
                    }
                }
            }
        }
        return imgSrc;
    } else {
        return imgSrc;
    }
}

imgSrc = client.indexOf('pad') > -1  ? ($.trim(config.model.pad_pic_src) ? config.model.pad_pic_src : config.model.phone_pic_src)  : config.model.phone_pic_src;
imgSrc = checkCdiType(imgSrc);

img.attr('src', imgSrc);
img.appendTo($wrap)
.load(function(){
    list = config.model && config.model.list;
    anchor = config.model.anchor;
    $wrap.attr('data-anchor-name', anchor);

    // 清除headgroup高度
    dom.parents('.plugin-head-group').height('auto');

    if(!list || !list.length) return false;

    $.each(config.model.list, function (k, v) {
        var data = {},
            url = v.url,
            target = v.isBlank == 'true' ? 'blank' : 'self';

        switch(+v.type){
            case 1:
                if(url != '' && typeof url != "undefined"){
                    v.click = "VIP.router(this, 'url', '"+ v.url +"', '唯品会', '"+ target +"')";
                    v.mst_mars = "url|" + v.url;
                }
                break;

            case 2:
                v.click = 'VIP.router(this, "brand", ' + v.brand_id + ',"唯品会");';
                v.mst_mars = "brand|" + v.brand_id;
                break;

            case 3:
                v.click = 'VIP.router(this, "product", "' + v.brand_id + '-' + v.product_id + '","唯品会");';
                v.mst_mars = "product|" + v.brand_id + "|" + v.product_id;
                break;

            case 4:
                var anchor = '$("[data-anchor-name=' + v.anchor + ']").offset().top';
                
                v.click = 'window.scrollTo(0, '+ anchor +')';
                v.mst_mars = 'anchor|' + v.anchor;
                break;
            case 5:
                v.click = "VIP.router(this, 'index')";
                v.mst_mars = "home";
                
                break;
        }
    });
/*second*/
    html = $.tmpl(tmpl, list);
    $wrap.append(html);
    VIP.Mars.set(index);
});

/**
 * 临时修复mars 相关问题
 * @param  {[type]} VIP.Mars [description]
 * @return {[type]}          [description]
 */
if(VIP.Mars) {
    VIP.Mars.get = function (data,rank) {
        var mars = {
                "page" : encodeURIComponent(document.title),
                "wap_id" : VIP.defaultParam.wap_id,
                "special_id" : VIP.defaultParam.special_id,
                "banner_id" : VIP.defaultParam.extra_banner || "0",
                // "brand_id" : "档期ID",
                // "goods_id" : "商品ID",
                // "brand_rank" : "档期所在坑位ID",
                // "brandtyp" : "档期类型0-档期；1-商品；2-品购",
                // "target_type" : "目标类型",X
                // "target_id": "根据目标类型，填对应目标id",
                // "module" : "组件序号",
                // "seq" : "当前坑位序号",
                // "tag" : "销售归因tag"
            },
            data = data.split('|'),
            ranks = rank ? rank.split('_') : [];

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
                ranks[0] && (mars.module = ranks[0]);
                ranks[1] && (mars.seq = ranks[1]);
                break;
        }

        return mars;
    }

    VIP.Mars.set = function (index) {
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
                    speicalId = VIP.defaultParam.special_id || 0,
                    bannerId = VIP.defaultParam.extra_banner || 0,
                    tag = '',
                    timeStamp = new Date().getTime(),
                    pre = bannerId + '_' + speicalId + '_' + rank + '_' + timeStamp;

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
                        tag = pre + '_' + (mars[1] ? mars[1] : 0);
                        break;
                }

                $this.attr('mst-tag', tag);
            })
        }
}
/*end*/

//临时fixdbug,当视窗太小时出现滚动条,布局错乱问题，重新触发rem计算修复
setTimeout(function () {
    try{
        window.mst_lib.flexible.refreshRem();
    }catch(e){

    }
}, 300);