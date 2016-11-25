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