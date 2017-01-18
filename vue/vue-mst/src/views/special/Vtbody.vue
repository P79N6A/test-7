<template>
	<tbody>
		<tr v-for="row in rows | orderBy sortKey order">
			<td v-if="checkable" class="text-center">
				<input type="checkbox" name="chk{{$index}}" class="check" v-model="rows[$index].checked" />
			</td>
			<td v-for="n in cols.length">
				<span v-if="n<cols.length-1">{{row[cols[n].name]}}<strong>hello</strong> <i class="glyphicon glyphicon-heart"></i></span>
				<p v-else>
					<a class="btn btn-primary btn-sm" @click="view(row)">查看33</a>
					<a class="btn btn-primary btn-sm" @click="edit(row)">编辑323</a>
					<a class="btn btn-primary btn-sm" @click="del(row)">删除ew</a>
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
		name: 'VtbodySpecial',
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