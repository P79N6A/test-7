<template>
<div class="demo-page popover-demo container">
	<h2 class="text-center">Popover component</h2>
	
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
	            <td width="10%"><code>click</code></td>
	            <td>
	            	触发提示弹层的事件 可选：
	            	<code>click</code>
	            	<code>focus</code>
	            	<code>hover</code>
	            </td>
	        </tr>
	        <tr>
	            <td>effect</td>
	            <td><code>String</code></td>
	            <td><code>fadein</code></td>
	            <td>
	                提示弹层的动画效果
	                <code>fadein</code>
	                <code>scale</code>
	            </td>
	        </tr>
	        <tr>
	        	<td>header</td>
	        	<td><code>String</code></td>
	        	<td><code>null</code></td>
	        	<td>提示弹层的标题</td>
	        </tr>
	        <tr>
	        	<td>content</td>
	        	<td><code>String</code></td>
	        	<td><code>null</code></td>
	        	<td>提示弹层的内容</td>
	        </tr>
	        <tr>
	        	<td>placement</td>
	        	<td><code>String</code></td>
	        	<td><code>top</code></td>
	        	<td>
	        		提示弹层的位置 可选：
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
					<form-group label="header:" :value.sync="opt.header"></form-group>
				</div>
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

	<popover :effect="opt.effect"  :placement="opt.placement" :header="opt.header"  :content="opt.content" :trigger="opt.trigger">
		<btn type="danger">触发popover</btn>
	</popover>

	
</div>
</template>

<script>
	var options = {
		effect: 'scale',
		placement: 'top',
		header: '提示',
		content: '无法对其进行扩展，这导致我们失去了很多具有想象力的做法',
		trigger: 'click'
	};

	export default {
		data: function(){
			return {
				'opt': options
			};
		}
		
	}

</script>

