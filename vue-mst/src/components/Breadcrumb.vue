<template>
	<ol class="breadcrumb" v-last="lastLink">
		<li v-for="link in links" v-link="{path: link.url, exact: true}" v-bread="link"><a href="javascript:;">{{link.text}}</a></li>
	</ol>
</template>


<script>
	import { lastCrumb , crumbs} from '../vuex/getters';
	import actions from '../vuex/actions';

	export default {
		data(){
			return {};
		},
		vuex: {
			getters: {
				lastLink: lastCrumb,
				links: crumbs
			},
			actions:{
				setBreadCrumbs: actions.setBreadCrumbs
			}
		},
		ready(){
			this.setBreadCrumbs({url: this.$route.path});
		},
		directives: {
			last: {
				deep: false,
				update: function(lastLink) {
						var len = this.vm.links.length;
						Vue.nextTick(function(){
							$(this.el).find('li').each(function(i, li){
								if(i === len -1){// last
									$(li).addClass('active').html($(li).text());
								}else{
									if(!$(li).find('a').length){
										$(li).removeClass('active').html('<a href="javascript:;">' + $(li).text() + '</a>');
									}
								}
							});
						}.bind(this));
					}			
			}
		}
	}
</script>