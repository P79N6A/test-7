<template>
<div class="demo-page dropdown-demo container">
	<h2 class="text-center">Dropdown component</h2>
	
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
	            <td width="15%">open <span class="badge">2</span></td>
	            <td width="10%"><code>Boolean</code></td>
	            <td width="10%"><code>true</code></td>
	            <td>显示或隐藏下拉列表</td>
	        </tr>
	        <tr>
	            <td>links</td>
	            <td><code>Array</code></td>
	            <td><code>[]</code></td>
	            <td> 下拉列表项 格式: <code>{text:.., url:..}</code></td>
	        </tr>
	        <tr>
	            <td>onselect</td>
	            <td><code>Function</code></td>
	            <td><code>noop</code></td>
	            <td> 点选列表项的回调函数 <code>onselect(link, index, $event)</code></td>
	        </tr>
	        <tr>
	            <td>btnType</td>
	            <td><code>String</code></td>
	            <td><code>null</code></td>
	            <td>
	                按钮的类型 可选值
	                <code>success</code>
	                <code>danger</code>
	                <code>warning</code>
	                <code>info</code>
	            </td>
	        </tr>
	        <tr>
	            <td>btnSize</td>
	            <td><code>String</code></td>
	            <td><code>md</code></td>
	            <td>
	                按钮的大小 可选值
	                <code>lg</code>
	                <code>md</code>
	                <code>sm</code>
	                <code>xs</code>
	            </td>
	        </tr>
	        <tr>
	            <td>btnText</td>
	            <td><code>String</code></td>
	            <td><code>Dropdown</code></td>
	            <td> 按钮的文本 </td>
	        </tr>
	        <tr>
	        	<td>dropup</td>
	        	<td><code>Boolean</code></td>
	        	<td><code>false</code></td>
	        	<td>列表位于上方</td>
	        </tr>
	        <tr>
	        	<td>menuRight</td>
	        	<td><code>Boolean</code></td>
	        	<td><code>false</code></td>
	        	<td>列表靠右</td>
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
					<strong>dropup:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.dropup"> {{opt.dropup}}</label>
				</div>
				<div class="col-md-4">
					<strong>menuRight:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.menuRight"> {{opt.menuRight}}</label>
				</div>
				<div class="col-md-4">
					<strong>open:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.open"> {{opt.open}}</label>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4">
					<strong>btnType:</strong>
					<radio-group :value.sync="opt.btnType" type="primary">
						<radio-btn value="success">success</radio-btn>
						<radio-btn value="danger">danger</radio-btn>
						<radio-btn value="info">info</radio-btn>
						<radio-btn value="warning">warning</radio-btn>
					</radio-group>
				</div>
				<div class="col-md-4">
					<strong>btnSize:</strong>
					<radio-group :value.sync="opt.btnSize" type="primary">
						<radio-btn value="lg">lg</radio-btn>
						<radio-btn value="md">md</radio-btn>
						<radio-btn value="sm">sm</radio-btn>
						<radio-btn value="xs">xs</radio-btn>
					</radio-group>
				</div>
				<div class="col-md-4">
					<form-group label="btnText:" :value.sync="opt.btnText"></form-group>
				</div>
				
			</div>
		</vform>
	</div>
	<!-- try end -->
	<dropdown :dropup="opt.dropup" :menu-right="opt.menuRight" :open.sync="opt.open" :btn-size="opt.btnSize" :btn-type="opt.btnType" :btn-text="opt.btnText" :links="opt.links" :onselect="opt.onselect"></dropdown>

	
	
</div>
</template>

<script>
	var options = {
		dropup: false,
		menuRight: false,
		open: false,
		btnSize: 'md',
		btnType: 'warning',
		btnText: 'choose action',
		links: [
			{text:'action'},
			{text:'another action'},
			{text:'more action', disabled: true},
			{text:''},
			{text:'last action', url:'/index'}
		],
		onselect: function(link){
			alert(link.text);
		}
	};

	export default {
		data: function(){
			return {
				'opt': options
			};
		},
		methods:{
			
		}
		
	}

</script>

