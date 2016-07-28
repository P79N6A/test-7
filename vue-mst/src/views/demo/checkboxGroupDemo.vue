<template>
<div class="demo-page checkboxGroup-demo container">
	<h2 class="text-center">CheckboxGroup component</h2>
	
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
	            <td width="15%">value</td>
	            <td width="10%"><code>Array</code></td>
	            <td width="10%"><code>[]</code></td>
	            <td>选中的值数组</td>
	        </tr>
	        <tr>
	            <td>type</td>
	            <td><code>String</code></td>
	            <td><code>null</code></td>
	            <td>
	                提示框的类型 可选值
	                <code>success</code>
	                <code>danger</code>
	                <code>warning</code>
	                <code>info</code>
	                <code>primary</code>
	            </td>
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
					<strong>type:</strong>
					<radio-group :value.sync="opt.type" type="primary">
						<radio-btn value="success">success</radio-btn>
						<radio-btn value="danger">danger</radio-btn>
						<radio-btn value="info">info</radio-btn>
						<radio-btn value="warning">warning</radio-btn>
						<radio-btn value="primary">primary</radio-btn>
					</radio-group>
				</div>
			</div>
		</vform>
	</div>
	<!-- try end -->


	<checkbox-group :type="opt.type"  :value="opt.value">
		<checkbox-btn value="left">left</checkbox-btn>
		<checkbox-btn value="middle" checked>middle</checkbox-btn>
		<checkbox-btn value="right">right</checkbox-btn>
	</checkbox-group>

	
</div>
</template>

<script>
	var options = {
		value: [],
		type: 'success'
	};

	export default {
		data: function(){
			return {
				'opt': options
			};
		}
		
	}

</script>

