<template>
	<ul :class="{nav: true, 'nav-tabs': type==='tabs','nav-pills': type==='pills','nav-justified': justified,'nav-stacked': stacked}">
		<li v-for="link in links" :class="{active: link.active}" @click="activate(link)" v-bread="link">
			<a v-link="{path: link.url}">{{link.text}}</a>
		</li>
	</ul>
</template>

<script>
	
	import VIP from 'services/public';
	var ensureBoolean = VIP.makeBoolean;

	export default {
		props:{
			type: String,
			justified: {
				type: Boolean,
				default: false,
				coerce: ensureBoolean
			},
			stacked: {
				type: Boolean,
				default: false,
				coerce: ensureBoolean
			},
			links: {
				type: Array,
				default: function(){ return []; }
			}
		},
		data(){
			return {};
		},
		methods:{
			activate(link){
				this.links.forEach(function(item){
					item.active = item === link;
				});
			}
		}
	}
</script>

<style>
	.app-sidebar .nav-pills > li.active > a{border-radius: 0;}
</style>