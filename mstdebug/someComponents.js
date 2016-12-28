
eachKey = (o, fn) => {
	for (key in o) {
		if (o.hasOwnProperty(key)) {
			fn(o[key], key, o);
		}
	}
};

arr = []; eachKey(config.data.htmlList, (html, key) => arr.push( `------------- ${key} ---------\r\n${html}` ));
copy(arr.join('\r\n'));
arr2 = []; eachKey(config.data.jsList, (code, key) => arr2.push(`\/\/ --------------- ${key} ---------------\r\n${code}`));
copy(arr2.join('\r\n'));


arr3 = config.data.moduleList.map(m => m.module_type_id + '---' + m.style_id)
copy(arr3.join('\r\n'))

// -------------------------------------------- \\

// ------------ share--- 5 ---------------
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
// ------------ coupon--- 221 ---------------
/*开始*/
if(Array.isArray(config.model) || config.model === false  || config.model === null) return;

	function __isindexof (arr,key,value) {
		console.log(arr);
		for (var i = 0; i < arr.length; i++) {
			if (arr[i][key] == value ) {
				return true;
			}
		};
		return false;
	}

	function __isindexof_all (arr,key,value) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i][key] == value ) {
				return true;
			}else{
				return false;
			}
		};
	}

	/**
	 * 获取具体的mars_seed，根据url来匹配。
	 * @param  {[type]} url   链接
	 * @param  {[type]} key   链接所在循环的序列
	 * @param  {[type]} index 组件ID
	 * @return {[type]}       返回对应mars_sead
	 */

	function getMarsSeed(url,key,index){
		var _seed = '',
			_url = url.split('?')[0],
			_regUrlFileName = /(.*\/){0,}([^.]+).*/ig,
			_reg,
			_id;

		if(_url.indexOf('msp.appvipshop.com') > -1){
			if(_url.indexOf('/cmstopic/') > -1){
				_id = _url.replace(_regUrlFileName,"$2");
				_seed = 'jump_mzt_' + _id;
			}else if(_url.indexOf('/vis/') > -1){
				_reg = /\/pages\/(\d+)\//;
				_id = _url.match(_reg)[1];
				_seed = 'jump_vis_' + _id;
			}else if(url.indexOf('wapid=mzt') > -1){
				_id = getQueryString(url, 'wapid');
				_seed = 'jump_' + _id;
			}
		}else if(_url.indexOf('mst.vip.com') > -1){
			_id = _url.replace(_regUrlFileName,"$2");
			_seed = 'jump_mst_' + _id;
		}else if(_url.indexOf('ma.vip.com') > -1){
			_id = getQueryString(url, 'wapid');
			_seed = 'jump_' + _id;
		}else if(_url.indexOf('viva.vip.com') > -1){
			_id = _url.replace(_regUrlFileName,"$2");
			_seed = 'jump_viva_' + _id;
		}else{
			_seed = 'jump_url';
		}

		function getQueryString(url, name) {
	        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	        var r = url.split('?')[1].match(reg);
	        if (r != null) return unescape(r[2]);
	        return '';
	    }

		return _seed + '_' + key + '_' + index;
	}



	function init_pophtml (str,time) {
		mar_request_str();

		var __time = time ? time : 2000;
		function __init_pophtml () {
			var pop_html = '<div id="plugin-lingjuan-fix" data-event="plugin-lingjuan-fix"></div>';
			return pop_html;
		}
		
		function render_pophtml () {
			var fix_dom = $('[data-event="plugin-lingjuan-fix"]');
			
			VIP.notify_tips(str,__time);

			setTimeout(function(){
	    		fix_dom.remove();
			},__time);
		}

		$("body").append( __init_pophtml() );
		render_pophtml();
	}

	function mar_request_str_jump (url) {
		Mar.Seed.request("mst","click",url);
	}

	function mar_request_str () {
		var __new_str = "";

		if (config.model.coupon_id["new"] == "") {
			__new_str = '[0]';
		} else{
			__new_str = '['+config.model.coupon_id["new"]+']';
		}

		var __old_str = "";
		if (config.model.is_diff_new_old == "false") {
			__old_str = '['+config.model.coupon_id["new"]+']';
		}else{
			if (config.model.coupon_id["old"] == "") {
				__old_str = '[0]';
			} else{
				__old_str = '['+config.model.coupon_id["old"]+']';
			}
		}

		var __request_str = 'coupon_'+ initIndex() + '_'+__new_str+'_'+__old_str;

		Mar.Seed.request("mst","click",__request_str);
	}

	function event_img (data) {
		img.on('click', function(event) {
			var _this = this;
			if ( $(_this).attr("islogin") && $(_this).attr("islogin") == "no" ) {
				mar_request_str();
				window.location.href = gologin();
			}else if( $(_this).attr("clickget") == "saleout" ){
				init_pophtml(config.model.text_saleout);
			}else if( $(_this).attr("clickget") == "error" ){
				init_pophtml(config.model.text_fail);
			}else{
				if ( $(_this).attr("clickget") == "unsupport" ) {
					init_pophtml(config.model.text_unsupport);
				}else if ( $(_this).attr("clickget") == "before" ) {
					getCoupon(user_typeall);
				} else if ( $(_this).attr("clickget") == "after" ){
					init_pophtml(data.text);
				}
			}
		});
	}

	function gologin(){
		if (VIP.defaultParam.client == "wap" ) { 
	        return "https://mlogin.vip.com/user-login.html?back_act=" + encodeURIComponent(window.location.href);
		} else{
			return "vipshop://login";
		};
	}

	function getCoupon(user_type){
		var data_obj = {
			"text":""
		};
		function __callback(str){
			init_pophtml(data_obj.text);
			img.attr("clickget","after");
	    	img.off("click").on('click', function(event) {
	    		init_pophtml(str);
	    	});
		}
		
		$.ajax({
	        url: initAjaxurlPrefix() + '/Special/getCoupon',
	        type: 'GET',
			dataType : 'jsonp',
	        data : {
	            coupon_id : coupon_id_arr[0],
	            plugin_id : config.id
	        },
	        success: function(data) {
	        	var __data = data.data;
	        	// console.log(__data);
	        	
	        	function __show_fail(){
	        		init_pophtml(config.model.text_fail);
					img.attr("clickget","before");
			    	img.off("click").on('click', function(event) {
			    		init_pophtml(config.model.text_fail);
			    	});
	        	}
	        	// __data = null;

	        	if ( __data == undefined || __data == null) {
	        		console.log("APP/m站");
	        		data_obj.text = config.model.text_fail;
        			__show_fail();
	        		return;
	        	}

	        	if ( __isindexof(__data,"code",0) ) { 
	        		data_obj.text = config.model.text_fail;
        			__show_fail();
	        	} else{
		        	if( __isindexof( __data,"code",-1) ){
	            		set_img_src(config.model,"saleout");
	            		img.attr("clickget","saleout");
	                	event_img(config.model.text_saleout);
		        	}else{
			        	if( __isindexof(__data,"code",1011) ){
			        		set_img_src(config.model,"after");
		            		data_obj.text = config.model.text_already;
		        			__callback(config.model.text_already);
			        	}else{
			        		if( __isindexof_all(__data,"code",1999) ){
				        		set_img_src(config.model,"after");
			            		data_obj.text = config.model.text_success;
			        			__callback(config.model.text_already);
				        	}else{
				        		img.attr("clickget","error");
	            				event_img(config.model.text_fail);
				        	}
			        	}
		        	} 
	        	} 
	        },
	        error:function(){
	        	data_obj.text = config.model.text_fail;
	        	__callback(config.model.text_fail);
	        }
	    });
	}

	function checkLoginStatus(callback){
		$.ajax({
			url: initAjaxurlPrefix() + '/Special/getUserType',
			type: 'GET',
			dataType : 'jsonp',
			success:function(data){
				var __user_type = ""; 
				if ( data.data.user_type.indexOf("C") >= 0 ) {
					__user_type = "old";
				} else{
					__user_type = "new";
				};
				user_typeall = __user_type;

				callback && callback( user_typeall );
			},
			error:function(){
			}
		});
	}

	function setcoupon_id(user_type){
		var __coupon_id;
		var __user_type = user_type;

		function __set(str){
			__user_type = str ? str : __user_type;
			
			__coupon_id = config.model.coupon_id[__user_type];
		}
		
		if (config.model.is_diff_new_old === "true" ) {

			if (config.model.coupon_id["old"].length == 0 ) { 
				__set("new");
			}else{
				__set();
			}
		} else{
			__set("new");
		}
		return __coupon_id;
	}

	function set_img_src(obj,timestr){
		var client = VIP.getQueryString('client'),
			padImg = obj.pad_info[timestr+"_img"],
			phoneImg = obj.phone_info[timestr+"_img"],
			_src = '';

		_src = (client && client.indexOf('pad') > -1)  ? (padImg ? padImg : phoneImg)  : phoneImg;
		
		img.attr("src",_src);
	}

	function checkGetCoupon(user_type){

		var data_obj = {
			"text":"",
			"url":""
		};
		function __callback(data,timestr){
			set_img_src(data,timestr);
	    	img.attr("clickget",timestr);
	    	event_img(data_obj);
		}

		function __setinit_couopnid(){
	    	if (config.model.is_diff_new_old === "false") {
	    		return  setcoupon_id("new");
	    	} else{
	    		return setcoupon_id(user_type);
	    	}

		}
		
		function __checkGetCoupon(){
			$.ajax({
	            url: initAjaxurlPrefix() + '/Special/checkGetCoupon',
	            type: 'GET',
				dataType : 'jsonp',
	            data : {
	                coupon_id : __setinit_couopnid()
	            },
	            success: function(data) {
	            	var __data = data.data;
					data_obj.url = gologin();

	                if (data.code == 99 ) {
	                	img.attr("islogin","no");
	            		set_img_src(config.model,"before");
	                	img.removeAttr("coupon_id");
	                	event_img(data_obj);
	                }else{
	                	img.attr("islogin","yes");

						if ( __data.state == 0) {
							if ( __data.can_use != "" ) {
								coupon_id_arr.push( __data.can_use );
								__callback(config.model,"before");
							} else{
								coupon_id_arr.push( __setinit_couopnid() );
								__callback(config.model,"before");
							}
						}else if ( __data.state == 1) {
							data_obj.text = config.model.text_already;
                    		__callback(config.model,"after");	
						}else if ( __data.state == -1) {
	                		set_img_src(config.model,"saleout");
	                		img.attr("clickget","saleout");
	                    	event_img(config.model.text_saleout);
						}else{
							coupon_id_arr.push( __setinit_couopnid() );
							__callback(config.model,"before");
						}
	                }
	            },
	            error:function(){
	            	set_img_src(config.model,"before");
	            	img.attr("clickget","error");
	            	event_img(data_obj);
	            }
	        });
		}

		if ( config.model.is_diff_new_old === "true" ) { 
			if (user_type == "old") {
				if (config.model.coupon_id["old"] == "") {
					set_img_src(config.model,"before");
		        	img.attr("clickget","unsupport");
		        	event_img({
		        		"url":"",
		        		"text":config.model.text_unsupport
		        	});
				}else{
					__checkGetCoupon();
				}
			} else{
				 if(config.model.coupon_id["new"] == ""){
					set_img_src(config.model,"before");
		        	img.attr("clickget","unsupport");
		        	event_img({
		        		"url":"",
		        		"text":config.model.text_unsupport
		        	});
				}else{
					__checkGetCoupon();
				}
			}
		} else{
			config.model.coupon_id["new"] != "" && __checkGetCoupon();
		}
	}

	function initAjaxurlPrefix(){
		return ( typeof intfHost == 'undefined' ) ? 'http://mst.vip.com' : intfHost;
	}

	function initIndex(){
		return ( typeof index == 'undefined' ) ? 'editindex' : index;
	}

	function replace_couponid(str){
		if (config.model.coupon_id[str].length != 0) {
			if ( typeof parseInt(config.model.coupon_id[str][0]) != "number" ) {
				config.model.coupon_id[str] = config.model.coupon_id[str].substr(1);
			}

			if ( typeof parseInt(config.model.coupon_id[str][ config.model.coupon_id[str].length - 1]) != "number" ) {
				config.model.coupon_id[str] = config.model.coupon_id[str].substr(0, config.model.coupon_id[str].length-1);
			}

			config.model.coupon_id[str] = config.model.coupon_id[str].replace(/，/g, ",");
		}
	}

	var coupon_id_arr = [],
		user_typeall,
		img = $('<img id="lingjuan'+ config.id +'">');

	dom = dom.find(".plugin-lingjuan").attr("id","plugin-lingjuan"+config.id);
	img.appendTo(dom);
	

	if ( typeof config.model.is_jump != "undefined"  && config.model.is_jump == "true" ) {
		
		set_img_src(config.model,"before");

		img.on('click',  function(event) {
			
			var __url,__title,__isBlank;
			if (config.model.jump_url != "") {
				__url = config.model.jump_url;
				__title = config.model.jump_title;
				__isBlank = config.model.is_blank;

				if (VIP.defaultParam.client != "wap" ) { 
					if ( __url.indexOf("?") > -1) {
						__url = __url + (__isBlank === 'true' ? '&m=webview&' : '&') + 'title=' + (__title ? encodeURIComponent(__title) : '');
					} else{
						__url = __url + (__isBlank === 'true' ? '?m=webview&' : '?') + 'title=' + (__title ? encodeURIComponent(__title) : '');
					}
				}
				var mar_url = getMarsSeed(VIP.getToSpecialTopicUrl(__url),0,initIndex());

				mar_request_str_jump(mar_url);
				window.location.href = VIP.getToSpecialTopicUrl(__url);
			}

		});
	} else{
		//正常业务
		if (!! config.model.coupon_id ) {
			if (config.model.is_diff_new_old == "true" && config.model.coupon_id["new"] == '' && config.model.coupon_id["old"] == '' ) {
	    		dom.siblings("style").remove();
	    		dom.remove();
			}else if(config.model.coupon_id["new"] == '' && config.model.is_diff_new_old == "false"){
				dom.siblings("style").remove();
	    		dom.remove();
			}else{
				config.model.coupon_id["new"] && replace_couponid("new");
				config.model.coupon_id["old"] && replace_couponid("old");

				checkLoginStatus(function(user_type){
		        	$.ajax({
		                url:  initAjaxurlPrefix() + '/Special/checkLoginStatus',
		                type: 'GET',
						dataType : 'jsonp',
		                success: function(data) {
		                	if (data.code == 1) {
								checkGetCoupon(user_type);
		                	} else{
		                		set_img_src(config.model,"before");
		                    	img.attr("islogin","no");
		                    	event_img({
		                    		"url": gologin(),
		                    		"text":""
		                    	});
		                	};

		            	},
		            	error:function(){
		            	}
		            });
				});
			}
		}
	}
/*结束*/
// ------------ head--- 999 ---------------
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
// ------------ purchase--- 1000 ---------------
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
                    v.mst_mars = "category|"+ v.category_one_id + '|' + v.category_two_id;
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
// ------------ nav--- 1002 ---------------
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
// ------------ countdown--- 1401 ---------------
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