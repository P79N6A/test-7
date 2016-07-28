/**
 * @ 全局扩展自定义指令
 */

function addDirective(name, options) {
	exports[name] = options;
}

//设置A的href
addDirective('ahref', {
	update(data) {
		this.vm.$nextTick(function() {
			$(this.$el).find('a:not([href])').attr('href','javascript:;');
		});
	}
});

//点击元素以外区域 隐藏元素
addDirective('clickout', {
	twoWay: true,
	bind(el){
		let clickOutCallback = (evt) => { 
			 if(this.el && !this.el.contains(evt.target)){
			 	this.set(false); //隐藏元素
			 }
		};

		//注: 由于vue自动stopPropagation()的机制，事件不一定能冒泡到body
		$('body').on('click', clickOutCallback); 
	}
});

//设置元素高度适应窗口高度
addDirective('higher', {

	bind() {
		
		var offsetTop = $(this.el).offset().top; 
	
		this.handler = function () {
			// var clientH = Math.max(document.documentElement.clientHeight, document.documentElement.scrollHeight);
			var clientH = document.documentElement.clientHeight;
			var $offsetEle = $(this.expression);

			var padTop = parseFloat($(this.el).css('paddingTop'));
			var padBtm = parseFloat($(this.el).css('paddingBottom'));
			var brdTop = parseFloat($(this.el).css('borderTop'));
			var brdBtm = parseFloat($(this.el).css('borderBottom'));
			$(this.el).height(clientH - offsetTop - padTop - padBtm - brdTop - brdBtm - $offsetEle.outerHeight(true));
		}.bind(this);

		$(window).on('resize', this.handler);
		this.vm.$nextTick(function () {
			$(window).resize();
		});
		
	},
	unbind() {
		$(window).off('resize', this.handler);
	}

});

//非fixed定位的元素 模拟fixed定位
addDirective('fixed', {
	bind(){
		var body = document.body, root = document.documentElement;
		var $ele = $(this.el);
		var initOffsetTop, initTop;


		Vue.nextTick(function(){
			initOffsetTop = $ele.offset().top;

			if ($ele.css('position') === 'absolute') {
				initTop = $ele.css('top') === 'auto' ? $ele[0].offsetTop : $ele.css('top');
			}else{
				if ($ele.css('position')!=='relative') {
					$ele.css('position', 'relative');
				}
				initTop = $ele.css('top') === 'auto' ? 0 : $ele.css('top');
			}
		});

		var onscroll = function(){
			var scrollTop = body.scrollTop || root.scrollTop;
			var diff = scrollTop - initOffsetTop;

			// console.warn(scrollTop, initOffsetTop, diff, initTop);
			if(diff > 0){
				$ele.css('top', initTop+diff);
			}else{
				$ele.css('top', initTop);
			}
		};

		$(window).on('scroll', onscroll);
	}
});

addDirective('hide', (isHide) => {
	this.el.style.display = isHide ? 'none' : 'block';
});