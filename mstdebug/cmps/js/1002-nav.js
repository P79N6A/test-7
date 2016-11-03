var html = '',
    nav = $('<nav></nav>'),
    defaultParam = VIP.defaultParam,
    frag = document.createDocumentFragment(),
    model = config.model,
    navName = 'nav'+ config.id,
    anchors = [],
    selected = model.selected ? model.selected - 1 : 0,
    clickEvent = 'click',
    defaultHeight, defaultRatio, defaultTop, el, src, wrap;

wrap = dom.find('.plugin-nav');

nav.addClass(navName).appendTo(wrap);

src = (VIP.getQueryString('client') && VIP.getQueryString('client').indexOf('pad') > -1) ? model.pad_pic_src ? model.pad_pic_src : model.phone_pic_src  : model.phone_pic_src;

var img = $('<img>');
img.attr('src',src).load(function () {
    // console.log(this.width,this.height);
    var imgWidth = this.width,
        imgHeight = this.height,
        width = (1 / model.per_line * 100).toFixed(2) - 0.005,
        height = (model.per_line / model.total).toFixed(4) * 100,
        style = '<style>',
        defaultTitle = '唯品会';

    // -0.005是为了兼容 1/6 = 的哲学问题。

    style += '.'+ navName +' a {width:'+ width +'%; height:'+ height +'%; }';

    style += '.' + navName + ' {background-image: url("'+ src +'"); background-size:100%;}';

    // if(model.pad_pic_src){
    //  style += '@media screen and (min-width: 1024px){ ';
    //  style += '.' + navName + ' a {background-image: url("'+ model.pad.bg +'")}';
    // }

    // 处理导航的数据
    $.each(model.list, function (key, v) {
        var a = document.createElement('a'),
            $a = $(a),
            className = navName +'-item' + (key + 1),
            param = {},
            hasParam, url,
            mars_sead = '';

        // 处理默认选中

        if(key == selected){
            $a.addClass('active');
        }

        a.href = 'javascript:';

        switch(v.type){
            case "1":
                url = v.url;

                if(url != '' && typeof url != "undefined"){
                    $a.attr('mst-mars', "url|" + v.url)
                        .on(clickEvent, function(e) {
                            VIP.router(this, 'url', v.url, '唯品会', 'slef');
                        });
                }

                break;
            case "2":
                v.click = 'VIP.router(this, "brand", ' + v.brand_id + ',"唯品会");';
                $a.attr('mst-mars', "brand|" + v.brand_id)
                    .on(clickEvent, function(e) {
                        VIP.router(this, "brand", v.brand_id ,"唯品会");
                    });
                break;
            case "3":
                v.click = 'VIP.router(this, "product", "' + v.brand_id + '-' + v.product_id + '","唯品会");';
                $a.attr('mst-mars', "product|" + v.brand_id + "|" + v.product_id)
                    .on(clickEvent, function(e) {
                        VIP.router(this, "product", v.brand_id + '-' + v.product_id ,"唯品会");
                    });
                break;
            case "4":
                anchors.push(v.url);
                $a.bind(clickEvent,function (e) {
                        e.preventDefault();

                        var $floor = $('.plugin-tupian[data-anchor-name='+ v.url +']'),
                            oft = Math.ceil($floor.offset().top) - Math.ceil(nav.height());

                        if($floor.length == 1){
                            window.scrollTo(0,oft);
                        }else {
                            console.log('锚点名称配置有错...');
                        }
                    })
                    .attr('href','javascript:')
                    .attr('rel-anchor', v.url);

                $a.attr('mst-mars', 'anchor|' + v.url);

                break;
            case "5":
                $a.attr('mst-mars', "home")
                    .on('click', function(e) {
                        e.preventDefault();
                        VIP.router(this, 'index');
                    });
                break;
            default:
                break;
        }

        frag.appendChild(a);

        $a.addClass(className);
    });

    style += '</style>';

    changeItemHeight();

    wrap.append(style);
    nav.append(frag);
    VIP.Mars.set(index);

    $(window).bind('resize',changeItemHeight);

    // console.log(dom.attr('data-fix'));

    if(wrap.attr('data-fix') == ''){
        var flag = true;
        $(window).bind('load scroll resize touchstart',function (e) {
            var top = $(window).scrollTop(),
                left = - nav.width() / 2;

            defaultHeight = nav.height();
            defaultRatio = defaultHeight / imgWidth;
            defaultTop = wrap.offset().top;

            if(e.type == 'load'){
                flag = true;
            }

            $.each(anchors,function (key,value) {
                var $floor = $('.plugin-tupian[data-anchor-name='+ value +']'),
                    oft,
                    isInSide = false;

                if($floor.length == 1){
                    oft = $floor.offset().top - Math.ceil(defaultHeight);

                    if(top >= oft){
                        changeItemActive(value);

                        $.each(anchors, function(k, v) {
                            var ioft = $('.plugin-tupian[data-anchor-name='+ v +']').offset().top - Math.ceil(defaultHeight);

                            if(k > key && oft > ioft) {
                                isInSide =  true;
                                return false;
                            }
                        });

                        if(isInSide){
                            return false;
                        }
                    }

                    // 去掉选中效果
                    if(key == 0 && top < oft){
                        changeItemActive();
                    }
                }else {
                    console.log('锚点名称配置有错...');
                }
            })

            if(flag){
                if(top >= defaultTop){
                    nav.addClass('fix-top');
                    nav.css('margin-left', left);
                }else{
                    nav.removeClass('fix-top');
                    nav.css('margin-left', 0);
                }

                changeItemHeight();
            }
        })
    }

    // 改变导航的高度
    function changeItemHeight () {
        var height = Math.floor(nav.width() / imgWidth * imgHeight / model.total);

        nav.height(height);
        wrap.height(height);

        changeBackPos();
    }

    function changeBackPos () {
        var wHeight = nav.height(),
            aWidth = Math.floor(nav.width() / model.per_line),
            aHeight = Math.ceil(nav.height() / Math.ceil(model.total / model.per_line)),
            $as = nav.find('a'),
            $cur = nav.find('.active'),
            pos = $as.index($cur);

        // console.log(pos);

        pos = pos == -1 ? 0 : pos;
        // console.log(pos);

        nav.css({
            "background-position" : '0 -' + pos * Math.round(nav.width() / imgWidth * (imgHeight / model.per_line)) + 'px'
        })

    }

    // 改变导航选中效果
    function changeItemActive (name) {
        var $as = nav.find('a[rel-anchor]'),
            $cur = nav.find('a[rel-anchor='+ name +']'),
            $active = nav.find('a.active'),
            $default = nav.find('a').eq(selected);

        if(name){
            $active.removeClass('active');
            $cur.addClass('active');
        }else{
            if(!$active.is($default)){
                $default.addClass('active');
            }
        }
    }
})