<template>
	<div class="table-wrap" v-ahref="tableData">
		<table :class="{table:true, 'table-bordered': bordered, 'table-striped': striped, 'table-hover': hover , 'table-responsive': responsive, 'table-empty': tableData.length==0}">
			<thead>
				<th v-if="checkable" class="text-center">
					<input type="checkbox" name="checkAll" class="check-all" v-model="allChecked">						
				</th>
				<th v-for="col in columns">
					{{col.text || col.name}} 
					<span v-if="col.sortable" @click="sortBy(col)" class="glyphicon hand" :class="{'glyphicon-arrow-down': col.order<0,'glyphicon-arrow-up': col.order>0, disabled: col.name!=sortKey}"></span>
				</th>
			</thead>
			<tbody is="vtbody" :rows="tableData" :cols="columns"  :sort-key="sortKey"  :order="order"  :checkable="checkable"></tbody>
		</table>
		<slot name="pager"></slot>
	</div>

</template>

<script>
	import {makeBoolean} from 'services/public';
	import Vue from 'vue';
	import Vtbody from 'components/Vtbody';

	export default {
		name:'Vtable',
		props: {
			bordered: {//样式类
				type: Boolean,
				coerce: makeBoolean,
				default: true
			},
			striped: {
				type: Boolean,
				coerce: makeBoolean,
				default: true
			},
			hover: {
				type: Boolean,
				coerce: makeBoolean,
				default: true
			},
			responsive: {
				type: Boolean,
				coerce: makeBoolean,
				default: true
			},
			checkable: {//是否可勾选
				type: Boolean,
				coerce: makeBoolean,
				default: true
			},
			sortKey: { //排序字段
				type: String,
				default: 'id'
			},
			columns: {//表格字段定义
				type: Array,
				default: ()=>([])
			},
			tableData: {//表格数据
				type: Array,
				default: ()=>([])
			}
		},
		computed: {
			order(){
				return this.columns.filter((col)=>{
					return col.name === this.sortKey;
				})[0].order;				
			},
			allChecked:{
				get(){
					return this.tableData.every( row => row.checked === true );
				},
				set(checked){
					this.tableData.forEach( row => row.checked = checked );
				}
			}
		},
		events:{
			tableData(data){
				if (this.checkable && data.length) {
					data.forEach( (row) =>{
						Vue.set(row, 'checked', false);
					});
				}
				this.tableData = data;
			}
		},
		methods: {
			sortBy(col){
				if( this.sortKey==col.name ){//当前排序字段 反序
					col.order = col.order>0 ? -1 : 1;
				}else{
					this.sortKey = col.name;
				}
			}
		},
		components: {
			Vtbody
		}

	}
</script>

<style lang="less">
	.table .tr-empty {
		display: none;

		td {
			line-height: 80px !important;
			text-align: center;
		}
	}
	.table-empty .tr-empty {
		display: table-row;
	}
	.glyphicon-arrow-up.disabled:before, .glyphicon-arrow-down.disabled:before {
		color: #E7E1E1;
	}
</style>