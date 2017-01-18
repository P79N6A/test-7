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
					<router-view class="view animated" :transition="effect" transition-mode="out-in"></router-view>
				</div>
			</div>
		</div>

		<!-- footer -->
		<footer is="vfooter"></footer>

		<!-- tips -->
		<alert :type="tips.type == 'error'? 'danger' : 'success'" class="app-tips" :show.sync="showTips" dismissable :duration="3000" width="40%">	<strong>提示: </strong>{{tips.text}}
		</alert>
		<!-- loading -->
		<loading :show="loadingCount>0"></loading>

		<!-- test -->
		<!-- <wui-alert>eiieieiei</wui-alert> -->
		<ui-button value="a button">wwqwwq</ui-button>
		<ui-switch open-intro="同步" close-intro="不同步"></ui-switch>

		<div style="margin-top:300px; border-top:1px dashed #ccc;"></div>

	</div>
</template>

<script>
	
	import store from 'appVuex/store';
	import { updateTips, addLoading, setBreadCrumbs, resetPrevAsideLinks, toggleSidebar, getAsideLinks } from 'appVuex/actions';
	import { asideLinks } from 'appVuex/getters';

	import { User } from 'services/api';

	// 导入样式
	require('css/public.css');
	require('css/vars.less');

	export default {
		name: 'App',
		components: {
			Navbar: require('./Navbar'),
			Sidebar: require('./Sidebar'),
			Vfooter: require('./Vfooter')
		},
		data() {
			return {
				user: '',
				effect: 'aniFade'
			};
		},
		watch: {
			tips: {
				deep: true,
				handler(t){
					this.showTips = !!this.tips.text;
				}
			}
		},
		vuex: {
			getters: {
				tips: state => state.tips,
				loadingCount: state => state.loadingCount,
				asideLinks:state => state.asideLinks
			},
			actions: {
				updateTips,
				addLoading,
				setBreadCrumbs,
				resetPrevAsideLinks,
				getAsideLinks,
				toggleSidebar
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
			}/*,
			sidebarShown(){
				console.warn('in computed....shown..');
				return this.asidelinks? this.asidelinks.length > 0 : false;
			}*/
		},
		methods: {
			
		},
		asyncData() {
			return User.get({userId:123}).then(function(res){
				return res.data; //自动 vm.$set(..);
			});
		},
		store: store
	}
</script>


<style scoped lang="less">
	.viewport {
		min-height: 100px;
	}
	.view {
		-webkit-animation-duration: 0.3s;
		animation-duration: 0.3s;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
	}

</style>y