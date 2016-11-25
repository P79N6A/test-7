// 品购
// 没数据处理
if(config.model === null || Array.isArray(config.model) || config.model === false){
    return
}


// 埋点为 brand_brandid，product_brandid_productid
var tmpl = '<a href="javascript:" data-product-id="${product_id}" data-brand-id="${brand_id}" mars_sead="${mars_sead}" class="link {{if notInSale}}notInSale{{/if}}" style="position:absolute;left:${left};top:${top}; width:${width}; height:${height};" {{if click}}onclick="${click}"{{/if}} {{if mst_mars}}mst-mars="${mst_mars}"{{/if}}></a>',
    html = '',
    defaultParam = VIP.defaultParam,
    img = $('<img>'),
    dom = dom.find('.plugin-pingou'),
    imgFrag = document.createDocumentFragment(),
    intfPre = typeof intfHost == 'undefined' ? '' : intfHost,
    isPingou = false,
    proIds = [],
    width_hotbox = [],
    height_hotbox = [],
    list, 
    src,
    preview = VIP.getQueryString('extra_preview');




src = (VIP.getQueryString('client') && VIP.getQueryString('client').indexOf('pad') > -1) ? config.model.pad_pic_src ? config.model.pad_pic_src : config.model.phone_pic_src  : config.model.phone_pic_src;

if(typeof config.model.phone_pic_src == 'string'){
    // 兼容旧情况处理
    img.appendTo(dom)
        .attr('src', src)
        .load(function(){
            imgLoaded();
        });
}else if (typeof config.model.phone_pic_src == 'object') {
    // 大图切分后优化
    if(!src.imgs || config.page_data.page_show_type == 'edit'){
        img.appendTo(dom)
            .attr('src', src.source)
            .load(function(){
                imgLoaded();
            });
    }else {
        var percent = dom.width() / src.width,
            curHeight = src.height * percent;

        $.each(src.imgs ,function (key,value) {
            var img = new Image();

            img.className = 'pingou-lazy';
            img.setAttribute("data-original", value);
            img.setAttribute("src", 'http://mst.vip.com/demo/image/placeholder.png');
            img.height = percent * parseInt(src.average_height, 10);
            imgFrag.appendChild(img);
        });

        dom.append(imgFrag);
        // dom.height(Math.floor(curHeight));

        $("img.pingou-lazy").lazyload({
            threshold : 1000,
            // effect : "fadeIn",
            placeholder : "http://mst.vip.com/demo/image/placeholder.png",
            load : function () {
                var that = this;

                setTimeout(function () {
                    that.removeAttribute('height');  
                }, 200)
            }
        });

        imgLoaded();
    }
}

function imgLoaded () {
    list = config.model && config.model.list;
    if(!list) return false;
    // console.log("list:");
    // console.log(list);

    $.each(config.model.list, function (k, v) {
        var defaultTitle = '唯品会';
        var rank = (index + 1) + '_'+ (k + 1),
            target = v.isBlank == 'true' ? 'blank' : 'self';
        // 品购热区
        if(v.position != undefined){
            isPingou = true;
            var data = config.data && config.data[v.position],
                type = 'addCart',
                productName = '',
                brandName = '',
                url;

            if(data == null){
                v.click = null;
            }else {
                switch(typeof data){
                    case 'undefined':
                        v.click = null;
                        break;
                    case 'string':
                        if(data == ''){
                            v.click = null;
                        }else{
                            v.url = data;
                        }
                        break;
                    case 'object':
                        productName = data.product_name ? encodeURIComponent(data.product_name) : encodeURIComponent(defaultTitle);
                        brandName = data.brand_name ? encodeURIComponent(data.brand_name) : encodeURIComponent(defaultTitle);

                        //不跳转
                            if(window.config && window.config.extend){
                              var server_time =  window.config.extend.server_time || +new Date()/1000;
                            }else{
                              var server_time = +new Date()/1000;
                            }

                        if(data.mst_link_type == 'product'){
                            var isInSale = VIP.isInSale( data.sellTimeFrom * 1000);

                            v.click = 'VIP.router(this, "product", "' + data.brand_id + '-' + data.product_id + '","");';
                            v.brand_id = data.brand_id;
                            v.product_id = data.product_id;
                            v.mst_mars = "product|" + data.brand_id + "|" + data.product_id;

                            if(preview !== '1'){
                                // state 为 0,商品已下架
                                if(data.state == 0 || (+(data.sellTimeTo || data.sell_time_to) < server_time)){
                                    v.notInSale = true;
                                    v.click = null
                                    // 还未开售，而且没有预热
                                }  
                            }
                            
                            if(data.is_effective && isInSale){
                                proIds.push(v.product_id);    
                            }
                        }else if (data.mst_link_type == 'brand') {

                            // v.url = "http://m.vip.com/brand-" + data.brand_id + "-0-0-0-1-0-1-20.html?m=brand&brand_id=" + data.brand_id;
                            v.brand_id = data.brand_id;
                            v.brand_name = brandName;
                        
                            v.mst_mars = "brand|" + data.brand_id;

                            // vis逻辑，0为品购
                            if(data.vis && data.visType == 0 && VIP.isInSale( data.sell_time_from * 1000) ){
                                v.click = 'VIP.router(this, "vis", "' + data.vis + '",null,"");';
                            } else {
                                v.click = 'VIP.router(this, "brand", ' + v.brand_id + ',"");';
                            }

                            if(preview !== '1'){
                                if( (data.product_number_state == 2)   // 没有商品
                                  || (+(data.sellTimeTo ||　data.sell_time_to) < server_time)   //下架
                                  || (+(data.sellTimeFrom ||　data.sell_time_from) > server_time && data.preHeat==0)
                                ){
                                  v.notInSale = true;
                                  v.click = null;
                                }
                            }

                        }

                        break;
                    default:
                        v.click = null;
                        break;
                }
        
            }

        // 普通url热区
        } else {
            // 专题跳专题，需要补参
            var url = v.url;

            switch(+v.index){
                case 1:
                    if(url != '' && typeof url != "undefined"){
                        v.click = "VIP.router(this, 'url', '"+ v.url +"', '唯品会', '"+ target +"')";
                        v.mst_mars = "url|" + v.url;
                    }
                    break;
                case 2:
                    v.click = "VIP.router(this, 'index')";
                    v.mst_mars = "home";
                    break;
                case 3:
                    v.click = "VIP.router(this, 'virtual', '"+ v.virtualProductId + (v.virtualType ? '|' + v.virtualType : '') +"')";
                    v.mst_mars = "virtual";
                    break;
                case 4:
                    v.click = "VIP.router(this, 'app-category', '"+ (v.category_one_id + "|" + v.category_two_id + "|" + v.category_two_title) +"')";
                    v.mst_mars = "category|"+ v.category_two_id;
                    break;
                case 5:
                    v.click = "VIP.router(this, 'subchannel', '"+ (v.channelId + "|" + v.channelMenu) +"')";
                    v.mst_mars = "subchannel";
                    break;
                            
                default:
                    url = 'javascript:';
                    break;
            }
        }

    });
    
    $.tmpl(tmpl, list).appendTo(dom);

    // 调用商品库存接口
    if (isPingou && proIds.length > 0 ) {
        VIP.getSoldOutListNew({
            product_id : proIds.join(','),
            mars_cid : defaultParam.mars_cid,
            is_mobile : 1
        },function (res) {
            if(res.result && res.data){
                $.each(res.data, function(key, val) {
                    if(val.type == 1) {
                        dom.find('a.link[data-product-id=' + key + ']').addClass("saleout") 
                    }
                })
            }
        });
    };

    // $(window).bind('load',function () {
    //     VIP.Sizing && VIP.Sizing.init();
    // });
}