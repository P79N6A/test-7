<template>
	<div class="sidebar" v-higher.literal="footer" :class="{'collapsed':collapsed}" v-show="show" v-fixed>
		<span class="toggle-btn" @click="toggle"><i>{{collapsed?'\u003c':'\u003e'}}</i></span>
		<div class="sidebar-bd" v-show="!collapsed" transition="expand" :style="{width: width}">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import { sidebarCollapsed } from 'appVuex/getters';
	import { toggleSidebar } from 'appVuex/actions';
	import { makeBoolean } from 'services/public';

	export default {
		name:'Sidebar',
		props: {
			width: String,
			collapsed: {
				type: Boolean,
				coerce: makeBoolean,
				twoWay: true,
				default: false
			}
		},
		data(){
			return {
				clientH: 600
			};
		},
		methods: {
			toggle(){
				this.collapsed = !this.collapsed;
			}
		},
		ready(){
			/*this.$nextTick(function(){
				this.clientH = document.documentElement.clientHeight;
			});*/
		},
		vuex:{
			getters:{
				show: state => state.sidebarShown
			}
		}
	}
</script>

<style lang="less">
	@import "../assets/css/vars.less";

	.sidebar {
		position: relative;
		float: left;
		/*margin-right: 20px;*/
		background-color: #4C4C4C;
		border-radius:0 4px 4px 0;

		&.collapsed {
			margin-right: 0px;

			.toggle-btn {
				-webkit-transform: translateX(100%);
				transform: translateX(100%);

				i {
					-webkit-transform: translateX(-50%);
					transform: translateX(-50%);
					text-indent: 23px;
				}
			}
		}
		.toggle-btn {
			position: absolute;
			z-index: 10;
			top: 50%;
			right: 0;
			width: 25px;
			height: 50px;
			overflow: hidden;

			i {
				position: absolute;
				width: 200%;
				height: 100%;
				font: normal 30px/50px serif;
				text-align: left;
				text-indent: 10px;
				background-color: #cfc;
				border-radius: 50%;
				cursor: pointer;
				opacity: .5;

				&:hover {
					font-weight: bold;
					opacity: 0.8;
				}
			}
		}
	}
	
	.sidebar-bd {
		width: 200px;

		.nav > li > a:hover {
			background-color: #CADEED;
		}
		.nav-pills > li.active > a {
			background-color: #337ab7;
		}
	}
	.expand-transition {
		-webkit-transition: all 0.3s linear;
		transition: all 0.3s linear;
		opacity: 1;
	}
	.expand-enter, .expand-leave {
		margin-left: -200px !important;
		/*width:  0!important;*/
		opacity: 0;
	}
</style>