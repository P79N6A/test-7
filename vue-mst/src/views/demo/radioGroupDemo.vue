<template>
<div class="demo-page radioGroup-demo container">
	<h2 class="text-center">RadioGroup component</h2>
	
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
	            <td width="15%">value <span class="badge">2</span></td>
	            <td width="10%"><code>String</code></td>
	            <td width="10%"><code>null</code></td>
	            <td>单选按钮组的值</td>
	        </tr>
	        <tr>
	            <td>type</td>
	            <td><code>String</code></td>
	            <td><code>default</code></td>
	            <td>
	                单选按钮的类型 可选值
	                <code>success</code>
	                <code>danger</code>
	                <code>warning</code>
	                <code>info</code>
	                <code>default</code>
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
				<div class="col-md-8">
					<strong>type:</strong>
					<radio-group :value.sync="opt.type" type="primary">
						<radio-btn value="success">success</radio-btn>
						<radio-btn value="danger">danger</radio-btn>
						<radio-btn value="info">info</radio-btn>
						<radio-btn value="warning">warning</radio-btn>
						<radio-btn value="default">default</radio-btn>
						<radio-btn value="primary">primary</radio-btn>
					</radio-group>
				</div>
				<div class="col-md-4">
					<form-group label="value:" :value.sync="opt.value"></form-group>
				</div>
			</div>
		</vform>
	</div>
	<!-- try end -->

	<radio-group :value.sync="opt.value" :type="opt.type">
		<radio-btn value="good">good</radio-btn>
		<radio-btn value="better">better</radio-btn>
		<radio-btn value="best">best</radio-btn>
	</radio-group>
	
	
</div>
</template>

<script>
	var options = {
		value: 'good',
		type: 'default'
	};

	export default {
		data: function(){
			return {
				'opt': options
			};
		}
		
	}

</script>

