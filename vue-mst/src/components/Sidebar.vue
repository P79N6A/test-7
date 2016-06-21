<template>
	<div class="app-sidebar" v-higher.literal="footer" :class="{'collapsed':collapsed}" v-show="$route.path!=='/index'">
		<span class="toggle-btn" @click="toggle"><i>{{collapsed?'<':'>'}}</i></span>
		<div class="sidebar-bd" v-show="!collapsed" transition="expand" :style="{'width': width}">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import { asideLinks } from 'appVuex/getters';
	export default {
		name:'Sidebar',
		props: {
			width: String,
			collapsed: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			toggle(){
				this.collapsed = !this.collapsed;
			}
		},
		ready(){

		},
		vuex: {
			getters: {
				asideLinks
			}
		}
	}
</script>

<style lang="less">
	@import "../assets/css/vars.less"; 

	.app-sidebar{position: relative; float:left; margin-right: 20px; background-color: #DDE6ED;}
	.app-sidebar.collapsed{margin-right: 0px;}
	.app-sidebar .toggle-btn{position: absolute; z-index: 10; top: 50%; right: 0; width: 25px; height: 50px; overflow: hidden;}
	.app-sidebar.collapsed .toggle-btn{-webkit-transform: translateX(100%); transform: translateX(100%);}
	.app-sidebar .toggle-btn i{position: absolute; width: 200%; height: 100%; font: normal 30px/50px serif; text-align: left; text-indent: 10px; background-color: #cfc; border-radius: 50%; cursor:pointer; opacity:.5;}
	.app-sidebar.collapsed .toggle-btn i{-webkit-transform: translateX(-50%); transform: translateX(-50%); text-indent: 23px;} 
	.app-sidebar .toggle-btn i:hover{font-weight: bold; opacity:0.8;}
	.main-bd{overflow-x: hidden;}
	.sidebar-bd{width:200px;}
	.sidebar-bd .nav > li > a:hover{background-color: #CADEED;}
	.sidebar-bd .nav-pills > li.active > a{ background-color: #337ab7; }

	.expand-transition{-webkit-transition: width 0.3s linear; transition: width 0.3s linear; opacity:1;}
	.expand-enter, .expand-leave{width:0px !important; opacity:0;}
</style>