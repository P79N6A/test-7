<template>
	<ul :class="{nav: true, 'nav-tabs': type==='tabs','nav-pills': type==='pills','nav-justified': justified,'nav-stacked': stacked}" v-ahref="links">
		<slot name="nav-item">
			<nav-item v-for="link in links" :link="link"></nav-item>
		</slot>
	</ul>
</template>

<script>

	import {makeBoolean} from 'services/public';
	import NavItem from 'components/NavItem';

	export default {
		name:'Vnav',
		props:{
			type: String,
			justified: {
				type: Boolean,
				default: false,
				coerce: makeBoolean
			},
			stacked: {
				type: Boolean,
				default: false,
				coerce: makeBoolean
			},
			links: {
				type: Array,
				default:()=>([])
			}
		},
		data:()=>({}),
		components: {
			NavItem
		},
		events:{
			activate(link){
				this.links.forEach(function(item){
					item.active = item === link;
				});
			}
		}
	}
</script>

<style>
	.sidebar .nav-pills > li.active > a{border-radius: 0;}
</style>