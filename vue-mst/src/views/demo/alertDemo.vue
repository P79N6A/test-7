<template>
<div class="demo-page alert-demo container">
	<h2 class="text-center">Alert component</h2>
	
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
	            <td width="15%">show <span class="badge">2</span></td>
	            <td width="10%"><code>Boolean</code></td>
	            <td width="10%"><code>true</code></td>
	            <td>显示或隐藏提示框</td>
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
	            </td>
	        </tr>
	        <tr>
	        	<td>dismissable</td>
	        	<td><code>Boolean</code></td>
	        	<td><code>false</code></td>
	        	<td>是否带关闭按钮x</td>
	        </tr>
	        <tr>
	        	<td>duration</td>
	        	<td><code>Number</code></td>
	        	<td><code>0</code></td>
	        	<td>定时关闭提示框，0表示不定时关闭</td>
	        </tr>
	        <tr>
	        	<td>width</td>
	        	<td><code>String</code></td>
	        	<td><code>null</code></td>
	        	<td>提示框的宽度， 如: <i>30px</i> <i>50%</i></td>
	        </tr>
	        <tr>
	        	<td>placement</td>
	        	<td><code>String</code></td>
	        	<td><code>null</code></td>
	        	<td>
	        		提示框的位置 可选 
	        		<code>top</code>
	        		<code>top-right</code>
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
					</radio-group>
				</div>
				<div class="col-md-4">
					<strong>dismissable:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.dismissable"> {{opt.dismissable}}</label>
				</div>
				<div class="col-md-4">
					<strong>show:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.show"> {{opt.show}}</label>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4">
					<form-group label="duration:" :value.sync="opt.duration  | mknumber"></form-group>
				</div>
				<div class="col-md-4">
					<form-group label="width:" :value.sync="opt.width"></form-group>
				</div>
				<div class="col-md-4">
					<form-group label="placement:">
						<select slot="input" class="form-control" v-model="opt.placement">
							<option>null</option>
							<option>top</option>
							<option>top-right</option>
						</select>
					</form-group>
				</div>
			</div>
		</vform>
	</div>
	<!-- try end -->


	<alert :type="opt.type" :show.sync="opt.show" :dismissable="opt.dismissable" :duration="opt.duration" :width="opt.width" :placement="opt.placement">	
		<strong>提示: </strong>{{tips}}
	</alert>
	
</div>
</template>

<script>
	var options = {
		dismissable: true,
		duration: 1000,
		placement: '',
		show: true,
		type: 'success',
		width: '50%'
	};

	export default {
		data: function(){
			return {
				'opt': options,
				'tips': '数据保存状态...'
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

