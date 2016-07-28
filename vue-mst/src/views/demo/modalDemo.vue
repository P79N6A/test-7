<template>
<div class="demo-page modal-demo container">
	<h2 class="text-center">Modal component</h2>
	
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
	            <td>显示或隐藏模态框</td>
	        </tr>
	        <tr>
	            <td>type</td>
	            <td><code>String</code></td>
	            <td><code>confirm</code></td>
	            <td>
	                模态框的类型
	                <code>alert</code>
	                <code>confirm</code>
	            </td>
	        </tr>
	        <tr>
	            <td>okText</td>
	            <td><code>String</code></td>
	            <td><code>确定</code></td>
	            <td> 确定按钮的文本 </td>
	        </tr>
	        <tr>
	            <td>cancelText</td>
	            <td><code>String</code></td>
	            <td><code>取消</code></td>
	            <td> 取消按钮的文本 </td>
	        </tr>
	        <tr>
	        	<td>title</td>
	        	<td><code>String</code></td>
	        	<td><code>提示</code></td>
	        	<td>模态框的标题</td>
	        </tr>
	        <tr>
	        	<td>width</td>
	        	<td><code>String</code></td>
	        	<td><code>null</code></td>
	        	<td>模态框的宽度 如: <code>300px</code> <code>50%</code></td>
	        </tr>
	        <tr>
	        	<td>onconfirm</td>
	        	<td><code>Function</code></td>
	        	<td><code>noop</code></td>
	        	<td>点击确定按钮的回调</td>
	        </tr>
	        <tr>
	        	<td>effect</td>
	        	<td><code>String</code></td>
	        	<td><code>fade</code></td>
	        	<td>显示模态框的动画效果 <code>fade</code> <code>zoom</code></td>
	        </tr>
	        <tr>
	        	<td>backdrop</td>
	        	<td><code>Boolean</code></td>
	        	<td><code>true</code></td>
	        	<td>是否带半透明黑色遮罩</td>
	        </tr>
	        <tr>
	        	<td>large</td>
	        	<td><code>Boolean</code></td>
	        	<td><code>false</code></td>
	        	<td>是否较大宽度的模态框</td>
	        </tr>
	        <tr>
	        	<td>small</td>
	        	<td><code>Boolean</code></td>
	        	<td><code>false</code></td>
	        	<td>是否较小宽度的模态框</td>
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
						<radio-btn value="fade">fade</radio-btn>
						<radio-btn value="zoom">zoom</radio-btn>
					</radio-group>
				</div>
				<div class="col-md-4">
					<strong>type:</strong>
					<radio-group :value.sync="opt.type" type="primary">
						<radio-btn value="alert">alert</radio-btn>
						<radio-btn value="confirm">confirm</radio-btn>
					</radio-group>
				</div>
				<div class="col-md-4">
					<strong>show:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.show"> {{opt.show}}</label>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4">
					<strong>large:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.large"> {{opt.large}}</label>
				</div>
				<div class="col-md-4">
					<strong>small:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.small"> {{opt.small}}</label>
				</div>
				<div class="col-md-4">
					<strong>backdrop:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.backdrop"> {{opt.backdrop}}</label>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4">
					<form-group label="width:" :value.sync="opt.width"></form-group>
				</div>
				<div class="col-md-4">
					<form-group label="okText:" :value.sync="opt.okText"></form-group>
				</div>
				<div class="col-md-4">
					<form-group label="cancelText:" :value.sync="opt.cancelText"></form-group>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4">
					<form-group label="title:" :value.sync="opt.title"></form-group>
				</div>
			</div>
		</vform>
	</div>
	<!-- try end -->

	<btn type="warning" @click="opt.show=!opt.show">{{opt.show?'隐藏':'显示'}}模态框</btn>
	
	<modal :type="opt.type" :ok-text="opt.okText" :cancel-text="opt.cancelText" :title="opt.title" :show.sync="opt.show" :width="opt.width" :effect="opt.effect" :backdrop="opt.backdrop" :large="opt.large" :small="opt.small" :onconfirm="opt.onconfirm">
		<div class="modal-body">
			<h3>modal content..</h3>
			<p>more text, more text, more text.. </p>
		</div>
	</modal>

</div>
</template>

<script>
	var options = {
		type: 'confirm',
		okText: '保存',
		cancelText: '取消',
		title: '删除提示',
		show: false,
		width: null,
		large: true,
		small: false,
		effect: 'fade',
		backdrop: true,
		onconfirm: function(){
			alert('send..');
		}
	};

	export default {
		data: function(){
			return {
				'opt': options
			};
		}
		
	}

</script>

