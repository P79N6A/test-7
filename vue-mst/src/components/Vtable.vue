<template>
	<div class="table-wrap">
		<table :class="{table:true, 'table-bordered': bordered, 'table-striped': striped, 'table-hover': hover , 'table-responsive': responsive, 'table-empty': tableData.length==0}">
			<thead>
				<th v-for="col in columns">{{col.text || col.name}} <span v-if="col.sortable" @click="sortBy(col)" class="glyphicon hand" :class="{'glyphicon-arrow-down': col.order<0,'glyphicon-arrow-up': col.order>0, disabled: col.name!=sortKey}"></span></th>
			</thead>
			<tbody is="vtbody" :rows="tableData" :cols="columns"  :sort-key="sortKey"  :order="order"  :checkable="checkable"></tbody>
			<tfoot></tfoot>
		</table>
		<slot name="pager"></slot>
	</div>

</template>

<script>
	import {makeBoolean} from 'services/public';
	import Vue from 'vue';

	export default {
		name:'Vtable',
		props: {
			vtbody:String,
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
					// console.warn('没有bind this, 该匿名函数内this同样指向vm', this);
					return col.name === this.sortKey;
				})[0].order;				
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
			vtbody(resolve){
				resolve(require('components/'+this.vtbody));
			}
		},
		filters: {
			kabebCase(v){
				return v.split('').map(function(c, i){
					if(c.toUpperCase() === c){
						return c = (i ? '-' : '') +c.toLowerCase() ;
					}else{ return c; }
				}).join('');
			}
		},
		created(){
		}

	}
</script>

<style>
	.tr-empty{display: none;}
	.table-empty .tr-empty{display: table-row;}
	.tr-empty td{line-height: 80px !important; text-align: center;}
	.glyphicon-arrow-up.disabled:before, .glyphicon-arrow-down.disabled:before{
		color:#E7E1E1;
	}
</style>