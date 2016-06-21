<template>
	<div class="special-view">
		
		<table is="vtable" sort-key="title" vtbody="Vtbody" :columns="cols">
			<tfoot is="pager" api="querySpecial" slot="pager"  v-ref:pager></tfoot>
		</table>

		<modal title="删除确认"  effect="fade"  :show.sync="delModalShown" :ok-callback="delSpecial"  v-ref:delmodal>
			<div class="modal-body" slot="modal-body">
				<p>确定删除专题 <strong class="text-danger">{{delRow.title}}</strong> 吗?</p>
			</div>
		</modal>

	</div>
</template>

<script>
	import  {updateTips}  from 'appVuex/actions';
	import { Special } from 'services/api';

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
					]
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
				Special.remove({sid: this.delRow.id}).then((res)=>{
					this.updateTips('success', '删除成功: '+this.delRow.title);
					this.$refs.pager.getPageData(); //reload data
				});
			}
		},
		vuex: {
			actions: {
				updateTips
			}
		},
		ready(){
			// this.$dispatch('delRowModal', {title:'good'});
		}
	}
</script>
