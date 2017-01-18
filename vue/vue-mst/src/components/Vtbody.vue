<template>
	<tbody>
		<tr v-for="row in rows | orderBy sortKey order">
			<td v-if="checkable" class="text-center">
				<input type="checkbox" name="chk{{$index}}" class="check" v-model="rows[$index].checked" />
			</td>
			<td v-for="n in cols.length">
				<span v-if="n<cols.length-1">{{row[cols[n].name]}}</span>
				<p v-else>
					<a class="btn btn-primary btn-sm" @click="view(row)">查看</a>
					<a class="btn btn-primary btn-sm" @click="edit(row)">编辑</a>
					<a class="btn btn-primary btn-sm" @click="del(row)">删除</a>
				</p>
			</td>
		</tr>
		<tr class="tr-empty">
			<td colspan="{{rows.length}}">暂时没有数据..</td>
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
			},
			checkable: {
				type: Boolean,
				default: true
			}
		},
		methods:{
			view(){

			},
			edit(row){

			},
			del(row){
				this.$dispatch('showDelModal', row, this.$parent);
			}
		}
	}
</script>