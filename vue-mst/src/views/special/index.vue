<template>
	<div class="special-view">
		<vtable sort-key="title" vtbody="Vtbody">
			<pager api="querySpecial" slot="pager"  v-ref:pager></pager>
		</vtable>
		<modal title="删除确认"  effect="fade"  :show.sync="delModalShown" :ok-callback="delSpecial"  v-ref:delmodal>
			<div class="modal-body" slot="modal-body">
				<p>确定删除专题 <strong class="text-danger">{{delRow.title}}</strong> 吗?</p>
			</div>
		</modal>

	</div>
</template>

<script>
	import  actions  from 'appVuex/actions';
	var updateTips = actions.updateTips;
	// import updateTips from '../../vuex/actions';
	import { Special } from 'services/api';

	console.warn('[actions]', actions);
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
				editRow:{}
			}
		},
		events: {
			showDelModal: function(row){
				this.delRow = row;
				this.delModalShown = true;
			}
		},
		methods: {
			delSpecial: function(){
				//注意 v-ref:delModal -> this.$refs.delmodal 会被转换为小写
				this.$refs.delmodal.close();
				Special.remove({sid: this.delRow.id}).then(function(res){
					this.updateTips('success', '删除成功: '+this.delRow.title);
					this.$refs.pager.getPageData(); //reload data
				}.bind(this));
			}
		},
		vuex: {
			actions: {
				updateTips
			}
		},
		ready: function(){
			window.vmspecialview = this;
			// this.$dispatch('delRowModal', {title:'good'});
		}
	}
</script>
