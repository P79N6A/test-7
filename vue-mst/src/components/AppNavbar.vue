<template>
	<div :class="{navbar:true, 'navbar-default':color=='default', 'navbar-inverse': color=='inverse', 'navbar-fixed-top':position=='top', 'navbar-fixed-bottom': position=='bottom', 'navbar-static-top': static}">
	    <div class="container-fluid">
	        <div class="navbar-header">
	            <button class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">
	            	<span class="icon-bar"></span>
	                <span class="icon-bar"></span>
	                <span class="icon-bar"></span>
	            </button>
	            <a href="#" class="navbar-brand">{{title}}</a>
	        </div>
	        <div id="navbar" class="collapse navbar-collapse">
		        <slot>
		            <ul class="nav navbar-nav">
		                <li v-for="link in links" v-link="{path: link.url}"><a v-bread:1="link">{{link.text}}</a></li>
		            </ul>
		        </slot>
		        <slot name="navbarRight">
		            <div class="navbar-right">
		            	<ul class="nav navbar-nav">
		            		<li><a href="#">{{user}}</a></li>
		            		<li><a href="#">退出</a></li>
		            	</ul>
		            </div>
		        </slot>
	        </div>
	    </div>
	</div>
</template>

<script>
	import VIP from 'services/public';

	export default {
		name: 'AppNavbar',
		props: {
			color: {
				type: String,
				default: 'default'
			},
			position: {
				type: String
			},
			static: {
				type: Boolean,
				coerce: VIP.makeBoolean
			},
			user: String,
			title: {
				type: String,
				default: '专题后台管理系统'
			}
		},
		methods: {
			
		},
		vuex:{
			getters:{
				links: (state)=> state.topLinks
			}
		}
	}
</script>

<style>
	.wrapper .navbar{border-radius: 0;}
</style>