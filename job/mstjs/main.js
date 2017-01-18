'use strict';

/**
 * 组件录入脚本格式
 * 脚本写在return function里
 * 
 * {Object config}，module的配置信息
 * {jQuery this}，插入页面的dom元素，脚本执行时，dom元素已插入
 */
(function (){
	return function(dom, config){
		var tmpl,
			html = '',
			img = $('<img>');

		//没有数据处理
		if(Array.isArray(config.model) || config.model === false){
			return
		}

		img.appendTo(dom)
			.attr('src', config.model.phone_pic_src)
			.load(function(){//::大图加载完， 添加热区<a>
				$.each(config.data,function (k,v) {
					$.each(config.model.list,function (key,value) {
						if(k == value.position){
							html += '<a class="link" href="'+ v +'" style="position:absolute;left:'+ value.left +'px;top:'+ value.top +'px; width:'+ value.width +'px; height:'+ value.height +'px;"></a>';
						}
					});
				});

			dom.append(html);
		})
	}

})()
