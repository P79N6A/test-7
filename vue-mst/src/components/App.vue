<template>
	<div class="wrapper">
		<!-- navbar -->
		<navbar :user="user" inverse="true" title="专题后台管理系统"></navbar>
		<!-- main -->
		<div class="main">
			<sidebar>
				<nav is="vnav" type="pills" stacked="true" :links="asideLinks"></nav>
			</sidebar>
			<div class="main-bd">
				<breadcrumb></breadcrumb>
				<div class="viewport" v-higher.literal="footer">
					<router-view class="view animated" :transition="effect" transition-mode="out-in" ></router-view>
				</div>
			</div>
		</div>

		<tab>
			<tab-pane header="html">
				<h2>html</h2>
				<p>good hello</p>
			</tab-pane>
			<tab-pane header="js">
				<h2>js</h2>
				<p>good hello</p>
			</tab-pane>
			<tab-pane header="css">
				<h2>css</h2>
				<p>good hello</p>
			</tab-pane>

		</tab>


		<!-- footer -->
		<footer is="vfooter"></footer>

		<!-- tips -->
		<alert :type="tips.type == 'error'? 'danger' : 'success'" class="app-tips" :show.sync="showTips" dismissable :duration="3000" width="40%"><strong>提示: </strong>{{tips.text}}</alert>
		<!-- loading -->
		<loading :show="loadingCount>0"></loading>
	</div>
</template>

<script>
	import store from 'appVuex/store';
	import {updateTips, addLoading} from 'appVuex/actions';
	import { asideLinks } from 'appVuex/getters';

	import {User} from 'services/api';
	import TabPane from 'components/TabPane';
	import Vue from 'vue';

	Vue.transition('aniSlide', {
		enterClass: 'slideInDown',
		leaveClass: 'slideOutDown'
	});
	Vue.transition('aniBounce', {
		enterClass: 'bounceIn',
		leaveClass: 'bounceOut'
	});
	Vue.transition('aniBounceDown', {
		enterClass: 'bounceInDown',
		leaveClass: 'bounceOutDown'
	});
	Vue.transition('aniFade', {
		enterClass: 'fadeIn',
		leaveClass: 'fadeOut'
	});

	Vue.directive('animate', {
		priority: 2300,
		bind(){
			$(this.el).attr('transition', 'aniSlide');
		}
	});


	// 导入样式
	require('css/public.css');
	require('css/vars.less');

	export default {
		name: 'App',
		components: {
			Navbar: require('./Navbar.vue'),
			Sidebar: require('./Sidebar.vue'),
			Vfooter: require('./Vfooter.vue')
		},
		data() {
			return {
				user: '',
				effect: 'slide'
			};
		},
		watch: {
			tips: {
				deep: true,
				handler(t){
					showTips = !!this.tips.text;
				}
			}
		},
		vuex: {
			getters: {
				tips: state => state.tips,
				loadingCount: state => state.loadingCount,
				asideLinks
			},
			actions: {
				updateTips,
				addLoading
			}
		},
		computed:{
			showTips: {
				get(){ return !!this.tips.text; },
				set(val){
					if(!val){//隐藏 则提示信息置空
						this.tips.text = '';
					}
				}
			}
		},
		methods: {

		},
		watch:{
			
		},
		asyncData() {
			return User.get({userId:123}).then(function(res){
				return res.data; //自动 vm.$set(..);
			});
		},
		store: store
	}
</script>


<style scoped>
	.viewport{
		min-height: 100px;
	}

	 .view{
		-webkit-animation-duration: 0.3s;
		animation-duration: 0.3s;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;		
	} 
</style>