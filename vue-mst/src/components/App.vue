<template>
	<div class="wrapper">
		<!-- navbar -->
		<app-navbar :user="user" color="inverse"></app-navbar>
		<!-- main -->
		<div class="main">
			<app-sidebar>
				<app-nav type="pills" stacked="true" :links="asideLinks"></app-nav>
			</app-sidebar>			
			<div class="main-bd">
				<breadcrumb></breadcrumb>
				<div class="viewport" v-adaptive-height.literal="footer">
					<router-view  class="view"  transition="slideInDown" transition-mode="out-in" ></router-view>
				</div>
			</div>
		</div>
		<!-- footer -->
		<app-footer></app-footer>

		<!-- tips -->
		<alert :type="tips.type == 'error'? 'danger' : 'success'" class="app-tips" :show.sync="showTips" dismissable :duration="5000" width="40%"><strong>提示: </strong>{{tips.text}}</alert>
		<!-- loading -->
		<loading :show="loadingCount>0"></loading>
	</div>
</template>

<script type="text/javascript">
	import store from '../vuex/store';
	import actions from '../vuex/actions';
	import { asideLinks } from '../vuex/getters';

	import {User} from 'services/api';

	import Vue from 'vue';

	Vue.transition('slideInDown', {
		enterClass: 'slideInDown',
		leaveClass: 'slideOutDown'
	});

	// 导入样式
	require('css/public.css');
	require('css/vars.less');

	export default {
		name: 'App',
		components: {
			AppNavbar: require('./AppNavbar.vue'),
			AppSidebar: require('./AppSidebar.vue'),
			AppNav: require('./AppNav.vue'),
			AppFooter: require('./AppFooter.vue')
		},
		data() {
			return {
				user: ''
				// ,showTips: false
			}
		},
		watch: {
			tips: {
				deep: true,
				handler: function(t){
					console.log('in watch, tips:', t);
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
				updateTips: actions.updateTips,
				addLoading: actions.addLoading
			}
		},
		computed:{
			showTips: {
				get: function(){
					return !!this.tips.text;
				},
				set: function(val){
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
		created: function() {
			// console.warn('[in app this]', this);
			window.vmapp = this;
			setTimeout(function(){
				 window.vmalert = $('.app-tips').get(0).__vue__;
			}, 2000); 
		},
		ready() {
			/*User.get({userId:123}).then(function(res){
				console.info('res:', res);
			});*/
		},
		asyncData: function(){
			return User.get({userId:123}).then(function(res){
				return res.data; //自动 vm.$set(..);
			});
		},
		store: store
	}
</script>


<style scoped>
	.button{
		display: block;
		background-color: #212212;
		color: #fff;
		font-weight: bold;
		text-align: center;
		padding: 1em;
		cursor: pointer;
		text-decoration: none;
	}

	.button span{
		margin-left: 2em;
		font-size: .5rem;
		color: #d6d6d6;
	}

	.viewport{
		min-height: 100px;
		/*border: 5px solid #ccc;*/
		/*padding: 20px;*/
	}
	.view{
		animation-duration: .3s;
		animation-iteration-count: 1;
	}
</style>