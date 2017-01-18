<template>
	<div class="tab-wrap" v-ahref="tabNavs">
		<nav is="vnav" :type="type" :justified="justified" :stacked="stacked" :links="tabNavs">
			<tab-nav slot="nav-item" v-for="tabNav in tabNavs" :tab-nav="tabNav"></tab-nav>
		</nav>
		<div class="tab-content">
			<slot></slot>
		</div>
	</div>
</template>


<script>
	import TabNav from 'components/TabNav';
	import {makeBoolean} from 'services/public';

	export default {
		name:'Tab',
		props:{
			type: {// tabs pills
				type: String,
				default: 'tabs'
			},
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
			active: {
				type: Number,
				default: 0
			}
		},
		data:()=>({tabNavs: []}),
		events: {
			addTabNav(item){
				this.tabNavs.push(item);
			},
			setActiveIndex(index){
				this.active = index;
			}
		},
		watch:{
			active(index){
				this.tabNavs.forEach((tabNav)=>tabNav.active=false);
				this.tabNavs[index].active = true;
			}
		},
		methods: {},
		components: {
			TabNav
		}
	}
</script>

<style>
	.tab-content > .tab-pane{display: block;}
</style>