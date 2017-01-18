<template>
	<div class="special-view">

		<h2>默认表格</h2>
		<table is="vtable" sort-key="title" :columns="cols">
			<tfoot is="pager" api="querySpecial" slot="pager"  v-ref:pager></tfoot>
		</table>

		<modal title="删除确认"  effect="fade"  :show.sync="delModalShown" :onconfirm="delSpecial"  v-ref:delmodal>
			<div class="modal-body" slot="modal-body">
				<p>确定删除专题 <strong class="text-danger">{{delRow.title}}</strong> 吗?</p>
			</div>
		</modal>

	</div>
</template>

<script>
	import  { updateTips }  from 'appVuex/actions';
	import { Special } from 'services/api';
	import TableSpecial from './Vtable';
	import Vtable from 'components/Vtable';

	export default {
		name:'SpecialView',
		ready() {
			
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
				tableEditing: {}
			}
		},
		events: {
			showDelModal(row, tbl){
				this.delRow = row;
				this.tableEditing = tbl;
				this.delModalShown = true;
			}
		},
		methods: {
			delSpecial(){
				//注意 v-ref:delModal -> this.$refs.delmodal 会被转换为小写
				this.$refs.delmodal.close();
				this.updateTips('success', '删除成功: '+this.delRow.title);
				this.tableEditing.$broadcast('reload');
				
			}
		},
		vuex: {
			actions: {
				updateTips
			}
		},
		components:{
			TableSpecial
		}
	}
</script>
