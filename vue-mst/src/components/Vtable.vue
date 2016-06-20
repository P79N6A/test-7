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
	import VIP from 'services/public';
	import Vue from 'vue';

	export default {
		name:'Vtable',
		props: {
			vtbody:String,
			bordered: {//样式类
				type: Boolean,
				coerce: VIP.makeBoolean,
				default: true
			},
			striped: {
				type: Boolean,
				coerce: VIP.makeBoolean,
				default: true
			},
			hover: {
				type: Boolean,
				coerce: VIP.makeBoolean,
				default: true
			},
			responsive: {
				type: Boolean,
				coerce: VIP.makeBoolean,
				default: true
			},
			checkable: {//是否可勾选
				type: Boolean,
				coerce: VIP.makeBoolean,
				default: true
			},
			sortKey: { //排序字段
				type: String,
				default: 'id'
			},
			columns: {//表格字段定义
				type: Array,
				default: function(){
					return [
						{text:'ID', name:'id', sortable: true, order: 1},
						{text:'标题', name:'title', sortable: true, order: 1},
						{text:'修改时间', name:'mdate', sortable: true, order: 1},
						{text:'启用', name:'open'},
						{text:'操作', name:'operation'}
					];
				}
			},
			tableData: {//表格数据
				type: Array,
				default: function(){
					return [];
				}
			}
		},
		computed: {
			order: function(){
				return this.columns.filter(function(col){
					return col.name === this.sortKey;
				}.bind(this))[0].order;				
			}
		},
		methods: {
			sortBy: function(col){
				if( this.sortKey==col.name ){//当前排序字段 反序
					col.order = col.order>0 ? -1 : 1;
				}else{
					this.sortKey = col.name;
				}
			}
		},
		components: {
			vtbody:  function(resolve){
				resolve(require('components/'+this.vtbody));
			}
		},
		filters: {
			kabebCase: function(v){
				return v.split('').map(function(c, i){
					if(c.toUpperCase() === c){
						return c = (i ? '-' : '') +c.toLowerCase() ;
					}else{ return c; }
				}).join('');
			}
		},
		created: function(){
			window.vmvtable = this;
			debugger;
			/*VIP.eachKey(this.columns, function(c){
				if (c.sortable) {
					c.active = c.name === this.sortKey;
				}
			}.bind(this));*/
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