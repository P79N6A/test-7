<template>
<div class="demo-page btn-demo container">
	<h2 class="text-center">Btn component</h2>
	
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
	            <td width="15%">size</td>
	            <td width="10%"><code>String</code></td>
	            <td width="10%"><code>null</code></td>
	            <td>
	            	按钮大小 可选值
					<code>lg</code>
					<code>sm</code>
					<code>xs</code>
					<code>md</code>
	            </td>
	        </tr>
	        <tr>
	            <td>type</td>
	            <td><code>String</code></td>
	            <td><code>default</code></td>
	            <td>
	                按钮的类型 可选值
	                <code>success</code>
	                <code>danger</code>
	                <code>warning</code>
	                <code>info</code>
	                <code>primary</code>
	            </td>
	        </tr>
	        <tr>
	        	<td>disabled</td>
	        	<td><code>Boolean</code></td>
	        	<td><code>false</code></td>
	        	<td>是否可点击</td>
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
				<div class="col-md-4">
					<strong>size:</strong>
					<radio-group :value.sync="opt.size" type="primary">
						<radio-btn value="lg">lg</radio-btn>
						<radio-btn value="md">md</radio-btn>
						<radio-btn value="sm">sm</radio-btn>
						<radio-btn value="xs">xs</radio-btn>
					</radio-group>
				</div>
				<div class="col-md-4">
					<strong>disabled:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.disabled"> {{opt.disabled}}</label>
				</div>
			</div>
		</vform>
	</div>
	<!-- try end -->


	<btn :size="opt.size" :type="opt.type" :disabled="opt.disabled" @click="clickBtn">Save</btn>
	
</div>
</template>

<script>
	var options = {
		disabled: true,
		size: 'md',
		type: 'success'
	};

	export default {
		data: function(){
			return {
				'opt': options
			};
		},
		methods:{
			clickBtn(){
				alert('send..');
			}
		}
		
	}

</script>

