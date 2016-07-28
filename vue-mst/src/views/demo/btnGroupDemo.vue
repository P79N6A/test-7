<template>
<div class="demo-page btnGroup-demo container">
	<h2 class="text-center">BtnGroup component</h2>
	
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
	        	<td>vertical</td>
	        	<td><code>Boolean</code></td>
	        	<td><code>false</code></td>
	        	<td>是否堆叠布局</td>
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
					<strong>vertical:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.vertical"> {{opt.vertical}}</label>
				</div>
			</div>
		</vform>
	</div>
	<!-- try end -->


	<btn-group :type="opt.type" :size="opt.size" :vertical="opt.vertical">
		<btn>good</btn>
		<btn>better</btn>
		<btn>best</btn>
		<dropdown btn-text="下拉列表" :links="dropList"></dropdown>
	</btn-group>
	
</div>
</template>

<script>
	var options = {
		vertical: false,
		size: 'md',
		type: 'success'
	};

	export default {
		data: function(){
			return {
				'opt': options,
				'dropList': [
					{text:'action'},
					{text:'another action'},
					{text:'more action', disabled: true},
					{text:''},
					{text:'last action', url:'/index'}
				]
			};
		}
		
	}

</script>

