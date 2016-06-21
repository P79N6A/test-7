/**
 * @ 全局扩展自定义指令
 */

function appendDirective(name, options) {
	exports[name] = options;
}

appendDirective('bread', {

	bind() {},
	update(link) {
		if (!link.text) {
			link.text = this.el.textContent;
		}
		if (!link.level && this.arg) {
			link.level = this.arg - 0;
		}
		//没有level参数 则不影响面包屑
		if (link.level == null) {
			return;
		}

		if (this.el.tagName.toUpperCase() === 'A') {
			this.el.setAttribute('href', 'javascript:xx;');
		}

		this.handler = function () {
			this.vm.$store.dispatch('BREADCRUMBS_SET', link);
		}.bind(this);
		this.el.addEventListener('click', this.handler);
	},
	unbind() {
		this.handler && this.el.removeEventListener('click', this.handler);
	}

});

appendDirective('higher', {

	bind() {
		this.handler = function () {
			var clientH = document.documentElement.clientHeight;
			var offsetTop = $(this.el).offset().top;
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

appendDirective('hide', (isHide) => {
	this.el.style.display = isHide ? 'none' : 'block';
});