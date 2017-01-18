<template>
	<div :class="{navbar:true, 'navbar-default':!inverse, 'navbar-inverse': inverse, 'navbar-fixed-top':position=='top', 'navbar-fixed-bottom': position=='bottom', 'navbar-static-top': static}" v-ahref="links">
	    <div class="container-fluid">
	    
	        <div class="navbar-header">
	            <button class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" @click="toggleCollapsed">
	            	<span class="icon-bar"></span>
	                <span class="icon-bar"></span>
	                <span class="icon-bar"></span>
	            </button>
	            <a v-link="{path: '/index'}" class="navbar-brand">{{title}}</a>
	        </div>
	        
	        <div id="navbar" class="collapse navbar-collapse" :class="{in: !collapsed}">

		        <slot>
		            <ul class="nav navbar-nav">
		                <li v-for="link in links" v-link="{path: link.url}"><a>{{link.text}}</a></li>
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
	import {makeBoolean} from 'services/public';

	export default {
		name: 'Navbar',
		props: {
			inverse: {
				type: Boolean,
				coerce: makeBoolean,
				default: false
			},
			position: {
				type: String
			},
			static: {
				type: Boolean,
				coerce: makeBoolean
			},
			user: String,
			title: {
				type: String,
				default: 'Brand'
			}
		},
		data: ()=>({collapsed: false}),
		methods: {
			toggleCollapsed(){
				this.collapsed = !this.collapsed;
			}
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