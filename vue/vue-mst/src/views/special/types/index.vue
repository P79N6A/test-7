<template>
	<div class="special-types-view">
		
		<h2>默认tab</h2>
		<tab type="tabs">
			<tab-pane header="在线专题">
				<h2>在线专题</h2>
				
				<table is="vtable" sort-key="title" :columns="cols">
					<tfoot is="pager" api="querySpecial" slot="pager"  v-ref:pager></tfoot>
				</table>
		
			</tab-pane>
			<tab-pane header="待办专题">
				<h2>待办专题</h2>
				
				<table is="vtable" sort-key="title" :columns="cols">
					<tfoot is="pager" api="querySpecial" slot="pager"  v-ref:pager></tfoot>
				</table>
			</tab-pane>
		</tab>

		<alert :type="alert.type" dismissable :show.sync="alert.show" width="50%">
			<strong>提示：</strong> 测试通过下拉列表控制alert组件的状态
		</alert>

		<h2>定制tab</h2>
		<tab-types type="pills" @alert-toggle="toggleAlert" @alert-type="changeAlertType">
			<tab-pane header="HTML">
				<h3>HTML</h3>
				<p>hello HTML</p>
			</tab-pane>
			<tab-pane header="JS">
				<h3>JS</h3>
				<p>hello JS</p>
			</tab-pane>
			<tab-pane header="PHP">
				<h3>PHP</h3>
				<p>hello PHP</p>
			</tab-pane>
		</tab-types>
		

		<modal title="删除确认"  effect="fade"  :show.sync="delModalShown" :onconfirm="delSpecial"  v-ref:delmodal>
			<div class="modal-body" slot="modal-body">
				<p>确定删除专题 <strong class="text-danger">{{delRow.title}}</strong> 吗?</p>
			</div>
		</modal>
	
		

	</div>
</template>

<script>

	import  {updateTips}  from 'appVuex/actions';
	import { Special } from 'services/api';

	import TabTypes from './Tab';

	export default {
		name:'SpecialView',
		ready() {
			console.log('demo.. ready..');
		},
		data() {
			return {
				user: 'sindy'
				,delModalShown: false
				,delRow:{},
				editRow:{},
				cols:[
						{text:'ID', name:'id', sortable: true, order: 1},
						{text:'标题', name:'title', sortable: true, order: 1},
						{text:'修改时间', name:'mdate', sortable: true, order: 1},
						{text:'启用', name:'open'},
						{text:'操作', name:'operation'}
					],
				alert:{
					type: 'success',
					show: true
				}
			}
		},
		events: {
			showDelModal(row){
				this.delRow = row;
				this.delModalShown = true;
			}
		},
		methods: {
			delSpecial(){
				//注意 v-ref:delModal -> this.$refs.delmodal 会被转换为小写
				this.$refs.delmodal.close();
				Special.remove({sid: this.delRow.id}).then((res)=>{debugger;
					this.updateTips('success', '删除成功: '+this.delRow.title);
					this.tableEditing.$broadcast('reload');
				});
			},
			toggleAlert(){
				console.warn('in fn: toggleAlert');
				this.alert.show = !this.alert.show;
			},
			changeAlertType(t){
				console.warn('in fn: changeAlertType');
				this.alert.type = t;
			}
		},
		vuex: {
			actions: {
				updateTips
			}
		},
		components: {
			TabTypes
		}
	}

</script>