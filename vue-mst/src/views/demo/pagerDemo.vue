<template>
<div class="demo-page pager-demo container">
	<h2 class="text-center">Pager component</h2>
	
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
	            <td width="15%">pageSize</td>
	            <td width="10%"><code>Number</code></td>
	            <td width="10%"><code>10</code></td>
	            <td>每页的记录数</td>
	        </tr>
	        <tr>
	            <td>pageSizes</td>
	            <td><code>Array</code></td>
	            <td><code>[10,20,30]</code></td>
	            <td> 每页记录数选择列表 </td>
	        </tr>
	        <tr>
	        	<td>activePage</td>
	        	<td><code>Number</code></td>
	        	<td><code>1</code></td>
	        	<td>当前页码</td>
	        </tr>
	        <tr>
	        	<td>totalRecords</td>
	        	<td><code>Number</code></td>
	        	<td><code>120</code></td>
	        	<td>总记录数</td>
	        </tr>
	        <tr>
	        	<td>viewSize</td>
	        	<td><code>Number</code></td>
	        	<td><code>10</code></td>
	        	<td>分页组件显示的页码个数</td>
	        </tr>
	        <tr>
	        	<td>viewStart</td>
	        	<td><code>Number</code></td>
	        	<td><code>1</code></td>
	        	<td>分页组件显示页码列表的起始页码</td>
	        </tr>
	        <tr>
	        	<td>pageData</td>
	        	<td><code>Array</code></td>
	        	<td><code>[]</code></td>
	        	<td>分页数据</td>
	        </tr>
	        <tr>
	        	<td>api</td>
	        	<td><code>String</code></td>
	        	<td><code>null</code></td>
	        	<td>获取分页数据的api</td>
	        </tr>
	    </tbody>
	</table>
	
	
	<!-- 示例 -->
	<h3>示例: </h3>
	<pre>{{ opt | json }}</pre>

	<pre>{{ data | json 0}}</pre>

	<!-- try start-->
	<div class="try">
		<vform horizontal="true" label-cols="4">
			<div class="row">
				<div class="col-md-4">
					<form-group label="pageSize:" :value.sync="opt.pageSize  | mknumber"></form-group>
				</div>
				<div class="col-md-4">
					<form-group label="pageSizes:" :value.sync="opt.pageSizes"></form-group>
				</div>
				<div class="col-md-4">
					<form-group label="activePage:" :value.sync="opt.activePage  | mknumber"></form-group>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4">
					<form-group label="totalRecords:" :value.sync="opt.totalRecords  | mknumber"></form-group>
				</div>
				<div class="col-md-4">
					<form-group label="viewSize:" :value.sync="opt.viewSize  | mknumber"></form-group>
				</div>
				<div class="col-md-4">
					<form-group label="viewStart:" :value.sync="opt.viewStart  | mknumber"></form-group>
				</div>
			</div>
		</vform>
	</div>
	<!-- try end -->


	<pager api="querySpecial" :page-size="opt.pageSize" :page-sizes="opt.pageSizes" :active-page="opt.activePage" :total-records="opt.totalRecords" :view-size="opt.viewSize" :view-start="opt.viewStart" ></pager>
	
</div>
</template>

<script>
	var options = {
		pageSize: 5,
		pageSizes: [5,15,25],
		activePage: 2,
		totalRecords: 100,
		viewSize: 8,
		viewStart: 1
	};

	export default {
		data: function(){
			return {
				'opt': options,
				data:()=>[]
			};
		},
		methods:{
			
		},
		events:{
			tableData(data){
				this.data = data;
			}
		},
		filters:{
			mknumber:{
				read(val){
					return val;
				},
				write(val){
					return Number(val);
				}

			}
		}
		
	}

</script>

