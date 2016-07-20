<template>
<div class="demo-page vtable-demo container">
	<h2 class="text-center">Vtable component</h2>
	
	<!-- 参数 -->
	<h3>参数：</h3>
	<table class="table table-bordered">
	    <thead>
	        <tr>
	            <th>参数</th>
	            <th>类型</th>
	            <th>默认值</th>
	            <th>说明</th>
	        </tr>
	    </thead>
	    <tbody>
	        <tr>
	            <td width="15%">bordered</td>
	            <td width="10%"><code>Boolean</code></td>
	            <td width="10%"><code>true</code></td>
	            <td>是否带边框</td>
	        </tr>
	        <tr>
	            <td>striped</td>
	            <td><code>Boolean</code></td>
	            <td><code>true</code></td>
	            <td> 是否隔行变色 </td>
	        </tr>
	        <tr>
	        	<td>hover</td>
	        	<td><code>Boolean</code></td>
	        	<td><code>true</code></td>
	        	<td>是否悬停高亮</td>
	        </tr>
	        <tr>
	        	<td>responsive</td>
	        	<td><code>Boolean</code></td>
	        	<td><code>true</code></td>
	        	<td>表格宽度是否响应式</td>
	        </tr>
	        <tr>
	        	<td>checkable</td>
	        	<td><code>Boolean</code></td>
	        	<td><code>true</code></td>
	        	<td>是否带复选框</td>
	        </tr>
	        <tr>
	        	<td>sortKey</td>
	        	<td><code>String</code></td>
	        	<td><code>id</code></td>
	        	<td>排序字段</td>
	        </tr>
	        <tr>
	        	<td>columns</td>
	        	<td><code>Array</code></td>
	        	<td><code>[]</code></td>
	        	<td>字段列表 如: <code>[{name:.., text:..,sortable:.., order:..}, ...]</code></td>
	        </tr>
	        <tr>
	        	<td>tableData</td>
	        	<td><code>Array</code></td>
	        	<td><code>[]</code></td>
	        	<td>表格行数据</td>
	        </tr>

	    </tbody>
	</table>
	
	
	<!-- 示例 -->
	<h3>示例: </h3>
	<pre>{{ opt | json }}</pre>
	
	<!-- try start-->
	<div class="try">
		<vform horizontal="true" label-cols="4">
			<div class="row">
				<div class="col-md-4">
					<strong>bordered:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.bordered"> {{opt.bordered}}</label>
				</div>
				<div class="col-md-4">
					<strong>striped:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.striped"> {{opt.striped}}</label>
				</div>
				<div class="col-md-4">
					<strong>hover:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.hover"> {{opt.hover}}</label>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4">
					<strong>responsive:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.responsive"> {{opt.responsive}}</label>
				</div>
				<div class="col-md-4">
					<strong>checkable:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.checkable"> {{opt.checkable}}</label>
				</div>
				<div class="col-md-4">
					<form-group label="sortKey:">
						<select v-model="opt.sortKey" slot="input" class="form-control">
							<option value="id">ID</option>
							<option value="title">标题</option>
							<option value="mdate">修改时间</option>
						</select>
					</form-group>
				</div>
			</div>
		</vform>
	</div>
	<!-- try end -->
	

	<vtable :sort-key="opt.sortKey" :columns="opt.cols" :bordered="opt.bordered" :checkable="opt.checkable" :striped="opt.striped" :hover="opt.hover" :responsive="opt.responsive">
		<pager api="querySpecial" slot="pager" v-ref:pager ></pager>
	</vtable>

	<modal title="删除确认"  effect="fade"  :show.sync="delModalShown" :onconfirm="delSpecial"  v-ref:delmodal>
		<div class="modal-body" slot="modal-body">
			<p>确定删除专题 <strong class="text-danger">{{delRow.title}}</strong> 吗?</p>
		</div>
	</modal>

	<hr>

	<vtable-special :columns="opt.cols" :sort-key="opt.sortKey">
		<pager api="querySpecial" slot="pager" v-ref:pagerSpecial></pager>
	</vtable-special>
	
</div>
</template>

<script>
	import  { updateTips }  from 'appVuex/actions';
	import VtableSpecial from 'views/special/Vtable';

	var options = {
		cols:[
				{text:'ID', name:'id', sortable: true, order: 1},
				{text:'标题', name:'title', sortable: true, order: 1},
				{text:'修改时间', name:'mdate', sortable: true, order: 1},
				{text:'启用', name:'open'},
				{text:'操作', name:'operation'}
			],
		bordered: true,
		striped: true,
		hover: true,
		responsive: true,
		checkable: true,
		sortKey: 'id'
	};

	export default {
		data: function(){
			return {
				'opt': options,
				'delModalShown': false,
				'delRow':{},
				'tableEditing': {}
			};
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
			VtableSpecial
		}
		
	}

</script>

