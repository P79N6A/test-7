<template>
<div class="demo-page popover-demo container">
	<h2 class="text-center">Tooltip component</h2>
	
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
	            <td width="15%">trigger</td>
	            <td width="10%"><code>String</code></td>
	            <td width="10%"><code>hover</code></td>
	            <td>
	            	触发工具提示层的事件 可选：
	            	<code>click</code>
	            	<code>focus</code>
	            	<code>hover</code>
	            </td>
	        </tr>
	        <tr>
	            <td>effect</td>
	            <td><code>String</code></td>
	            <td><code>scale</code></td>
	            <td>
	                工具提示层的动画效果
	                <code>fadein</code>
	                <code>scale</code>
	            </td>
	        </tr>
	        <tr>
	        	<td>content</td>
	        	<td><code>String</code></td>
	        	<td><code>null</code></td>
	        	<td>工具提示层的内容</td>
	        </tr>
	        <tr>
	        	<td>placement</td>
	        	<td><code>String</code></td>
	        	<td><code>top</code></td>
	        	<td>
	        		工具提示层的位置 可选：
	        		<code>left</code>
	        		<code>right</code>
	        		<code>top</code>
	        		<code>bottom</code>
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
					<strong>effect:</strong>
					<radio-group :value.sync="opt.effect" type="primary">
						<radio-btn value="fadein">fadein</radio-btn>
						<radio-btn value="scale">scale</radio-btn>
					</radio-group>
				</div>
				<div class="col-md-4">
					<strong>trigger:</strong>
					<radio-group :value.sync="opt.trigger" type="primary">
						<radio-btn value="click">click</radio-btn>
						<radio-btn value="focus">focus</radio-btn>
						<radio-btn value="hover">hover</radio-btn>
					</radio-group>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4">
					<form-group label="content:" :value.sync="opt.content"></form-group>
				</div>
				<div class="col-md-4">
					<form-group label="placement:">
						<select slot="input" class="form-control" v-model="opt.placement">
							<option>top</option>
							<option>bottom</option>
							<option>left</option>
							<option>right</option>
						</select>
					</form-group>
				</div>
			</div>
		</vform>
	</div>
	<!-- try end -->

	<tooltip :content="opt.content" :placement="opt.placement" :effect="opt.effect" :trigger="opt.trigger">
		<btn type="success" size="md">修改专题</btn>
	</tooltip>


	
</div>
</template>

<script>
	var options = {
		effect: 'scale',
		placement: 'top',
		content: '点击保存修改信息',
		trigger: 'hover'
	};

	export default {
		data: function(){
			return {
				'opt': options
			};
		}
		
	}

</script>

