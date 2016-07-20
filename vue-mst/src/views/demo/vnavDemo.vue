<template>
<div class="demo-page vnav-demo container">
	<h2 class="text-center">Vnav component</h2>
	
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
	            <td width="15%">justified</td>
	            <td width="10%"><code>Boolean</code></td>
	            <td width="10%"><code>false</code></td>
	            <td>导航项是否自适应宽度</td>
	        </tr>
	        <tr>
	            <td>type</td>
	            <td><code>String</code></td>
	            <td><code>null</code></td>
	            <td>
	                导航的类型 
	                <code>tabs</code>
	                <code>pills</code>
	            </td>
	        </tr>
	        <tr>
	        	<td>stacked</td>
	        	<td><code>Boolean</code></td>
	        	<td><code>false</code></td>
	        	<td>是否堆叠布局</td>
	        </tr>
	        <tr>
	        	<td>links</td>
	        	<td><code>Array</code></td>
	        	<td><code>[]</code></td>
	        	<td>导航列表 如: <code>[{url:.., text:.., active:..},..]</code></td>
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
						<radio-btn value="tabs">tabs</radio-btn>
						<radio-btn value="pills">pills</radio-btn>
						<radio-btn value="null">null</radio-btn>
					</radio-group>
				</div>
				<div class="col-md-4">
					<strong>justified:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.justified"> {{opt.justified}}</label>
				</div>
				<div class="col-md-4">
					<strong>stacked:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.stacked"> {{opt.stacked}}</label>
				</div>
			</div>
		</vform>
	</div>
	<!-- try end -->


	<vnav :type="opt.type" :justified="opt.justified" :stacked="opt.stacked" :links="opt.links"></vnav>
	
</div>
</template>

<script>
	var options = {
		type: 'null',
		justified: false,
		stacked: false,
		links: [
			{url: '/index', text:'首页', active: false},
			{url: '/special', text:'专题管理', active: false},
			{url: '/component', text:'组件管理', active: true}
		]
	};
	
	export default {
		data: function(){
			return {
				'opt': options
			};
		}
		
	}

</script>

