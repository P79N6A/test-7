import alert from 'components/alert';
import badge from 'components/badge';

var Wui = {
	alert,
	badge,
	install(Vue){
		Vue.component('WuiAlert', alert);
		Vue.component('WuiBadge', badge);
	}
};

//in browser
if (typeof window !== 'undefined' && typeof Vue !== 'undefined') {
	Wui.install(Vue);
}

module.exports = Wui;