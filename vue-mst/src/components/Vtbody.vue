<template>
	<tbody>
		<tr v-for="row in rows | orderBy sortKey order">
			<td v-for="n in cols.length">
				<span v-if="n<cols.length-1">{{row[cols[n].name]}}</span>
				<p v-else>
					<a href="javascript:;" class="btn btn-primary btn-sm" @click="view(row)">查看</a>
					<a href="javascript:;" class="btn btn-primary btn-sm" @click="edit(row)">编辑</a>
					<a href="javascript:;" class="btn btn-primary btn-sm" @click="del(row)">删除</a>
				</p>
			</td>
		</tr>
		<tr class="tr-empty">
			<td colspan="{{cols.length}}">暂时没有数据..</td>
		</tr>
	</tbody>
</template>

<script>
	export default {
		name: 'Vtbody',
		props:{
			sortKey: String,
			order: {
				type: Number,
				default: 1
			},
			rows: {
				// twoWay: true,
				type:Array,
				default: ()=>{[]}
			},
			cols: {
				type:Array,
				default: ()=>([])
			}
		},
		methods:{
			view(){

			},
			edit(row){

			},
			del(row){
				this.$dispatch('showDelModal', row);
			}
		}
	}
</script>