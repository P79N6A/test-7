<template>
	<ol class="breadcrumb" v-last="lastLink" v-ahref="links">
		<li v-for="link in links" v-link="{path: link.url, exact: true}"><a>{{link.text}}</a></li>
	</ol>
</template>


<script>
	import { lastCrumb , crumbs} from 'appVuex/getters';
	import {setBreadCrumbs} from 'appVuex/actions';

	export default {
		name:'Breadcrumb',
		data(){
			return {};
		},
		vuex: {
			getters: {
				lastLink: lastCrumb,
				links: crumbs
			},
			actions:{
				setBreadCrumbs
			}
		},
		ready(){
			this.setBreadCrumbs({url: this.$route.path});
		},
		directives: {
			last: {//处理最后的li不包含a
				deep: false,
				update(lastLink) {
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