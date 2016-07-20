<template>
<div class="demo-page tab-demo container">
	<h2 class="text-center">Tab component</h2>
	
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
	            <td width="15%">type</td>
	            <td width="10%"><code>String</code></td>
	            <td width="10%"><code>tabs</code></td>
	            <td>选项卡类型 <code>tabs</code> <code>pills</code></td>
	        </tr>
	        <tr>
	            <td>justified</td>
	            <td><code>Boolean</code></td>
	            <td><code>false</code></td>
	            <td> 是否平均tab的宽度适应容器 </td>
	        </tr>
	        <tr>
	        	<td>stacked</td>
	        	<td><code>Boolean</code></td>
	        	<td><code>false</code></td>
	        	<td>是否堆叠风格</td>
	        </tr>
	        <tr>
	        	<td>active</td>
	        	<td><code>Number</code></td>
	        	<td><code>0</code></td>
	        	<td>当前激活的选项卡的index</td>
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
			<div class="row">
				<div class="col-md-4">
					<form-group label="active:" :value.sync="opt.active  | mknumber"></form-group>
				</div>
			</div>
		</vform>
	</div>
	<!-- try end -->


	<tab :type="opt.type" :justified="opt.justified" :stacked="opt.stacked" :active="opt.active">
		<tab-pane header="在线专题">
			<h3>在线专题表...</h3>	
		</tab-pane>
		<tab-pane header="待办专题">
			<h2>待办专题表..</h2>
		</tab-pane>
		<tab-pane header="下线专题">
			<h2>下线专题表..</h2>
		</tab-pane>
	</tab>
	
</div>
</template>

<script>
	var options = {
		type: 'tabs',
		justified: false,
		stacked: false,
		active: 0
	};

	export default {
		data: function(){
			return {
				'opt': options
			};
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

